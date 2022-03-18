<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div>
      <el-row>
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" offset="2">
          <div class="item">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="circularWeakPassword"></div>
              <span class="text">低危(2514)</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="circularPortScanning"></div>
              <span class="text">高危(468)</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="circularInvolvingaTrojan"></div>
              <span class="text">中危(1699)</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="circularHotlinking"></div>
              <span class="text">危机(13)</span>
            </el-col>
          </div>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <div ref="canvas1" style="height: 66px"
        /></el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="tip">
            <div class="total">总数</div>
            <div class="totalNumber">{{ total }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="title">攻击者TOP5</div>
    <barEchartsTwo :tipname="'攻击者TOP5统计'" :address="address" />
  </el-col>
</template>
<script>
import { setNotopt } from "@/utils/emptyEcharts.js";
import tip from "@/components/EchartsTip";
import barEchartsTwo from "@/components/Echarts/barEchartsTwo";
export default {
  components: { tip, barEchartsTwo },
  props: {
    tipname: {
      // tip内容
      default: "命中IOC告警统计",
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
      total: "20000",
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
            this.data1 = [
              { value: 1048 },
              { value: 735 },
              { value: 580 },
              { value: 484 },
            ];
            break;
          case 2:
            this.data1 = [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
            ];
            break;
          case 3:
            this.data1 = [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
            ];
            break;
          case 4:
            this.data1 = [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
            ];
            break;
          case 5:
            this.data1 = [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
            ];
            break;
          case 6:
            this.data1 = [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
            ];
            break;
          default:
            console.log("无数据", this.type);
            break;
        }
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1);
        // 绘制图表
        myChart.setOption({
          //   tooltip: {
          //     trigger: "item",
          //   },
          legend: {
            top: "5%",
            left: "center",
          },
          color: ["#b592e4", "#f0b144", "#ff8745", "#f73030"],
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  //   show: true,
                  fontSize: "40",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: this.data1,
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
.total {
  width: 28px;
  height: 19px;
  font-size: 14px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #555555;
  line-height: 19px;
}
.totalNumber {
  width: 58px;
  height: 24px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 24px;
}
.tip {
  border-left: 4px solid #d8d8d8;
  border-radius: 3px;
  font-weight: bold;
  height: 50px;
  padding: 2px;
  padding-left: 12px;
  margin-top: 10px;
}
.item {
  margin-top: 10px;
}
.title {
  width: 81px;
  height: 14px;
  font-size: 14px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #555555;
  line-height: 14px;
  margin-left: 80px;
  margin-top: 10px;
}
</style>
