<script setup lang="ts" name="future">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const line = ref()
let mycharts: any
onMounted(() => {
  //初始化echarts实例
  mycharts = echarts.init(line.value)
  //设置配置项
  mycharts.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#94A7BD', //轴线和单位颜色
          },
        },
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '(访问量)',
        nameTextStyle: {
          fontSize: 14,
          color: '#94A7BD',
          padding: [0, 0, 0, -45],
        },
        axisLine: {
          lineStyle: {
            color: '#94A7BD', //轴线和单位颜色
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#182D46',
            type: [2, 3],
            dashOffset: 2,
          },
        },
      },
    ],
    series: [
      {
        name: '访问量',
        type: 'line',
        symbol: 'none',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(54,161,255,0.6)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(25,104,255,0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        lineStyle: {
          color: '#2695FE',
          width: 2,
          type: 'solid',
        },
        data: [50, 232, 20, 300, 90, 280, 100],
      },
    ],
    grid: {
      left: '3%',
      right: '3%',
      bottom: '5%',
      containLabel: true,
    },
  })
})

onUnmounted(() => {
  mycharts.dispose()
})
</script>

<template>
  <div class="future">
    <div class="title">未来7天游客量趋势图</div>
    <img src="../images/dataScreen-title.png" alt="" />
    <div ref="line" style="height: calc(100% - 20px - 7px)"></div>
  </div>
</template>

<style scoped lang="scss">
.future {
  flex: 1;
  margin: 0 30px;
  background: url(../images/dataScreen-main-cb.png) no-repeat;
  background-size: cover;

  .title {
    font-size: 20px;
  }
}
</style>
