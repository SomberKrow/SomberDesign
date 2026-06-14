<script setup>
import inSiteHeader from './components/inSiteHeader.vue'
import inHeroSection from './components/inHeroSection.vue'
import inAboutSection from './components/inAboutSection.vue'
import inProjectsSection from './components/inProjectsSection.vue'
import inAISection from './components/inAISection.vue'
import inPlaygroundSection from './components/inPlaygroundSection.vue'
import inContactSection from './components/inContactSection.vue'
import inSiteFooter from './components/inSiteFooter.vue'
import inSnowLayer from './components/inSnowLayer.vue'
</script>

<template>
  <div class="app">
    <a class="skipLink" href="#main-content">Skip to content</a>
    <inSnowLayer />
    <inSiteHeader />

    <div class="app__content">
      <main id="main-content">
        <inHeroSection id="hero" class="section-anchor" data-section />
        <inAboutSection id="about" class="section-anchor" data-section />
        <inProjectsSection id="projects" class="section-anchor" data-section />
        <inAISection id="ai-use" class="section-anchor" data-section />
        <inPlaygroundSection id="playground" class="section-anchor" data-section />
        <inContactSection id="contact" class="section-anchor" data-section />
      </main>

      <inSiteFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  background: var(--color-bg-deep);
}

.app__content {
  min-width: 0;
  margin-left: var(--sidebar-width);
  box-shadow: -0.75rem 0 2.5rem rgba(0, 0, 0, 0.08);
}

@media (max-width: 900px) {
  .app__content {
    margin-left: 0;
  }
}
</style>
