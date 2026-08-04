<div align="center">

# Yash Ganesh — Developer Portfolio

**A cinematic, interaction-rich portfolio for an AI product builder and Computer Engineering & IoT student.**

[![Portfolio](https://img.shields.io/badge/Portfolio-Project-111827?style=for-the-badge&logo=vercel&logoColor=white)](https://github.com/GYASH28/YASH_PORTFOLIO)
[![Built with JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Design-0EA5E9?style=for-the-badge)](#experience)

</div>

## Overview

This repository contains the second-generation personal portfolio of **Yash Ganesh**. It presents selected AI, education, desktop, and client projects through a custom visual system with motion, layered storytelling, responsive layouts, and interactive project showcases.

The portfolio is designed to communicate more than a list of technologies. It explains the thinking, product goals, and real-world problems behind each project.

## Featured Work

| Project | What it demonstrates |
|---|---|
| **Lernio AI** | Full-stack AI education platform, curriculum systems, student analytics, AI tutoring, and product design |
| **B.R.A.C.E** | Local-first AI assistant, desktop tooling, memory, voice, permissions, and agent workflows |
| **CampusMate** | Multi-role college platform with attendance, academics, dashboards, and Firebase-backed data |
| **Fakhri Mart** | Production-style client catalogue experience with responsive UX, SEO, motion, and WhatsApp enquiries |

## Experience

- Cinematic landing experience and project storytelling
- Scroll-driven motion and interactive transitions
- Responsive layouts for desktop, tablet, and mobile
- Custom project sections instead of generic template cards
- Optimized static output for simple deployment
- Personal photography and project-specific visuals

## Build

```bash
npm install
npm run build
```

The production-ready website is generated in:

```text
dist/
```

You can preview it with any static file server, for example:

```bash
npx serve dist
```

## Project Structure

```text
.
├── assets/              # Images and visual assets
├── scripts/
│   └── build.mjs        # Reconstructs the optimized production bundle
├── .bundle/             # Compressed source bundle used by the build script
├── package.json
└── README.md
```

## Build System

This project uses a lightweight custom Node.js build script instead of a large framework runtime. The script reconstructs the optimized HTML, CSS, and JavaScript files, copies the visual assets, and produces a deployable static site in `dist/`.

## Profile

- **Focus:** AI products, full-stack applications, interactive web experiences, and desktop assistants
- **Current work:** Lernio AI, B.R.A.C.E, CampusMate, and client web projects
- **Based in:** Pune, India

## License

This portfolio and its visual assets are personal work. Please do not reuse the complete design, branding, or personal images as a template without permission.
