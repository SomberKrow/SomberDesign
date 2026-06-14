<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const isMenuOpen = ref(false)
const activeSection = ref('hero')
let observer

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai-use', label: 'AI Use' },
  { id: 'playground', label: 'Playground' },
  { id: 'contact', label: 'Contact' },
]

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleResize = () => {
  if (window.innerWidth > 900) closeMenu()
}

const handleKeydown = event => {
  if (event.key === 'Escape') closeMenu()
}

const setupObserver = () => {
  const sections = document.querySelectorAll('[data-section]')

  observer = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible[0]?.target?.id) activeSection.value = visible[0].target.id
    },
    {
      rootMargin: '-24% 0px -58% 0px',
      threshold: [0.08, 0.25, 0.5],
    },
  )

  sections.forEach(section => observer.observe(section))
}

watch(isMenuOpen, isOpen => {
  document.body.classList.toggle('nav-open', isOpen)
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('keydown', handleKeydown)
  setupObserver()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('nav-open')
  observer?.disconnect()
})
</script>

<template>
  <header class="siteNav">
    <div class="siteNav__mobileBar">
      <a class="siteNav__mobileBrand" href="#hero" aria-label="Somber.Design home" @click="closeMenu">
        <img src="/assets/images/SomberDesignLogo.png" alt="" aria-hidden="true" />
        <span>Somber.Design</span>
      </a>

      <button
        class="siteNav__menuButton"
        type="button"
        aria-label="Toggle navigation"
        :aria-expanded="isMenuOpen"
        aria-controls="site-navigation"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
      </button>
    </div>

    <div id="site-navigation" class="siteNav__panel" :class="{ isOpen: isMenuOpen }">
      <a class="siteNav__brand" href="#hero" aria-label="Somber.Design home" @click="closeMenu">
        <img class="siteNav__logo" src="/assets/images/SomberDesignLogo.png" alt="Somber.Design logo" />
        <div>
          <p class="siteNav__name">Somber.Design</p>
          <p class="siteNav__byline">Portfolio by Jacob</p>
        </div>
      </a>

      <nav class="siteNav__links" aria-label="Primary navigation">
        <a
          v-for="(item, index) in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="siteNav__link"
          :class="{ isActive: activeSection === item.id }"
          @click="closeMenu"
        >
          <span class="siteNav__number">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="siteNav__label">{{ item.label }}</span>
        </a>
      </nav>

      <div class="siteNav__bottom">
        <p>Portfolio.<br />Projects.<br />Experiments.</p>
        <span></span>
        <a href="#contact" @click="closeMenu">Contact me →</a>
      </div>

      <img class="siteNav__watermark" src="/assets/images/SomberDesignLogo.png" alt="" aria-hidden="true" />
    </div>

    <button
      v-if="isMenuOpen"
      class="siteNav__scrim"
      type="button"
      aria-label="Close navigation"
      @click="closeMenu"
    ></button>
  </header>
</template>

<style scoped lang="scss">
.siteNav {
  position: relative;
  z-index: 100;
}

.siteNav__panel {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 3;
  display: flex;
  width: var(--sidebar-width);
  flex-direction: column;
  overflow: hidden;
  border-right: 1px solid var(--color-line-strong);
  background:
    linear-gradient(180deg, rgba(11, 19, 27, 0.98), rgba(7, 14, 21, 0.99)),
    var(--color-bg-deep);
  box-shadow: 0.75rem 0 2.5rem rgba(0, 0, 0, 0.14);
}

.siteNav__brand {
  display: grid;
  justify-items: center;
  gap: 0.8rem;
  padding: 2.4rem 1.25rem 2rem;
  text-align: center;
}

.siteNav__logo {
  width: 66px;
  height: 66px;
  object-fit: contain;
  filter: grayscale(0.18) saturate(0.78) drop-shadow(0 0 1.5rem rgba(143, 165, 179, 0.16));
}

.siteNav__name {
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.siteNav__byline {
  margin-top: 0.35rem;
  color: var(--color-ink-muted);
  font-family: var(--font-mono);
  font-size: 0.57rem;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.siteNav__links {
  display: grid;
  gap: 0.18rem;
  padding: 0.8rem 1.1rem;
}

.siteNav__link {
  position: relative;
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 0.55rem;
  align-items: center;
  min-height: 54px;
  padding: 0.55rem 0.65rem;
  color: var(--color-ink-muted);
  transition:
    color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.siteNav__link::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -1.1rem;
  width: 1.15rem;
  height: 1px;
  background: var(--color-accent);
  opacity: 0;
  transform: translateY(-50%) scaleX(0.35);
  transform-origin: left;
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.siteNav__link:hover,
.siteNav__link:focus-visible,
.siteNav__link.isActive {
  color: var(--color-ink);
  background: rgba(166, 186, 199, 0.045);
}

.siteNav__link:hover::before,
.siteNav__link:focus-visible::before,
.siteNav__link.isActive::before {
  opacity: 1;
  transform: translateY(-50%) scaleX(1);
}

.siteNav__number,
.siteNav__label {
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.siteNav__number {
  font-size: 0.58rem;
  letter-spacing: 0.14em;
}

.siteNav__label {
  font-size: 0.66rem;
  letter-spacing: 0.15em;
}

.siteNav__bottom {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 1rem;
  margin-top: auto;
  padding: 1.5rem 1.6rem 2rem;
  color: var(--color-ink-muted);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  line-height: 1.65;
  text-transform: uppercase;
}

.siteNav__bottom span {
  width: 1.3rem;
  height: 1px;
  background: var(--color-accent);
}

.siteNav__bottom a {
  width: fit-content;
  color: var(--color-ink-dim);
  transition: color var(--duration-fast) var(--ease-out);
}

.siteNav__bottom a:hover,
.siteNav__bottom a:focus-visible {
  color: var(--color-ink);
}

.siteNav__watermark {
  position: absolute;
  left: -3.5rem;
  bottom: 4.2rem;
  width: 15rem;
  opacity: 0.055;
  filter: grayscale(1);
  pointer-events: none;
}

.siteNav__mobileBar,
.siteNav__scrim {
  display: none;
}

@media (max-width: 900px) {
  .siteNav__mobileBar {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--mobile-header-height);
    padding: 0 0.75rem 0 1rem;
    border-bottom: 1px solid var(--color-line);
    background: rgba(7, 14, 21, 0.94);
    backdrop-filter: blur(16px);
  }

  .siteNav__mobileBrand {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    font-family: var(--font-display);
    font-size: 0.92rem;
    font-weight: 600;
  }

  .siteNav__mobileBrand img {
    width: 34px;
    height: 34px;
    object-fit: contain;
  }

  .siteNav__menuButton {
    position: relative;
    width: 48px;
    height: 48px;
    border: 0;
    background: transparent;
    color: var(--color-ink);
    cursor: pointer;
  }

  .siteNav__menuButton span {
    position: absolute;
    left: 14px;
    width: 20px;
    height: 1px;
    background: currentColor;
  }

  .siteNav__menuButton span:first-child {
    top: 20px;
  }

  .siteNav__menuButton span:last-child {
    top: 27px;
  }

  .siteNav__panel {
    top: var(--mobile-header-height);
    width: min(22rem, 88vw);
    border-top: 1px solid var(--color-line);
    opacity: 0;
    pointer-events: none;
    transform: translateX(-102%);
    transition:
      opacity var(--duration-base) var(--ease-out),
      transform var(--duration-base) var(--ease-out);
  }

  .siteNav__panel.isOpen {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
  }

  .siteNav__brand {
    justify-items: start;
    grid-template-columns: auto 1fr;
    align-items: center;
    padding: 1.3rem;
    text-align: left;
  }

  .siteNav__logo {
    width: 46px;
    height: 46px;
  }

  .siteNav__links {
    padding-inline: 1.25rem;
  }

  .siteNav__watermark {
    opacity: 0.04;
  }

  .siteNav__scrim {
    position: fixed;
    inset: var(--mobile-header-height) 0 0;
    z-index: 2;
    display: block;
    border: 0;
    background: rgba(3, 7, 10, 0.48);
  }
}
