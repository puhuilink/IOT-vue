
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
      default: "杀伤链阶段流量统计",
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

        // 绘制图表
        myChart.setOption({
          // color: ["#FFC0CB"],
          title: {
            // text: "Stacked Line",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: [
              "侦察跟踪",
              "武器构建",
              "载荷投递",
              "漏洞利用",
              "安装植入",
              "命令控制",
              "目标达成",
            ],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [
              "2022/02/01",
              "2022/02/02",
              "2022/02/03",
              "2022/02/04",
              "2022/02/05",
              "2022/02/06",
              "2022/02/07",
              "",
            ],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "侦察跟踪",
              type: "line",
              stack: "Total",
              data: [750, 350, 250, 780, 150, 1000, 800],
            },
            {
              name: "武器构建",
              type: "line",
              // stack: "Total",
              data: [580, 280, 100, 560, 50, 900, 760],
            },
            {
              name: "载荷投递",
              type: "line",
              // stack: "Total",
              data: [420, 600, 50, 500, 200, 750, 1180],
            },
            {
              name: "漏洞利用",
              type: "line",
              // stack: "Total",
              data: [300, 500, 500, 350, 200, 600, 0],
            },
            {
              name: "安装植入",
              type: "line",
              // stack: "Total",
              data: [820, 932, 901, 934, 290, 1030, 1120],
            },
            {
              name: "命令控制",
              type: "line",
              // stack: "Total",
              data: [230, 220, 580, 220, 700, 200, 1100],
            },
            {
              name: "目标达成",
              type: "line",
              // stack: "Total",
              data: [110, 100, 800, 350, 700, 650, 450],
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
