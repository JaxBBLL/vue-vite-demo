import type { App } from 'vue';
import { setupAssets } from './assets';
import { setupGlobalComponents } from './globalComponents';
import { setupDirectives } from './directives';

export default function (app: App) {
  setupAssets(app);
  setupGlobalComponents(app);
  setupDirectives(app);
}
