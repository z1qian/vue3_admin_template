<script setup lang="ts" name="Setting">
import { storeToRefs } from 'pinia'
import useLayoutSettingStore from '@/stores/modules/layoutSetting'
// 引入用户小仓库
import useUserStore from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'

// 修改 storeToRefs 返回的 ref对象的数据，对应store中的数据，也会修改
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const layoutSettingStore = useLayoutSettingStore()
const { refresh } = storeToRefs(layoutSettingStore)

// 获取路由器对象
const router = useRouter()
// 获取路由对象
const route = useRoute()

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
</script>

<template>
  <div class="setting">
    <el-button icon="RefreshRight" circle @click="refresh = !refresh" />
    <el-button icon="FullScreen" circle @click="fullScreen" />
    <el-button icon="Setting" circle />
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
  height: 100%;
  display: flex;
  align-items: center;

  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
}
</style>
