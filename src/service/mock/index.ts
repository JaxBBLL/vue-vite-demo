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
        {
          path: '',
          title: '子目录',
          pid: 1,
          id: 11,
          children: [
            {
              path: '/child/test',
              name: 'ChildTest',
              title: '测试',
              type: 1,
              pid: 11,
              id: 110,
            },
          ],
        },
      ],
    },
  ],
};
