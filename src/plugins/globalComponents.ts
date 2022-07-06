import type { App } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

export function setupGlobalComponents(app: App) {
  app.component(SvgIcon.name, SvgIcon)
}
