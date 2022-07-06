<template>
  <div class="app-container">
    <eventType :query="query"
               :tipname="'资产类型分布'"
               :date="0"
               :type="'assetType'"
               :name="'assetsTwo'" />
                  <eventType :query="query"
               :tipname="'运行状态分布'"
                :date="0"
               :type="'assetType'"
               :name="'assetsFour'" />
 <category :type="1" :tipname="'试点工业企业资产统计TOP5'"   :date="0" :name="'assetsOne'" />
  <category :type="1" :tipname="'试点工业企业风险资产数TOP5'"   :date="0" :name="'assetsThree'" />
  </div>
</template>

<script>
import Tip from '@/components/EchartsTip/index'
import eventType from '@/components/Echarts/eventType'
import category from '@/components/Echarts/echartsCategory'
export default {
  name: 'Device',
  components: { Tip, eventType,category },
  data () {
    return {
      charts: '',
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
