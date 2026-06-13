# Somber.Design

A Vue 3 + Vite + SCSS single-page portfolio for **Somber.Design**.

Somber.Design is Jacob’s personal portfolio, contact page, and development playground. It collects completed websites, active projects, small tools, and frontend experiments in one place.

## Site purpose

The website should clearly show:

- Who Jacob is
- Which projects he has worked on
- What kind of frontend work he builds
- How to contact him
- Which experiments and personal projects are still in development

The winter-gray background and snow are part of the visual design. The written content should stay direct and explain the site without describing its mood.

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

### Layout and section logic

- `src/App.vue`
- `src/components/`

### Theme styling

- `src/assets/styles/_tokens.scss`
- `src/assets/styles/_base.scss`
- Component-level scoped SCSS

## Implementation notes

- The forest background and image grading are handled in `src/App.vue`.
- The snow layer is handled by `src/components/inSnowLayer.vue`.
- The header tracks active sections with `IntersectionObserver`.
- Contact uses email and GitHub only.
- Motion respects `prefers-reduced-motion`.
