<template>
  <div class="app-container">
    <echarts @getaddress="uploadData" />
    <eventTrend :address="address" :name="'weakPassword'" />
    <eventType :tipname="'事件等级分布'" :type="4" :address="address" :name="'weakPassword'" />
    <echartsBar :tipname="'攻击者TOP5统计'" :address="address" :name="'weakPassword'" />
    <eventType :tipname="'事件状态处置图'" :address="address" :type="2" :name="'weakPassword'" />
    <el-col :span="24">
      <tip> 最新弱口令事件 </tip>
      <el-table :data="groupList">
        <el-table-column label="资产名称" align="center" prop="groupId" />
        <el-table-column label="IP地址" align="center" prop="userId" />
        <el-table-column label="服务" align="center" prop="groupOrder" />
        <el-table-column label="端口" align="center" prop="remark" />
        <el-table-column label="用户名" align="center" prop="searchValue" />
        <el-table-column label="密码" align="center" prop="createTime" />
        <el-table-column label="事件等级" align="center" prop="groupName" />
        <el-table-column label="处置状态" align="center" prop="delFlag" />
        <el-table-column label="发现时间" align="center" prop="updateTime" />
        <el-table-column label="区域" align="center" prop="createBy" />
      </el-table>
    </el-col>
  </div>
</template>
<script>
import echarts from '@/components/Echarts/searchBar'
import eventTrend from '@/components/Echarts/eventTrend'
import eventType from '@/components/Echarts/eventType'
import echartsBar from '@/components/Echarts/echartsBar'
import tip from '@/components/EchartsTip'
export default {
  name: 'Index',
  components: { echarts, eventTrend, eventType, echartsBar, tip },
  props: [],
  data() {
    return {
      policitalStatus: ['1'],
      address: 1,
      groupList: [{ 'searchValue': 'ZJStream', 'createBy': '山西三通燃气厂', 'createTime': 'Z*****m', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '53', 'params': {}, 'groupId': '内网DNS', 'userId': '116.103.2.11', 'groupName': '高危', 'groupOrder': 'DNS_TCP', 'delFlag': '未处置' },
        { 'searchValue': 'ZJStream', 'createBy': '北京城乡水厂', 'createTime': 'Z*****m', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '53', 'params': {}, 'groupId': '内网DNS', 'userId': '116.103.2.11', 'groupName': '高危', 'groupOrder': 'DNS_TCP', 'delFlag': '未处置' },
        { 'searchValue': 'ZJStream', 'createBy': '天津管片厂', 'createTime': 'Z*****m', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '53', 'params': {}, 'groupId': '内网DNS', 'userId': '116.103.2.11', 'groupName': '高危', 'groupOrder': 'DNS_TCP', 'delFlag': '未处置' },
        { 'searchValue': 'ZJStream', 'createBy': '珠海深中通道', 'createTime': 'Z*****m', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '53', 'params': {}, 'groupId': '内网DNS', 'userId': '116.103.2.11', 'groupName': '高危', 'groupOrder': 'DNS_TCP', 'delFlag': '未处置' },
        { 'searchValue': 'ZJStream', 'createBy': '三亚海投轨交', 'createTime': 'Z*****m', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '53', 'params': {}, 'groupId': '内网DNS', 'userId': '116.103.2.11', 'groupName': '高危', 'groupOrder': 'DNS_TCP', 'delFlag': '未处置' },
        { 'searchValue': 'ZJStream', 'createBy': '珠海深中通道', 'createTime': 'Z*****m', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '53', 'params': {}, 'groupId': '内网DNS', 'userId': '116.103.2.11', 'groupName': '高危', 'groupOrder': 'DNS_TCP', 'delFlag': '未处置' },
        { 'searchValue': 'ZJStream', 'createBy': '珠海深中通道', 'createTime': 'Z*****m', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '53', 'params': {}, 'groupId': '内网DNS', 'userId': '116.103.2.11', 'groupName': '高危', 'groupOrder': 'DNS_TCP', 'delFlag': '未处置' }
      ]
    }
  },
  computed: {},
  watch: {
  },
  created() {

  },
  mounted() {
  },
  methods: {
    uploadData(data) {
      this.address = data.address
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
