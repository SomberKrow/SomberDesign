# Somber.Design

This is the working repository for my personal site.

The site is a portfolio, contact point, and place to test ideas that do not need their own project yet.

## Current build

The active design is a full recreation built around one visual system:

- full-bleed winter forest
- fixed numbered rail on desktop
- compact mobile navigation
- pale and dark brutalist sections
- restrained snow, mist, grain, and motion
- NorWinter as the featured case study
- short, direct copy
- clean Vue Router paths

The goal is simple: the site should feel like the work I want to make.

## Routes

```text
/             Home
/about        About
/work         Work
/ai           AI Use
/playground   Playground
/contact      Contact
```

The page remains visually continuous. Scrolling updates the route with `replace`, while navigation clicks and browser history use normal Vue Router navigation.

## Run locally

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Main files

```text
src/
├── App.vue                       layout, routing sync, and reveal logic
├── main.js                       Vue and router setup
├── router/
│   └── index.js                  clean section routes and page titles
├── components/
│   └── inSnowLayer.vue           snow effect
├── data/
│   ├── inProfileData.js          profile and contact copy
│   └── inProjectsData.js         project content
└── assets/styles/
    ├── _tokens.scss              shared design values
    ├── _base.scss                reset and global behavior
    ├── main.scss                 style entry
    └── site.scss                 active visual system

public/
├── _redirects                    Netlify history fallback
└── assets/images/
    ├── graykrowForest.png
    └── SomberDesignLogo.png
```

## Current design notes

The forest is the primary artwork. It should stay visible and should not be buried under heavy overlays.

NorWinter is the featured project because it best represents the current direction: restrained layout, winter-gray material, clear hierarchy, and a complete visual identity.

Copy should remain concise. The atmosphere belongs in the design, not in paragraphs describing the design.

## Rules worth keeping

- one strong visual idea per section
- no decoration without a purpose
- sharp borders and consistent line weight
- mobile should feel composed, not stacked
- project information should scan quickly
- motion should be calm and optional
- email and GitHub only for contact

## QA before a release

Check at:

- 320px
- 390px
- 768px
- 1024px
- 1440px and above

Verify:

- no horizontal scrolling
- forest crops remain intentional
- the active route matches the visible section
- direct route visits do not 404
- browser back and forward land on the right section
- project content does not overflow
- reduced-motion behavior works
- `npm run build` completes cleanly

## Versioning

- `v0.x` — active design and structure work
- `v1.0` — final copy, real project links, full responsive QA, and deployment checks complete
