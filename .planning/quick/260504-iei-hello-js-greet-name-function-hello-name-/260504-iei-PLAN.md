---
phase: quick-260504-iei
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - hello.js
  - hello.test.js
autonomous: true
requirements:
  - QUICK-260504-iei
must_haves:
  truths:
    - "`greet('world')` returns the exact string `Hello, world!`"
    - "`greet` is exported from hello.js alongside the existing `placeholder` export (no breaking changes)"
    - "`npm test` (which runs `node --test`) passes with the new test included"
    - "No npm dependencies added (zero diff to package.json dependencies fields)"
  artifacts:
    - path: "hello.js"
      provides: "greet(name) function returning `Hello, ${name}!`, exported via module.exports"
      contains: "function greet"
    - path: "hello.test.js"
      provides: "Node built-in test runner spec verifying greet('world') === 'Hello, world!'"
      contains: "node:test"
  key_links:
    - from: "hello.test.js"
      to: "hello.js"
      via: "require('./hello')"
      pattern: "require\\(['\"]\\./hello['\"]\\)"
    - from: "hello.js"
      to: "module.exports"
      via: "named export of greet"
      pattern: "module\\.exports\\s*=\\s*\\{[^}]*greet"
---

<objective>
在 `hello.js` 加上 `greet(name)` function，回傳 `Hello, {name}!`，並用 Node.js built-in test runner 建立 unit test 驗證 `greet('world') === 'Hello, world!'`。

Purpose: 這是 work-ide auto-build pipeline 的 canonical UAT scenario (PROJECT.md Scenario 1)。此 plan 模擬 claude PTY step 在 feature branch 對 fixture 做的修改 — atomic、self-contained、不加 dependencies、tests 必須跑得過。

Output:
- 修改後的 `hello.js`（保留 `placeholder`，新增 `greet`）
- 新建 `hello.test.js`（Node built-in `node:test` + `node:assert`）
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/STATE.md
@CLAUDE.md
@hello.js
@package.json

<interfaces>
<!-- Existing hello.js exports (CommonJS pattern — must be preserved) -->

From hello.js:
```javascript
function placeholder() {
  return 'placeholder';
}

module.exports = { placeholder };
```

The new `greet` function MUST be added as a named export alongside `placeholder`:
```javascript
module.exports = { placeholder, greet };
```

Test runner contract (from package.json):
- `npm test` executes `node --test`
- Node's built-in test runner auto-discovers files matching `*.test.js`, `*.test.mjs`, `test/*.js`, etc.
- Use `node:test` and `node:assert` (built-in, no install needed)
</interfaces>

**Critical constraints (from CLAUDE.md + PROJECT.md):**
- ZERO npm dependencies — only Node.js built-ins (`node:test`, `node:assert`) allowed
- No build tooling, no TypeScript, no ES module conversion — keep CommonJS (`require` / `module.exports`)
- Don't break the existing `placeholder` export — `hello.js` is a seed file
- Test file naming: `hello.test.js` (Node test runner auto-discovers `*.test.js` at repo root)
</context>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: Add greet(name) to hello.js and create hello.test.js</name>
  <files>hello.js, hello.test.js</files>
  <behavior>
    Tests to write in hello.test.js (using node:test + node:assert):
    - Test 1: `greet('world')` returns exactly `'Hello, world!'`
    - Test 2: `greet('Alice')` returns exactly `'Hello, Alice!'` (parameter substitution sanity check)
    - Test 3: existing `placeholder()` still returns `'placeholder'` (regression — confirms we didn't break the seed export)
  </behavior>
  <action>
    Step 1 (RED — write failing tests first):
    Create `hello.test.js` at repo root with this exact content:

    ```javascript
    const test = require('node:test');
    const assert = require('node:assert');
    const { greet, placeholder } = require('./hello');

    test('greet returns "Hello, world!" for "world"', () => {
      assert.strictEqual(greet('world'), 'Hello, world!');
    });

    test('greet substitutes the name argument', () => {
      assert.strictEqual(greet('Alice'), 'Hello, Alice!');
    });

    test('placeholder export is preserved', () => {
      assert.strictEqual(placeholder(), 'placeholder');
    });
    ```

    Run `npm test` — MUST fail (greet undefined). This proves RED.

    Step 2 (GREEN — implement greet in hello.js):
    Edit `hello.js` to add the `greet` function and update `module.exports`:

    ```javascript
    // hello.js — placeholder module for work-ide demo repo
    // The Phase 24 UAT Draft ticket asks claude to add a greet(name) helper.
    // Do not edit by hand during the UAT — let the auto-build pipeline modify this file.

    function placeholder() {
      return 'placeholder';
    }

    function greet(name) {
      return `Hello, ${name}!`;
    }

    module.exports = { placeholder, greet };
    ```

    Notes:
    - Use template literal `` `Hello, ${name}!` `` (cleaner than string concat; supported in all modern Node versions)
    - Keep CommonJS — DO NOT convert to ESM (`export` / `import`). PROJECT.md constraint: plain Node.js, no transpile.
    - Keep the existing comment block at top of `hello.js` — it's part of the seed file's character.

    Step 3 (verify GREEN): Run `npm test` — all 3 tests must pass.
  </action>
  <verify>
    <automated>npm test</automated>
  </verify>
  <done>
    - `hello.js` contains both `placeholder` and `greet` functions, both named-exported via `module.exports`
    - `hello.test.js` exists at repo root with 3 tests using `node:test` + `node:assert`
    - `npm test` exits 0 with all 3 tests passing
    - `package.json` is unchanged (no new dependencies)
    - No new files outside `hello.js` and `hello.test.js`
  </done>
</task>

</tasks>

<verification>
Run from repo root:

```bash
npm test
```

Expected output (all tests pass):
- `greet returns "Hello, world!" for "world"` — pass
- `greet substitutes the name argument` — pass
- `placeholder export is preserved` — pass
- Exit code: 0

Sanity check — package.json unchanged:
```bash
git diff package.json    # should be empty
```

Sanity check — only the two intended files modified:
```bash
git status --short
# Expected:
#  M hello.js
# ?? hello.test.js
```
</verification>

<success_criteria>
- [ ] `greet('world')` returns `'Hello, world!'` (verified by automated test)
- [ ] `greet(name)` substitutes any name argument (verified by automated test)
- [ ] Existing `placeholder()` export still works (regression-verified)
- [ ] `npm test` exits 0
- [ ] No npm dependencies added (`package.json` unchanged)
- [ ] No build tooling / TypeScript introduced — pure CommonJS Node.js
- [ ] Only `hello.js` modified and `hello.test.js` created — no other repo drift
</success_criteria>

<output>
After completion, create `.planning/quick/260504-iei-hello-js-greet-name-function-hello-name-/260504-iei-SUMMARY.md` summarising:
- Files modified (`hello.js`) and created (`hello.test.js`)
- Test runner output (3/3 passing)
- Confirmation that no dependencies were added and CommonJS pattern was preserved
</output>
