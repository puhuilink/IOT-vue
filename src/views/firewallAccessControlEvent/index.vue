<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form
            ref="queryForm"
            :model="queryParams"
            size="mini"
            label-width="100px"
            class="label-type"
            label-position="right"
          >
            <el-col :span="6">
              <el-form-item label="源IP地址：" prop="detail_src_ip">
                <el-input
                  v-model="queryParams.detail_src_ip"
                  placeholder="请输入源IP地址"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="目的IP地址：" prop="detail_dst_ip">
                <el-input
                  v-model="queryParams.detail_dst_ip"
                  placeholder="请输入目的IP地址"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域：" prop="location">
                <el-select
                  v-model="queryParams.location"
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
              <el-form-item
                label="应用层协议："
                prop="ev_wsec_infe_application_layer_protocol"
              >
                <el-input
                  v-model="queryParams.ev_wsec_infe_application_layer_protocol"
                  placeholder="请输入应用层协议"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="处置状态：" prop="procedure">
                <el-select
                  v-model="queryParams.procedure"
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
              <el-form-item label="事件等级：" prop="severity">
                <el-select
                  v-model="queryParams.severity"
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
              <el-form-item label="事件类型：" prop="event_format">
                <!-- <el-input
                  v-model="queryParams.event_format"
                  placeholder="请输入事件类型"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                /> -->
                <el-select
                  v-model.trim="queryParams.event_format"
                  placeholder="请选择事件类型"
                  filterable
                  clearable
                 :style="{width: '100%'}"
            >
              <el-option
                v-for="(item, index) in eventFormatOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发生时间：" prop="date">
                <el-date-picker
                  v-model="queryParams.date"
                  size="small"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  range-separator="至"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label-width="1330px">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleQuery"
                  >搜索</el-button
                >
                <el-button
                  size="mini"
                  @click="resetQuery"
                  >重置</el-button
                >
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
          label="发生时间"
          align="center"
          prop="_source.occur_time"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="源IP"
          align="center"
          prop="_source.detail_src_ip"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="目的IP"
          align="center"
          prop="_source.ev_com_socket_dst_ip"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="安全设备IP"
          align="center"
          prop="_source.ev_wsec_infe_security_dev_ip"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="传输层协议"
          align="center"
          prop="_source.ev_wsec_infe_transport_layer_protocol"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span>{{
              transTransportProtocol(
                scope.row._source.ev_wsec_infe_transport_layer_protocol
              )
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="应用层协议"
          align="center"
          prop="_source.ev_wsec_infe_application_layer_protocol"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件等级"
          align="center"
          prop="_source.severity"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span>{{ transTypeDic(scope.row._source.severity) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="事件类型"
          align="center"
          prop="_source.event_format"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span>{{ transType(scope.row._source.event_format) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="处置状态"
          align="center"
          prop="_source.procedure"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="区域"
          align="center"
          prop="_source.location"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          width="180"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="detail(row._source)"
              >详情</el-button
            >
            &nbsp;&nbsp; &nbsp;&nbsp;
             <!-- 误报 -->
          <el-dropdown @command="batchOperate" v-if="scope.row._source.procedure == '误报'">
            <el-button size="mini" type="text">
              状态变更<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'处置',scope.row._source.event_name,scope.row._source.event_class)">处置</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'不处置')">不处置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

         <!-- 不处置 -->
         <el-dropdown @command="batchOperate" v-else-if="scope.row._source.procedure == '不处置'">
            <el-button size="mini" type="text">
              状态变更<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'处置',scope.row._source.event_name,scope.row._source.event_class)">处置</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'误报')">误报</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

         <!-- 已处置、处置中 -->
          <el-dropdown @command="batchOperate"  v-else-if="
                scope.row._source.procedure == '已处置' ||
                scope.row._source.procedure == '处置中'
              ">
            <el-button size="mini" type="text">
              状态变更<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'不处置')">不处置</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'误报')">误报</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      
          <!-- 待处置 -->
          <el-dropdown @command="batchOperate" v-else>
            <el-button size="mini" type="text">
              状态变更<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'处置',scope.row._source.event_name,scope.row._source.event_class)">处置</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'不处置')">不处置</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.row._id, scope.row._index,'误报')">误报</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="from"
        :limit.sync="query.size"
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
      <div class="el-dialog-div">
        <el-row :gutter="25">
          <el-form
            ref="elForm"
            :model="detailData"
            size="mini"
            label-width="133px"
            class="label-type"
          >
            <el-col :span="12">
              <el-form-item label="源IP：" prop="detail_src_ip">
                <tooltip :content="detailData.detail_src_ip" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="源设备：">
                <tooltip
                  :content="detailData.ev_com_socket_src_hostname"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="源端口：" prop="ev_com_socket_src_port">
                <tooltip
                  :content="detailData.ev_com_socket_src_port"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="源MAC：">
                <tooltip
                  :content="detailData.ev_com_link_src_mac"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的IP：" prop="aimIp">
                <tooltip :content="detailData.detail_dst_ip" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的MAC：" prop="field106">
                <tooltip
                  :content="detailData.ev_com_link_dst_mac"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的设备：" prop="field107">
                <tooltip
                  :content="detailData.ev_com_socket_dst_hostname"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的端口：" prop="aimPort">
                <tooltip
                  :content="detailData.ev_com_socket_dst_port"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="传输层协议：" prop="transportProtocol">
                <tooltip
                  :content="detailData.ev_wsec_infe_transport_layer_protocol"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应用层协议：" prop="applyProtocol">
                <tooltip
                  :content="detailData.ev_wsec_infe_application_layer_protocol"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件级别：" prop="level">
                <tooltip :content="detailData.severity" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label=" 事件类型：" prop="type">
                <tooltip :content="detailData.event_format" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发生时间：" prop="happen">
                <tooltip :content="detailData.occur_time" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接收时间：" prop="receive_time">
                <tooltip :content="detailData.receive_time" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="防火墙名称：" prop="happen">
                <tooltip
                  :content="detailData.ev_wsec_infe_security_dev_name"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="防火墙IP：" prop="field115">
                <tooltip
                  :content="detailData.ev_wsec_infe_security_dev_ip"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日志描述：" prop="receive_time">
                <tooltip
                  :content="detailData.ev_wsec_event_comment"
                  :length="20"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="区域：" prop="location">
                <tooltip :content="detailData.location" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处置状态：" prop="procedure">
                <tooltip :content="detailData.procedure" :length="20" />
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="处理意见：" >
               <span>---</span>
                <!-- <tooltip :content="detailData.procedure" :length="20" /> -->
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="submitForm"
              >确 认</el-button
            >
            <el-button size="small" @click="cancel">取 消</el-button>
          </el-row>
        </div>
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
          label-width="90px"
          class="label-type"
        >
          <el-form-item
            label="通报名称:"
            prop="notificationName"
            :rules="[{ required: true, message: '请输入通报名称' }]"
          >
            <el-input
              v-model.trim="formData.notificationName"
              placeholder=""
            />
          </el-form-item>
          <!-- <el-form-item
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
          </el-form-item> -->
          <el-form-item label="事件类型:" prop="eventType">
            <el-input
              v-model.trim="formData.eventType"
              placeholder=""
              disabled
            />
          </el-form-item>
          <el-form-item
            label="事件名称:"
            prop="eventName"
          >
            <el-input
              v-model.trim="formData.eventName"
              placeholder=""
              disabled
            />
          </el-form-item>
          <el-form-item
            label="优先级:"
            prop="priority"
            :rules="[{ required: true, message: '请选择优先级' }]"
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
import { getFirewallAccessControlEventData } from "@/utils/request";
import { industryList,stateChanges,notificationExport,putInStorage } from "@/api/system/list";
export default {
  name: "Online",
  data() {
    return {
      from: 1,
      title: "",
      detailData: {},
      detailDialog: false,
      addDialog: false,
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
        sort: [{ occur_time: { order: "desc" } }],
        from: 0,
        size: 10,
      },
      // 分组表格数据
      groupList: [],
      List: [],
      pageNum: 1,
      pageSize: 10,
      // 查询参数
      queryParams: {
        detail_src_ip: "",
        detail_dst_ip: "",
        location: "",
        procedure: "",
        severity: "",
        ev_wsec_infe_application_layer_protocol: "",
        event_format: "",
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
        type:"",
        notificationStatus:""
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
       reportLevelOptions: [{
        'label': '低',
        'value': '低'
      }, {
        'label': '中',
        'value': '中'
      }, {
        'label': '高',
        'value': '高'
      }, {
        'label': '极高',
        'value': '极高'
      }],
      reportOptions: [{
        'label': '是',
        'value': '是'
      }, {
        'label': '否',
        'value': '否'
      }],
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
          label: "新疆八一钢筋厂",
          value: "新疆八一钢筋厂",
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
      eventFormatOptions:[ 
        {
          'value': "wsec_syslog_infe_ev_02",
          'label': "ACL告警事件",
        },
        {
          'value': "wsec_syslog_infe_ev_01",
          'label': "工业防火墙白名单",
        },
        {
          'value': "wsec_syslog_infe_ev_05",
          'label': "地址欺诈事件",
        },]
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
    //映射事件类型字段

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
      this.addQuery(
        this.query,
        "detail_src_ip",
        this.queryParams.detail_src_ip
      );

      this.addQuery(
        this.query,
        "detail_dst_ip",
        this.queryParams.detail_dst_ip
      );

      this.addQuery(this.query, "location", this.queryParams.location);

      this.addQuery(
        this.query,
        "ev_wsec_infe_application_layer_protocol",
        this.queryParams.ev_wsec_infe_application_layer_protocol
      );

      this.addQuery(this.query, "procedure", this.queryParams.procedure);

      this.addQuery(this.query, "severity", this.queryParams.severity);

      this.addQuery(this.query, "event_format", this.queryParams.event_format);

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

      getFirewallAccessControlEventData(this.query).then((res) => {
        this.query.query.bool.must = [];
        this.groupList = [];
        this.total = res.data.hits.total;
        this.List = res.data.hits.hits;
      });
      this.detailData.severity = this.transTypeDic(this.detailData.severity);
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
    transClassDic(val) {
      var t = [
        {
          name: "class_ivtp",
          content: "入侵诱捕事件",
        },
        {
          name: "class_abbm",
          content: "异常行为管理",
        },
        {
          name: "class_ztwe",
          content: "僵木蠕事件",
        },
        {
          name: "class_iocm",
          content: "威胁情报管理",
        },
        {
          name: "class_wkpw",
          content: "弱口令事件",
        },
        {
          name: "class_inpa",
          content: "工业网络审计",
        },
        {
          name: "class_hsme",
          content: "主机安全管理",
        },
        {
          name: "class_scce",
          content: "配置核查管理",
        },
        {
          name: "class_dsme",
          content: "数据安全管理",
        },
        {
          name: "class_infe",
          content: "工业防火墙事件",
        },
        {
          name: "class_wppe",
          content: "网页防篡改事件",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      return `${orgTreeData1[0].content}`;
    },
      beforeHandleCommand(id, index,command,event_name,event_class){
        return {
            id: id,
            index: index,
            command:command,
            event_name: event_name,
            event_class:event_class
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
         this.openMessageBox(message,command.id,command.index,command.command, command.event_name, command.event_class);
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
     async openMessageBox(message,id,index,command,event_name,event_class) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.addDialog = true
           this.formData = {
            notificationName: "",
            eventType: "",
            eventName: "",
            priority: "",
            remark: "",
            report: "是",
            id: "",
            index: "",
            type: "",
            notificationStatus:""
          };
           this.title = '新增通报'
           this.formData.id = id
           this.formData.index = index
         
           this.formData.eventType = this.transClassDic(event_class)
           this.formData.eventName = event_name
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
          // this.getTableList();
          this.$message({
            type: "success",
            message: "修改成功!",
          });
           setTimeout(() => {
              this.getTableList();
            }, 500);
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
        //  this.getTableList();  
         this.$message({
            type: "success",
            message: "修改成功!",
          }); 
           setTimeout(() => {
              this.getTableList();
            }, 500);
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
    /** 查询分组列表 */
    handleQuery() {
      this.getTableList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        detail_src_ip: "",
        detail_dst_ip: "",
        location: "",
        ev_wsec_infe_application_layer_protocol: "",
        procedure: "",
        severity: "",
        event_format: "",
        date: [],
      };
      this.getTableList();
    },
    // 取消按钮
    cancel() {
      this.detailDialog = false;
      this.addDialog = false;
    },
    /** 提交按钮 */
    submitForm() {
      this.detailDialog = false;
    },
    async detail(row) {
      // const { data } = await industrialNetworkAuditDetail(row)
      this.detailData = row;
      this.detailDialog = true;
      this.title = "事件详情";
      this.detailData.severity = this.transTypeDic(this.detailData.severity);
      this.detailData.event_format = this.transType(
        this.detailData.event_format
      );
      this.detailData.ev_wsec_infe_transport_layer_protocol = this.transTransportProtocol(this.detailData.ev_wsec_infe_transport_layer_protocol);
    },
   async putInStorageM() {
      //入库
      await putInStorage(this.formData).then((response) => {
        this.$message({
          type: "success",
          message: "入库成功!",
        });
        if (this.formData.report == "是") {
          // 上报
          notificationExport({
            id: this.formData.id,
            index: this.formData.index,
          }).then((response) => {
            // this.$message({
            //   type: "success",
            //   // message: "上报成功!",
            // });
            setTimeout(() => {
              this.getTableList();
            }, 500);
          });
        } else {
          setTimeout(() => {
            this.getTableList();
          }, 500);
        }
      });
    },
    async saveForm() {
      this.$refs["formData"].validate(async (valid) => {
        if (valid) {
          this.addDialog = false;
          if (this.formData.report == "是") {
            this.formData.type = "已处置";
            this.formData.notificationStatus = "已通报";
          } else {
            this.formData.type = "处置中";
            this.formData.notificationStatus = "未通报";
          }
          // ES状态变更
          await stateChanges({
            id: this.formData.id,
            index: this.formData.index,
            type: this.formData.type,
          }).then((response) => {
            // this.$message({
            //   type: "success",
            //   message: "修改成功!",
            // });
              setTimeout(() => {
                this.putInStorageM();
              }, 500);
          });
        }
      });
    },
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
  height: 56vh;
  overflow: auto;
  overflow-x: hidden;
  border-top: 1px solid #ccc;
  padding: 10px 20px;
}
.collapse-title {
  flex: 1 0 90%;
  order: 1;
}
</style>
