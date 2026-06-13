<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const isMenuOpen = ref(false)
const activeSection = ref('hero')
let observer

const navItems = [
  { id: 'hero', label: 'Index' },
  { id: 'about', label: 'Approach' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleResize = () => {
  if (window.innerWidth > 900) {
    closeMenu()
  }
}

const handleKeydown = event => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

const setupActiveSectionObserver = () => {
  const sections = document.querySelectorAll('[data-section]')

  observer = new IntersectionObserver(
    entries => {
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visibleEntries[0]?.target?.id) {
        activeSection.value = visibleEntries[0].target.id
      }
    },
    {
      rootMargin: '-28% 0px -52% 0px',
      threshold: [0.1, 0.25, 0.5, 0.75],
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
  setupActiveSectionObserver()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('nav-open')
  observer?.disconnect()
})
</script>

<template>
  <header class="siteHeader">
    <div class="shell-grid siteHeader__inner line-frame">
      <a href="#hero" class="siteHeader__brand" aria-label="Somber.Design home" @click="closeMenu">
        <img class="siteHeader__logo" src="/assets/images/SomberDesignLogo.png" alt="Somber.Design logo" />
        <div class="siteHeader__identity">
          <p class="siteHeader__wordmark">Somber.Design</p>
          <p class="siteHeader__meta">Winter Gray Interface Work</p>
        </div>
      </a>

      <button
        class="siteHeader__menuButton"
        :class="{ isOpen: isMenuOpen }"
        type="button"
        aria-label="Toggle navigation"
        aria-controls="site-primary-nav"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
      </button>

      <nav id="site-primary-nav" class="siteHeader__nav" :class="{ isOpen: isMenuOpen }" aria-label="Primary navigation">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="siteHeader__link"
          :class="{ isActive: activeSection === item.id }"
          @click="closeMenu"
        >
          <span>{{ item.label }}</span>
        </a>
      </nav>
    </div>

    <button
      v-if="isMenuOpen"
      class="siteHeader__scrim"
      type="button"
      aria-label="Close navigation menu"
      @click="closeMenu"
    ></button>
  </header>
</template>

<style scoped lang="scss">
.siteHeader {
  position: sticky;
  top: 0;
  z-index: 80;
  padding-top: 0.65rem;
}

.siteHeader__inner {
  position: relative;
  z-index: 2;
  align-items: center;
  min-height: var(--header-height);
  overflow: visible;
  background:
    linear-gradient(180deg, rgba(38, 45, 51, 0.78), rgba(17, 21, 25, 0.72)),
    rgba(19, 24, 28, 0.66);
  border-color: rgba(196, 207, 214, 0.2);
  box-shadow:
    0 0.75rem 2.5rem rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(230, 234, 236, 0.045);
  backdrop-filter: blur(16px) saturate(82%);
}

.siteHeader__brand {
  grid-column: 1 / span 5;
  display: inline-flex;
  gap: 0.75rem;
  align-items: center;
  min-width: 0;
  padding-left: 0.85rem;
}

.siteHeader__logo {
  width: 38px;
  height: 38px;
  object-fit: contain;
  flex-shrink: 0;
  opacity: 0.9;
  filter: grayscale(0.12) saturate(0.72) drop-shadow(0 0 1.35rem rgba(118, 141, 158, 0.2));
}

.siteHeader__identity {
  min-width: 0;
}

.siteHeader__wordmark {
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.siteHeader__meta {
  overflow: hidden;
  color: var(--color-accent-soft);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.13em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.siteHeader__nav {
  grid-column: 7 / -1;
  display: inline-flex;
  justify-self: end;
  align-self: stretch;
  gap: 0.2rem;
  padding: 0.35rem;
}

.siteHeader__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 5.9rem;
  padding: 0 0.85rem;
  color: var(--color-ink-dim);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition:
    color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.siteHeader__link::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  background: transparent;
  transition:
    border-color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.siteHeader__link span {
  position: relative;
  z-index: 1;
}

.siteHeader__link:hover,
.siteHeader__link:focus-visible,
.siteHeader__link.isActive {
  color: var(--color-ink);
}

.siteHeader__link:hover::before,
.siteHeader__link:focus-visible::before,
.siteHeader__link.isActive::before {
  border-color: var(--color-line);
  background: linear-gradient(180deg, rgba(184, 198, 207, 0.09), rgba(118, 141, 158, 0.045));
}

.siteHeader__link.isActive::after {
  content: '';
  position: absolute;
  right: 0.75rem;
  bottom: 0.5rem;
  left: 0.75rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent-cold), transparent);
  opacity: 0.8;
}

.siteHeader__menuButton,
.siteHeader__scrim {
  display: none;
}

@media (max-width: 900px) {
  .siteHeader {
    padding-top: 0.45rem;
  }

  .siteHeader__brand {
    grid-column: 1 / span 9;
    padding-left: 0.75rem;
  }

  .siteHeader__meta {
    font-size: 0.58rem;
  }

  .siteHeader__menuButton {
    position: relative;
    z-index: 7;
    grid-column: 10 / -1;
    justify-self: end;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border: 0;
    border-left: 1px solid var(--color-line);
    background: transparent;
    color: var(--color-ink);
    cursor: pointer;
  }

  .siteHeader__menuButton span {
    position: absolute;
    width: 18px;
    height: 1px;
    background: currentColor;
    transform-origin: center;
    transition: transform var(--duration-fast) var(--ease-out);
  }

  .siteHeader__menuButton span:first-child {
    transform: translateY(-4px);
  }

  .siteHeader__menuButton span:last-child {
    transform: translateY(4px);
  }

  .siteHeader__menuButton.isOpen span:first-child {
    transform: rotate(35deg);
  }

  .siteHeader__menuButton.isOpen span:last-child {
    transform: rotate(-35deg);
  }

  .siteHeader__scrim {
    position: fixed;
    inset: 0;
    z-index: 1;
    display: block;
    border: 0;
    background: rgba(5, 7, 9, 0.34);
    cursor: pointer;
  }

  .siteHeader__nav {
    position: absolute;
    top: calc(100% + 0.45rem);
    right: 0;
    z-index: 6;
    display: grid;
    align-content: start;
    width: min(22rem, calc(100vw - 1.5rem));
    max-height: calc(100vh - var(--header-height) - 1.5rem);
    overflow-y: auto;
    border: 1px solid var(--color-line);
    padding: 0.35rem;
    background:
      linear-gradient(180deg, rgba(36, 43, 49, 0.97), rgba(14, 18, 22, 0.96)),
      var(--color-panel-strong);
    box-shadow: 0 1.2rem 3rem rgba(0, 0, 0, 0.36);
    backdrop-filter: blur(18px) saturate(84%);
    opacity: 0;
    pointer-events: none;
    transform: translate3d(0, -0.4rem, 0) scale(0.985);
    transform-origin: top right;
    visibility: hidden;
    transition:
      opacity var(--duration-base) var(--ease-out),
      transform var(--duration-base) var(--ease-out),
      visibility 0s linear var(--duration-base);
  }

  .siteHeader__nav.isOpen {
    opacity: 1;
    pointer-events: auto;
    transform: translate3d(0, 0, 0) scale(1);
    visibility: visible;
    transition-delay: 0s;
  }

  .siteHeader__link {
    justify-content: space-between;
    width: 100%;
    min-height: 54px;
    min-width: 0;
    padding-inline: 0.85rem;
    font-size: 0.7rem;
  }

  .siteHeader__link::after {
    content: '↘';
    position: static;
    width: auto;
    height: auto;
    background: none;
    color: var(--color-ink-muted);
    font-size: 0.72rem;
    line-height: 1;
    opacity: 1;
  }
}

@media (max-width: 560px) {
  .siteHeader__brand {
    grid-column: 1 / span 8;
    gap: 0.6rem;
  }

  .siteHeader__logo {
    width: 34px;
    height: 34px;
  }

  .siteHeader__wordmark {
    font-size: 0.9rem;
  }

  .siteHeader__meta {
    max-width: 21ch;
  }

  .siteHeader__menuButton {
    grid-column: 9 / -1;
  }

  .siteHeader__nav {
    left: 0;
    right: 0;
    width: auto;
    transform-origin: top center;
  }
}
</style>
