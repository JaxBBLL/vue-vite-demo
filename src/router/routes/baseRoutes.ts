import Layout from '@/layouts/index.vue';
import notfound from '@/views/notfound/index.vue';

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
        component: () => import('@/views/home.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    name: 'Login',
    title: '登录',
    type: 2,
  },
  // { path: '/:pathMatch(.*)*', name: 'notfound', component: notfound },
];

export default routes;
