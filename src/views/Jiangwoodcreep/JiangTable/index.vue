<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form ref="elForm"
                   :model="formData"
                   :rules="rules"
                   size="mini"
                   label-width="80px"
                   class="label-type"
                   label-position="left">
            <el-col :span="6">
              <el-form-item label="事件名称"
                            prop="name">
                <el-input v-model="formData.name"
                          placeholder="请输入事件名称"
                          clearable
                          :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域"
                            prop="area">
                <el-select v-model="formData.area"
                           placeholder="请选择区域"
                           filterable
                           clearable
                           :style="{width: '100%'}">
                  <el-option v-for="(item, index) in areaOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="事件等级"
                            prop="level">
                <el-select v-model="formData.level"
                           placeholder="请选择事件等级"
                           filterable
                           clearable
                           :style="{width: '100%'}">
                  <el-option v-for="(item, index) in levelOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="威胁分类"
                            prop="field114">
                <el-select v-model="formData.threat"
                           placeholder="请选择威胁分类"
                           clearable
                           :style="{width: '100%'}">
                  <el-option v-for="(item, index) in threat"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="处置状态"
                            prop="field114">
                <el-select v-model="formData.field114"
                           placeholder="请选择处置状态"
                           clearable
                           :style="{width: '100%'}">
                  <el-option v-for="(item, index) in field114Options"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="目的IP"
                            prop="type">
                <el-input v-model="formData.type"
                          placeholder="请输入受害者IP"
                          clearable
                          :style="{width: '100%'}" />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="源IP"
                            prop="agreement">
                <el-input v-model="formData.agreement"
                          placeholder="请输入攻击者IP"
                          clearable
                          :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="杀伤链阶段"
                            prop="field114"
                            label-width="90px">
                <el-select v-model="formData.kill"
                           placeholder="请选择杀伤链阶段"
                           clearable
                           :style="{width: '100%'}">
                  <el-option v-for="(item, index) in killle"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="时间"
                            prop="date">
                <el-time-picker v-model="formData.date"
                                is-range
                                format="HH:mm:ss"
                                value-format="HH:mm:ss"
                                :style="{width: '100%'}"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                range-separator="至"
                                clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item size="mini">
                <el-button type="primary"
                           @click="getList">搜索</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-table :data="groupList"
              tooltip-effect="light">
      <el-table-column type="selection"
                       width="55"
                       align="center" />
      <el-table-column label="源IP"
                       align="center"
                       prop="attackerIp"
                       :show-overflow-tooltip="true" />
      <el-table-column label="目的IP"
                       align="center"
                       prop="victimIp"
                       :show-overflow-tooltip="true" />
      <el-table-column label="事件名称"
                       align="center"
                       prop="eventName"
                       :show-overflow-tooltip="true" />
      <el-table-column label="威胁分类"
                       align="center"
                       prop="threatClassification"
                       :show-overflow-tooltip="true" />
      <el-table-column label="事件等级"
                       align="center"
                       prop="eventLevel"
                       :show-overflow-tooltip="true" />
      <el-table-column label="杀伤链阶段"
                       align="center"
                       prop="killingChainStage"
                       :show-overflow-tooltip="true" />
      <el-table-column label="处置状态"
                       align="center"
                       prop="disposalStatus"
                       :show-overflow-tooltip="true" />
      <el-table-column label="发生时间"
                       align="center"
                       prop="happenTime"
                       :show-overflow-tooltip="true" />
      <el-table-column label="发现时间"
                       align="center"
                       prop="findTime"
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
                     icon="el-icon-edit"
                     @click="detail(scope.row.stiffWoodCreepId)">详情</el-button>
          <el-button size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.row)">处置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getList" />
    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title"
               :visible.sync="open"
               width="900px"
               append-to-body>
      <el-form ref="form"
               label-width="100px"
               label-position="left">
        <el-row>
          <el-col :span="8">
            <el-form-item label="事件名称 :">
              {{ detailData.eventName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="威胁分类 :">
              {{ detailData.threatClassification }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="杀伤链阶段 :">
              {{ detailData.killingChainStage }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件等级 :">
              {{ detailData.eventlevel }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="源IP :">
              {{ detailData.attackerIp }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="攻击者国家 :">
              {{ detailData.attackerState }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目的IP :">
              {{ detailData.victimIp }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="受害者国家 :">
              {{ detailData.victimCountry }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="源端口 :">
              {{ detailData.sourcePort }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目标端口 :">
              {{ detailData.targetPort }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="协议 :">
              {{ detailData.agreement }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发生时间 :">
              {{ detailData.happenTime }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发现时间:">
              {{ detailData.findTime }}
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

import { zombieList } from '@/api/system/list'
import { StiffWoodCreepDetail } from '@/api/system/detail'
export default {
  name: 'Index',
  components: {},
  props: [],
  data () {
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
        userId: null,
        groupName: null,
        createTime: null
      },
      formData: {
        name: undefined,
        threat: undefined,
        level: undefined,
        kill: undefined,
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
      levelOptions: [{
        'label': '正常',
        'value': 1
      }, {
        'label': '低危',
        'value': 2
      }, {
        'label': '中危',
        'value': 3
      }, {
        'label': '高危',
        'value': 4
      }, {
        'label': '失陷',
        'value': 5
      }],
      areaOptions: [{
        'label': '北京',
        'value': 1
      }, {
        'label': '重庆',
        'value': 2
      }],
      threat: [{
        'label': '僵尸网络',
        'value': 1
      }, {
        'label': '网络木马',
        'value': 2
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
      }],
      killle: [{
        'label': '侦察跟踪',
        'value': 1
      }, {
        'label': '武器构建',
        'value': 2
      }, {
        'label': '载荷投递',
        'value': 2
      }, {
        'label': '漏洞利用',
        'value': 2
      }, {
        'label': '安装植入',
        'value': 2
      }, {
        'label': '命令控制',
        'value': 2
      }, {
        'label': '目标达成',
        'value': 2
      }]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      this.loading = true
      const res = await zombieList(this.queryParams)
      this.groupList = res.rows
      this.total = res.total
      this.loading = false
    },
    submitdata () {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm () {
      this.$refs['elForm'].resetFields()
    },
    async detail (id) {
      const { data } = await StiffWoodCreepDetail(id)
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
<style>
</style>
