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
      icon: 'fa fa-table',
      pid: 0,
      type: 0,
      children: [
        {
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
      title: '组件',
      icon: 'fa fa-table',
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
      ],
    },
  ],
};
