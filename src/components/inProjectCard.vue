<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="projectCard line-frame">
    <div class="projectCard__marker" aria-hidden="true"></div>

    <div class="projectCard__meta">
      <p class="projectCard__status">{{ props.project.status }}</p>
      <p class="projectCard__category">{{ props.project.category }}</p>
    </div>

    <div class="projectCard__core">
      <h3 class="projectCard__title">{{ props.project.title }}</h3>
      <p class="projectCard__summary">{{ props.project.summary }}</p>
    </div>

    <ul class="projectCard__highlights" aria-label="Project highlights">
      <li v-for="highlight in props.project.highlights" :key="highlight">{{ highlight }}</li>
    </ul>

    <div class="projectCard__stack" aria-label="Project stack">
      <span v-for="item in props.project.stack" :key="item">{{ item }}</span>
    </div>

    <div class="projectCard__links">
      <template v-for="link in props.project.links" :key="link.label">
        <a v-if="link.href" :href="link.href" target="_blank" rel="noreferrer" class="projectCard__link">
          {{ link.label }}
        </a>
        <span v-else class="projectCard__link projectCard__link--muted">{{ link.label }}</span>
      </template>
    </div>
  </article>
</template>

<style scoped lang="scss">
.projectCard {
  position: relative;
  display: grid;
  grid-template-columns: minmax(120px, 170px) minmax(0, 1.35fr) minmax(180px, 0.8fr);
  gap: 0.85rem 1rem;
  align-items: start;
  padding: 1rem;
  overflow: hidden;
  box-shadow: none;
  transition:
    border-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.projectCard::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(100deg, rgba(194, 205, 212, 0.075), transparent 28%),
    radial-gradient(circle at 100% 0%, rgba(118, 141, 158, 0.13), transparent 32%);
  opacity: 0.38;
  transition: opacity var(--duration-fast) var(--ease-out);
  pointer-events: none;
}

.projectCard:hover,
.projectCard:focus-within {
  transform: translate3d(0, -2px, 0);
  border-color: var(--color-line-strong);
  background:
    linear-gradient(145deg, rgba(194, 205, 212, 0.09), rgba(118, 141, 158, 0.035) 46%, rgba(11, 14, 17, 0.06)),
    var(--color-panel-hover);
  box-shadow:
    0 1rem 2.75rem rgba(0, 0, 0, 0.26),
    inset 0 1px 0 rgba(232, 236, 238, 0.04);
}

.projectCard:hover::before,
.projectCard:focus-within::before {
  opacity: 1;
}

.projectCard > *:not(.projectCard__marker) {
  position: relative;
  z-index: 1;
}

.projectCard__marker {
  position: absolute;
  top: 1rem;
  left: 0;
  width: 2px;
  height: 2.4rem;
  background: linear-gradient(180deg, var(--color-accent-cold), transparent);
  opacity: 0.82;
}

.projectCard__meta {
  display: grid;
  gap: 0.45rem;
}

.projectCard__status,
.projectCard__category {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.projectCard__status {
  color: var(--color-accent);
}

.projectCard__category {
  color: var(--color-ink-muted);
  line-height: 1.45;
}

.projectCard__title {
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 1.55vw, 1.65rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.035em;
}

.projectCard__summary {
  margin-top: 0.5rem;
  color: var(--color-ink-dim);
  font-size: 0.9rem;
  line-height: 1.64;
}

.projectCard__highlights {
  display: grid;
  gap: 0.42rem;
}

.projectCard__highlights li {
  position: relative;
  padding-left: 0.75rem;
  color: var(--color-ink-dim);
  font-size: 0.81rem;
  line-height: 1.52;
}

.projectCard__highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.52rem;
  width: 0.33rem;
  height: 1px;
  background: var(--color-accent-cold);
}

.projectCard__stack {
  grid-column: 2 / span 2;
  display: flex;
  flex-wrap: wrap;
  gap: 0.36rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--color-line);
}

.projectCard__stack span {
  display: inline-flex;
  align-items: center;
  min-height: 1.65rem;
  padding: 0.24rem 0.48rem;
  border: 1px solid var(--color-line);
  background: linear-gradient(180deg, rgba(184, 198, 207, 0.055), rgba(118, 141, 158, 0.025));
  color: var(--color-ink-dim);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.projectCard__links {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding-top: 0.55rem;
  border-top: 1px solid var(--color-line);
}

.projectCard__link {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.projectCard__link--muted {
  color: var(--color-ink-muted);
}

@media (max-width: 1100px) {
  .projectCard {
    grid-template-columns: minmax(120px, 170px) minmax(0, 1fr);
  }

  .projectCard__highlights,
  .projectCard__stack {
    grid-column: 2 / -1;
  }
}

@media (max-width: 780px) {
  .projectCard {
    grid-template-columns: 1fr;
  }

  .projectCard__highlights,
  .projectCard__stack {
    grid-column: 1 / -1;
  }
}
</style>
