# Codebase Structure

**Analysis Date:** 2026-04-30

## Directory Layout

```
work-flow-demo/
├── hello.js            # Main module — placeholder for UAT
├── package.json        # NPM configuration and metadata
├── README.md           # Project documentation (minimal)
├── .gitignore          # Git ignore rules
└── .git/               # Git repository metadata
```

## Directory Purposes

**Project Root:**
- Purpose: Contains all project files and configuration
- Contains: Module code, configuration, and documentation
- Key files: `hello.js`, `package.json`

## Key File Locations

**Entry Points:**
- `hello.js`: Main module entry point defined in `package.json#main`

**Configuration:**
- `package.json`: NPM project metadata, scripts, version, and entry point definition

**Documentation:**
- `README.md`: Project overview (currently minimal)

**Core Logic:**
- `hello.js`: Single module containing `placeholder()` function

**Testing:**
- No test files present — test script references `node --test` in `package.json`

## Naming Conventions

**Files:**
- Lowercase with `.js` extension for modules

**Directories:**
- Not applicable — no subdirectories in root project structure

## Where to Add New Code

**New Feature:**
- Primary code: Add functions to `hello.js` or create new `.js` files in project root
- Tests: Create `.test.js` files in project root; run via `npm test`

**New Module:**
- Implementation: Create new `.js` file in project root
- Update `package.json#main` if changing primary entry point

**Utilities:**
- Shared helpers: Add to `hello.js` or create `utils.js` in project root

## Special Directories

**.planning:**
- Purpose: Stores GSD codebase analysis documents
- Generated: Yes — created and updated by gsd-map-codebase
- Committed: No — documents support development tooling

**.git:**
- Purpose: Git repository metadata and history
- Generated: Yes — created by git init
- Committed: No — system directory

---

*Structure analysis: 2026-04-30*
