<template>
  <div class="app-container">
    <el-card class="box-card">
        <el-form
      ref="queryForm"
      :model="queryParams"
      class="label-type"
      label-width="108px"
    >
     <el-col :span="6">
      <el-form-item label="任务类型：" prop="deviceNum">
        <el-input
          v-model="queryParams.deviceNum"
          placeholder="请输入设备名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     </el-col>
     <el-col :span="6">
      <el-form-item label="任务状态：" prop="categoryId">
        <el-select
          v-model="queryParams.categoryId"
          placeholder="请选择设备类型"
          clearable
          size="small"
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
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          @click="handleQuery"
        >搜索</el-button>
        <el-button
          size="mini"
          @click="resetQuery"
        >重置</el-button>
      </el-form-item>
     </el-col>
    </el-form>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:device:add']"
          type="primary"
          plain
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:device:edit']"
          type="success"
          plain
          size="mini"
          @click="handleUpdate()"
        >编辑</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:device:export']"
          type="warning"
          plain
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
       <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:device:export']"
          type="warning"
          plain
          size="mini"
          @click="handleExport"
        >删除</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
      </el-row>
      <el-table
      v-loading="loading"
      :data="deviceList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45" align="center" />
      <el-table-column label="任务名称" align="center" prop="deviceNum" />
      <el-table-column label="任务类型" align="center" prop="deviceName" />
      <el-table-column
        label="设备名称"
        align="center"
        prop="categoryId"
        :formatter="categoryFormat"
      />
      <el-table-column label="任务进度" align="center" prop="nickName" />
      <el-table-column label="任务状态" align="center" prop="firmwareVersion" />
      <el-table-column label="任务开始时间" align="center" prop="nickName" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['system:device:edit']"
            size="mini"
            type="text"
            @click="detail(scope.row)"
          >预览报告</el-button>
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
           <el-form ref="form" :model="form" :rules="rules" label-width="120px">
         <el-col :span="15" :offset="3" >
           <el-form-item label="任务名称：" prop="deviceNum">
             <el-input
                v-model="form.deviceNum"
                placeholder="请输入任务名称"
             />
            </el-form-item>
         </el-col>
         <el-col :span="15" :offset="3" >
           <el-form-item label="任务类型：" prop="deviceNum">
             <el-input
                v-model="form.deviceNum"
                placeholder="请输入任务类型"
             />
            </el-form-item>
         </el-col>
         <el-col :span="15" :offset="3" >
           <el-form-item label="配置模板：" prop="deviceNum">
             <el-input
                v-model="form.deviceNum"
                placeholder="请输入配置模板"
             />
            </el-form-item>
         </el-col>
        <el-col :span="15" :offset="3" >
           <el-form-item label="选择设备：" prop="deviceNum">
             <el-input
                v-model="form.deviceNum"
                placeholder="请输入选择设备"
             />
            </el-form-item>
         </el-col>
        <el-col :span="15" :offset="3" >
           <el-form-item label="立即执行：" prop="deviceNum">
             <el-input
                v-model="form.deviceNum"
                placeholder="请输入负立即执行"
             />
            </el-form-item>
         </el-col>
          <el-col :span="15" :offset="3" >
           <el-form-item label="选择执行时间：" prop="deviceNum">
             <el-input
                v-model="form.deviceNum"
                placeholder="请选择执行时间"
             />
            </el-form-item>
         </el-col>
      </el-form>
      </div>
    
      <div slot="footer" class="dialog-footer">
        <el-row  type="flex" justify="center">
            <el-button type="primary" @click="submitForm">保 存</el-button>
            <el-button @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <!-- 添加或修改设备状态对话框 -->
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
              <el-slider
                v-model="statusForm.brightness"
                show-input
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="红色" prop="red">
              <el-slider
                v-model="statusForm.red"
                :max="255"
                show-input
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="绿色" prop="green">
              <el-slider
                v-model="statusForm.green"
                :max="255"
                show-input
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="蓝色" prop="blue">
              <el-slider
                v-model="statusForm.blue"
                :max="255"
                show-input
              />
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
        <el-button type="primary" @click="statusSubmitForm(false)">确 定</el-button>
        <el-button type="success" @click="statusSubmitForm(true)">应 用</el-button>
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
      <el-form ref="setForm" :model="setForm" :rules="rules" label-width="140px">
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
              <el-select v-model="setForm.rfThreeFunc" placeholder="请选择按键三">
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
              <el-select v-model="setForm.rfFourFunc" placeholder="请选择按键四">
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
            <el-button type="primary" @click="setSubmitForm(false)">保 存</el-button>
            <el-button @click="setCancel">取 消</el-button>
        </el-row>
       
      </div>
    </el-dialog>

      <!-- 查看设备详情 -->
    <el-dialog :title="title" :visible.sync="detailOpenDialog" width="900px" append-to-body>
      <div class="contentBox">
        <div class="information">任务详情</div>
        <el-form
          ref="form"
          label-width="125px"
          label-position="left"
          class="label-type"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="任务名称 :">
                {{ detailData.reportName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任务类型 :">
                <tooltip :content="detailData.reportType" :length="40" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配置模板 :">
                {{ detailData.reportCycle }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备名称 :">
                {{ detailData.status }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任务开始时间 :">
                {{ detailData.lastExecutionTime }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任务结束时间 :">
                {{ detailData.nextExecutionTime }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任务状态 :">
                {{ detailData.InformTheWay }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建人 :">
                {{ detailData.Notify }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">执行结果</div>
          <el-table :data="TaskList" tooltip-effect="light">
          <el-table-column
            label="设备名称"
            align="center"
            prop="reportTimeRange"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="设备IP"
            align="center"
            prop="executionTime"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="设备类型"
            align="center"
            prop="executionStatus"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="执行结果"
            align="center"
            prop="executionTime"
            :show-overflow-tooltip="true"
          />
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="confirm"
              >保 存</el-button
            >
            <el-button size="small" @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!-- 升级 -->
     <el-dialog :title="title" :visible.sync="upgradeDialog" width="700px" append-to-body>
      <div class="contentBoxEdit">
        <el-form ref="form" :model="form" :rules="rules" label-width="220px">
         <el-col :span="15" :offset="3" >
           <el-form-item label="目前的硬件版本：" prop="HardwareVersion">
             <el-input
                v-model="form.HardwareVersion"
                placeholder="请输入目前的硬件版本"
             />
            </el-form-item>
         </el-col>
         <el-col :span="15" :offset="3" >
           <el-form-item label="目前的软件版本：" prop="HardwareVersion">
             <el-input
                v-model="form.HardwareVersion"
                placeholder="请输入目前的软件版本"
             />
            </el-form-item>
         </el-col>
      </el-form>
      </div>
    
      <div slot="footer" class="dialog-footer">
        <el-row  type="flex" justify="center">
            <el-button type="primary" @click="submitUpgradeForm">检测升级</el-button>
            <el-button @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listDevice,
  getDevice,
  delDevice,
  addDevice,
  updateDevice,
  exportDevice
} from '@/api/system/device'
import { getNewStatus, updateStatus } from '@/api/system/status'
import { getNewSet, updateSet } from '@/api/system/set'
import { listCategory } from '@/api/system/category'
import eventTrend from "@/components/Echarts/eventTrend";

export default {
  name: 'Device',
  components: {eventTrend},
  data() {
    return {
       detailData:{},
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
      ListInterfaceProperties:[
         {
          reportName: "事件统计",
          reportType: "事件统计",
          create: "管理员",
          Notify: "张三，李四，王五",
          reportCycle: "周报",
          status: "启用",
          lastExecutionTime: "2022-01-29 10:10:00",
          reportTimeRange: "2001",
          executionTime: "20220320 18:00:00",
          executionStatus: "执行中",
        },
        {
          reportName: "资产统计",
          reportType: "资产统计",
          create: "管理员",
          Notify: "张三，李四，王五",
          reportCycle: "仅执行一次",
          status: "停用",
          lastExecutionTime: "2022-01-29 10:10:00",
          reportTimeRange: "201",
          executionTime: "20220313 18:00:00",
          executionStatus: "成功",
      }],
      TaskList:[ {
          reportName: "事件统计",
          reportType: "事件统计",
          create: "管理员",
          Notify: "张三，李四，王五",
          reportCycle: "周报",
          status: "启用",
          lastExecutionTime: "2022-01-29 10:10:00",
          reportTimeRange: "201",
          executionTime: "设备探查",
          executionStatus: "执行中",
        },
        {
          reportName: "资产统计",
          reportType: "资产统计",
          create: "管理员",
          Notify: "张三，李四，王五",
          reportCycle: "仅执行一次",
          status: "停用",
          lastExecutionTime: "2022-01-29 10:10:00",
          reportTimeRange: "2001",
          executionTime: "日志下发",
          executionStatus: "成功",
        },],
      detailOpenDialog:false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 设备表格数据
      deviceList: [],
      // 弹出层标题
      title: '',
      statusTitle: '',
      setTitle: '',
      // 是否显示弹出层
      open: false,
      statusOpen: false,
      setOpen: false,
      upgradeDialog:false,
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 分类
      categoryList: [],
      categoryDeviceList:[
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
          label: "天津管片厂",
          value: "天津管片厂",
        },
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
          label: "珠海深中通道",
          value: "珠海深中通道",
        },
        {
          label: "中国交建北京数据中心",
          value: "中国交建北京数据中心",
        },
      ],
      categoryDeviceStatus:[
        {
          label: "在线",
          value: "在线",
        },
        {
          label: "异常",
          value: "异常",
        },
      ],
      categoryDeviceAuthorizationState:[
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
          label: '打开',
          value: 1
        },
        {
          label: '关闭',
          value: 0
        }
      ],
      // 灯状态字典
      yesNoOptions: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ],
      // 在线字典
      isOnlineOptions: [
        {
          label: '在线',
          value: 1
        },
        {
          label: '离线',
          value: 0
        }
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
        groupId: 0,
        deviceNum: null,
        categoryId: null,
        deviceName: null,
        firmwareVersion: null,
        ownerId: null,
        createTime: null
      },
      // 表单参数
      form: {
        HardwareVersion:'V1.6'
      },
      statusForm: {},
      setForm: {},
      // 表单校验
      rules: {
        deviceNum: [
          { required: true, message: '编号不能为空', trigger: 'blur' }
        ],
        deviceName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '设备分类不能为空', trigger: 'blur' }
        ],
        firmwareVersion: [
          { required: true, message: '版本号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCategoryList()
    this.getList()
    this.getDicts('iot_trigger_source').then(response => {
      this.triggerSourceOptions = response.data
    })
    this.getDicts('light_mode').then(response => {
      this.lightModeOptions = response.data
    })
    this.getDicts('rf_function').then(response => {
      this.rfFuncOptions = response.data
    })
  },
  methods: {
    // /** 行颜色 */
    // tableRowClassName({ row, rowIndex }) {
    //   if (rowIndex === 1) {
    //     return 'success-row'
    //   } else if (rowIndex === 3) {
    //     return 'warning-row'
    //   }
    //   return ''
    // },
    /** 查询设备列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (this.daterangeCreateTime != null && this.daterangeCreateTime != '') {
        this.queryParams.params[
          'beginCreateTime'
        ] = this.daterangeCreateTime[0]
        this.queryParams.params['endCreateTime'] = this.daterangeCreateTime[1]
      }
      listDevice(this.queryParams).then(response => {
        this.deviceList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
     detail() {
      this.detailOpenDialog = true;
      this.title = "任务报告";
      this.detailData = this.detailDataApi;
    },
    //  升级保存
    submitUpgradeForm(){
        this.upgradeDialog = false
    },
    // 查询设备分类
    getCategoryList() {
      listCategory(this.queryCategoryParams).then(response => {
        this.categoryList = response.rows
      })
    },
    // 分类翻译
    categoryFormat(row, column) {
      var name = ''
      for (var i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].categoryId == row.categoryId) {
          name = this.categoryList[i].categoryName
          break
        }
      }
      return name
    },
    // 触发源字典翻译
    triggerSourceFormat(row, column) {
      return this.selectDictLabel(this.triggerSourceOptions, row.triggerSource)
    },
    // 彩灯模式字典翻译
    lightModeFormat(row, column) {
      return this.selectDictLabel(this.lightModeOptions, row.lightMode)
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.detailOpenDialog = false
      this.upgradeDialog = false
      this.reset()
    },
    statusCancel() {
      this.statusOpen = false
      this.statusReset()
    },
    setCancel() {
      this.setOpen = false
      this.setReset()
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
        remark: null
      }
      this.resetForm('form')
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
        remark: null
      }
      this.resetForm('statusForm')
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
        remark: null
      }
      this.resetForm('setForm')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeCreateTime = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.deviceId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      // this.reset()
      this.open = true
      this.title = '添加设备'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
        this.open = true
        this.title = '编辑任务'
    },
    /** 状态按钮操作 */
    handleStatus(row) {
      this.reset()
      const deviceId = row.deviceId || this.ids
      getNewStatus(deviceId).then(response => {
        this.statusForm = response.data
        this.statusOpen = true
        this.statusTitle = '设备状态'
      })
    },
    /** 配置按钮操作 */
    handleSet(row) {
      this.reset()
      const deviceId = row.deviceId || this.ids
      getNewSet(deviceId).then(response => {
        this.setForm = response.data
        this.setOpen = true
        this.setTitle = '配置设备'
      })
    },
    //升级
    upgrade(){
      this.upgradeDialog = true
      this.title = "升级"
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.deviceId != null) {
            updateDevice(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addDevice(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    confirm(){
      this.detailOpenDialog = false;
    },
    /** 状态提交按钮 */
    statusSubmitForm(isApply) {
      this.$refs['statusForm'].validate(valid => {
        if (valid) {
          if (this.statusForm.deviceStatusId != null) {
            updateStatus(this.statusForm).then(response => {
              this.msgSuccess('更新成功')
              if (!isApply) {
                this.statusOpen = false
                this.getList()
              }
            })
          }
        }
      })
    },
    /** 设置提交按钮 */
    setSubmitForm(isApply) {
       this.setOpen = false
      this.$refs['setForm'].validate(valid => {
        if (valid) {
          if (this.setForm.deviceSetId != null) {
            updateSet(this.setForm).then(response => {
              this.msgSuccess('更新成功')
              if (!isApply) {
                this.setOpen = false
                this.getList()
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const deviceIds = row.deviceId || this.ids
      this.$confirm(
        '是否确认删除设备编号为"' + deviceIds + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delDevice(deviceIds)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有设备数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportDevice(queryParams)
        })
        .then(response => {
          this.download(response.msg)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 0 !important;
}
.contentBox {
  height: 50vh;
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
.contentBoxEdit{
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
