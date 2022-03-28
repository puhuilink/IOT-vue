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
      <el-table
        :data="groupList"
        tooltip-effect="light"
        height="300"
      >
        <el-table-column
          label="源IP"
          align="center"
          prop="attackerIp"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="目的IP"
          align="center"
          prop="victimIp"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件名称"
          align="center"
          prop="eventName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="威胁分类"
          align="center"
          prop="threatClassification"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span>{{
              translevelDic(scope.row.threatClassification)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="事件等级"
          align="center"
          prop="eventLevel"
        >
          <template #default="scope">
            <span>{{
              transTypeDic(scope.row.eventLevel)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="杀伤链阶段"
          align="center"
          prop="killingChainStage"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="发生时间"
          align="center"
          prop="happenTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="发现时间"
          align="center"
          prop="findTime"
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
import echarts from '@/components/Echarts/searchBar'
import eventTrend from '@/components/Echarts/eventTrend'
import eventType from '@/components/Echarts/eventType'
import wordcloud from '@/components/Echarts/wordcloud'
import tip from '@/components/EchartsTip'
import { zombieList } from '@/api/system/list'
export default {
  components: { echarts, eventTrend, eventType, wordcloud, tip },
  props: [],
  data() {
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
      this.loading = true
      const res = await zombieList(this.queryParams)
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
