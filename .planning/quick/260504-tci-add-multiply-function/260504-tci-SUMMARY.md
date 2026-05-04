---
quick_id: 260504-tci
slug: add-multiply-function
description: Add a multiply(a, b) function to hello.js that returns a * b, with a simple test
date: 2026-05-04
status: complete
---

# Summary: Add multiply(a, b) to hello.js

## What Was Done

- Added `multiply(a, b)` function to `hello.js` that returns `a * b`
- Exported `multiply` from `hello.js` alongside existing `placeholder`
- Created `hello.test.js` with 3 test cases using Node.js built-in `node:test`

## Test Results

All 3 tests passed:
- `multiply(3, 4)` → 12
- `multiply(5, 0)` → 0
- `multiply(-2, 3)` → -6

## Files Changed

- `hello.js` — added `multiply` function + export
- `hello.test.js` — new test file (created)
