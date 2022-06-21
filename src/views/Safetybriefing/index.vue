<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form
            ref="elForm"
            :model="queryParams"
            :rules="rules"
            size="mini"
            label-width="100px"
            class="label-type"
            label-position="right"
          >
            <el-col :span="6">
              <el-form-item label="通报编号：" prop="notificationManagementId">
                <el-input
                  v-model.trim="queryParams.notificationManagementId"
                  placeholder="请输入通报编号"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="事件类型：" prop="eventType">
                <el-select
                  v-model.trim="queryParams.eventType"
                  placeholder="请选择事件类型"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in eventTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="通报名称：" prop="notificationName">
                <el-input
                  v-model.trim="queryParams.notificationName"
                  placeholder="请输入通报名称"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="通报状态：" prop="level">
                <el-select
                  v-model.trim="queryParams.notificationStatus"
                  placeholder="请选择通报状态"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in notificationStatusOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建人：" prop="type">
                <el-input
                  v-model.trim="queryParams.leader"
                  placeholder="请输入创建人"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="上报时间：" prop="date">
                <el-date-picker
                  v-model.trim="rangeTime"
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :style="{ width: '100%' }"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  range-separator="至"
                  clearable
                  @change="setTimeList"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item size="mini" label-width="515px">
                <el-button type="primary" @click="getCategoryList"
                  >搜索</el-button
                >
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row :gutter="10" class="mb8">
          <!-- <el-col :span="1.5">
            <el-button
              type="primary"
              size="mini"
            >导出</el-button>
          </el-col> -->
          <!-- <el-col :span="1.5">
            <el-button
              type="primary"
              size="mini"
              @click="handleAdd"
            >新增</el-button>
          </el-col> -->
          <el-col :span="1.5">
            <el-button
              type="primary"
              size="mini"
              @click="deleteDetail()"
              :disabled="sels.length === 0"
              >删除</el-button
            >
          </el-col>
          <!-- <el-col :span="1.5">
            <el-button
              type="primary"
              size="mini"
            >上报</el-button>
          </el-col> -->
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
      <el-table
        :data="groupList"
        tooltip-effect="light"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="通报编号"
          prop="notificationManagementId"
          :show-overflow-tooltip="true"
          min-width="10%"
          align="center"
        />
        <el-table-column
          label="通报名称"
          align="center"
          prop="notificationName"
          :show-overflow-tooltip="true"
          min-width="10%"
        />
        <el-table-column
          label="上报时间"
          align="center"
          prop="reportingTime"
          :show-overflow-tooltip="true"
          min-width="10%"
        />
        <el-table-column
          label="事件类型"
          align="center"
          prop="eventType"
          min-width="10%"
        />
        <el-table-column
          label="事件名称"
          align="center"
          prop="eventName"
          :show-overflow-tooltip="true"
          min-width="10%"
        />
        <el-table-column
          label="优先级"
          align="center"
          prop="priority"
          min-width="8%"
        />
        <el-table-column
          label="通报状态"
          align="center"
          prop="notificationStatus"
          min-width="10%"
        />
        <el-table-column
          label="创建人"
          align="center"
          prop="leader"
          min-width="8%"
        />
        <el-table-column
          label="最近更新时间"
          align="center"
          prop="updateTime"
          min-width="15%"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="创建时间"
          align="center"
          prop="creationTime"
          min-width="10%"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="备注"
          align="center"
          prop="remark"
          min-width="5%"
           :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          min-width="18%"
        >
          <template #default="scope">
            <el-button
              size="mini"
              type="text"
              @click="lookdetail(scope.row.notificationManagementId)"
              >查看</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="edit(scope.row.notificationManagementId)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="scope.row.notificationStatus != '已通报'"
              @click="report(scope.row.eventId, scope.row.eventIndex,scope.row.notificationStatus)"
              >上报</el-button
            >
            <!-- <el-button
            size="mini"
            type="text"
            @click="end(scope.row)"
          >完成</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getCategoryList"
    />
    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <div class="contentBox">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          class="label-type"
        >
          <el-form-item label="通报名称:" prop="userId">
            <el-input v-model.trim="form.eventName" placeholder="" />
          </el-form-item>
          <el-form-item label="事件类型:" prop="groupName">
            <el-select
              v-model.trim="form.type"
              placeholder=""
              filterable
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in eventTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.label"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="事件名称:" prop="groupOrder">
            <el-input v-model.trim="form.groupOrder" placeholder="" />
          </el-form-item>
          <el-form-item label="优先级:" prop="remark">
            <el-select
              v-model.trim="form.level"
              placeholder=""
              filterable
              clearable
              :style="{ width: '100%' }"
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
            <el-input
              v-model.trim="form.remark"
              placeholder=""
              type="textarea"
            />
          </el-form-item>
          <el-form-item label="上报:" prop="groupOrder">
            <el-select
              v-model.trim="form.report"
              placeholder=""
              filterable
              clearable
              :style="{ width: '100%' }"
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
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="submitForm">保 存</el-button>
            <el-button @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!-- 查看通报 -->
    <el-dialog
      :title="title"
      :visible.sync="openlook"
      width="800px"
      append-to-body
    >
      <div class="contentBox">
        <el-form
          ref="form"
          :model="detailData"
          :rules="rules"
          label-width="110px"
          class="label-type"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="通报名称 :" v-if="!editTrue">
                <tooltip :content="detailData.notificationName" :length="20" />
              </el-form-item>
              <el-form-item label="通报名称 :" v-if="editTrue">
                <el-input
                  v-model.trim="detailData.notificationName"
                  clearable
                  placeholder="请输入通报名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件类型 :" v-if="!editTrue">
                <tooltip :content="detailData.eventType" :length="20" />
              </el-form-item>
              <el-form-item label="事件类型 :" v-if="editTrue">
                <el-input v-model.trim="detailData.eventType" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件名称 :" v-if="!editTrue">
                <tooltip :content="detailData.eventName" :length="20" />
              </el-form-item>
              <el-form-item label="事件名称 :" v-if="editTrue">
                <el-input v-model.trim="detailData.eventName" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="优先级 :" v-if="!editTrue">
                {{ detailData.priority }}
              </el-form-item>
              <el-form-item label="优先级 :" v-if="editTrue">
                <el-select
                  v-model.trim="detailData.priority"
                  placeholder=""
                  filterable
                  clearable
                  :style="{ width: '100%' }"
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
              <el-form-item label="通报状态 :" v-if="!editTrue">
                {{ detailData.notificationStatus }}
              </el-form-item>
              <el-form-item label="通报状态 :" v-if="editTrue">
                <el-input
                  v-model.trim="detailData.notificationStatus"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建人 :" v-if="!editTrue">
                {{ detailData.leader }}
              </el-form-item>
              <el-form-item label="创建人 :" v-if="editTrue">
                <el-input v-model.trim="detailData.leader" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间 :" v-if="!editTrue">
                {{ detailData.creationTime }}
              </el-form-item>
              <el-form-item label="创建时间 :" v-if="editTrue">
                <el-input v-model.trim="detailData.creationTime" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上报时间 :" v-if="!editTrue">
                {{ detailData.reportingTime }}
              </el-form-item>
              <el-form-item label="上报时间 :" v-if="editTrue">
                <el-input v-model.trim="detailData.reportingTime" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最近更新时间 :" v-if="!editTrue">
                {{ detailData.updateTime }}
              </el-form-item>
              <el-form-item label="最近更新时间 :" v-if="editTrue">
                <el-input v-model.trim="detailData.updateTime" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注 :" v-if="!editTrue">
                {{ detailData.remark }}
              </el-form-item>
              <el-form-item label="备注 :" v-if="editTrue">
                <el-input
                  v-model.trim="detailData.remark"
                  placeholder="请输入备注"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
            <el-col v-if="upload === true" :span="12">
              <el-form-item label="附件 :">
                <el-upload drag action multiple :file-list="fileList">
                  <i class="el-icon-upload" />
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="submitForm" v-if="!editTrue"
              >保 存</el-button
            >
            <el-button type="primary" @click="saveForm" v-if="editTrue"
              >保 存</el-button
            >
            <el-button @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  notificationList,
  notificationExport,
  putChangeSate,
  vulnerabilityExport,
  notificationDetail,
  notificationEdit,
  notificationDelete,
} from "@/api/system/list";
export default {
  components: {},
  props: [],
  data() {
    return {
      sels: [],
      // ids:[],
      rangeTime: undefined,
      loading: true,
      name: "测试",
      detailData: {},
      saveDetailData: {
        notificationName: "",
        priority: "",
        remark: "",
        updateTime: "",
        notificationManagementId: "",
      },
      fileList: [],
      // 分组表格数据
      groupList: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: "漏洞详情",
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
        orderByColumn: "creation_time ",
        isAsc: "desc",
        notificationManagementId: "",
        eventType: "",
        notificationName: "",
        notificationStatus: "",
        leader: "",
        beginCreationTime: "",
        endCreationTime: "",
      },
      // 表单参数
      form: {},
      formData:{
        eventId:"",
        notificationStatus:""
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
      notificationStatusOptions: [
        {
          label: "已通报",
          value: 1,
        },
        {
          label: "未通报",
          value: 2,
        },
      ],
      reportLevelOptions: [
        {
          label: "低",
          value: "低",
        },
        {
          label: "中",
          value: "中",
        },
        {
          label: "高",
          value: "高",
        },
        {
          label: "极高",
          value: "极高",
        },
      ],
      reportOptions: [
        {
          label: "已上报",
          value: 1,
        },
        {
          label: "未上报",
          value: 3,
        },
      ],
      eventTypeOptions: [
        {
          label: "僵木蠕事件",
          value: "僵木蠕事件",
        },
        {
          label: "弱口令事件",
          value: "弱口令事件",
        },
        {
          label: "漏洞事件",
          value: "漏洞事件",
        },
        {
          label: "主机安全事件",
          value: "主机安全事件",
        },
        {
          label: "配置核查事件",
          value: "配置核查事件",
        },
        {
          label: "异常行为事件",
          value: "异常行为事件",
        },
        {
          label: "威胁情报事件",
          value: "威胁情报事件",
        },
        {
          label: "入侵诱捕事件",
          value: "入侵诱捕事件",
        },
        {
          label: "数据安全事件",
          value: "数据安全事件",
        },
        {
          label: "工业网络审计事件",
          value: "工业网络审计事件",
        },
      ],
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    handleSelectionChange(sels) {
      this.sels = sels;
      console.log(
        "选中的值",
        sels.map((item) => item.notificationManagementId)
      );
    },
    deleteDetail() {
      this.$confirm("确认要删除吗？", "提示", { type: "warning" })
        .then(() => {
          let ids = this.sels.map((item) => item.notificationManagementId);
          notificationDelete(ids).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getCategoryList();
            //  if (res && res.data.code == "200") {
            //     this.$notify({
            //           title: "删除成功",
            //            type: 'success'});
            //     this.getCategoryList()
            //   }else {
            //        this.$notify({
            //           title: res.data.msg,
            //            type: 'error'
            //                    });
            //           }
          });
        })
        .catch(() => {});
    },
    getCategoryList() {
      this.loading = true;
      notificationList(this.queryParams).then((response) => {
        this.groupList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询分组列表 */
    submitdata() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      (this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        orderByColumn: "creation_time ",
        isAsc: "desc",
        notificationManagementId: "",
        eventType: "",
        notificationName: "",
        notificationStatus: "",
        leader: "",
      }),
        (this.rangeTime = []);
      this.getCategoryList();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "新增通报";
    },
    /** 查看按钮操作 */
    async lookdetail(id) {
      const { data } = await notificationDetail(id);
      this.detailData = data;
      this.openlook = true;
      // this.detailData = row
      this.title = "通报详情";
      this.editTrue = false;
      // this.detailData.name4 = '已通报'
      // this.detailData.remark = ''
      this.upload = false;
    },
    /** 编辑按钮操作 */
    async edit(id) {
      const { data } = await notificationDetail(id);
      this.detailData = data;
      this.openlook = true;
      this.title = "编辑通报";
      this.editTrue = true;
      this.detailData.name4 = "未通报";
      // this.detailData.remark = '这是一个备注'
      this.upload = false;
    },
    /** 完成按钮操作 */
    end(row) {
      this.openlook = true;
      this.title = "完结通报";
      this.editTrue = true;
      this.detailData.name4 = "已通报";
      this.detailData.remark = "";
      this.upload = true;
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.openlook = false;
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false;
      this.openlook = false;
    },
    saveForm() {
      const saveDetailData = {
        notificationName: this.detailData.notificationName,
        priority: this.detailData.priority,
        remark: this.detailData.remark,
        // updateTime:this.detailData.updateTime,
        notificationManagementId: this.detailData.notificationManagementId,
      };
      (this.saveDetailData.notificationName = this.detailData.notificationName),
        (this.saveDetailData.priority = this.detailData.priority),
        (this.saveDetailData.remark = this.detailData.remark),
        // this.saveDetailData.updateTime = this.detailData.updateTime,
        (this.saveDetailData.notificationManagementId =
          this.detailData.notificationManagementId),
        console.log("saveDetailData", saveDetailData);
      this.open = false;
      this.openlook = false;
      notificationEdit(
        "/dm/notificationManagement/edit",
        this.saveDetailData
      ).then((response) => {
        this.$message({
          type: "success",
          message: "编辑成功",
        });
        // this.$message.success(msg);
        setTimeout(() => {
          this.getCategoryList();
        }, 500);
      });
    },
    setTimeList(values) {
      const [projectDevelopDate, projectEndDate] = [...values];
      this.queryParams.beginCreationTime = projectDevelopDate;
      this.queryParams.endCreationTime = projectEndDate;
    },
    //通报状态
    async getChangeSate() {
      //入库
      await putChangeSate(this.formData).then((response) => {
          this.$message({
            type: "success",
            message:'通报状态已修改为"已通报"' ,
          });
          setTimeout(() => {
             this.getCategoryList();
          }, 500);
        
      });
    },
    // 上报
    async report(eventId, eventIndex,notificationStatus) {
      this.formData.eventId = eventId
      this.formData.notificationStatus = "已通报"
      // console.log('参数',eventId,eventIndex)
      if (eventIndex != "vulnerability") {
        const params = {
          id: eventId,
          index: eventIndex,
        };
        const { msg } = await notificationExport(params).then((response) => {
          // console.log('response',response)
          //  this.$message.success(msg)
          this.$message({
            type: "success",
            message: "上报成功!",
          });
           setTimeout(() => {
              this.getChangeSate();
            }, 500);
        });
      } else {
        const params = {
          id: eventId,
        };
        const { msg } = await vulnerabilityExport(params).then((response) => {
          this.$message({
            type: "success",
            message: "上报成功!",
          });
          setTimeout(() => {
              this.getChangeSate();
            }, 500);
          // this.getCategoryList();
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
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
