<template>
  <div class="app-container">
    <echarts :event-type="2"
             @getquery="uploadData" />
    <eventTrend :query="query"
                :event-type="2"
                :name="'Jiangwoodcreep'" />
    <eventType :query="query"
               :type="3"
               :name="'Jiangwoodcreep'" />
    <wordcloud :query="query"
               :type="2"
               :name="'Jiangwoodcreep'" />
    <eventType :query="query"
               :tipname="'事件状态处置图'"
               :type="2"
               :name="'Jiangwoodcreep'" />
    <el-col :span="24">
      <tip> 最新僵木蠕事件 </tip>
      <el-table :data="groupList"
                tooltip-effect="light"
                height="300">
        <el-table-column label="源IP"
                         align="center"
                         prop="attackerIp"
                         :show-overflow-tooltip="true" />
        <el-table-column label="目的IP"
                         align="center"
                         prop="victimIp"
                         :show-overflow-tooltip="true" />
        <el-table-column label="事件名称"
                         align="center"
                         prop="eventName"
                         :show-overflow-tooltip="true" />
        <el-table-column label="威胁分类"
                         align="center"
                         prop="threatClassification"
                         :show-overflow-tooltip="true" />
        <el-table-column label="事件等级"
                         align="center"
                         prop="eventLevel"
                         :show-overflow-tooltip="true" />
        <el-table-column label="杀伤链阶段"
                         align="center"
                         prop="killingChainStage"
                         :show-overflow-tooltip="true" />
        <el-table-column label="发生时间"
                         align="center"
                         prop="happenTime"
                         :show-overflow-tooltip="true" />
        <el-table-column label="发现时间"
                         align="center"
                         prop="findTime"
                         :show-overflow-tooltip="true" />
        <el-table-column label="区域"
                         align="center"
                         prop="region"
                         :show-overflow-tooltip="true" />
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
import { zombieList } from '@/api/system/list'
export default {
  components: { echarts, eventTrend, eventType, wordcloud, tip },
  props: [],
  data () {
    return { // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      policitalStatus: ['1'],
      query: {},
      groupList: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getList()
  },
  mounted () {
  },
  methods: {
    async getList () {
      this.loading = true
      const res = await zombieList(this.queryParams)
      this.groupList = res.rows
      this.loading = false
    },
    uploadData (data) {
      this.query = data
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
