<script setup lang="ts" name="year">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const lines = ref()
let mycharts: any

onMounted(() => {
  //初始化echarts实例
  mycharts = echarts.init(lines.value)
  //设置配置项
  mycharts.setOption({
    color: ['#80FFA5', '#00DDFF', '#37A2FF'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      top: '8%',
      right: '5%',
      icon: 'rect',
      textStyle: {
        color: '#fff',
      },
      data: ['2021年', '2022年', '2023年'],
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '2%',
      // top: '0%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#94A7BD', //轴线和单位颜色
          },
        },
      },
    ],
    yAxis: [
      {
        name: '(人数)',
        nameTextStyle: {
          fontSize: 14,
          color: '#94A7BD',
          padding: [0, 0, 0, -45],
        },
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#94A7BD', //轴线和单位颜色
          },
        },
      },
    ],
    series: [
      {
        name: '2021年',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)',
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: '2022年',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)',
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [120, 282, 111, 234, 220, 340, 310],
      },
      {
        name: '2023年',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(55, 162, 255)',
            },
            {
              offset: 1,
              color: 'rgb(116, 21, 219)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [320, 132, 201, 334, 190, 130, 220],
      },
    ],
  })
})

onUnmounted(() => {
  mycharts.dispose()
})
</script>

<template>
  <div class="year">
    <div class="title">年度游客量对比</div>
    <img src="../images/dataScreen-title.png" alt="" />
    <div ref="lines" class="lines"></div>
  </div>
</template>

<style scoped lang="scss">
.year {
  height: 309px;
  margin: 30px 0;
  background: url(../images/dataScreen-main-rc.png) no-repeat;
  background-size: cover;

  .title {
    font-size: 20px;
  }

  .lines {
    height: calc(100% - 36px);
  }
}
</style>
