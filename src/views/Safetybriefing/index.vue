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
              <el-form-item label="通报编号：" prop="id">
                <el-input v-model="formData.id" placeholder="请输入通报编号" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="通报类型：" prop="area">
                <el-select
                  v-model="formData.area"
                  placeholder="请选择通报类型"
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
              <el-form-item label="通报名称：" prop="name">
                <el-input v-model="formData.name" placeholder="请输入通报名称" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="通报状态：" prop="level">
                <el-select
                  v-model="formData.level"
                  placeholder="请选择通报状态"
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
              <el-form-item label="创建人：" prop="type">
                <el-input v-model="formData.type" placeholder="请输入创建人" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="上报时间：" prop="area">
                <el-select
                  v-model="formData.area"
                  placeholder="请选择上报时间"
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
              <el-form-item size="mini">
                <el-button type="primary" @click="submitdata">搜索</el-button>
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
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:user:add']"
              type="primary"
              size="mini"
              @click="handleAdd"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:user:remove']"
              type="primary"
              size="mini"
            >删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['system:user:remove']"
              type="primary"
              size="mini"
            >上报</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-table :data="groupList">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="通报编号" align="center" prop="groupId" min-width="10%" />
      <el-table-column label="通报名称" align="center" prop="userId" :show-overflow-tooltip="true" min-width="10%" />
      <el-table-column label="上报时间" align="center" prop="remark" :show-overflow-tooltip="true" min-width="10%" />
      <el-table-column label="事件类型" align="center" prop="groupOrder" min-width="10%" />
      <el-table-column label="事件名称" align="center" prop="searchValue" min-width="10%" />
      <el-table-column label="优先级" align="center" prop="createTime" min-width="8%" />
      <el-table-column label="通报状态" align="center" prop="delFlag" min-width="10%" />
      <el-table-column label="创建人" align="center" prop="updateBy" min-width="8%" />
      <el-table-column label="最近更新时间" align="center" prop="createBy" min-width="15%" />
      <el-table-column label="创建时间" align="center" prop="updateTime" min-width="10%" />
      <el-table-column label="备注" align="center" prop="groupName" min-width="10%" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="22%">
        <template>
          <el-button
            v-hasPermi="['system:group:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="lookdetail()"
          >查看</el-button>
          <el-button
            v-hasPermi="['system:group:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="edit()"
          >编辑</el-button>
          <el-button
            v-hasPermi="['system:group:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
          >上报</el-button>
          <el-button
            v-hasPermi="['system:group:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="end()"
          >完成</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
    />
    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="通报名称:" prop="userId">
          <el-input v-model="form.userId" placeholder="" />
        </el-form-item>
        <el-form-item label="事件类型:" prop="groupName">
          <el-select
            v-model="form.type"
            placeholder=""
            filterable
            clearable
            :style="{width: '100%'}"
          >
            <el-option
              v-for="(item, index) in reportTypeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件名称:" prop="groupOrder">
          <el-input v-model="form.groupOrder" placeholder="" />
        </el-form-item>
        <el-form-item label="优先级:" prop="remark">
          <el-select
            v-model="form.level"
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
        <el-form-item label="备注:" prop="groupOrder">
          <el-input v-model="form.message" placeholder="" type="textarea" />
        </el-form-item>
        <el-form-item label="上报:" prop="groupOrder">
          <el-select
            v-model="form.report"
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 查看通报 -->
    <el-dialog :title="title" :visible.sync="openlook" width="800px" append-to-body>
      <el-form ref="form" :model="dataTest" :rules="rules" label-width="110px">
        <el-row>
          <el-col v-if="editTrue===false" :span="12">
            <el-form-item label="通报名称 :">
              {{ dataTest.name }}
            </el-form-item>
          </el-col>
          <el-col v-else :span="12">
            <el-form-item label="通报名称 :">
              <el-input v-model="dataTest.name" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件类型 :">
              {{ dataTest.name1 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件名称 :">
              {{ dataTest.name2 }}
            </el-form-item>
          </el-col>
          <el-col v-if="editTrue===false" :span="12">
            <el-form-item label="优先级 :">
              {{ dataTest.name3 }}
            </el-form-item>
          </el-col>
          <el-col v-else :span="12">
            <el-form-item label="优先级:" prop="remark">
              <el-select
                v-model="dataTest.name3"
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
          </el-col>
          <el-col :span="12">
            <el-form-item label="通报状态 :">
              {{ dataTest.name4 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建人 :">
              {{ dataTest.name5 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间 :">
              {{ dataTest.name6 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上报时间 :">
              {{ dataTest.name7 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最近更新时间 :">
              {{ dataTest.name8 }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注 :">
              <el-input v-model="dataTest.message" placeholder="" type="textarea" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
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
        name: '漏洞通报',
        name1: '漏洞',
        name2: '漏洞2022-01-19',
        name3: '极高',
        name4: '已通报',
        name5: '管理员',
        name6: '2021/12/25 08:00:00',
        name7: '2021/12/25 0:00:00',
        name8: '2021/12/26 08:00:00',
        message: ''
      },
      fileList: [],
      // 分组表格数据
      groupList: [{ 'searchValue': '僵木蠕事件', 'createBy': '2021-12-26 08:00:00', 'createTime': '极高', 'updateBy': '管理员', 'updateTime': '2021-12-25 08:00:00', 'remark': '2021-12-25 09:00:00', 'params': {}, 'groupId': '1', 'userId': '僵木蠕通报', 'groupName': '--', 'groupOrder': '僵木蠕', 'delFlag': '未通报' },
        { 'searchValue': '僵木蠕事件', 'createBy': '2021-12-26 08:00:00', 'createTime': '极高', 'updateBy': '管理员', 'updateTime': '2021-12-25 08:00:00', 'remark': '2021-12-25 09:00:00', 'params': {}, 'groupId': '1', 'userId': '僵木蠕通报', 'groupName': '--', 'groupOrder': '僵木蠕', 'delFlag': '未通报' },
        { 'searchValue': '僵木蠕事件', 'createBy': '2021-12-26 08:00:00', 'createTime': '极高', 'updateBy': '管理员', 'updateTime': '2021-12-25 08:00:00', 'remark': '2021-12-25 09:00:00', 'params': {}, 'groupId': '1', 'userId': '僵木蠕通报', 'groupName': '--', 'groupOrder': '僵木蠕', 'delFlag': '未通报' },
        { 'searchValue': '僵木蠕事件', 'createBy': '2021-12-26 08:00:00', 'createTime': '极高', 'updateBy': '管理员', 'updateTime': '2021-12-25 08:00:00', 'remark': '2021-12-25 09:00:00', 'params': {}, 'groupId': '1', 'userId': '僵木蠕通报', 'groupName': '--', 'groupOrder': '僵木蠕', 'delFlag': '未通报' },
        { 'searchValue': '僵木蠕事件', 'createBy': '2021-12-26 08:00:00', 'createTime': '极高', 'updateBy': '管理员', 'updateTime': '2021-12-25 08:00:00', 'remark': '2021-12-25 09:00:00', 'params': {}, 'groupId': '1', 'userId': '僵木蠕通报', 'groupName': '--', 'groupOrder': '僵木蠕', 'delFlag': '未通报' }],
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
        userId: null,
        groupName: null,
        createTime: null
      },
      // 表单参数
      form: {},
      formData: {
        id: undefined,
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
        'label': '极高危',
        'value': 2
      }, {
        'label': '中危',
        'value': 3
      }, {
        'label': '2021-12-25 09:00:00',
        'value': 4
      }, {
        'label': '失陷',
        'value': 5
      }],
      reportTypeOptions: [{
        'label': '通用',
        'value': 1
      }, {
        'label': '漏洞',
        'value': 2
      }, {
        'label': '告警',
        'value': 3
      }, {
        'label': '弱口令',
        'value': 4
      }, {
        'label': '配置审核',
        'value': 5
      }],
      reportLevelOptions: [{
        'label': '极高',
        'value': 1
      }, {
        'label': '高',
        'value': 2
      }, {
        'label': '中',
        'value': 3
      }, {
        'label': '低',
        'value': 4
      }],
      levelOptions: [{
        'label': '正常',
        'value': 1
      }, {
        'label': '极高危',
        'value': 2
      }, {
        'label': '中危',
        'value': 3
      }, {
        'label': '2021-12-25 09:00:00',
        'value': 4
      }, {
        'label': '失陷',
        'value': 5
      }],
      statusptions: [{
        'label': '极高',
        'value': 1
      }, {
        'label': '不极高',
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
        'label': '2021-12-25 08:00:00',
        'value': 1
      }, {
        'label': '处置中',
        'value': 2
      }, {
        'label': '已处置',
        'value': 3
      }],
      reportOptions: [{
        'label': '是',
        'value': 1
      }, {
        'label': '否',
        'value': 2
      }]
    }
  },
  created() {
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
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true
      this.title = '新增通报'
    },
    /** 查看按钮操作 */
    lookdetail() {
      this.openlook = true
      this.title = '通报详情'
      this.editTrue = false
      this.dataTest.name4 = '已通报'
      this.dataTest.message = ''
    },
    /** 编辑按钮操作 */
    edit() {
      this.openlook = true
      this.title = '编辑通报'
      this.editTrue = false
      this.dataTest.name4 = '未通报'
      this.dataTest.message = '这是一个备注'
    },
    /** 完成按钮操作 */
    end() {
      this.openlook = true
      this.title = '完结通报'
      this.editTrue = true
      this.dataTest.name4 = '已通报'
      this.dataTest.message = ''
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
<style>

</style>
