<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form
            ref="queryForm"
            :model="queryParams"
            size="mini"
            class="label-type"
            label-width="108px"
          >
            <el-col :span="6">
              <el-form-item label="设备名称：" prop="deviceName">
                <el-input
                  v-model="queryParams.deviceName"
                  placeholder="请输入设备名称"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="设备类型：" prop="deviceType">
                <el-select
                  v-model="queryParams.deviceType"
                  placeholder="请选择设备类型"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in categoryDeviceList"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="设备状态：" prop="status">
                <el-select
                  v-model="queryParams.status"
                  placeholder="请选择设备状态"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in categoryDeviceStatus"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="授权状态：" prop="firmwareVersion">
                <el-select
                  v-model="queryParams.categoryId"
                  placeholder="请选择授权状态"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in categoryDeviceAuthorizationState"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="硬件版本号：" prop="ownerId">
                <el-input
                  v-model="queryParams.ownerId"
                  placeholder="请输入硬件版本号"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="ROM版本号：">
                <el-input
                  v-model="queryParams.ownerId"
                  placeholder="请输入ROM版本号"
                  clearable
                  :style="{ width: '100%' }"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域：" prop="deviceName">
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
              <el-form-item label="负责人：" prop="deviceName">
                <el-input
                  v-model="queryParams.ownerId"
                  placeholder="请输入负责人"
                  clearable
                  @keyup.enter.native="handleQuery"
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <div class="setHeight">
              <el-col :span="24">
                <div class="btn">
                  <el-form-item>
                    <el-button type="primary" size="mini" @click="handleQuery"
                      >搜索</el-button
                    >
                    <el-button size="mini" @click="resetQuery">重置</el-button>
                  </el-form-item>
                </div>
              </el-col>
            </div>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" plain size="mini" @click="authorization()"
            >授权</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" plain size="mini" @click="handleUpgrade()"
            >升级</el-button
          >
        </el-col>
        <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col> -->
        <!-- <right-toolbar :show-search.sync="showSearch" @queryTable="getList" /> -->
      </el-row>

      <el-table
        v-loading="loading"
        tooltip-effect="light"
        :data="deviceList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="45" align="center" />
        <!-- <el-table-column label="设备名称" align="center" prop="deviceName" :show-overflow-tooltip="true" /> -->
        <el-table-column label="设备类型" align="center" prop="deviceType" :show-overflow-tooltip="true"/>
        <!-- <el-table-column label="设备状态" align="center" prop="status" :show-overflow-tooltip="true"/> -->
        <!-- <el-table-column
          label="设备状态"
          align="center"
          prop="status"
        >
          <template #default="scope">
            <span>{{ transTypeDic(scope.row.status) }}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          label="授权状态"
          align="center"
          prop="authorizationType"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="证书序列号" align="center" prop="certificateSerialNumber" :show-overflow-tooltip="true"/>
        <el-table-column label="签名算法" align="center" prop="signatureAlgorithm" :show-overflow-tooltip="true"/>
        <el-table-column
          label="使用者"
          align="center"
          prop="deviceUsers"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="设备IP" align="center" prop="networkIp" :show-overflow-tooltip="true"/>
        <!-- <el-table-column label="设备SN号" align="center" prop="isOnline">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isOnline" :active-value="1" :inactive-value="0" active-color="#13ce66" disabled />
        </template>
      </el-table-column> -->
        <el-table-column label="设备SN号" align="center" prop="deviceSn" :show-overflow-tooltip="true"/>
        <!-- <el-table-column
          label="硬件版本号"
          align="center"
          prop="versionNumber"
          :show-overflow-tooltip="true"
        />
        
        <el-table-column
          label="ROM版本号"
          align="center"
          prop="romVersionNumber"
          :show-overflow-tooltip="true"
        /> -->
        <el-table-column label="区域" align="center" prop="networkAddress" :show-overflow-tooltip="true"/>
        <el-table-column label="负责人" align="center" prop="username" :show-overflow-tooltip="true"/>
        <!-- <el-table-column
          label="最后活跃时间"
          align="center"
          prop="lastActiveTime"
          :show-overflow-tooltip="true"
        /> -->
        <!-- <el-table-column
        label="最后活跃时间"
        align="center"
        prop="createTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column> -->

        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="detail(scope.row.deviceId)"
              >详情</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleSet(scope.row.deviceId)"
              >配置</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="upgrade(scope.row.deviceId)"
              >升级</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.row.deviceId)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="report(scope.row.deviceId)"
              >立即上报</el-button
            >
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

    <!-- 添加或修改设备对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <div class="contentBoxEdit">
        <el-form ref="form" :model="form" :rules="rules" label-width="220px">
          <el-col :span="15" :offset="3">
            <el-form-item label="设备名称：" prop="deviceName">
              <el-input
                v-model="form.deviceName"
                placeholder="请输入设备名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="15" :offset="3">
            <el-form-item label="是否继承上级设备别名 :" prop="inheritedAlias">
              <el-select
                v-model="form.inheritedAlias"
                placeholder=""
                filterable
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in ifInherit"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
            :span="15"
            :offset="3"
            v-if="this.form.inheritedAlias == '是'"
          >
            <el-form-item label="别名：" prop="alias">
              <el-input
                v-model="form.alias"
                placeholder="请输入别名"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col
            :span="15"
            :offset="3"
            v-if="this.form.inheritedAlias == '是'"
          >
            <el-form-item label="序号：" prop="serialNumber">
              <el-input
                v-model="form.serialNumber"
                placeholder="请选择序号"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col
            :span="15"
            :offset="3"
            v-if="this.form.inheritedAlias == '否'"
          >
            <el-form-item label="别名：" prop="alias">
              <el-input v-model="form.alias" placeholder="请输入别名" />
            </el-form-item>
          </el-col>
          <el-col
            :span="15"
            :offset="3"
            v-if="this.form.inheritedAlias == '否'"
          >
            <el-form-item label="序号：" prop="serialNumber">
              <!-- <el-input v-model="form.serialNumber" placeholder="请选择序号" /> -->
              <el-select
                v-model="form.serialNumber"
                placeholder="请选择序号"
                filterable
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in serialNumberOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="15" :offset="3">
            <el-form-item label="负责人：" prop="username">
              <el-select
                v-model="form.username"
                placeholder="请选择负责人"
                filterable
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in usernameOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="15" :offset="3">
            <el-form-item label="部门：" prop="department">
              <el-select
                v-model="form.department"
                placeholder="请选择部门"
                filterable
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in departmentOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="submitForm">保 存</el-button>
          <el-button @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <!-- 对话框 -->
    <el-dialog
      :title="statusTitle"
      :visible.sync="statusOpen"
      width="630px"
      append-to-body
    >
      <el-form
        ref="statusForm"
        :model="statusForm"
        :rules="rules"
        label-width="120px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="继电器" prop="relayStatus">
              <el-switch
                v-model="statusForm.relayStatus"
                active-text="打开"
                inactive-text="关闭"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="灯状态" prop="lightStatus">
              <el-switch
                v-model="statusForm.lightStatus"
                active-text="打开"
                inactive-text="关闭"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="彩灯模式" prop="lightMode">
              <el-select
                v-model="statusForm.lightMode"
                placeholder="请选择彩灯模式"
              >
                <el-option
                  v-for="dict in lightModeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="parseInt(dict.dictValue)"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="渐变间隔/ms" prop="lightInterval">
              <el-slider
                v-model="statusForm.lightInterval"
                :min="0"
                :max="1500"
                show-input
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="渐变时间/ms" prop="fadeTime">
              <el-slider
                v-model="statusForm.fadeTime"
                :min="0"
                :max="1500"
                show-input
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="亮度" prop="brightness">
              <el-slider v-model="statusForm.brightness" show-input />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="红色" prop="red">
              <el-slider v-model="statusForm.red" :max="255" show-input />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="绿色" prop="green">
              <el-slider v-model="statusForm.green" :max="255" show-input />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="蓝色" prop="blue">
              <el-slider v-model="statusForm.blue" :max="255" show-input />
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="center" />
        <el-row>
          <el-col :span="11">
            <el-form-item label="空气温度" prop="airTemperature">
              <el-tag placeholder="请输入空气温度" type="success">
                {{ statusForm.airTemperature }} ℃
              </el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="空气湿度" prop="airHumidity">
              <el-tag placeholder="请输入空气湿度" type="success">
                {{ statusForm.airHumidity }} %RH
              </el-tag>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="statusSubmitForm(false)"
          >确 定</el-button
        >
        <el-button type="success" @click="statusSubmitForm(true)"
          >应 用</el-button
        >
        <el-button @click="statusCancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 设备配置对话框 -->
    <el-dialog
      :title="setTitle"
      :visible.sync="setOpen"
      width="630px"
      append-to-body
    >
      <el-form
        ref="setForm"
        :model="setForm"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="上报状态：" prop="isRadar">
          <el-switch
            v-model="setForm.isRadar"
            active-text="打开"
            inactive-text="关闭"
            :active-value="0"
            :inactive-value="1"
          />
        </el-form-item>

        <el-form-item label="级联配置：" prop="isAlarm">
          <el-switch
            v-model="setForm.isAlarm"
            active-text="打开"
            inactive-text="关闭"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>

        <el-form-item label="自动组网监测时间：" prop="radarInterval">
          <el-slider
            v-model="setForm.radarInterval"
            :min="1"
            :max="60"
            show-input
          />
        </el-form-item>

        <el-divider content-position="center" />
        <el-form-item label="过滤配置：" prop="isRfControl">
          <el-switch
            v-model="setForm.isRfControl"
            active-text="打开"
            inactive-text="关闭"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="日志转发：" prop="isRfLearn">
          <el-switch
            v-model="setForm.isRfLearn"
            active-text="打开"
            inactive-text="关闭"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="国密通道：" prop="isRfClear">
          <el-switch
            v-model="setForm.isRfClear"
            active-text="打开"
            inactive-text="关闭"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="按键一" prop="rfOneFunc">
              <el-select v-model="setForm.rfOneFunc" placeholder="请选择按键一">
                <el-option
                  v-for="dict in rfFuncOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="parseInt(dict.dictValue)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="按键二" prop="rfTwoFunc">
              <el-select v-model="setForm.rfTwoFunc" placeholder="请选择按键二">
                <el-option
                  v-for="dict in rfFuncOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="parseInt(dict.dictValue)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="按键三" prop="rfThreeFunc">
              <el-select
                v-model="setForm.rfThreeFunc"
                placeholder="请选择按键三"
              >
                <el-option
                  v-for="dict in rfFuncOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="parseInt(dict.dictValue)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="按键四" prop="rfFourFunc">
              <el-select
                v-model="setForm.rfFourFunc"
                placeholder="请选择按键四"
              >
                <el-option
                  v-for="dict in rfFuncOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="parseInt(dict.dictValue)"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="center" />
        <el-form-item label="端口管理：" prop="isReset">
          <el-switch
            v-model="setForm.isReset"
            active-text="打开"
            inactive-text="关闭"
            :active-value="1"
            :inactive-value="0"
            active-color="#f56c6c"
          />
        </el-form-item>
        <el-form-item label="自动升级：" prop="isAp">
          <el-switch
            v-model="setForm.isAp"
            active-text="打开"
            inactive-text="关闭"
            :active-value="1"
            :inactive-value="0"
            active-color="#f56c6c"
          />
        </el-form-item>

        <!-- <el-form-item label="托管" prop="isHost">
          <el-select v-model="setForm.isHost" placeholder="是否托管">
            <el-option
              v-for="dict in isHostOptions"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="setSubmitForm(false)"
            >保 存</el-button
          >
          <el-button @click="setCancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>

    <!-- 查看设备详情 -->
    <el-dialog
      :title="title"
      :visible.sync="detailOpenDialog"
      width="900px"
      append-to-body
    >
      <div class="contentBox">
        <div class="information">设备属性</div>
        <el-form
          ref="form"
          label-width="125px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="设备名称 :">
                <tooltip :content="detailData.deviceName" :length="10" />
                <!-- {{ detailData.deviceName }} -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备类型 :">
                <tooltip :content="detailData.deviceType" :length="5" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运行状态 :">
                {{ detailData.status }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="授权状态 :">
                {{ detailData.authorizationType }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备SN号 :">
                {{ detailData.deviceSn }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备硬件版本号 :">
                {{ detailData.versionNumber }}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="设备ROM版本号 :">
                {{ detailData.romVersionNumbe }}
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="8">
              <el-form-item label="设备IP :">
                {{ detailData.networkIp }}
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="负责人 :">
                {{ detailData.username }}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="部门 :">
                {{ detailData.department }}
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="区域 :">
                {{ detailData.networkAddress }}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="发现时间 :">
                {{ detailData.createTime }}
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="授权时间 :">
                {{ detailData.authorizationTime }}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="最后活跃时间 :">
                {{ detailData.lastActiveTime }}
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
         <div class="information">证书信息</div>
        <el-form
          ref="form"
          label-width="120px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="证书序列号 :">
                {{ detailData.certificateSerialNumber }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签名算法 :">
                <tooltip :content="detailData.signatureAlgorithm" :length="40" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="颁发者 :">
                {{ detailData.issuer }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="使用者 :">
                {{ detailData.deviceUsers }}
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="证书有效期 :">
                {{ detailData.certificateStartTime }} 至 {{ detailData.certificateEndTime }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">性能属性</div>
        <el-form
          ref="form"
          label-width="90px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <!-- <el-col :span="8">
              <el-form-item label="温度 :">
                {{ detailData.temperature }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电压 :">
                <tooltip :content="detailData.voltage" :length="40" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="湿度 :">
                {{ detailData.humidity }}
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="8">
              <el-form-item label="方向角 :">
                {{ detailData.yaw }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="横滚角 :">
                {{ detailData.roll }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="震动幅度 :">
                {{ detailData.acc }}
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="8">
              <el-form-item label="CPU使用率 :">
                {{ detailData.cpu }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="内存使用率 :">
                {{ detailData.mem }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="磁盘使用率 :">
                {{ detailData.disk }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态 :">
                {{ detailData.state }}
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
        <div class="echartsCss">
          <eventTrend
            :event-type="2"
            :name="'device'"
            :search="'event_ztwe'"
            :tipname="'网卡1流量统计'"
          />
          <eventTrend
            :event-type="2"
            :name="'device'"
            :search="'event_ztwe'"
            :tipname="'网卡2流量统计'"
          />
        </div>
        <div class="information">接口属性</div>
        <el-table :data="ListInterfaceProperties" tooltip-effect="light">
          <el-table-column
            label="接口名称"
            align="center"
            prop="interfaceName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="接口号"
            align="center"
            prop="interfaceNumber"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="接口类型"
            align="center"
            prop="interfaceType"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="接口速率"
            align="center"
            prop="interfaceRate"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="接口地址"
            align="center"
            prop="interfaceAddress"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="接口状态"
            align="center"
            prop="interfaceState"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="过滤器"
            align="center"
            prop="interfaceFilter"
            :show-overflow-tooltip="true"
          />
        </el-table>
        <div class="information">任务列表</div>
        <el-table :data="TaskList" tooltip-effect="light">
          <el-table-column
            label="任务名称"
            align="center"
            prop="taskName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="任务类型"
            align="center"
            prop="taskType"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="任务状态"
            align="center"
            prop="taskState"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="最近执行时间"
            align="center"
            prop="executionTime"
            :show-overflow-tooltip="true"
          />
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="confirm"
              >确 认</el-button
            >
            <el-button size="small" @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!-- 配置 -->
    <el-dialog
      :title="title"
      :visible.sync="handleSetDetailDialog"
      width="700px"
      append-to-body
    >
      <div class="contentBoxSet">
        <el-form ref="setForm" :model="setForm" :rules="rules" label-width="220px">
          <el-col :span="15" :offset="3">
            <el-form-item label="上报时间间隔：" prop="timeInterval">
              <el-slider
                v-model="setForm.timeInterval"
                :min="1"
                :max="60"
                show-input
              />
            </el-form-item>
          </el-col>
          <el-col :span="15" :offset="3">
            <el-form-item label="级联配置：" prop="cascadeConfigurationState">
              <el-radio-group v-model="setForm.cascadeConfigurationState">
                <el-radio-button label="开启">开启</el-radio-button>
                <el-radio-button label="关闭">关闭</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="15" :offset="3">
            <el-form-item label="组网模式：" prop="networkingMode">
              <el-select
                v-model="setForm.networkingMode"
                placeholder="请选择组网模式"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in retainerStatus"
                  :key="index"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="15" :offset="3">
            <el-form-item
              label="自动组网监测时间："
              prop="automaticNetworkingDetectionTime"
            >
              <el-slider
                v-model="setForm.automaticNetworkingDetectionTime"
                :min="1"
                :max="60"
                show-input
              />
            </el-form-item>
          </el-col>
          <el-col :span="15" :offset="3">
            <el-form-item label="过滤配置：" prop="filterConfigurationState">
              <el-radio-group v-model="setForm.filterConfigurationState">
                <el-radio-button label="开启">开启</el-radio-button>
                <el-radio-button label="关闭">关闭</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <div v-if="this.setForm.filterConfigurationState === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="过滤信息：" prop="filterInformation">
                <el-select
                  v-model="setForm.filterInformation"
                  placeholder="请选择过滤信息"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in informationStatus"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="15" :offset="3">
            <el-form-item label="日志转发：" prop="logForwardingStatus">
              <el-radio-group v-model="setForm.logForwardingStatus">
                <el-radio-button label="开启">开启</el-radio-button>
                <el-radio-button label="关闭">关闭</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <div v-if="this.setForm.logForwardingStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="目的IP：" prop="logDestinationIp">
                <el-input
                  v-model="setForm.logDestinationIp"
                  placeholder="请输入目的IP"
                />
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.logForwardingStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item
                label="目的端口号："
                prop="logDestinationPortNumber"
              >
                <el-input
                  v-model="setForm.logDestinationPortNumber"
                  placeholder="请输入目的端口号"
                />
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.logForwardingStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="协议：" prop="agreement">
                <el-select
                  v-model="setForm.agreement"
                  placeholder="请选择协议"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in agreementStatus"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.logForwardingStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="源IP：" prop="logSourceIp">
                <el-input
                  v-model="setForm.logSourceIp"
                  placeholder="请输入源IP"
                />
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.logForwardingStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="源端口号：" prop="logSourcePortNumber">
                <el-input
                  v-model="setForm.logSourcePortNumber"
                  placeholder="请输入源端口号"
                />
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="15" :offset="3">
            <el-form-item label="国密通道：" prop="stateSecretChannelStatus">
              <el-radio-group v-model="setForm.stateSecretChannelStatus">
                <el-radio-button label="开启">开启</el-radio-button>
                <el-radio-button label="关闭">关闭</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <div v-if="this.setForm.stateSecretChannelStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="目的IP：" prop="stateDestinationIp">
                <el-input
                  v-model="setForm.stateDestinationIp"
                  placeholder="请输入目的IP"
                />
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.stateSecretChannelStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item
                label="目的端口号："
                prop="stateDestinationPortNumber"
              >
                <el-input
                  v-model="setForm.stateDestinationPortNumber"
                  placeholder="请输入目的端口号"
                />
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.stateSecretChannelStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="源IP：" prop="stateSourceIp">
                <el-input
                  v-model="setForm.stateSourceIp"
                  placeholder="请输入源IP"
                />
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.stateSecretChannelStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="源端口号：" prop="stateSourcePortNumber">
                <el-input
                  v-model="setForm.stateSourcePortNumber"
                  placeholder="请输入源端口号"
                />
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="15" :offset="3">
            <el-form-item label="端口管理：" prop="portManagementStatus">
              <el-radio-group v-model="setForm.portManagementStatus">
                <el-radio-button label="开启">开启</el-radio-button>
                <el-radio-button label="关闭">关闭</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <div v-if="this.setForm.portManagementStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="端口号：" prop="portNumber">
                <el-select
                  v-model="setForm.portNumber"
                  placeholder="请选择端口号"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in portNumberStatus"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.portManagementStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="端口类型：" prop="portType">
                <el-select
                  v-model="setForm.portType"
                  placeholder="请选择端口类型"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in portNumberType"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.portManagementStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="端口状态：" prop="portStatus">
                <el-select
                  v-model="setForm.portStatus"
                  placeholder="请选择端口状态"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in portStatusOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.portManagementStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="传输速率：" prop="transmissionSpeed">
                <el-input
                  v-model="setForm.transmissionSpeed"
                  placeholder="请输入传输速率"
                />
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.portManagementStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="端口地址：" prop="portAddress">
                <el-input
                  v-model="setForm.portAddress"
                  placeholder="请输入端口地址"
                />
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.portManagementStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="预处理过滤器：" prop="pretreatmentFilter">
                <el-select
                  v-model="setForm.pretreatmentFilter"
                  placeholder="请选择预处理过滤器"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in pretreatmentOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.portManagementStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item
                label="过滤器运行参数："
                prop="filterOperatingParameters"
              >
                <el-select
                  v-model="setForm.filterOperatingParameters"
                  placeholder="请选择过滤器运行参数"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in pretreatmentOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <div v-if="this.setForm.portManagementStatus === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="网关地址：" prop="defaultGateway">
                <el-input
                  v-model="setForm.defaultGateway"
                  placeholder="请输入网关地址"
                />
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="15" :offset="3">
            <el-form-item label="自动升级：" prop="upgradeState">
              <el-radio-group v-model="setForm.upgradeState">
                <el-radio-button label="开启">开启</el-radio-button>
                <el-radio-button label="关闭">关闭</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <div v-if="this.setForm.upgradeState === '开启'">
            <el-col :span="15" :offset="3">
              <el-form-item label="升级包地址：" prop="upgradePackageAddress">
                <el-input
                  v-model="setForm.upgradePackageAddress"
                  placeholder="请输入升级包地址："
                />
              </el-form-item>
            </el-col>
          </div>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="saveUpgradeForm()">保 存</el-button>
          <el-button @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <!-- 升级 -->
    <el-dialog
      :title="title"
      :visible.sync="upgradeDialog"
      width="700px"
      append-to-body
    >
      <div class="contentBoxUpgrade">
        <el-form
          ref="upgradeForm"
          :model="upgradeForm"
          :rules="rules"
          label-width="220px"
        >
          <el-col :span="15" :offset="3">
            <el-form-item label="目前的硬件版本：" prop="HardwareVersion">
              <el-input
                v-model="upgradeForm.versionNumber"
                placeholder="请输入目前的硬件版本"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="15" :offset="3">
            <el-form-item label="目前的软件版本：" prop="HardwareVersion">
              <el-input
                v-model="upgradeForm.romVersionNumber"
                placeholder="请输入目前的软件版本"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="submitUpgradeForm()"
            >检测升级</el-button
          >
          <el-button @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="promptMessageDialog"
      width="30%"
    >
      <span class="promptMessage"><i class='el-icon-info' style=' color: #ffaf37;font-size:20px' />暂无升级</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="promptMessageDialog = false">取 消</el-button>
        <el-button type="primary" @click="promptMessageDialog = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { authorizationType } from "@/api/system/list";
import {
  deviceListDetail,
  TaskListDetail,
  interfacePropertiesDetail,
  handleSetDetail,
} from "@/api/system/detail";
import {
  listDevice,
  UsernameAndDepartmentOptions,
  getDevice,
  delDevice,
  addDevice,
  updateDevice,
  exportDevice,
  handleSetDevice
} from "@/api/system/device";
import { getNewStatus, updateStatus } from "@/api/system/status";
import { getNewSet, updateSet } from "@/api/system/set";
import { listCategory } from "@/api/system/category";
import eventTrend from "@/components/Echarts/eventTrend";

export default {
  name: "Device",
  components: { eventTrend },
  data() {
    return {
      retainerStatus: [
        {
          label: "自动组网",
          value: "自动组网",
        },
        {
          label: "手动组网",
          value: "自动组网",
        },
      ],
      informationStatus: [
        {
          label: "日志转发",
          value: "日志转发",
        },
        {
          label: "级连配置",
          value: "级连配置",
        },
        {
          label: "端口管理",
          value: "端口管理",
        },
        {
          label: "国密通道",
          value: "国密通道",
        },
      ],
      agreementStatus: [
        {
          label: "TCP",
          value: "TCP",
        },
        {
          label: "UDP",
          value: "UDP",
        },
      ],
      portNumberStatus: [
        {
          label: "UA0",
          value: "UA0",
        },
        {
          label: "UA1",
          value: "UA1",
        },
        {
          label: "UA2",
          value: "UA2",
        },
        {
          label: "UA3",
          value: "UA3",
        },
        {
          label: "UB0",
          value: "UB0",
        },
        {
          label: "UB1",
          value: "UB1",
        },
        {
          label: "UB2",
          value: "UB2",
        },
        {
          label: "UB3",
          value: "UB3",
        },
        {
          label: "UC0~UC3",
          value: "UC0~UC3",
        },
        {
          label: "UN0~UN1",
          value: "UN0~UN1",
        },
        {
          label: "G10~G131",
          value: "G10~G131",
        },
        {
          label: "GO0~GO31",
          value: "G10~G131",
        },
        {
          label: "GA0~GA7",
          value: "GA0~GA7",
        },
        {
          label: "GD0~GD7",
          value: "GD0~GD7",
        },
        {
          label: "ETH0~ETH5",
          value: "ETH0~ETH5",
        },
        {
          label: "WLAN0~WLAN2",
          value: "WLAN0~WLAN2",
        },
        {
          label: "ME1~ME2",
          value: "ME1~ME2",
        },
      ],
      portNumberType: [
        {
          label: "RS485",
          value: "RS485",
        },
        {
          label: "RS422",
          value: "RS422",
        },
        {
          label: "RS232",
          value: "RS232",
        },
        {
          label: "CAN",
          value: "CAN",
        },
        {
          label: "GPIO-IN",
          value: "GPIO-IN",
        },
        {
          label: "GPIO-OUT",
          value: "GPIO-OUT",
        },
        {
          label: "A/D",
          value: "A/D",
        },
        {
          label: "D/A",
          value: "D/A",
        },
        {
          label: "LAN",
          value: "LAN",
        },
        {
          label: "WLAN",
          value: "WLAN",
        },
        {
          label: "4G/5G",
          value: "4G/5G",
        },
      ],
      portStatusOptions: [
        {
          label: "打开",
          value: "打开",
        },
        {
          label: "关闭",
          value: "关闭",
        },
      ],
      pretreatmentOptions: [
        {
          label: "100_ZY07B",
          value: "100_ZY07B",
        },
        {
          label: "000_ORIGIN",
          value: "000_ORIGIN",
        },
        {
          label: "001_SNIFF",
          value: "001_SNIFF",
        },
      ],
      sels: [],
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
      upgradeForm: {
        versionNumber: "",
        romVersionNumber: "",
      },
      ListInterfaceProperties: [],
      TaskList: [],
      detailOpenDialog: false,
      handleSetDetailDialog: false,
      usernameOptions: [],
      departmentOptions: [],
      serialNumberOptions: [
        {
          label: "1,关闭,3...",
          value: "1",
        },
        {
          label: "|,||,|||...",
          value: "|",
        },
        {
          label: "a,b,c...",
          value: "a",
        },
      ],
      // 表单参数
      form: {
        deviceName: "",
        inheritedAlias: "是",
        alias: "",
        serialNumber: "",
        username: "",
        department: "",
      },
      setForm: {
        cascadeConfigurationState: "开启",
        networkingMode:"",
        timeInterval:"",
        automaticNetworkingDetectionTime:"",
        filterConfigurationState: "开启",
        filterInformation:"",
        logForwardingStatus: "开启",
        logDestinationIp:"",
        logDestinationPortNumber:"",
        agreement:"",
        logSourceIp:"",
        logSourcePortNumber:"",
        stateSecretChannelStatus:"",
        stateDestinationIp:"",
        stateDestinationPortNumber:"",
        stateSourceIp:"",
        stateSourcePortNumber:"",
        setsta_secret_passage: "开启",
        portManagementStatus: "开启",
        portNumber:"",
        portType:"",
        portStatus:"",
        transmissionSpeed:"",
        portAddress:"",
        pretreatmentFilter:"",
        filterOperatingParameters:"",
        defaultGateway:"",
        upgradeState:"1",
        upgradePackageAddress: "",
      },
      ifInherit: [
        {
          label: "是",
          value: "是",
        },
        {
          label: "否",
          value: "否",
        },
      ],
      // 遮罩层
      loading: true,
      // 选中数组

      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      // showSearch: true,
      // 总条数
      total: 0,
      // 设备表格数据
      deviceList: [],
      // 弹出层标题
      title: "",
      statusTitle: "",
      setTitle: "",
      // 是否显示弹出层
      open: false,
      statusOpen: false,
      setOpen: false,
      upgradeDialog: false,
      promptMessageDialog: false,
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 分类
      categoryList: [],
      categoryDeviceList: [
        {
          label: "汇聚网关",
          value: "汇聚网关",
        },
        {
          label: "接入网关",
          value: "接入网关",
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
      ],
      categoryDeviceStatus: [
        {
          label: "在线",
          value: 3,
        },
        {
          label: "异常",
          value: 4,
        },
      ],
      categoryDeviceAuthorizationState: [
        {
          label: "已授权",
          value: "已授权",
        },
        {
          label: "未授权",
          value: "未授权",
        },
      ],
      // 继电器字典
      openCloseOptions: [
        {
          label: "打开",
          value: 1,
        },
        {
          label: "关闭",
          value: 0,
        },
      ],
      // 灯状态字典
      yesNoOptions: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      // 在线字典
      isOnlineOptions: [
        {
          label: "在线",
          value: 1,
        },
        {
          label: "离线",
          value: 0,
        },
      ],
      // 触发源字典
      triggerSourceOptions: [],
      // 彩灯模式字典
      lightModeOptions: [],

      // 按键字典
      rfFuncOptions: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deviceName: "",
        deviceType: "",
        status: "",
        authorizationType: "",
        versionNumber: "",
        romVersionNumber: "",
        networkAddress: "",
        username: "",
      },
      queryParamsOptions: {},
      // 查询参数
      // queryParams: {
      //   pageNum: 1,
      //   pageSize: 10,
      //   orderByColumn: 'creation_time ',
      //   isAsc: 'desc',
      //   deviceId: '',
      //   eventType: '',
      //   notificationName: '',
      //   notificationStatus: '',
      //   leader: '',
      //   beginCreationTime: '',
      //   endCreationTime: ''
      // },
      statusForm: {},
      setForm: {},
      // 表单校验
      rules: {
        deviceNum: [
          { required: true, message: "编号不能为空", trigger: "blur" },
        ],
        deviceName: [
          { required: true, message: "名称不能为空", trigger: "blur" },
        ],
        categoryId: [
          { required: true, message: "设备分类不能为空", trigger: "blur" },
        ],
        firmwareVersion: [
          { required: true, message: "版本号不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
    this.getUsernameAndDepartmentOptions();
  },
  methods: {
    handleSelectionChange(sels) {
      this.sels = sels;
      console.log(
        "选中的值",
        sels.map((item) => item.deviceId)
      );
    },
    authorization() {
      // console.log('sels',this.sels)
      this.$confirm("确认要授权吗？", "提示", { type: "warning" })
        .then(() => {
          let ids = this.sels.map((item) => item.deviceId);
          console.log("ids", ids);
          authorizationType(ids).then((res) => {
            this.$message({
              type: "success",
              message: "授权成功!",
            });
            setTimeout(() => {
              this.getList();
            }, 500);
          });
        })
        .catch(() => {});
    },
    getList() {
      this.loading = true;
      listDevice(this.queryParams).then((response) => {
        this.deviceList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getUsernameAndDepartmentOptions() {
      UsernameAndDepartmentOptions(this.queryParamsOptions).then((response) => {
        this.usernameOptions = response;
        this.departmentOptions = response;
      });
    },
    async detail(id) {
      await deviceListDetail(id).then(({ data }) => {
        this.detailOpenDialog = true;
        this.title = "设备详情";
        this.detailData = data;
         this.detailData.status = this.transTypeDic(this.detailData.status);
      });
      await interfacePropertiesDetail(id).then(({ data }) => {
        console.log("data-7-20", data);
        this.ListInterfaceProperties = data;
      });
      await TaskListDetail(id).then(({ data }) => {
        this.TaskList = data;
      });
    },
    async upgrade(id) {
      await deviceListDetail(id).then(({ data }) => {
        console.log("data---升级", data);
        this.upgradeDialog = true;
        this.title = "升级";
        this.upgradeForm = data;
      });
    },
    //  升级保存
    async submitUpgradeForm() {
      this.promptMessageDialog = true;
      this.upgradeDialog = false;
    },
    saveUpgradeForm(){
      handleSetDevice(this.setForm).then((response) => {
            this.msgSuccess("配置成功");
            this.handleSetDetailDialog = false;
            this.getList();
          });
    },
    // 查询设备分类
    getCategoryList() {
      listCategory(this.queryParams).then((response) => {
        this.categoryList = response.rows;
      });
    },
    // 分类翻译
    categoryFormat(row, column) {
      var name = "";
      for (var i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].categoryId == row.categoryId) {
          name = this.categoryList[i].categoryName;
          break;
        }
      }
      return name;
    },
    // 触发源字典翻译
    triggerSourceFormat(row, column) {
      return this.selectDictLabel(this.triggerSourceOptions, row.triggerSource);
    },
    // 彩灯模式字典翻译
    lightModeFormat(row, column) {
      return this.selectDictLabel(this.lightModeOptions, row.lightMode);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.detailOpenDialog = false;
      this.upgradeDialog = false;
      this.handleSetDetailDialog = false;
      this.reset();
    },
    statusCancel() {
      this.statusOpen = false;
      this.statusReset();
    },
    setCancel() {
      this.setOpen = false;
      this.setReset();
    },
    // 表单重置
    reset() {
      this.form = {
        deviceId: null,
        deviceNum: null,
        categoryId: null,
        deviceName: null,
        firmwareVersion: null,
        ownerId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
      };
      this.resetForm("form");
    },
    statusReset() {
      this.statusForm = {
        deviceStatusId: null,
        deviceId: null,
        deviceNum: null,
        relayStatus: null,
        lightStatus: null,
        isOnline: null,
        deviceTemperature: null,
        rssi: null,
        airTemperature: null,
        airHumidity: null,
        triggerSource: null,
        brightness: null,
        lightInterval: null,
        fadeTime: null,
        lightMode: null,
        red: null,
        green: null,
        blue: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
      };
      this.resetForm("statusForm");
    },
    setReset() {
      this.setForm = {
        deviceSetId: null,
        deviceId: null,
        deviceNum: null,
        isAlarm: null,
        isRadar: null,
        radarInterval: null,
        isHost: null,
        isReset: null,
        isAp: null,
        isWifiOffline: null,
        isOpenCertifi: null,
        isRfControl: null,
        isRfLearn: null,
        isRfClear: null,
        rfOneFunc: null,
        rfTwoFunc: null,
        rfThreeFunc: null,
        rfFourFunc: null,
        ownerId: null,
        networkAddress: null,
        networkIp: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
      };
      this.resetForm("setForm");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeCreateTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加设备";
    },
    //升级
    handleUpgrade() {
      this.promptMessageDialog = true;
      this.getList();
    },
     transTypeDic(val) {
      var t = [
        {
          name: 3,
          content: "在线",
        },
        {
          name: 4,
          content: "异常",
        },
      ];
      const orgTreeData1 = t
        .filter((e) => e.name === val)
        .map(({ content }) => ({
          content,
        }));
      return `${orgTreeData1[0].content}`;
    },
    /** 修改按钮操作 */
    async handleUpdate(id) {
      const { data } = await deviceListDetail(id);
      //  this.detailData = data;
      console.log("data", data);
      this.form = data;
      this.form.inheritedAlias = "是";

      // this.reset()
      // const deviceId = row.deviceId || this.ids
      // getDevice(deviceId).then(response => {
      //   this.form = response.data
      this.open = true;
      this.title = "修改设备";
      // })
    },
    async report(id) {
      await deviceListDetail(id).then(({ data }) => {
        this.$message({
          type: "success",
          message: "上报成功",
        });
      });
    },
    /** 状态按钮操作 */
    handleStatus(row) {
      this.reset();
      const deviceId = row.deviceId || this.ids;
      getNewStatus(deviceId).then((response) => {
        this.statusForm = response.data;
        this.statusOpen = true;
        this.statusTitle = "设备状态";
      });
    },
    /** 配置按钮操作 */
    async handleSet(id) {
      const { data } = await handleSetDetail(id);
      console.log("data-7-18", data);
      // this.setOpen = true;
      this.handleSetDetailDialog = true;
      this.title = "配置设备";
      // // this.detailData = this.detailDataApi;
      this.setForm = data;
      // this.reset();
      // const deviceId = row.deviceId || this.ids;
      // getNewSet(deviceId).then((response) => {
      //   this.setForm = response.data;

      //   this.setTitle = "配置设备";
      // });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateDevice(this.form).then((response) => {
            this.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    confirm() {
      this.detailOpenDialog = false;
    },
    /** 状态提交按钮 */
    statusSubmitForm(isApply) {
      this.$refs["statusForm"].validate((valid) => {
        if (valid) {
          if (this.statusForm.deviceStatusId != null) {
            updateStatus(this.statusForm).then((response) => {
              this.msgSuccess("更新成功");
              if (!isApply) {
                this.statusOpen = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 设置提交按钮 */
    setSubmitForm(isApply) {
      this.setOpen = false;
      this.$refs["setForm"].validate((valid) => {
        if (valid) {
          if (this.setForm.deviceSetId != null) {
            updateSet(this.setForm).then((response) => {
              this.msgSuccess("更新成功");
              if (!isApply) {
                this.setOpen = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const deviceIds = row.deviceId || this.ids;
      this.$confirm(
        '是否确认删除设备编号为"' + deviceIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delDevice(deviceIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有设备数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportDevice(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.promptMessage{
  padding-left: 30px;
}
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
  height: 80vh;
  overflow: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
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
  .echartsCss {
    height: 400px;
  }
  .dialog-footer {
    margin-top: 10px;
  }
}
.contentBoxSet {
  height: 60vh;
  overflow: auto;
  overflow-y: scroll;
  overflow-x: hidden;
}
.contentBoxUpgrade {
  height: 180px;
  // overflow: auto;
  // overflow-y: scroll;
  // overflow-x: hidden;
  width: 100%;
  border-top: 1px solid #ccc;
  padding: 10px 20px;
}
.contentBoxEdit {
  height: 380px;
  // overflow: auto;
  // overflow-y: scroll;
  // overflow-x: hidden;
  width: 100%;
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
  .dialog-footer {
    margin-top: 10px;
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
</style>
