<template>
  <div class="app-container">
    <eventTrend :tipname="'生产网安全防护'"
                :name="'host'" />
    <!-- <pieChartDisposal :tipname="'事件状态处置图'"
                      :address="address" /> -->
    <eventType :query="query"
               :tipname="'事件状态处置图'"
               :type="2"
               :name="'Jiangwoodcreep'" />
    <productionNetworkSecurityProtection :address="address" />
    <eventType :query="query"
               :tipname="'事件类型分布'"
               :type="1"
               :name="'host'" />
    <!-- <eventType :type="1"
               :address="address" /> -->
  </div>
</template>
<script>
import eventTrend from "@/components/Echarts/eventTrend";
import eventType from "@/components/Echarts/eventType";
import pieChartDisposal from "@/components/Echarts/pieChartDisposal";
import productionNetworkSecurityProtection from "@/components/Echarts/productionNetworkSecurityProtection";
// import eventType from "@/components/Echarts/eventType";
export default {
  components: {
    eventTrend,
    eventType,
    pieChartDisposal,
    productionNetworkSecurityProtection,
  },
  props: [],
  data () {
    return {
      policitalStatus: ["1"],
      address: 1,
      type: 1,
    };
  },
};
</script>