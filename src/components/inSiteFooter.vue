<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="siteFooter">
    <div class="shell-grid siteFooter__inner">
      <p class="siteFooter__brand">Somber.Design</p>
      <p class="siteFooter__note">Winter-gray archive for focused websites, quiet systems, and practical frontend polish.</p>
      <p class="siteFooter__copyright">© {{ currentYear }} · Built by Jacob</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.siteFooter {
  position: relative;
  z-index: 2;
  padding: 0.5rem 0 2rem;
}

.siteFooter__inner {
  align-items: center;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(223, 232, 241, 0.16);
}

.siteFooter__brand {
  grid-column: 1 / span 3;
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.siteFooter__note {
  grid-column: 4 / span 6;
  color: var(--color-ink-muted);
  font-size: 0.78rem;
  line-height: 1.55;
}

.siteFooter__copyright {
  grid-column: 10 / -1;
  justify-self: end;
  color: var(--color-ink-muted);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .siteFooter__brand,
  .siteFooter__note,
  .siteFooter__copyright {
    grid-column: 1 / -1;
    justify-self: start;
  }

  .siteFooter__inner {
    gap: 0.4rem;
  }
}
</style>
