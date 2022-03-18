<template>
  <div class="app-container">
    <dataAccessAcquisition :address="address" />
    <dataMiningAnalysis :address="address" />
    <dataMangmentT :address="address" />
    <dataSourceT :address="address" />
  </div>
</template>
<script>
import dataSourceT from "@/components/Echarts/dataSourceT";
import dataMangmentT from "@/components/Echarts/dataMangmentT";
import dataAccessAcquisition from "@/components/Echarts/dataAccessAcquisition";
import dataMiningAnalysis from "@/components/Echarts/dataMiningAnalysis";
export default {
  components: {
    dataSourceT,
    dataAccessAcquisition,
    dataMiningAnalysis,
    dataMangmentT,
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
<style lang="scss" scoped>
</style>