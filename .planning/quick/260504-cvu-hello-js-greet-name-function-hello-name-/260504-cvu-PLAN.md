---
phase: quick-260504-cvu
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - hello.js
  - hello.test.js
autonomous: true
requirements:
  - QUICK-260504-CVU
must_haves:
  truths:
    - "Calling greet('world') returns the string 'Hello, world!'"
    - "Running `npm test` exits 0 with the new test passing"
    - "hello.js still exports greet (in addition to the existing placeholder export)"
  artifacts:
    - path: "hello.js"
      provides: "greet(name) helper that returns `Hello, ${name}!`"
      contains: "function greet"
    - path: "hello.test.js"
      provides: "Node built-in test runner spec for greet()"
      contains: "greet('world')"
  key_links:
    - from: "hello.test.js"
      to: "hello.js"
      via: "require('./hello')"
      pattern: "require\\(['\"]\\./hello['\"]\\)"
---

<objective>
Add a `greet(name)` helper to `hello.js` and a Node built-in test runner spec that asserts `greet('world') === 'Hello, world!'`.

Purpose: Provide a deterministic, observable code change for the work-ide auto-build pipeline E2E UAT. The fixture is intentionally trivial — the value is in the diff being small, predictable, and test-verified.
Output: Updated `hello.js` exporting `greet` alongside `placeholder`, plus a new `hello.test.js` running under `node --test`.
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
<!-- Current shape of hello.js (must be preserved + extended). -->

From hello.js:
```javascript
function placeholder() {
  return 'placeholder';
}

module.exports = { placeholder };
```

Required new export shape after this plan:
```javascript
module.exports = { placeholder, greet };
// greet(name: string) => `Hello, ${name}!`
```

Test runner: `node --test` (Node.js built-in). Test files matching `*.test.js` are auto-discovered. Use `node:test` and `node:assert/strict`:
```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
```
</interfaces>
</context>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: Add greet(name) helper with passing unit test</name>
  <files>hello.js, hello.test.js</files>
  <behavior>
    - Test 1 (required by task spec): `greet('world')` returns exactly the string `Hello, world!`
    - Test 2 (sanity, keeps regression coverage on the original export): `placeholder()` still returns `'placeholder'`
  </behavior>
  <action>
    Step A — Write the failing test FIRST (RED):
    Create `hello.test.js` at the repo root with:
    ```javascript
    const test = require('node:test');
    const assert = require('node:assert/strict');
    const { greet, placeholder } = require('./hello');

    test("greet('world') returns 'Hello, world!'", () => {
      assert.equal(greet('world'), 'Hello, world!');
    });

    test('placeholder() still returns "placeholder"', () => {
      assert.equal(placeholder(), 'placeholder');
    });
    ```
    Run `npm test` and confirm it FAILS because `greet` is undefined (this is the RED step — proves the test actually exercises the new code).

    Step B — Implement greet (GREEN):
    Edit `hello.js`. Keep the existing `placeholder` function and the leading comment block untouched. Add:
    ```javascript
    function greet(name) {
      return `Hello, ${name}!`;
    }
    ```
    Update the `module.exports` line to: `module.exports = { placeholder, greet };`

    Constraints (from CLAUDE.md):
    - Do NOT add any npm dependency.
    - Do NOT introduce TypeScript / build tooling / bundler config.
    - Do NOT remove or rewrite the existing `placeholder` function or the top-of-file comment.
    - Use template literal `` `Hello, ${name}!` `` (not string concat) — matches the exact spec output and keeps the diff readable.
    - Do not add input validation, defaults, or trimming — spec is `greet('world') === 'Hello, world!'` and nothing more.
  </action>
  <verify>
    <automated>npm test</automated>
  </verify>
  <done>
    - `npm test` exits 0 with both tests passing.
    - `hello.js` exports both `placeholder` and `greet`.
    - `hello.test.js` exists at repo root and contains the `greet('world')` assertion.
    - `package.json` is unchanged (no new dependencies, no script changes).
    - Original `placeholder` function and leading comment block are unchanged.
  </done>
</task>

</tasks>

<verification>
- Run `npm test` — must exit 0.
- `git diff main -- hello.js` shows only the addition of `greet` and the export update; no lines removed from the existing function or comment.
- `git status` shows exactly two changed paths: `hello.js` (modified) and `hello.test.js` (new).
- `package.json` and `package-lock.json` (if any) are NOT in the diff.
</verification>

<success_criteria>
- `node -e "console.log(require('./hello').greet('world'))"` prints `Hello, world!`.
- `npm test` reports both tests passing.
- No new dependencies, no new tooling, no edits outside `hello.js` and `hello.test.js`.
</success_criteria>

<output>
After completion, create `.planning/quick/260504-cvu-hello-js-greet-name-function-hello-name-/260504-cvu-01-SUMMARY.md` documenting:
- Final shape of `hello.js` exports
- Test output from `npm test`
- Confirmation that constraints (no deps, no tooling, main untouched scope) were respected
</output>
