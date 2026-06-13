<script setup>
import inSiteHeader from './components/inSiteHeader.vue'
import inHeroSection from './components/inHeroSection.vue'
import inAboutSection from './components/inAboutSection.vue'
import inAISection from './components/inAISection.vue'
import inProjectsSection from './components/inProjectsSection.vue'
import inContactSection from './components/inContactSection.vue'
import inSiteFooter from './components/inSiteFooter.vue'
import inSnowLayer from './components/inSnowLayer.vue'
</script>

<template>
  <div class="app">
    <a class="skipLink" href="#main-content">Skip to content</a>

    <div class="winterSky" aria-hidden="true">
      <div class="winterSky__imageGrade"></div>
      <div class="winterSky__horizon"></div>
      <div class="winterSky__cloud winterSky__cloud--one"></div>
      <div class="winterSky__cloud winterSky__cloud--two"></div>
      <div class="winterSky__grain"></div>
      <div class="winterSky__vignette"></div>
    </div>

    <inSnowLayer />
    <inSiteHeader />

    <main id="main-content" class="app__main">
      <inHeroSection id="hero" class="section-anchor" data-section />
      <div class="section-rule" aria-hidden="true"></div>
      <inAboutSection id="about" class="section-anchor" data-section />
      <div class="section-rule" aria-hidden="true"></div>
      <inAISection id="ai-use" class="section-anchor" />
      <div class="section-rule" aria-hidden="true"></div>
      <inProjectsSection id="projects" class="section-anchor" data-section />
      <div class="section-rule" aria-hidden="true"></div>
      <inContactSection id="contact" class="section-anchor" data-section />
    </main>

    <inSiteFooter />
  </div>
</template>

<style scoped lang="scss">
.app {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  overflow: clip;
}

.app__main {
  position: relative;
  z-index: 2;
}

.winterSky {
  position: fixed;
  inset: 0;
  z-index: -5;
  overflow: hidden;
  pointer-events: none;
  background: linear-gradient(180deg, #14191f 0%, #0c1117 48%, #06090d 100%);
}

.winterSky__imageGrade,
.winterSky__horizon,
.winterSky__cloud,
.winterSky__grain,
.winterSky__vignette {
  position: absolute;
  pointer-events: none;
}

.winterSky__imageGrade {
  inset: -2vh -2vw;
  background:
    linear-gradient(180deg, rgba(10, 14, 18, 0.12), rgba(10, 14, 18, 0.24) 48%, rgba(4, 7, 11, 0.56)),
    linear-gradient(90deg, rgba(188, 196, 204, 0.06), rgba(111, 122, 132, 0.03)),
    url('/assets/images/graykrowForest.png') center 82% / cover no-repeat;
  filter: grayscale(0.52) saturate(0.55) brightness(0.92) contrast(0.9);
  opacity: 0.94;
  transform: scale(1.025);
}

.winterSky__imageGrade::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 22%, rgba(224, 229, 234, 0.045), transparent 34%),
    linear-gradient(180deg, rgba(184, 192, 200, 0.07), rgba(90, 100, 110, 0.035) 42%, rgba(4, 7, 11, 0.38));
  mix-blend-mode: screen;
  opacity: 0.28;
}

.winterSky__horizon {
  left: -10vw;
  right: -10vw;
  bottom: -19vh;
  height: 42vh;
  background:
    linear-gradient(180deg, transparent 0%, rgba(168, 178, 187, 0.055) 35%, rgba(223, 229, 234, 0.06) 100%),
    radial-gradient(ellipse at 50% 0%, rgba(213, 221, 229, 0.1), transparent 64%);
  filter: blur(22px);
}

.winterSky__cloud {
  width: 62vw;
  height: 18vh;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(218, 225, 232, 0.04), transparent);
  filter: blur(26px);
  opacity: 0.34;
  animation: cloudDrift 34s var(--ease-soft) infinite alternate;
}

.winterSky__cloud--one {
  top: 17vh;
  left: -22vw;
}

.winterSky__cloud--two {
  top: 42vh;
  right: -26vw;
  width: 70vw;
  opacity: 0.26;
  animation-duration: 42s;
  animation-direction: alternate-reverse;
}

.winterSky__grain {
  inset: 0;
  opacity: 0.08;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.2) 0 0.7px, transparent 0.8px),
    radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.1) 0 0.8px, transparent 0.9px);
  background-size: 6px 6px, 9px 9px;
}

.winterSky__vignette {
  inset: 0;
  background:
    linear-gradient(180deg, rgba(4, 7, 11, 0.08), transparent 20%, rgba(4, 7, 11, 0.54)),
    radial-gradient(circle at 50% 24%, transparent 0%, rgba(4, 7, 11, 0.14) 52%, rgba(4, 7, 11, 0.58) 100%);
}

@keyframes cloudDrift {
  from {
    transform: translate3d(-2vw, 0, 0);
  }

  to {
    transform: translate3d(5vw, 1.5vh, 0);
  }
}

@media (max-width: 700px) {
  .winterSky__cloud {
    width: 95vw;
  }

  .winterSky__imageGrade {
    background-position: center bottom;
    filter: grayscale(0.5) saturate(0.55) brightness(0.86) contrast(0.9);
    opacity: 0.84;
  }
}
</style>
