import { createApp } from 'vue'
import App from '@/App.vue'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// svg插件需要的配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册整个项目的全局组件
import globalComponent from '@/components'
// 引入模板的全局样式
import '@/styles/index.scss'
// 引入路由
import router from './router'
// 引入仓库
import pinia from './stores'
import 'element-plus/theme-chalk/dark/css-vars.css'

// 获取应用的实例对象
const app = createApp(App)

// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, // element-plus国际化配置
})
// 安装自定义插件
app.use(globalComponent)

// 注册模板路由
app.use(router)

// 安装仓库
app.use(pinia)

// 引入路由鉴权文件
import './permission'

//引入自定义指令文件
import { isHasButtonPermission } from '@/directive/hasBtnPermission';
isHasButtonPermission(app);
// 将应用挂载到挂载点上
app.mount('#app')
