import { createApp } from 'vue'
import App from './EditorialPortfolio.vue'
import './assets/styles/main.scss'
import './assets/styles/editorial-polish.scss'

createApp(App).mount('#app')

const trackedSectionIds = ['home', 'profile', 'projects', 'ai', 'playground', 'contact']

const updateActiveNavigation = () => {
  const navigationLinks = [...document.querySelectorAll('.rail__navigation a[href^="#"]')]
  const sections = trackedSectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean)

  if (!navigationLinks.length || !sections.length) return

  const documentBottom = window.scrollY + window.innerHeight
  const bottomThreshold = document.documentElement.scrollHeight - 8
  const marker = Math.min(window.innerHeight * 0.38, 340)

  let activeId = sections[0].id

  if (documentBottom >= bottomThreshold) {
    activeId = 'contact'
  } else {
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) {
        activeId = section.id
      }
    }
  }

  navigationLinks.forEach(link => {
    link.classList.toggle('isScrollActive', link.getAttribute('href') === `#${activeId}`)
  })
}

let navigationFrame

const requestNavigationUpdate = () => {
  if (navigationFrame) return

  navigationFrame = window.requestAnimationFrame(() => {
    updateActiveNavigation()
    navigationFrame = undefined
  })
}

window.addEventListener('scroll', requestNavigationUpdate, { passive: true })
window.addEventListener('resize', requestNavigationUpdate)
window.addEventListener('load', requestNavigationUpdate)

requestNavigationUpdate()
