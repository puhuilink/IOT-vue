<template>
  <div class="app-container">
    <echarts @getaddress="uploadData" />
    <eventTrend :address="address" />
    <killChainPhaseStatistics :address="address"/>
    <!-- <eventType :type="1" /> -->
    <!-- <wordcloud /> -->
    <pieChartThreats :address="address"/>
    <killChainPhaseTrafficStatistics :address="address"/>
    <!-- <eventType :tipname="'事件状态处置图'" :type="2" /> -->
    <el-col :span="24">
      <tip> 最新威胁事件 </tip>
      <el-table :data="groupList">
        <el-table-column label="攻击者IP" align="center" prop="gjzIP" />
        <el-table-column label="受害者IP" align="center" prop="shzIP" />
        <el-table-column label="事件名称" align="center" prop="eventName" />
        <el-table-column label="事件等级" align="center" prop="eventLevel" />
        <el-table-column label="杀伤链阶段" align="center" prop="ssljd" />
        <el-table-column label="区域" align="center" prop="area" />
      </el-table>
    </el-col>
  </div>
</template>
<script>
import echarts from "@/components/Echarts/searchBar";
import eventTrend from "@/components/Echarts/eventTrend";
import killChainPhaseStatistics from "@/components/Echarts/killChainPhaseStatistics";
import pieChartThreats from "@/components/Echarts/pieChartThreats";
import killChainPhaseTrafficStatistics from "@/components/Echarts/killChainPhaseTrafficStatistics";
import tip from "@/components/EchartsTip";
export default {
  components: {
    echarts,
    eventTrend,
    killChainPhaseStatistics,
    pieChartThreats,
    killChainPhaseTrafficStatistics,
    tip,
  },
  props: [],
  data() {
    return {
      policitalStatus: ["1"],
      address: 1,
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
  created() {},
  mounted() {},
  methods: {
    uploadData(data) {
      this.address = data.address;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
