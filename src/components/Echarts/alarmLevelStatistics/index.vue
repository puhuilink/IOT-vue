
<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div>
      <el-row>
        <el-col :xs="24"
                :sm="5"
                :md="5"
                :lg="5"
                :xl="5"
                offset="2">
          <div class="circularWeakPassword"></div>
          <span class="text">危急</span>
        </el-col>
        <el-col :xs="24"
                :sm="5"
                :md="5"
                :lg="5"
                :xl="5">
          <div class="circularPortScanning"></div>
          <span class="text">高危</span>
        </el-col>
        <el-col :xs="24"
                :sm="5"
                :md="5"
                :lg="5"
                :xl="5">
          <div class="circularInvolvingaTrojan"></div>
          <span class="text">中危</span>
        </el-col>
        <el-col :xs="24"
                :sm="5"
                :md="5"
                :lg="5"
                :xl="5">
          <div class="circularHotlinking"></div>
          <span class="text">低危</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24"
                :sm="5"
                :md="5"
                :lg="5"
                :xl="5"
                offset="2">
          <div class="number">{{ remoteControlTrojan }}</div>
        </el-col>
        <el-col :xs="24"
                :sm="5"
                :md="5"
                :lg="5"
                :xl="5">
          <div class="number">{{ weakPassword }}</div>
        </el-col>
        <el-col :xs="24"
                :sm="5"
                :md="5"
                :lg="5"
                :xl="5">
          <div class="number">{{ portScanning }}</div>
        </el-col>
        <el-col :xs="24"
                :sm="5"
                :md="5"
                :lg="5"
                :xl="5">
          <div class="number">{{ InvolvingaTrojan }}</div>
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
      default: "告警等级统计",
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
      remoteControlTrojan: "290",
      weakPassword: "2366",
      portScanning: "3188",
      InvolvingaTrojan: "2481",
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
            (this.category = [180, 160, 75, 30, 10]),
              // (this.barData = [18, 2, 32, 13, 15]),
              (this.title = "源IP");
            break;
          case 2:
            (this.category = [80, 160, 175, 30, 10]),
              // (this.barData = [18, 12, 2, 3, 8]),
              (this.title = "源IP");
            break;
          case 3:
            (this.category = [180, 160, 75, 30, 10]),
              // (this.barData = [8, 22, 22, 30, 85]),
              (this.title = "源IP");
            break;
          case 4:
            (this.category = [180, 160, 75, 30, 10]),
              // (this.barData = [8, 22, 22, 30, 85]),
              (this.title = "源IP");
            break;
          case 5:
            (this.category = [180, 160, 75, 30, 10]),
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
          color: ["#F73030", "#FF8745", "#F0B144", "#B592E4"],
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              //   ["product", "2015", "2016", "2017"],
              ["02-18", 400, 200, 1500, 2500],
              ["02-19", 1400, 200, 500, 2000],
              ["02-20", 800, 1200, 1000, 3000],
              ["02-21", 400, 2000, 500, 2000],
            ],
          },
          xAxis: { type: "category" },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            { type: "bar" },
            { type: "bar" },
            { type: "bar" },
            { type: "bar" },
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
.circularWeakPassword {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #b592e4;
  display: inline-block;
}
.circularPortScanning {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #f0b144;
  display: inline-block;
}
.circularInvolvingaTrojan {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ff8745;
  display: inline-block;
}
.circularHotlinking {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #f73030;
  display: inline-block;
}
.number {
  color: #333333;
  font-size: 20px;
}
</style>
