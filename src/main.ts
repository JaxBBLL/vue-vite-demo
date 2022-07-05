import './styles/base.css'
import { createApp } from 'vue'
import { setupRouter } from './router'
import App from './App.vue'
import 'virtual:svg-icons-register'
import useGlobalComponents from './components/index'

async function setApp() {
  const app = createApp(App)
  useGlobalComponents(app)
  await setupRouter(app)
  app.mount('#app')
}

setApp()
