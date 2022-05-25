<template>
  <div class="app-container">
    <echarts :event-type="1" @getquery="uploadData" />
    <category :type="1" :tipname="'源IP统计事件TOP10'" :query="query" :name="'dataSafe'" />
    <eventType :type="'event_format'" :tipname="'事件等级分布'" :query="query" :name="'dataSafe'" />
    <eventType :type="5" :tipname="'策略统计事件分析'" :query="query" :name="'dataSafe'" />
    <eventType :type="6" :tipname="'邮件统计'" :query="query" :name="'dataSafe'" />
    <el-col :span="24">
      <tip> 最新数据安全事件 </tip>
      <el-table :data="groupList" height="400">
        <el-table-column label="检测服务器类型" align="center" :show-overflow-tooltip="true" prop="detectServerType" min-width="15%" />
        <el-table-column label="动作类型" align="center" prop="actionType" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="协议类型" align="center" prop="protocolType" :show-overflow-tooltip="true" min-width="15%" />
        <el-table-column label="源IP" align="center" prop="sourceIp" :show-overflow-tooltip="true" min-width="10%" />
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
        <el-table-column label="命中策略" align="center" prop="hitStrategy" :show-overflow-tooltip="true" min-width="15%" />
        <el-table-column label="事件ID" align="center" prop="eventId" :show-overflow-tooltip="true" min-width="10%" />
        <el-table-column label="区域" align="center" prop="region" :show-overflow-tooltip="true" min-width="10%" />
      </el-table>
    </el-col>
  </div>
</template>
<script>
import echarts from '@/components/Echarts/searchBar'
import eventType from '@/components/Echarts/eventType'
import category from '@/components/Echarts/echartsCategory'
import tip from '@/components/EchartsTip'
import { dataSecurityManagementList } from '@/api/system/list'
export default {
  components: { echarts, eventType, tip, category },
  props: [],
  data() {
    return {
      policitalStatus: ['1'],
      query: {},
      groupList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    transTypeDic(val) {
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
    /** 查询分组列表 */
    async getList() {
      this.loading = true
      const res = await dataSecurityManagementList(this.queryParams)
      this.groupList = res.rows
      this.total = res.total
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
