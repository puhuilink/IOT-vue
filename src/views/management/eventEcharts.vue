<template>
  <div class="app-container">
    <echarts @getquery="uploadData" />
    <eventTrend :query="query" :name="'event'" />
    <eventType :type="1" :query="query" :name="'event'" />
    <wordcloud :query="query" :name="'event'" />
    <eventType :tipname="'事件状态处置图'" :type="2" :query="query" :name="'event'" />
    <el-col :span="24">
      <tip> 最新威胁事件 </tip>
      <el-table
        v-loading="loading"
        :data="groupList"
        height="300px"
        tooltip-effect="light"
      >
        <el-table-column
          label="事件名称"
          align="center"
          prop="eventName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="源IP"
          align="center"
          prop="sourceIp"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="目的IP"
          align="center"
          prop="destinationIp"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="协议"
          align="center"
          prop="agreement"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件等级"
          align="center"
          prop="eventLevel"
        >
          <template #default="scope">
            <span>{{
              transTypeDic(scope.row.level)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="事件类型"
          align="center"
          prop="type"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="处置状态"
          align="center"
          prop="status"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件开始时间"
          align="center"
          prop="startTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件结束时间"
          align="center"
          prop="endTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="区域"
          align="center"
          prop="address"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="上报设备"
          align="center"
          prop="equipment"
          :show-overflow-tooltip="true"
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
import { eventList } from '@/api/system/list'
import tip from '@/components/EchartsTip'
export default {
  components: { echarts, eventTrend, eventType, wordcloud, tip },
  props: [],
  data() {
    return {
      policitalStatus: ['1'],
      query: {},
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
  created() {
    this.getCategoryList()
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
    async getCategoryList() {
      this.loading = true
      const res = await eventList(this.queryParams)
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
