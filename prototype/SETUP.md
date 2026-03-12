# Local Development Setup

## Prerequisites

- Node.js >= 18
- tree-sitter-cli

```bash
# Install tree-sitter CLI
npm install -g tree-sitter-cli

# Confirm
tree-sitter --version
# → tree-sitter 0.22.x
```

## Build the parser

```bash
cd prototype/

# Generate parser C code from grammar.js
tree-sitter generate

# Expected output:
# Wrote src/parser.c
# Wrote src/node-types.json
# Wrote src/grammar.json
```

## Run tests

```bash
tree-sitter test
```

Expected (all passing):
```
  basic
    ✓ Minimal procedure
    ✓ Procedure with preconditions and confirmation
    ✓ Step structure
    ✓ If statement
```

## Parse a real PLUTO file

```bash
# Parse and print the syntax tree
tree-sitter parse examples/gyro_startup.pluto

tree-sitter parse examples/orbit_maneuver.pluto
```

You should see an AST like:
```
(source_file [0, 0] - [33, 0]
  (procedure [2, 0] - [32, 13]
    name: (identifier [2, 10] - [2, 22])
    (preconditions [3, 2] - [5, 18]
      ...
```

## Troubleshooting

| Error | Fix |
|-------|-----|
| `tree-sitter: command not found` | `npm install -g tree-sitter-cli` |
| `node-gyp` errors during generate | Only C source is needed for `tree-sitter parse`; ignore gyp |
| Conflict warnings in grammar | Expected at WIP stage — note them for later refinement |
