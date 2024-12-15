<script setup lang='ts' name='map'>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import chinaJSON from './china.json'

const chinaMap = ref();
const points = [
    {
        value: [118.767413, 32.041544], itemStyle: { color: '#00EEFF' }
    },
    {
        value: [87.617733, 43.792818], itemStyle: { color: '#00EEFF' }
    },
    {
        value: [116.405285, 39.904989], itemStyle: { color: '#00EEFF' }
    },
    {
        value: [126.642464, 45.756967], itemStyle: { color: '#00EEFF' }
    },
]

//注册中国地图
echarts.registerMap('china', chinaJSON as any)
let mycharts: any;
onMounted(() => {
    //初始化echarts实例
    mycharts = echarts.init(chinaMap.value);
    //设置配置项
    mycharts.setOption({
        geo: {
            map: 'china',
            roam: true, //是否允许缩放
            zoom: 1.2,
            label: {
                show: true,
                color: '#fff'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 30,
                    color: '#29fcff'
                },
                itemStyle: {
                    areaColor: '#5c9ac1',
                }
            },
            itemStyle: {
                areaColor: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                },
                borderColor: 'rgba(147, 235, 248, 1)',
                shadowColor: 'rgba(128, 217, 248, 1)',
                shadowBlur: 10
            }
        },
        series: [
            {
                type: 'lines',//航线的系列
                data: [{
                    coords: [
                        [
                            118.767413,
                            32.041544
                        ],  // 起点
                        [
                            87.617733,
                            43.792818
                        ]  // 终点
                    ]
                },
                {
                    coords: [
                        [
                            116.405285,
                            39.904989
                        ],  // 起点
                        [
                            126.642464,
                            45.756967
                        ]   // 终点
                    ]
                }
                ],
                //开启动画特效
                effect: {
                    show: true,
                    period: 5, //箭头指向速度，值越小速度越快
                    trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
                    symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z', //箭头图标
                    symbolSize: 15, //图标大小
                },
                lineStyle: {
                    width: 1, //尾迹线条宽度
                    opacity: .7, //尾迹线条透明度
                    curveness: 0.3, //尾迹线条曲直度
                    color: '#fff'
                }
            }, { // 带有涟漪特效动画的散点（气泡）图
                type: 'effectScatter',
                coordinateSystem: 'geo',
                showEffectOn: 'render',
                zlevel: 1,
                rippleEffect: {
                    number: 3, // 波纹的数量。
                    period: 5, // 动画的周期，秒数。
                    scale: 13, // 动画中波纹的最大缩放比例。
                    brushType: 'fill', // 波纹的绘制方式，可选 'stroke' 和 'fill'。
                },
                symbolSize: 2,
                data: points,
            }
        ],
    })
})

onUnmounted(() => {
    mycharts.dispose();
})
</script>

<template>
    <div class="map">
        <div style="text-align: center;">
            <div class="msg">平台高峰预警信息（2条）</div>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="title">景 区 实 时 客 流 量</div>
        <div class="china-map" ref="chinaMap"></div>
    </div>
</template>

<style scoped lang="scss">
.map {
    flex: 4;
    display: flex;
    flex-direction: column;

    .msg {
        margin-top: 40px;
        font-size: 20px;
    }

    .title {
        width: 400px;
        font-size: 25px;
        margin: 20px 0 0 30px;
        padding: 7px 0 7px 40px;
        background: url(../../images/map-title-bg.png) no-repeat;
        background-size: cover;
    }

    .china-map {
        flex-grow: 1;
    }
}
</style>