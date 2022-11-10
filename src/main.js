import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// 全局公共引入
import '@/plugins'
// 全局原型绑定/组件注入
import ef from '@/plugins/ef'
const app = createApp(App)
app.use(ef)
app.use(router)
app.use(store)
app.mount('#app')
