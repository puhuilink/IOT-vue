<template>
  <div class="app-container">
    <el-form ref="queryForm"
             :model="queryParams"
             :inline="true"
             label-width="75px"
             class="label-type">
      <el-col :span="6">
        <el-form-item label="IP地址:"
                      prop="ipaddr">
          <el-input v-model="queryParams.ip"
                    placeholder="请输入IP地址"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="区域:"
                      prop="region">
          <el-select v-model="queryParams.region"
                     placeholder="请选择区域"
                     filterable
                     clearable
                     :style="{ width: '100%' }">
            <el-option v-for="(item, index) in areaOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="风险等级:"
                      prop="riskState">
          <el-select v-model="queryParams.riskState"
                     placeholder="请选择区域"
                     filterable
                     clearable
                     :style="{ width: '100%' }">
            <el-option v-for="(item, index) in riskStateOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="责任人:"
                      prop="leader">
          <el-input v-model="queryParams.leader"
                    placeholder="请输入责任人"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="事件等级:"
                      prop="level">
          <el-select v-model="queryParams.level"
                     placeholder="请选择事件等级"
                     filterable
                     clearable
                     :style="{ width: '100%' }">
            <el-option v-for="(item, index) in levelOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled" />
          </el-select>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="7">
        <el-form-item label="资产类型:"
                      prop="assetType">
          <el-select v-model="queryParams.assetType"
                     placeholder="请选择资产类型"
                     filterable
                     clearable
                     :style="{ width: '100%' }">
            <el-option v-for="(item, index) in assetTypeOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled" />
        </el-form-item>
      </el-col> -->
      <el-col :span="6">
        <el-form-item label="资产类型:"
                      prop="assetType">
          <el-select v-model="queryParams.assetType"
                     placeholder="请选择资产类型"
                     filterable
                     clearable
                     :style="{ width: '100%' }">
            <el-option v-for="(item, index) in assetTypeOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     size="mini"
                     @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh"
                     size="mini"
                     @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <!-- <div>
      <el-row :gutter="10">
        <el-col :span="1.5">
          <el-button v-hasPermi="['system:user:export']"
                     type="primary"
                     size="mini"
                     @click="handleExport">导出</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button v-hasPermi="['system:user:add']"
                     type="primary"
                     size="mini"
                     @click="handleAdd">新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button v-hasPermi="['system:user:remove']"
                     type="primary"
                     size="mini"
                     @click="handleDelete">删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button v-hasPermi="['system:user:remove']"
                     type="primary"
                     size="mini"
                     @click="handleDelete">导入</el-button>
        </el-col>
      </el-row>
    </div> -->

    <el-table :data="groupList"
              tooltip-effect="light">
      <el-table-column label="资产编号"
                       type="index"
                       align="center"
                       width="100px" />
      <!-- <el-table-column
        label="IP地址"
        align="center"
        prop="ip"
        :show-overflow-tooltip="true"
      /> -->
      <el-table-column label="资产名称"
                       align="center"
                       prop="assetName"
                       :show-overflow-tooltip="true" />
      <el-table-column label="资产类型"
                       align="center"
                       prop="assetType"
                       :show-overflow-tooltip="true" />
      <el-table-column label="运行状态"
                       align="center"
                       prop="runState"
                       :show-overflow-tooltip="true" />
      <el-table-column label="风险状态"
                       align="center"
                       prop="riskState"
                       :show-overflow-tooltip="true" />
      <el-table-column label="事件等级"
                       align="center"
                       prop="level"
                       :show-overflow-tooltip="true" />
      <el-table-column label="操作系统"
                       align="center"
                       prop="os"
                       :show-overflow-tooltip="true" />

      <el-table-column label="应用协议"
                       align="center"
                       prop="appProtocol"
                       :show-overflow-tooltip="true" />
      <el-table-column label="风险协议"
                       align="center"
                       prop="riskProtocol"
                       :show-overflow-tooltip="true" />
      <el-table-column label="资产标签"
                       align="center"
                       prop="assetLabel"
                       :show-overflow-tooltip="true" />
      <el-table-column label="区域"
                       align="center"
                       prop="region"
                       :show-overflow-tooltip="true" />
      <el-table-column label="负责人"
                       align="center"
                       prop="leader"
                       :show-overflow-tooltip="true" />
      <!-- <el-table-column
        label="最后活跃时间"
        align="center"
        prop="endTime"
        :show-overflow-tooltip="true"
      /> -->
      <el-table-column label="操作"
                       align="center"
                       class-name="small-padding fixed-width"
                       width="180">
        <template>
          <el-button size="mini"
                     type="text"
                     @click="detail">详情</el-button>
          <el-button size="mini"
                     type="text"
                     @click="configuration">配置</el-button>
          <el-button size="mini"
                     type="text"
                     @click="edit">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getList" />
    <!-- 添加分组对话框 -->
    <el-dialog :title="title"
               :visible.sync="open"
               width="900px"
               append-to-body
               class="label-type">
      <div class="contentBox">
        <el-form ref="queryForm"
                 :model="queryParams"
                 :inline="true"
                 label-width="280px"
                 class="label-type">
          <el-form-item label="资产编号 :"
                        prop="userName">
            <el-input v-model="queryParams.userName"
                      placeholder="请输入资产编号"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="资产名称 :"
                        prop="assetName ">
            <el-input v-model="queryParams.assetName "
                      placeholder="请输入资产名称"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="资产类型 :"
                            prop="assetType">
                <el-select v-model="formData.field114"
                           placeholder="请选择资产类型"
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in field114Options"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="IP地址 :"
                        prop="userName">
            <el-input v-model="queryParams.userName"
                      placeholder="请输入IP地址"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="负责人 :"
                        prop="leader">
            <el-input v-model="queryParams.leader"
                      placeholder="请输入负责人"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="区域 :"
                            prop="region">
                <el-select v-model="formData.field114"
                           placeholder="请选择区域"
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in field114Options"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="资产组 :"
                            prop="ipaddr">
                <el-select v-model="formData.field114"
                           placeholder="请选择资产组"
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in field114Options"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-row type="flex"
                  justify="center">
            <el-button size="small"
                       type="primary"
                       @click="submitForm">保 存</el-button>
            <el-button size="small"
                       @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>

    </el-dialog>
    <!-- 批量导出对话框 -->
    <el-dialog :title="title"
               :visible.sync="exportDialog"
               width="900px"
               append-to-body
               class="label-type">
      <div class="contentBox">
        <el-form ref="queryForm"
                 :model="queryParams"
                 :inline="true"
                 label-width="300px"
                 class="label-type">
          <el-form-item label="请选择文件 :"
                        prop="userName">
            <el-upload class="upload-demo"
                       drag
                       action
                       :show-file-list="false"
                       :before-upload="beforeUpload"
                       :http-request="doImport">
              <i class="el-icon-upload" />
            </el-upload>
            <!-- <el-input v-model="queryParams.userName"
                      placeholder="请上传csv文件"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" /> -->
          </el-form-item>
          <el-button class="downLoad">下载导入模板</el-button>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-row type="flex"
                  justify="center">
            <el-button size="small"
                       type="primary"
                       @click="submitForm">导 入</el-button>
            <el-button size="small"
                       @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>

    </el-dialog>
    <!-- 修改分组对话框 -->
    <el-dialog :title="title"
               :visible.sync="editDialog"
               width="900px"
               append-to-body>
      <div class="contentBox">
        <el-form ref="queryForm"
                 :model="queryParams"
                 :inline="true"
                 label-width="300px"
                 class="label-type">
          <el-form-item label="资产编号 :"
                        prop="userName">
            <el-input v-model="queryParams.userName"
                      placeholder="请输入资产编号"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="资产名称 :"
                        prop="assetName ">
            <el-input v-model="queryParams.assetName "
                      placeholder="请输入资产名称"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="资产类型 :"
                            prop="assetType">
                <el-select v-model="formData.field114"
                           placeholder="请选择资产类型"
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in field114Options"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="IP地址 :"
                        prop="userName">
            <el-input v-model="queryParams.userName"
                      placeholder="请输入IP地址"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="负责人 :"
                        prop="leader ">
            <el-input v-model="queryParams.leader "
                      placeholder="请输入负责人"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="区域 :"
                            prop="region">
                <el-select v-model="formData.field114"
                           placeholder="请选择区域"
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in field114Options"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-row type="flex"
                  justify="center">
            <el-button size="small"
                       type="primary"
                       @click="submitForm">保 存</el-button>
            <el-button size="small"
                       @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>

    </el-dialog>
    <!-- 配置分组对话框 -->
    <el-dialog :title="title"
               :visible.sync="configurationDialog"
               width="900px"
               append-to-body>
      <div class="contentBox">
        <el-form ref="queryForm"
                 :model="queryParams"
                 :inline="true"
                 class="label-type"
                 label-width="280px">
          <el-form-item label="资产型号 :"
                        prop="userName">
            <el-input v-model="queryParams.userName"
                      placeholder="请输入资产型号"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="生产厂商 :"
                        prop="userName">
            <el-input v-model="queryParams.userName"
                      placeholder="请输入生产厂商"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="资产价值 :"
                        prop="userName">
            <el-input v-model="queryParams.userName"
                      placeholder="请输入资产价值"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="资产描述 :"
                        prop="userName">
            <el-input v-model="queryParams.userName"
                      placeholder="请输入资产描述"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="资产标签 :"
                        prop="assetlabel">
            <el-input v-model="queryParams.assetlabel"
                      placeholder="请输入资产标签"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="操作系统 :"
                        prop="os">
            <el-input v-model="queryParams.os"
                      placeholder="请输入操作系统"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="数据库 :"
                        prop="userName">
            <el-input v-model="queryParams.userName"
                      placeholder="请输入数据库"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="运行软件 :"
                        prop="userName">
            <el-input v-model="queryParams.userName"
                      placeholder="请输入运行软件"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="应用协议 :"
                        prop="appProtocol ">
            <el-input v-model="queryParams.appProtocol "
                      placeholder="请输入应用协议"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="风险协议 :"
                        prop="riskProtocol">
            <el-input v-model="queryParams.riskProtocol"
                      placeholder="请输入风险协议"
                      clearable
                      size="small"
                      @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="运行状态 :"
                            prop="ipaddr">
                <el-select v-model="formData.field114"
                           placeholder="请选择运行状态"
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in statusOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="是否外联 :"
                            prop="ipaddr">
                <el-select v-model="formData.field114"
                           placeholder="请选择是否外联"
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in statusOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-row type="flex"
                  justify="center">
            <el-button size="small"
                       type="primary"
                       @click="submitForm">保 存</el-button>
            <el-button size="small"
                       @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>

    </el-dialog>
    <!--   详情分组对话框 -->
    <el-dialog :title="title"
               :visible.sync="detailDialog"
               width="900px"
               append-to-body>
      <div class="contentBox">
        <div class="information">
          资产属性
        </div>
        <el-form ref="form"
                 label-width="105px"
                 label-position="left"
                 class="label-type">
          <el-row>
            <el-col :span="8">
              <el-form-item label="资产编号 :">
                {{ dataTest.name }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="IP地址 :">
                {{ dataTest.name1 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产型号 :">
                {{ dataTest.name2 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产名称 :">
                {{ dataTest.name3 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产类型 :">
                {{ dataTest.name4 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="生产厂商 :">
                {{ dataTest.name5 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产价值 :">
                {{ dataTest.name6 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产标签 :">
                {{ dataTest.name7 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产描述 :">
                {{ dataTest.name8 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="操作系统 :">
                {{ dataTest.name8 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运行软件 :">
                {{ dataTest.name9 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="数据库 :">
                {{ dataTest.name11 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="风险状态 :">
                {{ dataTest.name10 }}
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="运行状态 :">
                {{ dataTest.name12 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应用协议 :">
                {{ dataTest.name13 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="风险协议 :">
                {{ dataTest.name13 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="事件等级 :">
                {{ dataTest.name15 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产位置 :">
                {{ dataTest.name13 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="威胁事件 :">
                {{ dataTest.name16 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="漏洞数量 :">
                {{ dataTest.name16 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发现来源 :">
                {{ dataTest.name13 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人 :">
                {{ dataTest.leader }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="部门 :">
                {{ dataTest.name5 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区域 :">
                {{ dataTest.name5 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否外联 :">
                {{ dataTest.name14 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最后活跃时间 :">
                {{ dataTest.time }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">
          资产分组
        </div>
        <el-form ref="form"
                 label-width="105px"
                 label-position="left"
                 class="label-type">
          <el-row>
            <el-col :span="12">
              <el-form-item label="资产组 :">
                {{ dataTest.name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地理位置 :">
                {{ dataTest.location }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组织架构 :">
                {{ dataTest.location }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">
          威胁态势
        </div>
        <el-table :data="groupList"
                  style="width: 100%">
          <el-table-column label="事件名称"
                           align="center"
                           prop="eventName"
                           :show-overflow-tooltip="true" />
          <el-table-column label="源IP"
                           align="center"
                           prop="ip"
                           :show-overflow-tooltip="true" />
          <el-table-column label="目的IP"
                           align="center"
                           prop="ip"
                           :show-overflow-tooltip="true" />
          <el-table-column label="协议"
                           align="center"
                           prop="appProtocol"
                           :show-overflow-tooltip="true"
                           width="60" />
          <el-table-column label="事件等级"
                           align="center"
                           prop="level"
                           width="60" />
          <el-table-column label="事件类型"
                           align="center"
                           prop="os"
                           width="60" />
          <el-table-column label="处置状态"
                           align="center"
                           prop="runstate"
                           width="80" />
          <el-table-column label="事件开始时间"
                           align="center"
                           prop="startTime"
                           :show-overflow-tooltip="true" />
          <el-table-column label="事件结束时间"
                           align="center"
                           prop="startTime" />
          <el-table-column label="区域"
                           align="center"
                           prop="region"
                           :show-overflow-tooltip="true" />
          <el-table-column label="上报设备"
                           align="center"
                           prop="equipment" />
        </el-table>

        <div slot="footer"
             class="dialog-footer">
          <el-row type="flex"
                  justify="center">
            <el-button size="small"
                       type="primary"
                       @click="submitForm">保 存</el-button>
            <el-button size="small"
                       @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
// import { listEvent } from '@/api/system/category'
import { assetList } from '@/api/system/list'
import chainStatistics from "@/components/Echarts/chainStatistics";
import eventType from "@/components/Echarts/eventType";
export default {
  components: {
    chainStatistics, eventType
  },
  name: 'Online',
  data () {
    return {
      title: '',
      // 是否显示新增弹出层
      open: false,
      exportDialog: false,
      editDialog: false,
      configurationDialog: false,
      detailDialog: false,
      // 遮罩层
      loading: false,
      // 总条数
      total: 0,
      // 表格数据
      dataList: [
        {
          index: 1,
          userName: '10.255.52.84',
          deptName: '长亭WAF',
          ipaddr: '安全设备-web应用防火墙',
          loginLocation: '在线',
          fxzt: '正常',
          os: '极低',
          xt: 'Linux',
          yyxy: '--',
          fxxy: '--',
          // browser: "--",
          zcbq: '--',
          area: '山西三通燃气厂',
          fzr: '张三',
          zhhysj: '2022-01-29 10:10:00'
        },
        {
          index: 2,
          userName: '10.255.52.67',
          deptName: '4AOIM',
          ipaddr: '服务器-虚拟机',
          loginLocation: '在线',
          fxzt: '低危',
          os: '低',
          xt: 'CentOS7.6',
          yyxy: '--',
          fxxy: '--',
          // browser: "--",
          zcbq: '--',
          area: '天津管片厂',
          fzr: '张三',
          zhhysj: '2022-01-29 10:10:00'
        },
        {
          index: 3,
          userName: '10.255.52.27',
          deptName: '4A流量监控管理系统',
          ipaddr: '服务器-服务器',
          loginLocation: '在线',
          fxzt: '中危',
          os: '中',
          xt: 'Linux2.6x',
          yyxy: '--',
          fxxy: '--',
          // browser: "--",
          zcbq: '--',
          area: '北京城乡水厂',
          fzr: '张三',
          zhhysj: '2022-01-29 10:10:00'
        },
        {
          index: 4,
          userName: '10.20.51.82',
          deptName: '蜜罐',
          ipaddr: '安全设备-蜜罐',
          loginLocation: '异常',
          fxzt: '高危',
          os: '高',
          xt: '--',
          yyxy: '--',
          fxxy: '--',
          // browser: "--",
          zcbq: '--',
          area: '珠海深中通道',
          fzr: '张三',
          zhhysj: '2022-01-29 10:10:00'
        },
        {
          index: 5,
          userName: '10.255.52.84',
          deptName: '防火墙',
          ipaddr: '安全设备-工业防火墙',
          loginLocation: '在线',
          fxzt: '失陷',
          os: '致命',
          xt: 'WOS',
          yyxy: 'S7',
          fxxy: 'S7',
          // browser: "--",
          zcbq: '--',
          area: '三亚海投轨交',
          fzr: '张三',
          zhhysj: '2022-01-29 10:10:00'
        },
        {
          index: 6,
          userName: '10.255.52.84',
          deptName: '主机',
          ipaddr: '服务器-主机',
          loginLocation: '离线',
          fxzt: '正常',
          os: '极低',
          xt: 'Linux',
          yyxy: '--',
          fxxy: '--',
          // browser: "--",
          zcbq: '--',
          area: '山西三通燃气厂',
          fzr: '张三',
          zhhysj: '2022-01-29 10:10:00'
        },
        {
          index: 7,
          userName: '10.255.52.84',
          deptName: '主机',
          ipaddr: '服务器-主机',
          loginLocation: '离线',
          fxzt: '正常',
          os: '极低',
          xt: 'Linux',
          yyxy: '--',
          fxxy: '--',
          // browser: "--",
          zcbq: '--',
          area: '山西三通燃气厂',
          fzr: '张三',
          zhhysj: '2022-01-29 10:10:00'
        },
        {
          index: 8,
          userName: '10.255.52.84',
          deptName: '防火墙',
          ipaddr: '安全设备-工业防火墙',
          loginLocation: '在线',
          fxzt: '失陷',
          os: '致命',
          xt: 'WOS',
          yyxy: 'S7',
          fxxy: 'S7',
          // browser: "--",
          zcbq: '--',
          area: '三亚海投轨交',
          fzr: '张三',
          zhhysj: '2022-01-29 10:10:00'
        },
        {
          index: 9,
          userName: '10.255.52.84',
          deptName: '主机',
          ipaddr: '服务器-主机',
          loginLocation: '离线',
          fxzt: '正常',
          os: '极低',
          xt: 'Linux',
          yyxy: '--',
          fxxy: '--',
          // browser: "--",
          zcbq: '--',
          area: '山西三通燃气厂',
          fzr: '张三',
          zhhysj: '2022-01-29 10:10:00'
        },
        {
          index: 10,
          userName: '10.255.52.84',
          deptName: '主机',
          ipaddr: '服务器-主机',
          loginLocation: '离线',
          fxzt: '正常',
          os: '极低',
          xt: 'Linux',
          yyxy: '--',
          fxxy: '--',
          // browser: "--",
          zcbq: '--',
          area: '山西三通燃气厂',
          fzr: '张三',
          zhhysj: '2022-01-29 10:10:00'
        }
      ],
      // 分组表格数据
      groupList: [],
      pageNum: 1,
      pageSize: 10,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        orderByColumn: 'happen_time',
        isAsc: 'desc',
        groupName: null,
        createTime: null
      },
      formData: {
        level: ''
      },
      areaOptions: [
        {
          label: '天津管片厂',
          value: '天津管片厂'
        },
        {
          label: '三亚轨交',
          value: '三亚轨交'
        },
        {
          label: '北京水厂',
          value: '北京水厂'
        },
        {
          label: '山西燃气',
          value: '山西燃气'
        },
        {
          label: '珠海深中通道',
          value: '珠海深中通道'
        },
        {
          label: '北京水厂',
          value: '北京水厂'
        }
      ],
      field114Options: [
        {
          label: 'IT资产',
          value: 1
        },
        {
          label: '无控资产',
          value: 2
        },
        {
          label: '无',
          value: 3
        },
        {
          label: '无控资产-服务器',
          value: 4
        }
      ],
      riskStateOptions: [
        {
          label: '正常',
          value: '正常'
        },
        {
          label: '低危',
          value: '低危'
        },
        {
          label: '中危',
          value: '中危'
        },
        {
          label: '高危',
          value: '高危'
        },
        {
          label: '失陷',
          value: '失陷'
        }
      ],
      statusOptions: [
        {
          label: '在线',
          value: 1
        },
        {
          label: '离线',
          value: 2
        },
        {
          label: '异常',
          value: 3
        }
      ],
      levelOptions: [
        {
          label: '极低',
          value: '极低'
        },
        {
          label: '低',
          value: '低'
        },
        {
          label: '中',
          value: '中'
        },
        {
          label: '高',
          value: '高'
        },
        {
          label: '致命',
          value: '致命'
        }
      ],
      assetTypeOptions: [
        {
          label: '安全设备-web应用防火墙',
          value: '安全设备-web应用防火墙'
        },
        {
          label: '服务器-虚拟机 ',
          value: '服务器-虚拟机 '
        },
        {
          label: '服务器-服务器 ',
          value: '服务器-服务器 '
        },
        {
          label: '安全设备-蜜罐  ',
          value: '安全设备-蜜罐  '
        },
        {
          label: '安全设备-工业防火墙',
          value: '安全设备-工业防火墙'
        },
        {
          label: '服务器-主机',
          value: '服务器-主机'
        }
      ],
      dataTest: {
        name: '1',
        name1: '124.165.254.98',
        name2: 'TCP/IP',
        name3: 'SCADA服务器',
        name4: 'OT设备',
        name5: '山西燃气厂',
        name6: '',
        name7: '--',
        name8: 'WINDOWS',
        name9: '',
        name10: '极低',
        name11: '--',
        name12: '正常',
        name13: '',
        name14: '是',
        name15: "低",
        name16: '3',
        leader: '张燕强',
        time: '2022-02-03 21:00:47',
        location: '--'
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /** 查询登录日志列表 */
    // getCategoryList() {
    //   listEvent(this.queryParams).then((response) => {
    //     this.groupList = response.rows
    //     this.total = response.total
    //   })
    // },
    /** 查询分组列表 */
    async getList () {
      this.loading = true
      const res = await assetList(this.queryParams)
      this.groupList = res.rows
      this.total = res.total
      this.loading = false
    },
    /** 搜索按钮操作 */
    handleQuery () {
      // this.queryParams.pageNum = 1
      this.getList()
    },
    // btnQuery () {
    //   this.queryParams.pageNum = 1
    //   this.getList()
    // },
    /** 重置按钮操作 */
    resetQuery () {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    handleAdd () {
      this.open = true
      this.title = '新增资产'
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.exportDialog = false
      this.editDialog = false
      this.configurationDialog = false
      this.detailDialog = false
    },
    /** 提交按钮 */
    submitForm () {
      this.open = false
      this.exportDialog = false
      this.editDialog = false
      this.configurationDialog = false
      this.detailDialog = false
    },
    handleDelete (row) {
      this.$confirm('是否确认删除选中的资产?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function () {
          return forceLogout(row.tokenId)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('强退成功')
        })
    },
    handleExport () {
      this.exportDialog = true
      this.title = '批量导入资产'
    },
    edit () {
      this.editDialog = true
      this.title = '修改资产'
    },
    configuration () {
      this.configurationDialog = true
      this.title = '配置资产'
    },
    detail () {
      this.detailDialog = true
      this.title = '资产详情'
    }
  }
}
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
}
::v-deep .label-type {
  .el-form-item__label {
    color: #333;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal !important;
  }
}
.downLoad {
  color: #0066ff;
  border: none;
}
</style>

