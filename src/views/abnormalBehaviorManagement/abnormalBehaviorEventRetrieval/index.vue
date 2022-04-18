<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form
            ref="elForm"
            :model="queryParams"
            :rules="rules"
            size="mini"
            label-width="90px"
            class="label-type"
            label-position="right"
          >
            <el-col :span="6">
              <el-form-item label="事件名称:" prop="event_name">
                <el-input
                  v-model="queryParams.event_name"
                  placeholder="请输入事件名称"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域:" prop="location">
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
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="事件等级:" prop="severity">
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
              <el-form-item label="处置状态:" prop="procedure">
                <el-select
                  v-model="queryParams.procedure"
                  placeholder="请选择处置状态"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in statusOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="受害者IP:" prop="ev_com_socket_dst_ip">
                <el-input
                  v-model="queryParams.ev_com_socket_dst_ip"
                  placeholder="请输入受害者IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="攻击者IP:" prop="ev_com_socket_src_ip">
                <el-input
                  v-model="queryParams.ev_com_socket_src_ip"
                  placeholder="请输入攻击者IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="时间:" prop="date">
                <el-date-picker
                  v-model="queryParams.date"
                  type="daterange"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  range-separator="至"
                   :style="{ width: '100%' }"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="杀伤链阶段:" prop="ev_ksec_killchain">
                <el-select
                  v-model="queryParams.ev_ksec_killchain"
                  placeholder="请选择杀伤链阶段"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in killingChainStageOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item size="mini">
                <el-button type="primary" @click="btnQuery">搜索</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card>
      <el-button type="primary" class="export" @click="submitdata"
        >导出</el-button
      >
      <el-table :data="List" tooltip-effect="light">
        <el-table-column type="selection" width="55" align="center" />
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
        <el-table-column
          label="杀伤链阶段"
          align="center"
          prop="_source.ev_ksec_killchain"
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
          prop="_source.ev_com_event_observe_time"
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
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="detail(scope.row._source)"
              >详情</el-button
            >
            &nbsp;&nbsp; &nbsp;&nbsp;
            <el-dropdown @command="batchOperate">
              <el-button size="mini" type="text"
                >状态变更<i class="el-icon-arrow-down el-icon--right"
              /></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="process">处置</el-dropdown-item>
                <el-dropdown-item command="un_process">不处置</el-dropdown-item>
                <el-dropdown-item command="false_report">误报</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="from"
      :limit.sync="query.size"
      @pagination="getTableList"
    />
    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <div class="contentBox">
        <el-form
          ref="form"
          label-width="95px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="事件名称 :">
                {{ detailData.event_name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件类型 :">
                {{ detailData.event_format }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="杀伤链阶段 :">
                {{ detailData.ev_ksec_killchain }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件等级 :">
                {{ detailData.severity }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="攻击者IP :">
                {{ detailData.ev_com_socket_src_ip }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="攻击者国家 :">
                {{ detailData.ev_com_socket_src_ip_country }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="受害者IP :">
                {{ detailData.ev_com_socket_dst_ip }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="受害者国家 :">
                {{ detailData.ev_com_socket_dst_ip_country }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="源端口 :">
                {{ detailData.ev_com_socket_src_port }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目标端口 :">
                {{ detailData.ev_com_socket_dst_port }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="协议 :">
                {{ detailData.ev_com_socket_protocol }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="威胁分类 :">
                {{ detailData.event_format }}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="发生时间 :">
                {{ detailData.occur_time }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发现时间 :">
                {{ detailData.ev_com_event_observe_time }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处置状态 :">
                {{ detailData.procedure }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="区域 :">
                {{ detailData.location }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" type="primary" @click="submitForm"
            >确 定</el-button
          >
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAbnormalBehaviorEventRetrievalData } from "@/utils/request";
import { abnormalList } from "@/api/system/list";

export default {
  components: {},
  props: [],
  data() {
    return {
      from: 1,
      loading: false,
      name: "测试",
      detailData: {},
      // 分组表格数据
      groupList: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
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
      List: [],
      // 查询参数
      queryParams: {
        event_name: "",
        location: "",
        severity: "",
        event_format: "",
        procedure: "",
        ev_com_socket_dst_ip: "",
        ev_com_socket_src_ip: "",
        ev_ksec_killchain: "",
        date: [],
      },
      rules: {
        name: [],
        severity: [],
        type: [],
        location: [],
        ev_com_socket_protocol: [],
        ev_com_socket_dst_ip: [],
        ev_com_socket_src_ip: [],
        equipment: [],
        date: [],
      },
      levelOptions: [
        {
          label: "极低",
          value: 1,
        },
        {
          label: "低危",
          value: 2,
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
          value: 5,
        },
      ],
      areaOptions: [
        {
          label: "天津管片厂",
          value: "天津管片厂",
        },
        {
          label: "三亚海投轨交",
          value: "三亚海投轨交",
        },
        {
          label: "北京城乡水厂",
          value: "北京城乡水厂",
        },
        {
          label: "山西三通燃气厂",
          value: "山西三通燃气厂",
        },
        {
          label: "珠海深中通道",
          value: "珠海深中通道",
        },
      ],
      statusOptions: [
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
      killingChainStageOptions: [
        {
          label: "载荷投递",
          value: "载荷投递",
        },
        {
          label: "侦查跟踪",
          value: "侦查跟踪",
        },
        {
          label: "漏洞利用",
          value: "漏洞利用",
        },
        {
          label: "安装植入",
          value: "安装植入",
        },
        {
          label: "武器构建",
          value: "武器构建",
        },
        {
          label: "命令控制",
          value: "命令控制",
        },
        {
          label: "目标达成",
          value: "目标达成",
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
    transType(val) {
      var t = [
        {
          label: "模型告警事件",
          value: "ksec_syslog_model_eve",
        },
      ];
      const orgTreeData = t
        .filter((e) => e.value === val)
        .map(({ label }) => ({
          label,
        }));
      return `${orgTreeData[0].label}`;
    },
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
      this.addQuery(this.query, "event_name", this.queryParams.event_name);

      this.addQuery(this.query, "location", this.queryParams.location);

      this.addQuery(this.query, "severity", this.queryParams.severity);

      this.addQuery(this.query, "event_format", this.queryParams.event_format);

      this.addQuery(this.query, "procedure", this.queryParams.procedure);

      this.addQuery(
        this.query,
        "ev_com_socket_dst_ip",
        this.queryParams.ev_com_socket_dst_ip
      );

      this.addQuery(
        this.query,
        "ev_com_socket_src_ip",
        this.queryParams.ev_com_socket_src_ip
      );

      this.addQuery(
        this.query,
        "ev_ksec_killchain",
        this.queryParams.ev_ksec_killchain
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

      getAbnormalBehaviorEventRetrievalData(this.query).then((res) => {
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
          name: 1,
          content: "极低",
        },
        {
          name: 2,
          content: "低危",
        },
        {
          name: 3,
          content: "中危",
        },
        {
          name: 4,
          content: "高危",
        },
        {
          name: 5,
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
      const res = await abnormalList(this.queryParams);
      this.groupList = res.rows;
      this.total = res.total;
      console.log(this.groupList);
      this.loading = false;
    },
    btnQuery() {
      this.getTableList();
    },
    submitdata() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      this.queryParams = {
        event_name: "",
        location: "",
        severity: "",
        event_format: "",
        procedure: "",
        ev_com_socket_dst_ip: "",
        ev_com_socket_src_ip: "",
        ev_ksec_killchain: "",
        date: [],
      };
      this.getTableList();
    },
    async detail(row) {
      // const { data } = await abnormalDetail(id)
      this.detailData = row;
      this.open = true;
      this.title = "事件详情";
      this.detailData.severity = this.transTypeDic(this.detailData.severity);
      this.detailData.event_format = this.transType(
        this.detailData.event_format
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.export {
  margin-bottom: 10px;
}
::v-deep .el-dialog__body {
  padding: 0 !important;
}
.contentBox {
  width: 100%;
  height: 100%;
  border-top: 1px solid #ccc;
  padding: 10px 20px;
}
::v-deep .label-type {
  .el-form-item__label {
    color: #333;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal !important;
  }
}
</style>
