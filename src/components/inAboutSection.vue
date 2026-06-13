<script setup>
import { profileData } from '../data/inProfileData'

const aboutNotes = [
  {
    title: 'Websites',
    detail: 'Personal sites, creator pages, small business sites, and portfolio work.',
  },
  {
    title: 'Frontend',
    detail: 'Vue 3, Vite, SCSS, responsive layouts, and component-based builds.',
  },
  {
    title: 'Playground',
    detail: 'Small tools, experiments, redesigns, and ideas that may turn into full projects.',
  },
]
</script>

<template>
  <section class="aboutSection">
    <div class="shell-grid aboutSection__inner">
      <header class="aboutSection__intro">
        <p class="kicker">About</p>
        <h2 class="section-title">I design and build websites, frontend projects, and small tools.</h2>
        <p class="section-body">{{ profileData.summary }}</p>
      </header>

      <aside class="aboutSection__principles line-frame" aria-label="What I focus on">
        <p class="aboutSection__panelLabel">What I focus on</p>
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
  grid-column: 8 / -1;
  padding: 1rem;
}

.aboutSection__panelLabel,
.aboutSection__noteTitle {
  color: var(--color-accent-soft);
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.aboutSection__principles ul {
  display: grid;
  gap: 0.7rem;
  margin-top: 0.75rem;
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
  top: 1.15rem;
  left: 0;
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
  min-height: 140px;
  padding: 1rem;
  box-shadow: none;
  transition:
    transform var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.aboutSection__note:hover,
.aboutSection__note:focus-within {
  transform: translate3d(0, -2px, 0);
  border-color: var(--color-line-strong);
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
