<template>
  <div class="app-container">
    <echarts :event-type="2" @getquery="uploadData" />
    <eventTrend :query="query" />
    <eventType
      :query="query"
      :type="3"
      :name="'Jiangwoodcreep'"
    />
    <wordcloud
      :query="query"
      :type="2"
      :name="'Jiangwoodcreep'"
    />
    <eventType
      :query="query"
      :tipname="'事件状态处置图'"
      :type="2"
      :name="'Jiangwoodcreep'"
    />
    <el-col :span="24">
      <tip> 最新僵木蠕事件 </tip>
      <el-table :data="groupList">

        <el-table-column
          label="源IP"
          align="center"
          prop="userId"
        />
        <el-table-column
          label="目的IP"
          align="center"
          prop="groupOrder"
        />
        <el-table-column
          label="事件名称"
          align="center"
          prop="groupId"
        />
        <el-table-column
          label="威胁分类"
          align="center"
          prop="remark"
        />
        <el-table-column
          label="事件等级"
          align="center"
          prop="searchValue"
        />
        <el-table-column
          label="杀伤链阶段"
          align="center"
          prop="delFlag"
        />
        <el-table-column
          label="发生时间"
          align="center"
          prop="createTime"
        />
        <el-table-column
          label="发现时间"
          align="center"
          prop="updateTime"
        />
        <el-table-column
          label="区域"
          align="center"
          prop="groupName"
        />
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
      query: {},
      groupList: [{ 'searchValue': '低', 'createBy': '', 'createTime': '2021-05-18 16:35:03', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '僵尸网络', 'params': {}, 'groupId': 'Botnet', 'userId': '116.103.2.11', 'groupName': '山西燃气厂', 'groupOrder': '10.255.52.10', 'delFlag': '载荷投递' },
        { 'searchValue': '低', 'createBy': '', 'createTime': '2021-05-18 16:35:03', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '僵尸网络', 'params': {}, 'groupId': 'Botnet', 'userId': '116.103.2.11', 'groupName': '山西燃气厂', 'groupOrder': '10.255.52.10', 'delFlag': '载荷投递' },
        { 'searchValue': '低', 'createBy': '', 'createTime': '2021-05-18 16:35:03', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '僵尸网络', 'params': {}, 'groupId': 'Botnet', 'userId': '116.103.2.11', 'groupName': '山西燃气厂', 'groupOrder': '10.255.52.10', 'delFlag': '载荷投递' },
        { 'searchValue': '低', 'createBy': '', 'createTime': '2021-05-18 16:35:03', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '僵尸网络', 'params': {}, 'groupId': 'Botnet', 'userId': '116.103.2.11', 'groupName': '山西燃气厂', 'groupOrder': '10.255.52.10', 'delFlag': '载荷投递' },
        { 'searchValue': '低', 'createBy': '', 'createTime': '2021-05-18 16:35:03', 'updateBy': '', 'updateTime': '2021-05-18 16:35:32', 'remark': '僵尸网络', 'params': {}, 'groupId': 'Botnet', 'userId': '116.103.2.11', 'groupName': '山西燃气厂', 'groupOrder': '10.255.52.10', 'delFlag': '载荷投递' }]
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
