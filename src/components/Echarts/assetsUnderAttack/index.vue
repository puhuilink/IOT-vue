
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
import { TopAssetsUnderAttack } from '@/api/system/echarts'
export default {
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "受攻击的资产TOP5",
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
        //       "192.168.199.20(结算系统)",
        //       "192.168.1.240(打卡系统)",
        //       "192.168.199.55(邮件系统)",
        //       "192.168.1.84(财务系统)",
        //       "192.168.1.243(OA系统)",
        //     ]),
        //       (this.barData = [18, 2, 32, 13, 15]),
        //       (this.title = "源IP");
        //     break;
        //   case 2:
        //     (this.category = [
        //       "192.168.199.20(结算系统)",
        //       "192.168.1.240(打卡系统)",
        //       "192.168.199.55(邮件系统)",
        //       "192.168.1.84(财务系统)",
        //       "192.168.1.243(OA系统)",
        //     ]),
        //       (this.barData = [18, 12, 2, 3, 8]),
        //       (this.title = "源IP");
        //     break;
        //   case 3:
        //     (this.category = [
        //       "192.168.199.20(结算系统)",
        //       "192.168.1.240(打卡系统)",
        //       "192.168.199.55(邮件系统)",
        //       "192.168.1.84(财务系统)",
        //       "192.168.1.243(OA系统)",
        //     ]),
        //       (this.barData = [8, 22, 22, 30, 85]),
        //       (this.title = "源IP");
        //     break;
        //   case 4:
        //     (this.category = [
        //       "192.168.199.20(结算系统)",
        //       "192.168.1.240(打卡系统)",
        //       "192.168.199.55(邮件系统)",
        //       "192.168.1.84(财务系统)",
        //       "192.168.1.243(OA系统)",
        //     ]),
        //       (this.barData = [8, 22, 22, 30, 85]),
        //       (this.title = "源IP");
        //     break;
        //   case 5:
        //     (this.category = [
        //       "192.168.199.20(结算系统)",
        //       "192.168.1.240(打卡系统)",
        //       "192.168.199.55(邮件系统)",
        //       "192.168.1.84(财务系统)",
        //       "192.168.1.243(OA系统)",
        //     ]),
        //       (this.barData = [8, 22, 22, 30, 85]),
        //       (this.title = "源IP");
        //     break;
        //   default:
        //     console.log("无数据", this.type);
        //     break;
        // }
        // 基于准备好的dom，初始化echarts实例
        const { data } = await TopAssetsUnderAttack()
        this.category = ["全端口感知沙箱", "WINSERVER2008", "高敏沙箱"]
        this.barData = [10, 7, 11]
        // this.category = data
        console.log('this.category-3-22-top5', this.category)
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
          color: ["#FFC0CB"],
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
              barWidth: 30, //柱图宽度
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
