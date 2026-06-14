<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
})

const monogram = computed(() =>
  props.project.title
    .split(/\s+/)
    .map(word => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase(),
)
</script>

<template>
  <article class="projectCard" :style="{ '--card-index': props.index }">
    <div class="projectCard__visual">
      <span class="projectCard__number">{{ String(props.index + 1).padStart(2, '0') }}</span>
      <p class="projectCard__monogram">{{ monogram }}</p>
      <p class="projectCard__visualTitle">{{ props.project.title }}</p>
    </div>

    <div class="projectCard__content">
      <div class="projectCard__meta">
        <p>{{ props.project.status }}</p>
        <span>{{ props.project.category }}</span>
      </div>

      <p class="projectCard__summary">{{ props.project.summary }}</p>

      <ul class="projectCard__stack" aria-label="Project stack">
        <li v-for="item in props.project.stack" :key="item">{{ item }}</li>
      </ul>

      <div class="projectCard__links">
        <template v-for="link in props.project.links" :key="link.label">
          <a v-if="link.href" :href="link.href" target="_blank" rel="noreferrer">
            {{ link.label }} <span>→</span>
          </a>
          <span v-else>{{ link.label }} →</span>
        </template>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.projectCard {
  display: grid;
  grid-template-rows: 168px 1fr;
  min-width: 0;
  border: 1px solid var(--color-line);
  background: rgba(10, 17, 24, 0.72);
  transition:
    transform var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    background var(--duration-base) var(--ease-out);
}

.projectCard:hover,
.projectCard:focus-within {
  transform: translateY(-4px);
  border-color: var(--color-line-strong);
  background: var(--color-panel-hover);
}

.projectCard__visual {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-bottom: 1px solid var(--color-line);
  background:
    linear-gradient(145deg, rgba(166, 186, 199, 0.08), transparent 48%),
    radial-gradient(circle at 75% 18%, rgba(143, 165, 179, 0.2), transparent 30%),
    linear-gradient(135deg, #16222d, #0b131b 72%);
}

.projectCard__visual::before,
.projectCard__visual::after {
  content: '';
  position: absolute;
  border: 1px solid rgba(166, 186, 199, 0.13);
  transform: rotate(45deg);
}

.projectCard__visual::before {
  width: 9rem;
  height: 9rem;
  right: -4.5rem;
  bottom: -5rem;
}

.projectCard__visual::after {
  width: 4rem;
  height: 4rem;
  left: -2.5rem;
  top: -2rem;
}

.projectCard__number {
  position: absolute;
  top: 0.75rem;
  left: 0.8rem;
  color: var(--color-ink-muted);
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.14em;
}

.projectCard__monogram {
  color: rgba(238, 242, 244, 0.1);
  font-family: var(--font-display);
  font-size: clamp(4.2rem, 7vw, 6.2rem);
  font-weight: 700;
  letter-spacing: -0.08em;
  line-height: 1;
  transform: translateY(-0.15rem);
}

.projectCard__visualTitle {
  position: absolute;
  right: 0.85rem;
  bottom: 0.75rem;
  left: 0.85rem;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.04em;
}

.projectCard__content {
  display: flex;
  min-height: 230px;
  flex-direction: column;
  padding: 0.95rem;
}

.projectCard__meta {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.projectCard__meta p,
.projectCard__meta span {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.11em;
  line-height: 1.45;
  text-transform: uppercase;
}

.projectCard__meta p {
  color: var(--color-accent);
}

.projectCard__meta span {
  color: var(--color-ink-muted);
  text-align: right;
}

.projectCard__summary {
  margin-top: 0.75rem;
  color: var(--color-ink-dim);
  font-size: 0.8rem;
  line-height: 1.58;
}

.projectCard__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.85rem;
}

.projectCard__stack li {
  padding: 0.25rem 0.4rem;
  border: 1px solid rgba(205, 216, 223, 0.12);
  color: var(--color-ink-muted);
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.projectCard__links {
  margin-top: auto;
  padding-top: 0.9rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.projectCard__links a,
.projectCard__links > span {
  display: inline-flex;
  gap: 0.65rem;
  align-items: center;
}

.projectCard__links a:hover,
.projectCard__links a:focus-visible {
  color: var(--color-ink);
}
