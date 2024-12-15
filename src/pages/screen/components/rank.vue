<script setup lang='ts' name='rank'>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts';

const bar = ref();
let information = {
    color: ["#FF992B", "#718AFF"],
    area: ["广东省", "江苏省", "上海市", "山东省", "浙江省", "江西省"],
    dataArray: [48281, 13604, 11198, 10849, 9576, 8645],
};
let mycharts: any;

onMounted(() => {
    //初始化echarts实例
    mycharts = echarts.init(bar.value);
    //设置配置项
    mycharts.setOption({
        tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(9,40,84,0.8)",
            borderColor: "rgba(9,40,84,0.8)",
            textStyle: {
                fontSize: 15,
                color: "#fff",
            },
            axisPointer: {
                type: "shadow",
            },
            formatter: function (params: any) {
                return (
                    params[0].name +
                    "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-weight:bold;'>" +
                    params[0].value +
                    "</span>"
                );
            },
        },
        grid: {
            top: "0%",
            left: "10%",
            right: "5%",
            bottom: "0%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "value",
                show: false,
            },
        ],
        yAxis: [
            {
                type: "category",
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                inverse: true,
                data: information.area,
                axisLabel: {
                    margin: 10,
                    formatter: (name: string, index: number) => {
                        const id = index + 1;
                        if (id < 4) {
                            return `{rank${id}|${id}}{nameStyle|${name}}`;
                        } else {
                            return `{rank|${id}}{nameStyle|${name}}`;
                        }
                    },
                    rich: {
                        nameStyle: {
                            padding: [0, 10, 0, 36],
                            fontSize: 14,
                            color: '#fff',
                        },
                        rank1: {
                            width: 30,
                            height: 25,
                            padding: [5, 0, 2, 0],
                            align: 'center',
                            backgroundColor: 'rgba(255, 174, 0, 1)',
                            color: '#ffffff',
                            fontSize: 20,
                        },
                        rank2: {
                            width: 30,
                            height: 25,
                            padding: [5, 0, 2, 0],
                            align: 'center',
                            backgroundColor: 'rgba(183, 206, 255, 1)',
                            color: '#ffffff',
                            fontSize: 20,
                        },
                        rank3: {
                            width: 30,
                            height: 25,
                            padding: [5, 0, 2, 0],
                            align: 'center',
                            backgroundColor: 'rgba(226, 134, 88, 1)',
                            color: '#ffffff',
                            fontSize: 20,
                        },
                        rank: {
                            width: 30,
                            height: 25,
                            padding: [5, 0, 2, 0],
                            align: 'center',
                            backgroundColor: '#2379FF',
                            color: '#ffffff',
                            fontSize: 20,
                        }
                    },
                },
            },
            {
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                    color: "#fff",
                    fontSize: 14,
                    margin: 20,
                },
                data: information.dataArray,
            },
        ],
        series: [
            {
                type: "bar",
                barWidth: 10, // 柱子宽度
                MaxSize: 0,
                showBackground: true,
                backgroundStyle: {
                    color: "#D1DFE4",
                },
                data: information.dataArray.map((item, index) => {
                    return {
                        value: item,
                        itemStyle: {
                            borderRadius: [0, 0, 20, 0],  // 上左、上右、下左、下右的圆角
                            color: index == 0 ? information.color[0] : information.color[1],
                        },
                    };
                }),
            },
        ],
    })
})

onUnmounted(() => {
    mycharts.dispose();
})
</script>

<template>
    <div class="rank">
        <div class="title">热门景区排行</div>
        <img src="../images/dataScreen-title.png" alt="">
        <div class="table-header">
            <div style="flex: 1;">排名</div>
            <div style="flex: 1;">景区</div>
            <div style="flex: 3; text-align:left">预约数量</div>
        </div>
        <div ref="bar" style="height: 240px"></div>
    </div>
</template>

<style scoped lang="scss">
.rank {
    height: 342px;
    margin-top: 10px;
    background: url(../images/dataScreen-main-rt.png) no-repeat;
    background-size: cover;

    .title {
        font-size: 20px;
    }

    .table-header {
        margin: 20px 10px 10px 10px;
        height: 36px;
        background: url(../images/rankingChart-bg.png) no-repeat;
        background-size: cover;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        align-content: center;
        color: orange
    }
}
</style>