<template>
  <el-col :span="12">
    <!-- <tip>{{ tipname }}</tip> -->
    <div>
      <el-row>
        <el-col :xs="24"
                :sm="4"
                :md="4"
                :lg="4"
                :xl="4"
                :offset="2">
          <div class="backStyle"
               @click="logToThreat">
            <div class="textThreat">威胁情报</div>
            <div class="number">234</div>
            <div class="numberText">事件数</div>
            <div class="numberDisposal">201</div>
            <div class="disposal">处置数</div>
            <div class="notDisposalNumber">33</div>
            <div class="notDisposal">未处置数</div>
          </div>
        </el-col>
        <el-col :xs="24"
                :sm="4"
                :md="4"
                :lg="4"
                :xl="4">
          <div class="backStyle"
               @click="logToData">
            <div class="text">数据</div>
            <div class="textTwo">安全防护</div>
            <div class="number">198</div>
            <div class="numberText">事件数</div>
            <div class="numberDisposal">170</div>
            <div class="disposal">处置数</div>
            <div class="notDisposalNumber">28</div>
            <div class="notDisposal">未处置数</div>
          </div>
        </el-col>
        <el-col :xs="24"
                :sm="4"
                :md="4"
                :lg="4"
                :xl="4">
          <div class="backStyle"
               @click="logToUnNormal">
            <div class="text">异常</div>
            <div class="textTwo">行为分析</div>
            <div class="number">239</div>
            <div class="numberText">事件数</div>
            <div class="numberDisposal">205</div>
            <div class="disposal">处置数</div>
            <div class="notDisposalNumber">34</div>
            <div class="notDisposal">未处置数</div>
          </div>
        </el-col>
        <el-col :xs="24"
                :sm="4"
                :md="4"
                :lg="4"
                :xl="4">
          <div class="backStyle"
               @click="logToHost">
            <div class="text">主机</div>
            <div class="textTwo">安全防护</div>
            <div class="number">135</div>
            <div class="numberText">事件数</div>
            <div class="numberDisposal">116</div>
            <div class="disposal">处置数</div>
            <div class="notDisposalNumber">19</div>
            <div class="notDisposal">未处置数</div>
          </div>
        </el-col>
        <el-col :xs="24"
                :sm="4"
                :md="4"
                :lg="4"
                :xl="4">
          <div class="backStyle"
               @click="logToNetwork">
            <div class="textThree">工业网络</div>
            <div class="textTwo">安全审计</div>
            <div class="number">218</div>
            <div class="numberText">事件数</div>
            <div class="numberDisposal">187</div>
            <div class="disposal">处置数</div>
            <div class="notDisposalNumber">31</div>
            <div class="notDisposal">未处置数</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24"
                :sm="4"
                :md="4"
                :lg="4"
                :xl="4"
                :offset="2">
          <div class="backStyle"
               @click="logToWeak">
            <div class="textSecond">弱口令监测</div>
            <div class="number">23</div>
            <div class="numberText">事件数</div>
            <div class="numberDisposal">19</div>
            <div class="disposal">处置数</div>
            <div class="notDisposalNumber">4</div>
            <div class="notDisposal">未处置数</div>
          </div>
        </el-col>
        <el-col :xs="24"
                :sm="4"
                :md="4"
                :lg="4"
                :xl="4">
          <div class="backStyle"
               @click="logToInvade">
            <div class="textFour">入侵诱捕</div>
            <div class="number">186</div>
            <div class="numberText">事件数</div>
            <div class="numberDisposal">160</div>
            <div class="disposal">处置数</div>
            <div class="notDisposalNumber">26</div>
            <div class="notDisposal">未处置数</div>
          </div>
        </el-col>
        <el-col :xs="24"
                :sm="4"
                :md="4"
                :lg="4"
                :xl="4">
          <div class="backStyle"
               @click="logToConfiguration">
            <div class="textFour">配置核查</div>
            <div class="number">216</div>
            <div class="numberText">事件数</div>
            <div class="numberDisposal">185</div>
            <div class="disposal">处置数</div>
            <div class="notDisposalNumber">31</div>
            <div class="notDisposal">未处置数</div>
          </div>
        </el-col>
        <el-col :xs="24"
                :sm="4"
                :md="4"
                :lg="4"
                :xl="4">
          <div class="backStyle"
               @click="logToJ">
            <div class="textSecond">僵木蠕监测</div>
            <div class="number">200</div>
            <div class="numberText">事件数</div>
            <div class="numberDisposal">172</div>
            <div class="disposal">处置数</div>
            <div class="notDisposalNumber">28</div>
            <div class="notDisposal">未处置数</div>
          </div>
        </el-col>
        <el-col :xs="24"
                :sm="4"
                :md="4"
                :lg="4"
                :xl="4">
          <div class="backStyle"
               @click="logToVulnerability">
            <div class="textFour">漏洞扫描</div>
            <div class="number">247</div>
            <div class="numberText">事件数</div>
            <div class="numberDisposal">212</div>
            <div class="disposal">处置数</div>
            <div class="notDisposalNumber">35</div>
            <div class="notDisposal">未处置数</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-col>
</template>
<script>
import { setNotopt } from '@/utils/emptyEcharts.js'
import tip from '@/components/EchartsTip'
export default {
  components: { tip },
  //   props: {
  //     tipname: { // tip内容
  //       default: '生产网安全防护',
  //       type: String
  //     },
  //     address: { // 厂家内容
  //       default: null,
  //       type: Number
  //     }
  //   },
  data () {
    return {
      policitalStatus: ['1'],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: []
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    logToThreat () {
      window.open('http://116.63.139.209:10003/security/threatIntelligenceManagement/threatIntelligenceList', '_blank')
    },
    logToData () {
      window.open('http://116.63.139.209:10003/security/dataSafe/echarts', '_blank')
    },
    logToUnNormal () {
      window.open('http://116.63.139.209:10003/security/abnormalBehaviorManagement/eventStatisticalAnalysis', '_blank')
    },
    logToHost () {
      window.open('http://116.63.139.209:10003/security/hostSecurityManagement/eventStatisticalAnalysis', '_blank')
    },
    logToNetwork () {
      window.open('http://116.63.139.209:10003/industrialNetworkAudit/industrialNetworkAuditStatisticalAnalysis', '_blank')
    },
    logToWeak () {
      window.open('http://116.63.139.209:10003/security/weakpassword/analysis', '_blank')
    },
    logToInvade () {
      window.open('http://116.63.139.209:10003/security/invasionOfTrap/statisticalSnalysis', '_blank')
    },
    logToConfiguration () {
      window.open('http://116.63.139.209:10003/security/inspect', '_blank')
    },
    logToJ () {
      window.open('http://116.63.139.209:10003/security/Jiangwoodcreep/echarts', '_blank')
    },
    logToVulnerability () {
      window.open('http://116.63.139.209:10003/security/vulnerability/vulnerability/echarts', '_blank')
    }

  }
}
</script>
<style lang="scss" scoped>
.backStyle {
  margin-top: 20px;
  width: 110px;
  height: 250px;
  background: url("../../../assets/logo/box_bk.png") no-repeat !important;
  position: relative;
  .textThreat {
    top: 16px;
    left: 26px;
    position: absolute;
    font-size: 14px;
    font-family: MicrosoftYaHeiUI-Bold, MicrosoftYaHeiUI;
    font-weight: bold;
    color: #2f6699;
  }
  .text {
    top: 6px;
    left: 40px;
    position: absolute;
    font-size: 14px;
    font-family: MicrosoftYaHeiUI-Bold, MicrosoftYaHeiUI;
    font-weight: bold;
    color: #2f6699;
  }
  .textThree {
    top: 6px;
    left: 26px;
    position: absolute;
    font-size: 14px;
    font-family: MicrosoftYaHeiUI-Bold, MicrosoftYaHeiUI;
    font-weight: bold;
    color: #2f6699;
  }
  .textTwo {
    top: 26px;
    left: 26px;
    position: absolute;
    font-size: 14px;
    font-family: MicrosoftYaHeiUI-Bold, MicrosoftYaHeiUI;
    font-weight: bold;
    color: #2f6699;
  }
  .textSecond {
    top: 16px;
    left: 20px;
    text-align: center;
    position: absolute;
    font-size: 14px;
    font-family: MicrosoftYaHeiUI-Bold, MicrosoftYaHeiUI;
    font-weight: bold;
    color: #2f6699;
  }
  .number {
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    top: 66px;
    left: 35px;
    position: absolute;
  }
  .notDisposalNumber {
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    top: 190px;
    left: 35px;
    position: absolute;
  }
  .notDisposal {
    font-size: 12px;
    font-family: MicrosoftYaHeiUI;
    color: #8766b2;
    top: 210px;
    left: 32px;
    position: absolute;
  }
  .numberText {
    top: 86px;
    left: 35px;
    position: absolute;
    font-size: 12px;
    font-family: MicrosoftYaHeiUI;
    color: #1890ff;
  }
  .numberDisposal {
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    top: 126px;
    left: 35px;
    position: absolute;
  }
  .disposal {
    top: 146px;
    left: 35px;
    position: absolute;
    font-size: 12px;
    font-family: MicrosoftYaHeiUI;
    color: #107373;
  }
  .textFour {
    top: 16px;
    left: 30px;
    text-align: center;
    position: absolute;
    font-size: 14px;
    font-family: MicrosoftYaHeiUI-Bold, MicrosoftYaHeiUI;
    font-weight: bold;
    color: #2f6699;
  }
}
</style>
