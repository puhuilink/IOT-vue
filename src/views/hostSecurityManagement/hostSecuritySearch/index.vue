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
                label="事件名称:"
                prop="eventName"
              >
                <el-input
                  v-model="queryParams.eventName"
                  placeholder="请输入事件名称"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="区域:"
                prop="region"
              >
                <el-select
                  v-model="queryParams.region"
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
              <el-form-item
                label="事件等级:"
                prop="eventLevel"
              >
                <el-select
                  v-model="queryParams.eventLevel"
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
              <el-form-item
                label="事件类型:"
                prop="eventType"
              >
                <el-input
                  v-model="queryParams.eventType"
                  placeholder="请输入事件类型"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item
                label="处置状态:"
                prop="disposalStatus"
              >
                <el-select
                  v-model="queryParams.disposalStatus"
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
              <el-form-item
                label="客户端IP:"
                prop="clientIp"
              >
                <el-input
                  v-model="queryParams.clientIp"
                  placeholder="请输入客户端IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="操作系统:"
                prop="operatingSystem"
              >
                <el-input
                  v-model="queryParams.operatingSystem"
                  placeholder="请输入操作系统"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="时间段:"
                prop="date"
              >
                <el-time-picker
                  v-model="queryParams.date"
                  is-range
                  format="HH:mm:ss"
                  value-format="HH:mm:ss"
                  :style="{ width: '100%' }"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  range-separator="至"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                size="mini"
                label-width="10px"
              >
                <el-button
                  type="primary"
                  @click="btnQuery"
                >搜索</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card>
      <el-row>
        <el-button
          type="primary"
          class="export"
          size="mini"
          @click="submitdata"
        >导出</el-button>
      </el-row>
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
          label="接收时间"
          align="center"
          prop="receivingTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件名称"
          align="center"
          prop="eventName"
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
          prop="eventType"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作系统"
          align="center"
          prop="operatingSystem"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="客户端名称"
          align="center"
          prop="clientName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="客户端IP"
          align="center"
          prop="clientIp"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="产生时间"
          align="center"
          prop="generationTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="日志描述"
          align="center"
          prop="logDescription"
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
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="detail(scope.row.hostSecurityId)"
            >详情</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
            >状态变更</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <pagination
      v-show="total > 0"
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
        label-width="95px"
        label-position="left"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="接收时间 :">
              {{ detailData.receivingTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="病毒类型 :">
              {{ detailData.virusType }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件名称 :">
              {{ detailData.eventName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="病毒名 :">
              {{ detailData.virusName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件等级 :">
              {{ detailData.eventLevel }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名称 :">
              {{ detailData.username }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件类型 :">
              {{ detailData.eventType }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路径 :">
              {{ detailData.route }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作系统 :">
              {{ detailData.operatingSystem }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目的地址 :">
              {{ detailData.destinationAddress }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户端名称 :">
              {{ detailData.clientName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称 :">
              {{ detailData.corporateName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户端IP :">
              {{ detailData.clientIp }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称 :">
              {{ detailData.productName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产生时间 :">
              {{ detailData.generationTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本号 :">
              {{ detailData.versionNumber }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日志描述 :">
              {{ detailData.logDescription }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域 :">
              {{ detailData.region }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="进程 :">
              {{ detailData.process }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父进程 :">
              {{ detailData.parentProcess }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处置状态 :">
              {{ detailData.disposalStatus }}
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
// import { listEvent } from '@/api/system/category'
import { hostList } from '@/api/system/list'
import { hostSecurityDetail } from '@/api/system/detail'

export default {
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      name: '测试',
      detailData: {

      },
      // 分组表格数据
      groupList: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        eventName: '',
        operatingSystem: '',
        eventLevel: undefined,
        eventType: undefined,
        region: undefined,
        disposalStatus: undefined,
        ip: undefined,
        newip: undefined,
        clientIp: undefined,
        date: [''],
        field114: undefined
      },
      rules: {
        name: [],
        eventLevel: [],
        eventType: [],
        region: [],
        disposalStatus: [],
        ip: [],
        newip: [],
        clientIp: [],
        date: [],
        field114: []
      },
      levelOptions: [
        {
          label: '正常',
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
          label: '失陷',
          value: 5
        }
      ],
      areaOptions: [
        {
          label: '天津管片厂',
          value: '天津管片厂'
        },
        {
          label: '三亚轨交',
          value: '三亚轨交'
        },
        {
          label: '北京水厂',
          value: '北京水厂'
        },
        {
          label: '山西燃气',
          value: '山西燃气'
        },
        {
          label: '珠海深中通道',
          value: '珠海深中通道'
        },
        {
          label: '北京水厂',
          value: '北京水厂'
        }
      ],
      statusOptions: [{
        label: '待处置',
        value: '待处置'
      },
      {
        label: '已处置',
        value: '已处置'
      },
      {
        label: '不处置',
        value: '不处置'
      }],
      field114Options: [
        {
          label: '未处置',
          value: 1
        },
        {
          label: '处置中',
          value: 2
        },
        {
          label: '已处置',
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
    async getList() {
      this.loading = true
      const res = await hostList(this.queryParams)
      this.groupList = res.rows
      this.total = res.total
      this.loading = false
    },
    btnQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    submitdata() {
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    async detail(id) {
      const { data } = await hostSecurityDetail(id)
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
