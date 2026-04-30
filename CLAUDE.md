# CLAUDE.md

## Project

**work-flow-demo** — work-ide auto-build pipeline 的 E2E UAT fixture。

> **Important:** 這個 repo 不是 product，是 work-ide 開發者（sam.tang）反覆跑 happy-path E2E UAT 的 verification target。詳見 `.planning/PROJECT.md`。

## Technology Stack

**Analysis Date:** 2026-04-30

### Languages
- **JavaScript** — Application code (`hello.js`)

### Runtime
- **Node.js** — No specific version declared (`.nvmrc` not present)
- **Package Manager:** npm (implied by `package.json`); lockfile not detected
- **Test Runner:** Node.js built-in (`node --test`) — specified in `package.json` scripts

### Frameworks
- **Core:** None detected — plain Node.js module
- **Build/Dev:** None — no bundler / transpiler / build tooling

### Dependencies
- **Critical:** None — zero external dependencies in `package.json`

### Configuration
- `package.json` — basic metadata + test script only
- No `.env`, no `config/` directory, no build config

## GSD Workflow

此專案使用 [Get-Shit-Done](https://github.com/) workflow。Planning artifacts 位於 `.planning/`：

- `.planning/PROJECT.md` — Project context & constraints
- `.planning/REQUIREMENTS.md` — Scoped requirements with REQ-IDs (FIX-01..FIX-08)
- `.planning/ROADMAP.md` — Phase structure (1 phase: Fixture Documentation)
- `.planning/STATE.md` — Project memory
- `.planning/codebase/` — Codebase map (7 docs)
- `.planning/config.json` — Workflow preferences (YOLO, coarse, plan_check + verifier)

**Next command:** `/gsd-plan-phase 1` (plan Fixture Documentation phase)

## Constraints (Critical)

由於此 repo 是 fixture，以下約束**必須**遵守：

1. `main` branch 永遠保持 seed 狀態 — 任何 phase 產出的 doc 修改必須在 feature branch
2. 不加 npm dependencies — 增加 cleanup 複雜度
3. 不加 build tooling / TypeScript — 違反 minimal seed 原則
4. 任何「擴充功能」的衝動先檢查 PROJECT.md `Out of Scope` section

## Cleanup-for-retry

每次 UAT 後，將 repo reset 至 seed 狀態：
- 刪除 feature branches、關閉 UAT PRs
- `main` / `develop` 還原至 seed commit (`7138ff1`)
- 詳細 procedure 將在 Phase 1 `FIX-07` 文件化
