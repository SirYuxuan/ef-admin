/**
 * 将后台返回路由数据转换为前端路由数据
 * @param asyncRoutes
 * @returns {*}
 */
export function convertRouter(asyncRoutes) {
  return asyncRoutes.map((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = (resolve) => require(['@/layouts'], resolve)
      } else if (route.component === 'EmptyLayout') {
        route.component = (resolve) =>
          require(['@/layouts/EmptyLayout'], resolve)
      } else {
        const index = route.component.indexOf('views')
        const path = index > 0 ? route.component.slice(index) : `views/${route.component}`
        route.component = (resolve) => require([`@/${path}`], resolve)
      }
    }
    if (route.children && route.children.length) {
      route.children = convertRouter(route.children)
    } else {
      delete route.children
    }
    return route
  })
}