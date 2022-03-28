
<template>
  <el-col :span="12">
    <div :style="[
        { background: id === 3 ? '#e7edf5' : '' },
        { cursor: 'pointer' },
        { width: '100%' },
        { height: '420px' },
      ]"
         @click="log">
      <tip>{{ tipname }}</tip>
      <div ref="canvas1"
           style="height: 400px;" />
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
    id: {
      // 路由类型
      default: null,
      type: Number,
    },
  },
  data () {
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
    drawPolicitalStatus () {
      if (this.policitalStatus.length) {
        switch (this.address) {
          case 1:
            (this.category = [
              "微步",
              "日志管理平台",
              "安全网关",
              "工业网络审计",
              "漏洞扫描",
              "蜜罐",
              "配置核查",
              "主机卫士",
              "数据防泄漏",
              "流量采集"
            ]),
              (this.barData = [
                15, 450, 500, 500, 500, 500, 500, 500, 500, 1033
                // 46000, 44000,
                // 42000,
              ]),
              (this.title = "源IP");
            break;
          case 2:
            (this.category = [
              "日志管理平台",
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
              "日志管理平台",
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
              "日志管理平台",
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
              "日志管理平台",
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
            data: ['200', '400', '600', '800', '1000', '1200'],
            name: '(条)',
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
    log () {
      window.open("http://116.63.139.209:10003/management/eventEcharts", "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
