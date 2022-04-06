<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-form ref="elForm"
                 :model="queryParams"
                 :rules="rules"
                 size="mini"
                 label-width="60px"
                 class="label-type"
                 label-position="left">
          <el-col :span="6"
                  :offset="9">
            <el-form-item label=""
                          prop="eventName"
                          @keyup.enter.native="btnQuery">
              <el-input v-model="queryParams.eventName"
                        placeholder="请输入威胁情报名称"
                        clearable
                        :style="{ width: '100%' }">
                <el-button icon="el-icon-search" />
              </el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item size="mini">
              <el-button type="primary"
                         @click="btnQuery">搜索</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col> -->
        </el-form>
      </el-row>
    </el-card>
    <el-card>
      <div class="title">
        多源情报查询结果
      </div>
      <el-table :data="groupList"
                tooltip-effect="light">
        <el-table-column type="selection"
                         width="55"
                         align="center" />
        <el-table-column label="IOC"
                         align="center"
                         prop="eventName"
                         :show-overflow-tooltip="true" />
        <el-table-column label="情报来源名称"
                         align="center"
                         prop="sourceIp"
                         :show-overflow-tooltip="true" />
        <el-table-column label="威胁类型"
                         align="center"
                         prop="type"
                         :show-overflow-tooltip="true" />
        <el-table-column label="威胁级别"
                         align="center"
                         prop="level"
                         :show-overflow-tooltip="true" />
        <el-table-column label="置信度"
                         align="center"
                         prop="status"
                         :show-overflow-tooltip="true" />
        <el-table-column label="情报源添加时间"
                         align="center"
                         prop="startTime"
                         :show-overflow-tooltip="true" />
        <el-table-column label="情报源权重"
                         align="center"
                         prop="agreement"
                         :show-overflow-tooltip="true" />
        <el-table-column label="操作"
                         align="center"
                         class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="detail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <pagination v-show="total > 0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getCategoryList" />
    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title"
               :visible.sync="open"
               width="900px"
               append-to-body>
      <div class="contentBox">
        <div class="information">
          概况
        </div>
        <el-form ref="form"
                 label-width="95px"
                 label-position="left"
                 class="label-type">
          <el-row>
            <el-col :span="8">
              <el-form-item label="IOC :">
                {{ dataTest.name }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="IOC类型 :">
                {{ dataTest.name1 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="威胁类型 :">
                {{ dataTest.name2 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="威胁级别 :">
                {{ dataTest.name3 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="可信度 :">
                {{ dataTest.name4 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="更新时间 :">
                {{ dataTest.name5 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="受影响平台 :">
                {{ dataTest.name6 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="可信度 :">
                {{ dataTest.name7 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="更新时间 :">
                {{ dataTest.name8 }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">
          域名解析
        </div>
        <el-form ref="form"
                 label-width="95px"
                 label-position="left"
                 class="label-type">
          <el-row>
            <el-col :span="8">
              <el-form-item label="IP :">
                {{ dataTest.name9 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运营商 :">
                {{ dataTest.name10 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="位置 :">
                {{ dataTest.name11 }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">
          WHOLS
        </div>
        <el-form ref="form"
                 label-width="95px"
                 label-position="left"
                 class="label-type">
          <el-row>
            <el-col :span="8">
              <el-form-item label="域名服务商 :">
                {{ dataTest.name12 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="域名服务器 :">
                {{ dataTest.name13 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册者 :">
                {{ dataTest.name11 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册邮箱 :">
                {{ dataTest.name12 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册机构 :">
                {{ dataTest.name13 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址 :">
                {{ dataTest.name11 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话 :">
                {{ dataTest.name12 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册时间 :">
                {{ dataTest.name13 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="更新时间 :">
                {{ dataTest.name11 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="过期时间 :">
                {{ dataTest.name12 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Alexa :">
                {{ dataTest.name13 }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">
          子域名
        </div>
        <div class="information">
          可视化分析
        </div>
        <div class="information">
          数字签名
        </div>
        <div class="information">
          生命周期
        </div>
        <div class="information">
          协同研发
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-row type="flex"
                  justify="center">
            <el-button size="small"
                       type="primary"
                       @click="submitForm">确 定</el-button>
            <el-button size="small"
                       @click="cancel">取 消</el-button>
          </el-row>
        </div>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import { listEvent } from '@/api/system/category'
export default {
  components: {},
  props: [],
  data () {
    return {
      loading: true,
      name: '测试',
      dataTest: {
        name: '工业网络审计事件',
        name1: '工业网络审计',
        name2: '高危',
        name3: '未知接口',
        name4: '10.255.52.84',
        name5: '192.163.12.63',
        name6: 'MODBUS协议',
        name7: '工业网络审计',
        name8: '10.255.52.83',
        name9: '致命',
        name10: '山西燃气厂',
        name11: '待处置',
        name12: '2022-02-22',
        name13: '2022-2-25'
      },
      // 分组表格数据
      groupListData: [
        {
          IOC: 'hask.f3322.org',
          qblymc: '微步在线机情报',
          wxlx: 'c2 Zegost',
          wxjb: '高',
          zxd: '85',
          qbytjsj: '2020-01-29 10:00:00',
          qybqz: '7'
        },
        {
          IOC: 'hask.f3322.org',
          qblymc: '微步在线机情报',
          wxlx: 'c2 Zegost',
          wxjb: '高',
          zxd: '85',
          qbytjsj: '2020-01-29 10:00:00',
          qybqz: '7'
        },
        {
          IOC: 'hask.f3322.org',
          qblymc: '微步在线机情报',
          wxlx: 'c2 Zegost',
          wxjb: '高',
          zxd: '85',
          qbytjsj: '2020-01-29 10:00:00',
          qybqz: '7'
        },
        {
          IOC: 'hask.f3322.org',
          qblymc: '微步在线机情报',
          wxlx: 'c2 Zegost',
          wxjb: '高',
          zxd: '85',
          qbytjsj: '2020-01-29 10:00:00',
          qybqz: '7'
        },
        {
          IOC: 'hask.f3322.org',
          qblymc: '微步在线机情报',
          wxlx: 'c2 Zegost',
          wxjb: '高',
          zxd: '85',
          qbytjsj: '2020-01-29 10:00:00',
          qybqz: '7'
        }
      ],
      // 分组表格数据
      groupList: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 总条数
      total: 0,
      // 查询参数

      queryParams: {
        pageNum: 1,
        pageSize: 10,
        eventName: '',
        orderByColumn: 'startTime',
        isAsc: 'desc',
      },
      rules: {
        name: [],
        level: [],
        type: [],
        area: [],
        agreement: [],
        ip: [],
        newip: [],
        equipment: [],
        date: [],
        field114: []
      },
      levelOptions: [
        {
          label: '正常',
          value: 1
        },
        {
          label: '低危',
          value: 2
        },
        {
          label: '中危',
          value: 3
        },
        {
          label: '高危',
          value: 4
        },
        {
          label: '致命',
          value: 5
        }
      ],
      areaOptions: [
        {
          label: '北京',
          value: 1
        },
        {
          label: '重庆',
          value: 2
        }
      ],
      field114Options: [
        {
          label: '未处置',
          value: 1
        },
        {
          label: '处置中',
          value: 2
        },
        {
          label: '已处置',
          value: 3
        }
      ]
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    /** 查询分组列表 */
    getCategoryList () {
      listEvent(this.queryParams).then((response) => {
        this.groupList = response.rows
        console.log('this.groupList111', this.groupList)
        this.total = response.total
      })
    },
    btnQuery () {
      this.queryParams.pageNum = 1
      this.getCategoryList()
    },
    submitdata () {
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm () {
      this.$refs['elForm'].resetFields()
    },
    detail () {
      this.open = true
      this.title = '事件详情'
    },
    // 取消按钮
    cancel () {
      this.open = false
    },
    /** 提交按钮 */
    submitForm () {
      this.open = false
    }
  }
}
</script>
<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
}
.title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
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
</style>
