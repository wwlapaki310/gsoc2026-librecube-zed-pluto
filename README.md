# GSoC 2026 – LibreCube: ZED PLUTO Language Plugin

[![GSoC 2026](https://img.shields.io/badge/GSoC-2026-orange?logo=google)](https://summerofcode.withgoogle.com/)
[![Organization](https://img.shields.io/badge/Organization-LibreCube-blue)](https://librecube.org/)
[![Project Size](https://img.shields.io/badge/Project%20Size-90%20hours-green)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)]()
[![Status](https://img.shields.io/badge/Status-Applying-yellow)]()

This repository documents my **Google Summer of Code 2026** application and preparation work for the **LibreCube** organization.

---

## 🚀 Project: ZED PLUTO Language Plugin

### What is PLUTO?

[PLUTO](https://ecss.nl/standard/ecss-e-st-70-32c-test-and-operations-procedure-language/) (Procedure Language for Users in Test and Operations) is a domain-specific language standardized by the European Committee for Space Standardization (ECSS-E-ST-70-32C). It is designed to write human-readable, machine-parsable procedures for testing and operating space systems.

PLUTO is actively used in real missions including ESA's **Gaia**, **Sentinel**, and **Galileo** programs. LibreCube has developed an open-source [PLUTO-to-Python parser](https://gitlab.com/librecube/lib/python-pluto-parser) and a [VSCodium syntax plugin](https://gitlab.com/librecube/tools/vscodium-pluto-syntax) as part of their mission to democratize space operations tooling.

### What I Will Build

The goal of this project is to create a **language support extension for the [ZED editor](https://zed.dev/)** that provides:

| Feature | Approach |
|---------|----------|
| **Syntax highlighting** | Tree-sitter grammar (`grammar.js`) + highlight queries (`.scm`) |
| **Code formatting** | Formatter integration (rules-based or wrapping python-pluto-parser) |
| **Auto-completion** *(stretch)* | Keyword and procedure structure completions |

The core deliverable — a **Tree-sitter grammar for PLUTO** — is reusable beyond ZED and will benefit the broader ecosystem (Neovim, Helix, etc.).

### Project Metadata

| Field | Detail |
|-------|--------|
| **Organization** | [LibreCube](https://librecube.org/) |
| **Mentor** | Sai |
| **Project Size** | 90 hours (Small) |
| **Difficulty** | Easy |
| **Reference Implementation** | [vscodium-pluto-syntax](https://gitlab.com/librecube/tools/vscodium-pluto-syntax) |

---

## 👤 About Me

I'm **Satoru Akita**, an embedded systems and EdgeAI engineer based in Japan.

### Professional Background

I currently work at **Sony Semiconductor Solutions** as an EdgeAI specialist, where I focus on the [IMX500](https://www.sony-semicon.com/en/products/is/industry/p_imx500.html) intelligent vision sensor and the [AITRIOS](https://www.aitrios.sony-semicon.com/) edge AI platform. My day-to-day work spans the full stack from hardware bring-up to cloud integration:

- **Embedded systems & RTOS**: NuttX, FreeRTOS, Zephyr
- **Camera & vision systems**: IMX500, Raspberry Pi, custom hardware
- **Cloud IoT integration**: Azure IoT Hub, GCP
- **Open-source**: active contributor across embedded/IoT projects

### Space Engineering Roots

My passion for space systems goes back to university, where I studied **Aerospace Engineering**. During my undergraduate years, I was part of a student rocket team where we designed, built, and **launched sounding rockets** — a hands-on experience that gave me a deep appreciation for the rigor and precision that space systems demand.

Today, I continue to work in the space domain outside of my primary role. I am a member of a **small satellite project** at my company that uses the **Sony SPRESENSE** microcontroller platform, developing onboard software for a CubeSat-class spacecraft. This work has renewed my interest in the full lifecycle of space systems — from embedded flight software to ground operations tooling.

I am also actively considering **transitioning to a space agency** such as JAXA or a space-focused company, and I see GSoC 2026 as a meaningful step toward building a track record in the open-source space engineering community.

### Why This Project

PLUTO bridges the gap between human-readable operations procedures and automated space mission control. As someone who has both launched rockets and works on satellite software, I find this intersection deeply meaningful — better developer tooling means fewer errors in mission-critical procedures. Contributing to the ZED plugin is a way to make real space operations more accessible and reliable.

**GitHub:** [github.com/wwlapaki310](https://github.com/wwlapaki310)

---

## 📋 Weekly Schedule (Coding Period: May 8 – Aug 25, 2026)

| Week | Dates | Focus | Milestone |
|------|-------|-------|-----------|
| **1** | May 8–14 | Community bonding, mentor sync, deep-dive into PLUTO spec & VS Code plugin | Dev environment fully configured |
| **2** | May 15–21 | Tree-sitter grammar – core tokens (keywords, identifiers, literals, comments) | `grammar.js` v0.1, basic parse tests passing |
| **3** | May 22–28 | Tree-sitter grammar – procedure structure (steps, blocks, conditionals, loops) | Grammar covers full PLUTO structure |
| **4** | May 29–Jun 4 | Highlight queries (`.scm`) – map grammar nodes to ZED semantic tokens | Syntax highlighting working in ZED locally |
| **5** | Jun 5–11 | ZED extension scaffold – `config.toml`, manifest, directory structure | Extension installable in ZED |
| **6** | Jun 12–18 | Formatter integration – indentation, spacing, basic normalization rules | Formatter working on sample PLUTO files |
| **7** | Jun 19–25 | **Midterm evaluation** – working extension submitted; mentor review & feedback | ✅ Midterm passed |
| **8–9** | Jun 26–Jul 9 | Testing & edge cases – broader corpus of real PLUTO procedures, bug fixes | Robust test suite |
| **10** | Jul 10–16 | *(Stretch)* Basic auto-completion for keywords and procedure structure | Completion provider |
| **11–12** | Jul 17–30 | Documentation – README, install guide, developer guide, usage screenshots | Docs complete |
| **13** | Jul 31–Aug 6 | CI/CD – GitHub Actions for grammar tests; extension packaged | Ready for ZED extension registry |
| **14–15** | Aug 7–25 | Final polish, mentor feedback incorporated, final submission | ✅ Final evaluation |

---

## 📦 Deliverables

**Primary**
1. Tree-sitter grammar for PLUTO (`grammar.js` + compiled WASM + test corpus)
2. ZED language extension (highlight queries, formatter, `config.toml`)
3. Extension package — ready for submission to the [ZED extension registry](https://github.com/zed-industries/extensions)
4. Documentation (user guide + developer guide)

**Stretch**
5. Basic auto-completion for PLUTO keywords and procedure blocks
6. Round-trip integration test with python-pluto-parser

---

## 🗂️ Repository Structure

```
.
├── README.md                  # This file
├── proposal/
│   └── proposal.md            # Full GSoC proposal (LibreCube template)
├── research/
│   ├── pluto_syntax.md        # PLUTO language syntax notes & examples
│   └── zed_extension.md       # ZED extension development notes
└── prototype/
    └── (WIP)                  # Early grammar prototype
```

---

## 🔗 Key References

- [LibreCube GSoC 2026 Projects](https://librecube.org/google-summer-of-code/)
- [ECSS-E-ST-70-32C Standard](https://ecss.nl/standard/ecss-e-st-70-32c-test-and-operations-procedure-language/) — PLUTO specification
- [python-pluto-parser](https://gitlab.com/librecube/lib/python-pluto-parser) — LibreCube's PLUTO parser
- [vscodium-pluto-syntax](https://gitlab.com/librecube/tools/vscodium-pluto-syntax) — Reference VS Code plugin
- [ZED Extensions Documentation](https://zed.dev/docs/extensions/developing-extensions)
- [Tree-sitter Documentation](https://tree-sitter.github.io/tree-sitter/)
- [Full Proposal](proposal/proposal.md)
- [PLUTO Syntax Research Notes](research/pluto_syntax.md)
