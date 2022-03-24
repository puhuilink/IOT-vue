<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form ref="elForm"
                   :model="queryParams"
                   :rules="rules"
                   size="mini"
                   label-width="90px"
                   class="label-type"
                   label-position="left">
            <el-col :span="6">
              <el-form-item label="APT组织:"
                            prop="name">
                <el-input v-model="queryParams.aptOrganization"
                          placeholder="请输入APT组织"
                          clearable
                          :style="{ width: '100%' }" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域:"
                            prop="area">
                <el-select v-model="queryParams.region"
                           placeholder="请选择区域"
                           filterable
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in areaOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.label"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="事件等级:"
                            prop="eventLevel">
                <el-select v-model="queryParams.eventLevel"
                           placeholder="请选择事件等级"
                           filterable
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in levelOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="协议:"
                            prop="agreement">
                <el-select v-model="queryParams.agreement"
                           placeholder="请选择协议"
                           filterable
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in agreementOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="处置状态:"
                            prop="disposalStatus">
                <el-select v-model="queryParams.disposalStatus"
                           placeholder="请选择处置状态"
                           filterable
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in statusOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="受害者IP:"
                            prop="victimIp">
                <el-input v-model="queryParams.victimIp"
                          placeholder="请输入受害者IP"
                          clearable
                          :style="{ width: '100%' }" />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="攻击者IP:"
                            prop="attackerIp">
                <el-input v-model="queryParams.attackerIp"
                          placeholder="请输入攻击者IP"
                          clearable
                          :style="{ width: '100%' }" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="时间段:"
                            prop="date">
                <el-time-picker v-model="queryParams.date"
                                is-range
                                format="HH:mm:ss"
                                value-format="HH:mm:ss"
                                :style="{ width: '100%' }"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                range-separator="至"
                                clearable />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="杀伤链阶段:"
                            prop="killingChainStage">
                <el-select v-model="queryParams.killingChainStage"
                           placeholder="请选择杀伤链阶段"
                           filterable
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in killingChainStageOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item size="mini">
                <el-button type="primary"
                           @click="btnQuery">搜索</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card>
      <el-button type="primary"
                 size="mini"
                 class="export"
                 @click="submitdata">导出</el-button>
      <el-table :data="groupList"
                tooltip-effect="light">
        <el-table-column type="selection"
                         width="55"
                         align="center" />
        <el-table-column label="攻击者IP"
                         align="center"
                         prop="sourceIp"
                         :show-overflow-tooltip="true" />
        <el-table-column label="受害者IP"
                         align="center"
                         prop="victimIp"
                         :show-overflow-tooltip="true" />
        <el-table-column label="APT组织"
                         align="center"
                         prop="eventName"
                         :show-overflow-tooltip="true" />
        <el-table-column label="协议"
                         align="center"
                         prop="agreement"
                         :show-overflow-tooltip="true" />
        <el-table-column label="事件等级"
                         align="center"
                         prop="eventLevel"
                         :show-overflow-tooltip="true" />
        <el-table-column label="杀伤链阶段"
                         align="center"
                         prop="type"
                         :show-overflow-tooltip="true" />
        <el-table-column label="发生时间"
                         align="center"
                         prop="startTime"
                         :show-overflow-tooltip="true" />
        <el-table-column label="发现时间"
                         align="center"
                         prop="endTime"
                         :show-overflow-tooltip="true" />
        <el-table-column label="处置状态"
                         align="center"
                         prop="status"
                         :show-overflow-tooltip="true" />
        <el-table-column label="区域"
                         align="center"
                         prop="address"
                         :show-overflow-tooltip="true" />
        <el-table-column label="操作"
                         align="center"
                         class-name="small-padding fixed-width" />
        <template slot-scope="scope">
          <el-button v-hasPermi="['system:group:edit']"
                     type="text"
                     @click="detail">详情</el-button>
          <el-button v-hasPermi="['system:group:remove']"
                     type="text"
                     @click="handleDelete(scope.row)">状态变更</el-button>
        </template>
      </el-table>

      <el-table :data="groupList"
                tooltip-effect="light">
        <el-table-column type="selection"
                         width="55"
                         align="center" />
        <el-table-column label="攻击者IP"
                         align="center"
                         prop="attackerIp"
                         :show-overflow-tooltip="true" />
        <el-table-column label="受害者IP"
                         align="center"
                         prop="victimIp"
                         :show-overflow-tooltip="true" />
        <el-table-column label="APT组织"
                         align="center"
                         prop="aptOrganization"
                         :show-overflow-tooltip="true" />
        <el-table-column label="协议"
                         align="center"
                         prop="agreement"
                         :show-overflow-tooltip="true" />
        <el-table-column label="事件等级"
                         align="center"
                         prop="eventLevel"
                         :show-overflow-tooltip="true" />
        <el-table-column label="杀伤链阶段"
                         align="center"
                         prop="killingChainStage"
                         :show-overflow-tooltip="true" />
        <el-table-column label="发生时间"
                         align="center"
                         prop="happenTime"
                         :show-overflow-tooltip="true" />
        <el-table-column label="发现时间"
                         align="center"
                         prop="discoveryTime"
                         :show-overflow-tooltip="true" />
        <el-table-column label="处置状态"
                         align="center"
                         prop="disposalStatus"
                         :show-overflow-tooltip="true" />
        <el-table-column label="区域"
                         align="center"
                         prop="region"
                         :show-overflow-tooltip="true" />
        <el-table-column label="操作"
                         align="center"
                         class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="detail(scope.row.id)">详情</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.row)">状态变更</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0"
                  :total="total"
                  :page.sync="queryParams.pageNum"
                  :limit.sync="queryParams.pageSize"
                  @pagination="getCategoryList" />
    </el-card>

    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title"
               :visible.sync="open"
               width="900px"
               append-to-body>
      <el-form ref="form"
               label-width="95px"
               label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="APT组织 :">
              {{ detailData.aptOrganization }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="情报类型 :">
              {{ detailData.intelligenceType }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="情报IOC :">
              {{ detailData.intelligenceIoc }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件等级 :">
              {{ detailData.eventLevel }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="攻击者IP :">
              {{ detailData.attackerIp }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="攻击者国家 :">
              {{ detailData.attackerState }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="受害者IP :">
              {{ detailData.victimIp }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="受害者国家 :">
              {{ detailData.victimCountry }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="源端口 :">
              {{ detailData.sourcePort }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标端口 :">
              {{ detailData.targetPort }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="协议 :">
              {{ detailData.agreement }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="杀伤链阶段 :">
              {{ detailData.killingChainStage }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发生时间 :">
              {{ detailData.happenTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发现时间 :">
              {{ detailData.discoveryTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处置状态 :">
              {{ detailData.disposalStatus }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域 :">
              {{ detailData.region }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-row type="flex"
                justify="center">
          <el-button size="small"
                     type="primary"
                     @click="submitForm">确 定</el-button>
          <el-button size="small"
                     @click="cancel">取 消</el-button>
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
  data () {
    return {
      loading: true,
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
        aptOrganization: undefined,
        eventLevel: undefined,
        type: undefined,
        region: undefined,
        agreement: undefined,
        victimIp: '',
        attackerIp: undefined,
        killingChainStage: undefined,
        equipment: undefined,
        date: [''],
        field114: undefined
      },
      rules: {
        aptOrganization: [],
        eventLevel: [],
        type: [],
        region: [],
        agreement: [],
        attackerIp: [],
        killingChainStage: [],
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
      agreementOptions: [
        {
          label: 'TCP',
          value: 'TCP'
        },
        {
          label: 'dns',
          value: 'dns'
        },
        {
          label: 'ICMP',
          value: 'ICMP'
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
      killingChainStageOptions: [{
        label: '载荷投递',
        value: '载荷投递'
      },
      {
        label: '侦查跟踪',
        value: '侦查跟踪'
      },
      {
        label: '漏洞利用',
        value: '漏洞利用'
      },
      {
        label: '安装植入',
        value: '安装植入'
      }]
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    /** 查询分组列表 */
    getCategoryList () {
      ThreatIntelligenceList(this.queryParams).then((response) => {
        this.groupList = response.rows
        this.total = response.total
      })
    },
    btnQuery () {
      this.queryParams.pageNum = 1
      this.getCategoryList()
    },
    submitdata () {
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm () {
      this.$refs['elForm'].resetFields()
    },
    async detail (id) {
      const { data } = await ThreatIntelligenceDetail(id)
      this.detailData = data

      this.open = true
      this.title = '事件详情'
    },
    // 取消按钮
    cancel () {
      this.open = false
    },
    /** 提交按钮 */
    submitForm () {
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
