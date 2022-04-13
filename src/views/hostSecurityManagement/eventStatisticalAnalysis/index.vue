<template>
  <div class="app-container">
    <echarts :event-type="1"
             @getquery="uploadData" />
    <eventTrend :query="query"
                :name="'host'" />
    <eventType :query="query"
               :tipname="'事件类型分布'"
               :type="'event_format'"
               :name="'host'" />
    <wordcloud :query="query"
               :address="address"
               :host="1" />
    <eventType :query="query"
               :tipname="'事件状态处置图'"
               :type="2"
               :name="'host'" />
    <el-col :span="24">
      <tip> 最新主机安全事件 </tip>
      <el-table :data="groupList"
                height="300"
                tooltip-effect="light">
        <el-table-column label="接收时间"
                         align="center"
                         prop="receivingTime"
                         :show-overflow-tooltip="true" />
        <el-table-column label="事件名称"
                         align="center"
                         prop="eventName"
                         :show-overflow-tooltip="true" />
        <el-table-column label="事件等级"
                         align="center"
                         prop="eventLevel"
                         :show-overflow-tooltip="true">
          <template #default="scope">
            <span>{{
              transTypeDic(scope.row.eventLevel)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="事件类型"
                         align="center"
                         prop="eventType"
                         :show-overflow-tooltip="true" />
        <el-table-column label="操作系统"
                         align="center"
                         prop="operatingSystem"
                         :show-overflow-tooltip="true" />
        <el-table-column label="客户端名称"
                         align="center"
                         prop="clientName"
                         :show-overflow-tooltip="true" />
        <el-table-column label="客户端IP"
                         align="center"
                         prop="clientIp"
                         :show-overflow-tooltip="true" />
        <el-table-column label="产生时间"
                         align="center"
                         prop="generationTime"
                         :show-overflow-tooltip="true" />
        <el-table-column label="日志描述"
                         align="center"
                         prop="logDescription"
                         :show-overflow-tooltip="true" />
        <el-table-column label="区域"
                         align="center"
                         prop="region"
                         :show-overflow-tooltip="true" />
      </el-table>
      <!-- <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      /> -->
    </el-col>

  </div>
</template>
<script>
import echarts from '@/components/Echarts/searchBar'
import eventTrend from '@/components/Echarts/eventTrend'
import pieChartNesting from '@/components/Echarts/pieChartNesting'
import wordcloud from '@/components/Echarts/wordcloud'
import pieChartDisposal from '@/components/Echarts/pieChartDisposal'
import eventType from '@/components/Echarts/eventType'
import tip from '@/components/EchartsTip'
import { hostList } from '@/api/system/list'
export default {
  components: {
    echarts,
    eventTrend,
    pieChartNesting,
    wordcloud,
    pieChartDisposal,
    eventType,
    tip
  },
  props: [],
  data () {
    return {
      policitalStatus: ['1'],
      address: 1,
      query: {},
      // 分组表格数据
      groupList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getList()
  },
  mounted () { },
  methods: {
    transTypeDic (val) {
      var t = [{
        name: '1',
        content: '极低'
      }, {
        name: '2',
        content: '低危'
      }, {
        name: '3',
        content: '中危'
      }, {
        name: '4',
        content: '高危'
      }, {
        name: '5',
        content: '致命'
      }]
      const orgTreeData1 = t.filter((e) => e.name === val)
        .map(({ content }) => ({
          content
        }))
      return `${orgTreeData1[0].content}`
    },
    uploadData (data) {
      this.query = data
    },
    async getList () {
      this.loading = true
      const res = await hostList(this.queryParams)
      this.groupList = res.rows
      this.total = res.total
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
