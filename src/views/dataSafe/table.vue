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
              <el-form-item label="源IP地址：" prop="name">
                <el-input v-model="formData.name" placeholder="请输入源IP地址" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="动作类型：" prop="area">
                <el-select
                  v-model="formData.area"
                  placeholder="请选择动作类型"
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
              <el-form-item label="命中策略：" prop="level">
                <el-select
                  v-model="formData.level"
                  placeholder="请选择命中策略"
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
              <el-form-item label="协议类型：" prop="level">
                <el-select
                  v-model="formData.type"
                  placeholder="请选择命中策略"
                  filterable
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in typeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域：" prop="area">
                <el-select
                  v-model="formData.area"
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
              <el-form-item label="事件等级：" prop="area">
                <el-select
                  v-model="formData.area"
                  placeholder="请选择事件等级"
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
              <el-form-item label="处置状态：" prop="field114">
                <el-select v-model="formData.field114" placeholder="请选择处置状态" clearable :style="{width: '100%'}">
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
            <el-col :span="9">
              <el-form-item label="发布时间：" prop="date">
                <el-time-picker
                  v-model="formData.date"
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
                <el-button type="primary" @click="getList">搜索</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:user:export']"
              type="primary"
              size="mini"
            >导出</el-button>
          </el-col>
        </el-row></div>
    </el-card>
    <el-table :data="groupList">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="检测服务器类型" align="center" :show-overflow-tooltip="true" prop="detect_server_type" min-width="15%" />
      <el-table-column label="动作类型" align="center" prop="action_type" :show-overflow-tooltip="true" min-width="10%" />
      <el-table-column label="协议类型" align="center" prop="protocol_type" :show-overflow-tooltip="true" min-width="15%" />
      <el-table-column label="源IP" align="center" prop="source_ip" :show-overflow-tooltip="true" min-width="10%" />
      <el-table-column label="发生时间" align="center" prop="happen_time" :show-overflow-tooltip="true" min-width="10%" />
      <el-table-column label="事件等级" align="center" prop="event_level" :show-overflow-tooltip="true" min-width="10%" />
      <el-table-column label="命中策略" align="center" prop="hit_strategy" :show-overflow-tooltip="true" min-width="15%" />
      <el-table-column label="事件SID" align="center" prop="event_sid" :show-overflow-tooltip="true" min-width="10%" />
      <el-table-column label="事件ID" align="center" prop="event_id" :show-overflow-tooltip="true" min-width="10%" />
      <el-table-column label="处置状态" align="center" prop="disposal_status" :show-overflow-tooltip="true" min-width="10%" />
      <el-table-column label="区域" align="center" prop="region" :show-overflow-tooltip="true" min-width="10%" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="15%">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['system:group:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="detail"
          >详情</el-button>
          <el-button
            v-hasPermi="['system:group:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >处置</el-button>
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
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" label-width="105px" label-position="left">
        <el-row type="flex" justify="center">
          <span class="textarea">事件7525948311879681</span>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8">
            <el-form-item label="协议类型 :">
              {{ dataTest.name }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件等级 :">
              {{ dataTest.name1 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态 :">
              {{ dataTest.name2 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务器 :">
              {{ dataTest.name3 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间 :">
              {{ dataTest.name4 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目标URL :">
              {{ dataTest.name5 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发送者 :">
              {{ dataTest.name6 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接收者 :">
              {{ dataTest.name7 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="抄送人 :">
              {{ dataTest.name8 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密送者 :">
              {{ dataTest.name9 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="源IP :">
              {{ dataTest.name10 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目标IP :">
              {{ dataTest.name11 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="IP对应关系人 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="MAC地址 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="域名 :">
              {{ dataTest.name14 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证据文件 :">
              {{ dataTest.name15 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域 :">
              {{ dataTest.name16 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处置状态 :">
              {{ dataTest.name17 }}
            </el-form-item>
          </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
          <span class="textarea">命中策略</span>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8">
            <el-form-item label="命中策略名 :">
              {{ dataTest.name18 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="策略ID :">
              {{ dataTest.name19 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="命中结果 :">
              {{ dataTest.name20 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="匹配详情 :">
              <img :src="showPhoto" width="750">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <span class="textarea">操作记录</span>
        </el-row>
        <el-divider />

        <el-table :data="content">
          <el-table-column label="操作时间" align="center" :show-overflow-tooltip="true" prop="time" min-width="20%" />
          <el-table-column label="操作类型" align="center" prop="type" :show-overflow-tooltip="true" min-width="15%" />
          <el-table-column label="操作人" align="center" prop="user" :show-overflow-tooltip="true" min-width="15%" />
          <el-table-column label="操作内容" align="center" prop="content" :show-overflow-tooltip="true" min-width="50%" />
        </el-table>
        <br>
        <el-row type="flex" justify="center">
          <span class="textarea">注释</span>
        </el-row>
        <el-divider />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" type="primary" @click="submitForm">确 定</el-button>
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import approval_url from '@/icons/echarts/datail.png'
import { dataSecurityManagementList } from '@/api/system/list'

export default {
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      showPhoto: approval_url,
      name: '测试',
      dataTest: {
        name: 'SMTP',
        name1: '极低',
        name2: '新建',
        name3: '20',
        name4: '2020-10-27',
        name5: '暂无',
        name6: 'liuqiong@wondersoft',
        name7: '暂无',
        name8: '暂无',
        name9: 'rece1@3110921034.cn',
        name10: '192.168.154.94',
        name11: '0.0.0.00',
        name12: '广州区域支行-刘武',
        name13: '暂无',
        name14: '暂无',
        name15: '邮件主题.txt',
        name16: '山西燃气厂',
        name17: '处置中',
        name18: 'kara邮件手机号',
        name19: '100',
        name20: '(手机号码)'
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
        operating: undefined,
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
      typeOptions: [{
        'label': '正常',
        'value': 1
      }, {
        'label': '低危',
        'value': 2
      }, {
        'label': '中危',
        'value': 3
      }, {
        'label': 'SCANFILE',
        'value': 4
      }, {
        'label': '失陷',
        'value': 5
      }],
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
        'label': 'SCANFILE',
        'value': 4
      }, {
        'label': '失陷',
        'value': 5
      }],
      statusptions: [{
        'label': '低',
        'value': 1
      }, {
        'label': '不低',
        'value': 2
      }, {
        'label': '手动',
        'value': 3
      }, {
        'label': '失败',
        'value': 4
      }],
      areaOptions: [{
        'label': '北京',
        'value': 1
      }, {
        'label': '重庆',
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
        'value': 3
      }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
      this.$refs['elForm'].resetFields()
    },
    detail() {
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
.textarea{
  font-weight:bold
}
 .el-divider {
      background-color: #0474ec;
      height: 2px;
    }
</style>
