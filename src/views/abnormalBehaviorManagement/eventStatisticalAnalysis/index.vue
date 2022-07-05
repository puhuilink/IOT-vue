<template>
  <div class="app-container">
    <echarts :event-type="2" @getquery="uploadData" />
    <eventTrend :query="query" :name="'abnormal'" :date="30" :search="'dm_event_abbm'" />
    <!-- 散点图，因需求有变，这个图先不用了，先不删这个组件，在本地用接口提供数据能展示效果，在118上调接口不展示，这个问题需要看一下原因 -->
    <!-- <killChainPhaseStatistics
      :query="query"
      :address="address"
      :search="'dm_event_hsme'"
    /> -->
    <eventType
      :tipname="'威胁分类分布'"
      :query="query"
      :name="'abnormal'"
      :type="'severity'"
    />
    <!-- <pieChartThreats :address="address"/> -->
    <!-- <pieChartDisposal :tipname="'事件等级分布'"
                      :query="query"
                      :name="'abnormal'"
                      :type="1" /> -->
    <killChainPhaseTrafficStatistics
      :query="query"
      :address="address"
      :search="'dm_event_abbm'"
    />
    <el-col :span="24">
      <tip> 最新威胁事件 </tip>
      <el-table :data="List" tooltip-effect="light" height="320">
        <el-table-column
          label="攻击者IP"
          align="center"
          prop="_source.ev_com_socket_src_ip"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="受害者IP"
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
          label="事件类型"
          align="center"
          prop="_source.event_format"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span
              v-if="
                scope.row._source.event_format == '' ||
                scope.row._source.event_format == null
              "
            />
            <span v-else>{{ transType(scope.row._source.event_format) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="事件等级" align="center" prop="severity">
          <template #default="scope">
            <span
              v-if="
                scope.row._source.severity == '' ||
                scope.row._source.severity == null
              "
            />
            <span v-else>{{ transTypeDic(scope.row._source.severity) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="杀伤链阶段"
          align="center"
          prop="_source.ev_ksec_killchain"
          :show-overflow-tooltip="true"
        /> -->
        <el-table-column label="杀伤链阶段" align="center" prop="ev_ksec_killchain">
          <template #default="scope">
            <span
              v-if="
                scope.row._source.ev_ksec_killchain == '' ||
                scope.row._source.ev_ksec_killchain == null
              "
            />
            <span v-else>{{ transKillchainDic(scope.row._source.ev_ksec_killchain) }}</span>
          </template>
        </el-table-column>
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
import echarts from "@/components/Echarts/searchBar";
import eventTrend from "@/components/Echarts/eventTrend";
import eventType from "@/components/Echarts/eventType";

import killChainPhaseStatistics from "@/components/Echarts/killChainPhaseStatistics";
import killChainPhaseTrafficStatistics from "@/components/Echarts/killChainPhaseTrafficStatistics";
import tip from "@/components/EchartsTip";
import { getAbnormalBehaviorEventRetrievalData } from "@/utils/request";
export default {
  components: {
    echarts,
    eventTrend,
    eventType,
    killChainPhaseStatistics,
    // pieChartThreats,
    killChainPhaseTrafficStatistics,
    tip,
  },
  props: [],
  data() {
    return {
      policitalStatus: ["1"],
      address: 1,
      query: {},
      // 分组表格数据
      List: [],
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        query: {
          bool: {
            must: [],
          },
        },
        sort: [{ occur_time: { order: "desc" } }],
        from: 0,
        size: 6,
      },
     transKillchainDic(val) {
      var t = [
        {
          content: "载荷投递",
          name: "Delivery",
        },
        {
          content: "侦查跟踪",
          name: "Recon",
        },
        {
          content: "漏洞利用",
          name: "Exploitation",
        },
        {
          content: "安装植入",
          name: "Beacon",
        },
        {
          content: "武器构建",
          name: "Weaponization",
        },
        {
          content: "命令控制",
          name: "CnC",
        },
        {
          content: "目标达成",
          name: "Actions on Objective",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      return `${orgTreeData1[0].content}`;
    },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    transType(val) {
      var t = [
        {
          label: "规则告警事件",
          value: "ksec_syslog_rule_eve",
        },
        {
          label: "威胁情报事件",
          value: "ksec_syslog_ioc_eve",
        },
        {
          label: "模型告警事件",
          value: "ksec_syslog_model_eve",
        },
        {
          label: "入侵诱捕事件",
          value: "msec_syslog_event",
        },
      ];
      const orgTreeData = t
        .filter((e) => e.value === val)
        .map(({ label }) => ({
          label,
        }));
      return `${orgTreeData[0].label}`;
    },
    transTypeDic(val) {
      var t = [
         {
          name: '1',
          content: "极低",
        },
        {
          name: '2',
          content: "低危",
        },
        {
          name: '3',
          content: "中危",
        },
        {
          name: '4',
          content: "高危",
        },
        {
          name: '5',
          content: "致命",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      return `${orgTreeData1[0].content}`;
    },
    uploadData(data) {
      this.query = data;
    },
    /** 查询分组列表 */
    async getList() {
      getAbnormalBehaviorEventRetrievalData(this.queryParams).then((res) => {
        this.queryParams.query.bool.must = [];
        this.total = res.data.hits.total;
        this.List = res.data.hits.hits;
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
