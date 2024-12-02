<script setup lang="ts" name="Layout">
import Logo from './logo/index.vue'
// 引入用户小仓库
import useUserStore from '@/stores/modules/user'
import MenuItems from './menuItems/index.vue'
// 右侧内容展示区域
import Main from './main/index.vue'
// 引入顶部tabbar组件
import Tabbar from './tabbar/index.vue'
// 引入layout相关配置小仓库
import useLayoutSettingStore from '@/stores/modules/layoutSetting'
import { storeToRefs } from 'pinia'

// 修改fold值，也会修改LayoutSetting Store中的值
const { fold } = storeToRefs(useLayoutSettingStore())

const { menuRouters } = useUserStore()
</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- 左边菜单栏 -->
      <el-aside :class="{ fold: fold }">
        <Logo></Logo>
        <!-- 菜单展示区域 -->
        <el-scrollbar>
          <el-menu
            router
            :collapse="fold"
            :default-active="$route.path"
            unique-opened
          >
            <!-- 根据路由动态生成菜单 -->
            <MenuItems :menuList="menuRouters"></MenuItems>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <!-- 顶部导航栏 -->
        <el-header>
          <Tabbar></Tabbar>
        </el-header>
        <!-- 内容区 -->
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.common-layout {
  width: 100vw;
  height: 100vh;

  .el-container {
    height: 100%;

    .el-aside {
      width: $base-menu-width;
      background: $base-menu-background-color;
      transition: all 0.3s;

      &.fold {
        width: $base-menu-fold-width;
      }

      .el-scrollbar {
        height: calc(100% - $base-menu-logo-height);

        .el-menu {
          // 菜单的背景颜色
          --el-menu-bg-color: $base-menu-background-color;

          // 菜单的文字颜色
          --el-menu-text-color: #fff;

          border-right: none;
        }
      }
    }

    .el-header {
      height: $base-tabbar-height;
    }
  }
}
</style>
