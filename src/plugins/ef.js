// VUE 原型挂载属性/方法
import { title } from '@/config'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
export default function (app) {

  // 全局属性
  app.config.globalProperties.$baseTitle = (() => {
    return title
  })()
  app.config.globalProperties.$baseMessage = (msg, type) => {
    alert(msg)
  }
  app.config.globalProperties.$baseEventBus = createApp()
  // 导入Layout组件
  const requireLayouts = require.context('@/layouts', true, /\.vue$/)
  requireLayouts.keys().forEach((fileName) => {
    const componentConfig = requireLayouts(fileName)
    const componentName = componentConfig.default.name
    app.component(componentName, componentConfig.default || componentConfig)
  })
  // 导入通用组件
  const requireComponents = require.context('@/components', true, /\.vue$/)
  requireComponents.keys().forEach((fileName) => {
    const componentConfig = requireComponents(fileName)
    const componentName = componentConfig.default.name
    app.component(componentName, componentConfig.default || componentConfig)
  })
  // 导入所有主题

  // 第三方组件
  app.use(ElementPlus, { size: 'small' })

}

