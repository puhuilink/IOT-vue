
<template>
  <el-col :span="12">
    <div
      :style="[
        { background: id === 3 ? '#e7edf5' : '' },
        { cursor: 'pointer' },
        { width: '100%' },
        { height: '420px' },
      ]"
    >
      <tip>{{ tipname }}</tip>
      <div class="acquisition" @click="log">
        <div class="quantity">{{ quantity }}</div>
        <div class="number">{{ number }}</div>
        <div class="leftBox">
          <div class="boxContent">
            <span class="name">{{ network }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ fwqrz }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ networkLirz }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ safe }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ middle }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ datadaily }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ ldnumber }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ safeEquiment }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ networkDaily }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ networkEquimentDaily }}</span>
          </div>
        </div>
        <div class="datails">
          <div class="boxContent">
            <span class="name">{{ IT }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ ITdata }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ OT }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ OTdata }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ ITdaily }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ ITdailyData }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ OTdaily }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ OTdailyData }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ user }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ OTuser }}</span>
          </div>
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
      default: "数据汇聚管理",
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
  data() {
    return {
      quantity: "采集器个数",
      number: "31",
      network: "资产数",
      fwqrz: "僵木蠕事件",
      networkLirz: "配置核查",
      safe: "异常行为事件",
      middle: "入侵诱捕",
      datadaily: "审计协议事件",
      ldnumber: "漏洞数",
      safeEquiment: "数据安全事件",
      networkDaily: "弱口令",
      networkEquimentDaily: "资产数",
      IT: "IT资产数",
      ITdata: "OT资产数",
      OTdata: "IT配置核查",
      OT: "OT配置核查",
      ITdaily: "入侵事件",
      OTdaily: "探测事件",
      ITdailyData: "IT漏洞数",
      OTdailyData: "OT漏洞数",
      user: "IT弱口令",
      OTuser: "OT弱口令",
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
    // this.drawPolicitalStatus();
  },
  methods: {
    log() {
      window.open("https://10.201.30.40/search", "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.acquisition {
  position: relative;
  background: url("../../../assets/logo/treeBK_01.png") no-repeat !important;
  height: 358px;
  width: 624px;
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 20px;
  font-size: 24px;
  .quantity {
    position: absolute;
    top: 130px;
    left: 50px;
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: #333333;
  }
  .number {
    position: absolute;
    top: 160px;
    left: 78px;
    font-size: 48px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
  }
  .datails {
    position: absolute;
    top: 20px;
    left: 495px;
    // margin-top: 10px;
    // float: right;
    // padding-right: 100px;
    .boxContent {
      font-size: 12px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #0e6ccb;
      line-height: 32px;
      // width: 200px;
      // height: 30px;
      // line-height: 30px;
      // text-align: left;
      // // border: 1px solid #1f8fff;
      // margin-bottom: 10px;
      // border-radius: 50px;
      // border-top: none;
      // border-bottom: none;
      .name {
        float: left;
        // margin-left: 20px;
      }
      .dataIT {
        float: right;
        // margin-right: 20px;
      }
    }
  }
  .leftBox {
    position: absolute;
    top: 20px;
    left: 270px;
    // margin-top: 10px;
    // float: left;
    padding-right: 20px;
    .boxContent {
      font-size: 12px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #402165;
      // width: 130px;
      // height: 30px;
      line-height: 32px;
      text-align: left;
      // border: 1px solid #1f8fff;
      // margin-bottom: 40px;
      // border-radius: 50px;
      // border-top: none;
      // border-bottom: none;
      .name {
        float: left;
        margin-left: 20px;
      }
      .dataIT {
        float: right;
        margin-right: 20px;
      }
    }
  }
}
</style>
