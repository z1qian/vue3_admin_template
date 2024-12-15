<script setup lang='ts' name='screen'>
import { ref, onMounted } from 'vue'
import top from './components/top.vue'
import gender from './components/gender.vue';
import age from './components/age.vue';
import tourist from './components/tourist.vue';
import chinamap from './components/map/map.vue';
import future from './components/future.vue';
import rank from './components/rank.vue';
import year from './components/year.vue';
import order from './components/order.vue';

// 实际大屏展示区域
const content = ref();

onMounted(() => {
  content.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
}

//监听视口变化
window.onresize = () => {
  content.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}

</script>

<template>
  <div class="screen">
    <!-- 实际大屏展示区域 -->
    <div class="content" ref="content">
      <div class="top">
        <top />
      </div>
      <div class="main">
        <div class="left">
          <tourist />
          <gender />
          <age />
        </div>
        <div class="middle">
          <chinamap />
          <future />
        </div>
        <div class="right">
          <rank />
          <year />
          <order />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 用户实际的屏幕尺寸
.screen {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .content {
    width: 1920px;
    height: 1080px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      height: 50px;
    }

    .main {
      display: flex;
      height: 1030px;
      color: white;

      .left {
        width: 426px;
        display: flex;
        flex-direction: column;
        padding-left: 40px
      }

      .middle {
        width: 1068px;
        display: flex;
        flex-direction: column;
      }

      .right {
        width: 426px;
        padding-right: 40px
      }
    }
  }
}
</style>