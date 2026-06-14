<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="siteFooter">
    <div class="siteFooter__inner">
      <p>somber.design</p>
      <span aria-hidden="true"></span>
      <p>Portfolio / Projects / Playground</p>
      <p>{{ currentYear }} / Built by Jacob</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.siteFooter {
  background: var(--color-bg-deep);
  color: var(--color-ink-muted);
}

.siteFooter__inner {
  display: grid;
  grid-template-columns: auto minmax(3rem, 1fr) auto auto;
  gap: 1.25rem;
  align-items: center;
  width: var(--max-width);
  min-height: 58px;
  margin: 0 auto;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.siteFooter__inner span {
  height: 1px;
  background: var(--color-line);
}

.siteFooter__inner p:last-child {
  color: var(--color-ink-dim);
}

@media (max-width: 700px) {
  .siteFooter__inner {
    grid-template-columns: 1fr;
    gap: 0.4rem;
    padding-block: 1.1rem;
  }

  .siteFooter__inner span {
    display: none;
  }
}
