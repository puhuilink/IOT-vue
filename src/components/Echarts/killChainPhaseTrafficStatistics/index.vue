
<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1"
         style="height: 400px" />
  </el-col>
</template>
<script>
import { setNotopt } from "@/utils/emptyEcharts.js";
import tip from "@/components/EchartsTip";
import echarts from "echarts";
import { KillChain } from '@/api/system/echarts'
export default {
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "杀伤链阶段流量统计",
      type: String,
    },
    address: {
      // 厂家内容
      default: null,
      type: Number,
    },
  },
  data () {
    return {
      policitalStatus: ["1"],
      barData: [],
      category: [],
      categoryThree: [],
      categoryFour: [],
      categorySix: [],
      categorySeven: [],
      title: "",
    };
  },
  computed: {},
  watch: {
    address: {
      handler (val, oldVal) {
        if (val !== oldVal) {
          this.drawPolicitalStatus();
        }
      },
      deep: true,
    },
  },
  created () { },
  mounted () {
    this.drawPolicitalStatus();
  },
  methods: {
    async drawPolicitalStatus () {
      if (this.policitalStatus.length) {
        switch (this.address) {
          case 1:
            (this.category = [750, 350, 250, 780, 150, 1000, 800]),
              (this.barData = [580, 280, 100, 560, 50, 900, 760]),
              (this.categoryThree = [420, 600, 50, 500, 200, 750, 580]),
              // (this.barData = [580, 280, 100, 560, 50, 900, 760]),
              (this.categoryFour = [300, 500, 500, 350, 200, 600, 100]),
              (this.categoryFive = [820, 932, 901, 934, 290, 1030, 1120]),
              (this.categorySix = [(230, 220, 580, 220, 700, 200, 1100)]),
              (this.categorySeven = [(110, 100, 800, 350, 700, 650, 450)]);
            // (this.title = "源IP")
            break;
          case 2:
            (this.category = [150, 650, 250, 780, 150, 1000, 200]),
              (this.barData = [550, 350, 750, 780, 150, 1000, 100]),
              (this.categoryThree = [220, 300, 50, 500, 200, 750, 680]),
              (this.categoryFour = [100, 600, 500, 350, 200, 600, 330]),
              (this.categoryFive = [820, 932, 901, 934, 290, 1030, 120]),
              (this.categorySix = [(510, 300, 800, 350, 700, 650, 450)]),
              (this.categorySeven = [(310, 500, 800, 350, 700, 650, 450)]);
            // (this.title = "源IP")

            break;
          case 3:
            (this.category = [550, 750, 250, 780, 150, 1000, 800]),
              (this.barData = [580, 280, 100, 560, 50, 900, 760]),
              (this.categoryThree = [420, 600, 50, 500, 200, 750, 1180]),
              (this.categoryFour = [100, 600, 500, 350, 200, 600, 0]),
              (this.categoryFive = [820, 932, 901, 934, 290, 1030, 1120]),
              (this.categorySix = [(230, 220, 580, 220, 700, 200, 1100)]),
              (this.categorySeven = [(110, 100, 800, 350, 700, 650, 450)]);
            // (this.title = "源IP")
            break;
          case 4:
            (this.category = [350, 150, 250, 780, 150, 1000, 800]),
              (this.barData = [580, 280, 100, 560, 50, 900, 760]),
              (this.categoryThree = [420, 600, 50, 500, 200, 750, 1180]),
              (this.categoryFour = [100, 600, 500, 350, 200, 600, 0]),
              (this.categoryFive = [820, 932, 901, 934, 290, 1030, 1120]),
              (this.categorySix = [(230, 220, 580, 220, 700, 200, 1100)]),
              (this.categorySeven = [(110, 100, 800, 350, 700, 650, 450)]);
            // (this.title = "源IP")

            break;
          case 5:
            (this.category = [450, 50, 650, 780, 150, 1000, 800]),
              (this.barData = [580, 280, 100, 560, 50, 900, 760]),
              (this.categoryThree = [420, 600, 50, 500, 200, 750, 1180]),
              (this.categoryFour = [100, 600, 500, 350, 200, 600, 0]),
              (this.categoryFive = [820, 932, 901, 934, 290, 1030, 1120]),
              (this.categorySix = [(230, 220, 580, 220, 700, 200, 1100)]),
              (this.categorySeven = [(110, 100, 800, 350, 700, 650, 450)]);
            // (this.title = "源IP")
            break;
          default:
            console.log("无数据", this.type);
            break;
        }
        // 基于准备好的dom，初始化echarts实例
        // const { data } = await KillChain()
        // this.category = [450, 50, 650, 780, 150, 1000, 800],
        //   this.barData = [580, 280, 100, 560, 50, 900, 760],
        //   this.categoryThree = [420, 600, 50, 500, 200, 750, 580],
        //   this.categoryFour = [300, 500, 500, 350, 200, 600, 100],
        //   this.categoryFive = [820, 932, 901, 934, 290, 1030, 1120],
        //   this.categorySix = [(230, 220, 580, 220, 700, 200, 1100)],
        //   this.categorySeven = [(110, 100, 800, 350, 700, 650, 450)];
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
              data: this.category,
            },
            {
              name: "武器构建",
              type: "line",
              // stack: "Total",
              data: this.barData,
            },
            {
              name: "载荷投递",
              type: "line",
              // stack: "Total",
              data: this.categoryThree,
            },
            {
              name: "漏洞利用",
              type: "line",
              // stack: "Total",
              data: this.categoryFour,
            },
            {
              name: "安装植入",
              type: "line",
              // stack: "Total",
              data: this.categoryFive,
            },
            {
              name: "命令控制",
              type: "line",
              // stack: "Total",
              data: this.categorySix,
            },
            {
              name: "目标达成",
              type: "line",
              // stack: "Total",
              data: this.categorySeven,
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
