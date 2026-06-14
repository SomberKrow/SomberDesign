import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'
import './assets/styles/site.scss'

const app = createApp(App)

app.use(router)

router.isReady().then(() => {
  app.mount('#app')

  const skipLink = document.querySelector('.skipLink')
  const mainContent = document.getElementById('main-content')

  skipLink?.addEventListener('click', event => {
    event.preventDefault()

    if (!mainContent) return

    mainContent.setAttribute('tabindex', '-1')
    mainContent.focus({ preventScroll: true })
    mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})
