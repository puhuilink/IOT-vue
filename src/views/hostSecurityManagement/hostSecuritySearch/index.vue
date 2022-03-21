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
            label-width="100px"
            class="label-type"
            label-position="left"
          >
            <el-col :span="6">
              <el-form-item label="事件名称" prop="name">
                <el-input
                  v-model="formData.name"
                  placeholder="请输入事件名称"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域" prop="area">
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
              <el-form-item label="事件等级" prop="level">
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
              <el-form-item label="事件类型" prop="type">
                <el-input
                  v-model="formData.type"
                  placeholder="请输入事件类型"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="处置状态" prop="agreement">
                <el-input
                  v-model="formData.agreement"
                  placeholder="请输入目标IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="接收开始时间" prop="ip">
                <el-input
                  v-model="formData.ip"
                  placeholder="请输入源IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="接收结束时间" prop="newip">
                <el-input
                  v-model="formData.newip"
                  placeholder="请输入目标IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户端IP" prop="equipment">
                <el-input
                  v-model="formData.equipment"
                  placeholder="请输入上报设备"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="操作系统" prop="field114">
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
              <el-form-item size="mini" label-width="10px">
                <el-button type="primary" @click="submitdata">搜索</el-button>
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
          @click="submitdata"
        >导出</el-button>
      </el-row>
      <el-table :data="groupList" tooltip-effect="light">
        <el-table-column type="selection" width="55" align="center" />
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
        />
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
              @click="detail(scope.row.stiffWoodCreepId)"
            >详情</el-button>
            <el-button
              
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
            >处置</el-button>
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
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" label-width="95px" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="接收时间 :">
              {{ dataTest.name }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="病毒类型 :">
              {{ dataTest.name1 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件名称 :">
              {{ dataTest.name2 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="病毒名 :">
              {{ dataTest.name3 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件等级 :">
              {{ dataTest.name4 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名称 :">
              {{ dataTest.name5 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件类型 :">
              {{ dataTest.name6 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路径 :">
              {{ dataTest.name7 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作系统 :">
              {{ dataTest.name8 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目的地址 :">
              {{ dataTest.name9 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户端名称 :">
              {{ dataTest.name10 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称 :">
              {{ dataTest.name11 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户端 IP :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产生时间 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本号 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日志描述 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="进程 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父进程 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处置状态 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
// import { listEvent } from '@/api/system/category'
import { hostList } from '@/api/system/list'

export default {
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      name: '测试',
      dataTest: {
        name: '工业网络审计事件',
        name1: '工业网络审计',
        name2: '高危',
        name3: '未知接口',
        name4: '10.255.52.84',
        name5: '192.163.12.63',
        name6: 'MODBUS协议',
        name7: '工业网络审计',
        name8: '10.255.52.83',
        name9: '失陷',
        name10: '山西燃气厂',
        name11: '待处置',
        name12: '2022-02-22',
        name13: '2022-2-25'
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
    async getList() {
      this.loading = true
      const res = await hostList(this.queryParams)
      this.groupList = res.rows
      this.total = res.total
      this.loading = false
    },
    /** 查询分组列表 */
    // getCategoryList() {
    //   listEvent(this.queryParams).then((response) => {
    //     this.groupList = response.rows
    //     this.total = response.total
    //   })
    // },
    submitdata() {
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    detail(id) {
      console.log(id)
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
</style>
