<script setup lang='ts' name='order'>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';

const radar = ref();
const areaData = [
    {
        name: '闯红灯',
        max: 1000,
        value: 350,
    },
    {
        name: '逆行',
        max: 1000,
        value: 500,
    },
    {
        name: '占用机动车道',
        max: 1000,
        value: 200,
    },
    {
        name: '超载',
        max: 1000,
        value: 250,
    },
    {
        name: '未戴安全头盔',
        max: 1000,
        value: 500,
    },
    {
        name: '加装伞具',
        max: 1000,
        value: 702,
    },
];
let values: number[] = [];
areaData.forEach((item) => {
    values.push(item.value);
});
let maxValue = Math.max(...values); //获取数组中最大的值
// 向上取整十，整百，整千，整万的方法
function ceilNumber(number: number) {
    let bite = 0;
    if (number < 10) {
        return 10;
    }
    while (number >= 10) {
        number /= 10;
        bite += 1;
    }
    return Math.ceil(number) * Math.pow(10, bite);
}
let allMax = ceilNumber(maxValue); //将最大的值进行向上取整
areaData.forEach((item) => {
    item.max = allMax;
});
let data1 = [0, 0, 0, 0, 0, 0];
let data2 = [0, 0, 0, 0, 0, 0];
let data3 = [0, 0, 0, 0, 0, 0];
let data4 = [0, 0, 0, 0, 0, 0];
let data5 = [0, 0, 0, 0, 0, 0];
let data6 = [0, 0, 0, 0, 0, 0];
data1[0] = values[0];
data2[1] = values[1];
data3[2] = values[2];
data4[3] = values[3];
data5[4] = values[4];
data6[5] = values[5];

let mycharts: any;

onMounted(() => {
    //初始化echarts实例
    mycharts = echarts.init(radar.value);
    //设置配置项
    mycharts.setOption({
        color: ['#2E64FF', '#F0D418', '#FF9B42', '#FF6B6B', '#8E42FF', '#00e4ff'],
        legend: {
            orient: 'vertical',
            top: '80px',
            left: '10px',
            textStyle: {
                color: '#fff',
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params: any) {
                return params.name + ': ' + params.value + '辆';
            },
        },
        radar: {
            zlevel: 11,
            shape: 'circle',
            scale: true,
            indicator: areaData,
            center: ['65%', '55%'],
            radius: '60%',
            axisNameGap: '0',
            startAngle: 90,
            axisName: {
                show: false,
                color: 'red',
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(32,126,255, .5)',
                },
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(32,126,255, .5)',
                },
            },
            splitArea: {
                areaStyle: {
                    color: 'rgba(32,126,255, 0.1)',
                },
            },
        },
        polar: {
            radius: '60%',
            center: ['65%', '55%'],
        },
        angleAxis: {
            zlevel: 0,
            min: 0,
            max: 360,
            axisLabel: {
                show: false,
            },
            splitLine: {
                show: false,
            },
        },
        radiusAxis: {
            zlevel: 0,
            min: 0,
            max: allMax,
            axisLabel: {
                color: 'rgba(29,208,240,.5)',
            },
            splitLine: {
                show: false,
            },
        },
        series: [
            {
                type: 'radar',
                symbolSize: 8,
                symbol: 'circle',
                tooltip: {
                    trigger: 'none',
                },
                label: {
                    show: true,
                    formatter: function (params: any) {
                        if (params.value !== 0) {
                            return params.value + '辆';
                        } else {
                            return '';
                        }
                    },
                    color: '#ffffff',
                    fontSize: 12,
                    distance: 0,
                },
                areaStyle: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(32,126,255, 0.5)', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(32,126,255, 0.1)', // 100% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    },
                },
                data: [
                    {
                        value: values,
                    },
                    {
                        value: data1,
                        itemStyle: {
                            color: '#2e64ff',
                        },
                        lineStyle: {
                            color: 'transparent', //设置折线的颜色
                        },
                    },
                    {
                        value: data2,
                        itemStyle: {
                            color: '#f0d418',
                        },
                        lineStyle: {
                            color: 'transparent', //设置折线的颜色
                        },
                    },
                    {
                        value: data3,
                        itemStyle: {
                            color: '#ff9b42',
                        },
                        lineStyle: {
                            color: 'transparent', //设置折线的颜色
                        },
                    },
                    {
                        value: data4,
                        itemStyle: {
                            color: '#ff6b6b',
                        },
                        lineStyle: {
                            color: 'transparent', //设置折线的颜色
                        },
                    },
                    {
                        value: data5,
                        itemStyle: {
                            color: '#8e42ff',
                        },
                        lineStyle: {
                            color: 'transparent', //设置折线的颜色
                        },
                    },
                    {
                        value: data6,
                        itemStyle: {
                            color: '#00e4ff',
                        },
                        lineStyle: {
                            color: 'transparent', //设置折线的颜色
                        },
                    },
                    {
                        value: [0, 0, 0, 0, 0, 0],
                        // name: '违章占比',
                        symbolSize: 13,
                        itemStyle: {
                            color: 'rgba(40, 97, 132)',
                        },
                    },
                ],
                zlevel: 20,
                z: 4,
            },
            {
                type: 'pie',
                startAngle: 90,
                clockwise: false, //逆时针
                center: ['65%', '55%'],
                data: areaData.map((item) => {
                    return {
                        name: item.name,
                        value: item.value,
                    };
                }),
                radius: ['65%', '85%'],
                zlevel: -1,
                label: {
                    show: false
                },
            },
        ]
    })
})

onUnmounted(() => {
    mycharts.dispose();
})
</script>

<template>
    <div class="order">
        <div class="title">违法行为数据统计</div>
        <img src="../images/dataScreen-title.png" alt="">
        <div ref="radar" style="height: calc(100% - 36px);"></div>
    </div>
</template>

<style scoped lang="scss">
.order {
    height: 309px;
    background: url(../images/dataScreen-main-rb.png) no-repeat;
    background-size: cover;

    .title {
        font-size: 20px;
    }
}
</style>