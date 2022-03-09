
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
      default: "探测事件/入侵事件趋势",
      type: String,
    },
    address: {
      // 厂家内容
      default: null,
      type: Number,
    },
  },
  data() {
    return {
      policitalStatus: ["1"],
      barData: [],
      category: [],
      title: "",
    };
  },
  computed: {},
  watch: {
    address: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.drawPolicitalStatus();
        }
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    this.drawPolicitalStatus();
  },
  methods: {
    drawPolicitalStatus() {
      if (this.policitalStatus.length) {
        switch (this.address) {
          case 1:
            (this.category = ["", 0, 0, 0, 0, 6, 10, 0]),
              (this.barData = ["", 0, 0, 0, 0, 6, 2, 0]),
              (this.title = "源IP");
            break;
          case 2:
            (this.category = ["", 0, 0, 10, 0, 6, 11, 0]),
              (this.barData = ["", 0, 0, 0, 0, 6, 9, 0]),
              (this.title = "源IP");
            break;
          case 3:
            (this.category = ["", 0, 0, 0, 0, 6, 12, 0]),
              (this.barData = ["", 0, 0, 0, 0, 6, 17, 0]),
              (this.title = "源IP");
            break;
          case 4:
            (this.category = ["", 0, 0, 0, 0, 6, 13, 0]),
              (this.barData = ["", 0, 0, 0, 0, 6, 18, 0]),
              (this.title = "源IP");
            break;
          case 5:
            (this.category = ["", 0, 0, 0, 0, 6, 14, 0]),
              (this.barData = ["", 0, 0, 0, 0, 5, 19, 0]),
              (this.title = "源IP");
            break;
          default:
            console.log("无数据", this.type);
            break;
        }
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1);

        // 绘制图表
        myChart.setOption({
          title: {
            // text: "Stacked Area Chart",
          },
          color: ["#FFC0CB", "#00BBFF"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          legend: {
            data: [
              // "Email",
              // "Union Ads",
              "Video Ads",
              "Direct",
              // "Search Engine",
            ],
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: [
                "12/12",
                "12/13",
                "12/14",
                "12/15",
                "12/16",
                "12/17",
                "12/18",
                "12/19",
                "12/20",
              ],
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            // {
            //   name: "Email",
            //   type: "line",
            //   stack: "Total",
            //   areaStyle: {},
            //   emphasis: {
            //     focus: "series",
            //   },
            //   data: [120, 132, 101, 134, 90, 230, 210],
            // },
            // {
            //   name: "Union Ads",
            //   type: "line",
            //   stack: "Total",
            //   areaStyle: {},
            //   emphasis: {
            //     focus: "series",
            //   },
            //   data: [220, 182, 191, 234, 290, 330, 310],
            // },
            {
              name: "探测",
              type: "line",
              stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
              data: this.category,
            },
            {
              name: "入侵",
              type: "line",
              stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
              data: this.barData,
            },
            // {
            //   name: "Search Engine",
            //   type: "line",
            //   stack: "Total",
            //   label: {
            //     show: true,
            //     position: "top",
            //   },
            //   areaStyle: {},
            //   emphasis: {
            //     focus: "series",
            //   },
            //   data: [820, 932, 901, 934, 1290, 1330, 1320],
            // },
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
