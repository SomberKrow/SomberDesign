<script setup>
const workflowAreas = [
  {
    title: 'Design',
    detail: 'Concept exploration, layout feedback, copy iteration, asset planning, and comparing different directions.',
  },
  {
    title: 'Development',
    detail: 'Planning, debugging, code review, implementation support, documentation, and technical research.',
  },
  {
    title: 'Production',
    detail: 'Repetitive cleanup, content passes, QA checklists, faster iteration, and moving projects toward release.',
  },
]
</script>

<template>
  <section class="aiSection">
    <div class="shell-grid aiSection__inner">
      <header class="aiSection__intro">
        <p class="kicker">AI Use</p>
        <h2 class="section-title">AI is part of my workflow.</h2>
        <p class="section-body">
          I use AI openly across design, development, and production. It helps me explore more options, solve problems,
          work through repetitive tasks, and move projects from an idea to a working result faster.
        </p>
      </header>

      <aside class="aiSection__statement line-frame">
        <p class="aiSection__statementLabel">My position</p>
        <p>
          I see AI as a useful production tool, not something to hide. The direction, decisions, review, testing, and final
          responsibility still belong to me.
        </p>
      </aside>

      <div class="aiSection__areas">
        <article v-for="area in workflowAreas" :key="area.title" class="aiSection__area line-frame">
          <h3>{{ area.title }}</h3>
          <p>{{ area.detail }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.aiSection {
  padding: var(--section-pad-y) 0;
}

.aiSection__inner {
  align-items: start;
}

.aiSection__intro {
  grid-column: 1 / span 7;
  display: grid;
  gap: 1rem;
}

.aiSection__statement {
  grid-column: 8 / -1;
  padding: 1rem;
}

.aiSection__statementLabel,
.aiSection__area h3 {
  color: var(--color-accent-soft);
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.aiSection__statement > p:last-child {
  margin-top: 0.75rem;
  color: var(--color-ink-dim);
  font-size: 0.92rem;
  line-height: 1.68;
}

.aiSection__areas {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 0.6rem;
}

.aiSection__area {
  min-height: 140px;
  padding: 1rem;
  box-shadow: none;
  transition:
    transform var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.aiSection__area:hover,
.aiSection__area:focus-within {
  transform: translate3d(0, -2px, 0);
  border-color: var(--color-line-strong);
}

.aiSection__area p {
  margin-top: 0.75rem;
  color: var(--color-ink-dim);
  font-size: 0.91rem;
  line-height: 1.66;
}

@media (max-width: 900px) {
  .aiSection__intro,
  .aiSection__statement {
    grid-column: 1 / -1;
  }

  .aiSection__areas {
    grid-template-columns: 1fr;
  }

  .aiSection__area {
    min-height: 0;
  }
}
</style>
