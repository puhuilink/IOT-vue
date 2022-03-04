
<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import { setNotopt } from "@/utils/emptyEcharts.js";
import tip from "@/components/EchartsTip";
import echarts from "echarts";
export default {
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "杀伤链阶段统计",
      type: String,
    },
  },
  data() {
    return {
      policitalStatus: ["1"],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.drawPolicitalStatus();
  },
  methods: {
    drawPolicitalStatus() {
      if (this.policitalStatus.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1);
        const hours = [
          "01-20",
          "01-21",
          "01-22",
          "01-23",
          "01-24",
          "01-25",
          "01-26",
        ];
        // prettier-ignore
        const days = [  '侦察跟踪','武器构建','荷载投递','突防利用','安装植入','通信控制','达成目标'];
        // prettier-ignore
        const data = [[0, 0, 5], [0, 1, 5], [0, 2, 5], [0, 3, 5], [0, 4, 5], [0, 5, 5], [0, 6, 5],  [1, 0, 4], [1, 1,4], [1, 2, 4], [1, 3, 4], [1, 4, 4], [1, 5,4], [1, 6, 4],  [2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0],  [3, 0, 5], [3, 1, 5], [3, 2, 5], [3, 3, 5], [3, 4, 5], [3, 5, 5], [3, 6, 5],  [4, 0, 6], [4, 1, 6], [4, 2, 6], [4, 3, 6], [4, 4, 6], [4, 5, 6], [4, 6, 6],  [5, 0, 9], [5, 1, 9], [5, 2, 9], [5, 3, 9], [5, 4, 9], [5, 5, 9], [5, 6, 9], [6, 0, 2], [6, 1, 2], [6, 2, 2], [6, 3, 2], [6, 4, 2], [6, 5, 2], [6, 6, 2]]
    .map(function (item) {
    return [item[1], item[0], item[2]];
});
        // 绘制图表
        myChart.setOption({
          color: ["#ADD8E6"],
          title: {
            text: "Punch Card of Github",
          },
          legend: {
            data: ["Punch Card"],
            left: "right",
          },
          tooltip: {
            position: "top",
            formatter: function (params) {
              return (
                params.value[2] +
                " commits in " +
                hours[params.value[0]] +
                " of " +
                days[params.value[1]]
              );
            },
          },
          grid: {
            left: 2,
            bottom: 10,
            right: 10,
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: hours,
            boundaryGap: false,
            splitLine: {
              show: true,
            },
            axisLine: {
              show: false,
            },
          },
          yAxis: {
            type: "category",
            data: days,
            axisLine: {
              show: false,
            },
          },
          series: [
            {
              name: "Punch Card",
              type: "scatter",
              symbolSize: function (val) {
                return val[2] * 2;
              },
              data: data,
              animationDelay: function (idx) {
                return idx * 5;
              },
            },
          ],
        });
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      } else {
        const myChart = this.$echarts.init(this.$refs.canvas1);
        this.$refs.canvas1.removeAttribute("_echarts_instance_");
        return setNotopt(myChart, "暂无数据");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
