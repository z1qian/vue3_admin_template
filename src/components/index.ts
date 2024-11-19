import SvgIcon from '@/components/SvgIcon/index.vue'
import Category from './Category/index.vue'
import type { App, Component } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponents: { [key: string]: Component } = { SvgIcon, Category }

// 对外暴露插件对象
export default {
  // 务必叫做install方法
  install(app: App) {
    // 注册项目全部的全局组件
    Object.keys(allGlobalComponents).forEach((key: string) => {
      app.component(key, allGlobalComponents[key])
    })
    // 将element-plus提供的所有图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
