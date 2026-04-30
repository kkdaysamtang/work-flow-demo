# Requirements: work-flow-demo

**Defined:** 2026-04-30
**Core Value:** Repo 任何時候都能當成 work-ide auto-build pipeline 的有效 target — `main` 永遠保持 seed 狀態，無破壞性 drift。

## v1 Requirements

> Fixture 自身的 baseline。**不包含** work-ide 從 Draft ticket 動態 inject 的 scenarios（那些紀錄在 `PROJECT.md` 的 Canonical UAT Scenarios section）。

### Fixture Baseline (Validated — already in seed)

> 這些已經存在於 seed commit（`7138ff1`），列出來是為了 traceability。

- [x] **FIX-01**: Repo 有 valid `package.json`，包含 Node.js 專案 metadata 與 `node --test` script
- [x] **FIX-02**: Repo 有可被修改的 placeholder source file (`hello.js`)
- [x] **FIX-03**: 可用 `node --test` runner 執行 tests（無需 npm install）
- [x] **FIX-04**: Git repo 已初始化，有 `main` 與 `develop` branches
- [x] **FIX-05**: `.gitignore` 排除 `.idea/`

### Fixture Documentation (Active)

- [ ] **FIX-06**: `README.md` 文件化此 repo 的 fixture 角色（簡短說明這不是 product，是 work-ide UAT target；連結到 `.planning/PROJECT.md`）
- [ ] **FIX-07**: 文件化 cleanup-for-retry procedure — 步驟清單，描述每次 UAT 後如何把 feature branch + UAT PR 清掉、把 `main`/`develop` 還原到 seed 狀態
- [ ] **FIX-08**: Canonical UAT scenarios reference doc — 文件化 happy-path scenario（`greet(name)` + unit test），含預期 work-ide pipeline 行為與 cleanup 後狀態

## v2 Requirements

> Fixture 沒有 v2 計畫 — 演進需求違反 seed-state invariant。任何「擴充功能」的衝動都應在 PROJECT.md `Out of Scope` 已被駁回。

(None — fixture 設計即為穩定 seed)

## Out of Scope

| Feature | Reason |
|---------|--------|
| 產品功能、business logic | 此 repo 是 fixture 不是 product |
| Production deployment / CI/CD pipeline | Pipeline 是 work-ide 端，不是 fixture 的事 |
| Milestone 規劃 / 多階段 roadmap | Fixture 無「演進」需求 |
| 複雜架構、多 module 結構 | 違反 placeholder simplicity |
| 真實 unit/integration tests | Tests 由 UAT scenario 動態 inject |
| Dependencies (npm install) | 增加 cleanup 複雜度，用 builtin `node --test` |
| TypeScript / build tooling / bundler | 違反 minimal seed 原則 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FIX-01 | (validated, seed) | Complete |
| FIX-02 | (validated, seed) | Complete |
| FIX-03 | (validated, seed) | Complete |
| FIX-04 | (validated, seed) | Complete |
| FIX-05 | (validated, seed) | Complete |
| FIX-06 | Phase [pending roadmap] | Pending |
| FIX-07 | Phase [pending roadmap] | Pending |
| FIX-08 | Phase [pending roadmap] | Pending |

**Coverage:**
- v1 requirements: 8 total (5 validated + 3 active)
- Mapped to phases: 0 ⚠️ (will be filled by roadmapper)
- Unmapped (active only): 3

---
*Requirements defined: 2026-04-30*
*Last updated: 2026-04-30 after initial definition*
