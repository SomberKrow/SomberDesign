<script setup>
import inSiteHeader from './components/inSiteHeader.vue'
import inHeroSection from './components/inHeroSection.vue'
import inAboutSection from './components/inAboutSection.vue'
import inProjectsSection from './components/inProjectsSection.vue'
import inContactSection from './components/inContactSection.vue'
import inSiteFooter from './components/inSiteFooter.vue'
import inSnowLayer from './components/inSnowLayer.vue'
</script>

<template>
  <div class="app">
    <a class="skipLink" href="#main-content">Skip to content</a>

    <div class="winterSky" aria-hidden="true">
      <div class="winterSky__horizon"></div>
      <div class="winterSky__moon"></div>
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
  background:
    radial-gradient(circle at 74% 16%, rgba(214, 226, 238, 0.1) 0 9rem, transparent 17rem),
    linear-gradient(180deg, #111923 0%, #0b1118 42%, #070b10 78%, #04070b 100%);
}

.winterSky__horizon,
.winterSky__moon,
.winterSky__cloud,
.winterSky__grain,
.winterSky__vignette {
  position: absolute;
  pointer-events: none;
}

.winterSky__horizon {
  left: -10vw;
  right: -10vw;
  bottom: -16vh;
  height: 46vh;
  background:
    linear-gradient(180deg, transparent 0%, rgba(142, 158, 172, 0.06) 35%, rgba(223, 232, 241, 0.08) 100%),
    radial-gradient(ellipse at 50% 0%, rgba(210, 222, 234, 0.16), transparent 64%);
  filter: blur(18px);
}

.winterSky__moon {
  top: clamp(5rem, 12vh, 8rem);
  right: clamp(2rem, 10vw, 10rem);
  width: clamp(5.5rem, 10vw, 8.5rem);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 38% 34%, rgba(255, 255, 255, 0.9), rgba(206, 218, 229, 0.54) 38%, rgba(206, 218, 229, 0.12) 62%, transparent 70%);
  filter: blur(0.25px);
  opacity: 0.48;
}

.winterSky__cloud {
  width: 62vw;
  height: 18vh;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(214, 226, 238, 0.07), transparent);
  filter: blur(22px);
  opacity: 0.72;
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
  opacity: 0.45;
  animation-duration: 42s;
  animation-direction: alternate-reverse;
}

.winterSky__grain {
  inset: 0;
  opacity: 0.12;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.28) 0 0.7px, transparent 0.8px),
    radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.15) 0 0.8px, transparent 0.9px);
  background-size: 6px 6px, 9px 9px;
}

.winterSky__vignette {
  inset: 0;
  background:
    linear-gradient(180deg, rgba(4, 7, 11, 0.18), transparent 24%, rgba(4, 7, 11, 0.68)),
    radial-gradient(circle at 50% 20%, transparent 0%, rgba(4, 7, 11, 0.28) 54%, rgba(4, 7, 11, 0.76) 100%);
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
  .winterSky__moon {
    right: -1.5rem;
    opacity: 0.3;
  }

  .winterSky__cloud {
    width: 95vw;
  }
}
</style>
