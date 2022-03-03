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
            label-width="360px"
            class="label-type"
            label-position="left"
          >
            <el-col :span="12">
              <el-form-item label="" prop="name">
                <el-input
                  v-model="formData.name"
                  placeholder="请输入事件名称"
                  clearable
                  :style="{ width: '100%' }"
                  ><el-button icon="el-icon-search"></el-button
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card>
      <el-table v-loading="loading" :data="groupList">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="事件名称" align="center" prop="groupId" />
        <el-table-column label="源IP" align="center" prop="userId" />
        <el-table-column label="目的IP" align="center" prop="groupName" />
        <el-table-column label="协议" align="center" prop="groupOrder" />
        <el-table-column label="事件等级" align="center" prop="createTime">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="事件类型" align="center" prop="remark" />
        <el-table-column label="处置状态" align="center" prop="remark" />
        <el-table-column label="事件开始事件" align="center" prop="remark" />
        <el-table-column label="事件结束事件" align="center" prop="remark" />
        <el-table-column label="区域" align="center" prop="remark" />
        <el-table-column label="上报设备" align="center" prop="remark" />
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['system:group:edit']"
              size="mini"
              type="text"
              @click="detail"
              >详情</el-button
            >
            <el-button
              v-hasPermi="['system:group:remove']"
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
              >处置</el-button
            >
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
          <el-col :span="8">
            <el-form-item label="IOC :">
              {{ dataTest.name }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="IOC类型 :">
              {{ dataTest.name1 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="威胁类型 :">
              {{ dataTest.name2 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="威胁级别 :">
              {{ dataTest.name3 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="可信度 :">
              {{ dataTest.name4 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="更新时间 :">
              {{ dataTest.name5 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="受影响平台 :">
              {{ dataTest.name6 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="可信度 :">
              {{ dataTest.name7 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="更新时间 :">
              {{ dataTest.name8 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="IP :">
              {{ dataTest.name9 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运营商 :">
              {{ dataTest.name10 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="位置 :">
              {{ dataTest.name11 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="域名服务商 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="域名服务器 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="注册者 :">
              {{ dataTest.name11 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册邮箱 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册机构 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地址 :">
              {{ dataTest.name11 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册时间 :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="更新时间 :">
              {{ dataTest.name11 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="过期时间 :">
              {{ dataTest.name12 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Alexa :">
              {{ dataTest.name13 }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" type="primary" @click="submitForm"
            >确 定</el-button
          >
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { listGroup } from "@/api/system/group";
export default {
  components: {},
  props: [],
  data() {
    return {
      loading: true,
      name: "测试",
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
      // 分组表格数据
      groupList: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: "",
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
        createTime: null,
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
        date: [""],
        field114: undefined,
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
        field114: [],
      },
      levelOptions: [
        {
          label: "正常",
          value: 1,
        },
        {
          label: "低危",
          value: 2,
        },
        {
          label: "中危",
          value: 3,
        },
        {
          label: "高危",
          value: 4,
        },
        {
          label: "失陷",
          value: 5,
        },
      ],
      areaOptions: [
        {
          label: "北京",
          value: 1,
        },
        {
          label: "重庆",
          value: 2,
        },
      ],
      field114Options: [
        {
          label: "未处置",
          value: 1,
        },
        {
          label: "处置中",
          value: 2,
        },
        {
          label: "已处置",
          value: 3,
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询分组列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      listGroup(this.queryParams).then((response) => {
        this.groupList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    submitdata() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    detail() {
      this.open = true;
      this.title = "事件详情";
    },
    // 取消按钮
    cancel() {
      this.open = false;
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false;
    },
  },
};
</script>
<style>
</style>
