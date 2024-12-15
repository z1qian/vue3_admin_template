<!-- 实时游客统计 -->
<script setup lang="ts" name="tourist">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const peopleCount = ref('216908人')
const ball = ref()
let mycharts: any

onMounted(() => {
  //获取echarts类的实例
  mycharts = echarts.init(ball.value)
  //设置实例的配置项
  mycharts.setOption({
    //标题组件
    title: {
      // text: '水球图'
    },
    //系列:决定你展示什么样的图形图标
    series: [
      {
        type: 'liquidFill',
        data: [0.6, 0.4, 0.1],
        radius: '85%',
      },
    ],
    //布局组件
    grid: {
      // left: 0,
      // right: 0,
      // top: 0,
      // bottom: 0
    },
  })
})

onUnmounted(() => {
  mycharts.dispose()
})
</script>

<template>
  <div class="tourist">
    <div class="title">实时游客统计</div>
    <img src="../images/dataScreen-title.png" alt="" />
    <div class="content">
      可预约总量&nbsp;
      <span>99999</span>
      &nbsp;人
    </div>
    <div class="count">
      <span v-for="(item, index) in peopleCount" :key="index">{{ item }}</span>
    </div>
    <div class="ball" ref="ball"></div>
  </div>
</template>

<style scoped lang="scss">
.tourist {
  flex: 1;
  background: url(../images/dataScreen-main-lt.png) no-repeat;
  background-size: cover;
  margin-top: 10px;

  .title {
    font-size: 20px;
  }

  .content {
    text-align: right;
    margin-right: 10px;

    span {
      color: orange;
    }
  }

  .count {
    display: flex;
    height: 40px;
    padding: 0 10px;
    color: #29fcff;
    font-size: 25px;
    margin-top: 30px;

    span {
      flex: 1;
      background: url(../images/total.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
    }
  }

  .ball {
    height: 220px;
  }
}
</style>
