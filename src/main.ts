import { createApp } from 'vue'
import { setupStore } from './store'
import { setupPlugins } from './plugins'
import { setupRouter } from './router'

import App from './App.vue'

async function setApp() {
  const app = createApp(App)
  setupStore(app)
  setupPlugins(app)
  await setupRouter(app)
  app.mount('#app')
}

setApp()
