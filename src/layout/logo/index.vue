<script setup lang="ts" name="Logo">
import setting from '@/setting'
</script>

<template>
  <div class="logo" v-if="setting.logo && setting.title">
    <img :src="setting.logo" :alt="setting.title" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  width: 100%;
  height: $base-menu-logo-height;
  padding: 0 10px;
  color: #fff;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    flex: 1;
    margin-left: 10px;
    overflow: hidden;
    font-size: $base-logo-title-fontSize;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
