<!-- 年龄比例 -->
<script setup lang='ts' name='age'>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const pie = ref();

const data = [
    { value: 350, name: "玉川冶炼厂" },
    { value: 200, name: "冶炼一厂" },
    { value: 500, name: "动力厂" },
    { value: 136, name: "再生铅厂" },
    { value: 650, name: "综合回收厂" },
    { value: 650, name: "贵冶厂" },
    { value: 650, name: "直炼厂" },
    { value: 650, name: "熔炼厂" },
    { value: 650, name: "精炼厂" },
    { value: 650, name: "原料厂" },
    { value: 650, name: "其他" },
];

let sum = data.reduce(
    (accumulator, current) => accumulator + current.value, 0);

let mycharts: any;
onMounted(() => {
    //初始化echarts实例
    mycharts = echarts.init(pie.value);
    //设置配置项
    mycharts.setOption({
        color: [
            "#C5AB0E",
            "#3B82F6",
            "#00FAFF",
            "#6236FF",
            "#B396DD",
            "#FFB77C",
            "#BDA29A",
            "#EC4899",
            "#546570",
            "#6366F1",
            "#6E7074",
        ],
        legend: {
            type: "scroll",
            pageIconSize: 14,
            pageButtonItemGap: 1,
            left: "55%",
            orient: "vertical",
            top: "25%",
            icon: "roundRect",
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 20,
            formatter: function (name: string) {
                for (var i = 0; i < data.length; i++) {
                    if (name == data[i].name) {
                        const rate = ((data[i].value / sum) * 100).toFixed(0);
                        return `{a|${name}} {b|${rate}%} {c|${data[i].value}}`;
                    }
                }
            },
            textStyle: {
                color: "#FFF",
                fontSize: 13,
                rich: {
                    a: {
                        width: 70,
                    },
                    b: {
                        width: 30,
                    },
                    c: {
                        width: 50,
                    },
                },
            },
        },
        tooltip: {
            backgroundColor: "#2e6099",
            textStyle: {
                color: "#FFF",
            },
        },
        series: [
            {
                name: "产量比例",
                type: "pie",
                radius: ["40%", "60%"],
                center: ["30%", "55%"],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: "bold",
                        color: '#fff'
                    },
                },
                labelLine: {
                    show: false,
                },
                data: data,
            },
        ],
    })
})

onUnmounted(() => {
    mycharts.dispose();
})
</script>

<template>
    <div class="age">
        <div class="title">产量比例</div>
        <img src="../images/dataScreen-title.png" alt="">
        <div style="height: 260px" ref="pie"></div>
    </div>
</template>

<style scoped lang="scss">
.age {
    flex: 1;
    background: url(../images/dataScreen-main-lc.png) no-repeat;
    background-size: cover;

    .title {
        font-size: 20px;
    }
}
</style>