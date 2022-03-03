<template>
  <div class="app-container">
    <echarts />
    <eventTrend />
    <killChainPhaseStatistics />
    <!-- <eventType :type="1" /> -->
    <!-- <wordcloud /> -->
    <pieChartThreats />
    <killChainPhaseTrafficStatistics />
    <!-- <eventType :tipname="'事件状态处置图'" :type="2" /> -->
    <el-col :span="24">
      <tip> 最新威胁事件 </tip>
      <el-table :data="groupList">
        <el-table-column label="攻击者IP" align="center" prop="groupId" />
        <el-table-column label="受害者IP" align="center" prop="userId" />
        <el-table-column label="事件名称" align="center" prop="groupOrder" />
        <el-table-column label="事件等级" align="center" prop="remark" />
        <el-table-column label="杀伤链阶段" align="center" prop="searchValue" />
        <el-table-column label="区域" align="center" prop="groupName" />
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

      groupList: [
        {
          searchValue: "---",
          createBy: "",
          createTime: "2021-05-18 16:35:03",
          updateBy: "",
          updateTime: "2021-05-18 16:35:32",
          remark: "极低",
          params: {},
          groupId: 1,
          userId: "116.103.2.11",
          groupName: "山西燃气厂",
          groupOrder: "10.255.52.10",
          delFlag: "蜜罐",
        },
        {
          searchValue: "---",
          createBy: "",
          createTime: "2021-05-18 16:35:03",
          updateBy: "",
          updateTime: "2021-05-18 16:35:32",
          remark: "极低",
          params: {},
          groupId: 2,
          userId: "116.103.2.11",
          groupName: "山西燃气厂",
          groupOrder: "10.255.52.10",
          delFlag: "蜜罐",
        },
        {
          searchValue: "---",
          createBy: "",
          createTime: "2021-05-18 16:35:03",
          updateBy: "",
          updateTime: "2021-05-18 16:35:32",
          remark: "极低",
          params: {},
          groupId: 3,
          userId: "116.103.2.11",
          groupName: "山西燃气厂",
          groupOrder: "10.255.52.10",
          delFlag: "蜜罐",
        },
        {
          searchValue: "---",
          createBy: "",
          createTime: "2021-05-18 16:35:03",
          updateBy: "",
          updateTime: "2021-05-18 16:35:32",
          remark: "极低",
          params: {},
          groupId: 4,
          userId: "116.103.2.11",
          groupName: "山西燃气厂",
          groupOrder: "10.255.52.10",
          delFlag: "蜜罐",
        },
        {
          searchValue: "---",
          createBy: "",
          createTime: "2021-05-18 16:35:03",
          updateBy: "",
          updateTime: "2021-05-18 16:35:32",
          remark: "极低",
          params: {},
          groupId: 5,
          userId: "116.103.2.11",
          groupName: "山西燃气厂",
          groupOrder: "10.255.52.10",
          delFlag: "蜜罐",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>
