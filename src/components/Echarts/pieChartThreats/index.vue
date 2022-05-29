
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
      default: "事件等级分布",
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
              { value: 1348, name: "漏洞利用(3948)" },
              { value: 335, name: "可疑行为(2514)" },
              { value: 580, name: "APT攻击(1699)" },
              { value: 484, name: "恶意主机(1023)" },
              { value: 300, name: "DOS攻击(362)" },
            ]),
              // (this.barData = [18, 2, 32, 13, 15]),
              (this.title = "源IP");
            break;
          case 2:
            (this.category = [
              { value: 348, name: "漏洞利用(3948)" },
              { value: 1335, name: "可疑行为(2514)" },
              { value: 380, name: "APT攻击(1699)" },
              { value: 284, name: "恶意主机(1023)" },
              { value: 100, name: "DOS攻击(362)" },
            ]),
              // (this.barData = [18, 12, 2, 3, 8]),
              (this.title = "源IP");
            break;
          case 3:
            (this.category = [
              { value: 1348, name: "漏洞利用(3948)" },
              { value: 335, name: "可疑行为(2514)" },
              { value: 580, name: "APT攻击(1699)" },
              { value: 484, name: "恶意主机(1023)" },
              { value: 300, name: "DOS攻击(362)" },
            ]),
              // (this.barData = [8, 22, 22, 30, 85]),
              (this.title = "源IP");
            break;
          case 4:
            (this.category = [
              { value: 1348, name: "漏洞利用(3948)" },
              { value: 335, name: "可疑行为(2514)" },
              { value: 580, name: "APT攻击(1699)" },
              { value: 484, name: "恶意主机(1023)" },
              { value: 300, name: "DOS攻击(362)" },
            ]),
              // (this.barData = [8, 22, 22, 30, 85]),
              (this.title = "源IP");
            break;
          case 5:
            (this.category = [
              { value: 1348, name: "漏洞利用(3948)" },
              { value: 335, name: "可疑行为(2514)" },
              { value: 580, name: "APT攻击(1699)" },
              { value: 484, name: "恶意主机(1023)" },
              { value: 300, name: "DOS攻击(362)" },
            ]),
              // (this.barData = [8, 22, 22, 30, 85]),
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
            // text: 'Referer of a Website',
            // subtext: 'Fake Data',
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "right",
            //  data:this.opinion
          },
          color: ["#5599ff", "#77DDFF", "#00AA00", "#FFC851", "#E63F00"],
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: this.category,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
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
        return setNotopt(myChart, "最近七天无数据");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
