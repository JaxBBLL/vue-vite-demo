import type { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import Layout from '@/layouts/index.vue';
import Empty from '@/layouts/empty.vue';
import { getRoutesApi } from '@/service/api/index';
import baseRoutes from '@/router/baseRoutes';

const modules = import.meta.glob('../views/**/*.vue');
let uid = 0;

export default defineStore('permission', {
  state: () => {
    return {
      routes: <RouteRecordRaw[]>[],
      routerIsReady: false,
    };
  },
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.routes = routes;
    },
    generateRoutes() {
      return new Promise((resolve) => {
        getRoutesApi().then((res) => {
          const ret = compilerRoutes(res.data, true);
          resolve(ret);
          this.routerIsReady = true;
          this.setRoutes(baseRoutes.concat(ret));
          console.log(1, this.routes);
        });
      });
    },
  },
});

// 路由递归构建
function compilerRoutes(treeList: any[], isDynamic = false): RouteRecordRaw[] {
  var res = [];
  for (var i = 0; i < treeList.length; i++) {
    var route = buildRoute(treeList[i], isDynamic);
    if (treeList[i].children) {
      // @ts-ignore
      route.children = compilerRoutes(treeList[i].children, isDynamic);
    }
    res.push(route);
  }
  return res;
}

function buildRoute(item: any, isDynamic = false) {
  let component;
  let name = item.name || '';
  // 处理parmas的路由，只支持参数路径后面。如：/user/detail/:id
  let path = item.path.replace(/\/:\w+/gi, '');

  // 是否动态目录菜单
  if (isDynamic) {
    // item.type -> 0：目录；1：菜单；2：内部菜单；3: iframe页面
    if (item.type === 0) {
      // 是目录
      if (item.pid) {
        // 非顶级目录，使用无html结构组件
        component = Empty;
      } else {
        // 顶级目录，使用Layout组件
        component = Layout;
      }
    } else if (item.type == 1 || item.type == 2) {
      // 页面，使用对应路径的组件
      try {
        component = loadView(path) || null;
      } catch (e) {
        // TODO
      }
    } else if (item.type == 3) {
      component = Empty;
    }
    if (path) {
      name = path.replace(/\/(.)/g, function (match: any, p1: string) {
        return p1.toUpperCase();
      });
    }
  } else {
    component = item.component;
  }

  return {
    id: uid++, // 自增uid，用于遍历的key
    path: item.path || '',
    name: name,
    title: item.title,
    hidden: item.type === 2,
    leaf: item.leaf || false, // 目录是否显示为页面，true时会把子目录第一个设为导航。如：home页面
    icon: item.icon || '', // 目录图标
    component,
    redirect: item.redirect,
    type: item.type,
    meta: {
      url: item.url,
      type: item.type,
      noBread: !!item.noBread, // 不显示面包屑
      title: item.title,
      noCache: item.type === 2, // 一般内页不缓存
      noTabs: item.noTabs || false, // 是否显示tabs栏
    },
  };
}

const loadView = (view: string) => {
  let res;
  for (const path in modules) {
    const dir = `../views${view}.vue`;
    if (dir === path) {
      res = () => modules[path]();
    }
  }
  return res;
};
