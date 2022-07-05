import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'text-purple-600',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView'),
        },
      ],
    },
  ],
})

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
