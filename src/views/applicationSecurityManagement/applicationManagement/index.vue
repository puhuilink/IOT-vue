<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form
            ref="queryForm"
            :model="queryParams"
            size="mini"
            label-width="120px"
            class="label-type"
            label-position="right"
          >
            <el-col :span="6">
              <el-form-item label="任务名称：" prop="name">
                <el-input
                  v-model="queryParams.conditions.name"
                  placeholder="请输入任务名称"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <!-- 任务类型目前只有一种 -->
            <!-- <el-col :span="6">
              <el-form-item label="任务类型：" prop="taskType">
                <el-input
                  v-model="queryParams.conditions.taskType"
                  placeholder="请输入任务类型"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="检测语言：" prop="language">
                <el-input
                  v-model="queryParams.conditions.language"
                  placeholder="请输入检测语言"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="检测开始时间：" prop="date">
                <el-date-picker
                  v-model="rangeTime"
                  size="small"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  range-separator="至"
                  clearable
                  :style="{ width: '100%' }"
                  @change="setTimeList"
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery"
                  >搜索</el-button
                >
                <el-button size="mini" @click="resetQuery">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-table :data="List" tooltip-effect="light">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->

        <el-table-column
          label="任务名称"
          align="center"
          prop="taskVO.taskName"
          :show-overflow-tooltip="true"
        />
         <!-- 接口返回 0，代表缺陷检测任务，目前只有这一种任务类型 -->
        <el-table-column
          label="任务类型"
          align="center"
          prop="taskVO.taskType"
          :show-overflow-tooltip="true"
        >
          <span> 缺陷检测任务 </span>
        </el-table-column>
        <!-- <el-table-column
          label="检测语言"
          align="center"
          prop="taskVO.language"
          :show-overflow-tooltip="true"
        /> -->
        <el-table-column label="检测语言" align="center" prop="taskVO.language">
          <template #default="scope">
            <span >{{ transLanguageDic(scope.row.taskVO.language) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="源码名称"
          align="center"
          prop="taskVO.codeName"
          :show-overflow-tooltip="true"
        /> -->
        <el-table-column
          label="检测开始时间"
          align="center"
          prop="taskVO.invokeEngineTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="检测结束时间"
          align="center"
          prop="taskVO.taskEndTime"
          :show-overflow-tooltip="true"
        />
        <!-- <el-table-column
          label="任务状态"
          align="center"
          prop="taskVO.taskStatus"
          :show-overflow-tooltip="true"
        /> -->
        <el-table-column label="任务状态" align="center" prop="taskVO.taskStatus">
          <template #default="scope">
            <span >{{ transTaskStatusDic(scope.row.taskVO.taskStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检测人"
          align="center"
          prop="userName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          width="180"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="detail(scope.row.id)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.page.pageIndex"
        :limit.sync="queryParams.page.pageSize"
        @pagination="getTableList"
      />
    </el-card>
    <!--   详情分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="detailDialog"
      width="860px"
      append-to-body
    >
      <div class="contentBox">
        <div class="information">任务详情</div>
        <el-form
          ref="form"
          label-width="160px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="任务名称 :">
                <!-- {{ detailData.taskVO.taskName }} -->
                <tooltip :content="detailData.taskVO.taskName" :length="8" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任务类型 :">
                {{ detailData.taskVO.taskType }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检测语言 :">
                {{ detailData.taskVO.language }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检测开始时间 :">
                <!-- {{ detailData.taskVO.invokeEngineTime }} -->
                <tooltip :content="detailData.taskVO.invokeEngineTime" :length="15" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检测结束时间 :">
                <!-- {{ detailData.taskVO.taskEndTime }} -->
                <tooltip :content="detailData.taskVO.taskEndTime" :length="15" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检测出缺陷总数 :">
                {{ detailData.problemNum }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="高危缺陷总数 :">
                {{ detailData.problemNum5 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="中危缺陷总数 :">
                {{ detailData.problemNum3 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="低危缺陷总数 :">
                {{ detailData.problemNum1 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审计后的高危缺陷总数 :">
                {{ detailData.auditProblemNum5 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审计后的中危缺陷总数 :">
                {{ detailData.auditProblemNum3 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审计后的低危缺陷总数 :">
                {{ detailData.auditProblemNum1 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审计后的缺陷总数 :">
                {{ detailData.auditProblemNum }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">源代码详情</div>
        <el-form
          ref=""
          label-width="135px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="源码名称 :">
                <!-- {{ detailData.taskVO.codeName }} -->
                 <tooltip :content="detailData.taskVO.codeName" :length="8" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检测对象大小 :">
                {{ detailData.zipSize }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检测对象文件数量 :">
                {{ detailData.fileNum }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代码行数 :">
                {{ detailData.codeRownum }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="空行数 :">
                {{ detailData.blankRownum }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="混合行 :">
                {{ detailData.codeAndCommentRow }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总行数 :">
                {{ detailData.rowNum }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="方法数量 :">
                {{ detailData.funcNum }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="类数量 :">
                {{ detailData.classNum }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information" v-if="detailData.fileTypeAndNum[0]">
          代码类型数量
        </div>
        <el-form
          ref=""
          label-width="100px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="8" v-if="detailData.fileTypeAndNum[0]">
              <el-form-item :label="detailData.fileTypeAndNum[0].key + ':'">
                {{ detailData.fileTypeAndNum[0].value }}</el-form-item
              >
            </el-col>
            <el-col :span="8" v-if="detailData.fileTypeAndNum[1]">
              <el-form-item :label="detailData.fileTypeAndNum[1].key + ':'">
                {{ detailData.fileTypeAndNum[1].value }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">缺陷详情</div>
        <el-table :data="groupDefectList" style="width: 100%">
          <el-table-column
            label="文件类型"
            align="center"
            prop="fileType"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="文件名称"
            align="center"
            prop="fileName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="规则类型"
            align="center"
            prop="ruleType"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="规则名称"
            align="center"
            prop="ruleName"
            :show-overflow-tooltip="true"
          />
          <!-- <el-table-column label="缺陷等级" align="center" prop="bugLevel" /> -->
          <el-table-column label="缺陷等级" align="center" prop="bugLevel">
          <template #default="scope">
            <span>{{ transBugLevelDic(scope.row.bugLevel) }}</span>
          </template>
        </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
            width="180"
          >
            <template #default="{ row }">
              <el-button
                size="mini"
                type="text"
                @click="getDefectDetail(row.pkTask, row.bugId)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="submitForm"
              >保 存</el-button
            >
            <el-button size="small" @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!-- 缺陷详情 -->
    <el-dialog
      :title="title"
      :visible.sync="defectDetailDialog"
      width="860px"
      append-to-body
    >
      <div class="contentBox">
        <el-form
          ref="form"
          label-width="110px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="缺陷类型 :">
                {{ defectDetail.domainType }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺陷等级 :">
                {{ defectDetail.bugLevel }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规则名称 :">
                {{ defectDetail.ruleName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺陷起始行 :">
                {{ defectDetail.bugBeginline }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺陷结束行 :">
                {{ defectDetail.bugEndline }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺陷起始列 :">
                {{ defectDetail.bugBegincol }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺陷结束列 :">
                {{ defectDetail.bugEndcol }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺陷描述 :">
                <!-- {{ defectDetail.dsp }} -->
                 <tooltip :content="defectDetail.dsp" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="修复建议 :">
                {{ defectDetail.adv }}
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getApplicationManagementData,
  codeAuditDetail,
  getApplicationManagementDetailTable,
  getApplicationManagementDefectDetail,
} from "@/utils/request";
import { getFirewallAccessControlEventData } from "@/utils/request";
import { industryList } from "@/api/system/list";
export default {
  name: "Online",
  data() {
    return {
      rangeTime: undefined,
      from: 1,
      title: "",
      detailData: {
        taskVO: {
          taskName: "",
        },
        fileTypeAndNum: {},
      },
      defectDetail: {},
      detailDialog: false,
      defectDetailDialog: false,
      // 遮罩层
      loading: false,
      // 总条数
      total: 0,
      query: {
        query: {
          bool: {
            must: [],
          },
        },
        // sort: [{ occur_time: { order: "desc" } }],
        from: 0,
        size: 10,
      },
      // 分组表格数据
      groupList: [],
      groupDefectList: [
        // {
        //   assetName: "未使用变量",
        //   ip: "eval.js",
        //   ipType: "javascript",
        //   applicationProtocol: "JavaScript劫持",
        //   eventLevel: "高危",
        // },
      ],
      List: [],
      pageNum: 1,
      pageSize: 10,
      // 查询参数
      headers: {
        authoratun: 'Basic base64encode("admin111"+":"+"123456")',
      },
      queryAuthorization: "",
      queryParams: {
        // data: {
        conditions: {
          name: "",
          checkEngine: 0,
          checkLanguage: 0,
          taskStatus: 0,
          pkOrgs: [0],
          source: 0,
          addStart: "2021-10-28 11:23:09",
          addEnd: "2021-10-28 11:23:09",
          isSpecial: 0,
          problemNumLB: 0,
          problemNumRB: 0,
          componentNumLB: 0,
          componentNumRB: 0,
          // "taskName": "",
          taskType: "",
          language: "",
          addStart: "",
          addEnd: "",
        },
        page: {
          pageIndex: 0,
          pageSize: 10,
          checkType: 0,
        },
        // },
      },
      query: {
        pageIndex: 0,
        pageSize: 10,
      },
      queryQueryParams: {
        pageIndex: 0,
        pageSize: 10,
      },
      // dataTable:{

      // },
      levelOptions: [
        {
          label: "极低",
          value: "1",
        },
        {
          label: "低危",
          value: "2",
        },
        {
          label: "中危",
          value: "3",
        },
        {
          label: "高危",
          value: "4",
        },
        {
          label: "致命",
          value: "5",
        },
      ],
      disposalStatusOptions: [
        {
          label: "待处置",
          value: "待处置",
        },
        {
          label: "处置中",
          value: "处置中",
        },
        {
          label: "已处置",
          value: "已处置",
        },
        {
          label: "误报",
          value: "误报",
        },
        {
          label: "不处置",
          value: "不处置",
        },
      ],
      areaOptions: [
        {
          label: "三亚海投轨交",
          value: 1,
        },
        {
          label: "深中通道预制厂",
          value: 2,
        },
        {
          label: "山西三通燃气厂",
          value: 3,
        },
        {
          label: "北京城乡水厂",
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
    };
  },
  watch: {
    "queryParams.date"(newVal) {
      if (newVal == null) {
        this.queryParams.date = [];
      }
    },
  },
  created() {
    // this.getList()
    this.getTableList();
  },
  methods: {
     transLanguageDic(val) {
      var t = [
        {
          name: 0,
          content: "Java",
        },
        {
          name: 1,
          content: "C/C++",
        },
        {
          name: 2,
          content: "C#",
        },
        {
          name: 3,
          content: "Python",
        },
        {
          name: 4,
          content: "PHP",
        },
        {
          name: 5,
          content: "Objective-C",
        },
        {
          name: 6,
          content: "Cobol",
        },
        {
          name: 9,
          content: "NodeJS",
        },
        {
          name: 12,
          content: "Go",
        },
        {
          name: 15,
          content: "Swift",
        },
         {
          name: 11,
          content: "SQL",
        },
        {
          name: 16,
          content: "Kotlin",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      return `${orgTreeData1[0].content}`;
    },
    transTaskStatusDic(val) {
      var t = [
        {
          name: 0,
          content: "排队中",
        },
        {
          name: 1,
          content: "检测中",
        },
        {
          name: 2,
          content: "检测成功",
        },
        {
          name: 3,
          content: "检测失败",
        },
        {
          name: 4,
          content: "被暂停",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      return `${orgTreeData1[0].content}`;
    },
    async getTableList() {
      // var queryAuthorization = base64encode("admin111" + ":" + "123456");
      this.loading = true;
      // const res = await applicationManagementList(this.queryParams);
      // const res = await ("/codesafeapi/quickcheck", this, queryParams);

      let Base64 = require("js-base64").Base64;
      var authorizationValue =
        "Basic " + Base64.encode("wuzhigang" + ":" + "Admin@12345!");
      // var formData = new FormData();
      // formData.append('data',this.queryParams)
      await getApplicationManagementData(
        this.queryParams,
        authorizationValue
      ).then((res) => {
        console.log("res-4-28", res);
        this.List = res.data.data.quickVOS;
        this.total = res.data.data.totalCount;
        this.loading = false;
      });
    },
    transBugLevelDic(val) {
      var t = [
        {
          name: 1,
          content: "低",
        },
        {
          name: 3,
          content: "中",
        },
        {
          name: 5,
          content: "高",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      return `${orgTreeData1[0].content}`;
    },
    transDomainTypeDic(val) {
      var t = [
        {
          name: 0,
          content: "未知类型",
        },
        {
          name: 1,
          content: " 安全缺陷",
        },
        {
          name: 2,
          content: "质量问题",
        },
        {
          name: 3,
          content: "错误编码",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      return `${orgTreeData1[0].content}`;
    },
    transType(val) {
      var t = [
        {
          name: "wsec_syslog_infe_ev_02",
          content: "ACL告警事件",
        },
        {
          name: "wsec_syslog_infe_ev_01",
          content: "工业防火墙白名单",
        },
        {
          name: "wsec_syslog_infe_ev_05",
          content: "地址欺诈事件",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      // console.log(orgTreeData1[0].content);
      return `${orgTreeData1[0].content}`;
    },
    transTransportProtocol(val) {
      var t = [
        {
          name: "6",
          content: "TCP",
        },
        {
          name: "17",
          content: "UDP",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      // console.log(orgTreeData1[0].content);
      return `${orgTreeData1[0].content}`;
    },
    batchOperate(command) {
      let message = "";
      switch (command) {
        case "process":
          message = "是否确认变更处置状态？";
          this.openMessageBox(message);
          break;
        case "un_process":
          message = "是否确认将此事件处置状态修改为不处置？";
          this.openMessageBox(message);
          break;
        case "false_report":
          message = "是否确认将此事件处置状态修改为误报？";
          this.openMessageBox(message);
          break;
      }
    },
    openMessageBox(message) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改！",
          });
        });
    },
    /** 查询分组列表 */
    handleQuery() {
      this.getTableList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      (this.queryParams = {
        conditions: {
          taskName: "",
          taskType: "",
          language: "",
          addStart: "",
          addEnd: "",
        },
        page: {
          pageIndex: 0,
          pageSize: 10,
          // "checkType": 0
        },
      }),
        (this.rangeTime = []);
      this.getTableList();
    },
    // 取消按钮
    cancel() {
      this.detailDialog = false;
      this.defectDetailDialog = false;
    },
    /** 提交按钮 */
    submitForm() {
      this.detailDialog = false;
      this.defectDetailDialog = false;
    },
    async detail(id) {
      console.log("id", id);
      let Base64 = require("js-base64").Base64;
      var authorizationValueDeatil =
        "Basic " + Base64.encode("wuzhigang" + ":" + "Admin@12345!");
      await getApplicationManagementDetailTable(
        id,
        this.query,
        authorizationValueDeatil
      ).then(({ data }) => {
        console.log("dat-6-1", data);
        this.detailDialog = true;
        this.title = "事件详情";
        this.groupDefectList = data.data.bugsVOList;
      });

      await codeAuditDetail(id, authorizationValueDeatil).then(({ data }) => {
        console.log("dat-5-31", data);
        this.detailData = data.data;
        this.detailDialog = true;
        this.title = "事件详情";
        this.detailData.taskVO.taskType  = "缺陷检测任务"
        this.detailData.taskVO.language  = this.transLanguageDic(this.detailData.taskVO.language)
      });
    },
    async getDefectDetail(taskId, bugId) {
      console.log("taskId、bugId", taskId, bugId);
      let Base64 = require("js-base64").Base64;
      var authorizationValueDeatil =
        "Basic " + Base64.encode("wuzhigang" + ":" + "Admin@12345!");
      const { data } = await getApplicationManagementDefectDetail(
        taskId,
        bugId,
        authorizationValueDeatil
      );
      console.log("data", data);
      this.defectDetailDialog = true;
      this.title = "缺陷详情";
      this.defectDetail = data.data;
      this.defectDetail.bugLevel  = this.transBugLevelDic(this.defectDetail.bugLevel)
      this.defectDetail.domainType = this.transDomainTypeDic(this.defectDetail.domainType)
      // this.defectDetailData = row;
    },
    // setTimeList(values) {
    //   const [projectDevelopDate, projectEndDate] = [...values]
    //   this.queryParams.conditions.addStart = projectDevelopDate
    //   this.queryParams.conditions.addEnd = projectEndDate
    // }
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 0 !important;
}
.contentBox {
  width: 100%;
  height: 100%;
  border-top: 1px solid #ccc;
  padding: 10px 20px;
  .information {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    border-bottom: 2px solid #33ccff;
    padding-top: 10px;
    margin-bottom: 10px;
  }
  .dialog-footer {
    margin-top: 20px;
  }
}
::v-deep .el-collapse-item__header {
  font-size: 21px;
  border-bottom: 0px solid rgba(0, 0, 0, 0);
  flex: 1 0 auto;
  order: -1;
}
::v-deep .el-collapse {
  border-top: 0px solid rgba(0, 0, 0, 0);
  border-bottom: 0px solid rgba(0, 0, 0, 0);
}
::v-deep .label-type {
  .el-form-item__label {
    color: #333;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal !important;
  }
}
.el-dialog-div {
  height: 50vh;
  overflow: auto;
  overflow-x: hidden;
}
.collapse-title {
  flex: 1 0 90%;
  order: 1;
}
</style>
