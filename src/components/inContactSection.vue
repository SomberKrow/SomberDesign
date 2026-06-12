<script setup>
import { profileData } from '../data/inProfileData'
</script>

<template>
  <section class="contactSection">
    <div class="shell-grid contactSection__inner">
      <header class="contactSection__intro">
        <p class="kicker">Contact</p>
        <h2 class="section-title">A simple path in. No forms. No noise.</h2>
        <p class="section-body">
          For focused websites, creator pages, redesign cleanup, or practical frontend builds, email is the cleanest place to start.
        </p>
      </header>

      <div class="contactSection__panel line-frame">
        <p class="contactSection__availability">{{ profileData.availability }}</p>
        <ul>
          <li v-for="link in profileData.contactLinks" :key="link.label">
            <span>{{ link.label }}</span>
            <a v-if="link.href" :href="link.href" target="_blank" rel="noreferrer">{{ link.value }}</a>
            <span v-else>{{ link.value }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contactSection {
  padding: var(--section-pad-y) 0;
}

.contactSection__inner {
  align-items: start;
}

.contactSection__intro {
  grid-column: 1 / span 7;
  display: grid;
  gap: 1rem;
}

.contactSection__panel {
  position: relative;
  grid-column: 8 / -1;
  padding: 1rem;
  overflow: hidden;
}

.contactSection__panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 100% 0%, rgba(200, 213, 223, 0.13), transparent 36%);
  pointer-events: none;
}

.contactSection__panel > * {
  position: relative;
  z-index: 1;
}

.contactSection__availability {
  color: var(--color-ink-dim);
  font-size: 0.92rem;
  line-height: 1.64;
}

.contactSection__panel ul {
  margin-top: 0.9rem;
}

.contactSection__panel li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.72rem 0;
  border-top: 1px solid rgba(223, 232, 241, 0.12);
}

.contactSection__panel li span:first-child {
  color: var(--color-ink-muted);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contactSection__panel a,
.contactSection__panel li span:last-child {
  color: var(--color-ink);
  font-size: 0.88rem;
}

.contactSection__panel a {
  transition: color var(--duration-fast) var(--ease-out);
}

.contactSection__panel a:hover,
.contactSection__panel a:focus-visible {
  color: var(--color-accent);
}

@media (max-width: 900px) {
  .contactSection__intro,
  .contactSection__panel {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .contactSection__panel li {
    flex-direction: column;
    gap: 0.35rem;
  }
}
</style>
