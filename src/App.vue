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
      <div class="winterSky__imageGrade"></div>
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
    radial-gradient(circle at 72% 14%, rgba(226, 232, 238, 0.1) 0 8rem, transparent 17rem),
    linear-gradient(180deg, #151a20 0%, #0d1218 44%, #080c11 78%, #04070b 100%);
}

.winterSky__imageGrade,
.winterSky__horizon,
.winterSky__moon,
.winterSky__cloud,
.winterSky__grain,
.winterSky__vignette {
  position: absolute;
  pointer-events: none;
}

.winterSky__imageGrade {
  inset: -3vh -3vw;
  background:
    linear-gradient(180deg, rgba(9, 13, 18, 0.34), rgba(9, 13, 18, 0.56) 48%, rgba(4, 7, 11, 0.86)),
    linear-gradient(90deg, rgba(181, 190, 198, 0.08), rgba(123, 135, 145, 0.04)),
    url('/assets/images/graykrowForest.png') center 82% / cover no-repeat;
  filter: grayscale(0.58) saturate(0.48) brightness(0.72) contrast(0.92);
  opacity: 0.64;
  transform: scale(1.035);
}

.winterSky__imageGrade::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 22%, rgba(220, 226, 232, 0.075), transparent 34%),
    linear-gradient(180deg, rgba(174, 185, 195, 0.1), rgba(85, 96, 107, 0.075) 42%, rgba(4, 7, 11, 0.68));
  mix-blend-mode: screen;
  opacity: 0.42;
}

.winterSky__horizon {
  left: -10vw;
  right: -10vw;
  bottom: -17vh;
  height: 46vh;
  background:
    linear-gradient(180deg, transparent 0%, rgba(168, 178, 187, 0.07) 35%, rgba(223, 229, 234, 0.08) 100%),
    radial-gradient(ellipse at 50% 0%, rgba(213, 221, 229, 0.13), transparent 64%);
  filter: blur(20px);
}

.winterSky__moon {
  top: clamp(5rem, 12vh, 8rem);
  right: clamp(2rem, 10vw, 10rem);
  width: clamp(5.5rem, 10vw, 8.5rem);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 38% 34%, rgba(245, 247, 249, 0.82), rgba(210, 217, 224, 0.4) 38%, rgba(210, 217, 224, 0.1) 62%, transparent 70%);
  filter: blur(0.35px);
  opacity: 0.34;
}

.winterSky__cloud {
  width: 62vw;
  height: 18vh;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(218, 225, 232, 0.055), transparent);
  filter: blur(24px);
  opacity: 0.54;
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
  opacity: 0.36;
  animation-duration: 42s;
  animation-direction: alternate-reverse;
}

.winterSky__grain {
  inset: 0;
  opacity: 0.1;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.24) 0 0.7px, transparent 0.8px),
    radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.12) 0 0.8px, transparent 0.9px);
  background-size: 6px 6px, 9px 9px;
}

.winterSky__vignette {
  inset: 0;
  background:
    linear-gradient(180deg, rgba(4, 7, 11, 0.18), transparent 20%, rgba(4, 7, 11, 0.72)),
    radial-gradient(circle at 50% 24%, transparent 0%, rgba(4, 7, 11, 0.24) 52%, rgba(4, 7, 11, 0.78) 100%);
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
    opacity: 0.24;
  }

  .winterSky__cloud {
    width: 95vw;
  }

  .winterSky__imageGrade {
    background-position: center bottom;
    opacity: 0.5;
  }
}
</style>
