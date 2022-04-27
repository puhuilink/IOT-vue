<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form
            ref="queryForm"
            :model="queryParams"
            size="mini"
            label-width="100px"
            class="label-type"
            label-position="right"
          >
            <el-col :span="6">
              <el-form-item label="任务名称：" prop="detail_src_ip">
                <el-input
                  v-model="queryParams.detail_src_ip"
                  placeholder="请输入任务名称"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="任务类型：" prop="detail_dst_ip">
                <el-input
                  v-model="queryParams.detail_dst_ip"
                  placeholder="请输入任务类型"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="检测语言：" prop="event_format">
                <el-input
                  v-model="queryParams.event_format"
                  placeholder="请输入检测语言"
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
        <!-- <el-table-column type="selection" width="55" align="center" /> -->

        <el-table-column
          label="任务名称"
          align="center"
          prop="_source.occur_time"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="任务类型"
          align="center"
          prop="_source.detail_src_ip"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检测语言"
          align="center"
          prop="_source.ev_com_socket_src_port"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="源码名称"
          align="center"
          prop="_source.ev_wsec_infe_security_dev_ip"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检测开始时间"
          align="center"
          prop="_source.ev_wsec_infe_transport_layer_protocol"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span>{{
              transTransportProtocol(
                scope.row._source.ev_wsec_infe_transport_layer_protocol
              )
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检测结束时间"
          align="center"
          prop="_source.ev_wsec_infe_application_layer_protocol"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="缺陷总数"
          align="center"
          prop="_source.severity"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span>{{ transTypeDic(scope.row._source.severity) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审计后缺陷总数"
          align="center"
          prop="_source.event_format"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span>{{ transType(scope.row._source.event_format) }}</span>
          </template>
        </el-table-column>
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
      <div class="contentBox">
        <div class="information">任务详情</div>
        <el-form
          ref="form"
          label-width="160px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="任务名称 :">
                {{ detailData.name }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任务类型 :">
                {{ detailData.ipAddress }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检测语言 :">
                {{ detailData.assetModel }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检测开始时间 :">
                {{ detailData.assetName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检测完成时间 :">
                {{ detailData.assetType }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检测出缺陷总数 :">
                {{ detailData.manufacturer }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="高危缺陷总数 :">
                {{ detailData.assetValue }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="中危缺陷总数 :">
                {{ detailData.assetTag }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="低危缺陷总数 :">
                {{ detailData.Asset_description }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审计后的高危缺陷总数 :">
                {{ detailData.assetDescription }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审计后的中危缺陷总数 :">
                {{ detailData.runSoftware }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审计后的低危缺陷总数 :">
                {{ detailData.db }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审计后的缺陷总数 :">
                {{ detailData.riskState }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">源代码详情</div>
        <el-form
          ref=""
          label-width="135px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="检测对象大小 :">
                {{ detailData.assetGroup }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检测对象文件数量 :">
                {{ detailData.assetGroup }}</el-form-item
              >
            </el-col>
            <el-col :span="8">
              <el-form-item label="总行数 :">
                {{ detailData.assetGroup }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代码行数 :">
                {{ detailData.assetGroup }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="空行数 :">
                {{ detailData.assetGroup }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="混合行 :">
                {{ detailData.assetGroup }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="方法数量 :">
                {{ detailData.assetGroup }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="类数量 :"> </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="源码名称 :"> </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">代码类型数量</div>
        <el-form
          ref=""
          label-width="100px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="js :">
                {{ detailData.assetGroup }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="html :">
                {{ detailData.assetGroup }}</el-form-item
              >
            </el-col>
            <el-col :span="8">
              <el-form-item label="properties :">
                {{ detailData.assetGroup }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">缺陷详情</div>
        <el-table :data="groupDefectList" style="width: 100%">
          <el-table-column
            label="缺陷类型"
            align="center"
            prop="assetName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="文件名称"
            align="center"
            prop="ip"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="文件类型"
            align="center"
            prop="ipType"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="规则名称"
            align="center"
            prop="applicationProtocol"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="缺陷等级" align="center" prop="eventLevel" />
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
            width="180"
          >
            <template>
              <el-button size="mini" type="text" @click="defectDetail()"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>

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
    <!-- 缺陷详情 -->
    <el-dialog
      :title="title"
      :visible.sync="defectDetailDialog"
      width="860px"
      append-to-body
    >
      <div class="contentBox">
        <el-form
          ref="form"
          label-width="110px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="缺陷类型 :">
                {{ detailData.name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺陷等级 :">
                {{ detailData.ipAddress }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规则名称 :">
                {{ detailData.assetModel }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺陷起始行 :">
                {{ detailData.assetName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺陷结束行 :">
                {{ detailData.assetType }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺陷起始列 :">
                {{ detailData.manufacturer }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺陷结束列 :">
                {{ detailData.assetValue }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺陷描述 :">
                {{ detailData.manufacturer }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="修复建议 :">
                {{ detailData.assetValue }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
import { getFirewallAccessControlEventData } from "@/utils/request";
import { industryList } from "@/api/system/list";
export default {
  name: "Online",
  data() {
    return {
      from: 1,
      title: "",
      detailData: {},
      detailDialog: false,
      defectDetailDialog: false,
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
        // sort: [{ occur_time: { order: "desc" } }],
        from: 0,
        size: 10,
      },
      // 分组表格数据
      groupList: [],
      groupDefectList: [
        {
          assetName: "未使用变量",
          ip: "eval.js",
          ipType: "javascript",
          applicationProtocol: "JavaScript劫持",
          eventLevel: "高危",
        },
      ],
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
        ev_wsec_infe_application_layer_protocol: "",
        event_format: "",
        date: [],
      },
      levelOptions: [
        {
          label: "极低",
          value: "1",
        },
        {
          label: "低危",
          value: "2",
        },
        {
          label: "中危",
          value: "3",
        },
        {
          label: "高危",
          value: "4",
        },
        {
          label: "致命",
          value: "5",
        },
      ],
      disposalStatusOptions: [
        {
          label: "待处置",
          value: "待处置",
        },
        {
          label: "处置中",
          value: "处置中",
        },
        {
          label: "已处置",
          value: "已处置",
        },
        {
          label: "误报",
          value: "误报",
        },
        {
          label: "不处置",
          value: "不处置",
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
        "detail_src_ip",
        this.queryParams.detail_src_ip
      );

      this.addQuery(
        this.query,
        "detail_dst_ip",
        this.queryParams.detail_dst_ip
      );

      this.addQuery(this.query, "location.keyword", this.queryParams.location);

      this.addQuery(
        this.query,
        "ev_wsec_infe_application_layer_protocol",
        this.queryParams.ev_wsec_infe_application_layer_protocol
      );

      this.addQuery(this.query, "procedure", this.queryParams.procedure);

      this.addQuery(this.query, "severity", this.queryParams.severity);

      this.addQuery(this.query, "event_format", this.queryParams.event_format);

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

      getFirewallAccessControlEventData(this.query).then((res) => {
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
    transType(val) {
      var t = [
        {
          name: "wsec_syslog_infe_ev_02",
          content: "ACL告警事件",
        },
        {
          name: "wsec_syslog_infe_ev_01",
          content: "工业防火墙白名单",
        },
        {
          name: "wsec_syslog_infe_ev_05",
          content: "地址欺诈事件",
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
    transTransportProtocol(val) {
      var t = [
        {
          name: "6",
          content: "TCP",
        },
        {
          name: "17",
          content: "UDP",
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
    handleQuery() {
      this.getTableList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        detail_src_ip: "",
        detail_dst_ip: "",
        location: "",
        ev_wsec_infe_application_layer_protocol: "",
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
      this.defectDetailDialog = false;
    },
    /** 提交按钮 */
    submitForm() {
      this.detailDialog = false;
      this.defectDetailDialog = false;
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
    async defectDetail(row) {
      this.defectDetailData = row;
      this.defectDetailDialog = true;
      this.title = "缺陷详情";
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 0 !important;
}
.contentBox {
  width: 100%;
  height: 100%;
  border-top: 1px solid #ccc;
  padding: 10px 20px;
  .information {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    border-bottom: 2px solid #33ccff;
    padding-top: 10px;
    margin-bottom: 10px;
  }
  .dialog-footer {
    margin-top: 20px;
  }
}
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
