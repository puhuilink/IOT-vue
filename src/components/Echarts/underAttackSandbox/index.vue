
<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1"
         style="height: 400px" />
  </el-col>
</template>
<script>
import { getUnderAttackSandboxData } from '@/utils/request'
import { setNotopt } from "@/utils/emptyEcharts.js";
import tip from "@/components/EchartsTip";
import echarts from "echarts";
import { sandboxesAttacked } from '@/api/system/echarts'
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
      type: Object
    },
    eventType: {
      default: null,
      type: Number
    }
  },
  data () {
    return {
      querys: {
        size: 0,
        query: {
          match: {
            cmdb_kpi_name: "ev_msec_asset_name"
          }
        },
        aggs: {
          corp_name_agg: {
            terms: {
              field: "value",
              size: 10
            }
          }
        }
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
      handler (val, oldVal) {
        this.queryParms = this.query
        if (val !== oldVal) {
          this.getData()
          this.drawPolicitalStatus()
        }
      },
      deep: true
    }
  },
  created () {
    // this.getData()
    this.getAnalysisData()
  },
  mounted () {
    this.drawPolicitalStatus();
  },
  methods: {
    transDicName (data) {
      var area = []
      data.forEach((item) => {
        area.push(item.key)
      })
      return area
    },
    transDicCount (data) {
      var area = []
      data.forEach((item) => {
        area.push(item.doc_count)
      })
      return area
    },
    async getAnalysisData () {
      await getUnderAttackSandboxData(this.querys).then(res => {
        console.log('4-12-res', res.data.aggregations.corp_name_agg.buckets)
        this.hasData = res.data.aggregations.corp_name_agg.buckets
        // this.AnalysisData = res.data.aggregations.corp_name_agg.buckets
        if (res.data.aggregations.corp_name_agg.buckets.length) {
          this.category = this.transDicName(res.data.aggregations.corp_name_agg.buckets)
          this.barData = this.transDicCount(res.data.aggregations.corp_name_agg.buckets)
          console.log('this.category', this.category)
          console.log('this.barData', this.barData)
        } else {
          this.category = []
          this.barData = []
        }
      })
      this.drawPolicitalStatus()
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
    async drawPolicitalStatus () {
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
<style lang="scss" scoped>
</style>
