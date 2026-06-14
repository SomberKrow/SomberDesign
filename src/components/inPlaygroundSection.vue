<script setup>
const experiments = [
  {
    title: 'Interface Studies',
    detail: 'Layout systems, navigation ideas, motion tests, and small visual experiments.',
  },
  {
    title: 'Utility Builds',
    detail: 'Local tools and focused applications built around a specific practical need.',
  },
  {
    title: 'Redesigns',
    detail: 'Reworking older projects to improve structure, responsiveness, and visual consistency.',
  },
  {
    title: 'Prototypes',
    detail: 'Early concepts that are useful enough to test before they become full projects.',
  },
]
</script>

<template>
  <section class="playgroundSection">
    <div class="shell-grid playgroundSection__inner">
      <header class="playgroundSection__header">
        <p class="kicker">Playground</p>
        <h2>Not everything here needs to be a finished product.</h2>
        <p>
          This site also gives me room to test ideas, rebuild older work, and document projects that are still taking shape.
        </p>
      </header>

      <div class="playgroundSection__list">
        <article v-for="(experiment, index) in experiments" :key="experiment.title">
          <div class="playgroundSection__number">{{ String(index + 1).padStart(2, '0') }}</div>
          <h3>{{ experiment.title }}</h3>
          <p>{{ experiment.detail }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.playgroundSection {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--color-line);
  background:
    linear-gradient(120deg, rgba(166, 186, 199, 0.04), transparent 40%),
    var(--color-bg-soft);
  color: var(--color-ink);
}

.playgroundSection::after {
  content: 'SD';
  position: absolute;
  right: -1.5rem;
  bottom: -4.5rem;
  color: rgba(238, 242, 244, 0.035);
  font-family: var(--font-display);
  font-size: clamp(10rem, 22vw, 22rem);
  font-weight: 700;
  letter-spacing: -0.12em;
  line-height: 1;
  pointer-events: none;
}

.playgroundSection__inner {
  position: relative;
  z-index: 1;
  padding-block: var(--section-pad-y);
}

.playgroundSection__header {
  grid-column: 1 / span 7;
}

.playgroundSection__header h2 {
  max-width: 18ch;
  margin-top: 0.85rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.7vw, 3.8rem);
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 0.98;
}

.playgroundSection__header > p:last-child {
  max-width: 58ch;
  margin-top: 1rem;
  color: var(--color-ink-dim);
  font-size: 0.9rem;
  line-height: 1.68;
}

.playgroundSection__list {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 2.25rem;
  border-top: 1px solid var(--color-line);
}

.playgroundSection__list article {
  min-height: 175px;
  padding: 1.1rem;
  border-right: 1px solid var(--color-line);
}

.playgroundSection__list article:last-child {
  border-right: 0;
}

.playgroundSection__number {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.13em;
}

.playgroundSection__list h3 {
  margin-top: 1.15rem;
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: -0.025em;
}

.playgroundSection__list p {
  margin-top: 0.5rem;
  color: var(--color-ink-dim);
  font-size: 0.78rem;
  line-height: 1.58;
}

@media (max-width: 900px) {
  .playgroundSection__header {
    grid-column: 1 / -1;
  }

  .playgroundSection__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .playgroundSection__list article:nth-child(2) {
    border-right: 0;
  }

  .playgroundSection__list article:nth-child(-n + 2) {
    border-bottom: 1px solid var(--color-line);
  }
}

@media (max-width: 600px) {
  .playgroundSection__list {
    grid-template-columns: 1fr;
  }

  .playgroundSection__list article,
  .playgroundSection__list article:nth-child(2) {
    min-height: 0;
    border-right: 0;
    border-bottom: 1px solid var(--color-line);
  }

  .playgroundSection__list article:last-child {
    border-bottom: 0;
  }
}
