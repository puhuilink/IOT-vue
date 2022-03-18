<template>
  <div class="app-container">
    <dataAccessAcquisition :address="address" />
    <dataMiningAnalysisT :address="address" />
    <dataMangment :address="address" />
    <dataSource :address="address" />
  </div>
</template>
<script>
import dataSource from "@/components/Echarts/dataSource";
import dataMangment from "@/components/Echarts/dataMangment";
import dataAccessAcquisition from "@/components/Echarts/dataAccessAcquisition";
import dataMiningAnalysisT from "@/components/Echarts/dataMiningAnalysisT";
export default {
  components: {
    dataSource,
    dataAccessAcquisition,
    dataMiningAnalysisT,
    dataMangment,
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