<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form
            ref="queryForm"
            :model="queryParams"
            size="mini"
            label-width="125px"
            class="label-type"
            label-position="right"
          >
            <el-col :span="6">
              <el-form-item label="防护主机：" prop="evQaxWppeDevicename">
                <el-input
                  v-model="queryParams.evQaxWppeDevicename"
                  placeholder="请输入防护主机"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="拦截动作：" prop="evQaxWppeAttack">
                <el-select
                  v-model="queryParams.evQaxWppeAttack"
                  placeholder="请选择拦截动作"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in interceptOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Web名称：" prop="userName">
                <el-input
                  v-model="queryParams.detail_dst_ip"
                  placeholder="请输入Web名称"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="拦截的文件名称："
                prop="ev_wsec_infe_application_layer_protocol"
              >
                <el-input
                  v-model="queryParams.ev_wsec_infe_application_layer_protocol"
                  placeholder="请输入拦截的文件名称"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="处置状态：" prop="disposalStatus">
                <el-select
                  v-model="queryParams.disposalStatus"
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
              <el-form-item label-width="1360px">
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
      <el-table :data="groupList" tooltip-effect="light">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->

        <el-table-column
          label="防护主机"
          align="center"
          prop="evQaxWppeDevicename"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="拦截动作"
          align="center"
          prop="evQaxWppeAttack"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="Web名称"
          align="center"
          prop="evQaxWppeWebname"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="发生时间"
          align="center"
          prop="occurTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="事件等级"
          align="center"
          prop="severity"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <span>{{ transTypeDic(scope.row.severity) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="拦截的文件名称"
          align="center"
          prop="evQaxWppeFile"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="处置状态"
          align="center"
          prop="disposalStatus"
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
          width="180"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="detail(scope.row.id)"
              >详情</el-button
            >
            &nbsp;&nbsp; &nbsp;&nbsp;
            <!-- 误报 -->
            <el-dropdown
              @command="batchOperate"
              v-if="scope.row.disposalStatus == '误报'"
            >
              <el-button size="mini" type="text">
                状态变更<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="
                    beforeHandleCommand(
                      scope.row.id,
                      '处置',
                      scope.row.evQaxWppeDevicename
                    )
                  "
                  >处置</el-dropdown-item
                >
                <el-dropdown-item
                  :command="
                    beforeHandleCommand(scope.row.id, '不处置')
                  "
                  >不处置</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>

            <!-- 不处置 -->
            <el-dropdown
              @command="batchOperate"
              v-else-if="scope.row.disposalStatus == '不处置'"
            >
              <el-button size="mini" type="text">
                状态变更<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="
                    beforeHandleCommand(
                      scope.row.id,
                      '处置',
                      scope.row.evQaxWppeDevicename
                    )
                  "
                  >处置</el-dropdown-item
                >
                <el-dropdown-item
                  :command="
                    beforeHandleCommand(scope.row.id, '误报')
                  "
                  >误报</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>

            <!-- 已处置、处置中 -->
            <el-dropdown
              @command="batchOperate"
              v-else-if="
                scope.row.disposalStatus == '已处置' ||
                scope.row.disposalStatus == '处置中'
              "
            >
              <el-button size="mini" type="text">
                状态变更<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="
                    beforeHandleCommand(scope.row.id, '不处置')
                  "
                  >不处置</el-dropdown-item
                >
                <el-dropdown-item
                  :command="
                    beforeHandleCommand(scope.row.id, '误报')
                  "
                  >误报</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>

            <!-- 待处置 -->
            <el-dropdown @command="batchOperate" v-else>
              <el-button size="mini" type="text">
                状态变更<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="
                    beforeHandleCommand(
                      scope.row.id,
                      '处置',
                      scope.row.evQaxWppeDevicename
                    )
                  "
                  >处置</el-dropdown-item
                >
                <el-dropdown-item
                  :command="
                    beforeHandleCommand(scope.row.id, '不处置')
                  "
                  >不处置</el-dropdown-item
                >
                <el-dropdown-item
                  :command="
                    beforeHandleCommand(scope.row.id, '误报')
                  "
                  >误报</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
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
              <el-form-item label="防护主机：" prop="ev_com_socket_src_port">
                <tooltip
                  :content="detailData.ev_com_socket_src_port"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拦截动作：">
                <tooltip
                  :content="detailData.ev_com_link_src_mac"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Web名称：" prop="aimIp">
                <tooltip :content="detailData.detail_dst_ip" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拦截的文件名称：" prop="ev_qax_wppe_file">
                <tooltip
                  :content="detailData.ev_qax_wppe_file"
                  :length="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件等级：" prop="level">
                <tooltip :content="detailData.severity" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发生时间：" prop="occurTime">
                <tooltip :content="detailData.occurTime" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处置状态：" prop="disposalStatus">
                <tooltip :content="detailData.disposalStatus" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="区域：" prop="location">
                <tooltip :content="detailData.location" :length="20" />
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
          :rules="rules"
          :model="formData"
          label-width="90px"
          class="label-type"
        >
          <el-form-item label="通报名称:" prop="notificationName" :rules="[{ required: true, message: '请输入通报名称' }]">
            <el-input v-model.trim="formData.notificationName" placeholder="" />
          </el-form-item>
          <el-form-item label="事件类型:" prop="eventType">
            <el-input
              v-model.trim="formData.eventType"
              placeholder=""
              disabled
            />
          </el-form-item>
          <el-form-item label="事件名称:" prop="eventName">
            <el-input v-model.trim="formData.eventName" placeholder="" disabled />
          </el-form-item>
          <el-form-item label="优先级:" prop="priority"  :rules="[{ required: true, message: '请选择优先级' }]">
            <el-select
              v-model.trim="formData.priority"
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
          <el-form-item label="备注:" prop="remark">
            <el-input
              v-model.trim="formData.remark"
              placeholder=""
              type="textarea"
            />
          </el-form-item>
          <el-form-item label="上报:" prop="report">
            <el-select
              v-model.trim="formData.report"
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
            <el-button type="primary" @click="saveForm">保 存</el-button>
            <el-button @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  pageTamperProofEventList,
  pageTamperProofEventDeatil,
} from "@/api/system/list";
import { getFirewallAccessControlEventData } from "@/utils/request";
import {
  pageTamperProofEventStateChanges,
  pageTamperProofEventExport,
  putInStorage,
} from "@/api/system/list";
export default {
  name: "Online",
  data() {
    return {
      rangeTime: undefined,
      from: 1,
      title: "",
      detailData: {},
      detailDialog: false,
      // 遮罩层
      loading: false,
      addDialog: false,
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
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        evQaxWppeDevicename:"",
        evQaxWppeAttack:"",
        ev_wsec_infe_application_layer_protocol:"",
        disposalStatus:"",
        location:"",
        severity:"",
        beginHappenTime: "",
        endHappenTime: "",
      },
      formData: {
        notificationName: "",
        eventType: "",
        eventName: "",
        priority: "",
        remark: "",
        report: "是",
        eventId: "",
        eventIndex: "pageTamperProofEvent",
        type: "",
        notificationStatus: "",
      },
      rules:{},
      interceptOptions: [
        {
          label: "增加",
          value: "增加",
        },
        {
          label: "删除",
          value: "删除",
        },
        {
          label: "修改",
          value: "修改",
        },
      ],
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
          label: "是",
          value: "是",
        },
        {
          label: "否",
          value: "否",
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
          label: "不处置",
          value: "不处置",
        },
        {
          label: "误报",
          value: "误报",
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

  created() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      this.loading = true;
      const res = await pageTamperProofEventList(this.queryParams);
      this.groupList = res.rows;
      this.total = res.total;
      this.loading = false;
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
    setTimeList(values) {
      const [projectDevelopDate, projectEndDate] = [...values];
      this.queryParams.beginHappenTime = projectDevelopDate;
      this.queryParams.endHappenTime = projectEndDate;
    },
   beforeHandleCommand(id, command, evQaxWppeDevicename) {
      // console.log('evQaxWppeDevicename',evQaxWppeDevicename)
      return {
        id: id,
        command: command,
        evQaxWppeDevicename: evQaxWppeDevicename,
      };
    },
    batchOperate(command) {
      // console.log('command',command)
      // console.log('_id',id)
      let message = "";
      switch (command.command) {
        case "处置":
          message = "是否确认变更处置状态？";
          this.openMessageBox(
            message,
            command.id,
            command.command,
            command.evQaxWppeDevicename
          );
          break;
        case "不处置":
          message = "是否确认将此事件处置状态修改为不处置？";
          this.unProcessBox(message, command.id, command.command);
          break;
        case "误报":
          message = "是否确认将此事件处置状态修改为误报？";
          this.falseReportBox(message, command.id, command.command);
          break;
      }
    },
    async openMessageBox(message, id, command, evQaxWppeDevicename) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.addDialog = true;
          this.formData = {
            notificationName: "",
            eventType: "",
            eventName: "",
            priority: "",
            remark: "",
            report: "是",
            eventId: "",
            eventIndex: "vulnerability",
            type: "",
            notificationStatus: "",
          };
          this.title = "新增通报";
          this.formData.eventId = id;
          this.formData.eventName = evQaxWppeDevicename;
          this.formData.eventType = "网页防篡改事件";
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
    async unProcessBox(message, id, command) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          pageTamperProofEventStateChanges({
            id: id,
            type: command,
          }).then((response) => {
            this.$message({
              type: "success",
              message: '处置状态已修改为"不处置"',
            });
            setTimeout(() => {
              this.getTableList();
            }, 500);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改！",
          });
        });
    },
    async falseReportBox(message, id, command) {
      console.log("参数：", id, command);
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("接口");
          pageTamperProofEventStateChanges({
            id: id,
            type: command,
          }).then((response) => {
            this.$message({
              type: "success",
              message: '处置状态已修改为"误报"',
            });
            setTimeout(() => {
              this.getTableList();
            }, 500);
          });
        })
        .catch(() => {
          console.log("cancel");
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
        pageNum: 1,
        pageSize: 10,
        evQaxWppeDevicename:"",
        evQaxWppeAttack:"",
        ev_wsec_infe_application_layer_protocol:"",
        disposalStatus:"",
        location:"",
        severity:"",
        beginHappenTime: "",
        endHappenTime: "",
      };
      this.rangeTime = [];
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
    async detail(id) {
      const { data } = await pageTamperProofEventDeatil(id);
      this.detailData = data;
      this.detailDialog = true;
      this.title = "事件详情";
      this.detailData.severity = this.transTypeDic(this.detailData.severity);
      this.detailData.event_format = this.transType(
        this.detailData.event_format
      );
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
          await pageTamperProofEventStateChanges({
            id: this.formData.eventId,
            type: this.formData.type,
          }).then((response) => {
            // this.$message({
            //   type: "success",
            //   message: "修改成功!",
            // });
            //入库
            putInStorage(this.formData).then((response) => {
              // this.$message({
              //   type: "success",
              //   message: "入库成功!",
              // });
              if (this.formData.report == "是") {
                // 上报
                pageTamperProofEventExport({
                  id: this.formData.eventId,
                }).then((response) => {
                  this.$message({
                    type: "success",
                    message: '处置状态已修改为"已处置"',
                  });
                  setTimeout(() => {
                    this.getTableList();
                  }, 500);
                });
              } else {
                this.$message({
                  type: "success",
                  message: '处置状态已修改为"处置中"',
                });
                setTimeout(() => {
                  this.getTableList();
                }, 500);
              }
            });
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
  height: 30vh;
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
