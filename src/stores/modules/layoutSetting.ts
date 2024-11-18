// 创建layout组件相关配置小仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 创建layout组件相关配置小仓库，并对外暴露
export default defineStore('LayoutSetting', () => {
  // 菜单是否处于折叠状态
  const fold = ref(localStorage.getItem('FOLD') === 'true')
  // 监视该变量是否变化，来刷新内容区内容
  const refresh = ref(false)

  return { fold, refresh }
})
