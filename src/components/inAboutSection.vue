<script setup>
import { profileData } from '../data/inProfileData'

const aboutNotes = [
  {
    title: 'Restraint',
    detail: 'Keep the page calm. Let type, spacing, contrast, and rhythm do most of the work.',
  },
  {
    title: 'Structure',
    detail: 'Build sections that are easy to scan, easy to maintain, and honest about what they are.',
  },
  {
    title: 'Finish',
    detail: 'Refine the edges: responsive behavior, motion timing, visual weight, copy, and handoff details.',
  },
]
</script>

<template>
  <section class="aboutSection">
    <div class="shell-grid aboutSection__inner">
      <header class="aboutSection__intro">
        <p class="kicker">Approach</p>
        <h2 class="section-title">Somber skies. Clean systems. Quiet work that feels done.</h2>
        <p class="section-body">{{ profileData.summary }}</p>
      </header>

      <aside class="aboutSection__principles line-frame" aria-label="Core principles">
        <p class="aboutSection__panelLabel">Rules of the build</p>
        <ul>
          <li v-for="principle in profileData.principles" :key="principle">{{ principle }}</li>
        </ul>
      </aside>

      <div class="aboutSection__notes">
        <article v-for="note in aboutNotes" :key="note.title" class="aboutSection__note line-frame">
          <p class="aboutSection__noteTitle">{{ note.title }}</p>
          <p class="aboutSection__noteBody">{{ note.detail }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.aboutSection {
  padding: var(--section-pad-y) 0;
}

.aboutSection__inner {
  align-items: start;
}

.aboutSection__intro {
  grid-column: 1 / span 7;
  display: grid;
  gap: 1rem;
}

.aboutSection__principles {
  position: relative;
  grid-column: 8 / -1;
  padding: 1rem;
  overflow: hidden;
}

.aboutSection__principles::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(190, 201, 208, 0.07), transparent 42%),
    radial-gradient(circle at 100% 0%, rgba(118, 141, 158, 0.12), transparent 38%);
  pointer-events: none;
}

.aboutSection__principles > * {
  position: relative;
  z-index: 1;
}

.aboutSection__panelLabel {
  margin-bottom: 0.75rem;
  color: var(--color-accent-soft);
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.aboutSection__principles ul {
  display: grid;
  gap: 0.7rem;
}

.aboutSection__principles li {
  position: relative;
  padding: 0.72rem 0 0 0.85rem;
  border-top: 1px solid var(--color-line);
  color: var(--color-ink-dim);
  font-size: 0.9rem;
  line-height: 1.66;
}

.aboutSection__principles li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 1.15rem;
  width: 0.35rem;
  height: 1px;
  background: var(--color-accent-cold);
}

.aboutSection__notes {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 0.6rem;
}

.aboutSection__note {
  position: relative;
  min-height: 150px;
  padding: 1rem;
  overflow: hidden;
  box-shadow: none;
  transition:
    transform var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.aboutSection__note::after {
  content: '';
  position: absolute;
  right: -2.5rem;
  bottom: -3.5rem;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: rgba(118, 141, 158, 0.08);
  filter: blur(1.8rem);
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
  pointer-events: none;
}

.aboutSection__note:hover,
.aboutSection__note:focus-within {
  transform: translate3d(0, -2px, 0);
  border-color: var(--color-line-strong);
  background:
    linear-gradient(145deg, rgba(194, 205, 212, 0.09), rgba(118, 141, 158, 0.035) 46%, rgba(11, 14, 17, 0.06)),
    var(--color-panel-hover);
}

.aboutSection__note:hover::after,
.aboutSection__note:focus-within::after {
  opacity: 1;
}

.aboutSection__noteTitle,
.aboutSection__noteBody {
  position: relative;
  z-index: 1;
}

.aboutSection__noteTitle {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.aboutSection__noteBody {
  margin-top: 0.75rem;
  color: var(--color-ink-dim);
  font-size: 0.91rem;
  line-height: 1.66;
}

@media (max-width: 900px) {
  .aboutSection__intro,
  .aboutSection__principles {
    grid-column: 1 / -1;
  }

  .aboutSection__notes {
    grid-template-columns: 1fr;
  }

  .aboutSection__note {
    min-height: 0;
  }
}
</style>
