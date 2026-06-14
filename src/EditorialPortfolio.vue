<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { profileData } from './data/inProfileData'
import { projectsData } from './data/inProjectsData'
import inSnowLayer from './components/inSnowLayer.vue'

const isMenuOpen = ref(false)
const activeSection = ref('home')
let sectionObserver

const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai', label: 'AI Use' },
  { id: 'playground', label: 'Playground' },
  { id: 'contact', label: 'Contact' },
]

const capabilities = [
  {
    title: 'Web Design',
    copy: 'Page structure, visual direction, responsive layouts, and practical interface systems.',
  },
  {
    title: 'Frontend Development',
    copy: 'Vue 3, Vite, SCSS, component architecture, responsive behavior, and implementation.',
  },
  {
    title: 'Creator Websites',
    copy: 'Personal sites, link homes, portfolio pages, and project-specific web identities.',
  },
  {
    title: 'Redesign & Polish',
    copy: 'Reworking existing sites to improve readability, consistency, performance, and mobile use.',
  },
]

const aiWorkflow = [
  {
    title: 'Design',
    copy: 'Concept exploration, layout comparison, copy iteration, asset planning, and visual review.',
  },
  {
    title: 'Development',
    copy: 'Planning, implementation support, debugging, code review, documentation, and research.',
  },
  {
    title: 'Production',
    copy: 'Content passes, repetitive cleanup, QA checklists, iteration, and release preparation.',
  },
]

const playgroundItems = [
  {
    title: 'Interface Studies',
    copy: 'Navigation ideas, layout systems, animation tests, and smaller visual experiments.',
  },
  {
    title: 'Utility Builds',
    copy: 'Focused tools built around a specific local or day-to-day need.',
  },
  {
    title: 'Rebuilds',
    copy: 'Older projects revisited with cleaner structure, stronger responsive behavior, and better polish.',
  },
  {
    title: 'Prototypes',
    copy: 'Early concepts that are useful enough to test before they become full projects.',
  },
]

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const projectMark = title =>
  title
    .split(/\s+/)
    .map(word => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()

const setupSectionObserver = () => {
  sectionObserver = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible[0]?.target?.id) {
        activeSection.value = visible[0].target.id
      }
    },
    {
      rootMargin: '-22% 0px -60% 0px',
      threshold: [0.08, 0.2, 0.45],
    },
  )

  document.querySelectorAll('[data-section]').forEach(section => sectionObserver.observe(section))
}

const handleResize = () => {
  if (window.innerWidth > 920) closeMenu()
}

const handleKeydown = event => {
  if (event.key === 'Escape') closeMenu()
}

watch(isMenuOpen, open => {
  document.body.classList.toggle('nav-open', open)
})

onMounted(() => {
  setupSectionObserver()
  window.addEventListener('resize', handleResize)
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  sectionObserver?.disconnect()
  document.body.classList.remove('nav-open')
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="portfolio">
    <a class="skipLink" href="#main-content">Skip to content</a>
    <inSnowLayer />

    <header class="mobileHeader">
      <a href="#home" class="mobileHeader__brand" aria-label="Somber.Design home" @click="closeMenu">
        <img src="/assets/images/SomberDesignLogo.png" alt="" aria-hidden="true" />
        <span>Somber.Design</span>
      </a>

      <button
        class="mobileHeader__toggle"
        type="button"
        aria-label="Toggle navigation"
        :aria-expanded="isMenuOpen"
        aria-controls="portfolio-navigation"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
      </button>
    </header>

    <aside id="portfolio-navigation" class="rail" :class="{ isOpen: isMenuOpen }">
      <a href="#home" class="rail__brand" aria-label="Somber.Design home" @click="closeMenu">
        <img src="/assets/images/SomberDesignLogo.png" alt="Somber.Design logo" />
        <div>
          <strong>Somber.Design</strong>
          <span>Portfolio by Jacob</span>
        </div>
      </a>

      <nav class="rail__navigation" aria-label="Primary navigation">
        <a
          v-for="(item, index) in navigation"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ isActive: activeSection === item.id }"
          @click="closeMenu"
        >
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ item.label }}</strong>
        </a>
      </nav>

      <div class="rail__footer">
        <p>Portfolio.<br />Contact.<br />Playground.</p>
        <i aria-hidden="true"></i>
        <a href="mailto:hello@somber.design">hello@somber.design</a>
      </div>

      <img class="rail__watermark" src="/assets/images/SomberDesignLogo.png" alt="" aria-hidden="true" />
    </aside>

    <button
      v-if="isMenuOpen"
      class="navigationScrim"
      type="button"
      aria-label="Close navigation"
      @click="closeMenu"
    ></button>

    <div class="page">
      <main id="main-content">
        <section id="home" class="hero" data-section>
          <div class="hero__copy">
            <p class="eyebrow">Somber.Design / Jacob</p>
            <h1>Websites, frontend projects, and whatever I build next.</h1>
            <span class="shortRule" aria-hidden="true"></span>
            <p class="hero__intro">
              Somber.Design is my portfolio, contact point, and general playground for websites, small tools,
              experiments, and ongoing projects.
            </p>

            <div class="hero__actions">
              <a href="#projects" class="button button--dark">View projects <span>→</span></a>
              <a href="#contact" class="button">Contact me</a>
            </div>
          </div>

          <div class="hero__visual" aria-hidden="true">
            <div class="hero__forest"></div>
            <div class="hero__slab hero__slab--rear"></div>
            <div class="hero__slab hero__slab--front"></div>
            <span class="hero__monogram">SD</span>
            <p>Portfolio / 2026</p>
          </div>

          <div class="hero__facts">
            <div>
              <span>Profile</span>
              <p>Designer and frontend developer building personal, creator, and practical web projects.</p>
            </div>
            <div>
              <span>Based</span>
              <p>{{ profileData.location }}</p>
            </div>
            <div>
              <span>Available for</span>
              <p>Websites, redesigns, creator pages, and frontend cleanup.</p>
            </div>
          </div>
        </section>

        <section id="profile" class="profileSection" data-section>
          <div class="sectionShell profileSection__top">
            <header>
              <p class="eyebrow">About / Profile</p>
              <h2>A personal site for the work I finish and the things I am still figuring out.</h2>
            </header>

            <div class="profileSection__summary">
              <p>{{ profileData.summary }}</p>
              <strong>Built as a portfolio.<br />Used as a contact point.<br />Kept open as a playground.</strong>
            </div>
          </div>

          <div class="sectionShell capabilityGrid">
            <article v-for="(capability, index) in capabilities" :key="capability.title">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ capability.title }}</h3>
              <p>{{ capability.copy }}</p>
            </article>
          </div>
        </section>

        <section id="projects" class="projectsSection" data-section>
          <div class="sectionShell projectsSection__header">
            <header>
              <p class="eyebrow">Selected Work</p>
              <h2>Projects with different purposes, audiences, and visual systems.</h2>
            </header>

            <p>
              Client websites, creator pages, personal tools, and active prototypes. The common thread is practical
              structure and a finished frontend.
            </p>
          </div>

          <div class="sectionShell projectsSection__toolbar">
            <span>{{ projectsData.length }} projects listed</span>
            <a href="#contact">Discuss a project →</a>
          </div>

          <div class="sectionShell projectGrid">
            <article
              v-for="(project, index) in projectsData"
              :key="project.title"
              class="projectCard"
              :class="`projectCard--${(index % 3) + 1}`"
            >
              <div class="projectCard__visual">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <strong>{{ projectMark(project.title) }}</strong>
                <h3>{{ project.title }}</h3>
              </div>

              <div class="projectCard__body">
                <div class="projectCard__meta">
                  <span>{{ project.status }}</span>
                  <span>{{ project.category }}</span>
                </div>

                <p>{{ project.summary }}</p>

                <ul>
                  <li v-for="item in project.stack" :key="item">{{ item }}</li>
                </ul>

                <div class="projectCard__link">
                  <template v-for="link in project.links" :key="link.label">
                    <a v-if="link.href" :href="link.href" target="_blank" rel="noreferrer">
                      {{ link.label }} →
                    </a>
                    <span v-else>{{ link.label }} →</span>
                  </template>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="ai" class="aiSection" data-section>
          <div class="sectionShell aiSection__intro">
            <header>
              <p class="eyebrow">AI in My Workflow</p>
              <h2>Design. Development. Production.</h2>
            </header>

            <p>
              I use AI openly throughout the same workflow I use to build projects. It helps me explore more options,
              solve problems, reduce repetitive work, and move from an idea to a finished result faster.
            </p>
          </div>

          <div class="sectionShell workflowGrid">
            <article v-for="(stage, index) in aiWorkflow" :key="stage.title">
              <div>
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <i aria-hidden="true"></i>
              </div>
              <h3>{{ stage.title }}</h3>
              <p>{{ stage.copy }}</p>
            </article>
          </div>

          <div class="sectionShell aiSection__position">
            <div>
              <span>My position</span>
              <p>
                AI is a useful production tool, not something I hide. The direction, decisions, review, testing, and
                final responsibility remain mine.
              </p>
            </div>
          </div>
        </section>

        <section id="playground" class="playgroundSection" data-section>
          <div class="sectionShell playgroundSection__header">
            <header>
              <p class="eyebrow">Playground</p>
              <h2>Not everything here needs to be a finished product.</h2>
            </header>

            <p>
              This site also gives me room to test ideas, rebuild older work, and document projects that are still
              taking shape.
            </p>
          </div>

          <div class="sectionShell playgroundGrid">
            <article v-for="(item, index) in playgroundItems" :key="item.title">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.copy }}</p>
            </article>
          </div>

          <div class="playgroundSection__mark" aria-hidden="true">SD</div>
        </section>

        <section id="contact" class="contactSection" data-section>
          <div class="sectionShell contactSection__grid">
            <header>
              <p class="eyebrow">Contact</p>
              <h2>Have a project in mind?</h2>
              <p>Email is the best way to reach me about websites, redesigns, creator pages, or frontend work.</p>
            </header>

            <div class="contactSection__details">
              <p>{{ profileData.availability }}</p>
              <dl>
                <div v-for="link in profileData.contactLinks" :key="link.label">
                  <dt>{{ link.label }}</dt>
                  <dd><a :href="link.href" target="_blank" rel="noreferrer">{{ link.value }}</a></dd>
                </div>
              </dl>
            </div>

            <a class="contactCard" href="mailto:hello@somber.design">
              <span class="contactCard__icon" aria-hidden="true">◇</span>
              <small>Start a conversation</small>
              <strong>Tell me what you are building and where you need help.</strong>
              <span>Send an email →</span>
            </a>
          </div>
        </section>
      </main>

      <footer class="siteFooter">
        <p>somber.design</p>
        <i aria-hidden="true"></i>
        <p>Portfolio / Projects / Playground</p>
        <p>Built by Jacob</p>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.portfolio {
  min-height: 100vh;
  background: var(--color-bg-deep);
}

.page {
  min-width: 0;
  margin-left: 216px;
}

.sectionShell {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(0.8rem, 1.35vw, 1.35rem);
  width: min(1180px, calc(100% - clamp(2rem, 7vw, 7rem)));
  margin: 0 auto;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  width: fit-content;
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.eyebrow::after {
  content: '';
  width: 1.55rem;
  height: 1px;
  background: currentColor;
  opacity: 0.45;
}

.shortRule {
  display: block;
  width: 2.2rem;
  height: 1px;
  background: currentColor;
}

.mobileHeader {
  display: none;
}

.rail {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 90;
  display: flex;
  width: 216px;
  flex-direction: column;
  overflow: hidden;
  border-right: 1px solid rgba(205, 216, 223, 0.22);
  background:
    linear-gradient(180deg, rgba(13, 23, 32, 0.99), rgba(6, 13, 19, 0.995)),
    #071018;
  color: #eef2f4;
}

.rail__brand {
  display: grid;
  justify-items: center;
  gap: 0.8rem;
  padding: 2.5rem 1rem 2.2rem;
  text-align: center;
}

.rail__brand img {
  width: 68px;
  height: 68px;
  object-fit: contain;
  filter: grayscale(0.18) saturate(0.72) drop-shadow(0 0 1.5rem rgba(143, 165, 179, 0.18));
}

.rail__brand strong {
  display: block;
  font-family: var(--font-display);
  font-size: 0.94rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.rail__brand span {
  display: block;
  margin-top: 0.35rem;
  color: #7f8d98;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.rail__navigation {
  display: grid;
  gap: 0.15rem;
  padding: 0.6rem 1rem;
}

.rail__navigation a {
  position: relative;
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 0.55rem;
  align-items: center;
  min-height: 52px;
  padding: 0.55rem 0.7rem;
  color: #7f8d98;
  transition:
    color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.rail__navigation a::before {
  content: '';
  position: absolute;
  left: -1rem;
  width: 1.15rem;
  height: 1px;
  background: #a6bac7;
  opacity: 0;
  transform: scaleX(0.3);
  transform-origin: left;
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.rail__navigation a:hover,
.rail__navigation a:focus-visible,
.rail__navigation a.isActive {
  color: #eef2f4;
  background: rgba(166, 186, 199, 0.045);
}

.rail__navigation a:hover::before,
.rail__navigation a:focus-visible::before,
.rail__navigation a.isActive::before {
  opacity: 1;
  transform: scaleX(1);
}

.rail__navigation span,
.rail__navigation strong {
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.rail__navigation span {
  font-size: 0.55rem;
  letter-spacing: 0.14em;
}

.rail__navigation strong {
  font-size: 0.64rem;
  font-weight: 500;
  letter-spacing: 0.15em;
}

.rail__footer {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 1rem;
  margin-top: auto;
  padding: 1.5rem 1.5rem 2rem;
  color: #7f8d98;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.15em;
  line-height: 1.65;
  text-transform: uppercase;
}

.rail__footer i {
  width: 1.35rem;
  height: 1px;
  background: #a6bac7;
}

.rail__footer a {
  color: #b8c2c9;
  letter-spacing: 0.05em;
  text-transform: none;
}

.rail__watermark {
  position: absolute;
  left: -4rem;
  bottom: 3.5rem;
  width: 15rem;
  opacity: 0.05;
  filter: grayscale(1);
  pointer-events: none;
}

.navigationScrim {
  display: none;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  grid-template-rows: minmax(500px, auto) auto;
  min-height: 630px;
  border-bottom: 1px solid rgba(23, 33, 42, 0.17);
  background: #e8edef;
  color: #17212a;
}

.hero__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(4rem, 8vw, 7rem) clamp(2rem, 6vw, 6rem) 3rem;
}

.hero__copy h1 {
  max-width: 13ch;
  margin-top: 1.2rem;
  font-family: var(--font-display);
  font-size: clamp(3rem, 5.7vw, 5.8rem);
  font-weight: 600;
  letter-spacing: -0.06em;
  line-height: 0.94;
  text-wrap: balance;
}

.hero__copy .shortRule {
  margin-top: 1.5rem;
}

.hero__intro {
  max-width: 54ch;
  margin-top: 1.2rem;
  color: #4f5d67;
  font-size: clamp(0.94rem, 1.05vw, 1.05rem);
  line-height: 1.68;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.7rem;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 46px;
  padding: 0.65rem 1.25rem;
  border: 1px solid rgba(23, 33, 42, 0.35);
  color: #17212a;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition:
    transform var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.button:hover,
.button:focus-visible {
  transform: translateY(-2px);
  background: rgba(23, 33, 42, 0.07);
}

.button--dark {
  border-color: #111b24;
  background: #111b24;
  color: #f1f4f5;
}

.button--dark:hover,
.button--dark:focus-visible {
  background: #1c2a35;
}

.hero__visual {
  position: relative;
  overflow: hidden;
  min-height: 500px;
  border-left: 1px solid rgba(23, 33, 42, 0.16);
  background: #d7dee2;
}

.hero__forest {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(232, 237, 239, 0.14), rgba(16, 28, 38, 0.16)),
    url('/assets/images/graykrowForest.png') center 78% / cover no-repeat;
  filter: grayscale(0.78) saturate(0.4) brightness(1.18) contrast(0.78);
  opacity: 0.82;
}

.hero__visual::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(232, 237, 239, 0.22), transparent 32%),
    linear-gradient(180deg, transparent 58%, rgba(7, 16, 24, 0.32));
}

.hero__slab {
  position: absolute;
  z-index: 2;
  background: rgba(13, 24, 33, 0.76);
  box-shadow: 0 1.5rem 3rem rgba(4, 10, 15, 0.2);
}

.hero__slab--rear {
  top: 4rem;
  right: -2rem;
  width: 62%;
  height: 53%;
  clip-path: polygon(44% 0, 100% 38%, 100% 100%, 18% 100%);
}

.hero__slab--front {
  right: -2rem;
  bottom: 0;
  width: 88%;
  height: 31%;
  background: rgba(232, 237, 239, 0.78);
  clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%);
}

.hero__monogram {
  position: absolute;
  right: 1.2rem;
  bottom: -1.25rem;
  z-index: 3;
  color: rgba(238, 242, 244, 0.13);
  font-family: var(--font-display);
  font-size: clamp(8rem, 17vw, 16rem);
  font-weight: 700;
  letter-spacing: -0.12em;
  line-height: 1;
}

.hero__visual > p {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 4;
  color: rgba(23, 33, 42, 0.74);
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero__facts {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1.3fr 0.7fr 1fr;
  border-top: 1px solid rgba(23, 33, 42, 0.17);
  background: rgba(241, 244, 245, 0.76);
}

.hero__facts > div {
  min-height: 112px;
  padding: 1.15rem clamp(1.25rem, 3vw, 2.5rem);
  border-right: 1px solid rgba(23, 33, 42, 0.17);
}

.hero__facts > div:last-child {
  border-right: 0;
}

.hero__facts span {
  color: #677f90;
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.hero__facts p {
  margin-top: 0.45rem;
  color: #4f5d67;
  font-size: 0.78rem;
  line-height: 1.55;
}

.profileSection {
  border-bottom: 1px solid rgba(23, 33, 42, 0.17);
  background: #f1f4f5;
  color: #17212a;
}

.profileSection__top {
  align-items: start;
  padding-block: clamp(3rem, 5vw, 4.5rem) 2.5rem;
}

.profileSection__top header {
  grid-column: 1 / span 7;
}

.profileSection__top h2,
.projectsSection__header h2,
.aiSection__intro h2,
.playgroundSection__header h2,
.contactSection h2 {
  margin-top: 0.9rem;
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 3.9vw, 4rem);
  font-weight: 600;
  letter-spacing: -0.052em;
  line-height: 0.98;
  text-wrap: balance;
}

.profileSection__top h2 {
  max-width: 16ch;
}

.profileSection__summary {
  grid-column: 8 / -1;
  padding-left: 1.5rem;
  border-left: 1px solid rgba(23, 33, 42, 0.18);
}

.profileSection__summary > p {
  color: #4f5d67;
  font-size: 0.9rem;
  line-height: 1.7;
}

.profileSection__summary strong {
  display: block;
  margin-top: 1.25rem;
  color: #677f90;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  line-height: 1.7;
  text-transform: uppercase;
}

.capabilityGrid {
  padding-bottom: clamp(3rem, 5vw, 4.5rem);
}

.capabilityGrid article {
  grid-column: span 3;
  min-height: 180px;
  padding: 1.15rem;
  border-top: 1px solid rgba(23, 33, 42, 0.18);
  border-right: 1px solid rgba(23, 33, 42, 0.18);
}

.capabilityGrid article:last-child {
  border-right: 0;
}

.capabilityGrid span,
.workflowGrid span,
.playgroundGrid span {
  color: #677f90;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
}

.capabilityGrid h3,
.workflowGrid h3,
.playgroundGrid h3 {
  margin-top: 1.25rem;
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: -0.025em;
}

.capabilityGrid p,
.workflowGrid p,
.playgroundGrid p {
  margin-top: 0.55rem;
  font-size: 0.79rem;
  line-height: 1.58;
}

.capabilityGrid p {
  color: #4f5d67;
}

.projectsSection {
  padding-block: clamp(3rem, 5vw, 5rem);
  border-bottom: 1px solid rgba(205, 216, 223, 0.2);
  background: #0a1118;
  color: #eef2f4;
}

.projectsSection__header {
  align-items: end;
}

.projectsSection__header header {
  grid-column: 1 / span 8;
}

.projectsSection__header h2 {
  max-width: 16ch;
}

.projectsSection__header > p {
  grid-column: 9 / -1;
  color: #b8c2c9;
  font-size: 0.88rem;
  line-height: 1.68;
}

.projectsSection__toolbar {
  align-items: center;
  margin-top: 2rem;
  padding-block: 0.8rem;
  border-top: 1px solid rgba(205, 216, 223, 0.2);
  border-bottom: 1px solid rgba(205, 216, 223, 0.2);
  color: #7f8d98;
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.projectsSection__toolbar span {
  grid-column: 1 / span 6;
}

.projectsSection__toolbar a {
  grid-column: 7 / -1;
  justify-self: end;
  color: #a6bac7;
}

.projectGrid {
  margin-top: 1rem;
}

.projectCard {
  grid-column: span 4;
  display: grid;
  grid-template-rows: 170px 1fr;
  min-width: 0;
  border: 1px solid rgba(205, 216, 223, 0.2);
  background: rgba(12, 21, 29, 0.82);
  transition:
    transform var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    background var(--duration-base) var(--ease-out);
}

.projectCard:hover,
.projectCard:focus-within {
  transform: translateY(-4px);
  border-color: rgba(205, 216, 223, 0.38);
  background: #16232d;
}

.projectCard__visual {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-bottom: 1px solid rgba(205, 216, 223, 0.2);
  background:
    linear-gradient(145deg, rgba(166, 186, 199, 0.1), transparent 48%),
    radial-gradient(circle at 72% 18%, rgba(143, 165, 179, 0.2), transparent 30%),
    linear-gradient(135deg, #172530, #0b141c 72%);
}

.projectCard--2 .projectCard__visual {
  background:
    linear-gradient(145deg, rgba(197, 205, 211, 0.09), transparent 48%),
    radial-gradient(circle at 72% 18%, rgba(126, 143, 156, 0.18), transparent 30%),
    linear-gradient(135deg, #202830, #10171d 72%);
}

.projectCard--3 .projectCard__visual {
  background:
    linear-gradient(145deg, rgba(155, 175, 188, 0.1), transparent 48%),
    radial-gradient(circle at 72% 18%, rgba(104, 129, 145, 0.22), transparent 30%),
    linear-gradient(135deg, #13212b, #081117 72%);
}

.projectCard__visual::before,
.projectCard__visual::after {
  content: '';
  position: absolute;
  border: 1px solid rgba(205, 216, 223, 0.13);
  transform: rotate(45deg);
}

.projectCard__visual::before {
  right: -4rem;
  bottom: -4.5rem;
  width: 9rem;
  height: 9rem;
}

.projectCard__visual::after {
  top: -2.2rem;
  left: -2.5rem;
  width: 4.2rem;
  height: 4.2rem;
}

.projectCard__visual > span {
  position: absolute;
  top: 0.75rem;
  left: 0.8rem;
  color: #7f8d98;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.14em;
}

.projectCard__visual > strong {
  color: rgba(238, 242, 244, 0.1);
  font-family: var(--font-display);
  font-size: clamp(4rem, 7vw, 6.2rem);
  letter-spacing: -0.08em;
}

.projectCard__visual h3 {
  position: absolute;
  right: 0.85rem;
  bottom: 0.75rem;
  left: 0.85rem;
  font-family: var(--font-display);
  font-size: 1.35rem;
  letter-spacing: -0.04em;
}

.projectCard__body {
  display: flex;
  min-height: 255px;
  flex-direction: column;
  padding: 1rem;
}

.projectCard__meta {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.projectCard__meta span {
  font-family: var(--font-mono);
  font-size: 0.53rem;
  letter-spacing: 0.1em;
  line-height: 1.45;
  text-transform: uppercase;
}

.projectCard__meta span:first-child {
  color: #a6bac7;
}

.projectCard__meta span:last-child {
  color: #7f8d98;
  text-align: right;
}

.projectCard__body > p {
  margin-top: 0.75rem;
  color: #b8c2c9;
  font-size: 0.8rem;
  line-height: 1.58;
}

.projectCard__body ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.9rem;
}

.projectCard__body li {
  padding: 0.25rem 0.4rem;
  border: 1px solid rgba(205, 216, 223, 0.13);
  color: #7f8d98;
  font-family: var(--font-mono);
  font-size: 0.49rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.projectCard__link {
  margin-top: auto;
  padding-top: 1rem;
  color: #a6bac7;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.aiSection {
  padding-block: clamp(3rem, 5vw, 5rem);
  border-bottom: 1px solid rgba(23, 33, 42, 0.17);
  background: #e8edef;
  color: #17212a;
}

.aiSection__intro {
  align-items: end;
}

.aiSection__intro header {
  grid-column: 1 / span 7;
}

.aiSection__intro h2 {
  max-width: 15ch;
}

.aiSection__intro > p {
  grid-column: 8 / -1;
  color: #4f5d67;
  font-size: 0.9rem;
  line-height: 1.7;
}

.workflowGrid {
  margin-top: 2.25rem;
  border-top: 1px solid rgba(23, 33, 42, 0.18);
  border-bottom: 1px solid rgba(23, 33, 42, 0.18);
}

.workflowGrid article {
  grid-column: span 4;
  min-height: 205px;
  padding: 1.2rem;
  border-right: 1px solid rgba(23, 33, 42, 0.18);
}

.workflowGrid article:last-child {
  border-right: 0;
}

.workflowGrid article > div {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.workflowGrid article i {
  width: 100%;
  height: 1px;
  background: rgba(23, 33, 42, 0.25);
}

.workflowGrid p {
  color: #4f5d67;
}

.aiSection__position {
  margin-top: 1.5rem;
}

.aiSection__position > div {
  grid-column: 8 / -1;
  padding: 1.2rem;
  background: #111b24;
  color: #eef2f4;
}

.aiSection__position span {
  color: #a6bac7;
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.aiSection__position p {
  margin-top: 0.75rem;
  color: #b8c2c9;
  font-size: 0.84rem;
  line-height: 1.62;
}

.playgroundSection {
  position: relative;
  overflow: hidden;
  padding-block: clamp(3rem, 5vw, 5rem);
  border-bottom: 1px solid rgba(205, 216, 223, 0.2);
  background: #111b24;
  color: #eef2f4;
}

.playgroundSection__header {
  align-items: end;
}

.playgroundSection__header header {
  grid-column: 1 / span 7;
}

.playgroundSection__header h2 {
  max-width: 17ch;
}

.playgroundSection__header > p {
  grid-column: 8 / -1;
  color: #b8c2c9;
  font-size: 0.9rem;
  line-height: 1.68;
}

.playgroundGrid {
  margin-top: 2.25rem;
  border-top: 1px solid rgba(205, 216, 223, 0.2);
}

.playgroundGrid article {
  grid-column: span 3;
  min-height: 180px;
  padding: 1.15rem;
  border-right: 1px solid rgba(205, 216, 223, 0.2);
}

.playgroundGrid article:last-child {
  border-right: 0;
}

.playgroundGrid p {
  color: #b8c2c9;
}

.playgroundSection__mark {
  position: absolute;
  right: -1.25rem;
  bottom: -4rem;
  color: rgba(238, 242, 244, 0.035);
  font-family: var(--font-display);
  font-size: clamp(10rem, 20vw, 20rem);
  font-weight: 700;
  letter-spacing: -0.12em;
  line-height: 1;
  pointer-events: none;
}

.contactSection {
  padding-block: clamp(3rem, 5vw, 5rem);
  background: #f1f4f5;
  color: #17212a;
}

.contactSection__grid {
  align-items: stretch;
}

.contactSection header {
  grid-column: 1 / span 4;
}

.contactSection h2 {
  max-width: 12ch;
}

.contactSection header > p:last-child {
  margin-top: 1rem;
  color: #4f5d67;
  font-size: 0.88rem;
  line-height: 1.68;
}

.contactSection__details {
  grid-column: 5 / span 3;
  padding-left: 1.35rem;
  border-left: 1px solid rgba(23, 33, 42, 0.18);
}

.contactSection__details > p {
  color: #4f5d67;
  font-size: 0.84rem;
  line-height: 1.62;
}

.contactSection__details dl {
  margin-top: 1.2rem;
}

.contactSection__details dl > div {
  padding: 0.75rem 0;
  border-top: 1px solid rgba(23, 33, 42, 0.18);
}

.contactSection__details dt {
  color: #677f90;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.contactSection__details dd {
  margin-top: 0.3rem;
  font-size: 0.82rem;
}

.contactCard {
  grid-column: 8 / -1;
  display: grid;
  align-content: start;
  min-height: 220px;
  padding: 1.3rem;
  background: #111b24;
  color: #eef2f4;
  transition:
    transform var(--duration-base) var(--ease-out),
    background var(--duration-base) var(--ease-out);
}

.contactCard:hover,
.contactCard:focus-visible {
  transform: translateY(-3px);
  background: #1b2934;
}

.contactCard__icon {
  color: #a6bac7;
  font-size: 1.9rem;
}

.contactCard small,
.contactCard > span:last-child {
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.contactCard small {
  margin-top: 1rem;
  color: #a6bac7;
}

.contactCard strong {
  max-width: 28ch;
  margin-top: 0.65rem;
  font-size: 0.94rem;
  font-weight: 500;
  line-height: 1.55;
}

.contactCard > span:last-child {
  margin-top: auto;
  padding-top: 1.5rem;
  color: #b8c2c9;
}

.siteFooter {
  display: grid;
  grid-template-columns: auto minmax(3rem, 1fr) auto auto;
  gap: 1.25rem;
  align-items: center;
  min-height: 58px;
  padding-inline: clamp(1rem, 4vw, 3rem);
  background: #071018;
  color: #7f8d98;
  font-family: var(--font-mono);
  font-size: 0.54rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.siteFooter i {
  height: 1px;
  background: rgba(205, 216, 223, 0.2);
}

.siteFooter p:last-child {
  color: #b8c2c9;
}

@media (max-width: 1120px) {
  .hero {
    grid-template-columns: minmax(0, 1fr) minmax(300px, 0.8fr);
  }

  .projectCard {
    grid-column: span 6;
  }

  .capabilityGrid article,
  .playgroundGrid article {
    grid-column: span 6;
    border-bottom: 1px solid rgba(23, 33, 42, 0.18);
  }

  .playgroundGrid article {
    border-bottom-color: rgba(205, 216, 223, 0.2);
  }
}

@media (max-width: 920px) {
  .page {
    margin-left: 0;
    padding-top: 64px;
  }

  .mobileHeader {
    position: fixed;
    inset: 0 0 auto;
    z-index: 110;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 0.75rem 0 1rem;
    border-bottom: 1px solid rgba(205, 216, 223, 0.2);
    background: rgba(7, 16, 24, 0.96);
    color: #eef2f4;
    backdrop-filter: blur(16px);
  }

  .mobileHeader__brand {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    font-family: var(--font-display);
    font-size: 0.92rem;
    font-weight: 600;
  }

  .mobileHeader__brand img {
    width: 34px;
    height: 34px;
    object-fit: contain;
  }

  .mobileHeader__toggle {
    position: relative;
    width: 48px;
    height: 48px;
    border: 0;
    background: transparent;
    color: currentColor;
    cursor: pointer;
  }

  .mobileHeader__toggle span {
    position: absolute;
    left: 14px;
    width: 20px;
    height: 1px;
    background: currentColor;
  }

  .mobileHeader__toggle span:first-child {
    top: 20px;
  }

  .mobileHeader__toggle span:last-child {
    top: 27px;
  }

  .rail {
    top: 64px;
    width: min(22rem, 88vw);
    opacity: 0;
    pointer-events: none;
    transform: translateX(-102%);
    transition:
      opacity var(--duration-base) var(--ease-out),
      transform var(--duration-base) var(--ease-out);
  }

  .rail.isOpen {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
  }

  .rail__brand {
    grid-template-columns: auto 1fr;
    align-items: center;
    justify-items: start;
    padding: 1.4rem;
    text-align: left;
  }

  .rail__brand img {
    width: 48px;
    height: 48px;
  }

  .navigationScrim {
    position: fixed;
    inset: 64px 0 0;
    z-index: 80;
    display: block;
    border: 0;
    background: rgba(3, 7, 10, 0.54);
  }

  .hero {
    grid-template-columns: 1fr;
    grid-template-rows: auto 360px auto;
  }

  .hero__copy {
    padding: 4rem clamp(1.25rem, 6vw, 3rem) 3rem;
  }

  .hero__visual {
    min-height: 360px;
    border-top: 1px solid rgba(23, 33, 42, 0.16);
    border-left: 0;
  }

  .hero__facts {
    grid-template-columns: 1fr 1fr;
  }

  .hero__facts > div:first-child {
    grid-column: 1 / -1;
    border-right: 0;
    border-bottom: 1px solid rgba(23, 33, 42, 0.17);
  }

  .profileSection__top header,
  .profileSection__summary,
  .projectsSection__header header,
  .projectsSection__header > p,
  .aiSection__intro header,
  .aiSection__intro > p,
  .playgroundSection__header header,
  .playgroundSection__header > p,
  .contactSection header,
  .contactSection__details,
  .contactCard {
    grid-column: 1 / -1;
  }

  .profileSection__summary,
  .contactSection__details {
    margin-top: 1rem;
    padding: 1.25rem 0 0;
    border-top: 1px solid rgba(23, 33, 42, 0.18);
    border-left: 0;
  }

  .projectsSection__header > p,
  .aiSection__intro > p,
  .playgroundSection__header > p {
    margin-top: 1rem;
  }

  .aiSection__position > div {
    grid-column: 1 / -1;
  }

  .contactCard {
    margin-top: 1rem;
  }
}

@media (max-width: 700px) {
  .sectionShell {
    width: min(100% - 1.5rem, 1180px);
  }

  .hero__copy h1 {
    font-size: clamp(2.45rem, 12vw, 3.7rem);
  }

  .hero__facts {
    grid-template-columns: 1fr;
  }

  .hero__facts > div,
  .hero__facts > div:first-child {
    grid-column: auto;
    border-right: 0;
    border-bottom: 1px solid rgba(23, 33, 42, 0.17);
  }

  .hero__facts > div:last-child {
    border-bottom: 0;
  }

  .button {
    width: 100%;
  }

  .capabilityGrid article,
  .projectCard,
  .workflowGrid article,
  .playgroundGrid article {
    grid-column: 1 / -1;
    border-right: 0;
  }

  .workflowGrid article {
    min-height: 0;
    border-bottom: 1px solid rgba(23, 33, 42, 0.18);
  }

  .workflowGrid article:last-child {
    border-bottom: 0;
  }

  .projectsSection__toolbar span,
  .projectsSection__toolbar a {
    grid-column: 1 / -1;
    justify-self: start;
  }

  .projectsSection__toolbar a {
    margin-top: 0.5rem;
  }

  .siteFooter {
    grid-template-columns: 1fr;
    gap: 0.4rem;
    padding-block: 1rem;
  }

  .siteFooter i {
    display: none;
  }
}
</style>
