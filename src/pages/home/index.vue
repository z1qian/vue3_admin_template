<script setup lang="ts" name="home">
import { getTimePeriod } from '@/utils/time'
import setting from '@/setting'
// 引入用户小仓库
import useUserStore from '@/stores/modules/user'

const userStore = useUserStore()
</script>

<template>
  <div class="home">
    <el-card>
      <div class="box">
        <el-avatar :size="100" :src="userStore.userInfo?.avatar" />
        <div class="content">
          <div class="title">{{ `${getTimePeriod()}好呀，${userStore.userInfo?.name}` }}</div>
          <div class="subTitle">{{ setting.title }}</div>
        </div>
      </div>
    </el-card>
    <div style="display: flex;justify-content: center;margin-top: 20px;">
      <svg-icon name="welcome" width="800px" height="400px"></svg-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;

  .content {
    margin-left: 10px;

    .title {
      font-size: 30px;
      font-weight: bold;
    }

    .subTitle {
      margin-top: 10px;
      font-style: italic;
      color: darkgray;
    }
  }
}
</style>
