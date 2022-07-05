import type { App } from 'vue'

import SvgIcon from './SvgIcon.vue'

function useGlobalComponents(app: App) {
  app.component(SvgIcon.name, SvgIcon)
}

export default useGlobalComponents
