import '@/styles/base.css';
import 'virtual:svg-icons-register';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export function setupAssets(app) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}
