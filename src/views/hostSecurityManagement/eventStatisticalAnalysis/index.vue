<template>
  <div class="app-container">
    <echarts />
    <eventTrend />
    <eventType :type="1" />
    <wordcloud />
    <eventType :tipname="'事件状态处置图'" :type="2" />
    <el-col :span="24">
      <tip> 最新威胁事件 </tip>
      <el-table :data="groupList">
        <el-table-column label="事件名称" align="center" prop="groupId" />
        <el-table-column label="源IP" align="center" prop="userId" />
        <el-table-column label="目的IP" align="center" prop="groupOrder" />
        <el-table-column label="事件等级" align="center" prop="remark" />
        <el-table-column label="事件类型" align="center" prop="searchValue" />
        <el-table-column label="时间" align="center" prop="createTime" />
        <el-table-column label="区域" align="center" prop="groupName" />
        <el-table-column label="上报设备" align="center" prop="delFlag" />
      </el-table>
    </el-col>
  </div>
</template>
<script>
import echarts from '@/components/Echarts/searchBar'
import eventTrend from '@/components/Echarts/eventTrend'
import eventType from '@/components/Echarts/eventType'
import wordcloud from '@/components/Echarts/wordcloud'
import tip from '@/components/EchartsTip'
export default {
  components: { echarts, eventTrend, eventType, wordcloud, tip },
  props: [],
  data() {
    return {
      policitalStatus: ['1'],

      groupList: [{ 'searchValue': '---', 'createBy': '', 'createTime': '2021-05-18 16:35:03', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '极低', 'params': {}, 'groupId': 1, 'userId': '116.103.2.11', 'groupName': '山西燃气厂', 'groupOrder': '10.255.52.10', 'delFlag': '蜜罐' },
        { 'searchValue': '---', 'createBy': '', 'createTime': '2021-05-18 16:35:03', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '极低', 'params': {}, 'groupId': 2, 'userId': '116.103.2.11', 'groupName': '山西燃气厂', 'groupOrder': '10.255.52.10', 'delFlag': '蜜罐' },
        { 'searchValue': '---', 'createBy': '', 'createTime': '2021-05-18 16:35:03', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '极低', 'params': {}, 'groupId': 3, 'userId': '116.103.2.11', 'groupName': '山西燃气厂', 'groupOrder': '10.255.52.10', 'delFlag': '蜜罐' },
        { 'searchValue': '---', 'createBy': '', 'createTime': '2021-05-18 16:35:03', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '极低', 'params': {}, 'groupId': 4, 'userId': '116.103.2.11', 'groupName': '山西燃气厂', 'groupOrder': '10.255.52.10', 'delFlag': '蜜罐' },
        { 'searchValue': '---', 'createBy': '', 'createTime': '2021-05-18 16:35:03', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '极低', 'params': {}, 'groupId': 5, 'userId': '116.103.2.11', 'groupName': '山西燃气厂', 'groupOrder': '10.255.52.10', 'delFlag': '蜜罐' }]
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {
  },
  methods: {
  }
}

</script>
<style lang="scss" scoped>
</style>
