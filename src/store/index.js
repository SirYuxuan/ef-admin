/**
 * 导入所有 Vuex模块 自动加入namespaced:true，用于解决vuex命名冲突
 * @type {Store}
 */
import { createStore } from 'vuex'

const requireModule = require.context('./module', false, /\.js$/)
const modules = {}

requireModule.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = requireModule(key).default
})
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})
export default createStore({
  modules,
})
