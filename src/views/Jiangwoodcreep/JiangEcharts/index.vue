<template>
  <div class="app-container">
    <echarts
      :event-type="2"
      @getquery="uploadData"
    />
    <eventTrend
      :query="query"
      :event-type="2"
      :name="'Jiangwoodcreep'"
    />
    <eventType
      :query="query"
      :type="'severity'"
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
      :type="'procedure'"
      :name="'Jiangwoodcreep'"
    />
    <el-col :span="24">
      <tip> 最新僵木蠕事件 </tip>
      <el-table
        :data="List"
        tooltip-effect="light"
        height="320"
      >
        <el-table-column
          label="源IP"
          align="center"
          prop="_source.ev_com_socket_src_ip"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="目的IP"
          align="center"
          prop="_source.ev_com_socket_dst_ip"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件名称"
          align="center"
          prop="_source.event_name"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="威胁分类"
          align="center"
          prop="_source.event_format"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件等级"
          align="center"
          prop="severity"
        >
          <template #default="scope">
            <span v-if="scope.row._source.severity == null || scope.row._source.severity == ''" />
            <span v-else>{{
              transTypeDic(scope.row._source.severity)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="杀伤链阶段"
          align="center"
          prop="_source.ev_ksec_killchainCN"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="处置状态"
          align="center"
          prop="_source.procedure"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="发生时间"
          align="center"
          prop="_source.occur_time"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="发现时间"
          align="center"
          prop="_source.receive_time"
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
import { getbaseJiangTableData } from '@/utils/request'
import echarts from '@/components/Echarts/searchBar'
import eventTrend from '@/components/Echarts/eventTrend'
import eventType from '@/components/Echarts/eventType'
import wordcloud from '@/components/Echarts/wordcloud'
import tip from '@/components/EchartsTip'
export default {
  components: { echarts, eventTrend, eventType, wordcloud, tip },
  props: [],
  data() {
    return { // 查询参数
      List: [],
      policitalStatus: ['1'],
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
    translevelDic(val) {
      var t = [{
        'label': '僵尸网络',
        'value': 'Botnet'
      }, {
        'label': '网络木马',
        'value': 'Trojan'
      }, {
        'label': '恶意软件',
        'value': 'Malware'
      }, {
        'label': '恶意链接',
        'value': 'URL_malware'
      }]
      const orgTreeData = t.filter((e) => e.value === val)
        .map(({ label }) => ({
          label
        }))
      return `${orgTreeData[0].label}`
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
    async getList() {
      getbaseJiangTableData(this.queryParams).then(res => {
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
