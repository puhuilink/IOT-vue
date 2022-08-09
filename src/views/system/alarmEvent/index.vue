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
              <el-form-item label="告警名称：" prop="alertName">
                <el-input
                  v-model="queryParams.alertName"
                  placeholder="请输入事件名称"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="终端IP：" prop="event_name">
                <el-input
                  v-model="queryParams.event_name"
                  placeholder="请输入终端IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="目的IP：" prop="event_name">
                <el-input
                  v-model="queryParams.event_name"
                  placeholder="请输入目的IP"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="告警等级:" prop="alertLevel">
                <el-select
                  v-model="queryParams.alertLevel"
                  placeholder="请选择告警等级"
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
              <el-form-item label="告警类型::" prop="ev_ksec_threatFlag">
                <el-select
                  v-model.trim="queryParams.ev_ksec_threatFlag"
                  placeholder="请选择告警类型:"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in threatFlagOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="处置状态:" prop="managementState">
                <el-select
                  v-model="queryParams.managementState"
                  placeholder="请选择处置状态"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in field114Options"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开始时间:" prop="date">
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
            <div class="setHeight">
              <el-col :span="6">
                <div class="btn">
                  <el-form-item size="mini">
                    <el-button type="primary" @click="btnQuery">搜索</el-button>
                    <el-button @click="resetForm">重置</el-button>
                  </el-form-item>
                </div>
              </el-col>
            </div>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-table :data="List" tooltip-effect="light">
      <el-table-column
        label="告警名称"
        align="center"
        prop="alertName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="告警等级"
        align="center"
        prop="alertLevel"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="设备SN号"
        align="center"
        prop="deviceSn"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="设备IP"
        align="center"
        prop="networkIp"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="设备类型"
        align="center"
        prop="deviceType"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="处置状态"
        align="center"
        prop="managementState"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="告警开始时间"
        align="center"
        prop="alertStartTime"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="告警结束时间"
        align="center"
        prop="alertEntTime"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="区域"
        align="center"
        prop="region"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="detail(scope.row.alertId)"
            >详情</el-button
          >
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
    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <div class="contentBox">
        <el-form
          ref="form"
          label-width="110px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="告警名称 :">
                <tooltip :content="detailData.alertName" :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="告警等级 :">
                {{ detailData.alertLevel }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备名称 :">
                {{ detailData.deviceName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备类型 :">
                {{ detailData.deviceType }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备IP :">
                {{ detailData.networkIp }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="区域 :">
                {{ detailData.region }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="告警开始时间 :">
                {{ detailData.alertStartTime }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="告警结束时间 :">
                {{ detailData.alertEntTime | moment }}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="处置状态 :">
                {{ detailData.managementState }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="告警描述 :">
                {{ detailData.alertDescribe }}
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
  </div>
</template>
<script>
import { alarmEventListDetail } from "@/api/system/detail";
import { getbaseJiangTableData } from "@/utils/request";
import { listAlarmEvent } from "@/api/system/device";
import { zombieList } from "@/api/system/list";
export default {
  name: "Index",
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
      List: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
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
        // deviceName:"",
        // deviceType:"",
        // status:"",
        // authorizationType:"",
        // versionNumber:"",
        // romVersionNumber:"",
        // networkAddress:"",
        // username:""
      },
      rules: {
        event_name: [],
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
      areaOptions: [
        {
          label: "三亚海投轨交",
          value: "三亚海投轨交",
        },
        {
          label: "北京城乡水厂",
          value: "北京城乡水厂",
        },
        {
          label: "山西三通燃气厂",
          value: "山西三通燃气厂",
        },
        {
          label: "深中通道预制厂",
          value: "深中通道预制厂",
        },
      ],
      threatFlagOptions: [
        {
          label: "僵尸网络",
          value: "Botnet",
        },
        {
          label: "网络木马",
          value: "Trojan",
        },
        {
          label: "恶意软件",
          value: "Malware",
        },
        {
          label: "恶意链接",
          value: "URL_malware",
        },
      ],
      field114Options: [
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
          label: "载荷投递",
          value: "载荷投递",
        },
        {
          label: "侦查跟踪",
          value: "侦查跟踪",
        },
        {
          label: "漏洞利用",
          value: "漏洞利用",
        },
        {
          label: "安装植入",
          value: "安装植入",
        },
        {
          label: "武器构建",
          value: "武器构建",
        },
        {
          label: "命令控制",
          value: "命令控制",
        },
        {
          label: "目标达成",
          value: "目标达成",
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
      this.loading = true;
      listAlarmEvent(this.queryParams).then((response) => {
        this.List = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    transType(val) {
      var t = [
        {
          label: "规则告警事件",
          value: "ksec_syslog_rule_eve",
        },
      ];
      const orgTreeData = t
        .filter((e) => e.value === val)
        .map(({ label }) => ({
          label,
        }));
      return `${orgTreeData[0].label}`;
    },
    translevelDic(val) {
      var t = [
        {
          label: "僵尸网络",
          value: "Botnet",
        },
        {
          label: "远控木马",
          value: "Trojan",
        },
        {
          label: "恶意软件",
          value: "Malware",
        },
        {
          label: "恶意链接",
          value: "URL_malware",
        },
        {
          label: "挖矿木马",
          value: "Mining",
        },
        {
          label: "勒索软件",
          value: "Ransomware",
        },
        {
          label: "间谍软件",
          value: "Spyware",
        },
        {
          label: "WEBSHELL",
          value: "Webshell",
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
      return `${orgTreeData1[0].content}`;
    },
    btnQuery() {
      this.getTableList();
    },
    async getList() {
      this.loading = true;
      const res = await zombieList(this.queryParams);
      this.groupList = res.rows;
      this.total = res.total;
      this.loading = false;
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
    submitdata() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      this.queryParams = {
        event_name: "",
        location: "",
        severity: "",
        procedure: "",
        ev_com_socket_dst_ip: "",
        ev_com_socket_src_ip: "",
        ev_ksec_killchainCN: "",
        ev_ksec_threatFlag: "",
        date: [],
      };
      this.getTableList();
    },
    async detail(id) {
      const { data } = await alarmEventListDetail(id);
      this.open = true;
      this.title = "事件详情";
      this.detailData = data;
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
<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
  position: relative;
  .setHeight {
    height: 120px;
    .btn {
      position: absolute;
      right: 10px;
    }
  }
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
