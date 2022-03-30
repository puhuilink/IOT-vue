/******************************************************************************
 * 作者：kerwincui
 * 时间：2021-06-08
 * 邮箱：164770707@qq.com
 * 源码地址：https://gitee.com/kerwincui/wumei-smart
 * author: kerwincui
 * create: 2021-06-08
 * email：164770707@qq.com
 * source:https://github.com/kerwincui/wumei-smart
 ******************************************************************************/
<template>
  <div class="app-container">
    <!-- <el-form v-show="showSearch"
             ref="queryForm"
             :model="queryParams"
             :inline="true"
             label-width="68px">
      <el-form-item label=""
                    prop="categoryId">
        <el-select v-model="queryParams.categoryId"
                   placeholder="请选择"
                   clearable
                   size="small"
                   @change="selectChanged">
          <el-option v-for="item in allTypeList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form> -->

    <div style="padding-left:60px;padding-bottom:10px">
      <el-row :gutter="270">
        <el-col :span="4"
                class="elcolCard">
          <div class="AssetsBox">
            <div class="Assets">全部资产</div>
            <div class="AssetsNumber">{{ this.allAssets }}</div>
          </div>
        </el-col>
        <el-col :span="4"
                class="elcolCard">
          <div class="AssetsBoxOnline">
            <div class="Assets">在线的资产</div>
            <div class="AssetsNumber">{{ this.onlineAssets }}</div>
          </div>
        </el-col>
        <el-col :span="4"
                class="elcolCard">
          <div class="AssetsBoxType">
            <div class="Assets">资产类型</div>
            <div class="AssetsNumber">{{ this.AssetsType }}</div>
            <!-- <div class="ITNumberBox">
            <span class="IT">IT:</span>
            <span class="ITNumber">{{ this.ITNumber }}</span>
            <span class="IT">OT:</span>
            <span class="ITNumber">{{ this.OTNumber }}</span>
          </div> -->
            <!-- <div class="OTNumber">
            <span class="IT">0T:</span>
            <span class="ITNumber">{{ this.AssetsType }}</span>
          </div> -->
            <!-- <div class="ITNumberBox">
            <div class="left">
              <span class="IT">IT:</span>
              <span class="ITNumber">{{ this.ITNumber }}</span>

            </div>
            <div class="right">
              <span class="OT">OT:</span>
              <span class="OTNumber">{{ this.OTNumber }}</span>
            </div>
          </div> -->
          </div>
        </el-col>
        <el-col :span="4"
                class="elcolCard">
          <div class="AssetsBoxOffline">
            <div class="Assets">离线的资产</div>
            <div class="AssetsNumber">{{ this.offlineAssets }}</div>
          </div>
        </el-col>
        <el-col :span="4"
                class="elcolCard">
          <div class="AssetsBoxUnNormal">
            <div class="Assets">异常的资产</div>
            <div class="AssetsNumber">{{ this.abnormalAssets }}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- <div style="height:300px;width:50%"> -->
    <eventType :query="query"
               :tipname="'IT资产类型分布'"
               :type="1"
               :name="'assetsOne'" />
    <!-- </div> -->
    <!-- <div style="height:300px;width:50%"> -->
    <eventType :query="query"
               :tipname="'操作系统类型分布'"
               :type="1"
               :name="'assetsTwo'" />
    <!-- </div> -->

    <eventType :query="query"
               :tipname="'OT资产类型分布'"
               :type="1"
               :name="'assetsThree'" />
    <eventType :query="query"
               :tipname="'工业协议分布'"
               :type="1"
               :name="'assetsFour'" />

    <!-- <div id="test1">
      <Tip>
        <span>IT资产类型分布</span>
      </Tip>
      <div id="canvas1" />
    </div>

    <div id="test2">
      <Tip>
        <span>操作系统类型分布</span>
      </Tip>
      <div id="canvas2" />
    </div> -->
    <!-- <div id="test3">
      <Tip>
        <span>OT资产类型分布</span>
      </Tip>
      <div id="canvas3" />
    </div>
    <div id="test4">
      <Tip>
        <span>工业协议分布</span>
      </Tip>
      <div id="canvas4" />
    </div> -->
  </div>
</template>

<script>
import Tip from '@/components/EchartsTip/index'
import eventType from '@/components/Echarts/eventType'
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
import echarts from 'echarts'

export default {
  name: 'Device',
  components: { Tip, eventType },
  data () {
    return {
      charts: '',
      query: {},
      // opinion:['男','女'],
      // opinionData:[
      //     {value:335, name:'男'},
      //     {value:310, name:'女'},
      // ],
      allAssets: '14982',
      onlineAssets: '12304',
      AssetsType: '10',
      ITNumber: '10',
      OTNumber: '8',
      offlineAssets: '1626',
      abnormalAssets: '1052',
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
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 分类
      categoryList: [],
      allTypeList: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '山西燃气厂',
          value: 1
        }
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
      form: {},
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
  created () {
    this.getPieChartOne()
    this.getPieChartTwo()
    this.getPieChartThree()
    this.getPieChartFour()
  },
  mounted () {
    this.$nextTick(function () {
      this.getPieChartOne('test1')
      this.getPieChartTwo('test2')
      this.getPieChartThree('test3')
      this.getPieChartFour('test4')
    })
  },
  methods: {
    /** 行颜色 */
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'success-row'
      } else if (rowIndex === 3) {
        return 'warning-row'
      }
      return ''
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.reset()
    },
    statusCancel () {
      this.statusOpen = false
      this.statusReset()
    },
    setCancel () {
      this.setOpen = false
      this.setReset()
    },
    // 表单重置
    reset () {
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
    statusReset () {
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
    getPieChartOne () {
      this.charts = echarts.init(document.getElementById('canvas1'))
      // 绘制图表
      this.charts.setOption({
        title: {
          // text: 'Referer of a Website',
          // subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
          //  data:this.opinion
        },
        color: ['#45C2E0', '#C1EBDD', '#FFC851', '#5A5476', '#1869A0'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1754, name: '工作主机' },
              { value: 2272, name: '服务器' },
              { value: 372, name: '网络设备' },
              { value: 6999, name: '安全设备' },
              { value: 45, name: '存储设备' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    getPieChartTwo () {
      this.charts = echarts.init(document.getElementById('canvas2'))
      // 绘制图表
      this.charts.setOption({
        title: {
          // text: 'Referer of a Website',
          // subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
          //  data:this.opinion
        },
        // color: ['#45C2E0', '#C1EBDD', '#FFC851', '#5A5476', '#1869A0'],
        color: ['#45C2E0', '#C1EBDD'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 2460, name: 'Windows' },
              { value: 1352, name: 'Linux' }
              // { value: 580, name: 'Window XP(1699)' },
              // { value: 484, name: 'Unix(1023)' },
              // { value: 300, name: 'MAC OS(362)' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    getPieChartThree () {
      this.charts = echarts.init(document.getElementById('canvas3'))
      // 绘制图表
      this.charts.setOption({
        title: {
          // text: 'Referer of a Website',
          // subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
          //  data:this.opinion
        },
        color: ['#45C2E0', '#C1EBDD', '#FFC851', '#5A5476', '#1869A0'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 145, name: 'LTE系统' },
              { value: 123, name: '安全设备' },
              { value: 100, name: '网络设备' },
              { value: 236, name: 'PLC控制器' },
              { value: 370, name: '服务器' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    getPieChartFour () {
      this.charts = echarts.init(document.getElementById('canvas4'))
      // 绘制图表
      this.charts.setOption({
        title: {
          // text: 'Referer of a Website',
          // subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
          //  data:this.opinion
        },
        color: ['#45C2E0', '#C1EBDD', '#FFC851', '#5A5476', '#1869A0'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 126, name: 'ModBus协议' },
              { value: 97, name: 'OPC协议' },
              { value: 83, name: 'ProfiBus协议' },
              { value: 64, name: 'DNP3协议' },
              { value: 51, name: 'CIP协议' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  .elcolCard {
    .AssetsBox {
      width: 240px;
      height: 80px;
      background: linear-gradient(180deg, #df97d1 0%, #af449c 100%);
      .Assets {
        text-align: center;
        // padding: 10px 80px 10px 10px;
        // border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 16px;
        line-height: 50px;
      }
      .AssetsNumber {
        width: 100%;
        height: 100px;
        // background-color: #5599ff;
        // color: #ffff77;
        // font-weight: 800;
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 20px;
        // .left {
        //   float: left;
        // }
        // .right {
        //   float: right;
        // }
      }
    }
    .AssetsBoxOnline {
      width: 240px;
      height: 80px;
      background: linear-gradient(180deg, #b56af9 0%, #6333b8 100%);
      .Assets {
        text-align: center;
        // padding: 10px 80px 10px 10px;
        // border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 16px;
        line-height: 50px;
      }
      .AssetsNumber {
        width: 100%;
        height: 100px;
        // background-color: #5599ff;
        // color: #ffff77;
        // font-weight: 800;
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 20px;
      }
    }
    .AssetsBoxOffline {
      width: 240px;
      height: 80px;
      background: linear-gradient(180deg, #00bbeb 0%, #0085d2 100%);
      .Assets {
        text-align: center;
        // padding: 10px 80px 10px 10px;
        // border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 16px;
        line-height: 50px;
      }
      .AssetsNumber {
        width: 100%;
        height: 100px;
        // background-color: #5599ff;
        // color: #ffff77;
        // font-weight: 800;
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 20px;
      }
    }
    .AssetsBoxUnNormal {
      width: 240px;
      height: 80px;
      background: linear-gradient(180deg, #3cd3aa 0%, #229b9f 100%);
      .Assets {
        text-align: center;
        // padding: 10px 80px 10px 10px;
        // border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 16px;
        line-height: 50px;
      }
      .AssetsNumber {
        width: 100%;
        height: 100px;
        // background-color: #5599ff;
        // color: #ffff77;
        // font-weight: 800;
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 20px;
      }
    }
    .AssetsBoxType {
      width: 240px;
      height: 80px;
      background: linear-gradient(180deg, #4fa8e7 0%, #3570d4 100%);
      .Assets {
        text-align: center;
        // padding: 10px 80px 10px 10px;
        // border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 16px;
        line-height: 50px;
      }
      .AssetsNumber {
        width: 100%;
        height: 100px;
        // background-color: #5599ff;
        // color: #ffff77;
        // font-weight: 800;
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 20px;
      }
      .ITNumberBox {
        color: #fff;
        line-height: 20px;
        margin-bottom: 10px;
        .IT {
          color: #ffffff;
          font-size: 18px;
          margin-left: 36px;
        }
        .ITNumber {
          color: #ffffff;
          font-size: 28px;
          margin-bottom: 10px;
          margin-right: 30px;
        }
        .OTNumber {
          color: #ffffff;
          font-size: 28px;
          margin-bottom: 10px;
        }
      }
    }
  }
  #test1 {
    // background: inherit;
    // background-color: rgba(255, 255, 255, 0.996078431372549);
    float: left;
    height: 300px;
    top: 20px;
    width: 50%;
    padding-right: 50px;

    #canvas1 {
      height: 300px;
      left: 10px;
      margin-left: 20px;
    }
  }
  #test2 {
    // background: inherit;
    // background-color: rgba(255, 255, 255, 0.996078431372549);
    float: left;
    height: 300px;
    top: 20px;
    width: 50%;
    padding-right: 50px;

    #canvas2 {
      height: 300px;
      left: 10px;
      margin-left: 20px;
    }
  }
  #test3 {
    // background: inherit;
    // background-color: rgba(255, 255, 255, 0.996078431372549);
    float: left;
    height: 300px;
    top: 20px;
    width: 50%;
    padding-right: 50px;

    #canvas3 {
      height: 300px;
      left: 10px;
      margin-left: 20px;
    }
  }
  #test4 {
    // background: inherit;
    // background-color: rgba(255, 255, 255, 0.996078431372549);
    float: left;
    height: 300px;
    top: 20px;
    width: 50%;
    padding-right: 50px;

    #canvas4 {
      height: 300px;
      left: 10px;
      margin-left: 20px;
    }
  }
}
</style>
