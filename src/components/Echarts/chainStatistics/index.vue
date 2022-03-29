
<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div>
      <el-row>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3"
                offset="1">
          <span class="text">侦查跟踪</span>
        </el-col>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3">
          <span class="text">武器构建</span>
        </el-col>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3">
          <span class="text">载荷投递</span>
        </el-col>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3">
          <span class="text">突防利用</span>
        </el-col>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3">
          <span class="text">安装植入</span>
        </el-col>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3">
          <span class="text">通信控制</span>
        </el-col>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3">
          <span class="text">达成目标</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3"
                offset="1">
          <div class="number">{{ remoteControlTrojan }}</div>
        </el-col>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3">
          <div class="number">{{ remoteControlTrojan1 }}</div>
        </el-col>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3">
          <div class="number">{{ remoteControlTrojan2 }}</div>
        </el-col>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3">
          <div class="number">{{ remoteControlTrojan3 }}</div>
        </el-col>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3">
          <div class="number">{{ remoteControlTrojan4 }}</div>
        </el-col>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3">
          <div class="number">{{ remoteControlTrojan5 }}</div>
        </el-col>
        <el-col :xs="24"
                :sm="3"
                :md="3"
                :lg="3"
                :xl="3">
          <div class="number">{{ remoteControlTrojan6 }}</div>
        </el-col>
      </el-row>
    </div>
    <div ref="canvas1"
         style="height: 400px" />
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
      default: "攻击链阶段统计",
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
      remoteControlTrojan: "2373",
      remoteControlTrojan1: "0",
      remoteControlTrojan2: "0",
      remoteControlTrojan3: "2999",
      remoteControlTrojan4: "0",
      remoteControlTrojan5: "2177",
      remoteControlTrojan6: "0",
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
              [0, 0, 5],
              [0, 1, 5],
              [0, 2, 5],
              [0, 3, 5],
              [0, 4, 5],
              [0, 5, 5],
              [0, 6, 5],
              [1, 0, 4],
              [1, 1, 4],
              [1, 2, 4],
              [1, 3, 4],
              [1, 4, 4],
              [1, 5, 4],
              [1, 6, 4],
              [2, 0, 7],
              [2, 1, 7],
              [2, 2, 7],
              [2, 3, 7],
              [2, 4, 7],
              [2, 5, 7],
              [2, 6, 7],
              [3, 0, 9],
              [3, 1, 9],
              [3, 2, 9],
              [3, 3, 9],
              [3, 4, 9],
              [3, 5, 9],
              [3, 6, 9],
              [4, 0, 1],
              [4, 1, 1],
              [4, 2, 1],
              [4, 3, 1],
              [4, 4, 1],
              [4, 5, 1],
              [4, 6, 1],
              [5, 0, 3],
              [5, 1, 3],
              [5, 2, 3],
              [5, 3, 3],
              [5, 4, 3],
              [5, 5, 3],
              [5, 6, 3],
              [6, 0, 9],
              [6, 1, 9],
              [6, 2, 9],
              [6, 3, 9],
              [6, 4, 9],
              [6, 5, 9],
              [6, 6, 9],
            ].map(function (item) {
              return [item[1], item[0], item[2]];
            })),
              // (this.barData = [18, 2, 32, 13, 15]),
              (this.title = "源IP");
            break;
          case 2:
            (this.category = [
              [0, 0, 1],
              [0, 1, 1],
              [0, 2, 1],
              [0, 3, 1],
              [0, 4, 1],
              [0, 5, 1],
              [0, 6, 1],
              [1, 0, 1],
              [1, 1, 1],
              [1, 2, 4],
              [1, 3, 4],
              [1, 4, 4],
              [1, 5, 4],
              [1, 6, 4],
              [2, 0, 0],
              [2, 1, 0],
              [2, 2, 0],
              [2, 3, 0],
              [2, 4, 0],
              [2, 5, 0],
              [2, 6, 0],
              [3, 0, 5],
              [3, 1, 5],
              [3, 2, 5],
              [3, 3, 5],
              [3, 4, 5],
              [3, 5, 5],
              [3, 6, 5],
              [4, 0, 6],
              [4, 1, 6],
              [4, 2, 6],
              [4, 3, 6],
              [4, 4, 6],
              [4, 5, 6],
              [4, 6, 6],
              [5, 0, 9],
              [5, 1, 9],
              [5, 2, 9],
              [5, 3, 9],
              [5, 4, 9],
              [5, 5, 9],
              [5, 6, 9],
              [6, 0, 2],
              [6, 1, 2],
              [6, 2, 2],
              [6, 3, 2],
              [6, 4, 2],
              [6, 5, 2],
              [6, 6, 2],
            ].map(function (item) {
              return [item[1], item[0], item[2]];
            })),
              // (this.barData = [18, 12, 2, 3, 8]),
              (this.title = "源IP");
            break;
          case 3:
            (this.category = [
              { value: 1348, name: "低" },
              { value: 335, name: "极低" },
              { value: 580, name: "中" },
              { value: 484, name: "高" },
              { value: 300, name: "致命" },
            ]),
              // (this.barData = [8, 22, 22, 30, 85]),
              (this.title = "源IP");
            break;
          case 4:
            (this.category = [
              { value: 1348, name: "低" },
              { value: 335, name: "极低" },
              { value: 580, name: "中" },
              { value: 484, name: "高" },
              { value: 300, name: "致命" },
            ]),
              // (this.barData = [8, 22, 22, 30, 85]),
              (this.title = "源IP");
            break;
          case 5:
            (this.category = [
              { value: 1348, name: "低" },
              { value: 335, name: "极低" },
              { value: 580, name: "中" },
              { value: 484, name: "高" },
              { value: 300, name: "致命" },
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
        const days = ['侦察跟踪', '武器构建', '荷载投递', '突防利用', '安装植入', '通信控制', '达成目标'];
        // prettier-ignore
        //         const data = [[0, 0, 5], [0, 1, 5], [0, 2, 5], [0, 3, 5], [0, 4, 5], [0, 5, 5], [0, 6, 5],  [1, 0, 4], [1, 1,4], [1, 2, 4], [1, 3, 4], [1, 4, 4], [1, 5,4], [1, 6, 4],  [2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0],  [3, 0, 5], [3, 1, 5], [3, 2, 5], [3, 3, 5], [3, 4, 5], [3, 5, 5], [3, 6, 5],  [4, 0, 6], [4, 1, 6], [4, 2, 6], [4, 3, 6], [4, 4, 6], [4, 5, 6], [4, 6, 6],  [5, 0, 9], [5, 1, 9], [5, 2, 9], [5, 3, 9], [5, 4, 9], [5, 5, 9], [5, 6, 9], [6, 0, 2], [6, 1, 2], [6, 2, 2], [6, 3, 2], [6, 4, 2], [6, 5, 2], [6, 6, 2]]
        //     .map(function (item) {
        //     return [item[1], item[0], item[2]];
        // });
        // 绘制图表
        myChart.setOption({
          color: ["#ADD8E6"],
          title: {
            // text: "Punch Card of Github",
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
              //   name: "Punch Card",
              type: "scatter",
              symbolSize: function (val) {
                return val[2] * 2;
              },
              data: this.category,
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
.text {
  width: 48px;
  height: 12px;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: rgba(51, 51, 51, 0.6);
  line-height: 12px;
}
.number {
  color: #333333;
  font-size: 20px;
}
</style>
