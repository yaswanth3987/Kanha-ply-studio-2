# KANHA Ply Studio — Official Website

> From the Right Materials to the Right Space.

A premium interior design & plywood studio website built with **React + Vite + TypeScript + Tailwind CSS**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
```

Output goes to `dist/` — deploy to Vercel, Netlify, GitHub Pages, etc.

## Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI Framework |
| Vite 6 | Build Tool |
| TypeScript | Type Safety |
| Tailwind CSS 4 | Styling |
| Three.js | 3D Material Studio |
| Lucide React | Icons |

## Features

- Full landing page — Hero, About, Services, Projects, Materials, Process, Reviews, CTA, Footer
- Interactive Ribbon Cutting ceremony with confetti
- 3D Material Studio (Three.js)
- Fully responsive mobile-first layout
- Scroll animations and animated counters
- Before/After slider
- Contact form with WhatsApp integration

## Project Structure

```
src/
├── App.tsx              # All sections and page logic
├── index.css            # Global styles and CSS tokens
├── main.tsx             # React entry point
├── imports/             # Local assets
└── components/
    └── ThreeDStudio.tsx # Three.js 3D material viewer
public/
└── assets/              # Static public assets
```

## Deployment

Deploy the `dist/` folder to any static host after `npm run build`.

---

© 2024 KANHA Design Studio — Pune, Maharashtra, India
