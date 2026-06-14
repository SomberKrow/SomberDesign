<script setup>
import { profileData } from '../data/inProfileData'
</script>

<template>
  <section class="contactSection">
    <div class="shell-grid contactSection__inner">
      <header class="contactSection__intro">
        <p class="kicker">Contact</p>
        <h2>Have a project in mind?</h2>
        <p>Email is the best way to reach me about websites, redesigns, creator pages, or frontend work.</p>
      </header>

      <div class="contactSection__details">
        <p>{{ profileData.availability }}</p>
        <dl>
          <div v-for="link in profileData.contactLinks" :key="link.label">
            <dt>{{ link.label }}</dt>
            <dd>
              <a v-if="link.href" :href="link.href" target="_blank" rel="noreferrer">{{ link.value }}</a>
              <span v-else>{{ link.value }}</span>
            </dd>
          </div>
        </dl>
      </div>

      <a class="contactSection__cta" href="mailto:hello@somber.design">
        <span class="contactSection__icon" aria-hidden="true">◇</span>
        <span class="contactSection__ctaLabel">Start a conversation</span>
        <strong>Tell me what you’re building and where you need help.</strong>
        <small>Send an email →</small>
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contactSection {
  border-bottom: 1px solid var(--color-line-dark);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.28), transparent 48%),
    var(--color-paper);
  color: var(--color-ink-dark);
}

.contactSection__inner {
  align-items: stretch;
  padding-block: var(--section-pad-y);
}

.contactSection__intro {
  grid-column: 1 / span 4;
}

.contactSection__intro h2 {
  max-width: 13ch;
  margin-top: 0.85rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 0.98;
}

.contactSection__intro > p:last-child {
  max-width: 44ch;
  margin-top: 1rem;
  color: var(--color-ink-dark-dim);
  font-size: 0.88rem;
  line-height: 1.68;
}

.contactSection__details {
  grid-column: 5 / span 3;
  padding-left: 1.35rem;
  border-left: 1px solid var(--color-line-dark);
}

.contactSection__details > p {
  color: var(--color-ink-dark-dim);
  font-size: 0.84rem;
  line-height: 1.62;
}

.contactSection__details dl {
  margin-top: 1.15rem;
}

.contactSection__details dl > div {
  padding: 0.72rem 0;
  border-top: 1px solid var(--color-line-dark);
}

.contactSection__details dt {
  color: var(--color-accent-strong);
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.contactSection__details dd {
  margin-top: 0.28rem;
  color: var(--color-ink-dark);
  font-size: 0.82rem;
}

.contactSection__cta {
  grid-column: 8 / -1;
  display: grid;
  align-content: start;
  min-height: 210px;
  padding: 1.25rem;
  border: 1px solid var(--color-bg-soft);
  background: var(--color-bg-soft);
  color: var(--color-ink);
  transition:
    transform var(--duration-base) var(--ease-out),
    background var(--duration-base) var(--ease-out);
}

.contactSection__cta:hover,
.contactSection__cta:focus-visible {
  transform: translateY(-3px);
  background: #1b2934;
}

.contactSection__icon {
  color: var(--color-accent);
  font-size: 1.8rem;
  line-height: 1;
}

.contactSection__ctaLabel,
.contactSection__cta small {
  font-family: var(--font-mono);
  font-size: 0.57rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.contactSection__ctaLabel {
  margin-top: 1rem;
  color: var(--color-accent);
}

.contactSection__cta strong {
  max-width: 27ch;
  margin-top: 0.65rem;
  font-size: 0.92rem;
  font-weight: 500;
  line-height: 1.55;
}

.contactSection__cta small {
  margin-top: auto;
  padding-top: 1.5rem;
  color: var(--color-ink-dim);
}

@media (max-width: 1000px) {
  .contactSection__intro {
    grid-column: 1 / span 6;
  }

  .contactSection__details {
    grid-column: 7 / -1;
  }

  .contactSection__cta {
    grid-column: 1 / -1;
    min-height: 180px;
    margin-top: 0.75rem;
  }
}

@media (max-width: 700px) {
  .contactSection__intro,
  .contactSection__details,
  .contactSection__cta {
    grid-column: 1 / -1;
  }

  .contactSection__details {
    margin-top: 0.75rem;
    padding: 1.25rem 0 0;
    border-top: 1px solid var(--color-line-dark);
    border-left: 0;
  }
}
