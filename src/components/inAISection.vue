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
    detail: 'Content passes, repetitive cleanup, QA checklists, faster iteration, and moving projects toward release.',
  },
]
</script>

<template>
  <section class="aiSection">
    <div class="shell-grid aiSection__inner">
      <header class="aiSection__header">
        <p class="kicker">AI in My Workflow</p>
        <h2>Design. Development. Production.</h2>
        <p>
          I use AI openly throughout the same workflow I use to build projects. It helps me explore options, solve problems,
          reduce repetitive work, and move from an idea to a finished result faster.
        </p>
      </header>

      <div class="aiSection__stages">
        <article v-for="(area, index) in workflowAreas" :key="area.title">
          <div class="aiSection__stageTop">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <i aria-hidden="true"></i>
          </div>
          <h3>{{ area.title }}</h3>
          <p>{{ area.detail }}</p>
        </article>
      </div>

      <div class="aiSection__position">
        <p class="aiSection__positionLabel">My position</p>
        <p>
          AI is a useful production tool, not something I hide. The direction, decisions, review, testing, and final
          responsibility remain mine.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.aiSection {
  border-bottom: 1px solid var(--color-line-dark);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.3), transparent 45%),
    var(--color-paper-strong);
  color: var(--color-ink-dark);
}

.aiSection__inner {
  padding-block: var(--section-pad-y);
}

.aiSection__header {
  grid-column: 1 / span 7;
}

.aiSection__header h2 {
  max-width: 17ch;
  margin-top: 0.85rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.7vw, 3.8rem);
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 0.98;
}

.aiSection__header > p:last-child {
  max-width: 60ch;
  margin-top: 1rem;
  color: var(--color-ink-dark-dim);
  font-size: 0.92rem;
  line-height: 1.7;
}

.aiSection__stages {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 2.25rem;
  border-top: 1px solid var(--color-line-dark);
  border-bottom: 1px solid var(--color-line-dark);
}

.aiSection__stages article {
  min-height: 190px;
  padding: 1.2rem;
  border-right: 1px solid var(--color-line-dark);
}

.aiSection__stages article:last-child {
  border-right: 0;
}

.aiSection__stageTop {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.aiSection__stageTop span {
  color: var(--color-accent-strong);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
}

.aiSection__stageTop i {
  display: block;
  width: 100%;
  height: 1px;
  background: var(--color-line-dark-strong);
}

.aiSection__stages h3 {
  margin-top: 1rem;
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: -0.025em;
}

.aiSection__stages p {
  margin-top: 0.55rem;
  color: var(--color-ink-dark-dim);
  font-size: 0.8rem;
  line-height: 1.58;
}

.aiSection__position {
  grid-column: 8 / -1;
  margin-top: 1.4rem;
  padding: 1.2rem;
  border: 1px solid var(--color-line-dark-strong);
  background: var(--color-bg-soft);
  color: var(--color-ink);
}

.aiSection__positionLabel {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.aiSection__position > p:last-child {
  margin-top: 0.75rem;
  color: var(--color-ink-dim);
  font-size: 0.84rem;
  line-height: 1.62;
}

@media (max-width: 900px) {
  .aiSection__header,
  .aiSection__position {
    grid-column: 1 / -1;
  }
}

@media (max-width: 700px) {
  .aiSection__stages {
    grid-template-columns: 1fr;
  }

  .aiSection__stages article {
    min-height: 0;
    border-right: 0;
    border-bottom: 1px solid var(--color-line-dark);
  }

  .aiSection__stages article:last-child {
    border-bottom: 0;
  }
}
