// VUE 原型挂载属性/方法
import {title} from '@/config'

export default function (app) {
  // 全局属性
  app.config.globalProperties.$baseTitle = (() => {
    return title
  })()

}

