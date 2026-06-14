<script setup>
import { profileData } from '../data/inProfileData'
</script>

<template>
  <section class="heroSection">
    <div class="heroSection__image" aria-hidden="true"></div>
    <div class="heroSection__shape heroSection__shape--one" aria-hidden="true"></div>
    <div class="heroSection__shape heroSection__shape--two" aria-hidden="true"></div>

    <div class="shell-grid heroSection__inner">
      <div class="heroSection__copy">
        <p class="kicker">Somber.Design / Jacob</p>
        <h1>{{ profileData.headline }}</h1>
        <span class="heroSection__rule" aria-hidden="true"></span>
        <p class="heroSection__intro">{{ profileData.intro }}</p>

        <div class="heroSection__actions">
          <a class="heroSection__button heroSection__button--primary" :href="profileData.ctas.primary.href">
            {{ profileData.ctas.primary.label }} <span>→</span>
          </a>
          <a class="heroSection__button" :href="profileData.ctas.secondary.href">
            {{ profileData.ctas.secondary.label }}
          </a>
        </div>
      </div>

      <dl class="heroSection__facts">
        <div>
          <dt>Location</dt>
          <dd>{{ profileData.location }}</dd>
        </div>
        <div>
          <dt>Availability</dt>
          <dd>{{ profileData.availability }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped lang="scss">
.heroSection {
  position: relative;
  min-height: 560px;
  overflow: hidden;
  border-bottom: 1px solid var(--color-line-dark);
  background:
    linear-gradient(90deg, rgba(241, 244, 245, 0.99) 0%, rgba(241, 244, 245, 0.96) 45%, rgba(230, 235, 238, 0.7) 72%, rgba(230, 235, 238, 0.38) 100%),
    var(--color-paper);
  color: var(--color-ink-dark);
}

.heroSection::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(23, 33, 42, 0.08) 0 0.55px, transparent 0.65px),
    radial-gradient(circle at 70% 65%, rgba(23, 33, 42, 0.05) 0 0.55px, transparent 0.65px);
  background-size: 7px 7px, 11px 11px;
  opacity: 0.22;
  pointer-events: none;
}

.heroSection__image {
  position: absolute;
  inset: 0 0 0 37%;
  background:
    linear-gradient(90deg, var(--color-paper-strong) 0%, rgba(241, 244, 245, 0.75) 22%, rgba(241, 244, 245, 0.12) 68%),
    linear-gradient(180deg, rgba(230, 235, 238, 0.18), rgba(13, 22, 30, 0.18)),
    url('/assets/images/graykrowForest.png') center 70% / cover no-repeat;
  filter: grayscale(0.72) saturate(0.42) brightness(1.22) contrast(0.78);
  opacity: 0.72;
}

.heroSection__shape {
  position: absolute;
  right: -4vw;
  z-index: 1;
  width: min(30vw, 380px);
  background: rgba(15, 26, 35, 0.75);
  box-shadow: 0 1.5rem 3rem rgba(4, 10, 15, 0.18);
  pointer-events: none;
}

.heroSection__shape--one {
  top: 2.5rem;
  height: 240px;
  clip-path: polygon(55% 0, 100% 46%, 100% 100%, 28% 100%);
}

.heroSection__shape--two {
  right: -1vw;
  bottom: 0;
  width: min(45vw, 620px);
  height: 180px;
  background: rgba(223, 229, 232, 0.78);
  clip-path: polygon(34% 0, 100% 0, 100% 100%, 0 100%);
}

.heroSection__inner {
  position: relative;
  z-index: 3;
  align-content: center;
  min-height: 560px;
  padding-block: 4.5rem 3rem;
}

.heroSection__copy {
  grid-column: 1 / span 7;
  max-width: 760px;
  animation: heroEnter var(--duration-slow) var(--ease-soft) both;
}

.heroSection h1 {
  max-width: 14ch;
  margin-top: 1.15rem;
  font-family: var(--font-display);
  font-size: clamp(2.7rem, 5.6vw, 5.35rem);
  font-weight: 600;
  letter-spacing: -0.058em;
  line-height: 0.96;
  text-wrap: balance;
}

.heroSection__rule {
  display: block;
  width: 2.2rem;
  height: 1px;
  margin-top: 1.35rem;
  background: var(--color-ink-dark);
}

.heroSection__intro {
  max-width: 55ch;
  margin-top: 1.15rem;
  color: var(--color-ink-dark-dim);
  font-size: clamp(0.94rem, 1.1vw, 1.05rem);
  line-height: 1.68;
}

.heroSection__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.55rem;
}

.heroSection__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 46px;
  padding: 0.65rem 1.25rem;
  border: 1px solid var(--color-line-dark-strong);
  color: var(--color-ink-dark);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition:
    transform var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.heroSection__button:hover,
.heroSection__button:focus-visible {
  transform: translateY(-2px);
  background: rgba(23, 33, 42, 0.07);
}

.heroSection__button--primary {
  border-color: var(--color-bg-soft);
  background: var(--color-bg-soft);
  color: var(--color-paper-strong);
}

.heroSection__button--primary:hover,
.heroSection__button--primary:focus-visible {
  background: #1c2a35;
}

.heroSection__facts {
  grid-column: 1 / span 7;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-line-dark);
}

.heroSection__facts dt {
  color: var(--color-accent-strong);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.heroSection__facts dd {
  margin-top: 0.4rem;
  color: var(--color-ink-dark-dim);
  font-size: 0.78rem;
  line-height: 1.5;
}

@keyframes heroEnter {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1100px) {
  .heroSection__copy,
  .heroSection__facts {
    grid-column: 1 / span 8;
  }

  .heroSection__image {
    left: 48%;
  }

  .heroSection__shape {
    opacity: 0.7;
  }
}

@media (max-width: 900px) {
  .heroSection {
    min-height: 0;
    margin-top: var(--mobile-header-height);
  }

  .heroSection__inner {
    min-height: 520px;
    padding-block: 4rem 2.5rem;
  }

  .heroSection__copy,
  .heroSection__facts {
    grid-column: 1 / -1;
  }

  .heroSection__image {
    inset: 0;
    opacity: 0.32;
  }

  .heroSection__shape {
    opacity: 0.28;
  }

  .heroSection h1 {
    max-width: 13ch;
    font-size: clamp(2.45rem, 10vw, 4.2rem);
  }
}

@media (max-width: 560px) {
  .heroSection__inner {
    min-height: 500px;
    padding-block: 3.25rem 2rem;
  }

  .heroSection h1 {
    font-size: clamp(2.15rem, 11.5vw, 3.35rem);
  }

  .heroSection__actions,
  .heroSection__facts {
    grid-template-columns: 1fr;
  }

  .heroSection__button {
    width: 100%;
  }
}
