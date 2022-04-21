<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form
            ref="queryForm"
            :model="queryParams"
            :rules="rules"
            size="mini"
            label-width="95px"
            class="label-type"
            label-position="right"
          >
            <el-col :span="6">
              <el-form-item label="源IP地址：" prop="ipaddr">
                <el-input
                  v-model="queryParams.detail_src_ip"
                  placeholder="请输入源IP地址"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="目的IP地址：" prop="userName">
                <el-input
                  v-model="queryParams.detail_dst_ip"
                  placeholder="请输入目的IP地址"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域：" prop="userName">
                <el-select
                  v-model="queryParams.location"
                  placeholder="请选择区域"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in areaOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="处置状态：" prop="ipaddr">
                <el-select
                  v-model="queryParams.procedure"
                  placeholder="请选择处置状态"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in disposalStatusOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="事件等级：" prop="userName">
                <el-select
                  v-model="queryParams.severity"
                  placeholder="请选择事件等级"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in levelOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="事件类型：" prop="userName">
                <el-input
                  v-model="queryParams.event_format"
                  placeholder="请输入事件类型"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="时间：" prop="date">
                <el-date-picker
                  v-model="queryParams.date"
                  size="small"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  range-separator="至"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  size="mini"
                  @click="handleQuery"
                  >搜索</el-button
                >
                <el-button
                  icon="el-icon-refresh"
                  size="mini"
                  @click="resetQuery"
                  >重置</el-button
                >
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-table :data="List" tooltip-effect="light">
        <el-table-column type="selection" width="55" align="center" />

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
            <span>{{ transTypeDic(scope.row._source.severity) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="事件类型"
          align="center"
          prop="_source.event_format"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span>{{ transType(scope.row._source.event_format) }}</span>
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
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          width="180"
        >
          <template #default="{ row }">
            <el-button size="mini" type="text" @click="detail(row._source)"
              >详情</el-button
            >
            &nbsp;&nbsp; &nbsp;&nbsp;
            <el-dropdown @command="batchOperate">
              <el-button size="mini" type="text">
                状态变更<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-check" command="process"
                  >处置</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-close" command="un_process"
                  >不处置</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-bell" command="false_report"
                  >误报</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="from"
        :limit.sync="query.size"
        @pagination="getTableList"
      />
    </el-card>
    <!--   详情分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="detailDialog"
      width="860px"
      append-to-body
    >
      <div class="el-dialog-div">
        <el-row :gutter="25">
          <el-form
            ref="elForm"
            :model="detailData"
            size="mini"
            label-width="133px"
          >
            <el-col :span="12">
              <el-form-item label="源IP：" prop="detail_src_ip">
                <tooltip :content="detailData.detail_src_ip" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="源设备：">
                <tooltip
                  :content="detailData.ev_com_socket_src_hostname"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="源端口：" prop="ev_com_socket_src_port">
                <tooltip
                  :content="detailData.ev_com_socket_src_port"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="源MAC：">
                <tooltip
                  :content="detailData.ev_com_link_src_mac"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的IP：" prop="aimIp">
                <tooltip :content="detailData.detail_dst_ip" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的MAC：" prop="field106">
                <tooltip
                  :content="detailData.ev_com_link_dst_mac"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的设备：" prop="field107">
                <tooltip
                  :content="detailData.ev_com_socket_dst_hostname"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的端口：" prop="aimPort">
                <tooltip
                  :content="detailData.ev_com_socket_dst_port"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="传输层协议：" prop="transportProtocol">
                <tooltip
                  :content="detailData.ev_wsec_inpa_transport_layer_protocol"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应用层协议：" prop="applyProtocol">
                <tooltip
                  :content="detailData.ev_wsec_inpa_application_layer_protocol"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件级别：" prop="level">
                <tooltip :content="detailData.severity" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label=" 事件类型：" prop="type">
                <tooltip :content="detailData.event_format" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产生时间：" prop="happen">
                <tooltip :content="detailData.occur_time" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接收时间：" prop="receive_time">
                <tooltip :content="detailData.receive_time" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="智能监测终端IP：" prop="field115">
                <tooltip
                  :content="detailData.ev_wsec_inpa_monitor_terminal_ip"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="区域：" prop="location">
                <tooltip :content="detailData.location" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处置状态：" prop="procedure">
                <tooltip :content="detailData.procedure" :length="20" />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="submitForm"
              >保 存</el-button
            >
            <el-button size="small" @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getIndustrialNetworkAuditData } from "@/utils/request";
import { industryList } from "@/api/system/list";
export default {
  name: "Online",
  data() {
    return {
      from: 1,
      activeNames: ["1"],
      title: "",
      detailData: {},
      detailDialog: false,
      // 遮罩层
      loading: false,
      // 总条数
      total: 0,
      query: {
        query: {
          bool: {
            must: [],
          },
        },
        sort: [{ occur_time: { order: "desc" } }],
        from: 0,
        size: 10,
      },
      // 分组表格数据
      groupList: [],
      List: [],
      pageNum: 1,
      pageSize: 10,
      // 查询参数
      queryParams: {
        detail_src_ip: "",
        detail_dst_ip: "",
        location: "",
        procedure: "",
        severity: "",
        event_format: "",
        date: [],
      },
      levelOptions: [
        {
          label: "极低",
          value: '1',
        },
        {
          label: "低危",
          value: '2',
        },
        {
          label: "中危",
          value: '3',
        },
        {
          label: "高危",
          value: '4',
        },
        {
          label: "致命",
          value: '5',
        },
      ],
      disposalStatusOptions: [
        {
          label: "未处置",
          value: 1,
        },
        {
          label: "处置中",
          value: 2,
        },
        {
          label: "已处置",
          value: 3,
        },
        {
          label: "已完成",
          value: 4,
        },
        {
          label: "待处置",
          value: 5,
        },
      ],
      areaOptions: [
        {
          label: "三亚海投轨交",
          value: 1,
        },
        {
          label: "珠海深中通道",
          value: 2,
        },
        {
          label: "山西三通燃气厂",
          value: 3,
        },
        {
          label: "北京城乡水厂",
          value: 4,
        },
        {
          label: "天津管片厂",
          value: 5,
        },
      ],
      statusOptions: [
        {
          label: "在线",
          value: 1,
        },
        {
          label: "离线",
          value: 2,
        },
        {
          label: "异常",
          value: 3,
        },
      ],
    };
  },
  watch: {
    "queryParams.date"(newVal) {
      if (newVal == null) {
        this.queryParams.date = [];
      }
    },
  },
  created() {
    // this.getList()
    this.getTableList();
  },
  methods: {
    //映射事件类型字段

    // 根据对象中的key是否值为空x向数组中添加对象
    addQuery(query, key, value) {
      if (value !== "") {
        query.query.bool.must.push({
          match: {
            [key]: value,
          },
        });
      }
    },
    async getTableList() {
      this.addQuery(
        this.query,
        "detail_src_ip.keyword",
        this.queryParams.detail_src_ip
      );

      this.addQuery(
        this.query,
        "detail_dst_ip.keyword",
        this.queryParams.detail_dst_ip
      );

      this.addQuery(this.query, "location.keyword", this.queryParams.location);

      this.addQuery(
        this.query,
        "procedure.keyword",
        this.queryParams.procedure
      );

      this.addQuery(this.query, "severity.keyword", this.queryParams.severity);

      this.addQuery(
        this.query,
        "event_format.keyword",
        this.queryParams.event_format
      );

      this.query.from = this.from - 1;

      if (this.queryParams.date.length > 0) {
        this.query.query.bool.must.push({
          range: {
            occur_time: {
              gte: this.queryParams.date[0],
              lte: this.queryParams.date[1],
            },
          },
        });
      }

      getIndustrialNetworkAuditData(this.query).then((res) => {
        this.query.query.bool.must = [];
        this.groupList = [];
        this.total = res.data.hits.total;
        this.List = res.data.hits.hits;
      });
      this.detailData.severity = this.transTypeDic(this.detailData.severity);
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
    transType(val) {
      var t = [
        {
          name: "wsec_syslog_inpa_ev_17",
          content: "审计协议白名单",
        },
        {
          name: "wsec_syslog_inpa_ev_20",
          content: "审计关键事件",
        },
        {
          name: "wsec_syslog_inpa_ev_21",
          content: "审计自定义事件",
        },
        {
          name: "wsec_syslog_inpa_ev_23",
          content: "审计协议规约",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      // console.log(orgTreeData1[0].content);
      return `${orgTreeData1[0].content}`;
    },
    batchOperate(command) {
      let message = "";
      switch (command) {
        case "process":
          message = "是否确认变更处置状态？";
          this.openMessageBox(message);
          break;
        case "un_process":
          message = "是否确认将此事件处置状态修改为不处置？";
          this.openMessageBox(message);
          break;
        case "false_report":
          message = "是否确认将此事件处置状态修改为误报？";
          this.openMessageBox(message);
          break;
      }
    },
    openMessageBox(message) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改！",
          });
        });
    },
    /** 查询分组列表 */
    async getList() {
      this.loading = true;
      const res = await industryList(this.queryParams);
      this.groupList = res.rows;
      this.total = res.total;
      this.loading = false;
    },
    /** 搜索按钮操作 */
    // handleQuery () {
    //   this.pageNum = 1
    //   this.getList()
    // },
    handleQuery() {
      this.getTableList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        detail_src_ip: "",
        detail_dst_ip: "",
        location: "",
        procedure: "",
        severity: "",
        event_format: "",
        date: [],
      };
      this.getTableList();
    },
    // 取消按钮
    cancel() {
      this.detailDialog = false;
    },
    /** 提交按钮 */
    submitForm() {
      this.detailDialog = false;
    },
    async detail(row) {
      // const { data } = await industrialNetworkAuditDetail(row)
      this.detailData = row;
      this.detailDialog = true;
      this.title = "事件详情";
      this.detailData.severity = this.transTypeDic(this.detailData.severity);
      this.detailData.event_format = this.transType(
        this.detailData.event_format
      );
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-collapse-item__header {
  font-size: 21px;
  border-bottom: 0px solid rgba(0, 0, 0, 0);
  flex: 1 0 auto;
  order: -1;
}
::v-deep .el-collapse {
  border-top: 0px solid rgba(0, 0, 0, 0);
  border-bottom: 0px solid rgba(0, 0, 0, 0);
}
::v-deep .label-type {
  .el-form-item__label {
    color: #333;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal !important;
  }
}
.el-dialog-div {
  height: 50vh;
  overflow: auto;
  overflow-x: hidden;
}
.collapse-title {
  flex: 1 0 90%;
  order: 1;
}
</style>
