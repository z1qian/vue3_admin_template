<script setup lang="ts" name="mainContent">
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import useLayoutSettingStore from '@/stores/modules/layoutSetting'

// 控制内容区路由组件是否需要销毁重建
const flag = ref(true)
const layoutSettingStore = useLayoutSettingStore()
// 修改refresh值，也会修改LayoutSetting Store中的值
const { refresh } = storeToRefs(layoutSettingStore)

watch(refresh, () => {
  flag.value = false

  // nextTick 确保 DOM 更新（即组件销毁）完成后，再执行回调函数
  nextTick(() => {
    flag.value = true
  })
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
// @see:https://cn.vuejs.org/guide/built-ins/transition

// 定义了组件进入动画的初始状态
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

// 定义了动画的过渡效果
.fade-enter-active {
  transition: all 0.7s;
}

// 定义了动画结束时的状态
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
