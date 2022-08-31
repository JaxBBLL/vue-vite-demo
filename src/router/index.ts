import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import createRouterGuards from './guards';

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE),
  linkExactActiveClass: 'active',
  routes,
});

export async function setupRouter(app: App) {
  createRouterGuards(router);
  app.use(router);
  await router.isReady();
}
