# GSoC 2026 – LibreCube: ZED PLUTO Language Plugin

[![GSoC 2026](https://img.shields.io/badge/GSoC-2026-orange?logo=google)](https://summerofcode.withgoogle.com/)
[![Organization](https://img.shields.io/badge/Organization-LibreCube-blue)](https://librecube.org/)
[![Project Size](https://img.shields.io/badge/Project%20Size-90%20hours-green)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)]()

This repository tracks my **Google Summer of Code 2026** application and work for the **LibreCube** project:

> **ZED PLUTO Language Plugin** — A language support plugin for the ZED editor that provides syntax highlighting and code formatting for the PLUTO domain-specific language used in space system procedures.

---

## 📌 Project Overview

**PLUTO** is a domain-specific language (DSL) designed for writing procedures used in the testing and operation of space systems. PLUTO procedures are both human-readable and machine-parsable (a PLUTO-to-Python parser already exists).

The goal of this project is to build a **ZED editor extension** that provides:
- ✅ Syntax highlighting for PLUTO
- ✅ Code formatting support
- ✅ (Stretch) Auto-completion and linting hooks

A previous **VS Code plugin** exists and will serve as a reference implementation.

| Item | Detail |
|------|--------|
| **Organization** | LibreCube |
| **Mentor** | Sai |
| **Project Size** | 90 hours |
| **Difficulty** | Easy |
| **Primary Skills** | Python, PLUTO |

---

## 🏢 About LibreCube

LibreCube is building an open-source ecosystem for semi-autonomous exploration systems and space technology. They rely on contributors to grow their open-source platform.

**GSoC @ LibreCube highlights:**
- Actively encourages applications from women and under-represented groups
- Focused on real open-source engagement, not just code delivery
- Most projects require basic Python and Git knowledge
- AI tooling is permitted for code generation, but contributors **must** understand and be able to explain any AI-generated code they submit

More info: [librecube.org/google-summer-of-code](https://librecube.org/google-summer-of-code/)

---

## 👤 About Me

I'm **Satoru**, an EdgeAI specialist at Sony Semiconductor Solutions, working on the IMX500 intelligent vision sensor and the AITRIOS edge AI platform. My background spans:

- Embedded systems & RTOS (NuttX, FreeRTOS, Zephyr)
- Edge AI / camera systems (Raspberry Pi, IMX500)
- IoT platform integration (Azure IoT, GCP)
- Open-source development (active OSS contributor)
- Academic conference participation and technical writing

I am also currently applying for GSoC 2026 under the Apache Software Foundation (NuttX RTOS project), which reflects my sustained interest in contributing to open-source infrastructure projects.

**GitHub:** [github.com/wwlapaki310](https://github.com/wwlapaki310)

---

## 🗂️ Repository Structure

```
.
├── README.md              # This file – application overview
├── proposal/
│   └── proposal.md        # Full GSoC project proposal
├── research/
│   ├── pluto_syntax.md    # Notes on PLUTO language syntax
│   └── zed_extension.md   # Notes on ZED extension development
└── prototype/
    └── (WIP)              # Early prototype work
```

---

## 📝 Proposal

→ See [`proposal/proposal.md`](proposal/proposal.md) *(coming soon)*

---

## 🔗 References

- [LibreCube GSoC 2026 Projects](https://librecube.org/google-summer-of-code/)
- [ZED Editor Extensions Documentation](https://zed.dev/docs/extensions/developing-extensions)
- [GSoC Application Template (LibreCube)](https://librecube.org/google-summer-of-code/)
- LibreCube VS Code PLUTO plugin *(reference implementation)*

---

## 📬 Contact

For questions about this application, feel free to reach out via GitHub Issues or the LibreCube GSoC mailing list at `gsoc@librecube.org`.
