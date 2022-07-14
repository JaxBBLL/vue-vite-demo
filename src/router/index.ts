import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'
import notfound from '@/views/notfound/index.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  linkExactActiveClass: 'active',
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
          component: () => import('../views/home/index.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/about/index.vue'),
        },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'notfound', component: notfound },
  ],
})

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
