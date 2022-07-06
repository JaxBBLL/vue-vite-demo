import type { App } from 'vue'

import registerPreventReClick from '@/directives/preventReClick'

export function setupDirectives(app: App) {
  registerPreventReClick(app)
}
