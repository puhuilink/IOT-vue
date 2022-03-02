<template>
  <div class="app-container">
    <echarts />
    <eventType :type="1" />
    <eventType :type="1" />
    <el-col :span="12">
      <tip> 最新威胁事件 </tip>
      <el-table :data="groupList">
        <el-table-column label="事件名称" align="center" prop="groupId" :show-overflow-tooltip="true" />
        <el-table-column label="源IP" align="center" prop="userId" :show-overflow-tooltip="true" />
        <el-table-column label="目的IP" align="center" prop="groupOrder" :show-overflow-tooltip="true" />
        <el-table-column label="事件等级" align="center" prop="remark" :show-overflow-tooltip="true" />
        <el-table-column label="事件类型" align="center" prop="searchValue" :show-overflow-tooltip="true" />
        <el-table-column label="时间" align="center" prop="createTime" :show-overflow-tooltip="true" />
        <el-table-column label="区域" align="center" prop="groupName" :show-overflow-tooltip="true" />
        <el-table-column label="上报设备" align="center" prop="delFlag" :show-overflow-tooltip="true" />
      </el-table>
    </el-col>
    <eventType :tipname="'事件状态处置图'" :type="2" />
  </div>
</template>
<script>
import echarts from '@/components/Echarts/searchBar'
import eventType from '@/components/Echarts/eventType'
import tip from '@/components/EchartsTip'
export default {
  components: { echarts, eventType, tip },
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
