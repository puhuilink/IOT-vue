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
            label-position="left"
          >
            <el-col :span="6">
              <el-form-item
                label="源IP地址："
                prop="name"
              >
                <el-input
                  v-model="queryParams.sourceIp"
                  placeholder="请输入源IP地址"
                  clearable
                  :style="{width: '100%'}"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="动作类型："
                prop="area"
              >
                <el-select
                  v-model="queryParams.actionType"
                  placeholder="请选择动作类型"
                  filterable
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in actionTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="命中策略："
                prop="level"
              >
                <el-select
                  v-model="queryParams.hitStrategy"
                  placeholder="请选择命中策略"
                  filterable
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in hitStrategyOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="协议类型："
                prop="level"
              >
                <el-select
                  v-model="queryParams.protocolType"
                  placeholder="请选择协议类型"
                  filterable
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in protocolTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="区域："
                prop="area"
              >
                <el-select
                  v-model="queryParams.region"
                  placeholder="请选择区域"
                  filterable
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in regionOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="事件等级："
                prop="area"
              >
                <el-select
                  v-model="queryParams.eventLevel"
                  placeholder="请选择事件等级"
                  filterable
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in eventLevelOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="处置状态："
                prop="field114"
              >
                <el-select
                  v-model="queryParams.disposalStatus"
                  placeholder="请选择处置状态"
                  clearable
                  :style="{width: '100%'}"
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
            <el-col :span="9">
              <el-form-item
                label="发布时间："
                prop="date"
              >
                <el-time-picker
                  v-model="queryParams.date"
                  is-range
                  format="HH:mm:ss"
                  value-format="HH:mm:ss"
                  :style="{width: '100%'}"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  range-separator="至"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item size="mini">
                <el-button
                  type="primary"
                  @click="getList"
                >搜索</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row
          :gutter="10"
          class="mb8"
        >
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:user:export']"
              type="primary"
              size="mini"
            >导出</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-table :data="groupList">
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        label="检测服务器类型"
        align="center"
        :show-overflow-tooltip="true"
        prop="detectServerType"
        min-width="15%"
      />
      <el-table-column
        label="动作类型"
        align="center"
        prop="actionType"
        :show-overflow-tooltip="true"
        min-width="10%"
      />
      <el-table-column
        label="协议类型"
        align="center"
        prop="protocolType"
        :show-overflow-tooltip="true"
        min-width="15%"
      />
      <el-table-column
        label="源IP"
        align="center"
        prop="sourceIp"
        :show-overflow-tooltip="true"
        min-width="10%"
      />
      <el-table-column
        label="发生时间"
        align="center"
        prop="happenTime"
        :show-overflow-tooltip="true"
        min-width="10%"
      />
      <el-table-column
        label="事件等级"
        align="center"
        prop="eventLevel"
        :show-overflow-tooltip="true"
        min-width="10%"
      >
        <template #default="scope">
          <span>{{
            transTypeDic(scope.row.eventLevel)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="命中策略"
        align="center"
        prop="hitStrategy"
        :show-overflow-tooltip="true"
        min-width="15%"
      />
      <el-table-column
        label="事件SID"
        align="center"
        prop="eventSid"
        :show-overflow-tooltip="true"
        min-width="10%"
      />
      <el-table-column
        label="事件ID"
        align="center"
        prop="eventId"
        :show-overflow-tooltip="true"
        min-width="10%"
      />
      <el-table-column
        label="处置状态"
        align="center"
        prop="disposalStatus"
        :show-overflow-tooltip="true"
        min-width="10%"
      />
      <el-table-column
        label="区域"
        align="center"
        prop="region"
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
          <el-button
            size="mini"
            type="text"
            @click="detail(scope.row.dataSecurityManagementId)"
          >详情</el-button>
          <el-dropdown @command="batchOperate">
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
            >状态变更<i class="el-icon-arrow-down el-icon--right" /></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="process"
              >处置</el-dropdown-item>
              <el-dropdown-item

                command="un_process"
              >不处置</el-dropdown-item>
              <el-dropdown-item
                command="false_report"
              >误报</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 添加或修改分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="900px"
      append-to-body
    >
      <el-form
        ref="form"
        label-width="105px"
        label-position="left"
      >
        <el-row
          type="flex"
          justify="center"
        >
          <span class="textarea">事件7525948311879681</span>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8">
            <el-form-item label="协议类型 :">
              {{ detailData.protocolType }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件等级 :">
              {{ detailData.eventLevel }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态 :">
              {{ detailData.status }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务器 :">
              {{ detailData.theServer }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发生时间 :">
              {{ detailData.happenTime }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目标URL :">
              {{ detailData.targetUrl }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发送者 :">
              {{ detailData.sender }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接收者 :">
              {{ detailData.recipient }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="抄送人 :">
              {{ detailData.ccPeople }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密送者 :">
              {{ detailData.secretSender }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="源IP :">
              {{ detailData.sourceIp }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目标IP :">
              {{ detailData.targetIp }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="IP对应关系人 :">
              {{ detailData.ipCounterpart }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="MAC地址 :">
              {{ detailData.macAddress }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="域名 :">
              {{ detailData.domainName }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="区域 :">
              {{ detailData.region }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处置状态 :">
              {{ detailData.disposalStatus }}
            </el-form-item>
          </el-col>
        </el-row>
        <br>
        <el-row
          type="flex"
          justify="center"
        >
          <span class="textarea">命中策略</span>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8">
            <el-form-item label="命中策略名 :">
              {{ detailData.hitPolicyName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="策略ID :">
              {{ detailData.strategyId }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="命中结果 :">
              {{ detailData.hitResult }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          type="flex"
          justify="center"
        >
          <span class="textarea">操作记录</span>
        </el-row>
        <el-divider />

        <el-table :data="content">
          <el-table-column
            label="操作时间"
            align="center"
            :show-overflow-tooltip="true"
            prop="time"
            min-width="20%"
          />
          <el-table-column
            label="操作类型"
            align="center"
            prop="type"
            :show-overflow-tooltip="true"
            min-width="15%"
          />
          <el-table-column
            label="操作人"
            align="center"
            prop="user"
            :show-overflow-tooltip="true"
            min-width="15%"
          />
          <el-table-column
            label="操作内容"
            align="center"
            prop="content"
            :show-overflow-tooltip="true"
            min-width="50%"
          />
        </el-table>
        <br>
        <el-row
          type="flex"
          justify="center"
        >
          <span class="textarea">注释</span>
        </el-row>
        <el-divider />
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-row
          type="flex"
          justify="center"
        >
          <el-button
            size="small"
            type="primary"
            @click="submitForm"
          >确 定</el-button>
          <el-button
            size="small"
            @click="cancel"
          >取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import approval_url from '@/icons/echarts/datail.png'
import { dataSecurityManagementList } from '@/api/system/list'
import { dataSecurityManagementDetail } from '@/api/system/detail'
export default {
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      showPhoto: approval_url,
      name: '测试',
      detailData: {
      },
      // 分组表格数据
      content: [{ 'time': '2020-10--29 11:15:45', 'type': '策略通知规则', 'user': 'system', 'content': '事件入库操作成功！' },
        { 'time': '2020-10--29 11:15:45', 'type': '审批规则', 'user': 'system', 'content': 'smtp阻断：审批阻断成功！' }],
      groupList: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: '漏洞详情',
      // 753253358804481否显示弹出层
      open: false,
      // 总条数
      total: 6,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        orderByColumn: 'happen_time',
        isAsc: 'desc',
        groupName: null,
        createTime: null
      },

      rules: {
        name: [],
        level: [],
        type: [],
        area: [],
        agreement: [],
        ip: [],
        newip: [],
        equipment: [],
        date: [],
        field114: []
      },
      actionTypeOptions: [{
        'label': '记录',
        'value': 4
      }, {
        'label': '审计',
        'value': 5
      }],
      hitStrategyOptions: [{
        'label': '关键字_身份证',
        'value': 1
      }, {
        'label': '邮件审批',
        'value': 2
      }, {
        'label': '关键字_数据',
        'value': 3
      }, {
        'label': '网页阻断',
        'value': 4
      }, {
        'label': '关键字_财政',
        'value': 5
      }, {
        'label': '关键字_表',
        'value': 5
      }],
      protocolTypeOptions: [{
        'label': 'HTTP',
        'value': 1
      }, {
        'label': 'SMTP',
        'value': 2
      }],
      regionOptions: [{
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
      }]
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
    /** 查询分组列表 */
    async getList() {
      this.loading = true
      const res = await dataSecurityManagementList(this.queryParams)
      this.groupList = res.rows
      this.total = res.total
      console.log(this.groupList)
      this.loading = false
    },
    /** 查询分组列表 */
    submitdata() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        groupName: null,
        createTime: null
      }
      this.getList()
    },
    async detail(id) {
      const { data } = await dataSecurityManagementDetail(id)
      this.detailData = data
      this.open = true
      this.title = '事件详情'
    },
    // 取消按钮
    cancel() {
      this.open = false
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false
    }
  }
}

</script>
<style>
.textarea {
  font-weight: bold;
}
.el-divider {
  background-color: #0474ec;
  height: 2px;
}
</style>
