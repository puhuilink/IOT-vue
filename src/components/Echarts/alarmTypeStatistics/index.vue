<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div>
      <el-row>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4" :offset="2">
          <div class="circular"></div>
          <span class="text">远控木马</span>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="circularWeakPassword"></div>
          <span class="text">弱口令</span>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="circularPortScanning"></div>
          <span class="text">端口扫描</span>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="circularInvolvingaTrojan"></div>
          <span class="text">窃密木马</span>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="circularHotlinking"></div>
          <span class="text">盗链</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4" :offset="2">
          <div class="number">{{ remoteControlTrojan }}</div>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="number">{{ weakPassword }}</div>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="number">{{ portScanning }}</div>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="number">
            {{ InvolvingaTrojan }}
          </div>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="number">{{ hotlinking }}</div>
        </el-col>
      </el-row>
    </div>
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import { setNotopt } from "@/utils/emptyEcharts.js";
import tip from "@/components/EchartsTip";
export default {
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "告警类型统计",
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
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      remoteControlTrojan: "3786",
      weakPassword: "2926",
      portScanning: "1516",
      InvolvingaTrojan: "1493",
      hotlinking: "1249",
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
            this.data1 = [200, 200, 200, 2500, 90, 230, 210];
            this.data2 = [200, 200, 200, 200, 290, 11, 310];
            this.data3 = [200, 200, 200, 200, 950, 111, 310];
            this.data4 = [200, 200, 200, 200, 390, 101, 810];
            this.data5 = [200, 200, 200, 200, 200, 200, 200];
            break;
          case 2:
            this.data1 = [140, 232, 141, 634, 90, 230, 210];
            this.data2 = [74, 472, 791, 274, 390, 11, 310];
            this.data3 = [24, 102, 491, 204, 211, 11, 310];
            this.data4 = [35, 782, 391, 184, 230, 11, 310];
            this.data5 = [14, 582, 81, 24, 280, 11, 310];
            break;
          case 3:
            this.data1 = [30, 432, 1101, 534, 120, 230, 210];
            this.data2 = [74, 182, 291, 344, 2140, 11, 310];
            this.data3 = [20, 152, 301, 124, 90, 230, 210];
            this.data4 = [25, 422, 451, 374, 380, 11, 310];
            this.data5 = [12, 572, 111, 244, 620, 11, 310];
            break;
          case 4:
            this.data1 = [140, 1302, 171, 134, 100, 230, 210];
            this.data2 = [154, 1168, 255, 789, 1155, 2100, 2200];
            this.data3 = [150, 192, 141, 434, 20, 230, 1210];
            this.data4 = [74, 282, 131, 334, 1030, 11, 310];
            this.data5 = [35, 172, 201, 534, 790, 11, 380];
            break;
          case 5:
            this.data1 = [140, 182, 301, 734, 90, 230, 210];
            this.data2 = [34, 165, 468, 155, 1289, 2449, 4100];
            this.data3 = [120, 122, 151, 254, 90, 230, 210];
            this.data4 = [70, 482, 132, 414, 290, 11, 340];
            this.data5 = [20, 382, 171, 232, 290, 11, 310];
            break;
          case 6:
            this.data1 = [142, 182, 311, 734, 910, 230, 210];
            this.data2 = [34, 165, 438, 155, 1689, 2449, 400];
            this.data3 = [120, 122, 151, 254, 90, 230, 210];
            this.data4 = [70, 492, 122, 414, 290, 11, 340];
            this.data5 = [20, 382, 171, 230, 290, 11, 710];
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
            trigger: "axis",
          },
          legend: {
            data: ["极低", "低危", "中危", "高危", "致命"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          color: ["#1890ff", "#b592e4", "#f0b144", "#ff8745", "#f73030"],
          xAxis: {
            type: "category",
            axisTick: {
              // x轴刻度线
              show: false,
            },
            data: [
              "2022/2/18",
              "2022/2/19",
              "2022/2/20",
              "2022/2/21",
              "2022/2/22",
              "2022/2/23",
              "2022/2/24",
            ],
          },
          yAxis: {
            axisTick: {
              // x轴刻度线
              show: false,
            },
            type: "value",
            axisLine: { show: false },
          },
          series: [
            {
              // name: "极低",
              type: "line",
              smooth: true,
              data: this.data1,
            },
            {
              // name: "低危",
              type: "line",
              smooth: true,
              data: this.data2,
            },
            {
              // name: "中危",
              type: "line",
              smooth: true,
              data: this.data3,
            },
            {
              // name: "高危",
              type: "line",
              smooth: true,
              data: this.data4,
            },
            {
              // name: "致命",
              type: "line",
              smooth: true,
              data: this.data5,
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
.circular {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #1890ff;
  display: inline-block;
}
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
.text {
  color: #333333;
  font-size: 12px;
}
.number {
  color: #333333;
  font-size: 20px;
}
</style>
