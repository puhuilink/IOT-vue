<template>
  <div class="app-container">
    <echarts :event-type="1" @getquery="uploadData" />
    <eventTrend :query="query" :name="'design'" :search="'event_inpa'" />
    <eventType :type="'event_format'" :name="'design'" :query="query" />
    <categoryWithOtherStyle :type="1" :name="'design'" :tipname="'源IP统计TOP 5'" :query="query" />
    <eventType :type="'severity'" :tipname="'事件等级分布'" :name="'design'" :query="query" />
    <el-col :span="24">
      <tip> 最新工业网络审计事件 </tip>
      <el-table
        :data="List"
        tooltip-effect="light"
        height="320"
      >
        <el-table-column
          label="产生时间"
          align="center"
          prop="_source.occur_time"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="源IP"
          align="center"
          prop="_source.detail_src_ip"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="源端口"
          align="center"
          prop="_source.ev_com_socket_src_port"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="目的IP"
          align="center"
          prop="_source.detail_dst_ip"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="目的端口"
          align="center"
          prop="_source.ev_com_socket_dst_port"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="传输层协议"
          align="center"
          prop="_source.ev_wsec_inpa_transport_layer_protocol"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="应用层协议"
          align="center"
          prop="_source.ev_wsec_inpa_application_layer_protocol"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件等级"
          align="center"
          prop="_source.severity"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span>{{
              transTypeDic(scope.row._source.severity)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="事件类型"
          align="center"
          prop="_source.event_format"
          :show-overflow-tooltip="true"
        >
           <template #default="scope">
            <span>{{
              transType(scope.row._source.event_format)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="处置状态"
          align="center"
          prop="_source.procedure"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="区域"
          align="center"
          prop="_source.location"
          :show-overflow-tooltip="true"
        />
      </el-table>
    </el-col>
  </div>
</template>
<script>
import { getIndustrialNetworkAuditData } from '@/utils/request'
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
      queryParams: {
        query: {
          bool: {
            must: []
          }
        },
        sort: [{ 'occur_time': { order: 'desc' }}],
        from: 0,
        size: 6
      },
      List: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
     transType(val) {
      var t = [{
        name: 'wsec_syslog_inpa_ev_17',
        content: '审计协议白名单'
      }, {
        name: 'wsec_syslog_inpa_ev_20',
        content: '审计关键事件'
      }, {
        name: 'wsec_syslog_inpa_ev_21',
        content: '审计自定义事件'
      }, {
        name: 'wsec_syslog_inpa_ev_23',
        content: '审计协议规约'
      }, {
        name: '5',
        content: '致命'
      }]
      const orgTreeData1 = t.filter((e) => e.name === val)
        .map(({ content }) => ({
          content
        }))
        console.log(orgTreeData1[0].content);
      return `${orgTreeData1[0].content}`
    },
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
      getIndustrialNetworkAuditData(this.queryParams).then((res) => {
        this.queryParams.query.bool.must = []
        this.total = res.data.hits.total
        this.List = res.data.hits.hits
      })
    },
    uploadData(data) {
      this.query = data
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
