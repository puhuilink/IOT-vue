<template>
  <div class="app-container">
    <eventTrend :tipname="'生产网安全防护'" :address="address" />
    <pieChartDisposal :tipname="'事件状态处置图'" :address="address" />
    <productionNetworkSecurityProtection :address="address"/>
    <eventType :type="1" :address="address" />
  </div>
</template>
<script>
import eventTrend from "@/components/Echarts/eventTrend";
import pieChartDisposal from "@/components/Echarts/pieChartDisposal";
import productionNetworkSecurityProtection from "@/components/Echarts/productionNetworkSecurityProtection";
import eventType from "@/components/Echarts/eventType";
export default {
  components: {
    eventTrend,
    pieChartDisposal,
    productionNetworkSecurityProtection,
    eventType,
  },
  props: [],
  data() {
    return {
      policitalStatus: ["1"],
      address: 1,
      type: 1,
    };
  },
};
</script>