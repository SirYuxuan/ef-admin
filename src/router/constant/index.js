export const constantRouters = [
  {
    path: '/demo',
    component: () => import('@/layouts'),
    hidden: true,
    meta: { title: 'demo' },
  }
]