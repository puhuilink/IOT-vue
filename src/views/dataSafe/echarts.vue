<template>
  <div class="app-container">
    <echarts @getquery="uploadData" />
    <category :type="1" :tipname="'源IP统计事件TOP10'" :query="query" :name="'dataSafe'" />
    <category :type="2" :tipname="'目的IP统计'" :query="query" :name="'dataSafe'" />
    <eventType :type="5" :tipname="'策略统计事件分析'" :query="query" :name="'dataSafe'" />
    <eventType :type="6" :tipname="'邮件统计'" :query="query" :name="'dataSafe'" />
    <el-col :span="12">
      <tip> 最新数据安全事件 </tip>
      <el-table :data="groupList">
        <el-table-column label="检测服务器类型" align="center" prop="groupId" :show-overflow-tooltip="true" />
        <el-table-column label="动作类型" align="center" prop="userId" :show-overflow-tooltip="true" />
        <el-table-column label="协议类型" align="center" prop="groupOrder" :show-overflow-tooltip="true" />
        <el-table-column label="源IP" align="center" prop="remark" :show-overflow-tooltip="true" />
        <el-table-column label="严重性" align="center" prop="searchValue" :show-overflow-tooltip="true" />
        <el-table-column label="命中策略" align="center" prop="createTime" :show-overflow-tooltip="true" />
        <el-table-column label="事件ID" align="center" prop="groupName" :show-overflow-tooltip="true" />
        <el-table-column label="区域" align="center" prop="delFlag" :show-overflow-tooltip="true" />
      </el-table>
    </el-col>
    <eventType :tipname="'事件等级分布'" :type="4" :query="query" :name="'dataSafe'" />
  </div>
</template>
<script>
import echarts from '@/components/Echarts/searchBar'
import eventType from '@/components/Echarts/eventType'
import category from '@/components/Echarts/echartsCategory'
import tip from '@/components/EchartsTip'
export default {
  components: { echarts, eventType, tip, category },
  props: [],
  data() {
    return {
      policitalStatus: ['1'],
      query: {},
      groupList: [{ 'searchValue': '信息', 'createBy': '', 'createTime': 'Kara文件内置财务', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '192.168.146.168', 'params': {}, 'groupId': '终端监测器', 'userId': '记录', 'groupName': '753253358804481', 'groupOrder': 'SCANFILE', 'delFlag': '山西燃气厂' },
        { 'searchValue': '信息', 'createBy': '', 'createTime': 'Kara文件内置财务', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '192.168.146.168', 'params': {}, 'groupId': '终端监测器', 'userId': '记录', 'groupName': '753253358804481', 'groupOrder': 'SCANFILE', 'delFlag': '山西燃气厂' },
        { 'searchValue': '信息', 'createBy': '', 'createTime': 'Kara文件内置财务', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '192.168.146.168', 'params': {}, 'groupId': '终端监测器', 'userId': '记录', 'groupName': '753253358804481', 'groupOrder': 'SCANFILE', 'delFlag': '山西燃气厂' },
        { 'searchValue': '信息', 'createBy': '', 'createTime': 'Kara文件内置财务', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '192.168.146.168', 'params': {}, 'groupId': '终端监测器', 'userId': '记录', 'groupName': '753253358804481', 'groupOrder': 'SCANFILE', 'delFlag': '山西燃气厂' },
        { 'searchValue': '信息', 'createBy': '', 'createTime': 'Kara文件内置财务', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '192.168.146.168', 'params': {}, 'groupId': '终端监测器', 'userId': '记录', 'groupName': '753253358804481', 'groupOrder': 'SCANFILE', 'delFlag': '山西燃气厂' }]
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {
  },
  methods: {
    uploadData(data) {
      this.query = data
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
