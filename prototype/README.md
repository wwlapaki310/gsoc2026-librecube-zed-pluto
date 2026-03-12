# prototype/

This directory contains the early-stage implementation of the ZED PLUTO language extension.

## Structure

```
prototype/
├── grammar.js          # Tree-sitter grammar for PLUTO (WIP)
├── package.json        # tree-sitter-cli build config
├── queries/
│   └── highlights.scm  # ZED syntax highlighting queries (WIP)
└── test/
    └── corpus/
        └── basic.txt   # Tree-sitter corpus tests
```

## Dev Environment Setup

### Prerequisites

```bash
# Node.js >= 18 required
node --version

# Install tree-sitter CLI globally
npm install -g tree-sitter-cli

# Verify
tree-sitter --version
```

### Build and Test

```bash
cd prototype/
npm install

# Generate parser from grammar.js
tree-sitter generate

# Run corpus tests
tree-sitter test

# Parse a PLUTO file interactively
tree-sitter parse test/corpus/basic.txt
```

### Install ZED (for live testing)

- Download: https://zed.dev/download
- ZED extensions live at `~/.config/zed/extensions/`
- During development, symlink this directory for hot-reload

## Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| `grammar.js` | 🟡 WIP skeleton | Core structure done; needs full expression/type coverage |
| `highlights.scm` | 🟡 WIP draft | Token mappings drafted; depends on final grammar nodes |
| Corpus tests | 🟡 Basic cases | 4 test cases covering procedure, step, if, wait |
| ZED extension manifest | ⬜ Not started | `config.toml` + extension wiring |
| Formatter | ⬜ Not started | Planned for Week 6 |

## Notes on Tree-sitter and Case-Insensitivity

PLUTO is case-insensitive (per ECSS spec). Tree-sitter grammars are case-sensitive by default.
The current approach uses a `caseInsensitive()` helper function in `grammar.js` that expands
each keyword letter into a character class (e.g. `procedure` → `[pP][rR][oO]...`).
This is a standard workaround; an alternative is a custom external scanner in C.
