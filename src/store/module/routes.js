/**
 * 路由菜单的管理
 * @returns {{routes: *[], partialRoutes: *[]}}
 */
import { constantRouters } from '@/router/constant'
import { build } from '@/api/system/menu'
import { convertRouter } from '@/router/utils'

export default {
  state: () => ({
    routes: [],
  }),
  getters: {
    routes: (state) => state.routes,
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = constantRouters.concat(routes)
    }
  },
  actions: {
    async setRoutes({ commit }) {
      let { data } = await build()
      let accessRoutes = convertRouter(data)
      commit('setRoutes', accessRoutes)
      return accessRoutes
    }
  }
}