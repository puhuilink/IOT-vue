<template>
  <div class="app-container">
    <echarts @getquery="uploadData" />
    <eventTrend
      :tipname="'弱口令趋势分析'"
      :date="30"
      :query="query"
      :event-type="1"
      :name="'weakPassword'"
      :search="'dm_event_wkpw'"
    />
    <echartsBar
      :tipname="'协议TOP5统计'"
      :detail="'detail_protocol'"
      :query="query"
      :name="'weakPassword'"
    />
    <echartsBar
      :tipname="'IP地址TOP5统计'"
      :detail="'detail_src_ip'"
      :query="query"
      :name="'weakPassword'"
    />
    <el-col :span="24">
      <tip> 最新弱口令事件 </tip>
      <el-table
        :data="List"
        tooltip-effect="light"
        height="320"
      >
        <el-table-column
          label="资产名称"
          align="center"
          prop="_source.ci_label"
          :show-overflow-tooltip="true"
          min-width="15%"
        />
        <el-table-column
          label="IP地址"
          align="center"
          prop="_source.detail_src_ip"
          :show-overflow-tooltip="true"
          min-width="15%"
        />
        <el-table-column
          label="协议"
          align="center"
          prop="_source.ev_com_socket_protocol"
          :show-overflow-tooltip="true"
          min-width="15%"
        />
        <el-table-column
          label="端口"
          align="center"
          prop="_source.ev_com_socket_dst_port"
          :show-overflow-tooltip="true"
          min-width="15%"
        />
        <el-table-column
          label="事件等级"
          min-width="10%"
          align="center"
          prop="severity"
        >
          <template #default="scope">
           <span>{{ transTypeDic(scope.row._source.severity) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="处置状态"
          align="center"
          prop="_source.procedure"
          min-width="8%"
        />
        <el-table-column
          label="发生时间"
          align="center"
          prop="_source.occur_time"
          :show-overflow-tooltip="true"
          min-width="15%"
        />
        <el-table-column
          label="区域"
          align="center"
          prop="_source.location"
          :show-overflow-tooltip="true"
          min-width="15%"
        />
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
import { getWeakPasswordData } from '@/utils/request'
export default {
  name: 'Index',
  components: { echarts, eventTrend, eventType, echartsBar, tip },
  props: [],
  data() {
    return {
      query: {
      },
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
    async  getList() {
      getWeakPasswordData(this.queryParams).then(res => {
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
