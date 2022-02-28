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
                <el-button type="primary" @click="submitdata">搜索</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-table :data="groupList">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="检测服务器类型" align="center" prop="groupId" min-width="10%" />
      <el-table-column label="动作类型" align="center" prop="userId" :show-overflow-tooltip="true" min-width="30%" />
      <el-table-column label="协议类型" align="center" prop="remark" :show-overflow-tooltip="true" min-width="15%" />
      <el-table-column label="源IP" align="center" prop="groupOrder" min-width="10%" />
      <el-table-column label="时间" align="center" prop="searchValue" min-width="10%" />
      <el-table-column label="事件等级" align="center" prop="createTime" min-width="10%" />
      <el-table-column label="命中策略" align="center" prop="delFlag" min-width="15%" />
      <el-table-column label="事件SID" align="center" prop="updateBy" min-width="10%" />
      <el-table-column label="事件ID" align="center" prop="createBy" min-width="10%" />
      <el-table-column label="处置状态" align="center" prop="updateTime" min-width="10%" />
      <el-table-column label="区域" align="center" prop="groupName" min-width="10%" />
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
      <el-form ref="form" label-width="100px" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="漏洞名称 :">
              {{ dataTest.name }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="影响平台 :">
              {{ dataTest.name1 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="漏洞ID :">
              {{ dataTest.name2 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件等级 :">
              {{ dataTest.name3 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CVSS分值 :">
              {{ dataTest.name4 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CVE编号 :">
              {{ dataTest.name5 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CNCVE编号 :">
              {{ dataTest.name6 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CNNVD编号 :">
              {{ dataTest.name7 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全性 :">
              {{ dataTest.name8 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CNVD编号 :">
              {{ dataTest.name9 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可利用性 :">
              {{ dataTest.name10 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域 :">
              {{ dataTest.name11 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处置状态 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
        </el-row>
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
export default {
  components: {},
  props: [],
  data() {
    return {
      loading: true,
      name: '测试',
      dataTest: {
        name: '记录',
        name1: 'OpenSSH through 6.4',
        name2: '低',
        name3: '高',
        name4: '7.5',
        name5: 'CVE2014-1692',
        name6: 'CNKara文件内置财务',
        name7: 'CNNVD-201401-581',
        name8: '753253358804481',
        name9: 'CNVD-2014-00916',
        name10: '10.0',
        name11: '山西燃气厂',
        name12: '已处置'
      },
      // 分组表格数据
      groupList: [{ 'searchValue': '2020-10--29 11:15:45', 'createBy': '753253358804481', 'createTime': '低', 'updateBy': '20201026545-fdaaxa', 'updateTime': '未处置', 'remark': 'SCANFILE', 'params': {}, 'groupId': '终端检测器', 'userId': '记录', 'groupName': '山西燃气厂', 'groupOrder': '192.168.148.168', 'delFlag': 'Kara文件内置财务' },
        { 'searchValue': '2020-10--29 11:15:45', 'createBy': '753253358804481', 'createTime': '低', 'updateBy': '20201026545-fdaaxa', 'updateTime': '未处置', 'remark': 'SCANFILE', 'params': {}, 'groupId': '终端检测器', 'userId': '记录', 'groupName': '山西燃气厂', 'groupOrder': '192.168.148.168', 'delFlag': 'Kara文件内置财务' },
        { 'searchValue': '2020-10--29 11:15:45', 'createBy': '753253358804481', 'createTime': '低', 'updateBy': '20201026545-fdaaxa', 'updateTime': '未处置', 'remark': 'SCANFILE', 'params': {}, 'groupId': '终端检测器', 'userId': '记录', 'groupName': '山西燃气厂', 'groupOrder': '192.168.148.168', 'delFlag': 'Kara文件内置财务' },
        { 'searchValue': '2020-10--29 11:15:45', 'createBy': '753253358804481', 'createTime': '低', 'updateBy': '20201026545-fdaaxa', 'updateTime': '未处置', 'remark': 'SCANFILE', 'params': {}, 'groupId': '终端检测器', 'userId': '记录', 'groupName': '山西燃气厂', 'groupOrder': '192.168.148.168', 'delFlag': 'Kara文件内置财务' },
        { 'searchValue': '2020-10--29 11:15:45', 'createBy': '753253358804481', 'createTime': '低', 'updateBy': '20201026545-fdaaxa', 'updateTime': '未处置', 'remark': 'SCANFILE', 'params': {}, 'groupId': '终端检测器', 'userId': '记录', 'groupName': '山西燃气厂', 'groupOrder': '192.168.148.168', 'delFlag': 'Kara文件内置财务' }],
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
</style>
