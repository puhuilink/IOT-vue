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
            label-width="90px"
            class="label-type"
            label-position="left"
          >
            <el-col :span="6">
              <el-form-item label="APT组织" prop="name">
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
              <el-form-item label="协议" prop="agreement">
                <el-input
                  v-model="formData.agreement"
                  placeholder="请输入目标IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="处置状态" prop="field114">
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
              <el-form-item label="受害者IP" prop="type">
                <el-input
                  v-model="formData.type"
                  placeholder="请输入事件类型"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="攻击者IP" prop="ip">
                <el-input
                  v-model="formData.ip"
                  placeholder="请输入源IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="时间" prop="date">
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
            <el-col :span="6">
              <el-form-item label="杀伤链阶段" prop="newip">
                <el-input
                  v-model="formData.newip"
                  placeholder="请输入目标IP"
                  clearable
                  :style="{ width: '100%' }"
                />
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
      <el-button
        type="primary"
        class="export"
        @click="submitdata"
      >导出</el-button>
      <el-table :data="groupList" tooltip-effect="light">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="攻击者IP"
          align="center"
          prop="attackerIp"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="受害者IP"
          align="center"
          prop="victimIp"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="APT组织"
          align="center"
          prop="aptOrganization"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="协议"
          align="center"
          prop="agreement"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件等级"
          align="center"
          prop="eventLevel"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="杀伤链阶段"
          align="center"
          prop="killingChainStage"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="发生时间"
          align="center"
          prop="happenTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="发现时间"
          align="center"
          prop="discoveryTime"
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
              @click="detail(scope.row.id)"
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
        @pagination="getCategoryList"
      />
    </el-card>

    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" label-width="95px" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="APT组织 :">
              {{ detailData.name }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="情报类型 :">
              {{ detailData.name1 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="情报IOC :">
              {{ detailData.name2 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件等级 :">
              {{ detailData.name3 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="攻击者IP :">
              {{ detailData.name4 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="攻击者国家 :">
              {{ detailData.name5 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="受害者IP :">
              {{ detailData.name6 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="受害者国家 :">
              {{ detailData.name7 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="源端口 :">
              {{ detailData.name8 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标端口 :">
              {{ detailData.name9 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="协议 :">
              {{ detailData.name10 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="杀伤链阶段 :">
              {{ detailData.name11 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="杀伤链阶段 :">
              {{ detailData.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发现时间 :">
              {{ detailData.name13 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处置状态 :">
              {{ detailData.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域 :">
              {{ detailData.name13 }}
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
// import { listGroup } from "@/api/system/group";
import { ThreatIntelligenceDetail } from '@/api/system/detail'
import { ThreatIntelligenceList } from '@/api/system/list'
export default {
  components: {},
  props: [],
  data() {
    return {
      loading: true,
      name: '测试',
      detailData: {
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
    this.getCategoryList()
  },
  methods: {
    /** 查询分组列表 */
    getCategoryList() {
      ThreatIntelligenceList(this.queryParams).then((response) => {
        this.groupList = response.rows
        this.total = response.total
      })
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
    detail(id) {
      ThreatIntelligenceDetail(id).then((response) => {
        this.detailData = response.rows
      })
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
<style lang="scss" scopd>
.export {
  margin-bottom: 10px;
}
</style>
