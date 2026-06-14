<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { profileData } from './data/inProfileData'
import { projectsData } from './data/inProjectsData'
import inSnowLayer from './components/inSnowLayer.vue'

const isMenuOpen = ref(false)
const activeSection = ref('home')
const isReady = ref(false)
let revealObserver
let scrollFrame

const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'ai', label: 'AI Use' },
  { id: 'playground', label: 'Playground' },
  { id: 'contact', label: 'Contact' },
]

const services = [
  {
    label: 'Web Design',
    copy: 'Structure, layout, visual direction, responsive systems, and practical interface decisions.',
  },
  {
    label: 'Frontend',
    copy: 'Vue 3, Vite, SCSS, component architecture, responsive behavior, and implementation.',
  },
  {
    label: 'Creator Sites',
    copy: 'Personal websites, link homes, portfolio pages, and project-specific identities.',
  },
  {
    label: 'Redesigns',
    copy: 'Reworking existing sites to improve clarity, consistency, performance, and mobile use.',
  },
]

const aiStages = [
  {
    label: 'Design',
    copy: 'Concept exploration, layout comparison, copy iteration, asset planning, and visual review.',
  },
  {
    label: 'Development',
    copy: 'Planning, implementation support, debugging, code review, documentation, and research.',
  },
  {
    label: 'Production',
    copy: 'Content passes, repetitive cleanup, QA checklists, iteration, and release preparation.',
  },
]

const playgroundItems = [
  {
    type: 'Study',
    label: 'Interface systems',
    copy: 'Navigation patterns, layout structures, animation tests, and smaller visual experiments.',
  },
  {
    type: 'Utility',
    label: 'Focused tools',
    copy: 'Local applications and small utilities built around a specific practical need.',
  },
  {
    type: 'Rebuild',
    label: 'Older projects',
    copy: 'Existing work revisited with cleaner structure, stronger responsive behavior, and better polish.',
  },
  {
    type: 'Prototype',
    label: 'Early concepts',
    copy: 'Ideas tested at a useful scale before they become complete products or public projects.',
  },
]

const featuredProject = computed(
  () => projectsData.find(project => project.title === 'Sit With Emily') ?? projectsData[0],
)

const projectIndex = computed(() =>
  projectsData.filter(project => project.title !== featuredProject.value.title),
)

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const updateActiveSection = () => {
  const sections = navigation
    .map(item => document.getElementById(item.id))
    .filter(Boolean)

  if (!sections.length) return

  const viewportMarker = Math.min(window.innerHeight * 0.38, 340)
  const atPageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8
  let nextActive = sections[0].id

  if (atPageBottom) {
    nextActive = 'contact'
  } else {
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= viewportMarker) {
        nextActive = section.id
      }
    })
  }

  activeSection.value = nextActive
}

const requestSectionUpdate = () => {
  if (scrollFrame) return

  scrollFrame = window.requestAnimationFrame(() => {
    updateActiveSection()
    scrollFrame = undefined
  })
}

const setupRevealObserver = () => {
  revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      })
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  document.querySelectorAll('[data-reveal]').forEach(element => revealObserver.observe(element))
}

const handleResize = () => {
  if (window.innerWidth > 920) closeMenu()
  requestSectionUpdate()
}

const handleKeydown = event => {
  if (event.key === 'Escape') closeMenu()
}

watch(isMenuOpen, open => {
  document.body.classList.toggle('nav-open', open)
})

onMounted(async () => {
  await nextTick()
  setupRevealObserver()
  updateActiveSection()
  window.addEventListener('scroll', requestSectionUpdate, { passive: true })
  window.addEventListener('resize', handleResize)
  window.addEventListener('keydown', handleKeydown)
  window.requestAnimationFrame(() => {
    isReady.value = true
  })
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
  document.body.classList.remove('nav-open')
  window.removeEventListener('scroll', requestSectionUpdate)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="site" :class="{ 'is-ready': isReady }">
    <a class="skipLink" href="#main-content">Skip to content</a>
    <inSnowLayer />

    <header class="mobileBar">
      <a class="mobileBar__brand" href="#home" aria-label="Somber.Design home" @click="closeMenu">
        <img src="/assets/images/SomberDesignLogo.png" alt="" aria-hidden="true" />
        <span>Somber.Design</span>
      </a>

      <button
        class="mobileBar__toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-controls="site-rail"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
      </button>
    </header>

    <aside id="site-rail" class="sideRail" :class="{ 'is-open': isMenuOpen }">
      <a class="sideRail__brand" href="#home" aria-label="Somber.Design home" @click="closeMenu">
        <img src="/assets/images/SomberDesignLogo.png" alt="Somber.Design logo" />
        <div>
          <strong>Somber.Design</strong>
          <span>Portfolio by Jacob</span>
        </div>
      </a>

      <nav class="sideRail__nav" aria-label="Primary navigation">
        <a
          v-for="(item, index) in navigation"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ 'is-active': activeSection === item.id }"
          @click="closeMenu"
        >
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ item.label }}</strong>
          <i aria-hidden="true"></i>
        </a>
      </nav>

      <div class="sideRail__footer">
        <p>Portfolio<br />Contact<br />Playground</p>
        <span aria-hidden="true"></span>
        <a href="mailto:hello@somber.design">hello@somber.design</a>
      </div>

      <img class="sideRail__watermark" src="/assets/images/SomberDesignLogo.png" alt="" aria-hidden="true" />
    </aside>

    <button
      v-if="isMenuOpen"
      class="navScrim"
      type="button"
      aria-label="Close navigation"
      @click="closeMenu"
    ></button>

    <div class="site__page">
      <main id="main-content">
        <section id="home" class="hero" data-section>
          <div class="hero__forest" aria-hidden="true"></div>
          <div class="hero__mist hero__mist--one" aria-hidden="true"></div>
          <div class="hero__mist hero__mist--two" aria-hidden="true"></div>
          <div class="hero__grain" aria-hidden="true"></div>

          <div class="hero__layout">
            <div class="hero__panel" data-reveal>
              <p class="sectionLabel">Somber.Design / Jacob</p>
              <h1>Websites, frontend projects, and whatever I build next.</h1>
              <span class="shortLine" aria-hidden="true"></span>
              <p class="hero__intro">
                My portfolio, contact point, and development playground for websites, tools, experiments, and ongoing work.
              </p>

              <div class="hero__actions">
                <a class="action action--solid" href="#work">View the work <span>→</span></a>
                <a class="action" href="#contact">Contact me</a>
              </div>
            </div>

            <aside class="hero__index" data-reveal>
              <p>Current focus</p>
              <strong>Frontend design and practical web systems.</strong>
              <dl>
                <div>
                  <dt>Stack</dt>
                  <dd>Vue 3 / Vite / SCSS</dd>
                </div>
                <div>
                  <dt>Based</dt>
                  <dd>{{ profileData.location }}</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div class="hero__status">
            <div>
              <span>01</span>
              <p>Portfolio</p>
            </div>
            <div>
              <span>02</span>
              <p>Contact</p>
            </div>
            <div>
              <span>03</span>
              <p>Playground</p>
            </div>
            <p>{{ profileData.availability }}</p>
          </div>
        </section>

        <section id="about" class="about section section--light" data-section>
          <div class="sectionFrame about__intro" data-reveal>
            <header class="sectionHeading">
              <p class="sectionLabel">About</p>
              <h2>Design and development with structure, restraint, and a finished result.</h2>
            </header>

            <div class="about__copy">
              <p>{{ profileData.summary }}</p>
              <strong>Personal work, creator sites, client projects, and practical tools.</strong>
            </div>
          </div>

          <div class="sectionFrame serviceGrid" data-reveal>
            <article v-for="(service, index) in services" :key="service.label">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ service.label }}</h3>
              <p>{{ service.copy }}</p>
            </article>
          </div>
        </section>

        <section id="work" class="work section section--dark" data-section>
          <div class="sectionFrame sectionLead" data-reveal>
            <header class="sectionHeading">
              <p class="sectionLabel">Selected Work</p>
              <h2>Different projects. Different identities. The same attention to the frontend.</h2>
            </header>

            <p>
              Client websites, creator pages, personal tools, and active prototypes built around the actual needs of each project.
            </p>
          </div>

          <article class="sectionFrame featureProject" data-reveal>
            <div class="featureProject__visual">
              <div class="featureProject__forest" aria-hidden="true"></div>
              <span>Featured project</span>
              <strong>{{ featuredProject.title }}</strong>
            </div>

            <div class="featureProject__content">
              <div class="featureProject__meta">
                <span>{{ featuredProject.status }}</span>
                <span>{{ featuredProject.category }}</span>
              </div>
              <h3>{{ featuredProject.title }}</h3>
              <p>{{ featuredProject.summary }}</p>

              <ul>
                <li v-for="highlight in featuredProject.highlights" :key="highlight">{{ highlight }}</li>
              </ul>

              <div class="featureProject__stack">
                <span v-for="item in featuredProject.stack" :key="item">{{ item }}</span>
              </div>
            </div>
          </article>

          <div class="sectionFrame projectIndex" data-reveal>
            <article v-for="(project, index) in projectIndex" :key="project.title">
              <span class="projectIndex__number">{{ String(index + 2).padStart(2, '0') }}</span>
              <div>
                <h3>{{ project.title }}</h3>
                <p>{{ project.category }}</p>
              </div>
              <p class="projectIndex__summary">{{ project.summary }}</p>
              <span class="projectIndex__status">{{ project.status }}</span>
            </article>
          </div>
        </section>

        <section id="ai" class="ai section section--light" data-section>
          <div class="sectionFrame sectionLead" data-reveal>
            <header class="sectionHeading">
              <p class="sectionLabel">AI in My Workflow</p>
              <h2>Design. Development. Production.</h2>
            </header>

            <p>
              I use AI openly throughout the same workflow I use to build projects. It helps me explore options, solve problems, reduce repetitive work, and reach a finished result faster.
            </p>
          </div>

          <div class="sectionFrame process" data-reveal>
            <article v-for="(stage, index) in aiStages" :key="stage.label">
              <div class="process__top">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <i aria-hidden="true"></i>
              </div>
              <h3>{{ stage.label }}</h3>
              <p>{{ stage.copy }}</p>
            </article>
          </div>

          <div class="sectionFrame ownership" data-reveal>
            <span>Responsibility</span>
            <p>
              AI is a production tool, not something I hide. The direction, decisions, review, testing, and final responsibility remain mine.
            </p>
          </div>
        </section>

        <section id="playground" class="playground section section--dark" data-section>
          <div class="sectionFrame sectionLead" data-reveal>
            <header class="sectionHeading">
              <p class="sectionLabel">Playground</p>
              <h2>A working area for experiments, rebuilds, and ideas in progress.</h2>
            </header>

            <p>
              Not every useful project needs to begin as a finished product. This is where smaller ideas are tested and documented.
            </p>
          </div>

          <div class="sectionFrame labIndex" data-reveal>
            <article v-for="(item, index) in playgroundItems" :key="item.label">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <p>{{ item.type }}</p>
              <h3>{{ item.label }}</h3>
              <p>{{ item.copy }}</p>
            </article>
          </div>
        </section>

        <section id="contact" class="contact" data-section>
          <div class="contact__forest" aria-hidden="true"></div>
          <div class="contact__shade" aria-hidden="true"></div>

          <div class="contact__layout">
            <header data-reveal>
              <p class="sectionLabel">Contact</p>
              <h2>Have a project in mind?</h2>
              <p>Email is the best way to reach me about websites, redesigns, creator pages, or frontend work.</p>
            </header>

            <div class="contact__panel" data-reveal>
              <span>Available for focused work</span>
              <strong>{{ profileData.availability }}</strong>

              <dl>
                <div v-for="link in profileData.contactLinks" :key="link.label">
                  <dt>{{ link.label }}</dt>
                  <dd>
                    <a
                      :href="link.href"
                      :target="link.href.startsWith('http') ? '_blank' : undefined"
                      :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
                    >
                      {{ link.value }}
                    </a>
                  </dd>
                </div>
              </dl>

              <a class="contact__cta" href="mailto:hello@somber.design">Start a conversation <span>→</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer class="footer">
        <p>somber.design</p>
        <span aria-hidden="true"></span>
        <p>Portfolio / Contact / Playground</p>
        <p>Built by Jacob</p>
      </footer>
    </div>
  </div>
</template>
