<script setup lang="ts" name="Tabbar">
import Breadcrumb from './breadcrumb.vue'
import Setting from './setting.vue'
</script>

<template>
  <div class="tabbar">
    <div class="left">
      <Breadcrumb />
    </div>
    <div class="right">
      <Setting />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
</style>
