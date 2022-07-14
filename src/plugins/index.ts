import type { App } from 'vue'
import { setupAssets } from './assets'
import { setupGlobalComponents } from './globalComponents'
import { setupDirectives } from './directives'

export function setupPlugins(app: App) {
  setupAssets()
  setupGlobalComponents(app)
  setupDirectives(app)
}