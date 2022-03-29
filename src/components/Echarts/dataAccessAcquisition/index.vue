
<template>
  <el-col :span="12">
    <div :style="[
        { background: (id === 1 ?'#e7edf5':'') },
        { cursor: 'pointer' },
        { width: '100%' },
        { height: '385px' },
      ]">
      <tip>{{ tipname }}</tip>

      <div class="acquisition">
        <div class="quantity">{{ quantity }}</div>
        <div class="number">{{ number }}</div>
        <div class="unit">{{ unit }}</div>
      </div>
      <div class="datails">
        <div class="boxContent">
          <span class="name">{{ IT }}</span>
          <span class="dataIT">{{ ITdata }}</span>
        </div>
        <div class="boxContent">
          <span class="name">{{ OT }}</span>
          <span class="dataIT">{{ OTdata }}</span>
        </div>
        <div class="boxContent"
             @click="log">
          <span class="name">{{ ITdaily }}</span>
          <span class="dataIT">{{ ITdailyData }}</span>
        </div>
        <div class="boxContent"
             @click="logToBigScreen">
          <span class="name">{{ OTdaily }}</span>
          <span class="dataIT">{{ OTdailyData }}</span>
        </div>
      </div>
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
      default: "数据接入采集",
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
      quantity: "日志接入量",
      number: "956.19",
      unit: "[亿]",
      IT: "IT流量",
      ITdata: "209.31G",
      OTdata: "1.61G",
      OT: "OT流量",
      ITdaily: "IT日志接入量",
      OTdaily: "OT日志接入量",
      ITdailyData: "956.13亿",
      OTdailyData: "6877956",
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
  created () {
    console.log('id:', this.id)
  },
  mounted () {
    // this.drawPolicitalStatus();
  },
  methods: {
    log () {
      window.open("https://10.201.30.40/dashboard", "_blank");
    },
    logToBigScreen () {
      window.open("http://116.63.139.209:10003/bigScreen/overallSecurityPosture", "_blank");
    }
  },
};
</script>
<style lang="scss" scoped>
// width: 100%;
// height: 385px;
// background-color: #e7edf5;
.acquisition {
  position: relative;
  float: left;
  height: 292px;
  width: 292px;
  background: url("../../../assets/logo/circle_bk.png") no-repeat !important;
  margin-left: 40px;
  margin-top: 30px;
  .quantity {
    position: absolute;
    top: 80px;
    left: 83px;
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: #333333;
  }
  .number {
    position: absolute;
    top: 110px;
    left: 70px;
    font-size: 48px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
  }
  .unit {
    font-size: 24px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #333333;
    position: absolute;
    top: 170px;
    left: 120px;
  }
}
.datails {
  margin-top: 40px;
  float: right;
  padding-right: 60px;
  .boxContent {
    background: url("../../../assets/logo/textBK_blue.png") no-repeat !important;
    width: 334px;
    height: 60px;
    line-height: 60px;
    margin-bottom: 10px;
    .name {
      float: left;
      margin-left: 20px;
      font-size: 20px;
      font-family: MicrosoftYaHei;
      color: #158cc6;
    }
    .dataIT {
      float: right;
      margin-right: 20px;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
    }
  }
}
</style>
