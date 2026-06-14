<script setup>
import { profileData } from '../data/inProfileData'
</script>

<template>
  <section class="aboutSection">
    <div class="shell-grid aboutSection__inner">
      <div class="aboutSection__copy">
        <p class="kicker">About Jacob</p>
        <h2>Design, development, and practical frontend work.</h2>
        <p>{{ profileData.summary }}</p>
      </div>

      <div class="aboutSection__divider" aria-hidden="true"></div>

      <div class="aboutSection__statement">
        <span class="aboutSection__mark" aria-hidden="true">✳</span>
        <p>Built as a portfolio.<br />Used as a contact point.<br />Kept open as a playground.</p>
      </div>

      <div class="aboutSection__focus">
        <article>
          <span>01</span>
          <h3>Websites</h3>
          <p>Personal sites, creator pages, small business sites, and portfolio work.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Frontend</h3>
          <p>Vue 3, Vite, SCSS, responsive layouts, and component-based builds.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Experiments</h3>
          <p>Small tools, redesigns, prototypes, and ideas that may become larger projects.</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.aboutSection {
  border-bottom: 1px solid var(--color-line-dark);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.26), transparent 46%),
    var(--color-paper);
  color: var(--color-ink-dark);
}

.aboutSection__inner {
  align-items: stretch;
  padding-block: 2.25rem;
}

.aboutSection__copy {
  grid-column: 1 / span 5;
}

.aboutSection__copy h2 {
  max-width: 21ch;
  margin-top: 0.8rem;
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 2.3vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.04;
}

.aboutSection__copy > p:last-child {
  max-width: 58ch;
  margin-top: 0.85rem;
  color: var(--color-ink-dark-dim);
  font-size: 0.88rem;
  line-height: 1.67;
}

.aboutSection__divider {
  grid-column: 6 / span 1;
  width: 1px;
  min-height: 150px;
  justify-self: center;
  background: var(--color-line-dark);
}

.aboutSection__statement {
  grid-column: 7 / span 3;
  align-self: center;
}

.aboutSection__mark {
  display: block;
  color: var(--color-accent-strong);
  font-size: 1.35rem;
}

.aboutSection__statement p {
  margin-top: 1rem;
  color: var(--color-ink-dark-dim);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  line-height: 1.7;
  text-transform: uppercase;
}

.aboutSection__focus {
  grid-column: 10 / -1;
  display: grid;
  gap: 0.75rem;
}

.aboutSection__focus article {
  padding-top: 0.55rem;
  border-top: 1px solid var(--color-line-dark);
}

.aboutSection__focus span {
  color: var(--color-accent-strong);
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.13em;
}

.aboutSection__focus h3 {
  margin-top: 0.2rem;
  font-size: 0.82rem;
  font-weight: 700;
}

.aboutSection__focus p {
  margin-top: 0.22rem;
  color: var(--color-ink-dark-dim);
  font-size: 0.72rem;
  line-height: 1.48;
}

@media (max-width: 1050px) {
  .aboutSection__copy {
    grid-column: 1 / span 6;
  }

  .aboutSection__divider {
    display: none;
  }

  .aboutSection__statement {
    grid-column: 7 / -1;
  }

  .aboutSection__focus {
    grid-column: 1 / -1;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 0.75rem;
  }
}

@media (max-width: 700px) {
  .aboutSection__inner {
    padding-block: 2rem;
  }

  .aboutSection__copy,
  .aboutSection__statement,
  .aboutSection__focus {
    grid-column: 1 / -1;
  }

  .aboutSection__statement {
    padding-top: 1.25rem;
    border-top: 1px solid var(--color-line-dark);
  }

  .aboutSection__focus {
    grid-template-columns: 1fr;
  }
}
