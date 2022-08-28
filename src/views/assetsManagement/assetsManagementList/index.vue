<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form
            ref="queryForm"
            :model="queryParams"
            :rules="rules"
            size="mini"
            label-width="100px"
            class="label-type"
            label-position="right"
          >
            <!-- <el-col :span="6">
              <el-form-item label="资产分组:" prop="Asset_group ">
                <el-select
                  v-model="queryParams.Asset_group"
                  placeholder="请选择资产类型"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in assetGroupOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="区域:" prop="region">
                <el-select
                  v-model="queryParams.region"
                  placeholder="请选择区域"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in areaOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="风险等级:" prop="riskLevel">
                <el-select
                  v-model="queryParams.riskLevel"
                  placeholder="请选择风险等级"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in riskStateOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="负责人:" prop="leader">
                <el-input
                  v-model="queryParams.leader"
                  placeholder="请输入负责人"
                  clearable
                />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="事件等级:" prop="eventLevel">
                <el-select
                  v-model="queryParams.eventLevel"
                  placeholder="请选择事件等级"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in levelOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="IP地址:" prop="ipAddress ">
                <el-input
                  v-model="queryParams.ipAddress"
                  placeholder="请输入IP地址"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="资产名称:" prop="assetName ">
                <el-input
                  v-model="queryParams.assetName"
                  placeholder="请输入资产名称"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <div class="btn">
                <el-form-item>
                  <el-button type="primary" size="mini" @click="btnQuery"
                    >搜索</el-button
                  >
                  <el-button size="mini" @click="resetForm">重置</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>

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
    <el-card>
      <div style="height: 40px">
        <el-row type="flex" justify="left">
          <el-button
            type="primary"
            class="export"
            size="mini"
            @click="handleAdd"
            >新增</el-button
          >
          <el-upload
            :http-request="importExcel"
            accept=".xls, .xlsx, .doc, .docx, .pdf"
            :before-upload="beforeUpload"
            :show-file-list="false"
            size="mini"
            action
          >
            <el-button
              icon="el-icon-download"
              class="export"
              size="mini"
              type="primary"
            >
              导入</el-button
            >
          </el-upload>
          <!-- <el-button type="primary" class="export" size="mini">导出</el-button> -->
          <el-button type="primary" class="export" size="mini">删除</el-button>
        </el-row>
      </div>

      <el-table :data="groupList" tooltip-effect="light">
        <el-table-column
          label="IP地址"
          align="center"
          prop="ipAddress"
          width="230"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="资产名称"
          align="center"
          prop="assetName"
          width="300"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="资产类型"
          align="center"
          prop="assetType"
          width="200"
          :show-overflow-tooltip="true"
        >
          <template v-slot="{ row }">
            <span> {{ row.firstAssetType }}---{{ row.assetType }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="资产类型1"
                         align="center"
                         prop="assetType "
                         :show-overflow-tooltip="true" /> -->
        <!-- <el-table-column
          label="运行状态"
          align="center"
          prop="runState"
          :show-overflow-tooltip="true"
        /> -->
        <!-- <el-table-column
          label="风险状态"
          align="center"
          prop="riskState"
          :show-overflow-tooltip="true"
        /> -->
        <!-- <el-table-column
          label="事件等级"
          align="center"
          prop="eventLevel"
          :show-overflow-tooltip="true"
        /> -->
        <!-- <el-table-column
          label="资产标签"
          align="center"
          prop="assetTag"
          :show-overflow-tooltip="true"
        /> -->
        <el-table-column
          label="区域"
          align="center"
          prop="region"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="负责人"
          align="center"
          prop="leader"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          width="180"
        >
          <template #default="{ row }">
            <el-button size="mini" type="text" @click="detail(row.assetId)"
              >详情</el-button
            >
            <el-button size="mini" type="text" @click="configuration"
              >配置</el-button
            >
            <el-button size="mini" type="text" @click="edit">修改</el-button>
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
    <!-- 添加分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="900px"
      append-to-body
      class="label-type"
    >
      <div class="contentBox">
        <el-form
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          label-width="280px"
          class="label-type"
        >
          <el-form-item label="资产编号 :" prop="userName">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入资产编号"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="资产名称 :" prop="assetName ">
            <el-input
              v-model="queryParams.assetName"
              placeholder="请输入资产名称"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="资产类型 :" prop="assetType ">
                <el-select
                  v-model="formData.assetType"
                  placeholder="请选择资产类型"
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
          <el-form-item label="IP地址 :" prop="IPaddress">
            <el-input
              v-model="queryParams.IPaddress"
              placeholder="请输入IP地址"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="负责人 :" prop="leader">
            <el-input
              v-model="queryParams.leader"
              placeholder="请输入负责人"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="区域 :" prop="region">
                <el-select
                  v-model="formData.region"
                  placeholder="请选择区域"
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
          <el-row>
            <el-col :span="24">
              <el-form-item label="资产组 :" prop="ipaddr">
                <el-select
                  v-model="formData.field114"
                  placeholder="请选择资产组"
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
    <!-- 批量导出对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="exportDialog"
      width="900px"
      append-to-body
      class="label-type"
    >
      <div class="contentBox">
        <div slot="footer" class="dialog-footer">
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="handleExport"
              >导 入</el-button
            >
            <el-button size="small" @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!-- 修改分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="editDialog"
      width="900px"
      append-to-body
    >
      <div class="contentBox">
        <el-form
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          label-width="300px"
          class="label-type"
        >
          <el-form-item label="资产编号 :" prop="userName">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入资产编号"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="资产名称 :" prop="assetName ">
            <el-input
              v-model="queryParams.assetName"
              placeholder="请输入资产名称"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="资产类型 :" prop="assetType ">
                <el-select
                  v-model="formData.assetType"
                  placeholder="请选择资产类型"
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
          <el-form-item label="IP地址 :" prop="IPaddress">
            <el-input
              v-model="queryParams.IPaddress"
              placeholder="请输入IP地址"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="负责人 :" prop="leader ">
            <el-input
              v-model="queryParams.leader"
              placeholder="请输入负责人"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-row>
            <el-col :span="18">
              <el-form-item label="区域 :" prop="region">
                <el-select
                  v-model="formData.region"
                  placeholder="请选择区域"
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
    <!-- 配置分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="configurationDialog"
      width="900px"
      append-to-body
    >
      <div class="contentBox">
        <el-form
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          class="label-type"
          label-width="350px"
        >
          <el-form-item label="资产型号 :" prop="Asset_model">
            <el-input
              v-model="queryParams.Asset_model"
              placeholder="请输入资产型号"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="生产厂商 :" prop="manufacturer">
            <el-input
              v-model="queryParams.manufacturer"
              placeholder="请输入生产厂商"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="资产价值 :" prop="assetValue">
            <el-input
              v-model="queryParams.assetValue"
              placeholder="请输入资产价值"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="资产描述 :" prop="Asset_description">
            <el-input
              v-model="queryParams.Asset_description"
              placeholder="请输入资产描述"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="资产标签 :" prop="assetTag">
            <el-input
              v-model="queryParams.assetTag"
              placeholder="请输入资产标签"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="操作系统 :" prop="operatingSystem">
            <el-input
              v-model="queryParams.operatingSystem"
              placeholder="请输入操作系统"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="数据库 :" prop="database">
            <el-input
              v-model="queryParams.database"
              placeholder="请输入数据库"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="运行软件 :" prop="runSoftware">
            <el-input
              v-model="queryParams.runSoftware"
              placeholder="请输入运行软件"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="应用协议 :" prop="applicationProtocol ">
            <el-input
              v-model="queryParams.applicationProtocol"
              placeholder="请输入应用协议"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-form-item label="风险协议 :" prop="riskProtocol">
            <el-input
              v-model="queryParams.riskProtocol"
              placeholder="请输入风险协议"
              clearable
              size="small"
              @keyup.enter.native="btnQuery"
            />
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="运行状态 :" prop="runState">
                <el-select
                  v-model="formData.runState"
                  placeholder="请选择运行状态"
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
            <el-col :span="24">
              <el-form-item label="是否外联 :" prop="whether_Outreach">
                <el-select
                  v-model="formData.whether_Outreach"
                  placeholder="请选择是否外联"
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
    <!--   详情分组对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="detailDialog"
      width="900px"
      append-to-body
    >
      <div class="contentBox">
        <div class="information">资产属性</div>
        <el-form
          ref="form"
          label-width="105px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <!-- <el-col :span="8">
              <el-form-item label="资产编号 :">
                {{ dataDetails.name }}
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="IP地址 :">
                {{ dataDetails.ipAddress }}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="资产型号 :">
                {{ dataDetails.assetModel }}
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="资产名称 :">
                {{ dataDetails.assetName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产类型 :">
                {{ dataDetails.assetType }}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="生产厂商 :">
                {{ dataDetails.manufacturer }}
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="8">
              <el-form-item label="资产价值 :">
                {{ dataDetails.assetValue }}
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="8">
              <el-form-item label="资产标签 :">
                {{ dataDetails.assetTag }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产描述 :">
                {{ dataDetails.Asset_description }}
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="操作系统 :">
                {{ dataDetails.assetDescription }}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="运行软件 :">
                {{ dataDetails.runSoftware }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="数据库 :">
                {{ dataDetails.db }}
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="8">
              <el-form-item label="风险状态 :">
                {{ dataDetails.riskState }}
              </el-form-item>
            </el-col> -->

           
            <!-- <el-col :span="8">
              <el-form-item label="应用协议 :">
                {{ dataDetails.applicationProtocol }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="风险协议 :">
                {{ dataDetails.riskProtocol }}
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="事件等级 :">
                {{ dataDetails.eventLevel }}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="资产位置 :">
                {{ dataDetails.assetLocation }}
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="8">
              <el-form-item label="威胁事件 :">
                {{ dataDetails }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="漏洞数量 :">
                {{ dataDetails }}
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="8">
              <el-form-item label="发现来源 :">
                {{ dataDetails}}
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="负责人 :">
                {{ dataDetails.leader }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="部门 :">
                {{ dataDetails.department }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区域 :">
                {{ dataDetails.region }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否外联 :">
                {{ dataDetails.whetherOutreach }}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="最后活跃时间 :">
                {{ dataDetails.time }}
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
        <!-- <div class="information">资产分组</div>
        <el-form
          ref=""
          label-width="105px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="资产组 :">
                {{ dataDetails.assetGroup }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地理位置 :">
                {{ dataDetails }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组织架构 :">
                {{ dataDetails.origation }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->

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
open;
// import { listEvent } from '@/api/system/category'
import { assetList, uploadExcel } from "@/api/system/list";
import chainStatistics from "@/components/Echarts/chainStatistics";
import eventType from "@/components/Echarts/eventType";
import { assetDetail } from "@/api/system/detail";
export default {
  components: {
    chainStatistics,
    eventType,
  },
  name: "Online",
  data() {
    return {
      title: "",
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
      // 分组表格数据
      groupList: [],
      queryParams: {
        region:"",
        leader:"",
        eventLevel:"",
        ipAddress:"",
        assetName:"",
        pageNum: 1,
        pageSize: 10,
      },
      formData: {
        event_level: "",
      },
      rules: {},
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
      ],
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
      riskStateOptions: [
        {
          label: "正常",
          value: "正常",
        },
        {
          label: "低危",
          value: "低危",
        },
        {
          label: "中危",
          value: "中危",
        },
        {
          label: "高危",
          value: "高危",
        },
        {
          label: "失陷",
          value: "失陷",
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
      assetTypeOptions: [
        {
          label: "安全设备-web应用防火墙",
          value: "安全设备-web应用防火墙",
        },
        {
          label: "服务器-虚拟机 ",
          value: "服务器-虚拟机 ",
        },
        {
          label: "服务器-服务器 ",
          value: "服务器-服务器 ",
        },
        {
          label: "安全设备-蜜罐  ",
          value: "安全设备-蜜罐  ",
        },
        {
          label: "安全设备-工业防火墙",
          value: "安全设备-工业防火墙",
        },
        {
          label: "服务器-主机",
          value: "服务器-主机",
        },
      ],
      assetGroupOptions: [
        {
          label: "极低",
          value: "极低",
        },
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
          label: "致命",
          value: "致命",
        },
      ],
      dataDetails: {
        // name: '1',
        // name1: '124.165.254.98',
        // Asset_model: '29530',
        // name3: 'SCADA服务器',
        // assetType: '工控设备',
        // manufacturer: 'Dell',
        // nameFind: '导入',
        // assetValue: '4',
        // name7: '等保一级',
        // Asset_description: 'WINDOWS',
        // runSoftware: 'Combridge',
        // riskState: '极低',
        // name11: 'DATAServer',
        // name12: '正常',
        // name13: '--',
        // name14: '是',
        // nameArea: '山西三通燃气厂',
        // department: '--',
        // eventLevel: "低",
        // name16: '3',
        // leader: '张燕强',
        // time: '2022-02-03 21:00:47',
        // location: '--',
        // locationGeo: '吕梁市汾阳市富民南路东方国际城顶楼机房',
        // nameAssets: '工控设备',
        // assetLocation: '楼顶机房内',
        // nameArgument: 'TCP/IP',
        // origation: '中国城乡山西三通燃气厂'
      },
    };
  },
  created() {
    this.getList();
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
    async getList() {
      this.loading = true;
      const res = await assetList(this.queryParams);
      this.groupList = res.rows;
      this.total = res.total;
      this.loading = false;
    },
    // 上传前格式与大小校验
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "xls";
      const extension1 = testmsg === "xlsx";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension1) {
        this.$message.warning("上传文件只能是 xls、xlsx格式");
      }
      if (!isLt2M) {
        this.$message.warning("上传文件大小不能超过 10MB!");
      }
      return extension || extension1 || isLt2M;
    },
    async importExcel(fileObj) {
      const formData = new FormData();
      formData.set("file", fileObj.file);

      const { msg } = await uploadExcel("/dm/asset/excelFile", formData);
      this.getList();
      this.$message.success(msg);
    },
    /** 搜索按钮操作 */
    btnQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetForm() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
      };
      this.getList();
    },
    handleAdd() {
      this.open = true;
      this.title = "新增资产";
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.exportDialog = false;
      this.editDialog = false;
      this.configurationDialog = false;
      this.detailDialog = false;
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false;
      this.exportDialog = false;
      this.editDialog = false;
      this.configurationDialog = false;
      this.detailDialog = false;
    },
    handleDelete(row) {
      this.$confirm("是否确认删除选中的资产?", "删除", {
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
    async handleExport() {
      await uploadExcel(this.queryParams);
    },
    edit() {
      this.editDialog = true;
      this.title = "修改资产";
    },
    configuration() {
      this.configurationDialog = true;
      this.title = "配置资产";
    },
    async detail(id) {
      const { data } = await assetDetail(id);
      this.dataDetails = data;
      console.log("this.dataDetails", this.dataDetails);
      // this.dataDetails.eventLevel = this.transTypeDic(this.dataDetails.eventLevel)
      this.detailDialog = true;
      this.title = "资产详情";
    },
  },
};
</script>
<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
  height:120px;
   position: relative;
  .btn{
    position: absolute;
    right:10px;
  }
}
.export {
  margin-bottom: 10px;
  margin-left: 10px;
}
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
