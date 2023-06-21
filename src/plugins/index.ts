import type { App } from 'vue';
import '@/styles/base.css';
import { setupNaive } from './naive';
import { setupNaiveDiscreteApi } from './naiveDiscreteApi';
import { setupGlobalComponents } from './globalComponents';
import { setupDirectives } from './directives';

export default function (app: App) {
  setupNaive(app);
  setupNaiveDiscreteApi(app);
  setupGlobalComponents(app);
  setupDirectives(app);
}
