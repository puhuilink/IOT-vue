<template>
  <div class="app-container">
    <echarts :event-type="1" @getquery="uploadData" />
    <eventTrend :query="query" :name="'host'" :search="'event_hsme'" />
    <eventType
      :query="query"
      :tipname="'事件类型分布'"
      :type="'event_format'"
      :name="'host'"
    />
    <wordcloud :query="query" :address="address" :host="1" :name="'host'" />
    <eventType
      :query="query"
      :tipname="'事件状态处置图'"
      :type="'procedure'"
      :name="'host'"
    />
    <el-col :span="24">
      <tip> 最新主机安全事件 </tip>
      <el-table :data="List" tooltip-effect="light" height="320">
        <el-table-column
          label="接收时间"
          align="center"
          prop="_source.receive_time"
          :show-overflow-tooltip="true"
        />
        <!-- <el-table-column
          label="事件名称"
          align="center"
          prop="_source.event_format"
          :show-overflow-tooltip="true"
        /> -->
        <el-table-column
          label="事件名称"
          align="center"
          prop="event_format"
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
        <el-table-column
          label="事件等级"
          align="center"
          prop="_source.severity"
          :show-overflow-tooltip="true"
        >
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
        <el-table-column
          label="事件类型"
          align="center"
          prop="event_format"
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
        <el-table-column
          label="客户端名称"
          align="center"
          prop="_source.ev_wsec_hsme_system_osuser"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="客户端IP"
          align="center"
          prop="_source.ev_wsec_hsme_system_ip"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="发生时间"
          align="center"
          prop="_source.occur_time"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="日志描述"
          align="center"
          prop="_source.description"
          :show-overflow-tooltip="true"
        />
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
import echarts from "@/components/Echarts/searchBar";
import eventTrend from "@/components/Echarts/eventTrend";
import wordcloud from "@/components/Echarts/wordcloud";
import eventType from "@/components/Echarts/eventType";
import tip from "@/components/EchartsTip";
import { getHostSecurityData } from "@/utils/request";
export default {
  components: {
    echarts,
    eventTrend,
    wordcloud,
    eventType,
    tip,
  },
  props: [],
  data() {
    return {
      List: [],
      policitalStatus: ["1"],
      address: 1,
      query: {},
      // 分组表格数据
      groupList: [],
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
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    transTypeDic(val) {
      var t = [
        {
          name: "1",
          content: "极低",
        },
        {
          name: "2",
          content: "低危",
        },
        {
          name: "3",
          content: "中危",
        },
        {
          name: "4",
          content: "高危",
        },
        {
          name: "5",
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
    async getList() {
      getHostSecurityData(this.queryParams).then((res) => {
        this.queryParams.query.bool.must = [];
        this.total = res.data.hits.total;
        this.List = res.data.hits.hits;
      });
    },
    transType(val) {
      var t = [
        {
          label: "程序告警事件",
          value: "wsec_syslog_hsme_ev_07",
        },
        {
          label: "外设告警事件",
          value: "wsec_syslog_hsme_ev_08",
        },
        {
          label: "主机防火墙事件",
          value: "wsec_syslog_hsme_ev_09",
        },
        {
          label: "访问控制事件",
          value: "wsec_syslog_hsme_ev_10",
        },
        {
          label: "主机非法外联",
          value: "wsec_syslog_hsme_ev_22",
        },
        {
          label: "恶意文件事件",
          value: "wsec_syslog_hsme_ev_30",
        },
      ];
      const orgTreeData = t
        .filter((e) => e.value === val)
        .map(({ label }) => ({
          label,
        }));
      return `${orgTreeData[0].label}`;
    },
  },
};
</script>
<style lang="scss" scoped></style>
