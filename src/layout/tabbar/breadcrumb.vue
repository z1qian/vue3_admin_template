<script setup lang="ts" name="Breadcrumb">
import { storeToRefs } from 'pinia'
import useLayoutSettingStore from '@/stores/modules/layoutSetting'

// 修改fold值，也会修改LayoutSetting Store中的值
const { fold } = storeToRefs(useLayoutSettingStore())

// 展开或折叠左侧菜单
const switchFold = () => {
  fold.value = !fold.value
  localStorage.setItem('FOLD', fold.value.toString())
}
</script>

<template>
  <div class="breadcrumb">
    <el-icon style="margin-right: 10px; cursor: pointer" @click="switchFold">
      <component :is="fold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <!-- 动态展示路由名称和图标 -->
      <!-- 永远不要在同一个元素上使用 v-if 和 v-for -->
      <template v-for="item in $route.matched" :key="item.path">
        <el-breadcrumb-item
          v-if="item.meta.title && item.meta.icon"
          :to="item.path"
        >
          <div style="display: flex; align-items: center">
            <el-icon style="margin-right: 3px">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
