# Somber.Design

A Vue 3 + Vite + SCSS single-page portfolio and identity site for **Somber.Design**.

Version `v0.2` leans into a winter-gray visual system: somber skies, quiet panels, restrained motion, and a light flurry of snow.

## Direction

Somber.Design is Jacob’s personal web identity for focused websites, practical frontend work, creator pages, and small utility builds.

The site should feel:

- Minimal
- Cold but readable
- Quiet and structured
- Personal without being casual
- Polished without feeling corporate

## Stack

- Vue 3
- Vite
- SCSS via `sass-embedded`
- Composition API / `<script setup>`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Main places to edit

### Content

- `src/data/inProfileData.js`
- `src/data/inProjectsData.js`

### Layout + section logic

- `src/App.vue`
- `src/components/`

### Theme styling

- `src/assets/styles/_tokens.scss`
- `src/assets/styles/_base.scss`
- component-level scoped SCSS

## Design notes

- The main winter sky background is CSS-driven in `src/App.vue`.
- The snow layer is handled by `src/components/inSnowLayer.vue`.
- The header tracks active sections with `IntersectionObserver`.
- Contact stays simple: email and GitHub only.
- Motion respects `prefers-reduced-motion` in the global base styles and snow layer.
