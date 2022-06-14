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
            label-width="90px"
            class="label-type"
            label-position="right"
          >
            <el-col :span="6">
              <el-form-item label="事件名称：" prop="name">
                <el-input
                  v-model.trim="queryParams.event_name"
                  placeholder="请输入事件名称"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="事件等级：" prop="severity">
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
              <el-form-item label="事件类型：" prop="event_class">
                <el-select
                  v-model.trim="queryParams.event_class"
                  placeholder="请选择事件类型"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in eventOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域：" prop="location">
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
              <el-form-item label="协议：" prop="detail_protocol">
                <el-input
                  v-model.trim="queryParams.detail_protocol"
                  placeholder="请输入协议"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="源IP：" prop="ip">
                <el-input
                  v-model.trim="queryParams.detail_src_ip"
                  placeholder="请输入源IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="目的IP：" prop="newip">
                <el-input
                  v-model.trim="queryParams.detail_dst_ip"
                  placeholder="请输入目标IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上报设备：" prop="agent">
                <el-input
                  v-model.trim="queryParams.agent"
                  placeholder="请输入上报设备"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开始时间：" prop="date">
                <el-date-picker
                  v-model.trim="queryParams.date"
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
            <el-col :span="6">
              <el-form-item label="处置状态：" prop="procedure">
                <el-select
                  v-model.trim="queryParams.procedure"
                  placeholder="请选择处置状态"
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
            <el-col :span="12">
              <el-form-item size="mini" label-width="500px">
                <el-button type="primary" @click="btnQuery">搜索</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
       <el-table v-loading="loading" :data="List" tooltip-effect="light">
      <!-- <el-table-column
        type="selection"
        width="55"
        align="center"
      /> -->
      <el-table-column
        label="事件名称"
        align="center"
        prop="_source.event_name"
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
        prop="_source.detail_dst_ip"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="协议"
        align="center"
        prop="_source.detail_protocol"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="事件等级" align="center" prop="_source.severity">
        <template #default="scope">
          <span
            v-if="
              scope.row._source.severity == '' ||
              scope.row._source.severity == null
            "
          />
          <span v-else>{{ transTypeDic(scope.row._source.severity) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="事件类型"
        align="center"
        prop="_source.event_class"
      >
        <template #default="scope">
          <span
            v-if="
              scope.row._source.event_class == '' ||
              scope.row._source.event_class == null
            "
          />
          <span v-else>{{ transClassDic(scope.row._source.event_class) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="处置状态"
        align="center"
        prop="_source.procedure"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="事件开始时间"
        align="center"
        prop="_source.occur_time"
        :show-overflow-tooltip="true"
      />
      <!-- <el-table-column
        label="事件结束时间"
        align="center"
        prop="_source.close_time"
        :show-overflow-tooltip="true"
      /> -->
      <el-table-column
        label="区域"
        align="center"
        prop="_source.location"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="上报设备"
        align="center"
        prop="_source.agent"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="detail(scope.row._source)"
            >详情</el-button
          >
          &nbsp; &nbsp; &nbsp; &nbsp;
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
    </el-card>
   

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="from"
      :limit.sync="query.size"
      @pagination="getTableList"
    />
    <!-- 详情分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" label-width="90px" label-position="left" class="label-type">
        <el-row>
          <el-col :span="8">
            <el-form-item label="事件名称 :">
              <tooltip :content="dataDetail.event_name" :length="20" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件类型 :">
              <tooltip :content="dataDetail.event_class" :length="20" />
              <!-- {{ dataDetail.event_class }} -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件等级 :">
              <tooltip :content="dataDetail.severity" :length="20" />
              <!-- {{ dataDetail.severity }} -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件描述 :">
              {{ "-" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="源IP :">
              <tooltip :content="dataDetail.detail_src_ip" :length="20" />
              <!-- {{ dataDetail.detail_src_ip }} -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目的IP :">
              <tooltip :content="dataDetail.detail_dst_ip" :length="20" />
              <!-- {{ dataDetail.detail_dst_ip }} -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="协议 :">
              <tooltip :content="dataDetail.detail_protocol" :length="20" />
              <!-- {{ dataDetail.detail_protocol }} -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上报设备 :">
              <tooltip :content="dataDetail.agent" :length="20" />
              <!-- {{ dataDetail.agent }} -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上报设备IP :">
              {{ "-" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="攻击阶段 :">
              {{ "-" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域 :">
              <tooltip :content="dataDetail.location" :length="20" />
              <!-- {{ dataDetail.location }} -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处置状态 :">
              <tooltip :content="dataDetail.procedure" :length="20" />
              <!-- {{ dataDetail.procedure }} -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始时间 :">
              <tooltip :content="dataDetail.occur_time" :length="20" />
              <!-- {{ dataDetail.occur_time }} -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间 :">
              <tooltip :content="dataDetail.close_time" :length="20" />
              <!-- {{ dataDetail.close_time }} -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
import { eventList,stateChanges,notificationExport,putInStorage} from "@/api/system/list";
import { getManagementThreatEventsData } from "@/utils/request";
export default {
  components: {},
  props: [],
  data() {
    return {
      from: 1,
      loading: false,
      name: "测试",
      dataDetail: {},
      // 分组表格数据
      groupList: [],
      List: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      addDialog: false,
      // 总条数
      total: 6,
      // 查询参数
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
      queryParams: {
        location: "",
        severity: "",
        event_class: "",
        procedure: "",
        detail_src_ip: "",
        event_name: "",

        detail_protocol: "",
        detail_dst_ip: "",
        agent: "",
        date: [],
      },
      formData:{
        notificationName:"",
        eventType:"",
        eventName:"",
        priority:"",
        remark:"",
        report:"是",
        eventId:"",
        eventIndex:"",
        type:"",
        notificationStatus:""
      },
      rules: {
        name: [],
        severity: [],
        type: [],
        area: [],
        detail_protocol: [],
        ip: [],
        newip: [],
        agent: [],
        date: [],
        procedure: [],
      },
      levelOptions: [
        {
          label: "极低",
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
          label: "致命",
          value: 5,
        },
      ],
      eventOptions: [
        {
          value: "class_ivtp",
          label: "入侵诱捕事件",
        },
        {
          value: "class_abbm",
          label: "异常行为管理",
        },
        {
          value: "class_ztwe",
          label: "僵木蠕事件",
        },
        {
          value: "class_iocm",
          label: "威胁情报管理",
        },
        {
          value: "class_wkpw",
          label: "弱口令事件",
        },
        {
          value: "class_inpa",
          label: "工业网络审计",
        },
        {
          value: "class_hsme",
          label: "主机安全管理",
        },
        {
          value: "class_scce",
          label: "配置核查管理",
        },
        {
          value: "class_dsme",
          label: "数据安全管理",
        },
        {
          value: "class_infe",
          label: "工业防火墙事件",
        },
        {
          value: "class_wppe",
          label: "网页防篡改事件",
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
    };
  },
  created() {
    // this.getCategoryList()
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
      this.addQuery(this.query, "location", this.queryParams.location);

      this.addQuery(this.query, "severity", this.queryParams.severity);

      this.addQuery(this.query, "event_class", this.queryParams.event_class);

      this.addQuery(this.query, "procedure", this.queryParams.procedure);

      this.addQuery(
        this.query,
        "detail_src_ip",
        this.queryParams.detail_src_ip
      );

      this.addQuery(this.query, "event_name", this.queryParams.event_name);

      this.addQuery(
        this.query,
        "detail_protocol",
        this.queryParams.detail_protocol
      );

      this.addQuery(
        this.query,
        "detail_dst_ip",
        this.queryParams.detail_dst_ip
      );

      this.addQuery(this.query, "agent", this.queryParams.agent);

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
      getManagementThreatEventsData(this.query).then((res) => {
        this.query.query.bool.must = [];
        this.groupList = [];
        this.total = res.data.hits.total;
        this.List = res.data.hits.hits;
      });
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
    // async getCategoryList() {
    //   this.loading = true
    //   const res = await eventList(this.queryParams)
    //   this.groupList = res.rows
    //   this.total = res.total
    //   this.loading = false
    // },
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
            eventId: "",
            eventIndex: "",
            type: "",
            notificationStatus:""
          };
           this.title = '新增通报'
           this.formData.eventId = id
           this.formData.eventIndex = index
           this.formData.eventName = event_name
           this.formData.eventType = this.transClassDic(event_class)
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
    /** 查询分组列表 */
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
      (this.queryParams = {
        event_name: "",
        severity: "",
        event_class: "",
        location: "",
        detail_protocol: "",
        detail_src_ip: "",
        detail_dst_ip: "",
        agent: "",
        procedure: "",
        date: [],
      }),
        // this.getCategoryList()
        this.getTableList();
    },
    detail(row) {
      this.dataDetail = row;
      this.open = true;
      this.title = "事件详情";
      this.dataDetail.severity = this.transTypeDic(this.dataDetail.severity)
      this.dataDetail.event_class = this.transClassDic(this.dataDetail.event_class)
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.addDialog = false
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false;
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
            id: this.formData.eventId,
            index: this.formData.eventIndex,
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
            id: this.formData.eventId,
            index: this.formData.eventIndex,
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
.box-card{
  margin-bottom: 20px;
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
