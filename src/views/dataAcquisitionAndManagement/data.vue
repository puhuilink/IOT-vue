<template>
  <div class="app-container">
    <dataAccessAcquisition :address="address" />
    <dataMiningAnalysis :address="address" />
    <dataMangment :address="address" />
    <dataSource :address="address" />
  </div>
</template>
<script>
import dataSource from "@/components/Echarts/dataSource";
import dataMangment from "@/components/Echarts/dataMangment";
import dataAccessAcquisition from "@/components/Echarts/dataAccessAcquisition";
import dataMiningAnalysis from "@/components/Echarts/dataMiningAnalysis";
export default {
  components: {
    dataSource,
    dataAccessAcquisition,
    dataMiningAnalysis,
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