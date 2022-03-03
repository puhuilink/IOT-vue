<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="68px"
    >
      <el-col :span="6">
        <el-form-item label="资产类型" prop="level">
          <el-select
            v-model="formData.level"
            placeholder="请选择资产类型"
            filterable
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in assetTypes"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:user:add']"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="theHostBox">
          <div class="">
            <div class="el-icon-s-platform"></div>
            <div class="host">主机</div>
            <div class="operations">
              <div class="el-icon-view"></div>
              <div class="el-icon-edit-outline" @click="edit"></div>
              <div class="el-icon-delete" @click="handleForceLogout"></div>
            </div>
            <div class="wxy">wxy</div>
            <div class="numberOfDevices">设备数量</div>
            <div class="lastUpdated">最新更新时间</div>
            <div class="numberOfDevices">12台</div>
            <div class="lastUpdated">2022-01-07 08:00:00</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="theHostBox">
          <div class="">
            <div class="el-icon-s-fold"></div>
            <div class="server">服务器</div>
            <div class="operations">
              <div class="el-icon-view"></div>
              <div class="el-icon-edit-outline" @click="edit"></div>
              <div class="el-icon-delete" @click="handleForceLogout"></div>
            </div>
            <div class="wxy">wxy</div>
            <div class="numberOfDevices">设备数量</div>
            <div class="lastUpdated">最新更新时间</div>
            <div class="numberOfDevices">12台</div>
            <div class="lastUpdated">2022-01-07 08:00:00</div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="6">
        <el-card class="theServerBox">
          <div class="">
            <div class="server">服务器</div>
            <div class="AssetsNumber"></div>
          </div>
        </el-card>
      </el-col> -->
      <el-col :span="6">
        <el-card class="netsBrakeBox">
          <div class="">
            <div class="el-icon-s-platform"></div>
            <div class="host">网闸</div>
            <div class="operations">
              <div class="el-icon-view"></div>
              <div class="el-icon-edit-outline" @click="edit"></div>
              <div class="el-icon-delete" @click="handleForceLogout"></div>
            </div>
            <div class="wxy">wxy</div>
            <div class="numberOfDevices">设备数量</div>
            <div class="lastUpdated">最新更新时间</div>
            <div class="numberOfDevices">12台</div>
            <div class="lastUpdated">2022-01-07 08:00:00</div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="6">
        <el-card class="netsBrakeBox">
          <div class="AssetsBox">
            <div class="netsBrake">网闸</div>
            <div class="">
              <div>
                <span class="ITNumber"></span>
                <span class="OTNumber"></span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col> -->
      <el-col :span="6">
        <el-card class="netsBrakeBox">
          <div class="">
            <div class="el-icon-s-platform"></div>
            <div class="host">网关</div>
            <div class="operations">
              <div class="el-icon-view"></div>
              <div class="el-icon-edit-outline" @click="edit"></div>
              <div class="el-icon-delete" @click="handleForceLogout"></div>
            </div>
            <div class="wxy">wxy</div>
            <div class="numberOfDevices">设备数量</div>
            <div class="lastUpdated">最新更新时间</div>
            <div class="numberOfDevices">12台</div>
            <div class="lastUpdated">2022-01-07 08:00:00</div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="6">
        <el-card class="theGatewayBox">
          <div class="">
            <div class="theGateway">网关</div>
            <div class=""></div>
          </div>
        </el-card>
      </el-col> -->
      <el-col :span="6">
        <el-card class="netsBrakeBox">
          <div class="">
            <div class="el-icon-s-platform"></div>
            <div class="host">防火墙</div>
            <div class="operations">
              <div class="el-icon-view"></div>
              <div class="el-icon-edit-outline" @click="edit"></div>
              <div class="el-icon-delete" @click="handleForceLogout"></div>
            </div>
            <div class="wxy">wxy</div>
            <div class="numberOfDevices">设备数量</div>
            <div class="lastUpdated">最新更新时间</div>
            <div class="numberOfDevices">12台</div>
            <div class="lastUpdated">2022-01-07 08:00:00</div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="6">
        <el-card class="firewallBox">
          <div class="">
            <div class="firewall">防火墙</div>
            <div class=""></div>
          </div>
        </el-card>
      </el-col> -->
      <el-col :span="6">
        <el-card class="netsBrakeBox">
          <div class="">
            <div class="el-icon-s-platform"></div>
            <div class="host">交换机</div>
            <div class="operations">
              <div class="el-icon-view"></div>
              <div class="el-icon-edit-outline" @click="edit"></div>
              <div class="el-icon-delete" @click="handleForceLogout"></div>
            </div>
            <div class="wxy">wxy</div>
            <div class="numberOfDevices">设备数量</div>
            <div class="lastUpdated">最新更新时间</div>
            <div class="numberOfDevices">12台</div>
            <div class="lastUpdated">2022-01-07 08:00:00</div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="6">
        <el-card class="switchesBox">
          <div class="">
            <div class="switches">交换机</div>
            <div class=""></div>
          </div>
        </el-card>
      </el-col> -->
      <el-col :span="6">
        <el-card class="netsBrakeBox">
          <div class="">
            <div class="el-icon-s-platform"></div>
            <div class="host">网站</div>
            <div class="operations">
              <div class="el-icon-view"></div>
              <div class="el-icon-edit-outline" @click="edit"></div>
              <div class="el-icon-delete" @click="handleForceLogout"></div>
            </div>
            <div class="wxy">wxy</div>
            <div class="numberOfDevices">设备数量</div>
            <div class="lastUpdated">最新更新时间</div>
            <div class="numberOfDevices">12台</div>
            <div class="lastUpdated">2022-01-07 08:00:00</div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="6">
        <el-card class="webSiteBox">
          <div class="">
            <div class="webSite">网站</div>
            <div class=""></div>
          </div>
        </el-card>
      </el-col> -->
      <el-col :span="6">
        <el-card class="netsBrakeBox">
          <div class="">
            <div class="el-icon-s-platform"></div>
            <div class="host">平台系统</div>
            <div class="operations">
              <div class="el-icon-view"></div>
              <div class="el-icon-edit-outline" @click="edit"></div>
              <div class="el-icon-delete" @click="handleForceLogout"></div>
            </div>
            <div class="wxy">wxy</div>
            <div class="numberOfDevices">设备数量</div>
            <div class="lastUpdated">最新更新时间</div>
            <div class="numberOfDevices">12台</div>
            <div class="lastUpdated">2022-01-07 08:00:00</div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="6">
        <el-card class="platformSystemBox">
          <div class="">
            <div class="platformSystem">平台系统</div>
            <div class=""></div>
          </div>
        </el-card>
      </el-col> -->
    </el-row>
    <!-- 添加分组对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="300px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级分类 :" prop="ipaddr">
              <el-select
                v-model="formData.field114"
                placeholder="请选择上级分类"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in field114Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="资产分类 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入资产分类"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="责任人 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入责任人"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" type="primary" @click="submitForm"
            >保 存</el-button
          >
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <!-- 编辑分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="editDialog"
      width="900px"
      append-to-body
    >
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="300px"
      >
        <div
          style="
            font-weight: bold;
            font-size: 20px;
            border-bottom: 1px solid #0066ff;
            width: 120px;
            text-align: center;
            padding-bottom: 10px;
          "
        >
          资产类型
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级分类 :" prop="ipaddr">
              <el-select
                v-model="formData.field114"
                placeholder="请选择上级分类"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in field114Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="资产分类 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入资产分类"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="责任人 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入责任人"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <div
          style="
            font-weight: bold;
            font-size: 20px;
            border-bottom: 1px solid #0066ff;
            width: 120px;
            text-align: center;
            padding-bottom: 10px;
          "
        >
          资产属性
        </div>
        <el-form-item label="操作系统 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入操作系统"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="工控协议 :" prop="ipaddr">
          <el-select
            v-model="formData.field114"
            placeholder="请输入工控协议"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in field114Options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="传输层协议 :" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入传输层协议"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="端口 :" prop="ipaddr">
          <el-select
            v-model="formData.field114"
            placeholder="请选择端口"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in field114Options"
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
          <el-button size="small" type="primary" @click="submitForm"
            >保 存</el-button
          >
          <el-button size="small" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, forceLogout } from "@/api/monitor/online";

export default {
  name: "Online",
  data() {
    return {
      // 是否显示弹出层
      open: false,
      editDialog: false,
      assetTypes: [
        {
          label: "主机",
          value: 1,
        },
        {
          label: "服务器",
          value: 2,
        },
        {
          label: "网闸",
          value: 3,
        },
        {
          label: "网关",
          value: 4,
        },
        {
          label: "防火墙",
          value: 5,
        },
        {
          label: "交换机",
          value: 6,
        },
        {
          label: "网站",
          value: 7,
        },
        {
          label: "平台系统",
          value: 8,
        },
      ],
      formData: {
        level: "",
      },
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
        userName: undefined,
      },
      field114Options: [
        {
          label: "IT资产",
          value: 1,
        },
        {
          label: "无控资产",
          value: 2,
        },
        {
          label: "无",
          value: 3,
        },
        {
          label: "无控资产-服务器",
          value: 4,
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询登录日志列表 */
    getList() {
      this.loading = true;
      list(this.queryParams).then((response) => {
        this.list = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 强退按钮操作 */
    handleForceLogout(row) {
      this.$confirm("是否确认删除选中的资产类型?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return forceLogout(row.tokenId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("强退成功");
        });
    },
    handleAdd() {
      this.open = true;
      this.title = "新增资产类型";
    },
    edit() {
      this.editDialog = true;
      this.title = "编辑资产类型";
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.editDialog = false;
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false;
      this.editDialog = false;
    },
  },
};
</script>
<style lang="scss" scoped >
.app-container {
  .theHostBox {
    box-shadow: 4px 4px 0px 0px rgba(84, 84, 92, 0.2);
    margin-bottom: 20px;
    height: 200px;
    .el-icon-s-platform {
      display: inline-block;
      vertical-align: middle;
      height: 60px;
      line-height: 57px;
      text-align: center;
      width: 23%;
      font-size: 48px;
      color: #0066ff;
      // padding-bottom: 40px;
      border: 1px solid #0066ff;
      border-radius: 50%;
    }
    .server {
      display: inline-block;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      // font-size: 28px;
      text-align: left;
      // font-weight: bold;
      height: 80px;
      line-height: 80px;
      padding-left: 20px;
      // text-align: center;
      width: 72%;
      font-size: 20px;
    }
    .el-icon-s-fold {
      display: inline-block;
      vertical-align: middle;
      height: 60px;
      line-height: 57px;
      text-align: center;
      width: 23%;
      font-size: 48px;
      color: #0066ff;
      // padding-bottom: 40px;
      // border:1px solid #0066FF;
      border-radius: 50%;
    }
    .host {
      // color: #fff;
      display: inline-block;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-size: 28px;
      text-align: left;
      // font-weight: bold;
      height: 80px;
      line-height: 80px;
      padding-left: 20px;
      // text-align: center;
      width: 72%;
    }
    .operations {
      display: inline-block;
      // vertical-align: middle;
      width: 5%;
      .el-icon-view {
        display: block;
        padding-bottom: 10px;
      }
      .el-icon-edit-outline {
        display: block;
        padding-bottom: 10px;
      }
      .el-icon-delete {
        display: block;
        padding-bottom: 10px;
      }
    }
    .wxy {
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      // text-align: center;
      padding-bottom: 10px;
      padding-left: 50px;
    }
    .numberOfDevices {
      display: inline-block;
      vertical-align: middle;
      width: 25%;
      font-size: 12px;
      text-align: center;
    }
    .lastUpdated {
      display: inline-block;
      vertical-align: middle;
      width: 75%;
      font-size: 12px;
      text-align: center;
    }
  }
  .netsBrakeBox {
    box-shadow: 4px 4px 0px 0px rgba(84, 84, 92, 0.2);
    margin-bottom: 20px;
    height: 200px;
    .el-icon-s-platform {
      display: inline-block;
      vertical-align: middle;
      height: 60px;
      line-height: 57px;
      text-align: center;
      width: 23%;
      font-size: 48px;
      color: #0066ff;
      // padding-bottom: 40px;
      // border:1px solid #0066FF;
      border-radius: 50%;
    }
    .server {
      display: inline-block;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      // font-size: 28px;
      text-align: left;
      // font-weight: bold;
      height: 80px;
      line-height: 80px;
      padding-left: 20px;
      // text-align: center;
      width: 72%;
      font-size: 20px;
    }
    .el-icon-s-fold {
      display: inline-block;
      vertical-align: middle;
      height: 60px;
      line-height: 57px;
      text-align: center;
      width: 23%;
      font-size: 48px;
      color: #0066ff;
      // padding-bottom: 40px;
      // border:1px solid #0066FF;
      border-radius: 50%;
    }
    .host {
      // color: #fff;
      display: inline-block;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-size: 20px;
      text-align: left;
      // font-weight: bold;
      height: 80px;
      line-height: 80px;
      padding-left: 20px;
      // text-align: center;
      width: 72%;
    }
    .operations {
      display: inline-block;
      // vertical-align: middle;
      width: 5%;
      .el-icon-view {
        display: block;
        padding-bottom: 10px;
      }
      .el-icon-edit-outline {
        display: block;
        padding-bottom: 10px;
      }
      .el-icon-delete {
        display: block;
        padding-bottom: 10px;
      }
    }
    .wxy {
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      // text-align: center;
      padding-bottom: 10px;
      padding-left: 50px;
    }
    .numberOfDevices {
      display: inline-block;
      vertical-align: middle;
      width: 25%;
      font-size: 12px;
      text-align: center;
    }
    .lastUpdated {
      display: inline-block;
      vertical-align: middle;
      width: 75%;
      font-size: 12px;
      text-align: center;
    }
  }
  .theServerBox {
    height: 200px;
    .server {
      font-size: 20px;
    }
  }
  .netsBrakeBox {
    height: 200px;
    .netsBrake {
      font-size: 20px;
    }
  }
  .theGatewayBox {
    height: 200px;
    .theGateway {
      font-size: 20px;
    }
  }
  .firewallBox {
    height: 200px;
    .firewall {
      font-size: 20px;
    }
  }
  .switchesBox {
    height: 200px;
    .switches {
      font-size: 20px;
    }
  }
  .webSiteBox {
    height: 200px;
    .webSite {
      font-size: 20px;
    }
  }
  .platformSystemBox {
    height: 200px;
    .platformSystem {
      font-size: 20px;
    }
  }
}
</style>

