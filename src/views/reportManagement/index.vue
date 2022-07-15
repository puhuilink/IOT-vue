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
              <el-form-item label="报表类型:" prop="location">
                <el-select
                  v-model="queryParams.location"
                  placeholder="请选择报表类型"
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
              <el-form-item label="报表周期:" prop="severity">
                <el-select
                  v-model="queryParams.severity"
                  placeholder="请选择报表周期"
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

            <el-col :span="12">
              <div class="btn">
                <el-form-item>
                  <el-button size="mini" type="primary" @click="btnQuery"
                    >搜索</el-button
                  >
                  <el-button size="mini" @click="resetForm">重置</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card>
      <div class="btnClass">
        <el-row>
          <el-button type="primary" @click="addReport()">新增</el-button>
          <el-button type="primary">删除</el-button>
          <el-button type="primary">启用</el-button>
          <el-button type="primary">停用</el-button>
        </el-row>
      </div>
      <el-table :data="List" tooltip-effect="light">
        <el-table-column
          label="报表名称"
          align="center"
          prop="reportName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="报表类型"
          align="center"
          prop="reportType"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="创建人"
          align="center"
          prop="create"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="通知人"
          align="center"
          prop="Notify"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="报表周期"
          align="center"
          prop="reportCycle"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="启停状态"
          align="center"
          prop="status"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="最后执行时间"
          align="center"
          prop="lastExecutionTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template>
            <el-button size="mini" type="text" @click="detail()"
              >查看</el-button
            >
            &nbsp;&nbsp; &nbsp;&nbsp;

            <el-button size="mini" type="text" @click="editReport()"
              >编辑
            </el-button>
            &nbsp;&nbsp; &nbsp;&nbsp;
            <el-button size="mini" type="text" @click="preview()"
              >预览
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="from"
      :limit.sync="query.size"
    />
    <!-- 查看报表详情 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <div class="contentBox">
        <div class="information">基本信息</div>
        <el-form
          ref="form"
          label-width="110px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="报表名称 :">
                {{ detailData.reportName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报表类型 :">
                <tooltip :content="detailData.reportType" :length="40" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报表周期 :">
                {{ detailData.reportCycle }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="启停状态 :">
                {{ detailData.status }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最后执行时间 :">
                {{ detailData.lastExecutionTime }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下次执行时间 :">
                {{ detailData.nextExecutionTime }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通知方式 :">
                {{ detailData.InformTheWay }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通知人 :">
                {{ detailData.Notify }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建人 :">
                {{ detailData.create }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间 :">
                {{ detailData.createTime }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">执行列表</div>
        <el-table :data="List" tooltip-effect="light">
          <el-table-column
            label="报表时间范围"
            align="center"
            prop="reportTimeRange"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="执行时间"
            align="center"
            prop="executionTime"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="执行状态"
            align="center"
            prop="executionStatus"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template>
              <el-button size="mini" type="text" @click="detail()"
                >预览</el-button
              >
              &nbsp;&nbsp; &nbsp;&nbsp;

              <el-button size="mini" type="text">取消 </el-button>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <el-button size="mini" type="text">重新执行 </el-button>
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
    <!-- 添加报表 -->
    <el-dialog
      :title="title"
      :visible.sync="addReportDialog"
      width="900px"
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
            <el-col :span="12" :offset="6">
              <el-form-item label="报表名称:" prop="reportName">
                <el-input
                  v-model="queryParams.reportName"
                  placeholder="请输入报表名称"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="报表类型:" prop="reportType">
                <el-select
                  v-model="queryParams.reportType"
                  placeholder="请选择报表类型"
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
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="报表周期:" prop="reportCycle">
                <el-select
                  v-model="queryParams.reportCycle"
                  placeholder="请选择报表周期"
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
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="周期开始时间:" prop="cycleStartTime">
                <el-select
                  v-model="queryParams.cycleStartTime"
                  placeholder="请选择周期开始时间"
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
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="通知方式:" prop="InformTheWay">
                <el-select
                  v-model="queryParams.InformTheWay"
                  placeholder="请选择通知方式"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in InformTheWayOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="通知人:" prop="Notify">
                <el-select
                  v-model="queryParams.Notify"
                  placeholder="请选择通知人"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in NotifyOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
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
    <!-- 编辑报表 -->
    <el-dialog
      :title="title"
      :visible.sync="editReportDialog"
      width="900px"
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
            <el-col :span="12" :offset="6">
              <el-form-item label="报表名称:" prop="reportName">
                <el-input
                  v-model="queryEditParams.reportName"
                  placeholder="请输入报表名称"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="报表类型:" prop="reportType">
                <el-select
                  v-model="queryEditParams.reportType"
                  placeholder="请选择报表类型"
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
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="报表周期:" prop="reportCycle">
                <el-select
                  v-model="queryEditParams.reportCycle"
                  placeholder="请选择报表周期"
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
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="周期开始时间:" prop="cycleStartTime">
                <el-select
                  v-model="queryEditParams.cycleStartTime"
                  placeholder="请选择报表周期"
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
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="报表时间范围:" prop="dateRange">
                <el-date-picker
                  v-model="queryEditParams.dateRange"
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
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="通知方式:" prop="InformTheWay">
                <el-select
                  v-model="queryEditParams.InformTheWay"
                  placeholder="请选择报表周期"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in InformTheWayOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="通知人:" prop="Notify">
                <el-select
                  v-model="queryEditParams.Notify"
                  placeholder="请选择报表周期"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in NotifyOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="editListTable" tooltip-effect="light">
          <el-table-column
            label="通知人"
            align="center"
            prop="Notify"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="部门"
            align="center"
            prop="department"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="邮箱"
            align="center"
            prop="email"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="手机"
            align="center"
            prop="telephone"
            :show-overflow-tooltip="true"
          />
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
    <!-- 预览 -->
    <el-dialog
      :title="title"
      :visible.sync="previewDialog"
      width="900px"
      append-to-body
    >
      <div class="previewContentBox" ref="pdfs">
        <div class="firstBox">
          <div class="right">
            <el-row>
              <el-button @click="toPdf" type="primary">导出PDF</el-button>
              <el-button type="primary">导出docx</el-button></el-row
            >
          </div>
        </div>
        <div class="title">安全监测子平台</div>
        <div class="imitate-table-border">
          <el-row :span="10">
            <el-col class="table-border-right" :span="4">
              <div>报表名称</div>
            </el-col>
            <el-col class="table-border-left" :span="6">
              <div>事件统计</div>
            </el-col>
          </el-row>

          <el-row :span="10">
            <el-col class="table-border-right" :span="4">
              <div>创建人</div>
            </el-col>
            <el-col class="table-border-left" :span="6">
              <div>管理员</div>
            </el-col>
          </el-row>

          <el-row :span="10">
            <el-col class="table-border-right" :span="4">
              <div>生成时间</div>
            </el-col>
            <el-col class="table-border-left" :span="6">
              <div>20220320 18:02:35</div>
            </el-col>
          </el-row>

          <el-row :span="10">
            <el-col class="table-border-foot-right" :span="4">
              <div>时间范围</div>
            </el-col>
            <el-col class="table-border-foot-left" :span="6">
              <div>20220314-20220320</div>
            </el-col>
          </el-row>
        </div>
        <div class="information">事件统计</div>
        <el-row :gutter="10">
          <el-col :span="8" class="elcolCard">
            <div class="AssetsBox">
              <div class="Assets">4.2万</div>
              <div class="AssetsNumber">事件总数</div>
            </div>
          </el-col>
          <el-col :span="8" class="elcolCard">
            <div class="AssetsBoxOnline">
              <div class="Assets">3600</div>
              <div class="AssetsNumber">事件数量</div>
            </div>
          </el-col>
          <el-col :span="8" class="elcolCard">
            <div class="AssetsBoxType">
              <div class="Assets">3000</div>
              <div class="AssetsNumber">处置数</div>
            </div>
          </el-col>
        </el-row>
        <div class="information">事件类型分布</div>
        <div class="echartsCss">
          <eventType
            :query="query"
            :tipname="'事件类型分布'"
            :type="'report'"
            :name="'report'"
          />
        </div>
        <div class="information">事件等级分布</div>
        <div class="echartsCss">
          <eventTrend
            :query="query"
            :event-type="2"
            :name="'report'"
            :search="'report'"
          />
        </div>
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
import { getHostSecurityData } from "@/utils/request";
import { hostList } from "@/api/system/list";
import eventType from "@/components/Echarts/eventType";
import eventTrend from "@/components/Echarts/eventTrend";

export default {
  components: { eventType, eventTrend },
  props: [],
  data() {
    return {
      from: 1,
      loading: false,
      name: "测试",
      detailData: {},
      detailDataApi: {
        reportName: "事件统计",
        reportType: "事件统计",
        reportCycle: "周报",
        status: "启用",
        lastExecutionTime: "20220320 18:00:00",
        nextExecutionTime: "20220327 18:00:00",
        InformTheWay: "邮箱、短信",
        Notify: "张三、李四、王五",
        create: "管理员",
        createTime: "20220306 10:00:00",
      },
      groupList: [],
      // 分组表格数据
      List: [
        {
          reportName: "事件统计",
          reportType: "事件统计",
          create: "管理员",
          Notify: "张三，李四，王五",
          reportCycle: "周报",
          status: "启用",
          lastExecutionTime: "2022-01-29 10:10:00",
          reportTimeRange: "20220314-20220320",
          executionTime: "20220320 18:00:00",
          executionStatus: "执行中",
        },
        {
          reportName: "资产统计",
          reportType: "资产统计",
          create: "管理员",
          Notify: "张三，李四，王五",
          reportCycle: "仅执行一次",
          status: "停用",
          lastExecutionTime: "2022-01-29 10:10:00",
          reportTimeRange: "20220307-20220313",
          executionTime: "20220313 18:00:00",
          executionStatus: "成功",
        },
      ],
      editListTable: [
        {
          Notify: "张三",
          department: "一航局",
          email: "15769422951@163.com",
          telephone: "15936598478",
        },
        {
          Notify: "李四",
          department: "四航院",
          email: "15769422951@163.com",
          telephone: "15936598478",
        },
      ],
      groupListDeatils: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      addReportDialog: false,
      editReportDialog: false,
      previewDialog: false,
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
      // 查询参数
      queryParams: {
        location: "",
        severity: "",
        event_format: "",
        procedure: "",
        ev_wsec_hsme_system_ip: "",
        ev_wsec_hsme_system_osname: "",
        date: [],
      },
      queryEditParams: {
        reportName: "",
        reportType: "",
        reportCycle: "",
        cycleStartTime: "",
        dateRange: "",
        InformTheWay: "",
        Notify: "",
      },
      rules: {
        name: [],
        severity: [],
        event_format: [],
        location: [],
        procedure: [],
        ip: [],
        newip: [],
        ev_wsec_hsme_system_ip: [],
        date: [],
        field114: [],
      },
      levelOptions: [
        {
          label: "年报",
          value: "年报",
        },
        {
          label: "季报",
          value: "季报",
        },
        {
          label: "月报",
          value: "月报",
        },
        {
          label: "周报",
          value: "周报",
        },
        {
          label: "日报",
          value: "日报",
        },
        {
          label: "仅本次",
          value: "仅本次",
        },
      ],
      InformTheWayOptions: [
        {
          label: "邮箱",
          value: "1",
        },
        {
          label: "短信",
          value: "2",
        },
      ],
      NotifyOptions: [
        {
          label: "张三",
          value: 1,
        },
        {
          label: "李四",
          value: 2,
        },
        {
          label: "王五",
          value: 3,
        },
      ],
      areaOptions: [
        {
          label: "事件统计",
          value: "事件统计",
        },
        {
          label: "资产统计",
          value: "资产统计",
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
    "query.form"(val, oldVal) {
      console.log(val, oldVal);
      // if (newVal == null) {
      //   this.queryParams.date = []
      // }
    },
  },
  created() {
    // this.getTableList();
    // this.getList()
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
    // async getTableList() {
    //   this.addQuery(this.query, "location.keyword", this.queryParams.location);

    //   this.addQuery(this.query, "severity.keyword", this.queryParams.severity);

    //   this.addQuery(
    //     this.query,
    //     "event_format.keyword",
    //     this.queryParams.event_format
    //   );

    //   this.addQuery(
    //     this.query,
    //     "procedure.keyword",
    //     this.queryParams.procedure
    //   );

    //   this.addQuery(
    //     this.query,
    //     "ev_wsec_hsme_system_ip.keyword",
    //     this.queryParams.ev_wsec_hsme_system_ip
    //   );

    //   this.addQuery(
    //     this.query,
    //     "ev_wsec_hsme_system_osname.keyword",
    //     this.queryParams.ev_wsec_hsme_system_osname
    //   );

    //   this.query.from = this.from - 1;
    //   if (this.queryParams.date.length > 0) {
    //     this.query.query.bool.must.push({
    //       range: {
    //         occur_time: {
    //           gte: this.queryParams.date[0],
    //           lte: this.queryParams.date[1],
    //         },
    //       },
    //     });
    //   }
    //   getHostSecurityData(this.query).then((res) => {
    //     this.query.query.bool.must = [];
    //     this.groupList = [];
    //     this.total = res.data.hits.total;
    //     this.List = res.data.hits.hits;
    //   });
    // },
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
    async getList() {
      this.loading = true;
      const res = await hostList(this.queryParams);
      this.groupList = res.rows;
      this.total = res.total;
      this.loading = false;
    },
    btnQuery() {
      // this.getTableList();
    },
    resetForm() {
      this.queryParams = {
        location: "",
        severity: "",
        event_format: "",
        procedure: "",
        ev_wsec_hsme_system_ip: "",
        ev_wsec_hsme_system_osname: "",
        date: [],
      };
      // this.getTableList();
    },
    detail() {
      this.open = true;
      this.title = "报表详情";
      this.detailData = this.detailDataApi;
    },
    addReport() {
      this.addReportDialog = true;
      this.title = "新增报表";
    },
    editReport() {
      this.editReportDialog = true;
      this.title = "编辑报表";
      this.queryEditParams.reportName = "事件统计";
      this.queryEditParams.reportType = "事件统计";
      this.queryEditParams.reportCycle = "仅本次";
      this.queryEditParams.cycleStartTime = "立即执行";
      this.queryEditParams.InformTheWay = "邮箱;短信";
      this.queryEditParams.Notify = "张三;李四";
    },
    preview() {
      this.previewDialog = true;
      this.title = "";
      this.detailData.reportName = "事件统计";
      this.detailData.create = "管理员";
      this.detailData.createTime = "20220320 18:02:35";
      this.detailData.timeRange = "20220314-20220320";
    },
    toPdf() {
      this.getPdfFromHtml(this.$refs.pdfs, "测试");
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.addReportDialog = false;
      this.editReportDialog = false;
      this.previewDialog = false;
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false;
      this.addReportDialog = false;
      this.editReportDialog = false;
      this.previewDialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
  position: relative;
  .btn {
    position: absolute;
    right: 10px;
  }
}
.btnClass {
  margin-bottom: 10px;
}
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
  .information {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    border-bottom: 2px solid #33ccff;
    padding-top: 10px;
    margin-bottom: 10px;
  }
  .dialog-footer {
    margin-top: 10px;
  }
}
.previewContentBox {
  height: 80vh;
  overflow: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  // border-top: 1px solid #ccc;
  padding: 10px 20px;
  .firstBox {
    height: 80px;
    margin-right: 20px;
    .right {
      float: right;
    }
  }
  .title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 30px;
  }

  .imitate-table-border {
    margin-left: 240px;
    text-align: center;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    width: 100%;
    .table-border-right {
      border: 1px solid #ebebeb;
      border-bottom: none;
      padding: 6px;
      text-align: right;
    }

    .table-border-left {
      border: 1px solid #ebebeb;
      border-bottom: none;
      border-left: none;
      padding: 6px;
      text-align: center;
    }
    .table-border-foot-right {
      border: 1px solid #ebebeb;
      padding: 6px;
      text-align: right;
    }

    .table-border-foot-left {
      border: 1px solid #ebebeb;
      border-left: none;
      padding: 6px;
    }
  }
  .information {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    border-bottom: 2px solid #33ccff;
    padding-top: 10px;
    margin-bottom: 40px;
    margin-top: 40px;
  }
  .echartsCss {
    height: 400px;
  }
  .elcolCard {
    .AssetsBox {
      width: 180px;
      height: 180px;
      background: linear-gradient(180deg, #00bbeb 0%, #0085d2 100%);
      .Assets {
        text-align: center;
        // padding: 10px 80px 10px 10px;
        // border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 38px;
        height: 100px;
        line-height: 150px;
      }
      .AssetsNumber {
        width: 100%;
        height: 60px;
        // background-color: #5599ff;
        color: #ffff77;
        font-weight: 800;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        // .left {
        //   float: left;
        // }
        // .right {
        //   float: right;
        // }
      }
    }
    .AssetsBoxOnline {
      width: 180px;
      height: 180px;
      background: linear-gradient(180deg, #00bbeb 0%, #0085d2 100%);
      .Assets {
        text-align: center;
        // padding: 10px 80px 10px 10px;
        // border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 38px;
        height: 100px;
        line-height: 150px;
      }
      .AssetsNumber {
        width: 100%;
        height: 100px;
        // background-color: #5599ff;
        // color: #ffff77;
        // font-weight: 800;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 30px;
      }
    }
    .AssetsBoxType {
      width: 180px;
      height: 180px;
      background: linear-gradient(180deg, #00bbeb 0%, #0085d2 100%);
      .Assets {
        text-align: center;
        color: #fff;
        font-size: 38px;
        height: 100px;
        line-height: 150px;
      }
      .AssetsNumber {
        width: 100%;
        height: 100px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 30px;
      }
    }
  }
  .dialog-footer {
    margin-top: 10px;
  }
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
