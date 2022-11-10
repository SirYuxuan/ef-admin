import { createRouter, createWebHistory } from 'vue-router'

import { constantRouters } from '@/router/constant'

const router = createRouter({
  routes: constantRouters,
  history: createWebHistory(),
})

export default router