<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <span slot="title" class="collapse-title">搜索条件</span>
            <el-form
              ref="queryForm"
              :model="queryParams"
              size="mini"
              :inline="true"
              label-width="90px"
            >
              <el-form-item label="源IP地址" prop="ipaddr">
                <el-input
                  v-model="queryParams.sourceIp"
                  placeholder="请输入源IP地址"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="目的IP地址" prop="userName">
                <el-input
                  v-model="queryParams.destinationIp"
                  placeholder="请输入目的IP地址"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="区域" prop="userName">
                <el-select
                  v-model="formData.region"
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
              <el-form-item label="处置状态" prop="ipaddr">
                <el-select
                  v-model="formData.disposalStatus"
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
              <el-form-item label="事件等级" prop="userName">
                <el-select
                  v-model="formData.level"
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
                  /> </el-select></el-form-item>
              <el-form-item label="事件类型" prop="userName">
                <el-select
                  v-model="formData.type"
                  placeholder="请选择事件类型"
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
                  /> </el-select>
              </el-form-item>
              <el-form-item label="时间段" prop="userName">
                <el-time-picker
                  v-model="formData.date"
                  is-range
                  format="HH:mm:ss"
                  value-format="HH:mm:ss"
                  :style="{ width: '100%' }"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  range-separator="--"
                  clearable
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  size="mini"
                  @click="handleQuery"
                >搜索</el-button>
                <el-button
                  icon="el-icon-refresh"
                  size="mini"
                  @click="resetQuery"
                >重置</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:user:export']"
            type="primary"
            size="mini"
            @click="handleExport"
          >导出</el-button>
        </el-col>
      </el-row>
      <el-table :data="groupList" tooltip-effect="light">
        <el-table-column type="selection" width="55" align="center" />

        <el-table-column
          label="产生时间"
          align="center"
          prop="generationTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="源IP"
          align="center"
          prop="sourceIp"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="源端口"
          align="center"
          prop="sourcePort"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="目的IP"
          align="center"
          prop="destinationIp"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="目的端口"
          align="center"
          prop="destinationPort"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="传输层协议"
          align="center"
          prop="transportLayerProtocol"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="应用层协议"
          align="center"
          prop="applicationLayerProtocol"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件等级"
          align="center"
          prop="eventLevel"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span>{{
              transTypeDic(scope.row.eventLevel)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="事件类型"
          align="center"
          prop="eventCategory"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="处置状态"
          align="center"
          prop="disposalStatus"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="区域"
          align="center"
          prop="region"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          width="180"
        >
          <template #default="{ row }">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-view"
              @click="detail(row.auditId)"
            >详情</el-button>
            <el-dropdown @command="batchOperate">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-s-tools"
              >
                状态变更<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-check"
                  command="process"
                >处置</el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-close"
                  command="un_process"
                >不处置</el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-bell"
                  command="false_report"
                >误报</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </el-card>
    <!-- 批量导出对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="exportDialog"
      width="900px"
      append-to-body
    >
      <el-form
        ref="queryForm"
        :model="queryParams"
        :inline="true"
        label-width="300px"
      >
        <el-form-item label="请选择文件 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入资产编号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button
            size="small"
            type="primary"
            @click="submitForm"
          >导 入</el-button>
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
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
            :model="dialogDetail"
            size="mini"
            label-width="133px"
          >
            <el-col :span="12">
              <el-form-item label="源IP：" prop="sourceIp">
                <el-input
                  v-model="dialogDetail.sourceIp"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="源设备：" prop="field102">
                <el-input
                  v-model="dialogDetail.sourceDevice"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="源端口：" prop="sourcePort">
                <el-input
                  v-model="dialogDetail.sourcePort"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="源MAC：" prop="field104">
                <el-input
                  v-model="dialogDetail.sourceMac"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的IP：" prop="aimIp">
                <el-input
                  v-model="dialogDetail.destinationIp"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的MAC：" prop="field106">
                <el-input
                  v-model="dialogDetail.destinationMac"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的设备：" prop="field107">
                <el-input
                  v-model="dialogDetail.destinationEquipment"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的端口：" prop="aimPort">
                <el-input
                  v-model="dialogDetail.destinationPort"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="传输层协议：" prop="transportProtocol">
                <el-input
                  v-model="dialogDetail.transportLayerProtocol"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应用层协议：" prop="applyProtocol">
                <el-input
                  v-model="dialogDetail.applicationLayerProtocol"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件级别：" prop="level">
                <el-input
                  v-model="dialogDetail.eventLevel"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label=" 事件类型：" prop="type">
                <el-input
                  v-model="dialogDetail.eventCategory"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产生时间：" prop="happen">
                <el-input
                  v-model="dialogDetail.generationTime"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接收时间：" prop="field114">
                <el-input
                  v-model="dialogDetail.receivingTime"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="智能监测终端IP：" prop="field115">
                <el-input
                  v-model="dialogDetail.intelligentMonitoringTerminalIp"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="区域：" prop="region">
                <el-input
                  v-model="dialogDetail.region"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处置状态：" prop="state">
                <el-input
                  v-model="dialogDetail.disposalStatus"
                  readonly
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-row type="flex" justify="center">
            <el-button
              size="small"
              type="primary"
              @click="submitForm"
            >保 存</el-button>
            <el-button size="small" @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { industryList } from '@/api/system/list'
import { industrialNetworkAuditDetail } from '@/api/system/detail'

export default {
  name: 'Online',
  data() {
    return {
      activeNames: ['1'],
      title: '',
      dialogDetail: {},
      exportDialog: false,
      detailDialog: false,
      // 遮罩层
      loading: false,
      // 总条数
      total: 0,
      // 分组表格数据
      groupList: [],
      pageNum: 1,
      pageSize: 10,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        orderByColumn: 'happen_time',
        isAsc: 'asc',
        groupName: null,
        createTime: null
      },
      formData: {
        level: ''
      },
      field114Options: [{
        'label': '未处置',
        'value': 1
      }, {
        'label': '处置中',
        'value': 2
      }, {
        'label': '已处置',
        'value': 2
      }, {
        'label': '已完成',
        'value': 2
      }, {
        'label': '待处置',
        'value': 6
      }],
      areaOptions: [{
        'label': '三亚轨交',
        'value': 1
      }, {
        'label': '珠海深中通道',
        'value': 2
      }, {
        'label': '山西燃气',
        'value': 1
      }, {
        'label': '北京水厂',
        'value': 1
      }, {
        'label': '天津管片厂',
        'value': 1
      }],
      statusOptions: [
        {
          label: '在线',
          value: 1
        },
        {
          label: '离线',
          value: 2
        },
        {
          label: '异常',
          value: 3
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    transTypeDic(val) {
      var t = [{
        name: '1',
        content: '正常'
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
        content: '失陷'
      }]
      const orgTreeData1 = t.filter((e) => e.name === val)
        .map(({ content }) => ({
          content
        }))
      return `${orgTreeData1[0].content}`
    },
    batchOperate(command) {
      let message = ''
      switch (command) {
        case 'process':
          message = '是否确认将此事件处置状态修改为误报？'
          this.openMessageBox(message)
          break
        case 'un_process':
          message = '是否确认将此事件处置状态修改为不处置？'
          this.openMessageBox(message)
          break
        case 'false_report':
          message = '是否确认变更处置状态？'
          this.openMessageBox(message)
          break
      }
    },
    openMessageBox(message) {
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改！'
        })
      })
    },
    /** 查询分组列表 */
    async getList() {
      this.loading = true
      const res = await industryList(this.queryParams)
      this.groupList = res.rows
      this.total = res.total
      this.loading = false
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 取消按钮
    cancel() {
      this.exportDialog = false
      this.detailDialog = false
    },
    /** 提交按钮 */
    submitForm() {
      this.exportDialog = false
      this.detailDialog = false
    },
    handleExport() {
      this.exportDialog = true
      this.title = '批量导入资产'
    },
    async  detail(row) {
      const { data } = await industrialNetworkAuditDetail(row)
      this.dialogDetail = data
      this.detailDialog = true
      this.title = '事件详情'
    }
  }
}
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
