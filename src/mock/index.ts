export const dynamicRoutes = {
  code: 200,
  message: 'success',
  data: [
    /**
     * 模拟动态路由
     * type: 0 目录，1 菜单，2 iframe
     * isFrame: 0/1
     * isCache: 0/1
     * hidden: 0/1
     */
    {
      title: '用户',
      icon: 'bi bi-person-circle',
      pid: 0,
      type: 0,
      children: [
        {
          icon: 'bi bi-people-fill',
          title: '用户管理',
          type: 0,
          children: [
            {
              path: '/user/index',
              title: '用户列表',
              name: 'UserIndex',
              type: 1,
            },
          ],
        },
      ],
    },
    {
      title: '示例',
      icon: 'bi bi-table',
      pid: 0,
      type: 0,
      id: 1,
      children: [
        {
          path: '/menu/editor',
          title: '富文本',
          name: 'MenuEditor',
          type: 1,
        },
        {
          path: '/menu/worker',
          title: 'web worker',
          name: 'MenuWorker',
          type: 1,
        },
      ],
    },
  ],
};
