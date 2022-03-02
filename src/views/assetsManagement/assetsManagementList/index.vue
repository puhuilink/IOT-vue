<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
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
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:user:export']"
          type="primary"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:user:add']"
          type="primary"
          size="mini"
          @click="handleAdd"
        >添加</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:user:remove']"
          type="primary"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list.slice((pageNum-1)*pageSize,pageNum*pageSize)"
      style="width: 100%;"
    >
      <el-table-column label="序号" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资产编号" align="center" prop="tokenId" :show-overflow-tooltip="true" />
      <el-table-column label="IP地址" align="center" prop="userName" :show-overflow-tooltip="true" />
      <el-table-column label="资产名称" align="center" prop="deptName" />
      <el-table-column label="资产类型" align="center" prop="ipaddr" :show-overflow-tooltip="true" />
      <el-table-column label="运行状态" align="center" prop="loginLocation" :show-overflow-tooltip="true" width="60" />
      <el-table-column label="风险状态" align="center" prop="browser" width="60" />
      <el-table-column label="事件等级" align="center" prop="os" width="60" />
      <el-table-column label="操作系统" align="center" prop="loginTime" width="80">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应用协议" align="center" prop="loginLocation" :show-overflow-tooltip="true" />
      <el-table-column label="风险协议" align="center" prop="browser" />
      <el-table-column label="资产标签" align="center" prop="os" />
      <el-table-column label="区域" align="center" prop="loginLocation" :show-overflow-tooltip="true" />
      <el-table-column label="负责人" align="center" prop="browser" />
      <el-table-column label="最后活跃时间" align="center" prop="os">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['monitor:online:forceLogout']"
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleForceLogout(scope.row)"
          >详情</el-button>
          <el-button
            v-hasPermi="['monitor:online:forceLogout']"
            size="mini"
            type="text"
            icon="el-icon-s-tools"
            @click="handleForceLogout(scope.row)"
          >配置</el-button>
          <el-button
            v-hasPermi="['monitor:online:forceLogout']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleForceLogout(scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" />
  </div>
</template>

<script>
import { list, forceLogout } from '@/api/monitor/online'

export default {
  name: 'Online',
  data() {
    return {
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
        userName: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询登录日志列表 */
    getList() {
      this.loading = true
      list(this.queryParams).then(response => {
        this.list = response.rows
        this.total = response.total
        this.loading = false
      })
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
    /** 强退按钮操作 */
    handleForceLogout(row) {
      this.$confirm('是否确认强退名称为"' + row.userName + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return forceLogout(row.tokenId)
      }).then(() => {
        this.getList()
        this.msgSuccess('强退成功')
      })
    }
  }
}
</script>

