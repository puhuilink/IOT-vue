<template>
  <div class="app-container">
    <echarts  @getaddress="uploadData"/>
    <eventTrend :address="address" />
    <!-- <eventType :type="1" /> -->
    <pieChartNesting :address="address"/>
    <wordcloud :address="address" />
    <pieChartDisposal :tipname="'事件状态处置图'" :address="address"/>
    <!-- <eventType :tipname="'事件状态处置图'" :type="2" /> -->
    <el-col :span="24">
      <tip> 最新主机安全事件 </tip>
      <el-table :data="groupList">
        <el-table-column label="接受时间" align="center" prop="groupId" />
        <el-table-column label="事件名称" align="center" prop="createBy" />
        <el-table-column label="事件等级" align="center" prop="createTime" />
        <el-table-column label="事件类型" align="center" prop="remark" />
        <el-table-column label="操作系统" align="center" prop="updateTime" />
        <el-table-column label="客户端名称" align="center" prop="khdmc" />
        <el-table-column label="客户端IP" align="center" prop="groupName" />
        <el-table-column label="产生时间" align="center" prop="groupId" />
        <el-table-column label="日志描述" align="center" prop="groupName" />
        <el-table-column label="区域" align="center" prop="delFlag" />
      </el-table>
    </el-col>
  </div>
</template>
<script>
import echarts from "@/components/Echarts/searchBar";
import eventTrend from "@/components/Echarts/eventTrend";
import pieChartNesting from "@/components/Echarts/pieChartNesting";
import wordcloud from "@/components/Echarts/wordcloud";
import pieChartDisposal from "@/components/Echarts/pieChartDisposal";
import tip from "@/components/EchartsTip";
export default {
  components: {
    echarts,
    eventTrend,
    pieChartNesting,
    wordcloud,
    pieChartDisposal,
    tip,
  },
  props: [],
  data() {
    return {
      policitalStatus: ["1"],
      address: 1,
      groupList: [
        {
          searchValue: "2022-01-29 10:10:00",
          createBy: "非法外联告警",
          createTime: "高",
          remark: "非法外联事件",
          updateTime: "Windows7",
          khdmc: "WIN-gyk",
          groupName: "192.168.19.159",
          groupId: "2022-01-29 10:10:00",
          userId: "116.103.2.11",
          groupName: "产生非法外联、外联地址：www百度.com",
          // groupOrder: "10.255.52.10",
          delFlag: "山西三通燃气厂",
        },
        {
          searchValue: "2022-01-29 10:10:00",
          createBy: "非法外联告警",
          createTime: "高",
          remark: "非法外联事件",
          updateTime: "Windows7",
          khdmc: "WIN-gyk",
          groupName: "192.168.19.159",
          groupId: "2022-01-29 10:10:00",
          userId: "116.103.2.11",
          groupName: "产生非法外联、外联地址：www百度.com",
          // groupOrder: "10.255.52.10",
          delFlag: "山西三通燃气厂",
        },
        {
          searchValue: "2022-01-29 10:10:00",
          createBy: "非法外联告警",
          createTime: "高",
          remark: "非法外联事件",
          updateTime: "Windows7",
          khdmc: "WIN-gyk",
          groupName: "192.168.19.159",
          groupId: "2022-01-29 10:10:00",
          userId: "116.103.2.11",
          groupName: "产生非法外联、外联地址：www百度.com",
          // groupOrder: "10.255.52.10",
          delFlag: "山西三通燃气厂",
        },
        {
          searchValue: "2022-01-29 10:10:00",
          createBy: "非法外联告警",
          createTime: "高",
          remark: "非法外联事件",
          updateTime: "Windows7",
          khdmc: "WIN-gyk",
          groupName: "192.168.19.159",
          groupId: "2022-01-29 10:10:00",
          userId: "116.103.2.11",
          groupName: "产生非法外联、外联地址：www百度.com",
          // groupOrder: "10.255.52.10",
          delFlag: "山西三通燃气厂",
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
