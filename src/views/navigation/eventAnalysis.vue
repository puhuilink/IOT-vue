<template>
  <div class="app-container">
    <el-row :gutter="16">
      <el-form ref="elForm"
               :model="formData"
               size="mini"
               label-width="100px"
               label-position="left">
        <el-col :span="5">
          <el-form-item label="请选择时间：">
            <el-select v-model="formData.date"
                       clearable
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in dateOptions"
                         :key="index"
                         :label="item.label"
                         :value="item.value"
                         :disabled="item.disabled" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <funnel :id="id" />
    <tree :id="id"
          :address="address" />
    <treecopy :id="id"
              :address="address" />
    <el-col :span="11">
      <div :class="id===4 ? 'box' : ''"
           style="cursor:pointer;"
           @click="log">
        <tip> 事件安全通报 </tip>
        <el-row>
          <el-col :span="6">
            <div class="tip1 flex j-s a-c">
              <span class="text">通报率</span>
              <br>
              <span class="textNumber">86%</span>

            </div>
          </el-col>
          <el-col :span="6">
            <div class="tip2 flex j-s a-c">
              <span class="text">事件总数</span>
              <br>
              <span class="textNumber">4613</span>

            </div>
          </el-col>
          <el-col :span="6">
            <div class="tip3 flex j-s a-c">
              <span class="text">通报数</span>
              <br>
              <span class="textNumber">3967</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="tip4 flex j-s a-c">
              <span class="text">通报类型TOP1</span>
              <br>
              <span class="textNumber">僵木蠕事件</span>

            </div>
          </el-col>
        </el-row>
        <el-table :data="groupList"
                  height="360"
                  tooltip-effect="light">
          <el-table-column label="通报名称"
                           align="center"
                           prop="notificationName"
                           :show-overflow-tooltip="true"
                           min-width="10%" />
          <el-table-column label="事件名称"
                           align="center"
                           prop="eventName"
                           :show-overflow-tooltip="true"
                           min-width="10%" />
          <el-table-column label="事件类型"
                           align="center"
                           prop="eventType"
                           min-width="10%" />
          <el-table-column label="优先级"
                           align="center"
                           prop="priority"
                           min-width="8%" />
          <el-table-column label="通报状态"
                           align="center"
                           prop="notificationStatus"
                           min-width="10%" />
          <el-table-column label="最近更新时间"
                           align="center"
                           prop="updateTime"
                           min-width="15%"
                           :show-overflow-tooltip="true" />
        </el-table>
      </div>
    </el-col>
  </div>
</template>
<script>
import funnel from '@/components/Echarts/funnel'
import { notificationList } from '@/api/system/list'
import tree from '@/components/Echarts/tree'
import treecopy from '@/components/Echarts/treeCopy'
import tip from '@/components/EchartsTip'
export default {
  components: { funnel, tree, tip, treecopy },
  props: {
    id: { // 路由类型
      default: null,
      type: Number
    }
  },
  data () {
    return {
      formData: {
        date: '最近30天'
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 6,
        orderByColumn: 'creation_time ',
        isAsc: 'desc'
      },
      dateOptions: [{
        'label': '最近一天',
        'value': 1
      }, {
        'label': '最近7天',
        'value': 2
      }, {
        'label': '最近30天',
        'value': 3
      }],
      policitalStatus: ['1'],
      address: 1,
      groupList: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCategoryList()
  },
  mounted () {
  },
  methods: {
    getCategoryList () {
      this.loading = true
      notificationList(this.queryParams).then((response) => {
        this.groupList = response.rows
        this.loading = false
      })
    },
    log () {
      this.$router.push('/safety/InformManagement')
    }
  }
}

</script>
<style lang="scss" >
.box {
  cursor: pointer;
  width: 780px;
  height: 380px;
  background: #e7edf5;
  .el-table,
  .el-table__expanded-cell {
    background-color: transparent;
  }

  .el-table th,
  .el-table tr {
    background-color: transparent;
  }
}
.tip1 {
  border-left: 4px solid rgba(24, 144, 255, 1);
  font-weight: bold;
  margin-bottom: 5px;
}
.tip2 {
  border-left: 4px solid rgba(247, 48, 48, 1);
  font-weight: bold;
  margin-bottom: 5px;
}
.tip3 {
  border-left: 4px solid rgba(181, 146, 228, 1);
  font-weight: bold;
  margin-bottom: 5px;
}
.tip4 {
  border-left: 4px solid rgba(240, 177, 68, 1);
  font-weight: bold;
  margin-bottom: 5px;
}
.text {
  margin-left: 10px;
  font-size: 12px;
  color: rgba(51, 51, 51, 0.6);
}
.textNumber {
  margin-left: 10px;
  font-size: 20px;
  color: rgba(51, 51, 51, 1);
}
</style>
