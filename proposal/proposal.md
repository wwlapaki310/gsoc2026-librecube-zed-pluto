# GSoC 2026 Proposal – ZED PLUTO Language Plugin

**Organization**: LibreCube  
**Project**: ZED PLUTO Language Plugin  
**Mentor**: Sai  
**Project Size**: 90 hours | **Difficulty**: Easy

---

## 1. Personal Details and Contact Information

| Field | Detail |
|-------|--------|
| **Name** | Satoru Akita |
| **Email** | wwlap24@gmail.com |
| **Country** | Japan |
| **GitHub** | [github.com/wwlapaki310](https://github.com/wwlapaki310) |
| **GitLab** | wwlapaki310 |
| **This Repository** | [gsoc2026-librecube-zed-pluto](https://github.com/wwlapaki310/gsoc2026-librecube-zed-pluto) |

---

## 2. Biography

I am an EdgeAI specialist at Sony Semiconductor Solutions in Japan, where I work on the IMX500 intelligent vision sensor and the AITRIOS edge AI platform. My technical background spans embedded systems, RTOS (NuttX, FreeRTOS, Zephyr), camera hardware/software integration, and cloud IoT platforms (Azure, GCP).

Beyond my primary role, I am an active open-source contributor and developer. My side projects include:
- A GSoC 2026 application to the Apache Software Foundation to port Dropbear SSH to Apache NuttX RTOS (ESP32-S3, Raspberry Pi Pico W)
- Web application development (React, Supabase, Vercel)
- EdgeAI accessibility tools for visually impaired users (STM32N6570-DK, Neural-ART NPU)
- RTOS market research, having attended Open Source Summit Japan 2025

I have broad experience with Python, Git, and CI/CD workflows (GitHub Actions), and I regularly write technical documentation in both Japanese and English. I am particularly interested in developer tooling and language infrastructure — making domain-specific languages more accessible to engineers is something I find genuinely meaningful.

---

## 3. Summary

**PLUTO** (ECSS-E-ST-70-32C) is a domain-specific language designed for writing human-readable, machine-parsable test and operation procedures for space systems. LibreCube has already developed a PLUTO-to-Python parser and a VS Code/VSCodium syntax plugin, demonstrating the ecosystem around the language.

The goal of this project is to create a **ZED editor extension** that brings first-class PLUTO language support to ZED users, including:

- **Syntax highlighting** via Tree-sitter grammar
- **Code formatting** via a formatter integration
- (Stretch goal) **Auto-completion** and basic linting

ZED extensions use Tree-sitter for language parsing, which is both more powerful and more standardized than the TextMate grammars used in VS Code. This project will therefore produce a reusable, well-tested Tree-sitter grammar for PLUTO as its core artifact — benefiting the wider PLUTO ecosystem beyond just ZED.

---

## 4. Preparation

To familiarize myself with the project, I have:

### 4.1 Reviewed the existing VS Code plugin
- Studied the [vscodium-pluto-syntax](https://gitlab.com/librecube/tools/vscodium-pluto-syntax) repository to understand PLUTO's lexical and syntactic structure as expressed in TextMate grammars (`.tmLanguage`).
- Identified the key token categories: keywords, identifiers, literals, operators, comments, and procedure structure keywords.

### 4.2 Reviewed the PLUTO parser
- Reviewed the [python-pluto-parser](https://gitlab.com/librecube/lib/python-pluto-parser) to understand the formal grammar of PLUTO at a deeper level.
- This provides a ground-truth reference for building the Tree-sitter grammar.

### 4.3 Studied ZED extension development
- Read the [ZED extension documentation](https://zed.dev/docs/extensions/developing-extensions) and the [ZED language support guide](https://zed.dev/docs/extensions/languages).
- Understood that ZED language extensions require: a Tree-sitter grammar (`grammar.js`), a `config.toml` manifest, highlight queries (`.scm` files), and optionally formatter/LSP configuration.
- Reviewed example ZED language extensions (e.g., [zed-gleam](https://github.com/zed-industries/zed/tree/main/extensions/gleam)) as structural reference.

### 4.4 Tree-sitter fundamentals
- Reviewed the [Tree-sitter documentation](https://tree-sitter.github.io/tree-sitter/) and studied how `grammar.js` is structured for a DSL.
- Confirmed that a TextMate-to-Tree-sitter migration is a well-understood process.

### 4.5 Set up development environment
- ZED editor installed locally
- `tree-sitter-cli` installed and tested
- `node` / `npm` available for grammar building

---

## 5. Schedule and Milestones

The program coding period runs **May 8 – August 25, 2026** (approx. 15 weeks). For a 90-hour project (small size), the effective working period is focused.

| Week | Dates | Milestone | Deliverable |
|------|-------|-----------|-------------|
| 1 | May 8–14 | **Community Bonding / Setup** | Dev environment fully configured; initial contact with mentor Sai; review full PLUTO grammar spec and VS Code plugin in detail |
| 2 | May 15–21 | **Tree-sitter Grammar – Core** | `grammar.js` covering PLUTO keywords, literals, identifiers, operators, and comments; basic parse tests passing |
| 3 | May 22–28 | **Tree-sitter Grammar – Structure** | Grammar extended to cover procedure structure (steps, declarations, conditionals, loops); more comprehensive test corpus |
| 4 | May 29–Jun 4 | **Highlight Queries** | `.scm` highlight query file mapping grammar nodes to ZED semantic token types; syntax highlighting working in ZED |
| 5 | Jun 5–11 | **ZED Extension Scaffold** | `config.toml`, directory structure, extension manifest complete; extension installable locally in ZED |
| 6 | Jun 12–18 | **Formatter Integration** | Formatter hook connected (either wrapping the python-pluto-parser or a standalone rule-based formatter); basic indentation and spacing rules working |
| 7 | Jun 19–25 | **Midterm Evaluation** | Working ZED extension with syntax highlighting + formatting submitted; midterm evaluation completed |
| 8–9 | Jun 26–Jul 9 | **Testing & Edge Cases** | Broader test suite covering edge cases and real-world PLUTO procedure files; bug fixes from mentor review |
| 10 | Jul 10–16 | **Stretch: Auto-completion** | *(If on schedule)* Basic completion provider for PLUTO keywords and common patterns |
| 11–12 | Jul 17–30 | **Documentation** | README, installation guide, developer guide for contributing to the extension; usage examples with screenshots |
| 13 | Jul 31–Aug 6 | **CI / Packaging** | GitHub Actions CI for grammar tests; extension packaged for submission to ZED extension registry |
| 14–15 | Aug 7–25 | **Final Review & Submission** | Final polish, mentor feedback incorporated; final evaluation submitted |

---

## 6. Deliverables

At the end of the program, the following will be submitted to LibreCube:

### Primary Deliverables
1. **Tree-sitter grammar for PLUTO** (`grammar.js` + compiled WASM)
   - Full coverage of PLUTO syntax based on ECSS-E-ST-70-32C
   - Comprehensive test suite (`test/corpus/`)

2. **ZED Language Extension**
   - `config.toml` manifest
   - Highlight queries (`.scm`)
   - Formatter integration
   - Locally installable and tested on real PLUTO procedure files

3. **Extension Package**
   - Ready for submission to the [ZED extension registry](https://github.com/zed-industries/extensions)
   - GitLab merge request to the LibreCube repository

4. **Documentation**
   - Installation and usage guide for end users
   - Developer guide for future contributors
   - Inline code comments throughout

### Stretch Deliverables
5. **Basic auto-completion** for PLUTO keywords and procedure structure
6. **Integration test** with the existing python-pluto-parser to validate round-trip correctness

---

## 7. Notes on AI Tooling

In line with LibreCube's policy, I intend to use AI coding assistants (Claude, Copilot) as productivity aids during development — particularly for boilerplate Tree-sitter grammar patterns and repetitive `.scm` query syntax. All AI-generated code will be:
- Clearly disclosed in commit messages or PR descriptions where applicable
- Reviewed, understood, and tested by me before submission
- Never submitted if I cannot explain how it works

---

## 8. Motivation

Space systems infrastructure is an area where high-quality tooling has a direct impact on mission reliability. PLUTO procedures are used in real space operations — having robust editor support means fewer syntax errors and more readable code for engineers working on critical systems. I find this intersection of developer tooling and aerospace deeply interesting, and I am excited about the opportunity to contribute something concrete and lasting to the LibreCube ecosystem.
