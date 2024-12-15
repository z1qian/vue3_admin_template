<script setup lang="ts" name="Setting">
import { storeToRefs } from 'pinia'
import useLayoutSettingStore from '@/stores/modules/layoutSetting'
// 引入用户小仓库
import useUserStore from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

// 修改 storeToRefs 返回的 ref对象的数据，对应store中的数据，也会修改
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const layoutSettingStore = useLayoutSettingStore()
const { refresh } = storeToRefs(layoutSettingStore)

// 获取路由器对象
const router = useRouter()
// 获取路由对象
const route = useRoute()

// 主题颜色所需数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

// 切换暗黑模式
const dark = ref(false)

// 全屏按钮点击回调
const fullScreen = () => {
  // DOM对象的一个属性：可以用来判断当前是不是全屏模式
  let full = document.fullscreenElement
  if (!full) {
    // 文档根节点的方法requestFullscreen，实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const logout = async () => {
  await userStore.logout()
  router.push({ path: '/login', query: { redirect: route.path } })
}

// 切换暗黑模式
const switchDark = () => {
  //获取HTML根节点
  let html = document.documentElement

  if (dark.value) {
    html.classList.add('dark')
    return
  }

  if (html.classList.contains('dark')) {
    // 移除 dark 属性
    html.classList.remove('dark')
  }
}

const changeThemeColor = () => {
  const el = document.documentElement

  // 设置 css 变量
  el.style.setProperty('--el-color-primary', color.value)
}
</script>

<template>
  <div class="setting">
    <el-button icon="RefreshRight" circle @click="refresh = !refresh" />
    <el-button icon="FullScreen" circle @click="fullScreen" />
    <el-popover
      placement="bottom"
      title="主题设置"
      :width="250"
      trigger="click"
    >
      <template #reference>
        <el-button icon="Setting" circle />
      </template>
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            v-model="color"
            show-alpha
            :predefine="predefineColors"
            size="default"
            @change="changeThemeColor"
            :teleported="false"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="dark"
            inline-prompt
            active-icon="moon"
            inactive-icon="sunny"
            size="default"
            @change="switchDark"
          />
        </el-form-item>
      </el-form>
    </el-popover>
    <img
      :src="userInfo?.avatar"
      alt=""
      width="32px"
      height="32px"
      style="margin: 0 10px; border-radius: 50%"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userInfo?.name }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.setting {
  display: flex;
  align-items: center;
  height: 100%;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    color: var(--el-color-primary);
    cursor: pointer;
  }
}
</style>
