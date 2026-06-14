import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { installSectionNavigation } from './router/sectionNavigation'
import './assets/styles/main.scss'
import './assets/styles/site.scss'

const app = createApp(App)

app.use(router)

router.isReady().then(() => {
  app.mount('#app')
  installSectionNavigation(router)
})
