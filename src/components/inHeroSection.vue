<script setup>
import { profileData } from '../data/inProfileData'
</script>

<template>
  <section class="heroSection">
    <div class="shell-grid heroSection__inner">
      <div class="heroSection__copy">
        <p class="kicker">{{ profileData.label }}</p>
        <h1 class="heroSection__title">{{ profileData.headline }}</h1>
        <p class="heroSection__intro">{{ profileData.intro }}</p>

        <div class="heroSection__actions">
          <a class="heroSection__button heroSection__button--primary" :href="profileData.ctas.primary.href">
            {{ profileData.ctas.primary.label }}
          </a>
          <a class="heroSection__button" :href="profileData.ctas.secondary.href">
            {{ profileData.ctas.secondary.label }}
          </a>
        </div>
      </div>

      <aside class="heroSection__signal line-frame" aria-label="Current atmosphere and availability">
        <div class="heroSection__signalTop">
          <span></span>
          <p>{{ profileData.currentSignal.title }}</p>
        </div>
        <p class="heroSection__signalText">{{ profileData.currentSignal.text }}</p>

        <dl class="heroSection__meta">
          <div>
            <dt>Base</dt>
            <dd>{{ profileData.location }}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{{ profileData.availability }}</dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.heroSection {
  padding: clamp(2.4rem, 5.5vw, 4.25rem) 0 var(--section-pad-y-tight);
}

.heroSection__inner {
  align-items: end;
}

.heroSection__copy {
  grid-column: 1 / span 8;
  animation: contentRise var(--duration-slow) var(--ease-soft) both;
}

.heroSection__title {
  margin-top: 0.9rem;
  max-width: 16ch;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.6vw, 4.25rem);
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 0.98;
  text-shadow: 0 0.25rem 2.25rem rgba(0, 0, 0, 0.4);
  text-wrap: balance;
}

.heroSection__intro {
  margin-top: 1.1rem;
  max-width: 58ch;
  color: var(--color-ink-dim);
  font-size: clamp(0.97rem, 1.08vw, 1.08rem);
  line-height: 1.74;
  text-shadow: 0 1px 1rem rgba(0, 0, 0, 0.32);
}

.heroSection__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.35rem;
}

.heroSection__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.45rem 1rem;
  border: 1px solid var(--color-line-strong);
  background:
    linear-gradient(180deg, rgba(184, 198, 207, 0.08), rgba(118, 141, 158, 0.035)),
    rgba(20, 25, 30, 0.56);
  color: var(--color-ink);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  box-shadow: inset 0 1px 0 rgba(230, 234, 236, 0.035);
  backdrop-filter: blur(8px) saturate(84%);
  transition:
    transform var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.heroSection__button:hover,
.heroSection__button:focus-visible {
  transform: translate3d(0, -2px, 0);
  border-color: var(--color-accent-cold);
  background:
    linear-gradient(180deg, rgba(184, 198, 207, 0.13), rgba(118, 141, 158, 0.065)),
    rgba(24, 30, 35, 0.68);
}

.heroSection__button--primary {
  background: linear-gradient(180deg, #c2ced5, #aebdc7);
  color: #171c20;
  border-color: #c4d0d7;
  box-shadow:
    0 0.7rem 2rem rgba(0, 0, 0, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.38);
}

.heroSection__button--primary:hover,
.heroSection__button--primary:focus-visible {
  background: linear-gradient(180deg, #d0d9de, #bac7cf);
  color: #11161a;
}

.heroSection__signal {
  position: relative;
  grid-column: 9 / -1;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
  border-color: rgba(196, 207, 214, 0.2);
  animation: contentRise var(--duration-slow) var(--ease-soft) 110ms both;
}

.heroSection__signal::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(125deg, rgba(194, 206, 214, 0.1), transparent 40%),
    radial-gradient(circle at 100% 0%, rgba(118, 141, 158, 0.17), transparent 38%);
  opacity: 0.74;
  pointer-events: none;
}

.heroSection__signal > * {
  position: relative;
  z-index: 1;
}

.heroSection__signalTop {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--color-accent-soft);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.heroSection__signalTop span {
  width: 0.45rem;
  height: 0.45rem;
  border: 1px solid rgba(213, 222, 228, 0.58);
  border-radius: 50%;
  background: var(--color-accent-cold);
  box-shadow: 0 0 1rem rgba(118, 141, 158, 0.46);
}

.heroSection__signalText {
  color: var(--color-ink-dim);
  font-size: 0.9rem;
  line-height: 1.75;
}

.heroSection__meta {
  display: grid;
  gap: 0.75rem;
  margin-top: 0.2rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--color-line);
}

.heroSection__meta dt {
  margin-bottom: 0.26rem;
  color: var(--color-ink-muted);
  font-family: var(--font-mono);
  font-size: 0.61rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.heroSection__meta dd {
  margin: 0;
  color: var(--color-ink);
  font-size: 0.84rem;
  line-height: 1.5;
}

@keyframes contentRise {
  from {
    opacity: 0;
    transform: translate3d(0, 0.8rem, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@media (max-width: 1000px) {
  .heroSection__copy,
  .heroSection__signal {
    grid-column: 1 / -1;
  }

  .heroSection__signal {
    max-width: 38rem;
  }
}

@media (max-width: 900px) {
  .heroSection {
    padding-top: 2.1rem;
  }

  .heroSection__title {
    max-width: 15ch;
    font-size: clamp(2rem, 8vw, 3.25rem);
  }

  .heroSection__intro {
    max-width: 48ch;
  }
}

@media (max-width: 640px) {
  .heroSection {
    padding-top: 1.65rem;
  }

  .heroSection__title {
    max-width: 14ch;
    font-size: clamp(1.75rem, 9vw, 2.55rem);
    line-height: 1;
  }

  .heroSection__intro {
    margin-top: 1rem;
    line-height: 1.68;
  }

  .heroSection__actions {
    gap: 0.5rem;
  }

  .heroSection__button {
    width: 100%;
  }
}
</style>
