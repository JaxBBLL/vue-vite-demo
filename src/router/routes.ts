import Layout from '@/layouts/index.vue'
import notfound from '@/views/notfound/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
      },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: notfound },
]

export default routes
