import { sectionPathById } from './index'

const pathBySection = sectionPathById
const sectionByPath = Object.fromEntries(
  Object.entries(pathBySection).map(([sectionId, path]) => [path, sectionId]),
)

const getSectionIdForPath = path => sectionByPath[path] ?? 'home'

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

const decorateSectionLinks = () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const sectionId = link.getAttribute('href')?.slice(1)
    const routePath = pathBySection[sectionId]

    if (!routePath) return

    link.href = routePath
    link.dataset.sectionTarget = sectionId
  })
}

export const installSectionNavigation = router => {
  let scrollFrame
  let programmaticScroll = false
  let programmaticTimer
  let syncingRouteFromScroll = false

  const startProgrammaticScroll = () => {
    programmaticScroll = true
    window.clearTimeout(programmaticTimer)
    programmaticTimer = window.setTimeout(() => {
      programmaticScroll = false
    }, 900)
  }

  const navigateToSection = async sectionId => {
    const routePath = pathBySection[sectionId]

    if (!routePath) return

    startProgrammaticScroll()

    if (router.currentRoute.value.path === routePath) {
      scrollToSection(sectionId)
      return
    }

    await router.push(routePath)
  }

  const handleDocumentClick = event => {
    const link = event.target.closest('a[data-section-target]')

    if (!link) return
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (link.target === '_blank' || link.hasAttribute('download')) return

    event.preventDefault()
    navigateToSection(link.dataset.sectionTarget)
  }

  const syncRouteToScrollPosition = () => {
    scrollFrame = undefined

    if (programmaticScroll || syncingRouteFromScroll) return

    const sections = Object.keys(pathBySection)
      .map(sectionId => document.getElementById(sectionId))
      .filter(Boolean)

    if (!sections.length) return

    const marker = Math.min(window.innerHeight * 0.38, 340)
    const atPageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8
    let activeSectionId = sections[0].id

    if (atPageBottom) {
      activeSectionId = 'contact'
    } else {
      sections.forEach(section => {
        if (section.getBoundingClientRect().top <= marker) {
          activeSectionId = section.id
        }
      })
    }

    const routePath = pathBySection[activeSectionId]

    if (!routePath || router.currentRoute.value.path === routePath) return

    syncingRouteFromScroll = true
    router.replace(routePath).finally(() => {
      syncingRouteFromScroll = false
    })
  }

  const requestRouteSync = () => {
    if (scrollFrame) return
    scrollFrame = window.requestAnimationFrame(syncRouteToScrollPosition)
  }

  router.afterEach(to => {
    window.requestAnimationFrame(() => {
      decorateSectionLinks()

      if (syncingRouteFromScroll) return

      const sectionId = to.meta?.sectionId ?? getSectionIdForPath(to.path)
      scrollToSection(sectionId, 'smooth')
    })
  })

  document.addEventListener('click', handleDocumentClick)
  window.addEventListener('scroll', requestRouteSync, { passive: true })
  window.addEventListener('resize', requestRouteSync)

  window.requestAnimationFrame(() => {
    decorateSectionLinks()
    const initialSectionId = router.currentRoute.value.meta?.sectionId
      ?? getSectionIdForPath(router.currentRoute.value.path)
    scrollToSection(initialSectionId, 'auto')
  })

  return () => {
    document.removeEventListener('click', handleDocumentClick)
    window.removeEventListener('scroll', requestRouteSync)
    window.removeEventListener('resize', requestRouteSync)
    window.clearTimeout(programmaticTimer)

    if (scrollFrame) {
      window.cancelAnimationFrame(scrollFrame)
    }
  }
}
