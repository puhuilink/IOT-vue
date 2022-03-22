
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
import { EventStatusDispositionDiagram } from '@/api/system/echarts'
import { EventTypeDistribution } from '@/api/system/echarts'
import { EventLevelDistribution } from '@/api/system/echarts'
import { abnormalEventLevelDistribution } from '@/api/system/echarts'
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
    // 主机安全-事件类型分布
    EventTypeDistribution: {
      default: null,
      type: Number,
    },
    // 入侵诱捕-事件等级分布
    attack: {
      default: null,
      type: Number,
    },
    //异常行为管理-事件等级分布
    abnormal: {
      default: null,
      type: Number,
    }
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
    async drawPolicitalStatus () {
      if (this.policitalStatus.length) {
        // switch (this.address) {
        //   case 1:
        //     (this.category = [
        //       { value: 1348, name: "不处置(3948)" },
        //       { value: 335, name: "处置中(2514)" },
        //       { value: 580, name: "已处置(1699)" },
        //       { value: 484, name: "误报(1023)" },
        //       { value: 300, name: "待处置(362)" },
        //     ]),
        //       // (this.barData = [18, 2, 32, 13, 15]),
        //       (this.title = "源IP");
        //     break;
        //   case 2:
        //     (this.category = [
        //       { value: 348, name: "不处置(3948)" },
        //       { value: 1335, name: "处置中(2514)" },
        //       { value: 580, name: "已处置(1699)" },
        //       { value: 484, name: "误报(1023)" },
        //       { value: 300, name: "待处置(362)" },
        //     ]),
        //       // (this.barData = [18, 12, 2, 3, 8]),
        //       (this.title = "源IP");
        //     break;
        //   case 3:
        //     (this.category = [
        //       { value: 1348, name: "不处置(3948)" },
        //       { value: 335, name: "处置中(2514)" },
        //       { value: 580, name: "已处置(1699)" },
        //       { value: 484, name: "误报(1023)" },
        //       { value: 300, name: "待处置(362)" },
        //     ]),
        //       // (this.barData = [8, 22, 22, 30, 85]),
        //       (this.title = "源IP");
        //     break;
        //   case 4:
        //     (this.category = [
        //       { value: 1348, name: "不处置(3948)" },
        //       { value: 335, name: "处置中(2514)" },
        //       { value: 580, name: "已处置(1699)" },
        //       { value: 484, name: "误报(1023)" },
        //       { value: 300, name: "待处置(362)" },
        //     ]),
        //       // (this.barData = [8, 22, 22, 30, 85]),
        //       (this.title = "源IP");
        //     break;
        //   case 5:
        //     (this.category = [
        //       { value: 1348, name: "不处置(3948)" },
        //       { value: 335, name: "处置中(2514)" },
        //       { value: 580, name: "已处置(1699)" },
        //       { value: 484, name: "误报(1023)" },
        //       { value: 300, name: "待处置(362)" },
        //     ]),
        //       // (this.barData = [8, 22, 22, 30, 85]),
        //       (this.title = "源IP");
        //     break;
        //   default:
        //     console.log("无数据", this.type);
        //     break;
        // }
        // 基于准备好的dom，初始化echarts实例
        if (this.EventTypeDistribution === 1) {
          const { data } = await EventTypeDistribution()
          this.category = [{ "name": "主机卫士非法外联告警(22)", "value": 5 }, { "name": "恶意文件事件告警(30)", "value": 2 }, { "name": "访问控制告警(10)", "value": 2 }, { "name": "外设告警(8)", "value": 8 }, { "name": "程序告警(7)", "value": 3 }]
          // this.category = data
          console.log('this.category-3-22', this.category)
        } else if (this.attack === 1) {
          const { data } = await EventLevelDistribution()
          this.category = [{ "name": "4", "value": 13 }, { "name": "3", "value": 15 }]
          // this.category = data
          // console.log('this.category-3-22', this.category)
        }
        else if (this.abnormal === 1) {
          const { data } = await abnormalEventLevelDistribution()
          this.category = [{ "name": "Exploits and Attacks", "value": 8 }, { "name": "Scanning", "value": 10 }, { "name": "Suspicious", "value": 3 }, { "name": "URL_malware", "value": 1 }, { "name": "APT", "value": 2 }]
          // this.category = data
          // console.log('this.category-3-22', this.category)
        }
        else {
          const { data } = await EventStatusDispositionDiagram()
          this.category = [{ "name": "待处置", "value": 20 }]
          // this.category = data
          console.log('this.category-3-22', this.category)
        }

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
        return setNotopt(myChart, "暂无数据");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
