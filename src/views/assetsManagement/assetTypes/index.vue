<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-col :span="6">
              <el-form-item label="资产类型" prop="level">
                <el-select
                  v-model="formData.level"
                  placeholder="请选择资产类型"
                  filterable
                  clearable
                  :style="{width: '100%'}"
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
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
     <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              size="mini"
              @click="handleAdd"
              v-hasPermi="['system:user:add']"
            >新增</el-button>
          </el-col>
        </el-row>
          <el-row :gutter="10">
        <el-col :span="6" >
            <el-card class="theHostBox">
               <div class="">
                 <div class="el-icon-s-platform"></div>
                 <div class="host">主机</div>
                 <div class="operations">111</div>
                 <div class="numberOfDevices">设备数量</div>
                 <div class="lastUpdated">最新更新时间</div>
                  <div class="numberOfDevices"> 12台  </div>
                 <div class="lastUpdated"> 2022-01-07 08:00:00</div>
               </div>
              
            </el-card>
        </el-col>
        <el-col :span="6" >
            <el-card class="theServerBox">
              <div class="">
                 <div class="server">服务器</div>
                 <div class="AssetsNumber"></div>
             </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card class="netsBrakeBox">
               <div  class="AssetsBox">
               <div class="netsBrake">网闸</div>
               <div class="">
                  <div>
                    <!-- <span class="">IT</span>
                    <span class="">OT</span> -->
                  </div>
                  <div>
                    <span class="ITNumber"></span>
                    <span class="OTNumber"></span>
                  </div>
               </div>
              </div>
            </el-card>  
        </el-col>
        <el-col :span="6">
            <el-card class="theGatewayBox">
               <div  class="">
               <div class="theGateway">网关</div>
               <div class=""></div>
            </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card class="firewallBox">
               <div class="">
                <div class="firewall">防火墙</div>
                <div class=""></div>
            </div>
        </el-card> 
        </el-col>
        <el-col :span="6">
            <el-card class="switchesBox">
             <div  class="">
               <div class="switches">交换机</div>
               <div class=""></div>
            </div>
            </el-card>  
        </el-col>
        <el-col :span="6">
            <el-card class="webSiteBox">
                 <div class="">
                <div class="webSite">网站</div>
                <div class=""></div>
            </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card class="platformSystemBox">
               <div class="">
                <div class="platformSystem">平台系统</div>
                <div class=""></div>
            </div>
            </el-card>  
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { list, forceLogout } from "@/api/monitor/online";

export default {
  name: "Online",
  data() {
    return {
      assetTypes:[{
        'label': '主机',
        'value': 1
      }, {
        'label': '服务器',
        'value': 2
      }, {
        'label': '网闸',
        'value': 3
      }, {
        'label': '网关',
        'value': 4
      }, {
        'label': '防火墙',
        'value': 5
      }, {
        'label': '交换机',
        'value': 6
      }, {
        'label': '网站',
        'value': 7
      }, {
        'label': '平台系统',
        'value': 8
      }],
      formData:{
        level:""
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
        userName: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询登录日志列表 */
    getList() {
      this.loading = true;
      list(this.queryParams).then(response => {
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
      this.$confirm('是否确认强退名称为"' + row.userName + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return forceLogout(row.tokenId);
        }).then(() => {
          this.getList();
          this.msgSuccess("强退成功");
        })
    }
  }
};
</script>
<style lang="scss" scoped >
.app-container{
    .theHostBox{
        height:200px;
        .el-icon-s-platform{
            display: inline-block;
            vertical-align: middle;
            width: 15%;
            font-size: 28px;
        }
        .host{
            // color: #fff;
            display: inline-block;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-size: 28px;
            font-weight: bold;
           height: 100px;
            line-height: 100px;
            text-align: center;
            width: 60%;
        }
        .operations{
            display: inline-block;
            vertical-align: middle;
            width: 25%;
        }
        .numberOfDevices{
            display: inline-block;
            vertical-align: middle;
            width: 30%;
        }
        .lastUpdated{
            display: inline-block;
            vertical-align: middle;
            width: 70%;
        }
    }
   .theServerBox{
       height:200px;
       .server{
           font-size: 20px;
       }
   }
   .netsBrakeBox{
        height:200px;
        .netsBrake{
           font-size: 20px;
       }
   }
   .theGatewayBox{
       height:200px;
       .theGateway{
            font-size: 20px;
       }
       
   }
   .firewallBox{
        height:200px; 
        .firewall{
            font-size: 20px;
        }
   }
   .switchesBox{
        height:200px; 
        .switches{
          font-size: 20px;  
        }
   }
   .webSiteBox{
       height:200px; 
       .webSite{
           font-size: 20px; 
       }
   }
   .platformSystemBox{
        height:200px;
        .platformSystem{
            font-size: 20px; 
        }
   }
}
</style>

