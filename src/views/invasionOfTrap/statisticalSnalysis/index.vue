<template>
  <div class="app-container">
    <echarts :event-type="1" @getquery="uploadData" />
    <div>
      <el-row :gutter="30">
        <el-col :span="6">
          <div class="AssetsBox">
            <div class="Assets">资产防护</div>
            <div class="AssetsNumber">{{ AssetsNumber }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="AssetsBox">
            <div class="Assets">入侵事件</div>
            <div class="AssetsNumber">{{ Invand }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="AssetsBox">
            <div class="Assets">探测事件</div>
            <div class="AssetsNumber">{{ Probe }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="AssetsBox">
            <div class="Assets">威胁人员</div>
            <div class="AssetsNumber">{{ attackNumber }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <assetsUnderAttack :query="query" :address="address" />
    <toDetectEvents
      :query="query"
      :event-type="2"
      :address="address"
      :search="'event_ivtp'"
    />
    <underAttackSandbox :query="query" :address="address" />
    <!-- <不删eventLevelDistribution :address="address" /> -->
    <!-- <pieChartDisposal :tipname="'事件等级分布'"
                      :address="address"
                      :attack="1" /> -->
    <eventType
      :tipname="'事件等级分布'"
      :query="query"
      :name="'statisticalSnalysis'"
      :type="'severity'"
    />
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
import { AssetsNumber } from "@/api/system/echarts";
import { attackNumber } from "@/api/system/echarts";
import { InvandProbe } from "@/api/system/echarts";
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
  props: {
    query: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      policitalStatus: ["1"],
      address: 1,
      query: {},
      AssetsNumber: "",
      attackNumber: "",
      Invand: "",
      Probe: "",
    };
  },
  computed: {},
  watch: {
    query: {
      handler(val, oldVal) {
        this.queryParms = this.query;
        if (val !== oldVal) {
          this.getData();
        }
      },
      deep: true,
    },
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    uploadData(data) {
      this.query = data;
    },
    async getData() {
      await AssetsNumber(this.queryParms).then(({ data }) => {
        this.hasData = data;
        console.log("this.hasData", this.hasData);
        if (data.length) {
          this.AssetsNumber = data[0].count;
        } else {
          console.log("暂无数据");
        }
      });
      await attackNumber(this.queryParms).then(({ data }) => {
        this.hasData = data;
        // console.log('this.hasData', this.hasData)
        if (data.length) {
          this.attackNumber = data[0].count;
        } else {
          console.log("暂无数据");
        }
      });
      await InvandProbe(this.queryParms).then(({ data }) => {
        this.hasData = data;
        if (data.length) {
          const Invand = data.filter((e) => e.name === "INVADE");
          if (Invand.length) {
            Invand.map((d) => {
              this.Invand = d.count;
            });
          } else {
            this.Invand = "";
          }
          const Probe = data.filter((e) => e.name === "PROBE");
          if (Probe.length) {
            Probe.map((d) => {
              this.Probe = d.count;
            });
          } else {
            this.Probe = "";
          }
        } else {
          console.log("暂无数据");
        }
      });
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
