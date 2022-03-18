<template>
  <div class="app-container">
    <div class="echarts">
      <alarmTypeStatistics :address="address" />
    </div>
    <div class="echarts">
      <ThePieChartIsAboutCrisis :address="address" />
    </div>
    <div class="echarts">
      <chainStatistics :address="address" />
    </div>
    <div class="echarts">
      <ThePieChartIsAboutCrisisTwo
        :tipname="'命中IOC告警统计'"
        :address="address"
      />
    </div>
    <alarmLevelStatistics :address="address" />
  </div>
</template>
<script>
import alarmTypeStatistics from "@/components/Echarts/alarmTypeStatistics";
import ThePieChartIsAboutCrisis from "@/components/Echarts/ThePieChartIsAboutCrisis";
import chainStatistics from "@/components/Echarts/chainStatistics";
import alarmLevelStatistics from "@/components/Echarts/alarmLevelStatistics";
import ThePieChartIsAboutCrisisTwo from "@/components/Echarts/ThePieChartIsAboutCrisisTwo";
export default {
  components: {
    alarmTypeStatistics,
    ThePieChartIsAboutCrisis,
    chainStatistics,
    alarmLevelStatistics,
    ThePieChartIsAboutCrisisTwo
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
<style scoped>
</style>