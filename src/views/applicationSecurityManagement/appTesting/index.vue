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
              <el-form-item label="报告名称:" prop="fileName">
                <el-input
                  v-model="queryParams.fileName"
                  placeholder="请输入报告名称"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
           <el-col :span="6">
              <el-form-item label="上传时间：" prop="date">
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

            <el-col :span="12">
              <el-form-item label-width="525px">
                <el-button size="mini" type="primary"  @click="getList"
                  >搜索</el-button
                >
                <el-button size="mini" @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card>
      <div class="btnClass">
        <el-row>
          <el-button type="primary" @click="handleImport">导入</el-button>
        </el-row>
      </div>
      <el-table :data="List" tooltip-effect="light">
        <el-table-column
          label="报告名称"
          align="center"
          prop="fileName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="上传时间"
          align="center"
          prop="happenTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="上传人"
          align="center"
          prop="name"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="区域"
          align="center"
          prop="location"
          :show-overflow-tooltip="true"
        />
        
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template #default="scope">
            <el-button size="mini" type="text" @click="preview(scope.row.pdfPath)"
              >预览
            </el-button>
            <el-button size="mini" type="text" 
              >删除
            </el-button>
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
    <!-- 导入 -->
     <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :auto-upload="false"
        :before-upload="beforeUpload"
        :http-request="importExcel"
         action
         drag>
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!-- <div slot="tip" class="el-upload__tip" style="color:#ffaf37">提示：仅允许导入“pdf”格式文件！且必须选择所属区域</div> -->
       
      </el-upload> 
       <div  class="fileFormat"><filetip :content="'提示：仅允许导入“pdf”格式文件！且必须选择所属区域'" />
      </div>
      <el-select
          v-model.trim="form.location"
          placeholder="请选择区域"
          filterable
          clearable
          :style="{width: '100%'}"
      >
          <el-option
              v-for="(item, index) in areaOptions"
              :key="index"
              :label="item.label"
              :value="item.label"
              :disabled="item.disabled"
          />
      </el-select> 
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getHostSecurityData } from "@/utils/request";
import { appTesting,uploadPdf,downloadAction } from "@/api/system/list";
import eventType from "@/components/Echarts/eventType";
import eventTrend from "@/components/Echarts/eventTrend";
import Filetip from '@/components/FileTip/index.vue'

export default {
  components: { eventType, eventTrend , Filetip },
  props: [{
     tipdesc: {// tip内容
      default: '提示：仅允许导入“pdf”格式文件！且必须选择所属区域',
      type: String
    },
  }],
  data() {
    return {
      // // 是否显示弹出层（用户导入）
      // open: false,
      // // 弹出层标题（用户导入）
      // title: '',
      rangeTime: undefined,
      from: 1,
      loading: false,
      name: "测试",
      detailData: {},
      detailDataApi: {
        reportName: "事件统计",
        reportType: "事件统计",
        reportCycle: "周报",
        status: "启用",
        lastExecutionTime: "20220320 18:00:00",
        nextExecutionTime: "20220327 18:00:00",
        InformTheWay: "邮箱、短信",
        Notify: "张三、李四、王五",
        create: "管理员",
        createTime: "20220306 10:00:00",
      },
      groupList: [],
      // 分组表格数据
      List: [],
      editListTable: [
        {
          Notify: "张三",
          department: "一航局",
          email: "15769422951@163.com",
          telephone: "15936598478",
        },
        {
          Notify: "李四",
          department: "四航院",
          email: "15769422951@163.com",
          telephone: "15936598478",
        },
      ],
      groupListDeatils: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      upload:{
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      },
      addReportDialog: false,
      editReportDialog: false,
   
      // 总条数
      total: 0,
      query: {
        query: {
          bool: {
            must: [],
          },
        },
        sort: [{ occur_time: { order: "desc" } }],
        from: 0,
        size: 10,
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        fileName:'',
        beginHappenTime: '',
        endHappenTime: '',
        orderByColumn: 'happenTime',
        isAsc: 'desc',
      },
      queryEditParams: {
        reportName: "",
        reportType: "",
        reportCycle: "",
        cycleStartTime: "",
        dateRange: "",
        InformTheWay: "",
        Notify: "",
      },
      form:{
        location:''
      },
      rules: {
        name: [],
        severity: [],
        event_format: [],
        location: [],
        procedure: [],
        ip: [],
        newip: [],
        ev_wsec_hsme_system_ip: [],
        date: [],
        field114: [],
      },
      levelOptions: [
        {
          label: "年报",
          value: "年报",
        },
        {
          label: "季报",
          value: "季报",
        },
        {
          label: "月报",
          value: "月报",
        },
        {
          label: "周报",
          value: "周报",
        },
        {
          label: "日报",
          value: "日报",
        },
        {
          label: "仅本次",
          value: "仅本次",
        },
      ],
      InformTheWayOptions: [
        {
          label: "邮箱",
          value: "1",
        },
        {
          label: "短信",
          value: "2",
        },
      ],
      NotifyOptions: [
        {
          label: "张三",
          value: 1,
        },
        {
          label: "李四",
          value: 2,
        },
        {
          label: "王五",
          value: 3,
        },
      ],
      reportOptions: [
        {
          label: "事件统计",
          value: "事件统计",
        },
        {
          label: "资产统计",
          value: "资产统计",
        },
      ],
      areaOptions: [{
        'label': '三亚海投轨交',
        'value': 1
      }, {
        'label': '珠海深中通道',
        'value': 2
      }, {
        'label': '山西三通燃气厂',
        'value': 1
      }, {
        'label': '北京城乡水厂',
        'value': 1
      }, {
        'label': '天津管片厂',
        'value': 1
      }],
      statusOptions: [
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
  // watch: {
  //   "queryParams.date"(newVal) {
  //     if (newVal == null) {
  //       this.queryParams.date = [];
  //     }
  //   },
  //   "query.form"(val, oldVal) {
  //     console.log(val, oldVal);
  //   },
  // },
  created() {
    // this.getTableList();
    this.getList()
  },
  methods: {
    handleImport() {
      this.upload.title = '导入报告'
      this.upload.open = true
    },
       // 上传前格式与大小校验
    beforeUpload (file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'pdf'
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!extension) {
        this.$message.warning('上传文件只能是pdf格式')
      }
      if (!isLt10M) {
        this.$message.warning('上传文件大小不能超过 10MB!')
      }
      return extension && isLt10M
    },
      async importExcel (fileObj) {
      const params = this.form
      const formData = new FormData()
      formData.set('pdfFile', fileObj.file)
      const { msg } = await uploadPdf(
        '/bangBangFile/upload',
        formData,
        params
      )
      this.upload.open = false
      this.upload.isUploading = false
       this.$refs.upload.clearFiles()
      this.getList()
      this.$message.success(msg)
    },
        // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    },
    // 提交上传文件
    submitFileForm() {
      console.log('this.form.location',this.form.location)
      this.$refs.upload.submit()
      // this.$refs.upload.submit()
    },
    // 根据对象中的key是否值为空x向数组中添加对象
    addQuery(query, key, value) {
      if (value !== "") {
        query.query.bool.must.push({
          match: {
            [key]: value,
          },
        });
      }
    },
    // async getTableList() {
    //   this.addQuery(this.query, "location.keyword", this.queryParams.location);

    //   this.addQuery(this.query, "severity.keyword", this.queryParams.severity);

    //   this.addQuery(
    //     this.query,
    //     "event_format.keyword",
    //     this.queryParams.event_format
    //   );

    //   this.addQuery(
    //     this.query,
    //     "procedure.keyword",
    //     this.queryParams.procedure
    //   );

    //   this.addQuery(
    //     this.query,
    //     "ev_wsec_hsme_system_ip.keyword",
    //     this.queryParams.ev_wsec_hsme_system_ip
    //   );

    //   this.addQuery(
    //     this.query,
    //     "ev_wsec_hsme_system_osname.keyword",
    //     this.queryParams.ev_wsec_hsme_system_osname
    //   );

    //   this.query.from = this.from - 1;
    //   if (this.queryParams.date.length > 0) {
    //     this.query.query.bool.must.push({
    //       range: {
    //         occur_time: {
    //           gte: this.queryParams.date[0],
    //           lte: this.queryParams.date[1],
    //         },
    //       },
    //     });
    //   }
    //   getHostSecurityData(this.query).then((res) => {
    //     this.query.query.bool.must = [];
    //     this.groupList = [];
    //     this.total = res.data.hits.total;
    //     this.List = res.data.hits.hits;
    //   });
    // },
    transType(val) {
      var t = [
        {
          label: "程序告警事件",
          value: "wsec_syslog_hsme_ev_07",
        },
        {
          label: "外设告警事件",
          value: "wsec_syslog_hsme_ev_08",
        },
        {
          label: "主机防火墙事件",
          value: "wsec_syslog_hsme_ev_09",
        },
        {
          label: "访问控制事件",
          value: "wsec_syslog_hsme_ev_10",
        },
        {
          label: "主机非法外联",
          value: "wsec_syslog_hsme_ev_22",
        },
        {
          label: "恶意文件事件",
          value: "wsec_syslog_hsme_ev_30",
        },
      ];
      const orgTreeData = t
        .filter((e) => e.value === val)
        .map(({ label }) => ({
          label,
        }));
      return `${orgTreeData[0].label}`;
    },
    transTypeDic(val) {
      var t = [
        {
          name: 1,
          content: "极低",
        },
        {
          name: 2,
          content: "低危",
        },
        {
          name: 3,
          content: "中危",
        },
        {
          name: 4,
          content: "高危",
        },
        {
          name: 5,
          content: "致命",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
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
    async getList() {
      this.loading = true;
      const res = await appTesting(this.queryParams);
      this.groupList = res.rows;
      this.total = res.total;
      this.List = res.rows;
      this.loading = false;
    },
    // btnQuery() {
    //   // this.getTableList();
    //   this.getList();
    // },
    resetForm() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        fileName:'',
        beginHappenTime: '',
        endHappenTime: '',
      };
      // this.getTableList();
      this.rangeTime = []
      this.getList();
    },
    async preview(id) {
      await downloadAction(id) .then((res) => {
           const binaryData = [];
         binaryData.push(res);
        //获取blob链接
        this.pdfUrl = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }));
        window.open(this.pdfUrl);
        })
    },
    toPdf() {
      this.getPdfFromHtml(this.$refs.pdfs, "测试")
    },
    setTimeList(values) {
      const [projectDevelopDate, projectEndDate] = [...values]
      this.queryParams.beginHappenTime = projectDevelopDate
      this.queryParams.endHappenTime = projectEndDate
    }
  },
};
</script>
<style lang="scss" scoped>
.box-card{
  margin-bottom: 20px;
}
.btnClass {
  margin-bottom: 10px;
}
.export {
  margin-bottom: 10px;
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
