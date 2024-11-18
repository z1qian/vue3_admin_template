<script setup lang="ts" name="Index">
// 接收父组件传递过来的参数
defineProps({
  // xlink:href 属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 提供使用的图标名称
  name: String,
  // 接收父组件传递的颜色
  color: {
    type: String,
    default: '',
  },

  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
  // 接收父组件传递的样式
  customStyle: {
    type: Object,
    default: {},
  },
})
</script>

<template>
  <div class="svgicon">
    <!-- svg：图标外层容器节点，内部需要与use标签结合使用 -->
    <svg :style="{ width, height, ...customStyle }">
      <!-- xlink:href 执行用哪一个图标，属性值务必#icon-图标名称 -->
      <!-- use 标签的fill属性，可以设置图标的颜色 -->
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<style scoped lang="scss"></style>
