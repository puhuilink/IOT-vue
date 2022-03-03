<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="IP地址" prop="ipaddr">
        <el-input
          v-model="queryParams.ipaddr"
          placeholder="请输入登录地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请选择区域"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="风险等级" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请选择风险等级"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="责任人" prop="ipaddr">
        <el-input
          v-model="queryParams.ipaddr"
          placeholder="请输入责任人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="事件等级" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请选择事件等级"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资产类型" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请选择资产类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:user:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:user:add']"
          >添加</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:user:remove']"
          >删除</el-button
        >
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="资产编号"
        align="center"
        prop="tokenId"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="IP地址"
        align="center"
        prop="userName"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="资产名称" align="center" prop="deptName" />
      <el-table-column
        label="资产类型"
        align="center"
        prop="ipaddr"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="运行状态"
        align="center"
        prop="loginLocation"
        :show-overflow-tooltip="true"
        width="60"
      />
      <el-table-column
        label="风险状态"
        align="center"
        prop="browser"
        width="60"
      />
      <el-table-column label="事件等级" align="center" prop="os" width="60" />
      <el-table-column
        label="操作系统"
        align="center"
        prop="loginTime"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="应用协议"
        align="center"
        prop="loginLocation"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="风险协议" align="center" prop="browser" />
      <el-table-column label="资产标签" align="center" prop="os" />
      <el-table-column
        label="区域"
        align="center"
        prop="loginLocation"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="负责人" align="center" prop="browser" />
      <el-table-column label="最后活跃时间" align="center" prop="os">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="180"
      >
        <template>
          <el-button
            v-hasPermi="['monitor:online:forceLogout']"
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="detail"
            >详情</el-button
          >
          <el-button
            v-hasPermi="['monitor:online:forceLogout']"
            size="mini"
            type="text"
            icon="el-icon-s-tools"
            @click="configuration"
            >配置</el-button
          >
          <el-button
            v-hasPermi="['monitor:online:forceLogout']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="edit"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="pageNum"
      :limit.sync="pageSize"
    />
    <!-- 添加分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="300px"
      >
        <el-form-item label="资产编号 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入资产编号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="资产名称 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入资产名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="资产类型 :" prop="ipaddr">
              <el-select
                v-model="formData.field114"
                placeholder="请选择资产类型"
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
        </el-row>
        <el-form-item label="IP地址 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入IP地址"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="负责人 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入负责人"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="区域 :" prop="ipaddr">
              <el-select
                v-model="formData.field114"
                placeholder="请选择区域"
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
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" type="primary" @click="submitForm"
            >保 存</el-button
          >
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <!-- 批量导出对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="exportDialog"
      width="900px"
      append-to-body
    >
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="300px"
      >
        <el-form-item label="请选择文件 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入资产编号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" type="primary" @click="submitForm"
            >导 入</el-button
          >
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <!-- 修改分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="editDialog"
      width="900px"
      append-to-body
    >
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="300px"
      >
        <el-form-item label="资产编号 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入资产编号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="资产名称 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入资产名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="资产类型 :" prop="ipaddr">
              <el-select
                v-model="formData.field114"
                placeholder="请选择资产类型"
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
        </el-row>
        <el-form-item label="IP地址 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入IP地址"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="负责人 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入负责人"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="区域 :" prop="ipaddr">
              <el-select
                v-model="formData.field114"
                placeholder="请选择区域"
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
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" type="primary" @click="submitForm"
            >保 存</el-button
          >
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <!-- 配置分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="configurationDialog"
      width="900px"
      append-to-body
    >
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="300px"
      >
        <el-form-item label="资产型号 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入资产型号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="生产厂商 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入生产厂商"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="资产价值 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入资产价值"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="资产描述 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入资产描述"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="资产标签 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入资产标签"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="运行状态 :" prop="ipaddr">
              <el-select
                v-model="formData.field114"
                placeholder="请选择运行状态"
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
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" type="primary" @click="submitForm"
            >保 存</el-button
          >
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <!--   详情分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="detailDialog"
      width="900px"
      append-to-body
    >
      <el-form ref="form" label-width="105px" label-position="left">
        <el-row>
          <el-col :span="8">
            <el-form-item label="资产编号 :">
              {{ dataTest.name }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="IP地址 :">
              {{ dataTest.name1 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产型号 :">
              {{ dataTest.name2 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产名称 :">
              {{ dataTest.name3 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产类型 :">
              {{ dataTest.name4 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生产厂商 :">
              {{ dataTest.name5 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产价值 :">
              {{ dataTest.name6 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产标签 :">
              {{ dataTest.name7 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产描述 :">
              {{ dataTest.name8 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作系统 :">
              {{ dataTest.name8 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运行软件 :">
              {{ dataTest.name9 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数据库 :">
              {{ dataTest.name11 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="风险状态 :">
              {{ dataTest.name10 }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="运行状态 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="应用协议 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="风险协议 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件等级 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产位置 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="威胁事件 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="漏洞数量 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发现来源 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最后活跃时间 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        v-loading="loading"
        :data="list.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
        style="width: 100%"
      >
        <el-table-column
          label="事件名称"
          align="center"
          prop="tokenId"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="源IP"
          align="center"
          prop="userName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="目的IP"
          align="center"
          prop="ipaddr"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="协议"
          align="center"
          prop="loginLocation"
          :show-overflow-tooltip="true"
          width="60"
        />
        <el-table-column
          label="事件等级"
          align="center"
          prop="browser"
          width="60"
        />
        <el-table-column label="事件类型" align="center" prop="os" width="60" />
        <el-table-column
          label="处置状态"
          align="center"
          prop="loginTime"
          width="80"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.loginTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="事件开始时间"
          align="center"
          prop="loginLocation"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="事件结束时间" align="center" prop="browser" />
        <el-table-column
          label="区域"
          align="center"
          prop="loginLocation"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="上报设备" align="center" prop="browser" />
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" type="primary" @click="submitForm"
            >保 存</el-button
          >
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, forceLogout } from '@/api/monitor/online'

export default {
  name: 'Online',
  data() {
    return {
      // 是否显示新增弹出层
      open: false,
      exportDialog: false,
      editDialog: false,
      configurationDialog: false,
      detailDialog: false,
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 表格数据
      list: [],
      pageNum: 1,
      pageSize: 10,
      // 查询参数
      queryParams: {
        ipaddr: undefined,
        userName: undefined,
      },
      formData: {
        level: "",
      },
      field114Options: [
        {
          label: "IT资产",
          value: 1,
        },
        {
          label: "无控资产",
          value: 2,
        },
        {
          label: "无",
          value: 3,
        },
        {
          label: "无控资产-服务器",
          value: 4,
        },
      ],
      statusOptions: [
        {
          label: "在线",
          value: 1,
        },
        {
          label: "离线",
          value: 2,
        },
        {
          label: "异常",
          value: 3,
        },
      ],
      dataTest: {
        name: "工业网络审计事件",
        name1: "工业网络审计",
        name2: "高危",
        name3: "未知接口",
        name4: "10.255.52.84",
        name5: "192.163.12.63",
        name6: "MODBUS协议",
        name7: "工业网络审计",
        name8: "10.255.52.83",
        name9: "失陷",
        name10: "山西燃气厂",
        name11: "待处置",
        name12: "2022-02-22",
        name13: "2022-2-25",
      },
    };
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询登录日志列表 */
    getList() {
      this.loading = true;
      list(this.queryParams).then((response) => {
        this.list = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    handleAdd() {
      this.open = true;
      this.title = "新增资产";
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.exportDialog = false;
      this.editDialog = false;
      this.configurationDialog = false;
      this.detailDialog = false;
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false;
      this.exportDialog = false;
      this.editDialog = false;
      this.configurationDialog = false;
      this.detailDialog = false;
    },
    handleDelete(row) {
      this.$confirm("是否确认删除选中的资产?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return forceLogout(row.tokenId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("强退成功");
        });
    },
    handleExport() {
      this.exportDialog = true;
      this.title = "批量导入资产";
    },
    edit() {
      this.editDialog = true;
      this.title = "修改资产";
    },
    configuration() {
      this.configurationDialog = true;
      this.title = "配置资产";
    },
    detail() {
      this.detailDialog = true;
      this.title = "资产详情";
    },
  },
};
</script>

