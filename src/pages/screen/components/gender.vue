<!-- 男女比例 -->
<script setup lang="ts" name="gender">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const rate = ref()
let mycharts: any

onMounted(() => {
  //初始化echarts实例
  mycharts = echarts.init(rate.value)
  //设置配置项
  mycharts.setOption({
    title: [
      {
        text: '男士60%',
        textStyle: {
          color: 'white',
          fontSize: 14,
          fontWeight: 'normal',
        },
      },
      {
        text: '女士40%',
        textStyle: {
          color: 'white',
          fontSize: 14,
          fontWeight: 'normal',
        },
        right: 0,
      },
    ],
    tooltip: {},
    //x|y
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [60],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: '#007afe',
          borderRadius: 20,
        },
        tooltip: {
          formatter: '男士: {c0}%',
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        //调整女士柱条位置
        barGap: '-100%',
        itemStyle: {
          color: '#ff4b7a',
          borderRadius: 20,
        },
        tooltip: {
          formatter: '女士: 40%',
        },
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  })
})

onUnmounted(() => {
  mycharts.dispose()
})
</script>

<template>
  <div class="gender">
    <div class="title">男女比例</div>
    <img src="../images/dataScreen-title.png" alt="" />
    <div style="padding: 40px 60px 0 60px">
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        "
      >
        <div class="manBox">
          <div class="text">男士</div>
          <div class="photoBox">
            <img src="../images/man.png" alt="" />
          </div>
        </div>
        <div class="womanBox">
          <div class="text">女士</div>
          <div class="photoBox">
            <img src="../images/woman.png" width="61px" height="61px" alt="" />
          </div>
        </div>
      </div>
      <div ref="rate" class="rate"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gender {
  flex: 1;
  background: url(../images/dataScreen-main-lc.png) no-repeat;
  background-size: cover;
  margin: 30px 0;

  .title {
    font-size: 20px;
  }

  .manBox {
    width: 111px;
    height: 116px;
    background: url(../images/man-bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .womanBox {
    width: 111px;
    height: 116px;
    background: url(../images/woman-bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .text {
    height: 20px;
    text-align: center;
    align-content: center;
  }

  .photoBox {
    height: 96px;
    text-align: center;
    align-content: center;
  }

  .rate {
    height: 80px;
  }
}
</style>
