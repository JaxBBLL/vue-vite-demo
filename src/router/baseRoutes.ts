import Layout from '@/layouts/index.vue';
import notfound from '@/views/notfound/index.vue';

const baseRoutes = [
  {
    path: '/',
    name: '',
    title: '首页',
    component: Layout,
    redirect: '/home',
    type: 0,
    useFirstChild: 1,
    children: [
      {
        path: '/home',
        name: 'home',
        title: '首页',
        icon: 'bi bi-house-door-fill',
        component: () => import('@/views/home.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    name: 'Login',
    title: '登录',
    type: 1,
    show: false,
  },
];

export const notfoundRoute = {
  path: '/:pathMatch(.*)*',
  name: 'notfound',
  component: notfound,
};

export default baseRoutes;
