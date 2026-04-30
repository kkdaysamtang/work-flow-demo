# work-flow-demo

## What This Is

一個極簡的 Node.js fixture repo，用途是當 work-ide auto-build pipeline 的 E2E UAT target。提供 placeholder source files (`hello.js`) + minimal `package.json`（`node --test` runner），讓 work-ide 從 Draft ticket 觸發 Auto Build 時，有真實的檔案可以被 claude PTY step 修改、被 reorganize-commits step rebase、被 pr-create step 開 PR。使用者：work-ide 開發者本人（sam.tang），用來重複跑 happy-path E2E UAT。

## Core Value

**Repo 任何時候都能當成 work-ide auto-build pipeline 的有效 target** — `main` 永遠保持 seed 狀態（`hello.js` + `package.json` + `README.md`），無破壞性 drift；每次 UAT 結束後可以乾淨 reset，pipeline 下次跑進來看到的是相同初始條件。

## Requirements

### Validated

✓ 已存在於 seed commit (`7138ff1`)：

- ✓ **FIX-01**: Repo 有 valid `package.json` (Node.js 專案 metadata) — existing
- ✓ **FIX-02**: Repo 有可被修改的 placeholder source file (`hello.js`) — existing
- ✓ **FIX-03**: 有 `node --test` runner 可跑（test script 在 `package.json`）— existing
- ✓ **FIX-04**: Git repo 已初始化，有 `main` 與 `develop` branch — existing
- ✓ **FIX-05**: `.gitignore` 排除 `.idea/` — existing

### Active

- [ ] **FIX-06**: 在 `README.md` 文件化此 repo 的 fixture 角色（簡短說明這不是 product，是 work-ide UAT target）
- [ ] **FIX-07**: 文件化 cleanup-for-retry procedure — 每次 UAT 後要怎麼把 feature branch + UAT PR 清掉、把 `main`/`develop` 還原到 seed 狀態
- [ ] **FIX-08**: Canonical UAT scenarios 寫成 reference doc — 第一個 scenario：「在 `hello.js` 加上 `greet(name)` function 回傳 `Hello, {name}!`，並建立 simple unit test」

### Out of Scope

- **產品功能、business logic** — 此 repo 不是 product，是 fixture
- **Production deployment / CI/CD pipeline** — pipeline 是 work-ide 端的事，不是 fixture 的事
- **Milestone 規劃 / 多階段 roadmap** — fixture 沒有「演進」需求，永遠保 seed 狀態
- **複雜架構、多 module 結構** — 違反「placeholder 給 claude PTY 修改」的 simplicity 目標
- **真實的 unit/integration tests** — Tests 是 UAT scenario 動態 inject 的內容，不是 fixture 自己的 baseline
- **Dependencies (npm install)** — 用 Node.js 內建的 `node --test`；`node_modules` 增加 cleanup 複雜度
- **TypeScript / build tooling / bundler** — 違反 minimal seed 原則；plain ES modules 就夠

## Canonical UAT Scenarios

> 這些是 work-ide 端從 Draft ticket 動態 inject 給 fixture 的 scenarios。**不屬於 fixture 自己的 requirements**，僅作為 UAT happy-path 的 reference。

### Scenario 1 — greet function + unit test (current Draft)

**Draft ticket 描述：** 在 `hello.js` 加上 `greet(name)` function，回傳 `Hello, {name}!`，並建立 simple unit test。

**預期 work-ide pipeline 行為：**
1. Draft ticket → Auto Build 觸發
2. claude PTY step 在 feature branch 修改 `hello.js`、新增 test 檔
3. reorganize-commits step 把 commits rebase 成乾淨歷史
4. pr-create step 開 UAT PR 指向 `develop`
5. UAT verifier 確認 `node --test` 跑得過

**Cleanup 後狀態：** Feature branch 刪除、UAT PR 關掉、`main`/`develop` 回到 seed commit。

## Context

- **角色：** Verification fixture for work-ide auto-build pipeline，不是 product
- **使用者：** sam.tang (work-ide developer)，反覆跑 happy-path E2E UAT
- **Cadence：** 每次跑 UAT 都會建立 feature branch + PR，跑完用 cleanup-for-retry procedure 清掉
- **State invariant：** `main` 永遠 = seed (`7138ff1`); `develop` 同步 `main`；任何 feature/UAT branch 是 ephemeral
- **Codebase map：** `.planning/codebase/` (建立於 `/gsd-map-codebase`，commit `c06966f`)
- **Meta UAT 性質：** `/gsd-new-project` 本身亦為 work-ide UAT 的一部分（產生 PROJECT/REQUIREMENTS/ROADMAP artifacts → work-ide 從中拾 Draft ticket → 觸發 Auto Build）。Docs 內容對 fixture 不重要，**process 跑得通才重要**

## Constraints

- **Tech stack**: 必須是 plain Node.js (>=20，`node --test` builtin) — 任何 dependency / bundler 違反 fixture 的 minimal 原則
- **Repo state**: `main` branch 永遠保持 seed 狀態 — 任何 phase 產出的 docs 都應該被 cleanup 流程移除或 reset
- **Compatibility**: work-ide pipeline 假設 GSD `.planning/` 結構存在（`PROJECT.md`、`REQUIREMENTS.md`、`ROADMAP.md`）— 此 repo 必須產出符合 GSD schema 的 artifacts，即使內容對 fixture 本身可拋棄
- **Scope discipline**: 不是 product，所以**任何「擴充功能」的衝動都應該被駁回**

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Repo 角色定位為 fixture，非 product | 使用者明確說明此 repo 是 work-ide UAT target，不是要 ship 出去的東西 | ✓ Good |
| Meta UAT 模式 — 用 `/gsd-new-project` 跑流程驗證 | work-ide 消費 GSD 產出的 planning artifacts；`/gsd-new-project` 執行本身是 UAT 的一步 | — Pending |
| Draft ticket scenario 放 PROJECT.md 而非 REQUIREMENTS | Scenario 是 work-ide 動態 inject 的內容，不是 fixture 自己的 requirement | — Pending |
| 跳過 milestone 結構，roadmap 採單 phase | Fixture 無「演進」需求；強行多 phase 違反 seed-state invariant | — Pending |
| 保留 `node --test` builtin，不加 npm dependencies | 任何 npm install 增加 cleanup 複雜度與 pipeline timing 不確定性 | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

> **Note for this fixture:** Evolution rules are formally present for GSD schema compliance, but in practice this repo's `main` is reset after each UAT run. Treat updates as ephemeral.

---
*Last updated: 2026-04-30 after initialization*
