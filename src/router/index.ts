import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes/index';
import createRouterGuards from './guards';

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE),
  linkExactActiveClass: 'active',
  routes,
});

createRouterGuards(router);

export default router;
