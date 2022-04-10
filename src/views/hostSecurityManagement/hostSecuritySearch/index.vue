<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-form ref="elForm"
                   :model="queryParams"
                   :rules="rules"
                   size="mini"
                   label-width="100px"
                   class="label-type"
                   label-position="right">
            <el-col :span="6">
              <el-form-item label="事件名称:"
                            prop="event_name">
                <el-input v-model="queryParams.event_name"
                          placeholder="请输入事件名称"
                          clearable
                          :style="{ width: '100%' }" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域:"
                            prop="location">
                <el-select v-model="queryParams.location"
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
              <el-form-item label="事件等级:"
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
              <el-form-item label="事件类型:"
                            prop="ev_wsec_hsme_format_label">
                <el-input v-model="queryParams.ev_wsec_hsme_format_label"
                          placeholder="请输入事件类型"
                          clearable
                          :style="{ width: '100%' }" />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="处置状态:"
                            prop="procedure">
                <el-select v-model="queryParams.procedure"
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
              <el-form-item label="客户端IP:"
                            prop="ev_wsec_hsme_system_ip">
                <el-input v-model="queryParams.ev_wsec_hsme_system_ip"
                          placeholder="请输入客户端IP"
                          clearable
                          :style="{ width: '100%' }" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="操作系统:"
                            prop="ev_wsec_hsme_system_osname">
                <el-input v-model="queryParams.ev_wsec_hsme_system_osname"
                          placeholder="请输入操作系统"
                          clearable
                          :style="{ width: '100%' }" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="时间段:"
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
                            label-width="10px">
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
      <el-row>
        <el-button type="primary"
                   class="export"
                   size="mini"
                   @click="submitdata">导出</el-button>
      </el-row>
      <el-table :data="List"
                tooltip-effect="light">
        <el-table-column type="selection"
                         width="55"
                         align="center" />
        <el-table-column label="接收时间"
                         align="center"
                         prop="_source.receive_time"
                         :show-overflow-tooltip="true" />
        <el-table-column label="事件名称"
                         align="center"
                         prop="_source.event_name"
                         :show-overflow-tooltip="true" />
        <el-table-column label="事件等级"
                         align="center"
                         prop="_source.severity"
                         :show-overflow-tooltip="true">
          <template #default="scope">
            <span v-if="scope.row._source.severity == '' || scope.row._source.severity == null"></span>
            <span v-else>{{
              transTypeDic(scope.row._source.severity)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="事件类型"
                         align="center"
                         prop="_source.ev_wsec_hsme_format_label"
                         :show-overflow-tooltip="true" />
        <el-table-column label="操作系统"
                         align="center"
                         prop="_source.ev_wsec_hsme_system_osname"
                         :show-overflow-tooltip="true" />
        <el-table-column label="客户端名称"
                         align="center"
                         prop="_source.ev_wsec_hsme_system_osuser"
                         :show-overflow-tooltip="true" />
        <el-table-column label="客户端IP"
                         align="center"
                         prop="_source.ev_wsec_hsme_system_ip"
                         :show-overflow-tooltip="true" />
        <el-table-column label="发生时间"
                         align="center"
                         prop="_source.occur_time"
                         :show-overflow-tooltip="true" />
        <el-table-column label="日志描述"
                         align="center"
                         prop="_source.description"
                         :show-overflow-tooltip="true" />
        <el-table-column label="处置状态"
                         align="center"
                         prop="_source.procedure"
                         :show-overflow-tooltip="true" />
        <el-table-column label="区域"
                         align="center"
                         prop="_source.location"
                         :show-overflow-tooltip="true" />
        <el-table-column label="操作"
                         align="center"
                         class-name="small-padding fixed-width">
          <template #default="{ row }">
            <el-button size="mini"
                       type="text"
                       @click="detail(row._source)">详情</el-button>
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
    </el-card>

    <pagination v-show="total > 0"
                :total="total"
                :page.sync="query.from"
                :limit.sync="query.size"
                @pagination="getTableList" />
    <!-- 添加或修改分组对话框 -->
    <el-dialog :title="title"
               :visible.sync="open"
               width="900px"
               append-to-body>
      <div class="contentBox">
        <el-form ref="form"
                 label-width="95px"
                 label-position="left"
                 class="label-type">
          <el-row>
            <el-col :span="12">
              <el-form-item label="接收时间 :">
                {{ detailData.receive_time }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="病毒类型 :">
                <tooltip :content="detailData.ev_wsec_hsme_virus_type"
                         :length="40" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件名称 :">
                {{ detailData.event_name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="病毒名 :">
                {{ detailData.ev_wsec_hsme_virus_name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件等级 :">
                {{ detailData.severity }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户名称 :">
                {{ detailData.ev_wsec_hsme_system_osuser }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件类型 :">
                {{ detailData.ev_wsec_hsme_format_label }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="路径 :">
                <tooltip :content="detailData.ev_wsec_hsme_process_location"
                         :length="40" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="操作系统 :">
                {{ detailData.ev_wsec_hsme_system_osname }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的地址 :">
                {{ detailData.ev_wsec_hsme_dst_addr }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户端名称 :">
                {{ detailData.ev_wsec_hsme_system_osuser }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司名称 :">
                {{ detailData.corporateName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户端IP :">
                {{ detailData.ev_wsec_hsme_system_ip }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品名称 :">
                {{ detailData.productName }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产生时间 :">
                {{ detailData.occur_time }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="版本号 :">
                {{ detailData.versionNumber }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日志描述 :">
                <tooltip :content="detailData.description"
                         :length="20" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="区域 :">
                {{ detailData.location }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="进程 :">

                <tooltip :content="detailData.ev_wsec_hsme_process_location"
                         :length="40" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="父进程 :">

                <tooltip :content="detailData.ev_wsec_hsme_process_parent_location"
                         :length="40" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处置状态 :">
                {{ detailData.procedure }}
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
import { getHostSecurityData } from '@/utils/request'
import { hostList } from '@/api/system/list'

export default {
  components: {},
  props: [],
  data () {
    return {
      loading: false,
      name: '测试',
      detailData: {

      },
      groupList: [],
      // 分组表格数据
      List: [],
      groupListDeatils: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 总条数
      total: 0,
      query: {
        query: {
          bool: {
            must: []
          }
        },
        sort: [{ 'receive_time': 'desc' }],
        from: 0,
        size: 10
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderByColumn: 'occur_time',
        isAsc: 'desc',
        groupName: null,
        createTime: null,
        event_name: '',
        ev_wsec_hsme_system_osname: '',
        severity: undefined,
        ev_wsec_hsme_format_label: '',
        location: undefined,
        procedure: '',
        ip: undefined,
        newip: undefined,
        ev_wsec_hsme_system_ip: undefined,
        date: [''],
        field114: undefined
      },
      rules: {
        name: [],
        severity: [],
        ev_wsec_hsme_format_label: [],
        location: [],
        procedure: [],
        ip: [],
        newip: [],
        ev_wsec_hsme_system_ip: [],
        date: [],
        field114: []
      },
      levelOptions: [
        {
          label: '极低',
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
    this.getTableList()
    // this.getList()
  },
  methods: {
    async getTableList () {
      if (this.queryParams.event_name) {
        this.query.query.bool.must.push({
          match: {
            'event_name': this.queryParams.event_name
          }
        })
      }
      if (this.queryParams.location) {
        this.query.query.bool.must.push({
          match: {
            'location': this.queryParams.location
          }
        })
      }
      if (this.queryParams.severity) {
        this.query.query.bool.must.push({
          match: {
            'severity': this.queryParams.severity
          }
        })
      }
      if (this.queryParams.ev_wsec_hsme_format_label) {
        this.query.query.bool.must.push({
          match: {
            'ev_wsec_hsme_format_label': this.queryParams.ev_wsec_hsme_format_label
          }
        })
      }
      if (this.queryParams.procedure) {
        this.query.query.bool.must.push({
          match: {
            'procedure': this.queryParams.procedure
          }
        })
      }
      if (this.queryParams.ev_wsec_hsme_system_ip) {
        this.query.query.bool.must.push({
          match: {
            'ev_wsec_hsme_system_ip': this.queryParams.ev_wsec_hsme_system_ip
          }
        })
      }
      if (this.queryParams.ev_wsec_hsme_system_osname) {
        this.query.query.bool.must.push({
          match: {
            'ev_wsec_hsme_system_osname': this.queryParams.ev_wsec_hsme_system_osname
          }
        })
      }
      getHostSecurityData(this.query).then((res) => {
        this.query.query.bool.must = []
        this.groupList = []
        this.total = res.data.hits.total
        this.List = res.data.hits.hits
      })
      this.detailData.severity = this.transTypeDic(this.detailData.severity)
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
    async getList () {
      this.loading = true
      const res = await hostList(this.queryParams)
      this.groupList = res.rows
      this.total = res.total
      this.loading = false
    },
    btnQuery () {
      this.getTableList()
    },
    submitdata () {
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm () {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        orderByColumn: 'occur_time',
        isAsc: 'desc'
      }
      // this.getList()
      this.getTableList()
    },
    //  detail (row) {
    //   const { data } = await hostSecurityDetail(id)
    //   this.detailData = data
    //   this.detailData.severity = this.transTypeDic(this.detailData.severity)
    //   this.open = true
    //   this.title = '事件详情'
    // },
    detail (row) {
      this.open = true
      this.title = '事件详情'
      this.detailData = row
      this.detailData.severity = this.transTypeDic(this.detailData.severity)
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
