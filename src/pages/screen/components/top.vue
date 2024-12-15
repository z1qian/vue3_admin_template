<script setup lang="ts" name="top">
import moment from 'moment'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const time = ref('')
let intervalId = 0

onMounted(() => {
  getTime()
  intervalId = setInterval(() => {
    getTime()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

const getTime = () => {
  time.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
}
</script>

<template>
  <div class="container">
    <div class="left">
      <div class="btn lbtn" @click="$router.push('/home')">首页</div>
    </div>
    <div class="middle">
      <div class="title">智慧旅游可视化大数据展示平台</div>
    </div>
    <div class="right">
      <div class="btn rbtn">统计报告</div>
      <div class="time">当前时间：{{ time }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  font-size: 20px;
  color: #29fcff;

  .btn {
    width: 150px;
    height: 100%;
    display: inline-block;
    align-content: center;
    text-align: center;
    cursor: pointer;
  }

  .left {
    flex: 1.5;
    background: url(../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: 100% 100%;
    text-align: right;

    .lbtn {
      background: url(../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .middle {
    flex: 2;

    .title {
      height: 74px;
      background: url(../images//dataScreen-header-center-bg.png);
      background-size: 100% 100%;
      text-align: center;
      align-content: center;
      font-size: 35px;
      font-weight: bold;
    }
  }

  .right {
    display: flex;
    flex: 1.5;
    background: url(../images//dataScreen-header-right-bg.png) no-repeat;
    background-size: 100% 100%;

    .rbtn {
      background: url(../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
    }

    .time {
      font-size: 17px;
      margin-left: 50px;
      align-content: center;
    }
  }
}
</style>
