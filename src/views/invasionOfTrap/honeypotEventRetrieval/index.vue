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
              <el-form-item
                label="攻击者："
                prop="attackSource"
              >
                <el-select
                  v-model="queryParams.attackSource"
                  placeholder="请选择攻击者"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in attackOptions"
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
                label="隔离沙箱："
                prop="type"
              >
                <el-select
                  v-model="queryParams.isolationSandbox"
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
                label="区域："
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
                label="处置状态："
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
                label="时间："
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
                label-width="50px"
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
        >
          <template #default="scope">
            <span>{{
              transTypeDic(scope.row.eventLevel)
            }}</span>
          </template>
        </el-table-column>
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
            &nbsp;&nbsp; &nbsp;&nbsp;
            <el-dropdown @command="batchOperate">
              <el-button
                size="mini"
                type="text"
              >状态变更
                <i class="el-icon-arrow-down el-icon--right" />
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

    <!-- 添加或修改分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="900px"
      append-to-body
    >
      <div class="contentBox">
        <div class="information">
          基础信息
        </div>
        <el-form
          ref="form"
          label-width="105px"
          label-position="left"
        >
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
        <div class="information">
          攻击记录
        </div>
        <el-table
          v-loading="loading"
          :data="groupListCopy"
          tooltip-effect="light"
        >
          <el-table-column
            label="攻击时间"
            align="center"
            prop="groupId"
            min-width="15%"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="来源IP"
            align="center"
            prop="userId"
            min-width="15%"
          />
          <el-table-column
            label="类型"
            align="center"
            prop="groupName"
            min-width="8%"
          />
          <el-table-column
            label="攻击手法"
            align="center"
            prop="createTime"
            min-width="15%"
          />
          <el-table-column
            label="攻击行为"
            align="center"
            prop="remark"
            min-width="55%"
            :show-overflow-tooltip="true"
          />
        </el-table>
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
      groupListCopy: [{
        groupId: '2022-01-29 10:10:00',
        userId: '10.255.52.84',
        groupName: '入侵',
        createTime: '文件反制',
        remark: '打开高管邮件，邮箱为1234567@163.com.邮件为安全监测子平台系统，访问时长：4秒'
      },
      {
        groupId: '2022-01-29 10:10:00',
        userId: '10.255.52.84',
        groupName: '入侵',
        createTime: '文件反制',
        remark: '打开高管邮件，邮箱为1234567@163.com.邮件为安全监测子平台系统，访问时长：4秒'
      },
      {
        groupId: '2022-01-29 10:10:00',
        userId: '10.255.52.84',
        groupName: '入侵',
        createTime: '文件反制',
        remark: '打开高管邮件，邮箱为1234567@163.com.邮件为安全监测子平台系统，访问时长：4秒'
      },
      {
        groupId: '2022-01-29 10:10:00',
        userId: '10.255.52.84',
        groupName: '入侵',
        createTime: '文件反制',
        remark: '打开高管邮件，邮箱为1234567@163.com.邮件为安全监测子平台系统，访问时长：4秒'
      },
      {
        groupId: '2022-01-29 10:10:00',
        userId: '10.255.52.84',
        groupName: '入侵',
        createTime: '文件反制',
        remark: '打开高管邮件，邮箱为1234567@163.com.邮件为安全监测子平台系统，访问时长：4秒'
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
        orderByColumn: 'startAttackTime',
        isAsc: 'desc',
        attackSource: '',
        eventLevel: '',
        isolationSandbox: '',
        region: '',
        disposalStatus: ''
      },
      rules: {
        name: [],
        eventLevel: [],
        type: [],
        region: [],
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
      attackOptions: [
        {
          label: '所有',
          value: ''
        },
        {
          label: '扫描工具',
          value: '扫描工具'
        },
        {
          label: 'H-007',
          value: 'H-007'
        }
      ],
      areaOptions: [
        {
          label: '天津管片厂',
          value: '天津管片厂'
        },
        {
          label: '三亚海投轨交',
          value: '三亚海投轨交'
        },
        {
          label: '北京城乡水厂',
          value: '北京城乡水厂'
        },
        {
          label: '山西三通燃气厂',
          value: '山西三通燃气厂'
        },
        {
          label: '珠海深中通道',
          value: '珠海深中通道'
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
      const res = await trapList(this.queryParams)
      console.log('res-3-23', res)
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
      const { data } = await trapDetail(id)
      this.detailData = data
      this.detailData.eventLevel = this.transTypeDic(this.detailData.eventLevel)
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
