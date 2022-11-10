import router from '@/router'
import store from '@/store'
import { loginPath, routesWhiteList, recordRoute } from '@/config'
import { isExternal } from '@/utils/validate'

/**
 * 路由守卫
 */
router.beforeResolve(async (to) => {
  let hasToken = store.getters['user/accessToken']
  if (!hasToken) {
    if (to.path === loginPath) {
      await router.push({ path: '/' })
      return
    }
    const hasPermissions = store.getters['routes/routes'] && store.getters['routes/routes'].length > 0
    if (hasPermissions) {
      return true
    } else {
      let accessRoutes = await store.dispatch('routes/setRoutes')
      accessRoutes.forEach((route) => {
        if (!isExternal(route.path)) {
          // 动态添加可访问路由表
          router.addRoute(route)
        }
      })
      await router.push({ ...to, replace: true })
    }
    return true
  }
  // 判断访问的地址是否在白名单
  if (routesWhiteList.indexOf(to.path) !== -1) {
    return true
  }
  // 如果开启了记录路由, 则给登录地址添加上上一个页面的地址
  await router.push('/login' + recordRoute ? `?redirect=${to.path}` : '')
  return true
})