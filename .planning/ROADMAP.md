# Roadmap: work-flow-demo

## Overview

此 fixture repo 的唯一演進目標是補齊三份 documentation，讓任何人（包括 work-ide 開發者本身）都能在無需額外溝通的情況下理解 fixture 角色、跑 UAT、並在事後把 repo 還原為 seed 狀態。所有 source code 已在 seed commit 中就位；本 roadmap 只包含一個 doc-writing phase。

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Fixture Documentation** - 撰寫三份 docs，讓 fixture 角色、UAT 流程、cleanup procedure 完整文件化

## Phase Details

### Phase 1: Fixture Documentation
**Goal**: 任何人打開 repo 即可理解這是 work-ide UAT fixture、知道如何跑 scenario、知道跑完後如何 reset 到 seed 狀態
**Depends on**: Nothing (first phase)
**Requirements**: FIX-06, FIX-07, FIX-08
**Success Criteria** (what must be TRUE):
  1. `README.md` 清楚說明此 repo 是 work-ide UAT target（非 product），並連結 `.planning/PROJECT.md`
  2. Cleanup procedure 以步驟清單形式存在於 doc 中，可照步驟執行 feature branch 刪除、UAT PR 關閉、`main`/`develop` reset to seed
  3. Canonical UAT scenario（`greet(name)` + unit test）文件化，含預期 pipeline 行為與 cleanup 後狀態
  4. 讀完三份 doc 後，無需詢問任何人即可完整執行一次 UAT 並 cleanup
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Fixture Documentation | 0/? | Not started | - |
