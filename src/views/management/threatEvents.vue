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
              <el-form-item label="事件名称：" prop="name">
                <el-input
                  v-model.trim="queryParams.event_name"
                  placeholder="请输入事件名称"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="事件等级：" prop="severity">
                <el-select
                  v-model.trim="queryParams.severity"
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
              <el-form-item label="事件类型：" prop="event_class">
                <el-select
                  v-model.trim="queryParams.event_class"
                  placeholder="请选择事件类型"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in eventOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域：" prop="location">
                <el-select
                  v-model.trim="queryParams.location"
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
              <el-form-item label="协议：" prop="detail_protocol">
                <el-input
                  v-model.trim="queryParams.detail_protocol"
                  placeholder="请输入协议"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="源IP：" prop="ip">
                <el-input
                  v-model.trim="queryParams.detail_src_ip"
                  placeholder="请输入源IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="目标IP：" prop="newip">
                <el-input
                  v-model.trim="queryParams.detail_dst_ip"
                  placeholder="请输入目标IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上报设备：" prop="agent">
                <el-input
                  v-model.trim="queryParams.agent"
                  placeholder="请输入上报设备"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="时间：" prop="date">
                <el-date-picker
                  v-model.trim="queryParams.date"
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
              <el-form-item label="处置状态：" prop="procedure">
                <el-select
                  v-model.trim="queryParams.procedure"
                  placeholder="请选择处置状态"
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
              <el-form-item size="mini">
                <el-button type="primary" @click="btnQuery">搜索</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
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
      <el-table-column
        label="事件结束时间"
        align="center"
        prop="_source.close_time"
        :show-overflow-tooltip="true"
      />
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
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="detail(scope.row._source)"
            >详情</el-button
          >
          &nbsp; &nbsp; &nbsp; &nbsp;
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
      :limit.sync="query.size"
      @pagination="getTableList"
    />
    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" label-width="90px" label-position="left">
        <el-row>
          <el-col :span="8">
            <el-form-item label="事件名称 :">
              <tooltip :content="dataDetail.event_name" :length="20" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件类型 :">
              {{ dataDetail.event_class }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件等级 :">
              {{ dataDetail.severity }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件描述 :">
              {{ "-" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="源IP :">
              {{ dataDetail.detail_src_ip }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目的IP :">
              {{ dataDetail.detail_dst_ip }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="协议 :">
              {{ dataDetail.detail_protocol }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上报设备 :">
              {{ dataDetail.agent }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上报设备IP :">
              {{ "-" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="攻击阶段 :">
              {{ "-" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域 :">
              {{ dataDetail.location }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处置状态 :">
              {{ dataDetail.procedure }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始时间 :">
              {{ dataDetail.occur_time }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间 :">
              {{ dataDetail.close_time }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" type="primary" @click="submitForm"
            >确 认</el-button
          >
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { eventList } from "@/api/system/list";
import { getManagementThreatEventsData } from "@/utils/request";
export default {
  components: {},
  props: [],
  data() {
    return {
      from: 1,
      loading: false,
      name: "测试",
      dataDetail: {},
      // 分组表格数据
      groupList: [],
      List: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 总条数
      total: 6,
      // 查询参数
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
      queryParams: {
        location: "",
        severity: "",
        event_class: "",
        procedure: "",
        detail_src_ip: "",
        event_name: "",

        detail_protocol: "",
        detail_dst_ip: "",
        agent: "",
        date: [],
      },
      rules: {
        name: [],
        severity: [],
        type: [],
        area: [],
        detail_protocol: [],
        ip: [],
        newip: [],
        agent: [],
        date: [],
        procedure: [],
      },
      levelOptions: [
        {
          label: "正常",
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
      eventOptions: [
        {
          value: "class_ivtp",
          label: "入侵诱捕事件",
        },
        {
          value: "class_abbm",
          label: "异常行为管理",
        },
        {
          value: "class_ztwe",
          label: "僵木蠕事件",
        },
        {
          value: "class_iocm",
          label: "威胁情报管理",
        },
        {
          value: "class_wkpw",
          label: "弱口令事件",
        },
        {
          value: "class_inpa",
          label: "工业网络审计",
        },
        {
          value: "class_hsme",
          label: "主机安全管理",
        },
        {
          value: "class_scce",
          label: "配置核查管理",
        },
        {
          value: "class_dsme",
          label: "数据安全管理",
        },
        {
          value: "class_infe",
          label: "工业防火墙事件",
        },
        {
          value: "class_wppe",
          label: "网页防篡改事件",
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
    };
  },
  created() {
    // this.getCategoryList()
    this.getTableList();
  },
  methods: {
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
      this.addQuery(this.query, "location.keyword", this.queryParams.location);

      this.addQuery(this.query, "severity", this.queryParams.severity);

      this.addQuery(this.query, "event_class", this.queryParams.event_class);

      this.addQuery(this.query, "procedure", this.queryParams.procedure);

      this.addQuery(
        this.query,
        "detail_src_ip",
        this.queryParams.detail_src_ip
      );

      this.addQuery(this.query, "event_name", this.queryParams.event_name);

      this.addQuery(
        this.query,
        "detail_protocol",
        this.queryParams.detail_protocol
      );

      this.addQuery(
        this.query,
        "detail_dst_ip",
        this.queryParams.detail_dst_ip
      );

      this.addQuery(this.query, "agent", this.queryParams.agent);

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
      getManagementThreatEventsData(this.query).then((res) => {
        console.log("res-4-24", res);
        this.query.query.bool.must = [];
        this.groupList = [];
        this.total = res.data.hits.total;
        this.List = res.data.hits.hits;
      });
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
    //   this.loading = true
    //   const res = await eventList(this.queryParams)
    //   this.groupList = res.rows
    //   this.total = res.total
    //   this.loading = false
    // },

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
    submitdata() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    btnQuery() {
      this.getTableList();
    },
    resetForm() {
      (this.queryParams = {
        event_name: "",
        severity: "",
        event_class: "",
        location: "",
        detail_protocol: "",
        detail_src_ip: "",
        detail_dst_ip: "",
        agent: "",
        procedure: "",
        date: [],
      }),
        // this.getCategoryList()
        this.getTableList();
    },
    detail(row) {
      this.dataDetail = row;
      // this.dataDetail.severity = this.transTypeDic(this.dataDetail.severity)
      this.open = true;
      this.title = "事件详情";
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
