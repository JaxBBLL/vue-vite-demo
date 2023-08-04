import type { Router, RouteRecordRaw } from 'vue-router';
import usePermissionStore from '@/store/permission';
import { notfoundRoute } from './baseRoutes';

export default function (router: Router) {
  router.beforeEach((to, from, next) => {
    const store = usePermissionStore();
    if (!store.routerIsReady) {
      store.generateRoutes().then((routers) => {
        (routers as RouteRecordRaw[]).forEach((r) => {
          router.addRoute(r);
        });
        router.addRoute(notfoundRoute);
        next({ ...to, replace: true });
      });
    } else {
      next();
    }
  });
  router.isReady().then(() => {});
}
