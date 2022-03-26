<template>
  <div class="app-container">
    <echarts :event-type="1" @getquery="uploadData" />
    <eventTrend :query="query" :name="'design'" />
    <eventType :type="1" :name="'design'" :query="query" />
    <categoryWithOtherStyle :type="1" :name="'design'" :tipname="'源IP统计TOP 5'" :query="query" />
    <eventType :type="2" :tipname="'事件等级分布'" :name="'design'" :query="query" />
    <el-col :span="24">
      <tip> 最新工业网络审计事件 </tip>
      <el-table :data="groupList" tooltip-effect="light" height="300">
        <el-table-column
          label="产生时间"
          align="center"
          prop="generationTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="源IP"
          align="center"
          prop="sourceIp"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="源端口"
          align="center"
          prop="sourcePort"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="目的IP"
          align="center"
          prop="destinationIp"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="目的端口"
          align="center"
          prop="destinationPort"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="传输层协议"
          align="center"
          prop="transportLayerProtocol"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="应用层协议"
          align="center"
          prop="applicationLayerProtocol"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件等级"
          align="center"
          prop="eventLevel"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span>{{
              transTypeDic(scope.row.eventLevel)
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="事件类型"
          align="center"
          prop="eventCategory"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="区域"
          align="center"
          prop="region"
          :show-overflow-tooltip="true"
        />
      </el-table>
    </el-col>
  </div>
</template>
<script>
import { industryList } from '@/api/system/list'
import echarts from '@/components/Echarts/searchBar'
import eventTrend from '@/components/Echarts/eventTrend'
import eventType from '@/components/Echarts/eventType'
import categoryWithOtherStyle from '@/components/Echarts/categoryWithFlippedXYAxis'

import tip from '@/components/EchartsTip'
export default {
  components: {
    echarts,
    eventTrend,
    eventType,
    tip,
    categoryWithOtherStyle
  },
  props: [],
  data() {
    return {
      query: {},
      groupList: [
      ]
    }
  },
  created() {
    this.getList()
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
    /** 查询分组列表 */
    async getList() {
      this.loading = true
      const res = await industryList(this.queryParams)
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
