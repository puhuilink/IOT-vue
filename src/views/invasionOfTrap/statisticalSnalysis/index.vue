<template>
  <div class="app-container">
    <echarts @getaddress="uploadData" />
    <div>
      <el-row :gutter="30">
        <el-col :span="6">
          <div class="AssetsBox">
            <div class="Assets">资产防护</div>
            <div class="AssetsNumber">5个</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="AssetsBox">
            <div class="Assets">入侵事件</div>
            <div class="AssetsNumber">8次</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="AssetsBox">
            <div class="Assets">探测事件</div>
            <div class="AssetsNumber">12次</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="AssetsBox">
            <div class="Assets">威胁人员</div>
            <div class="AssetsNumber">8个</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <assetsUnderAttack :address="address" />
    <!-- <eventTrend /> -->
    <toDetectEvents :address="address" />
    <!-- <eventType :type="1" /> -->
    <underAttackSandbox :address="address" />
    <eventLevelDistribution :address="address" />
    <!-- <eventType :tipname="'事件状态处置图'" :type="2" /> -->
  </div>
</template>
<script>
import echarts from "@/components/Echarts/searchBar";
import assetsUnderAttack from "@/components/Echarts/assetsUnderAttack";
import toDetectEvents from "@/components/Echarts/toDetectEvents";
import underAttackSandbox from "@/components/Echarts/underAttackSandbox";
import eventLevelDistribution from "@/components/Echarts/eventLevelDistribution";
// import eventTrend from "@/components/Echarts/eventTrend";
// import eventType from "@/components/Echarts/eventType";
// import wordcloud from "@/components/Echarts/wordcloud";
import tip from "@/components/EchartsTip";
export default {
  components: {
    echarts,
    assetsUnderAttack,
    toDetectEvents,
    underAttackSandbox,
    eventLevelDistribution,
    tip,
  },
  props: [],
  data() {
    return {
      policitalStatus: ["1"],
      address: 1,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    uploadData(data) {
      this.address = data.address;
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  .AssetsBox {
    .Assets {
      background-color: #5599ff;
      padding: 10px 80px 10px 10px;
      border-bottom: 1px solid #fff;
      color: #fff;
    }
    .AssetsNumber {
      width: 100%;
      height: 100px;
      background-color: #5599ff;
      color: #ffff77;
      font-weight: 800;
      text-align: center;
      line-height: 100px;
    }
  }
}
</style>
