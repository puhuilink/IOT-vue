<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form
            ref="elForm"
            :model="formData"
            :rules="rules"
            size="mini"
            label-width="80px"
            class="label-type"
            label-position="left"
          >
            <el-col :span="6">
              <el-form-item
                label="攻击者:"
                prop="name"
              >
                <el-select
                  v-model="formData.level"
                  placeholder="请选择攻击者"
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
                label="事件等级:"
                prop="level"
              >
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
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="隔离沙箱:"
                prop="type"
              >
                <el-select
                  v-model="formData.level"
                  placeholder="请选择隔离沙箱"
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
                label="区域:"
                prop="area"
              >
                <el-select
                  v-model="formData.area"
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
                label="处置状态:"
                prop="field114"
              >
                <el-select
                  v-model="formData.field114"
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
              <el-form-item
                label="时间:"
                prop="date"
              >
                <el-time-picker
                  v-model="formData.date"
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

            <el-col :span="12">
              <el-form-item
                size="mini"
                label-width="450px"
              >
                <el-button
                  type="primary"
                  @click="getList"
                >搜索</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card>
      <el-button
        type="primary"
        class="export"
        @click="submitdata"
      >导出</el-button>
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
          label="攻击者"
          align="center"
          prop="attackSource"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="攻击目标"
          align="center"
          prop="attackTarget"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="隔离沙箱"
          align="center"
          prop="isolationSandbox"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="开始攻击时间"
          align="center"
          prop="startAttackTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="最后攻击时间"
          align="center"
          prop="lastAttackTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件等级"
          align="center"
          prop="eventLevel"
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
              @click="detail(scope.row.intrusionTrapId)"
            >详情</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
            >处置</el-button>
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

    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" label-width="105px" label-position="left">
        <el-row>
          <el-col :span="8">
            <el-form-item label="攻击源 :">
              {{ detailData.attackSource }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="攻击目标 :">
              {{ detailData.attackTarget }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件等级 :">
              {{ detailData.eventLevel }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始攻击时间 :">
              {{ detailData.startAttackTime }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束攻击时间 :">
              {{ detailData.lastAttackTime }}
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
      </el-form>
      <el-table v-loading="loading" :data="groupList">
        <el-table-column label="攻击时间" align="center" prop="groupId" />
        <el-table-column label="来源IP" align="center" prop="userId" />
        <el-table-column label="类型" align="center" prop="groupName" />
        <el-table-column label="攻击手法" align="center" prop="createTime">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="攻击行为" align="center" prop="remark" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button
            size="small"
            type="primary"
            @click="submitForm"
          >确 定</el-button>
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>

    </el-dialog>
  </div>
</template>
<script>
// import { listGroup } from "@/api/system/group";
// import { listEvent } from '@/api/system/category'
import { trapList } from '@/api/system/list'
import { trapDetail } from '@/api/system/detail'

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
      // 详情页表格数据
      groupListDetails: [{
        groupId: '1',
        userId: '114',
        groupName: '一楼',
        createTime: '2021-05-18',
        remark: '智能灯'
      },
      {
        groupId: '2',
        userId: '114',
        groupName: '二楼',
        createTime: '2021-05-18',
        remark: '智能灯'
      },
      {
        groupId: '3',
        userId: '114',
        groupName: '三楼',
        createTime: '2021-05-18',
        remark: '智能灯'
      },
      {
        groupId: '4',
        userId: '114',
        groupName: '四楼',
        createTime: '2021-05-18',
        remark: '智能灯'
      },
      {
        groupId: '5',
        userId: '114',
        groupName: '五楼',
        createTime: '2021-05-18',
        remark: '智能灯'
      }
      ],
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
        userId: null,
        groupName: null,
        createTime: null
      },
      formData: {
        name: undefined,
        level: undefined,
        type: undefined,
        area: undefined,
        agreement: undefined,
        ip: undefined,
        newip: undefined,
        equipment: undefined,
        date: [''],
        field114: undefined
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
          label: '北京',
          value: 1
        },
        {
          label: '重庆',
          value: 2
        }
      ],
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
    /** 查询分组列表 */
    async getList() {
      this.loading = true
      const res = await trapList(this.queryParams)
      this.groupList = res.rows
      this.total = res.total
      this.loading = false
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
    async  detail(id) {
      const { data } = await trapDetail(id)
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
  .information {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    border-bottom: 2px solid #33ccff;
    padding-top: 10px;
    margin-bottom: 10px;
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
.dialog-footer {
  margin-top: 20px;
}
</style>
