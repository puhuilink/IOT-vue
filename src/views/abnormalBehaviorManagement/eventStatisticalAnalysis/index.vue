<template>
  <div class="app-container">
    <echarts :event-type="2"
             @getquery="uploadData" />
    <eventTrend :query="query"
                :name="'abnormal'" />
    <killChainPhaseStatistics :query="query"
                              :address="address" />
    <eventType :tipname="'事件等级分布'"
               :query="query"
               :name="'abnormal'"
               :type="1" />
    <!-- <pieChartThreats :address="address"/> -->
    <!-- <pieChartDisposal :tipname="'事件等级分布'"
                      :query="query"
                      :name="'abnormal'"
                      :type="1" /> -->
    <killChainPhaseTrafficStatistics :query="query"
                                     :address="address" />
    <el-col :span="24">
      <tip> 最新威胁事件 </tip>
      <el-table :data="groupList"
                height="300"
                tooltip-effect="light">
        <el-table-column label="攻击者IP"
                         align="center"
                         prop="attackerIp"
                         :show-overflow-tooltip="true" />
        <el-table-column label="受害者IP"
                         align="center"
                         prop="victimIp"
                         :show-overflow-tooltip="true" />
        <el-table-column label="事件名称"
                         align="center"
                         prop="eventName" />
        <el-table-column label="事件等级"
                         align="center"
                         prop="eventLevel">
          <template #default="scope">
            <span>{{
              transTypeDic(scope.row.eventLevel)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="杀伤链阶段"
                         align="center"
                         prop="killingChainStage"
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

import killChainPhaseStatistics from '@/components/Echarts/killChainPhaseStatistics'
// import pieChartThreats from "@/components/Echarts/pieChartThreats";
import killChainPhaseTrafficStatistics from '@/components/Echarts/killChainPhaseTrafficStatistics'
import tip from '@/components/EchartsTip'
import { abnormalList } from '@/api/system/list'
export default {
  components: {
    echarts,
    eventTrend,
    eventType,
    killChainPhaseStatistics,
    // pieChartThreats,
    killChainPhaseTrafficStatistics,
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
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        groupName: null,
        createTime: null
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
    /** 查询分组列表 */
    async getList () {
      this.loading = true
      const res = await abnormalList(this.queryParams)
      this.groupList = res.rows
      this.total = res.total
      console.log(this.groupList)
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
