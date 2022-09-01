import { createRouter, createWebHashHistory } from 'vue-router';
import baseRoutes from './baseRoutes';
import createRouterGuards from './guards';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE),
  linkExactActiveClass: 'active',
  routes: baseRoutes,
});

createRouterGuards(router);

export default router;
