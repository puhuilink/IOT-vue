
<template>
  <el-col :span="12">
    <div class="dataAccess">
      <tip>{{ tipname }}</tip>
      <div ref="canvas1" style="height: 400px" />
    </div>
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
      default: "数据源TOP10",
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
            (this.category = [
              "日志平台管理",
              "漏洞扫描",
              "配置核查",
              "主机卫士",
              "统一管理平台",
              "NDR",
              "NDLP",
              "蜜罐",
              "微步",
              "安全网关",
            ]),
              (this.barData = [
                70000, 60000, 55000, 53000, 52000, 50000, 48000, 46000, 44000,
                42000,
              ]),
              (this.title = "源IP");
            break;
          case 2:
            (this.category = [
              "日志平台管理",
              "漏洞扫描",
              "配置核查",
              "主机卫士",
              "统一管理平台",
              "NDR",
              "NDLP",
              "蜜罐",
              "微步",
              "安全网关",
            ]),
              (this.barData = [18, 12, 2, 3, 8]),
              (this.title = "源IP");
            break;
          case 3:
            (this.category = [
              "日志平台管理",
              "漏洞扫描",
              "配置核查",
              "主机卫士",
              "统一管理平台",
              "NDR",
              "NDLP",
              "蜜罐",
              "微步",
              "安全网关",
            ]),
              (this.barData = [8, 22, 22, 30, 85]),
              (this.title = "源IP");
            break;
          case 4:
            (this.category = [
              "日志平台管理",
              "漏洞扫描",
              "配置核查",
              "主机卫士",
              "统一管理平台",
              "NDR",
              "NDLP",
              "蜜罐",
              "微步",
              "安全网关",
            ]),
              (this.barData = [8, 22, 22, 30, 85]),
              (this.title = "源IP");
            break;
          case 5:
            (this.category = [
              "日志平台管理",
              "漏洞扫描",
              "配置核查",
              "主机卫士",
              "统一管理平台",
              "NDR",
              "NDLP",
              "蜜罐",
              "微步",
              "安全网关",
            ]),
              (this.barData = [8, 22, 22, 30, 85]),
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
          // title: {
          //   text: "World Population",
          // },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {},
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          color: ["#1E90FF "],
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: "category",
            data: this.category,
          },
          series: [
            {
              // name: "2011",
              type: "bar",
              data: this.barData,
              barWidth: 10, //柱图宽度
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
// .dataAccess {
//   width: 100%;
//   height: 385px;
//   background-color: #e7edf5;
// }
</style>
