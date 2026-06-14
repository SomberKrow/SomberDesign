<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { profileData } from './data/inProfileData'
import { projectsData } from './data/inProjectsData'
import inSnowLayer from './components/inSnowLayer.vue'

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const activeSection = ref('home')
const isReady = ref(false)
let revealObserver
let scrollFrame
let syncingRouteFromScroll = false

const navigation = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'work', label: 'Work', path: '/work' },
  { id: 'ai', label: 'AI Use', path: '/ai' },
  { id: 'playground', label: 'Playground', path: '/playground' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]

const pathBySection = Object.fromEntries(navigation.map(item => [item.id, item.path]))

const services = [
  { label: 'Design', copy: 'Structure, direction, and responsive systems.' },
  { label: 'Frontend', copy: 'Vue, SCSS, components, and implementation.' },
  { label: 'Creator Sites', copy: 'Focused homes for people and their work.' },
  { label: 'Redesigns', copy: 'Cleaner systems for sites that already exist.' },
]

const aiStages = [
  { label: 'Design', copy: 'Explore, compare, refine.' },
  { label: 'Development', copy: 'Plan, build, debug.' },
  { label: 'Production', copy: 'Review, polish, release.' },
]

const playgroundItems = [
  { type: 'Study', label: 'Interfaces', copy: 'Navigation, layout, and motion.' },
  { type: 'Utility', label: 'Tools', copy: 'Small software with a clear job.' },
  { type: 'Rebuild', label: 'Revisions', copy: 'Older work, rebuilt properly.' },
  { type: 'Prototype', label: 'Concepts', copy: 'Ideas tested before they grow.' },
]

const featuredProject = computed(
  () => projectsData.find(project => project.title === 'NorWinter') ?? projectsData[0],
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

const scrollToSection = (sectionId, behavior = 'smooth') => {
  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior })
    return
  }

  document.getElementById(sectionId)?.scrollIntoView({
    behavior,
    block: 'start',
  })
}

const updateActiveSection = () => {
  const sections = navigation
    .map(item => document.getElementById(item.id))
    .filter(Boolean)

  if (!sections.length) return

  const marker = Math.min(window.innerHeight * 0.38, 340)
  const atPageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8
  let nextSection = sections[0].id

  if (atPageBottom) {
    nextSection = 'contact'
  } else {
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= marker) {
        nextSection = section.id
      }
    })
  }

  activeSection.value = nextSection

  const nextPath = pathBySection[nextSection]
  if (!nextPath || route.path === nextPath || syncingRouteFromScroll) return

  syncingRouteFromScroll = true
  router.replace(nextPath).finally(() => {
    syncingRouteFromScroll = false
  })
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
      threshold: 0.1,
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

watch(
  () => route.path,
  () => {
    if (syncingRouteFromScroll) return
    const sectionId = route.meta?.sectionId ?? 'home'
    activeSection.value = sectionId
    window.requestAnimationFrame(() => scrollToSection(sectionId))
  },
)

onMounted(async () => {
  await nextTick()
  setupRevealObserver()
  const initialSection = route.meta?.sectionId ?? 'home'
  activeSection.value = initialSection
  scrollToSection(initialSection, 'auto')
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
      <RouterLink class="mobileBar__brand" to="/" aria-label="Somber.Design home" @click="closeMenu">
        <img src="/assets/images/SomberDesignLogo.png" alt="" aria-hidden="true" />
        <span>Somber.Design</span>
      </RouterLink>

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
      <RouterLink class="sideRail__brand" to="/" aria-label="Somber.Design home" @click="closeMenu">
        <img src="/assets/images/SomberDesignLogo.png" alt="Somber.Design logo" />
        <div>
          <strong>Somber.Design</strong>
          <span>Portfolio by Jacob</span>
        </div>
      </RouterLink>

      <nav class="sideRail__nav" aria-label="Primary navigation">
        <RouterLink
          v-for="(item, index) in navigation"
          :key="item.id"
          :to="item.path"
          :class="{ 'is-active': activeSection === item.id }"
          @click="closeMenu"
        >
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ item.label }}</strong>
          <i aria-hidden="true"></i>
        </RouterLink>
      </nav>

      <div class="sideRail__footer">
        <p>Design<br />Development<br />Production</p>
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
          <div class="hero__frame" aria-hidden="true">
            <span>Portfolio / 2026</span>
            <span>Winter Gray System</span>
            <span>Somber.Design</span>
          </div>
          <p class="hero__wordmark" aria-hidden="true">SOMBER</p>

          <div class="hero__layout">
            <div class="hero__panel" data-reveal>
              <p class="sectionLabel">Somber.Design / Jacob</p>
              <h1>{{ profileData.headline }}</h1>
              <span class="shortLine" aria-hidden="true"></span>
              <p class="hero__intro">{{ profileData.intro }}</p>

              <div class="hero__actions">
                <RouterLink class="action action--solid" to="/work">View work <span>→</span></RouterLink>
                <RouterLink class="action" to="/contact">Contact</RouterLink>
              </div>
            </div>

            <aside class="hero__index" data-reveal>
              <p>Current focus</p>
              <strong>Focused websites with a clear identity.</strong>
              <dl>
                <div>
                  <dt>Stack</dt>
                  <dd>Vue / Vite / SCSS</dd>
                </div>
                <div>
                  <dt>Based</dt>
                  <dd>{{ profileData.location }}</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div class="hero__status">
            <div><span>01</span><p>Portfolio</p></div>
            <div><span>02</span><p>Contact</p></div>
            <div><span>03</span><p>Playground</p></div>
            <p>{{ profileData.availability }}</p>
          </div>
        </section>

        <section id="about" class="about section section--light" data-section>
          <div class="sectionFrame about__intro" data-reveal>
            <header class="sectionHeading">
              <p class="sectionLabel">About</p>
              <h2>Clear structure. Strong identity. Finished work.</h2>
            </header>

            <div class="about__copy">
              <p>{{ profileData.summary }}</p>
              <strong>Personal sites, creator work, and practical tools.</strong>
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
              <p class="sectionLabel">Featured Work</p>
              <h2>NorWinter.</h2>
            </header>
            <p>A curated home for creator websites and services.</p>
          </div>

          <article class="sectionFrame norwinterShowcase" data-reveal>
            <div class="norwinterShowcase__stage">
              <div class="nwWindow">
                <aside class="nwWindow__rail">
                  <div class="nwWindow__mark">NW</div>
                  <nav aria-label="NorWinter preview navigation">
                    <span>01</span><strong>Home</strong>
                    <span>02</span><strong>Projects</strong>
                    <span>03</span><strong>Services</strong>
                    <span>04</span><strong>Contact</strong>
                  </nav>
                  <small>Curated creator space</small>
                </aside>

                <div class="nwWindow__page">
                  <div class="nwWindow__landscape" aria-hidden="true">
                    <i></i><i></i><i></i>
                  </div>
                  <p>NorWinter / Creator Platform</p>
                  <h3>A home for creator websites.</h3>
                  <span>Invite-only · Focused support · Built by Somber.Design</span>
                  <div class="nwWindow__action">Explore the space <b>→</b></div>
                </div>
              </div>
            </div>

            <div class="norwinterShowcase__details">
              <div class="featureMeta">
                <span>{{ featuredProject.status }}</span>
                <span>{{ featuredProject.category }}</span>
              </div>
              <p class="sectionLabel">Case Study / 01</p>
              <h3>{{ featuredProject.title }}</h3>
              <p>{{ featuredProject.summary }}</p>
              <ul>
                <li v-for="highlight in featuredProject.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
              <div class="featureStack">
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
              <p class="sectionLabel">AI Use</p>
              <h2>Design. Development. Production.</h2>
            </header>
            <p>Used openly. Directed, reviewed, and owned by me.</p>
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
            <p>Direction, decisions, testing, and final responsibility remain mine.</p>
          </div>
        </section>

        <section id="playground" class="playground section section--dark" data-section>
          <div class="sectionFrame sectionLead" data-reveal>
            <header class="sectionHeading">
              <p class="sectionLabel">Playground</p>
              <h2>Ideas in progress.</h2>
            </header>
            <p>Small tests, useful tools, and work worth revisiting.</p>
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
          <p class="contact__wordmark" aria-hidden="true">CONTACT</p>

          <div class="contact__layout">
            <header data-reveal>
              <p class="sectionLabel">Contact</p>
              <h2>Let’s build something.</h2>
              <p>Websites, redesigns, creator pages, and frontend work.</p>
            </header>

            <div class="contact__panel" data-reveal>
              <span>Available</span>
              <strong>{{ profileData.availability }}</strong>

              <dl>
                <div v-for="link in profileData.contactLinks" :key="link.label">
                  <dt>{{ link.label }}</dt>
                  <dd>
                    <a
                      :href="link.href"
                      :target="link.href.startsWith('http') ? '_blank' : undefined"
                      :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
                    >{{ link.value }}</a>
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
        <p>Design / Development / Production</p>
        <p>Built by Jacob</p>
      </footer>
    </div>
  </div>
</template>
