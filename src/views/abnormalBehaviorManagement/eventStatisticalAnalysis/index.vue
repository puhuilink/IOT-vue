<template>
  <div class="app-container">
    <echarts :event-type="2"
             @getquery="uploadData" />
    <eventTrend :query="query"
                :name="'abnormal'" />
    <killChainPhaseStatistics :query="query"
                              :address="address" />
    <eventType :tipname="'事件等级分布'"
               :query="query"
               :name="'abnormal'"
               :type="1" />
    <!-- <pieChartThreats :address="address"/> -->
    <!-- <pieChartDisposal :tipname="'事件等级分布'"
                      :query="query"
                      :name="'abnormal'"
                      :type="1" /> -->
    <killChainPhaseTrafficStatistics :query="query"
                                     :address="address" />
    <el-col :span="24">
      <tip> 最新威胁事件 </tip>
      <el-table :data="groupList">
        <el-table-column label="攻击者IP"
                         align="center"
                         prop="gjzIP" />
        <el-table-column label="受害者IP"
                         align="center"
                         prop="shzIP" />
        <el-table-column label="事件名称"
                         align="center"
                         prop="eventName" />
        <el-table-column label="事件等级"
                         align="center"
                         prop="eventLevel" />
        <el-table-column label="杀伤链阶段"
                         align="center"
                         prop="ssljd" />
        <el-table-column label="区域"
                         align="center"
                         prop="area" />
      </el-table>
    </el-col>
  </div>
</template>
<script>
import echarts from "@/components/Echarts/searchBar";
import eventTrend from "@/components/Echarts/eventTrend";
import eventType from "@/components/Echarts/eventType";

import killChainPhaseStatistics from "@/components/Echarts/killChainPhaseStatistics";
// import pieChartThreats from "@/components/Echarts/pieChartThreats";
import pieChartDisposal from "@/components/Echarts/pieChartDisposal";
import killChainPhaseTrafficStatistics from "@/components/Echarts/killChainPhaseTrafficStatistics";
import tip from "@/components/EchartsTip";
export default {
  components: {
    echarts,
    eventTrend,
    eventType,
    killChainPhaseStatistics,
    // pieChartThreats,
    pieChartDisposal,
    killChainPhaseTrafficStatistics,
    tip,
  },
  props: [],
  data () {
    return {
      policitalStatus: ["1"],
      address: 1,
      query: {},
      groupList: [
        {
          gjzIP: "192.168.28.8",
          shzIP: "10.13.20.24",
          eventName: "MALWARE",
          eventLevel: "低",
          ssljd: "荷载投递",
          area: "山西燃气厂",
        },
        {
          gjzIP: "192.168.28.8",
          shzIP: "10.13.20.24",
          eventName: "MALWARE",
          eventLevel: "低",
          ssljd: "荷载投递",
          area: "山西燃气厂",
        },
        {
          gjzIP: "192.168.28.8",
          shzIP: "10.13.20.24",
          eventName: "MALWARE",
          eventLevel: "低",
          ssljd: "荷载投递",
          area: "山西燃气厂",
        },
        {
          gjzIP: "192.168.28.8",
          shzIP: "10.13.20.24",
          eventName: "MALWARE",
          eventLevel: "低",
          ssljd: "荷载投递",
          area: "山西燃气厂",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    uploadData (data) {
      this.query = data
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
