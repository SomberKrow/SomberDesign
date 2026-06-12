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
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.6vw, 4.25rem);
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 0.98;
  text-wrap: balance;
}

.heroSection__intro {
  margin-top: 1.1rem;
  max-width: 58ch;
  color: var(--color-ink-dim);
  font-size: clamp(0.97rem, 1.08vw, 1.08rem);
  line-height: 1.74;
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
  background: rgba(223, 232, 241, 0.035);
  color: var(--color-ink);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  transition:
    transform var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.heroSection__button:hover,
.heroSection__button:focus-visible {
  transform: translate3d(0, -2px, 0);
  border-color: rgba(223, 232, 241, 0.42);
  background: rgba(223, 232, 241, 0.08);
}

.heroSection__button--primary {
  background: var(--color-accent);
  color: var(--color-bg);
  border-color: var(--color-accent);
}

.heroSection__button--primary:hover,
.heroSection__button--primary:focus-visible {
  background: #e0e8ef;
}

.heroSection__signal {
  position: relative;
  grid-column: 9 / -1;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
  animation: contentRise var(--duration-slow) var(--ease-soft) 110ms both;
}

.heroSection__signal::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(223, 232, 241, 0.09), transparent 38%),
    radial-gradient(circle at 100% 0%, rgba(143, 164, 183, 0.16), transparent 36%);
  opacity: 0.78;
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
  color: var(--color-ink-muted);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.heroSection__signalTop span {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 1rem rgba(200, 213, 223, 0.34);
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
  border-top: 1px solid rgba(223, 232, 241, 0.12);
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
