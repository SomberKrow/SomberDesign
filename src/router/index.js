import { createRouter, createWebHistory } from 'vue-router'

const RouteTarget = {
  name: 'SectionRouteTarget',
  render: () => null,
}

export const sectionRoutes = [
  {
    path: '/',
    name: 'home',
    component: RouteTarget,
    meta: {
      sectionId: 'home',
      title: 'Portfolio',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: RouteTarget,
    meta: {
      sectionId: 'about',
      title: 'About',
    },
  },
  {
    path: '/work',
    name: 'work',
    component: RouteTarget,
    meta: {
      sectionId: 'work',
      title: 'Work',
    },
  },
  {
    path: '/ai',
    name: 'ai',
    component: RouteTarget,
    meta: {
      sectionId: 'ai',
      title: 'AI Use',
    },
  },
  {
    path: '/playground',
    name: 'playground',
    component: RouteTarget,
    meta: {
      sectionId: 'playground',
      title: 'Playground',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: RouteTarget,
    meta: {
      sectionId: 'contact',
      title: 'Contact',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export const sectionPathById = Object.fromEntries(
  sectionRoutes
    .filter(route => route.meta?.sectionId)
    .map(route => [route.meta.sectionId, route.path]),
)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: sectionRoutes,
  scrollBehavior: () => false,
})

router.afterEach(to => {
  const pageTitle = to.meta?.title
  document.title = pageTitle === 'Portfolio'
    ? "Somber.Design — Jacob's Portfolio"
    : `${pageTitle} — Somber.Design`
})

export default router
