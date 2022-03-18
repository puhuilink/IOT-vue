<template>
  <div class="app-container">
    <echarts @getaddress="uploadData" />
    <eventTrend :address="1" />
    <eventType :type="1" :address="address" />
    <categoryWithOtherStyle :type="1" :tipname="'源IP统计事件TOP 5'" :address="1" />
    <categoryWithOtherStyle :type="1" :tipname="'目的IP统计TOP 5'" :address="2" />
    <el-col :span="24">
      <tip> 最新工业网络审计事件 </tip>
      <el-table :data="groupList">
        <el-table-column label="产生时间" align="center" prop="gjzIP" />
        <el-table-column label="源IP" align="center" prop="gjzIP" />
        <el-table-column label="目的IP" align="center" prop="shzIP" />
        <el-table-column label="目的端口" align="center" prop="eventLevel" />
        <el-table-column label="传输层协议" align="center" prop="ssljd" />
        <el-table-column label="应用层协议" align="center" prop="area" />
        <el-table-column label="事件级别" align="center" prop="eventLevel" />
        <el-table-column label="事件类型" align="center" prop="ssljd" />
        <el-table-column label="区域" align="center" prop="area" />
      </el-table>
    </el-col>
  </div>
</template>
<script>
import echarts from '@/components/Echarts/searchBar'
import eventTrend from '@/components/Echarts/eventTrend'
import eventType from '@/components/Echarts/eventType'
import categoryWithOtherStyle from '@/components/Echarts/categoryWithFlippedXYAxis'

import tip from '@/components/EchartsTip'
export default {
  components: {
    echarts,
    eventTrend,
    eventType,
    tip,
    categoryWithOtherStyle
  },
  props: [],
  data() {
    return {
      address: 7,
      groupList: [
        {
          gjzIP: '192.168.28.8',
          shzIP: '10.13.20.24',
          eventName: 'MALWARE',
          eventLevel: '低',
          ssljd: '荷载投递',
          area: '山西燃气厂'
        },
        {
          gjzIP: '192.168.28.8',
          shzIP: '10.13.20.24',
          eventName: 'MALWARE',
          eventLevel: '低',
          ssljd: '荷载投递',
          area: '山西燃气厂'
        },
        {
          gjzIP: '192.168.28.8',
          shzIP: '10.13.20.24',
          eventName: 'MALWARE',
          eventLevel: '低',
          ssljd: '荷载投递',
          area: '山西燃气厂'
        },
        {
          gjzIP: '192.168.28.8',
          shzIP: '10.13.20.24',
          eventName: 'MALWARE',
          eventLevel: '低',
          ssljd: '荷载投递',
          area: '山西燃气厂'
        }
      ]
    }
  },
  methods: {
    uploadData(data) {
      this.address = data.address
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
