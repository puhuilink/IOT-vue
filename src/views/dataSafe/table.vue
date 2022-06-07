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
              <el-form-item
                label="源IP地址："
                prop="name"
              >
                <el-input
                  v-model.trim="queryParams.sourceIp"
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
                  v-model.trim="queryParams.actionType"
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
                  v-model.trim="queryParams.hitStrategy"
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
                  v-model.trim="queryParams.protocolType"
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
                  v-model.trim="queryParams.region"
                  placeholder="请选择区域"
                  filterable
                  clearable
                  :style="{width: '100%'}"
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
              <el-form-item
                label="事件等级："
                prop="area"
              >
                <el-select
                  v-model.trim="queryParams.eventLevel"
                  placeholder="请选择事件等级"
                  filterable
                  clearable
                  :style="{width: '100%'}"
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
              <el-form-item
                label="处置状态："
                prop="field114"
              >
                <el-select
                  v-model.trim="queryParams.disposalStatus"
                  placeholder="请选择处置状态"
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in statusOptions"
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
                label="发生时间："
                prop="date"
              >
                <el-date-picker
                  v-model.trim="rangeTime"
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :style="{width: '100%'}"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  range-separator="至"
                  clearable
                  @change="setTimeList"
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
        <!-- <el-row
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
        </el-row> -->
      </div>
    </el-card>
    <el-card class="box-card">
       <el-table :data="groupList">
      <!-- <el-table-column
        type="selection"
        width="55"
        align="center"
      /> -->
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
          &nbsp;&nbsp; &nbsp;&nbsp;
          <el-dropdown @command="batchOperate">
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
            >状态变更<i class="el-icon-arrow-down el-icon--right" /></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'处置')">处置</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'不处置')">不处置</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'误报')">误报</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
   

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
        class="label-type"
      >
        <el-row
          type="flex"
          justify="center"
        >
          <span class="textarea">事件{{ detailData.eventId }}</span>
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
     <!-- 新增通报对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="addDialog"
      width="500px"
      append-to-body
    >
      <div class="contentBox">
        <el-form
          ref="formData"
          :model="formData"
          :rules="rules"
          label-width="80px"
          class="label-type"
        >
          <el-form-item
            label="通报名称:"
            prop="notificationName"
          >
            <el-input
              v-model.trim="formData.notificationName"
              placeholder=""
            />
          </el-form-item>
          <el-form-item
            label="事件类型:"
            prop="eventType"
          >
            <el-select
              v-model.trim="formData.eventType"
              placeholder=""
              filterable
              clearable
              :style="{width: '100%'}"
            >
              <el-option
                v-for="(item, index) in eventTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.label"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="事件名称:"
            prop="eventName"
          >
            <el-input
              v-model.trim="formData.eventName"
              placeholder=""
            />
          </el-form-item>
          <el-form-item
            label="优先级:"
            prop="priority"
          >
            <el-select
              v-model.trim="formData.priority"
              placeholder=""
              filterable
              clearable
              :style="{width: '100%'}"
            >
              <el-option
                v-for="(item, index) in reportLevelOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="备注:"
            prop="remark"
          >
            <el-input
              v-model.trim="formData.remark"
              placeholder=""
              type="textarea"
            />
          </el-form-item>
          <el-form-item
            label="上报:"
            prop="report"
          >
            <el-select
              v-model.trim="formData.report"
              placeholder=""
              filterable
              clearable
              :style="{width: '100%'}"
            >
              <el-option
                v-for="(item, index) in reportOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
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
              type="primary"
              @click="saveForm"
            >保 存</el-button>
            <el-button @click="cancel">取 消</el-button>
          </el-row>
        </div>
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
      rangeTime: undefined,
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
      addDialog: false,
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
       formData:{
        notificationName:"",
        eventType:"",
        eventName:"",
        priority:"",
        remark:"",
        report:"是",
        id:"",
        index:"",
        type:""
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
      levelOptions: [
        {
          label: '极低',
          value: 1
        },
        {
          label: '低危',
          value: 2
        },
        {
          label: '中危',
          value: 3
        },
        {
          label: '高危',
          value: 4
        },
        {
          label: '致命',
          value: 5
        }
      ],
      actionTypeOptions: [{
        'label': '记录',
        'value': 4
      }, {
        'label': '阻断',
        'value': 5
      }, {
        'label': '审批',
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
        'label': '网页记录',
        'value': 5
      }, {
        'label': '关键字_财政',
        'value': 6
      }, {
        'label': '关键字_表',
        'value': 7
      }, {
        'label': '关键字_pdf',
        'value': 8
      }, {
        'label': '关键字_策略',
        'value': 9
      }, {
        'label': '关键字_审批',
        'value': 10
      }, {
        'label': '关键字_流量',
        'value': 11
      }],
      protocolTypeOptions: [{
        'label': 'HTTP',
        'value': 1
      }, {
        'label': 'SMTP',
        'value': 2
      }],
      areaOptions: [
        {
          label: "新疆八一钢筋厂",
          value: "新疆八一钢筋厂",
        },
        {
          label: "青岛石油化工厂",
          value: "青岛石油化工厂",
        },
        {
          label: "浙江联顺预制厂",
          value: "浙江联顺预制厂",
        },
        {
          label: "重庆普斯克预制厂",
          value: "重庆普斯克预制厂",
        },
        {
          label: "安徽天恩砂石厂",
          value: "安徽天恩砂石厂",
        },
         {
          label: "青岛比利佳混凝土厂",
          value: "青岛比利佳混凝土厂",
        },
        {
          label: "三亚海投轨交",
          value: "三亚海投轨交",
        },
        {
          label: "山西三通燃气厂",
          value: "山西三通燃气厂",
        },
        {
          label: "松通高速预制厂",
          value: "松通高速预制厂",
        },
        {
          label: "北京城乡水厂",
          value: "北京城乡水厂",
        },
       
        {
          label: "珠海深中通道",
          value: "珠海深中通道",
        },
        {
          label: "广州地铁钢筋厂",
          value: "广州地铁钢筋厂",
        },
        {
          label: "乌尉高速制梁厂",
          value: "乌尉高速制梁厂",
        },
        {
          label: "玉湛高速制梁厂",
          value: "玉湛高速制梁厂",
        },
        {
          label: "天津管片厂",
          value: "天津管片厂",
        },
        {
          label: "中国交建北京数据中心",
          value: "中国交建北京数据中心",
        },
        {
          label: "中国交建厦门数据中心",
          value: "中国交建厦门数据中心",
        },
      ],
      eventTypeOptions: [{
        'label': '僵木蠕事件',
        'value': '僵木蠕事件'
      }, {
        'label': '弱口令事件',
        'value': '弱口令事件'
      }, {
        'label': '漏洞事件',
        'value': '漏洞事件'
      }, {
        'label': '主机安全事件',
        'value': '主机安全事件'
      }, {
        'label': '配置核查事件',
        'value': '配置核查事件'
      }, {
        'label': '异常行为事件',
        'value': '异常行为事件'
      }, {
        'label': '威胁情报事件',
        'value': '威胁情报事件'
      }, {
        'label': '入侵诱捕事件',
        'value': '入侵诱捕事件'
      }, {
        'label': '数据安全事件',
        'value': '数据安全事件'
      }, {
        'label': '工业网络审计事件',
        'value': '工业网络审计事件'
      }],
      reportLevelOptions: [{
        'label': '低',
        'value': '低'
      }, {
        'label': '中',
        'value': '中'
      }, {
        'label': '高',
        'value': '高'
      }, {
        'label': '极高',
        'value': '极高'
      }],
      reportOptions: [{
        'label': '是',
        'value': '是'
      }, {
        'label': '否',
        'value': '否'
      }],
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
        content: '极低'
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
        content: '致命'
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
          message = '是否确认变更处置状态？'
          this.openMessageBox(message)
          break
        case 'un_process':
          message = '是否确认将此事件处置状态修改为不处置？'
          this.openMessageBox(message)
          break
        case 'false_report':
          message = '是否确认将此事件处置状态修改为误报？'
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
      this.loading = false
    },
    /** 查询分组列表 */
    submitdata() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    beforeHandleCommand(id, index,command){
      // console.log(id,index,command)
        return {
            'id': id,
            'index': index,
            'command':command
          }
      },
    batchOperate(command) {
      // console.log('command',command)
      // console.log('_id',id)
      //  console.log('_index',index)
      let message = "";
      switch (command.command) {
        case '处置':
          message = "是否确认变更处置状态？";
          this.openMessageBox(message,command.id,command.index,command.command);
          break;
        case "不处置":
          message = "是否确认将此事件处置状态修改为不处置？";
          this.unProcessBox(message,command.id,command.index,command.command);
          break;
        case "误报":
          message = "是否确认将此事件处置状态修改为误报？";
          this.falseReportBox(message,command.id,command.index,command.command);
          break;
      }
    },
       async openMessageBox(message,id,index,command) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.addDialog = true
           this.title = '新增通报'
           this.formData.id = id
           this.formData.index = index
          // this.$message({
          //   type: "success",
          //   message: "修改成功!",
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改！",
          });
        });
    },
    async unProcessBox(message,id,index,command) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
           stateChanges({
           id:id,
           index:index,
           type:command
         })
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getTableList();
         }) 
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改！",
          });
        });
    },
    async falseReportBox(message,id,index,command) {
      console.log('参数：',id,index,command)
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log('接口')
         stateChanges({
           id:id,
           index:index,
           type:command
         })
        .then((response) => {
         this.$message({
            type: "success",
            message: "修改成功!",
          }); 
          this.getTableList();  
       }) 
       
        })
        .catch(() => {
           console.log('cancel')
          this.$message({
            type: "info",
            message: "已取消修改！",
          });
        });
    },
    resetForm() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        orderByColumn: 'happen_time',
        isAsc: 'desc',
        groupName: null,
        createTime: null
      },
      this.rangeTime = []
      this.getList()
    },
    async detail(id) {
      const { data } = await dataSecurityManagementDetail(id)
      this.detailData = data
      this.detailData.eventLevel = this.transTypeDic(this.detailData.eventLevel)
      this.open = true
      this.title = '事件详情'
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.addDialog = false
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false
    },
    setTimeList(values) {
      const [projectDevelopDate, projectEndDate] = [...values]
      this.queryParams.beginCreationTime = projectDevelopDate
      this.queryParams.endCreationTime = projectEndDate
    },
     async saveForm(){
       this.addDialog = false;
       if(this.formData.report == '是'){
          this.formData.type = '已处置'
       }else{
         this.formData.type = '处置中'
       }
      console.log('this.formData',this.formData)
      // ES状态变更
       await stateChanges({
           id:this.formData.id,
           index:this.formData.index,
           type:this.formData.type
         })
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });  
              //入库
        putInStorage(this.formData)
        .then((response) => {
          this.$message({
            type: "success",
            message: "入库成功!",
          });  
           if(this.formData.report == '是'){
               // 上报 
            notificationExport({
              id:this.formData.id,
              index:this.formData.index,
            })
          .then((response) => {
            this.$message({
              type: "success",
              message: "上报成功!",
           });  
           this.getTableList();
           }) 
          }else{
             this.getTableList();
          } 
         }) 
         })     
    }
  }
}

</script>
<style lang="scss" scoped>
.box-card{
  margin-bottom: 20px;
}
.textarea {
  font-weight: bold;
}
.el-divider {
  background-color: #0474ec;
  height: 2px;
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
