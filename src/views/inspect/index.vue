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
            label-width="100px"
            class="label-type"
            label-position="right"
          >
            <el-col :span="6">
              <el-form-item label="检查项：" prop="agreement">
                <el-input
                  v-model="queryParams.event_name"
                  placeholder="请输入检查项"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域：" prop="area">
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
              <el-form-item label="事件等级：" prop="level">
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
              <el-form-item label="处置状态：" prop="field114">
                <el-select
                  v-model="queryParams.procedure"
                  placeholder="请选择处置状态"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in field114Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态：" prop="field114">
                <el-select
                  v-model="queryParams.ev_wsec_scce_scc_result"
                  placeholder="请选择状态"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in statusptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="IP：" prop="detail_src_ip">
                <el-input
                  v-model="queryParams.detail_src_ip"
                  placeholder="请输入IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="时间：" prop="date">
                <el-date-picker
                  v-model="queryParams.date"
                  type="daterange"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  range-separator="至"
                  clearable
                />
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
    <el-table :data="List" tooltip-effect="light">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="检查项"
        align="center"
        prop="_source.event_name"
        :show-overflow-tooltip="true"
        min-width="15%"
      />
      <el-table-column
        label="事件等级"
        align="center"
        prop="_source.severity"
        :show-overflow-tooltip="true"
        min-width="10%"
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
        label="IP"
        align="center"
        prop="_source.detail_src_ip"
        :show-overflow-tooltip="true"
        min-width="10%"
      />
      <el-table-column
        label="状态"
        align="center"
        prop="_source.ev_wsec_scce_scc_result"
        min-width="10%"
      />
      <el-table-column
        label="发生时间"
        align="center"
        prop="_source.occur_time"
        :show-overflow-tooltip="true"
        min-width="15%"
      />
      <el-table-column
        label="处置状态"
        align="center"
        prop="_source.procedure"
        min-width="10%"
      />
      <el-table-column
        label="区域"
        align="center"
        prop="_source.location"
        :show-overflow-tooltip="true"
        min-width="10%"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="15%"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="detail(scope.row._source)"
            >详情</el-button
          >
          &nbsp;&nbsp; &nbsp;&nbsp;
          <el-dropdown @command="batchOperate">
            <el-button size="mini" type="text">
              状态变更<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="process">处置</el-dropdown-item>
              <el-dropdown-item command="un_process">不处置</el-dropdown-item>
              <el-dropdown-item command="false_report">误报</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="from"
      :limit.sync="querys.size"
      @pagination="getTableList"
    />
    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" label-width="100px" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="检查项 :">
              <tooltip :content="detailData.event_name" :length="30" />
              <!-- {{ detailData.event_name }} -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件等级 :">
              {{ detailData.severity }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="IP :">
              {{ detailData.detail_src_ip }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态 :">
              {{ detailData.ev_wsec_scce_scc_result }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发生时间 :">
              {{ detailData.occur_time }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域 :">
              {{ detailData.location }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处置状态 :">
              {{ detailData.procedure }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
import { getConfigurationData } from "@/utils/request";
export default {
  name: "EventDetail",
  components: {},
  props: [],
  data() {
    return {
      from: 1,
      loading: true,
      name: "测试",
      detailData: {},
      // 分组表格数据
      groupList: [],
      List: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: "漏洞详情",
      // linux否显示弹出层
      open: false,
      // 总条数
      total: 0,
      querys: {
        query: {
          bool: {
            must: [],
          },
        },
        sort: [{ occur_time: { order: "desc" } }],
        from: 0,
        size: 10,
      },
      // 查询参数
      queryParams: {
        event_name: "",
        severity: "",
        detail_src_ip: "",
        ev_wsec_scce_scc_result: "",
        occur_time: "",
        location: "",
        procedure: "",
        date: [],
      },
      rules: {
        name: [],
        level: [],
        type: [],
        area: [],
        agreement: [],
        detail_src_ip: [],
        newip: [],
        equipment: [],
        date: [],
        field114: [],
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
          value: 3,
        },
        {
          label: "高危",
          value: 4,
        },
        {
          label: "致命",
          value: 5,
        },
      ],
      statusptions: [
        {
          label: "合规",
          value: 1,
        },
        {
          label: "不合规",
          value: 2,
        },
        {
          label: "手动",
          value: 3,
        },
        {
          label: "失败",
          value: 4,
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
          value: 1,
        },
        {
          label: "北京城乡水厂",
          value: 1,
        },
        {
          label: "天津管片厂",
          value: 1,
        },
      ],
      field114Options: [
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
          value: 2,
        },
        {
          label: "已完成",
          value: 2,
        },
        {
          label: "待处置",
          value: 2,
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
    this.getTableList();
  },
  methods: {
    // 根据对象中的key是否值为空x向数组中添加对象
    addQuery(query, key, value) {
      if (value !== "") {
        query.bool.must.push({
          match: {
            [key]: value,
          },
        });
      }
    },
    async getTableList() {
      this.addQuery(
        this.querys.query,
        "event_name",
        this.queryParams.event_name
      );
      this.addQuery(this.querys.query, "severity", this.queryParams.severity);
      this.addQuery(
        this.querys.query,
        "detail_src_ip",
        this.queryParams.detail_src_ip
      );
      this.addQuery(
        this.querys.query,
        "ev_wsec_scce_scc_result",
        this.queryParams.ev_wsec_scce_scc_result
      );
      this.addQuery(
        this.querys.query,
        "occur_time",
        this.queryParams.occur_time
      );
      this.addQuery(this.querys.query, "location", this.queryParams.location);
      this.addQuery(this.querys.query, "procedure", this.queryParams.procedure);
      this.querys.from = this.from - 1;
      if (this.queryParams.date.length > 0) {
        this.querys.query.bool.must.push({
          range: {
            occur_time: {
              gte: this.queryParams.date[0],
              lte: this.queryParams.date[1],
            },
          },
        });
      }

      getConfigurationData(this.querys).then((res) => {
        this.querys.query.bool.must = [];
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
    submitdata() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      this.queryParams = {
        event_name: "",
        severity: "",
        detail_src_ip: "",
        ev_wsec_scce_scc_result: "",
        occur_time: "",
        location: "",
        procedure: "",
        date: [],
      };
      this.getTableList();
    },
    btnQuery() {
      this.getTableList();
    },
    async detail(row) {
      // const { data } = await configurationVerificationDetail(id)
      this.detailData = row;
      this.open = true;
      this.title = "事件详情";
      this.detailData.severity = this.transTypeDic(this.detailData.severity);
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
::v-deep .label-type {
  .el-form-item__label {
    color: #333;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal !important;
  }
}
</style>
