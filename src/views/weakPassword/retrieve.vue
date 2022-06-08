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
            label-width="80px"
            class="label-type"
            label-position="right"
          >
            <el-col :span="6">
              <el-form-item label="资产名称:" prop="event_name">
                <el-input
                  v-model.trim="queryParams.event_name"
                  placeholder="请输入资产名称"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域:" prop="location ">
                <el-select
                  v-model.trim="queryParams.location"
                  placeholder="请选择区域"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in areaOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="事件等级:" prop="severity ">
                <el-select
                  v-model.trim="queryParams.severity"
                  placeholder="请选择事件等级"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
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
              <el-form-item label="处置状态:" prop="procedure">
                <el-select
                  v-model.trim="queryParams.procedure"
                  placeholder="请选择处置状态"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in disposalStatusOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="IP地址:" prop="detail_src_ip">
                <el-input
                  v-model.trim="queryParams.detail_src_ip"
                  placeholder="请输入IP地址"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="协议:" prop="ev_com_socket_protocol">
                <el-input
                  v-model.trim="queryParams.ev_com_socket_protocol"
                  placeholder="请输入协议"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发生时间:" prop="date">
                <el-date-picker
                  v-model.trim="queryParams.date"
                  size="small"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  :style="{ width: '100%' }"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  range-separator="至"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item size="mini">
                <el-button type="primary" @click="btnQuery">搜索</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
       <el-table :data="List" tooltip-effect="light">
      <el-table-column
        label="资产名称"
        align="center"
        prop="_source.event_name"
        :show-overflow-tooltip="true"
        min-width="15%"
      />
      <el-table-column
        label="IP地址"
        align="center"
        prop="_source.detail_src_ip"
        :show-overflow-tooltip="true"
        min-width="15%"
      />
      <el-table-column
        label="协议"
        align="center"
        prop="_source.ev_com_socket_protocol"
        :show-overflow-tooltip="true"
        min-width="15%"
      />
      <el-table-column
        label="端口"
        align="center"
        prop="_source.ev_com_socket_dst_port"
        :show-overflow-tooltip="true"
        min-width="15%"
      />
      <el-table-column
        label="事件等级"
        align="center"
        prop="severity"
        min-width="8%"
      >
        <template #default="scope">
          <span>{{ transTypeDic(scope.row._source.severity) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="处置状态"
        align="center"
        prop="_source.procedure"
        min-width="8%"
      />
      <el-table-column
        label="发生时间"
        align="center"
        prop="_source.occur_time"
        :show-overflow-tooltip="true"
        min-width="15%"
      />
      <el-table-column
        label="区域"
        align="center"
        prop="_source.location"
        :show-overflow-tooltip="true"
        min-width="15%"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="detail(scope.row._source)"
            >详情</el-button
          >
          &nbsp;&nbsp; &nbsp;&nbsp;
          <el-dropdown @command="batchOperate">
            <el-button size="mini" type="text">
              状态变更<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'处置')">处置</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'不处置')">不处置</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'误报')">误报</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
   
    <pagination
      v-show="total > 0"
      :page.sync="from"
      :limit.sync="query.size"
      :total="total"
      @pagination="getTableList"
    />
    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <div class="contentBox">
          <el-form ref="form" label-width="100px" label-position="left" class="label-type">
        <el-row>
          <el-col :span="8">
            <el-form-item label="IP地址 :">
              {{ detailData.detail_src_ip }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产类型 :">
              {{ detailData.event_format }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件等级 :">
              {{ detailData.severity }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="协议 :">
              {{ detailData.ev_com_socket_protocol }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="端口 :">
              {{ detailData.ev_com_socket_dst_port }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处置状态 :">
              {{ detailData.procedure }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发现时间 :">
              {{ detailData.ev_com_event_observe_time | moment }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产名称 :">
              {{ detailData.event_name }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产价值 :">
              {{ detailData.assetValue }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="责任人 :">
              {{ detailData.personLiable }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门 :">
              {{ detailData.departmen }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域 :">
              {{ detailData.location }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      </div>
     
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" type="primary" @click="submitForm"
            >确 认</el-button
          >
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
     <!-- 新增通报对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="addDialog"
      width="500px"
      append-to-body
    >
      <div class="contentBox">
        <el-form
          ref="formData"
          :model="formData"
          :rules="rules"
          label-width="80px"
          class="label-type"
        >
          <el-form-item
            label="通报名称:"
            prop="notificationName"
          >
            <el-input
              v-model.trim="formData.notificationName"
              placeholder=""
            />
          </el-form-item>
          <el-form-item
            label="事件类型:"
            prop="eventType"
          >
            <el-select
              v-model.trim="formData.eventType"
              placeholder=""
              filterable
              clearable
              :style="{width: '100%'}"
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
          <el-form-item
            label="事件名称:"
            prop="eventName"
          >
            <el-input
              v-model.trim="formData.eventName"
              placeholder=""
            />
          </el-form-item>
          <el-form-item
            label="优先级:"
            prop="priority"
          >
            <el-select
              v-model.trim="formData.priority"
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
          <el-form-item
            label="备注:"
            prop="remark"
          >
            <el-input
              v-model.trim="formData.remark"
              placeholder=""
              type="textarea"
            />
          </el-form-item>
          <el-form-item
            label="上报:"
            prop="report"
          >
            <el-select
              v-model.trim="formData.report"
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
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-row
            type="flex"
            justify="center"
          >
            <el-button
              type="primary"
              @click="saveForm"
            >保 存</el-button>
            <el-button @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import { stateChanges,notificationExport,putInStorage} from "@/api/system/list";
import { getWeakPasswordData } from "@/utils/request";

export default {
  components: {},
  props: [],
  data() {
    return {
      from: 1,
      loading: false,
      name: "测试",
      detailData: {},
      // 分组表格数据
      groupList: [],
      // 分组表格数据
      List: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      addDialog: false,
      // 总条数
      currentPage: 1, // 初始页
      pagesize: 10, // 每页的数据
      total: 0, // 总条数
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
      newArry: [], // 循环数据
      // 查询参数
      queryParams: {
        event_name: "",
        location: "",
        severity: "",
        procedure: "",
        detail_src_ip: "",
        ev_com_socket_protocol: "",
        date: [],
      },
      formData:{
        notificationName:"",
        eventType:"",
        eventName:"",
        priority:"",
        remark:"",
        report:"是",
        id:"",
        index:"",
        type:""
      },
      rules: {
        name: [],
        level: [],
        type: [],
        area: [],
        detail_src_ip: [],
        ip: [],
        newip: [],
        equipment: [],
        date: [],
        procedure: [],
      },
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
      eventTypeOptions: [{
        'label': '僵木蠕事件',
        'value': '僵木蠕事件'
      }, {
        'label': '弱口令事件',
        'value': '弱口令事件'
      }, {
        'label': '漏洞事件',
        'value': '漏洞事件'
      }, {
        'label': '主机安全事件',
        'value': '主机安全事件'
      }, {
        'label': '配置核查事件',
        'value': '配置核查事件'
      }, {
        'label': '异常行为事件',
        'value': '异常行为事件'
      }, {
        'label': '威胁情报事件',
        'value': '威胁情报事件'
      }, {
        'label': '入侵诱捕事件',
        'value': '入侵诱捕事件'
      }, {
        'label': '数据安全事件',
        'value': '数据安全事件'
      }, {
        'label': '工业网络审计事件',
        'value': '工业网络审计事件'
      }],
      areaOptions: [
        {
          label: "新疆八一钢筋厂",
          value: "新疆八一钢筋厂",
        },
        {
          label: "青岛石油化工厂",
          value: "青岛石油化工厂",
        },
        {
          label: "浙江联顺预制厂",
          value: "浙江联顺预制厂",
        },
        {
          label: "重庆预制厂",
          value: "重庆预制厂",
        },
        {
          label: "安徽天恩砂石厂",
          value: "安徽天恩砂石厂",
        },
         {
          label: "青岛混凝土厂",
          value: "青岛混凝土厂",
        },
        {
          label: "三亚海投轨交",
          value: "三亚海投轨交",
        },
        {
          label: "山西三通燃气厂",
          value: "山西三通燃气厂",
        },
        {
          label: "松通高速预制厂",
          value: "松通高速预制厂",
        },
        {
          label: "北京城乡水厂",
          value: "北京城乡水厂",
        },
       
        {
          label: "深中通道预制厂",
          value: "深中通道预制厂",
        },
        {
          label: "广州地铁钢筋厂",
          value: "广州地铁钢筋厂",
        },
        {
          label: "乌尉高速制梁厂",
          value: "乌尉高速制梁厂",
        },
        {
          label: "玉湛高速制梁厂",
          value: "玉湛高速制梁厂",
        },
        {
          label: "天津管片厂",
          value: "天津管片厂",
        }
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
      killle: [
        {
          label: "侦察跟踪",
          value: 1,
        },
        {
          label: "武器构建",
          value: 2,
        },
        {
          label: "载荷投递",
          value: 2,
        },
        {
          label: "漏洞利用",
          value: 2,
        },
        {
          label: "安装植入",
          value: 2,
        },
        {
          label: "命令控制",
          value: 2,
        },
        {
          label: "目标达成",
          value: 2,
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
    async getTableList() {
      this.addQuery(this.query, "event_name", this.queryParams.event_name);

      this.addQuery(this.query, "location", this.queryParams.location);

      this.addQuery(this.query, "severity", this.queryParams.severity);

      this.addQuery(this.query, "procedure", this.queryParams.procedure);

      this.addQuery(
        this.query,
        "detail_src_ip",
        this.queryParams.detail_src_ip
      );

      this.addQuery(
        this.query,
        "ev_com_socket_protocol",
        this.queryParams.ev_com_socket_protocol
      );

      this.query.from = this.from - 1;
      if (this.queryParams.date.length > 0) {
        this.query.query.bool.must.push({
          range: {
            occur_time: {
              gte: this.queryParams.date[0],
              lte: this.queryParams.date[1],
            },
          },
        });
      }
      getWeakPasswordData(this.query).then((res) => {
        this.query.query.bool.must = [];
        this.groupList = [];
        this.total = res.data.hits.total;
        this.List = res.data.hits.hits;
      });
    },
    transType(val) {
      var t = [
        {
          label: "模型告警事件",
          value: "ksec_syslog_model_eve",
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
          name: "1",
          content: "极低",
        },
        {
          name: "2",
          content: "低危",
        },
        {
          name: "3",
          content: "中危",
        },
        {
          name: "4",
          content: "高危",
        },
        {
          name: "5",
          content: "致命",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      console.log(orgTreeData1);
      return `${orgTreeData1[0].content}`;
    },
    beforeHandleCommand(id, index,command){
      // console.log(id,index,command)
        return {
            'id': id,
            'index': index,
            'command':command
          }
    },
    batchOperate(command) {
      // console.log('command',command)
      // console.log('_id',id)
      //  console.log('_index',index)
      let message = "";
      switch (command.command) {
        case '处置':
          message = "是否确认变更处置状态？";
          this.openMessageBox(message,command.id,command.index,command.command);
          break;
        case "不处置":
          message = "是否确认将此事件处置状态修改为不处置？";
          this.unProcessBox(message,command.id,command.index,command.command);
          break;
        case "误报":
          message = "是否确认将此事件处置状态修改为误报？";
          this.falseReportBox(message,command.id,command.index,command.command);
          break;
      }
    },
    async openMessageBox(message,id,index,command) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.addDialog = true
           this.title = '新增通报'
           this.formData.id = id
           this.formData.index = index
          // this.$message({
          //   type: "success",
          //   message: "修改成功!",
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改！",
          });
        });
    },
    async unProcessBox(message,id,index,command) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
           stateChanges({
           id:id,
           index:index,
           type:command
         })
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
           this.getTableList();
         }) 
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改！",
          });
        });
    },
    async falseReportBox(message,id,index,command) {
      console.log('参数：',id,index,command)
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log('接口')
         stateChanges({
           id:id,
           index:index,
           type:command
         })
        .then((response) => {
         this.$message({
            type: "success",
            message: "修改成功!",
          }); 
          this.getTableList();  
       }) 
       
        })
        .catch(() => {
           console.log('cancel')
          this.$message({
            type: "info",
            message: "已取消修改！",
          });
        });
    },
    submitdata() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    btnQuery() {
      this.getTableList();
    },
    resetForm() {
      this.queryParams = {
        event_name: "",
        location: "",
        severity: "",
        procedure: "",
        detail_src_ip: "",
        ev_com_socket_protocol: "",
        date: [],
      };
      this.getTableList();
    },
    async detail(row) {
      // const { data } = await WeakPasswordDetail(id)
      this.detailData = row;
      this.open = true;
      this.title = "事件详情";
      this.detailData.severity = this.transTypeDic(this.detailData.severity);
      this.detailData.event_format = this.transType(
        this.detailData.event_format
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.addDialog = false;
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false;
    },
    async saveForm(){
       this.addDialog = false;
       if(this.formData.report == '是'){
          this.formData.type = '已处置'
          this.formData.notificationStatus = '已通报'
       }else{
         this.formData.type = '处置中'
         this.formData.notificationStatus = '未通报'
       }
      console.log('this.formData',this.formData)
      // ES状态变更
      await stateChanges({
           id:this.formData.id,
           index:this.formData.index,
           type:this.formData.type
         })
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });  
              //入库
        putInStorage(this.formData)
        .then((response) => {
          this.$message({
            type: "success",
            message: "入库成功!",
          });  
          if(this.formData.report == '是'){
               // 上报 
            notificationExport({
              id:this.formData.id,
              index:this.formData.index,
            })
          .then((response) => {
            this.$message({
              type: "success",
              message: "上报成功!",
           });  
           this.getTableList();
           }) 
          }else{
             this.getTableList();
          } 
         }) 
         })     
    }
  },
};
</script>
<style lang="scss" scoped>
.box-card{
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
