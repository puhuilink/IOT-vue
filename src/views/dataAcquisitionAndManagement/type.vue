<template>
  <div class="app-container">
    <dataAccessAcquisition :id="id"
                           :address="address" />
    <dataMiningAnalysis :id="id"
                        :address="address" />
    <dataMangment :id="id"
                  :address="address" />
    <!-- <dataSource :id="id" :address="address" /> -->
    <category :type="1"
              :tipname="'数据源TOP10'"
              :query="query"
              :name="'dataSource'" />
  </div>
</template>
<script>
// import dataSource from "@/components/Echarts/dataSource";
import category from '@/components/Echarts/echartsCategory'
import dataMangment from "@/components/Echarts/dataMangment";
import dataAccessAcquisition from "@/components/Echarts/dataAccessAcquisition";
import dataMiningAnalysis from "@/components/Echarts/dataMiningAnalysis";
export default {
  components: {
    category,
    dataAccessAcquisition,
    dataMiningAnalysis,
    dataMangment,
  },
  props: {
    id: {
      // 路由类型
      default: null,
      type: Number,
    },
  },
  data () {
    return {
      policitalStatus: ["1"],
      address: 1,
      type: 1,
    };
  },
  created () {
    console.log('id:', this.id)
  },
};
</script>
<style lang="scss" scoped>
</style>