
<template>
  <el-col :span="12">
    <div :style="[
        { background: id === 3 ? '#e7edf5' : '' },
        { cursor: 'pointer' },
        { width: '100%' },
        { height: '420px' },
      ]">
      <tip>{{ tipname }}</tip>
      <div class="acquisition"
           @click="log">
        <div class="quantity">{{ quantity }}</div>
        <div class="number">{{ number }}</div>
        <div class="leftBox">
          <div class="bigBox">
            <div class="boxContentleftBox">
              {{ network }}
            </div>
            <div class="boxContentRightBox">
              37290
            </div>
          </div>

          <div class="bigBox">
            <div class="boxContentleftBox">
              {{ fwqrz }}
            </div>
            <div class="boxContentRightBox">
              300
            </div>
          </div>

          <div class="bigBox">
            <div class="boxContentleftBox">
              {{ networkLirz }}
            </div>
            <div class="boxContentRightBox">
              49
            </div>
          </div>
          <div class="bigBox">
            <div class="boxContentleftBox">
              {{ safe }}
            </div>
            <div class="boxContentRightBox">
              360
            </div>
          </div>

          <div class="bigBox">
            <div class="boxContentleftBox">
              {{ middle }}
            </div>
            <div class="boxContentRightBox">
              186
            </div>
          </div>
          <div class="bigBox">
            <div class="boxContentleftBox">
              {{ datadaily }}
            </div>
            <div class="boxContentRightBox">
              218
            </div>
          </div>
          <div class="bigBox">
            <div class="boxContentleftBox">
              {{ ldnumber }}
            </div>
            <div class="boxContentRightBox">
              59
            </div>
          </div>
          <div class="bigBox">
            <div class="boxContentleftBox">
              {{ safeEquiment }}
            </div>
            <div class="boxContentRightBox">
              198
            </div>
          </div>
          <div class="bigBox">
            <div class="boxContentleftBox">
              {{ networkDaily }}
            </div>
            <div class="boxContentRightBox">
              39
            </div>
          </div>
          <div class="bigBox">
            <div class="boxContentleftBox">
              {{ networkEquimentDaily }}
            </div>
            <div class="boxContentRightBox">
              135
            </div>
          </div>
        </div>
        <div class="datails">
          <div class="bigBoxDetails">
            <div class="boxContentleft">
              {{ IT }}
            </div>
            <div class="boxContentRight">
              10000
            </div>
          </div>
          <div class="bigBoxDetails">
            <div class="boxContentleft">
              {{ ITdata }}
            </div>
            <div class="boxContentRight">
              925
            </div>
          </div>
          <div class="bigBoxDetails">
            <div class="boxContentleft">
              {{ OT }}
            </div>
            <div class="boxContentRight">
              216
            </div>
          </div>
          <div class="bigBoxDetails">
            <div class="boxContentleft">
              {{ OTdata }}
            </div>
            <div class="boxContentRight">
              0
            </div>
          </div>
          <div class="bigBoxDetails">
            <div class="boxContentleft">
              {{ ITdaily }}
            </div>
            <div class="boxContentRight">
              67
            </div>
          </div>

          <div class="bigBoxDetails">
            <div class="boxContentleft">
              {{ OTdaily }}
            </div>
            <div class="boxContentRight">
              119
            </div>
          </div>
          <div class="bigBoxDetails">
            <div class="boxContentleft">
              {{ ITdailyData }}
            </div>
            <div class="boxContentRight">
              2
            </div>
          </div>
          <div class="bigBoxDetails">
            <div class="boxContentleft">
              {{ OTdailyData }}
            </div>
            <div class="boxContentRight">
              247
            </div>
          </div>
          <div class="bigBoxDetails">
            <div class="boxContentleft">
              {{ user }}
            </div>
            <div class="boxContentRight">
              1401
            </div>
          </div>
          <div class="bigBoxDetails">
            <div class="boxContentleft">
              {{ OTuser }}
            </div>
            <div class="boxContentRight">
              23
            </div>
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
  data () {
    return {
      quantity: "采集器个数",
      number: "108",
      network: "资产数",
      fwqrz: "僵木蠕事件",
      networkLirz: "配置核查",
      safe: "异常行为事件",
      middle: "入侵诱捕",
      datadaily: "审计协议事件",
      ldnumber: "漏洞数",
      safeEquiment: "数据安全事件",
      networkDaily: "弱口令",
      networkEquimentDaily: "主机安全事件",
      IT: "IT资产数",
      ITdata: "OT资产数",
      OT: "OT配置核查",
      OTdata: "IT配置核查",
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
    // this.drawPolicitalStatus();
  },
  methods: {
    log () {
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
  width: 654px;
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
    left: 62px;
    font-size: 48px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
  }
  .leftBox {
    position: absolute;
    top: 20px;
    left: 290px;
    .bigBox {
      height: 30px;
      width: 120px;
      .boxContentleftBox {
        float: left;
        font-size: 12px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #402165;
        line-height: 32px;
        text-align: left;
      }
      .boxContentRightBox {
        float: right;
        font-size: 12px;
        line-height: 32px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #402165;
      }
    }
    .boxContent {
      font-size: 12px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #402165;
      line-height: 32px;
    }
  }
  .datails {
    position: absolute;
    top: 20px;
    left: 495px;
    .bigBoxDetails {
      height: 30px;
      width: 100px;
      .boxContentleft {
        float: left;
        font-size: 12px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #0e6ccb;
        line-height: 32px;
        // text-align: left;
      }
      .boxContentRight {
        float: right;
        font-size: 12px;
        line-height: 32px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #0e6ccb;
      }
    }
  }
}
</style>
