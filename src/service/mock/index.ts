export const dynamicRoutes = {
  code: 200,
  message: 'success',
  data: [
    // 模拟动态路由, type 0 目录，1 菜单，2 内部菜单， 3 iframe
    {
      path: '/',
      title: '目录',
      icon: 'fa fa-table',
      pid: 0,
      type: 0,
      id: 1,
      children: [
        {
          path: '/menu/editor',
          title: '富文本',
          name: 'MenuEditor',
          pid: 1,
          id: 10,
          type: 1,
        },
      ],
    },
  ],
};
