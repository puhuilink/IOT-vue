<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import { getElasticDate } from "@/utils/request";
import { setNotopt } from "@/utils/emptyEcharts.js";
import tip from "@/components/EchartsTip";
import echarts from "echarts";
import { sandboxesAttacked } from "@/api/system/echarts";
export default {
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "受攻击沙箱TOP5",
      type: String,
    },
    address: {
      // 厂家内容
      default: null,
      type: Number,
    },
    query: {
      default: null,
      type: Object,
    },
    eventType: {
      default: null,
      type: Number,
    },
  },
  data() {
    return {
      queryParms: {
        query: {
          bool: {
            must: [],
          },
        },
        aggs: {
          field: {
            terms: {
              field: "ev_msec_asset_name",
              size: 5,
            },
          },
        },
      },
      policitalStatus: ["1"],
      barData: [],
      category: [],
      hasData: [],
      AnalysisData: [],
      title: "",
    };
  },
  computed: {},
  watch: {
    query: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          if (val.severity) {
            this.queryParms.query.bool.must.push({
              match: {
                "severity": val.severity,
              },
            });
          }
          if (val.location) {
            this.queryParms.query.bool.must.push({
              match: {
                "location": val.location,
              },
            });
          }
          if (val.beginGenerationTime) {
            this.queryParms.query.bool.must.push({
              range: {
                generationTime: {
                  gte: val.beginGenerationTime,
                  lte: val.endGenerationTime,
                },
              },
            });
          }
          this.getAnalysisData();
          this.drawPolicitalStatus();
        }
      },
      deep: true,
    },
  },
  created() {
    // this.getData()
    this.getAnalysisData();
  },
  mounted() {
    this.drawPolicitalStatus();
  },
  methods: {
    transDicName(data) {
      var area = [];
      data.forEach((item) => {
        area.push(item.key);
      });
      return area;
    },
    transDicCount(data) {
      var area = [];
      data.forEach((item) => {
        area.push(item.doc_count);
      });
      return area;
    },
    async getAnalysisData() {
      await getElasticDate(this.queryParms).then((res) => {
        console.log("4-13-res", res);
        this.hasData = res.data.aggregations.field.buckets;
        // this.AnalysisData = res.data.aggregations.field.buckets
        if (res.data.aggregations.field.buckets.length) {
          this.category = this.transDicName(
            res.data.aggregations.field.buckets
          );
          this.barData = this.transDicCount(
            res.data.aggregations.field.buckets
          );
          console.log("4-13-this.category", this.category);
          console.log("4-13-this.barData", this.barData);
        } else {
          this.category = [];
          this.barData = [];
        }
        this.queryParms.query.bool.must = [];
      });
      this.drawPolicitalStatus();
    },
    // async getData () {
    //   await sandboxesAttacked(this.queryParms).then(({ data }) => {
    //     console.log('data-4-12', data)
    //     this.hasData = data
    //     if (data.length) {
    //       this.category = this.transDicName(data)
    //       this.barData = this.transDicCount(data)
    //     } else {
    //       this.category = []
    //       this.barData = []
    //     }
    //   })
    //   this.drawPolicitalStatus()
    // },
    async drawPolicitalStatus() {
      if (this.hasData.length) {
        const myChart = this.$echarts.init(this.$refs.canvas1);
        // 绘制图表
        myChart.setOption({
          color: ["#FFC0CB"],
          xAxis: {
            type: "category",
            data: this.category,
          },
          yAxis: {
            type: "value",
            data: this.category,
          },
          series: [
            {
              data: this.barData,
              type: "bar",
              barWidth: 30, //柱图宽度
            },
          ],
        });
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      } else {
        const myChart = this.$echarts.init(this.$refs.canvas1);
        this.$refs.canvas1.removeAttribute("_echarts_instance_");
        return setNotopt(myChart, "暂无数据");
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
