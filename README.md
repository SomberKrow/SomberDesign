# Somber.Design

A Vue 3 + Vite + SCSS single-page portfolio for Jacob.

Somber.Design is a personal portfolio, contact point, and development playground for completed websites, active projects, practical tools, and frontend experiments.

## v0.4 rebuild

The active site combines the strongest parts of the original forest-based design with the newer editorial portfolio direction:

- Full-bleed winter-gray forest hero
- Light snow, mist, grain, and restrained motion
- Fixed numbered navigation rail on desktop
- Compact mobile navigation
- Alternating pale and dark brutalist sections
- Featured project presentation plus a compact project index
- Direct AI workflow disclosure: Design, Development, Production
- Dedicated playground section for experiments and prototypes
- Forest-based closing contact section
- Active section tracking and reveal animation handled inside Vue

## Stack

- Vue 3
- Vite
- SCSS via `sass-embedded`
- Composition API with `<script setup>`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Main files

### Application

- `src/App.vue`
- `src/main.js`

### Content

- `src/data/inProfileData.js`
- `src/data/inProjectsData.js`

### Styling

- `src/assets/styles/_tokens.scss`
- `src/assets/styles/_base.scss`
- `src/assets/styles/site.scss`

### Atmosphere

- `src/components/inSnowLayer.vue`
- `public/assets/images/graykrowForest.png`
- `public/assets/images/SomberDesignLogo.png`

## Implementation notes

- The active navigation switches to Contact when the bottom of the page is reached.
- Reveal animations run once as sections enter the viewport.
- Snow and motion respect reduced-motion preferences.
- Contact uses direct email and GitHub links without a form.
