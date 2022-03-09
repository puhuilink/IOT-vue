
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
      default: "事件类型分布",
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
              { value: 600, name: "访问控制事件" },
              { value: 600, name: "非法外联事件" },
              { value: 800, name: "恶意文件事件", selected: true },
            ]),
              (this.barData = [
                { value: 100, name: "强制访问控制事件" },
                { value: 200, name: "文件保护事件" },
                { value: 300, name: "注册表保护事件" },
                { value: 600, name: "非法外联事件" },
                { value: 800, name: "恶意文件事件" },
              ]),
              (this.title = "源IP");
            break;
          case 2:
            (this.category = [
              { value: 600, name: "访问控制事件" },
              { value: 600, name: "非法外联事件" },
              { value: 600, name: "恶意文件事件", selected: true },
            ]),
              (this.barData = [
                { value: 100, name: "强制访问控制事件" },
                { value: 200, name: "文件保护事件" },
                { value: 300, name: "注册表保护事件" },
                { value: 600, name: "非法外联事件" },
                { value: 600, name: "恶意文件事件" },
              ]),
              (this.title = "源IP");
            break;
          case 3:
            (this.category = [
              { value: 600, name: "访问控制事件" },
              { value: 600, name: "非法外联事件" },
              { value: 600, name: "恶意文件事件", selected: true },
            ]),
              (this.barData = [
                { value: 100, name: "强制访问控制事件" },
                { value: 200, name: "文件保护事件" },
                { value: 300, name: "注册表保护事件" },
                { value: 600, name: "非法外联事件" },
                { value: 600, name: "恶意文件事件" },
              ]),
              (this.title = "源IP");
            break;
          case 4:
            (this.category = [
              { value: 600, name: "访问控制事件" },
              { value: 600, name: "非法外联事件" },
              { value: 600, name: "恶意文件事件", selected: true },
            ]),
              (this.barData = [
                { value: 100, name: "强制访问控制事件" },
                { value: 200, name: "文件保护事件" },
                { value: 300, name: "注册表保护事件" },
                { value: 600, name: "非法外联事件" },
                { value: 600, name: "恶意文件事件" },
              ]),
              (this.title = "源IP");
            break;
          case 5:
            (this.category = [
              { value: 600, name: "访问控制事件" },
              { value: 600, name: "非法外联事件" },
              { value: 600, name: "恶意文件事件", selected: true },
            ]),
              (this.barData = [
                { value: 100, name: "强制访问控制事件" },
                { value: 200, name: "文件保护事件" },
                { value: 300, name: "注册表保护事件" },
                { value: 600, name: "非法外联事件" },
                { value: 600, name: "恶意文件事件" },
              ]),
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
          tooltip: {
            // trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          legend: {
            // data: [
            //   "Direct",
            //   "Marketing",
            //   "Search Engine",
            //   //   "Email",
            //   //   "Union Ads",
            //   //   "Video Ads",
            //   "Baidu",
            //   "Google",
            //   //   "Bing",
            //   //   "Others",
            // ],
          },
          color: ["#5599ff", "#77DDFF", "#00AA00", "#FFC851", "#E63F00"],
          series: [
            {
              name: "Access From",
              type: "pie",
              selectedMode: "single",
              radius: [0, "30%"],
              label: {
                position: "inner",
                fontSize: 14,
              },
              labelLine: {
                show: false,
              },
              data: this.category,
            },
            {
              name: "Access From",
              type: "pie",
              radius: ["45%", "60%"],
              labelLine: {
                length: 30,
              },
              label: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#F6F8FC",
                borderColor: "#8C8D8E",
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: "#6E7079",
                    lineHeight: 22,
                    align: "center",
                  },
                  hr: {
                    borderColor: "#8C8D8E",
                    width: "100%",
                    borderWidth: 1,
                    height: 0,
                  },
                  b: {
                    color: "#4C5058",
                    fontSize: 14,
                    fontWeight: "bold",
                    lineHeight: 33,
                  },
                  per: {
                    color: "#fff",
                    backgroundColor: "#4C5058",
                    padding: [3, 4],
                    borderRadius: 4,
                  },
                },
              },
              data: this.barData,
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
