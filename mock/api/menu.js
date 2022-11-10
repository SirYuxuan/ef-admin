const data = [
  {
    path: '/',
    component: 'Layout',
    redirect: 'index',
    meta: {
      icon: 'setting',
      title: '首页',
      remixIcon: 'vuejs-fill',
      badge: 'AA',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: '@/views/index/index',
        meta: {
          icon: 'setting',
          title: '首页',
          badge: 'AA',
          remixIcon: 'vuejs-fill',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/personnelManagement',
    component: 'Layout',
    redirect: 'noRedirect',
    name: 'PersonnelManagement',
    meta: { title: '人员', icon: 'setting', badge: 'New' },
    children: [
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: '@/views/personnelManagement/userManagement/index',
        meta: { icon: 'setting', title: '用户管理' },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: '@/views/personnelManagement/roleManagement/index',
        meta: { icon: 'setting', title: '角色管理' },
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: '@/views/personnelManagement/menuManagement/index',
        meta: { icon: 'setting', title: '菜单管理', badge: 'New' },
      }
    ]
  }
]
module.exports = [
  {
    url: 'menu/build',
    type: 'get',
    response() {
      return { code: 200, msg: 'success', data: data }
    },
  },
]
