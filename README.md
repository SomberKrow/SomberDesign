# Somber.Design

This is the working repository for my personal site.

It serves three jobs:

- show the work I care about
- give people a direct way to contact me
- give me somewhere to test ideas without turning every experiment into its own project

The site is still evolving. This README should reflect the current state of the project, not pretend it is finished forever.

## Current direction

The visual direction combines the forest-heavy atmosphere from the original site with the stricter editorial layout developed later.

The current build uses:

- a fixed numbered rail on desktop
- a compact mobile menu
- the winter forest as the main visual identity
- pale and dark sections with sharp borders
- restrained snow, mist, grain, and motion
- concise copy instead of long explanations
- NorWinter as the intended featured project
- clean section URLs through Vue Router

The goal is a site that feels personal, cold, structured, and finished without reading like an agency template.

## Current status

The main site is mounted from `src/App.vue`.

The current pass is focused on:

- making the first screen feel more like a finished piece of art
- giving the forest more presence without hurting readability
- reducing copy throughout the site
- rebuilding the featured-work section around NorWinter
- tightening section spacing and visual rhythm
- checking mobile behavior after each larger design pass

Routing is now in place. Each section has a clean path:

```text
/             Home
/about        About
/work         Work
/ai           AI Use
/playground   Playground
/contact      Contact
```

Scrolling updates the current route without adding history entries. Clicking a navigation item uses Vue Router and scrolls to the matching section. Direct visits to a path such as `/work` or `/contact` are also supported.

## Running the project

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project structure

```text
src/
├── App.vue                       active site layout and section logic
├── main.js                       app entry point and router installation
├── router/
│   ├── index.js                  route definitions and page titles
│   └── sectionNavigation.js      route, scroll, and section-link sync
├── components/
│   └── inSnowLayer.vue           snow effect
├── data/
│   ├── inProfileData.js          profile, contact, and availability copy
│   └── inProjectsData.js         project content
└── assets/styles/
    ├── _tokens.scss              shared colors, type, timing, and spacing
    ├── _base.scss                reset and global behavior
    ├── main.scss                 style entry point
    └── site.scss                 active site design

public/
├── _redirects                    Netlify history fallback
└── assets/images/
    ├── graykrowForest.png        main forest artwork
    └── SomberDesignLogo.png      primary logo
```

## Editing content

Most copy should stay out of the template where practical.

- profile and contact details: `src/data/inProfileData.js`
- project titles, summaries, stacks, and status: `src/data/inProjectsData.js`

The site copy should remain short and direct. The design already carries the atmosphere.

## Design rules

A few rules worth keeping as the project changes:

- do not bury the forest under heavy overlays
- do not add decorative elements without a clear reason
- keep the hero large, but not empty
- prefer one strong visual idea over several small effects
- keep project information readable at a glance
- avoid agency language and vague creative statements
- mobile should feel designed, not merely stacked
- motion should be calm and optional

## Implementation notes

- visible section tracking remains in `App.vue`
- route and scroll synchronization lives in `src/router/sectionNavigation.js`
- Contact is forced active at the bottom of the page so Playground does not remain selected
- route changes use `replace` while scrolling, keeping browser history useful
- the Netlify fallback in `public/_redirects` prevents direct route visits from returning 404
- reveal animations only run once
- reduced-motion preferences are respected
- snow is removed on smaller screens
- contact remains email and GitHub only

## Before calling a version finished

Run through the site at these widths:

- 320px
- 390px
- 768px
- 1024px
- 1440px and above

Check:

- no horizontal scrolling
- the forest crop still works
- the rail highlights the correct section
- `/about`, `/work`, `/ai`, `/playground`, and `/contact` load directly
- browser back and forward return to the expected section
- no route contains a `#`
- project text does not overflow
- buttons remain easy to tap
- the closing Contact section is reachable and readable
- `npm run build` completes without errors

## Versioning

This project uses loose milestone versions rather than formal releases.

- `v0.x` — active design and structure work
- `v1.0` — stable public version with final copy, project links, responsive QA, and deployment checks complete
