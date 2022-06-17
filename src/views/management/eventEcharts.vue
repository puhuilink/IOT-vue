<template>
  <div class="app-container">
    <echarts @getquery="uploadData" />
    <eventTrend :query="query" :name="'event'" :search="'eventlog'" />
    <eventType
      :query="query"
      :name="'event'"
      :tipname="'事件类型分布'"
      :type="'event_class'"
    />
    <wordcloud :query="query" :name="'event'" />
    <eventType
      :tipname="'事件状态处置图'"
      :type="'procedure'"
      :query="query"
      :name="'event'"
    />
    <el-col :span="24">
      <tip> 最新威胁事件 </tip>
      <el-table v-loading="loading" :data="List" tooltip-effect="light">
        <!-- <el-table-column
        type="selection"
        width="55"
        align="center"
      /> -->
      <el-table-column
        label="事件名称"
        align="center"
        prop="_source.event_name"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="源IP"
        align="center"
        prop="_source.detail_src_ip"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="目的IP"
        align="center"
        prop="_source.detail_dst_ip"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="协议"
        align="center"
        prop="_source.detail_protocol"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="事件等级" align="center" prop="_source.severity">
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
        prop="_source.event_class"
      >
        <template #default="scope">
          <span
            v-if="
              scope.row._source.event_class == '' ||
              scope.row._source.event_class == null
            "
          />
          <span v-else>{{ transClassDic(scope.row._source.event_class) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="处置状态"
        align="center"
        prop="_source.procedure"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="事件开始时间"
        align="center"
        prop="_source.occur_time"
        :show-overflow-tooltip="true"
      />
      <!-- <el-table-column
        label="事件结束时间"
        align="center"
        prop="_source.close_time"
        :show-overflow-tooltip="true"
      /> -->
      <el-table-column
        label="区域"
        align="center"
        prop="_source.location"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="上报设备"
        align="center"
        prop="_source.agent"
        :show-overflow-tooltip="true"
      />
      </el-table>
    </el-col>
  </div>
</template>
<script>
import { getManagementThreatEventsData } from "@/utils/request";
import echarts from "@/components/Echarts/searchBar";
import eventTrend from "@/components/Echarts/eventTrend";
import eventType from "@/components/Echarts/eventType";
import wordcloud from "@/components/Echarts/wordcloud";
import { eventList } from "@/api/system/list";
import tip from "@/components/EchartsTip";
export default {
  components: { echarts, eventTrend, eventType, wordcloud, tip },
  props: [],
  data() {
    return {
      policitalStatus: ["1"],
      // 查询参数
      // query: {
      //   query: {
      //     bool: {
      //       must: [],
      //     },
      //   },
      //   // sort: [{ occur_time: { order: "desc" } }],
      //   from: 0,
      //   size: 6,
      // },
       query: {
        query: {
          bool: {
            must: [],
          },
        },
        sort: [{ occur_time: { order: "desc" } }],
        from: 0,
        size: 6,
      },
      // groupList: [],
      List: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    // this.getCategoryList();
    this.getTableList();
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
     transClassDic(val) {
      var t = [
        {
          name: "class_ivtp",
          content: "入侵诱捕事件",
        },
        {
          name: "class_abbm",
          content: "异常行为管理",
        },
        {
          name: "class_ztwe",
          content: "僵木蠕事件",
        },
        {
          name: "class_iocm",
          content: "威胁情报管理",
        },
        {
          name: "class_wkpw",
          content: "弱口令事件",
        },
        {
          name: "class_inpa",
          content: "工业网络审计",
        },
        {
          name: "class_hsme",
          content: "主机安全管理",
        },
        {
          name: "class_scce",
          content: "配置核查管理",
        },
        {
          name: "class_dsme",
          content: "数据安全管理",
        },
        {
          name: "class_infe",
          content: "工业防火墙事件",
        },
        {
          name: "class_wppe",
          content: "网页防篡改事件",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      return `${orgTreeData1[0].content}`;
    },
    // async getCategoryList() {
    //   this.loading = true;
    //   const res = await eventList(this.queryParams);
    //   this.groupList = res.rows;
    //   this.total = res.total;
    //   this.loading = false;
    // },
    async getTableList() {
      getManagementThreatEventsData(this.query).then((res) => {
        this.query.query.bool.must = [];
        this.groupList = [];
        this.total = res.data.hits.total;
        this.List = res.data.hits.hits;
      });
    },
    uploadData(data) {
      this.query = data;
    },
  },
};
</script>
<style lang="scss" scoped></style>
