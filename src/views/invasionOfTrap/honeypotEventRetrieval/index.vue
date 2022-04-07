<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form ref="elForm"
                   :model="queryParams"
                   :rules="rules"
                   size="mini"
                   label-width="90px"
                   class="label-type"
                   label-position="right">
            <el-col :span="6">
              <el-form-item label="攻击者："
                            prop="detail_src_ip">
                <!-- <el-select v-model="queryParams.detail_src_ip"
                           placeholder="请选择攻击者"
                           filterable
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in attackOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select> -->
                <el-input v-model="queryParams.detail_src_ip"
                          placeholder="请输入攻击者"
                          clearable
                          :style="{ width: '100%' }" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="事件等级："
                            prop="severity">
                <el-select v-model="queryParams.severity"
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
            <el-col :span="6">
              <el-form-item label="隔离沙箱："
                            prop="type">
                <!-- <el-select v-model="queryParams.exkpi_msec_asset_name"
                           placeholder="请选择隔离沙箱"
                           filterable
                           clearable
                           :style="{ width: '100%' }">
                  <el-option v-for="(item, index) in levelOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled" />
                </el-select> -->
                <el-input v-model="queryParams.exkpi_msec_asset_name"
                          placeholder="请输入隔离沙箱"
                          clearable
                          :style="{ width: '100%' }" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域："
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
              <el-form-item label="处置状态："
                            prop="disposalStatus">
                <el-select v-model="queryParams.disposalStatus"
                           placeholder="请选择处置状态"
                           filterable
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
            <el-col :span="6">
              <el-form-item label="时间："
                            prop="date">
                <el-time-picker v-model="queryParams.date"
                                is-range
                                format="HH:mm:ss"
                                value-format="HH:mm:ss"
                                :style="{ width: '100%' }"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                range-separator="至"
                                clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item size="mini"
                            label-width="50px">
                <el-button type="primary"
                           @click="btnQuery">搜索</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card>
      <el-button type="primary"
                 class="export"
                 @click="submitdata">导出</el-button>
      <el-table :data="List"
                tooltip-effect="light">
        <el-table-column type="selection"
                         width="55"
                         align="center" />
        <el-table-column label="攻击者"
                         align="center"
                         prop="detail_src_ip"
                         :show-overflow-tooltip="true" />
        <el-table-column label="攻击目标"
                         align="center"
                         prop="detail_dst_ip"
                         :show-overflow-tooltip="true" />
        <el-table-column label="隔离沙箱"
                         align="center"
                         prop="exkpi_msec_asset_name"
                         :show-overflow-tooltip="true" />
        <el-table-column label="开始攻击时间"
                         align="center"
                         prop="occur_time"
                         :show-overflow-tooltip="true" />
        <el-table-column label="最后攻击时间"
                         align="center"
                         prop="receive_time"
                         :show-overflow-tooltip="true" />
        <el-table-column label="事件等级"
                         align="center"
                         prop="severity"
                         :show-overflow-tooltip="true">
          <template #default="scope">
            <span>{{
              transTypeDic(scope.row.severity)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="处置状态"
                         align="center"
                         prop="procedure"
                         :show-overflow-tooltip="true" />
        <el-table-column label="区域"
                         align="center"
                         prop="region"
                         :show-overflow-tooltip="true" />
        <el-table-column label="操作"
                         align="center"
                         class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="detail(scope.row)">详情</el-button>
            &nbsp;&nbsp; &nbsp;&nbsp;
            <el-dropdown @command="batchOperate">
              <el-button size="mini"
                         type="text">状态变更
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="process">处置</el-dropdown-item>
                <el-dropdown-item command="un_process">不处置</el-dropdown-item>
                <el-dropdown-item command="false_report">误报</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0"
                  :total="total"
                  :page.sync="querys.from"
                  :limit.sync="querys.size"
                  @pagination="searchClick" />
    </el-card>

    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title"
               :visible.sync="open"
               width="900px"
               append-to-body>
      <div class="contentBox">
        <div class="information">
          基础信息
        </div>
        <el-form ref="form"
                 label-width="105px"
                 label-position="left">
          <el-row>
            <el-col :span="8">
              <el-form-item label="攻击者 :">
                {{ detailData.detail_src_ip }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="攻击目标 :">
                {{ detailData.detail_dst_ip }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="事件等级 :">
                {{ detailData.severity }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始攻击时间 :">
                {{ detailData.occur_time }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束攻击时间 :">
                <tooltip :content="detailData.receive_time"
                         :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区域 :">
                {{ detailData.region }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="处置状态 :">
                {{ detailData.procedure }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="information">
          攻击记录
        </div>
        <el-table v-loading="loading"
                  :data="ListDetails"
                  tooltip-effect="light">
          <el-table-column label="攻击时间"
                           align="center"
                           prop="occur_time"
                           min-width="15%"
                           :show-overflow-tooltip="true" />
          <el-table-column label="来源IP"
                           align="center"
                           prop="detail_src_ip"
                           min-width="15%" />
          <el-table-column label="类型"
                           align="center"
                           prop="attackType"
                           min-width="10%" />
          <el-table-column label="攻击手法"
                           align="center"
                           prop="method"
                           min-width="15%" />
          <el-table-column label="攻击行为"
                           align="center"
                           prop="description"
                           min-width="55%"
                           :show-overflow-tooltip="true" />
        </el-table>
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
import { getElasticDate, getkpi } from '@/utils/request'
// import { trapList } from '@/api/system/list'
// import { trapDetail } from '@/api/system/detail'

export default {
  name: 'AAA',
  components: {},
  props: [],
  data () {
    return {
      loading: false,
      name: '测试',
      aaa: {},
      detailData: {
      },
      // 分组表格数据
      List: [],
      ListDetails: [],
      groupList: [],
      groupListDeatils: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 总条数
      total: 0,
      // querys: {
      //   query: {
      //     bool: {
      //       must: [{
      //         match: {
      //           'detail_src_ip': this.queryParams.detail_src_ip
      //           // "category": "小米"
      //         }
      //       }, {
      //         match: {
      //           // "price": 3999.00
      //           'occur_time ': this.queryParams.occur_time
      //         }
      //       }]
      //     }
      //   },
      //   from: 0,
      //   size: 10
      // },
      querys: {
        query: {
          'match_all': {}
        },
        from: 0,
        size: 10
      },
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderByColumn: 'occur_time',
        isAsc: 'desc',
        detail_src_ip: '',
        severity: '',
        exkpi_msec_asset_name: '',
        region: '',
        disposalStatus: ''
      },
      rules: {
        name: [],
        type: [],
        region: [],
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
      attackOptions: [
        {
          label: '所有',
          value: '所有'
        },
        {
          label: '扫描工具',
          value: '扫描工具'
        },
        {
          label: 'H-007',
          value: 'H-007'
        }
      ],
      areaOptions: [
        {
          label: '天津管片厂',
          value: '天津管片厂'
        },
        {
          label: '三亚海投轨交',
          value: '三亚海投轨交'
        },
        {
          label: '北京城乡水厂',
          value: '北京城乡水厂'
        },
        {
          label: '山西三通燃气厂',
          value: '山西三通燃气厂'
        },
        {
          label: '珠海深中通道',
          value: '珠海深中通道'
        }
      ],
      statusOptions: [{
        label: '待处置',
        value: '待处置'
      },
      {
        label: '处置中',
        value: '处置中'
      },
      {
        label: '已处置',
        value: '已处置'
      },
      {
        label: '误报',
        value: '误报'
      },
      {
        label: '不处置',
        value: '不处置'
      }],
    }
  },
  created () {
    this.searchClick()
    // this.getList()
  },

  methods: {
    searchClick () {
      getElasticDate(this.querys).then((res) => {
        this.groupList = []
        console.log('res-4-7', res)
        this.total = res.data.hits.total
        res.data.hits.hits.map(t => {
          const sour = t._source
          // getkpi({
          //   'query': {
          //     'match': {
          //       'event_id': t._id
          //     }
          //   },
          //   'from': this.querys.from,
          //   'size': this.querys.size
          // }).then((res) => {
          //   res.data.hits.hits.map((item) => {
          //     if (item._source.cmdb_kpi_name === 'ev_com_socket_src_ip') {
          //       sour.detail_src_ip = item._source.value
          //     }
          //     if (item._source.cmdb_kpi_name === 'ev_com_socket_dst_ip') {
          //       sour.detail_dst_ip = item._source.value
          //     }
          //     if (item._source.cmdb_kpi_name === 'ev_msec_attack_ip') {
          //       sour.attackip = item._source.value
          //     }
          //     if (item._source.cmdb_kpi_name === 'ev_msec_asset_name') {
          //       sour.exkpi_msec_asset_name = item._source.value
          //     }
          //     if (item._source.cmdb_kpi_name === 'ev_msec_detail_start_time') {
          //       sour.occur_time = item._source.value
          //     }
          //     if (item._source.cmdb_kpi_name === 'ev_msec_detail_timestamp') {
          //       sour.receive_time = item._source.value
          //     }
          //     if (item._source.cmdb_kpi_name === 'ev_msec_attack_method_desc') {
          //       sour.method = item._source.value
          //     }
          //     if (item._source.cmdb_kpi_name === 'ev_msec_attack_type') {
          //       sour.attackType = item._source.value
          //     }
          //     if (item._source.cmdb_kpi_name === 'ev_msec_attack_time') {
          //       sour.attackTime = item._source.value
          //     }
          this.groupList.push(sour)
          this.List = Array.from(new Set(this.groupList))
          //   })
          // })
        })
      })
    },
    transTypeDic (val) {
      var t = [{
        name: '1',
        content: '极低'
      }, {
        name: '2',
        content: '低危'
      }, {
        name: '3',
        content: '中危'
      }, {
        name: '4',
        content: '高危'
      }, {
        name: '5',
        content: '致命'
      }]
      const orgTreeData1 = t.filter((e) => e.name === val)
        .map(({ content }) => ({
          content
        }))
      return `${orgTreeData1[0].content}`
    },
    batchOperate (command) {
      let message = ''
      switch (command) {
        case 'process':
          message = '是否确认变更处置状态？'
          this.openMessageBox(message)
          break
        case 'un_process':
          message = '是否确认将此事件处置状态修改为不处置？'
          this.openMessageBox(message)
          break
        case 'false_report':
          message = '是否确认将此事件处置状态修改为误报？'
          this.openMessageBox(message)
          break
      }
    },
    openMessageBox (message) {
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改！'
        })
      })
    },
    /** 查询分组列表 */
    // async getList() {
    //   this.loading = true
    //   const res = await trapList(this.queryParams)
    //   this.groupList = res.rows
    //   this.total = res.total
    //   this.loading = false
    // },
    btnQuery () {
      getElasticDate({
        query: {
          bool: {
            must: [
              {
                match: {
                  exkpi_msec_asset_name: this.queryParams.exkpi_msec_asset_name,
                }
              },
              {
                match: {
                  detail_src_ip: this.queryParams.detail_src_ip,
                },
              }]
          }


        },
        // query: {
        //   bool: {
        //     must: [{
        //       'match': {
        //         'detail_src_ip': this.queryParams.detail_src_ip
        //       },
        //       'match': {
        //         'exkpi_msec_asset_name': this.queryParams.exkpi_msec_asset_name
        //       }
        //     }]
        //   }

        // },
        from: 0,
        size: 10
      }).then(res => {
        this.groupList = []
        console.log('res - 4 - 7-btnQuery', res)
        this.total = res.data.hits.total
        res.data.hits.hits.map(t => {
          const sour = t._source
          this.groupList.push(sour)
          this.List = Array.from(new Set(this.groupList))
          console.log('this.ListDetails', this.List)
        })
      })
      this.detailData.severity = this.transTypeDic(this.detailData.severity)
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
    detail (row) {
      this.groupListDeatils = []
      getElasticDate({
        query: {
          'match': {
            'detail_src_ip': row.detail_src_ip
          }
        },
        from: 0,
        size: 10
      }).then(res => {
        console.log('res - 4 - 7-details', res)
        res.data.hits.hits.map(t => {
          const sour = t._source
          this.groupListDeatils.push(sour)
          this.ListDetails = Array.from(new Set(this.groupListDeatils))
          console.log('this.ListDetails', this.ListDetails)
        })
      })
      this.detailData = row
      this.detailData.severity = this.transTypeDic(this.detailData.severity)
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
.export {
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
.dialog-footer {
  margin-top: 20px;
}
</style>
