<template>
  <div class="app-container">
    <echarts :event-type="1" @getquery="uploadData" />
    <eventTrend :query="query" :event-type="1" :name="'weakPassword'" />
    <eventType :tipname="'事件等级分布'" :type="4" :query="query" :name="'weakPassword'" />
    <echartsBar :tipname="'攻击者TOP5统计'" :query="query" :name="'weakPassword'" />
    <eventType :tipname="'事件状态处置图'" :query="query" :type="2" :name="'weakPassword'" />
    <el-col :span="24">
      <tip> 最新弱口令事件 </tip>
      <el-table :data="groupList" tooltip-effect="light" height="300">
        <el-table-column label="资产名称" align="center" prop="assetName" :show-overflow-tooltip="true" min-width="15%" />
        <el-table-column label="IP地址" align="center" prop="ipAddress" :show-overflow-tooltip="true" min-width="15%" />
        <el-table-column label="协议" align="center" prop="agreement" :show-overflow-tooltip="true" min-width="15%" />
        <el-table-column label="端口" align="center" prop="port" :show-overflow-tooltip="true" min-width="15%" />
        <el-table-column
          label="事件等级"
          align="center"
          prop="eventLevel"
          min-width="10%"
        >
          <template #default="scope">
            <span>{{
              transTypeDic(scope.row.eventLevel)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="处置状态" align="center" prop="disposalStatus" min-width="8%" />
        <el-table-column label="发生时间" align="center" prop="findTime" :show-overflow-tooltip="true" min-width="15%" />
        <el-table-column label="区域" align="center" prop="region" :show-overflow-tooltip="true" min-width="15%" />

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
import { weakList } from '@/api/system/list'
export default {
  name: 'Index',
  components: { echarts, eventTrend, eventType, echartsBar, tip },
  props: [],
  data() {
    return {
      policitalStatus: ['1'],
      query: {},
      groupList: []
    }
  },
  computed: {},
  watch: {
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    transTypeDic(val) {
      var t = [{
        name: '1',
        content: '正常'
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
        content: '失陷'
      }]
      const orgTreeData1 = t.filter((e) => e.name === val)
        .map(({ content }) => ({
          content
        }))
      return `${orgTreeData1[0].content}`
    },
    async getList() {
      this.loading = true
      const res = await weakList(this.queryParams)
      this.groupList = res.rows
      this.loading = false
    },
    uploadData(data) {
      this.query = data
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
