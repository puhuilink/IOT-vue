<template>
  <div class="app-container">
    <echarts :event-type="2"
             @getquery="uploadData" />
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
    <assetsUnderAttack :query="query"
                       :address="address" />
    <toDetectEvents :query="query"
                    :event-type="2"
                    :address="address" />
    <underAttackSandbox :query="query"
                        :address="address" />
    <!-- <不删eventLevelDistribution :address="address" /> -->
    <!-- <pieChartDisposal :tipname="'事件等级分布'"
                      :address="address"
                      :attack="1" /> -->
    <eventType :tipname="'事件等级分布'"
               :query="query"
               :name="'statisticalSnalysis'"
               :type="1" />
  </div>
</template>
<script>
import echarts from "@/components/Echarts/searchBar";
import assetsUnderAttack from "@/components/Echarts/assetsUnderAttack";
import toDetectEvents from "@/components/Echarts/toDetectEvents";
import underAttackSandbox from "@/components/Echarts/underAttackSandbox";
// import eventLevelDistribution from "@/components/Echarts/eventLevelDistribution";
import pieChartDisposal from "@/components/Echarts/pieChartDisposal";
import eventType from "@/components/Echarts/eventType";
import tip from "@/components/EchartsTip";
export default {
  components: {
    echarts,
    assetsUnderAttack,
    toDetectEvents,
    underAttackSandbox,
    pieChartDisposal,
    eventType,
    // eventLevelDistribution,
    tip,
  },
  props: [],
  data () {
    return {
      policitalStatus: ["1"],
      address: 1,
      query: {},
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    uploadData (data) {
      this.query = data
    }
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
