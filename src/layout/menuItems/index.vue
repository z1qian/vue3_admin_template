<script setup lang="ts" name="MenuItems">
// 获取父组件传递过来的动态路由值
defineProps(['menuList'])
</script>

<template>
  <!-- 不能设置以下div，否则会影响菜单的折叠，导致折叠样式选择器，选择不上 -->
  <!-- <div class="menuItems"> -->
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子菜单 -->
    <template v-if="!item.children || item.children.length == 0">
      <el-menu-item v-if="item.meta.show" :index="item.path">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 子菜单只要一项 -->
    <!-- 注意这里的逻辑：如果子菜单只有一项，不显示父菜单，只显示那一项子菜单 -->
    <template v-else-if="item.children.length == 1">
      <el-menu-item
        v-if="item.children[0].meta.show"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有多项子菜单 -->
    <template v-else-if="item.children.length > 1">
      <el-sub-menu v-if="item.meta.show" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <MenuItems :menuList="item.children"></MenuItems>
      </el-sub-menu>
    </template>
  </template>
  <!-- </div> -->
</template>

<style scoped lang="scss"></style>
