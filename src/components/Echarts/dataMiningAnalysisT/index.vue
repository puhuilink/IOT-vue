
<template>
  <el-col :span="12">
    <div class="dataAccess">
      <tip>{{ tipname }}</tip>
      <div class="acquisition">
        <div class="leftBox" @click="log">
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
            <span class="name">{{ safeEquiment }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ networkDaily }}</span>
          </div>
          <div class="boxContent">
            <span class="name">{{ networkEquimentDaily }}</span>
          </div>
        </div>
        <div class="quantity">{{ quantity }}</div>
        <div class="number">{{ number }}</div>
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
      default: "数据挖掘分析",
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
      quantity: "日志",
      number: "类型",
      network: "网路告警",
      fwqrz: "服务器日志",
      networkLirz: "网络流量日志",
      safe: "云安全日志",
      middle: "中间件日志",
      datadaily: "数据库日志",
      safeEquiment: "安全设备日志",
      networkDaily: "网络日志",
      networkEquimentDaily: "网络设备日志",
      IT: "流量分析日志",
      ITdata: "用户行为日志",
      OTdata: "入侵监测日志",
      OT: "漏洞数据",
      ITdaily: "工业协议审计日志",
      OTdaily: "威胁情报日志",
      ITdailyData: "防病毒日志",
      OTdailyData: "终端安全管理系统日志",
      user: "用户行为日志",
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
      window.open(
        "https://10.201.30.43:8988/noah/access/collector-manager",
        "_blank"
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.dataAccess {
  width: 100%;
  height: 385px;
  background-color: #e7edf5;
  .acquisition {
    position: relative;
    // display: inline-block;
    // float: left;
    height: 344px;
    width: 607px;
    // border-radius: 107.5px;
    background: url("../../../assets/logo/treeBK_02.png") no-repeat !important;
    // border: 10px solid #1f8fff;
    // margin-left: 20px;
    margin-top: 20px;
    font-size: 24px;
    .quantity {
      position: absolute;
      top: 130px;
      left: 280px;
      font-size: 24px;
      font-family: MicrosoftYaHei;
      color: #333333;
    }
    .number {
      position: absolute;
      top: 160px;
      left: 280px;
      font-size: 24px;
      font-family: MicrosoftYaHei;
      color: #333333;
    }
  }
  .datails {
    position: absolute;
    top: -3px;
    left: 463px;
    .boxContent {
      font-size: 12px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #402165;
      height: 20px;
      line-height: 30px;
      text-align: left;
      margin-bottom: 20px;
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
  .leftBox {
    position: absolute;
    top: -3px;
    left: -3px;
    .boxContent {
      font-size: 12px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #402165;
      height: 20px;
      line-height: 30px;
      text-align: left;
      margin-bottom: 20px;
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
