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
                label="通报编号："
                prop="id"
              >
                <el-input
                  v-model.trim="queryParams.notificationManagementId"
                  placeholder="请输入通报编号"
                  clearable
                  :style="{width: '100%'}"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="事件类型："
                prop="eventType"
              >
                <el-select
                  v-model.trim="queryParams.eventType"
                  placeholder="请选择事件类型"
                  filterable
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in eventTypeOptions"
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
                label="通报名称："
                prop="name"
              >
                <el-input
                  v-model.trim="queryParams.eventName"
                  placeholder="请输入通报名称"
                  clearable
                  :style="{width: '100%'}"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="通报状态："
                prop="level"
              >
                <el-select
                  v-model.trim="queryParams.notificationStatus"
                  placeholder="请选择通报状态"
                  filterable
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in notificationStatusOptions"
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
                label="创建人："
                prop="type"
              >
                <el-input
                  v-model.trim="queryParams.leader"
                  placeholder="请输入创建人"
                  clearable
                  :style="{width: '100%'}"
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item
                label="上报时间："
                prop="date"
              >
                <el-time-picker
                  v-model.trim="queryParams.date"
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
                  @click="submitdata"
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
              type="primary"
              size="mini"
            >导出</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              size="mini"
              @click="handleAdd"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              size="mini"
            >删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              size="mini"
            >上报</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-table
      :data="groupList"
      tooltip-effect="light"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        label="通报编号"
        prop="notificationManagementId"
        :show-overflow-tooltip="true"
        min-width="10%"
        align="center"
      />
      <el-table-column
        label="通报名称"
        align="center"
        prop="notificationName"
        :show-overflow-tooltip="true"
        min-width="10%"
      />
      <el-table-column
        label="上报时间"
        align="center"
        prop="reportingTime"
        :show-overflow-tooltip="true"
        min-width="10%"
      />
      <el-table-column
        label="事件类型"
        align="center"
        prop="eventType"
        min-width="10%"
      />
      <el-table-column
        label="事件名称"
        align="center"
        prop="eventName"
        :show-overflow-tooltip="true"
        min-width="10%"
      />
      <el-table-column
        label="优先级"
        align="center"
        prop="priority"
        min-width="8%"
      />
      <el-table-column
        label="通报状态"
        align="center"
        prop="notificationStatus"
        min-width="10%"
      />
      <el-table-column
        label="创建人"
        align="center"
        prop="leader"
        min-width="8%"
      />
      <el-table-column
        label="最近更新时间"
        align="center"
        prop="updateTime"
        min-width="15%"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="creationTime"
        min-width="10%"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="备注"
        align="center"
        prop="remark"
        min-width="10%"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="22%"
      >
        <template #default="scope">
          <el-button
            size="mini"
            type="text"
            @click="lookdetail(scope.row)"
          >查看</el-button>
          <el-button
            size="mini"
            type="text"
            @click="edit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
          >上报</el-button>
          <el-button
            size="mini"
            type="text"
            @click="end(scope.row)"
          >完成</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getCategoryList"
    />
    <!-- 添加或修改分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="500px"
      append-to-body
    >
      <div class="contentBox">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          class="label-type"
        >
          <el-form-item
            label="通报名称:"
            prop="userId"
          >
            <el-input
              v-model.trim="form.eventName"
              placeholder=""
            />
          </el-form-item>
          <el-form-item
            label="事件类型:"
            prop="groupName"
          >
            <el-select
              v-model.trim="form.type"
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
            prop="groupOrder"
          >
            <el-input
              v-model.trim="form.groupOrder"
              placeholder=""
            />
          </el-form-item>
          <el-form-item
            label="优先级:"
            prop="remark"
          >
            <el-select
              v-model.trim="form.level"
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
            prop="groupOrder"
          >
            <el-input
              v-model.trim="form.message"
              placeholder=""
              type="textarea"
            />
          </el-form-item>
          <el-form-item
            label="上报:"
            prop="groupOrder"
          >
            <el-select
              v-model.trim="form.report"
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
              @click="submitForm"
            >保 存</el-button>
            <el-button @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>

    </el-dialog>
    <!-- 查看通报 -->
    <el-dialog
      :title="title"
      :visible.sync="openlook"
      width="800px"
      append-to-body
    >
      <div class="contentBox">
        <el-form
          ref="form"
          :model="detailData"
          :rules="rules"
          label-width="110px"
          class="label-type"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="通报名称 :">
                {{ detailData.notificationName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件类型 :">
                {{ detailData. eventType }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件名称 :">
                {{ detailData.eventName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="优先级 :">
                {{ detailData.priority }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通报状态 :">
                {{ detailData.notificationStatus }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建人 :">
                {{ detailData.leader }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间 :">
                {{ detailData.creationTime }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上报时间 :">
                {{ detailData.reportingTime }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最近更新时间 :">
                {{ detailData.updateTime }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注 :">
                {{ detailData.remark }}
                <!-- <el-input v-model.trim="detailData.message"
                          placeholder=""
                          type="textarea" /> -->
              </el-form-item>
            </el-col>
            <el-col
              v-if="upload === true"
              :span="12"
            >
              <el-form-item label="附件 :">
                <el-upload
                  drag
                  action
                  multiple
                  :file-list="fileList"
                >
                  <i class="el-icon-upload" />
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
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
              @click="submitForm"
            >完 成</el-button>
            <el-button @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import { notificationList } from '@/api/system/list'
export default {
  components: {},
  props: [],
  data() {
    return {
      loading: true,
      name: '测试',
      detailData: {
      },
      fileList: [],
      // 分组表格数据
      groupList: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: '漏洞详情',
      // 2021-12-26 08:00:00否显示弹出层
      open: false,
      openlook: false,
      editTrue: false,
      upload: false,
      // 总条数
      total: 6,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderByColumn: 'creation_time ',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
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
      notificationStatusOptions: [{
        'label': '已通报',
        'value': 1
      }, {
        'label': '未通报',
        'value': 2
      }],
      reportLevelOptions: [{
        'label': '极低',
        'value': 1
      }, {
        'label': '中危',
        'value': 3
      }, {
        'label': '高危',
        'value': 4
      }, {
        'label': '极高危',
        'value': 2
      }, {
        'label': '致命',
        'value': 5
      }],
      reportOptions: [{
        'label': '已上报',
        'value': 1
      }, {
        'label': '未上报',
        'value': 3
      }],
      eventTypeOptions: [{
        'label': '僵木蠕事件',
        'value': 1
      }, {
        'label': '弱口令事件',
        'value': 2
      }, {
        'label': '漏洞事件',
        'value': 3
      }, {
        'label': '主机安全事件',
        'value': 4
      }, {
        'label': '配置核查事件',
        'value': 5
      }, {
        'label': '异常行为事件',
        'value': 6
      }, {
        'label': '威胁情报事件',
        'value': 7
      }, {
        'label': '入侵诱捕事件',
        'value': 8
      }, {
        'label': '数据安全事件',
        'value': 9
      }, {
        'label': '工业网络审计事件',
        'value': 10
      }]
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      this.loading = true
      notificationList(this.queryParams).then((response) => {
        this.groupList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 查询分组列表 */
    submitdata() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true
      this.title = '新增通报'
    },
    /** 查看按钮操作 */
    lookdetail(row) {
      this.openlook = true
      this.detailData = row
      this.title = '通报详情'
      this.editTrue = false
      this.detailData.name4 = '已通报'
      this.detailData.message = ''
      this.upload = false
    },
    /** 编辑按钮操作 */
    edit(row) {
      this.openlook = true
      this.title = '编辑通报'
      this.editTrue = false
      this.detailData.name4 = '未通报'
      this.detailData.message = '这是一个备注'
      this.upload = false
    },
    /** 完成按钮操作 */
    end(row) {
      this.openlook = true
      this.title = '完结通报'
      this.editTrue = true
      this.detailData.name4 = '已通报'
      this.detailData.message = ''
      this.upload = true
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.openlook = false
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false
      this.openlook = false
    }
  }
}

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
