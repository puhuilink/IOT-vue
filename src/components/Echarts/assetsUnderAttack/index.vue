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
import { TopAssetsUnderAttack } from "@/api/system/echarts";
export default {
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "攻击者TOP5",
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
      policitalStatus: ["1"],
      barData: [],
      category: [],
      hasData: [],
      title: "",
      querys: {
        severity: "",
        location: "",
      },
      queryParms: {
        query: {
          bool: {
            must: [
              {
              range: {
                "ev_msec_detail_start_time": {
                  gte: this.getdate(2)[0],
                  lte: this.getdate(2)[1],
                },
              },
            }
            ],
          },
        },
        aggs: {
          field: {
            terms: {
              field: "detail_src_ip",
              size: 5,
            },
          },
        },
      },
    };
  },
  computed: {},
  watch: {
    query: {
      handler(val, oldVal) {
        if (val !== oldVal) {
           if (val.severity) {
            this.querys.severity = val.severity;
            this.queryParms.query.bool.must.push({
              match: {
                severity: val.severity,
              },
            });
          }
          if (val.location) {
            this.querys.location = val.location;
            this.queryParms.query.bool.must.push({
              match: {
                location: val.location,
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
     Twodigits(num) {
      return num < 10 ? "0" + num : num;
    },
    getDay(num, str) {
      var today = new Date();
      var nowTime = today.getTime();
      var ms = 24 * 3600 * 1000 * num;
      today.setTime(parseInt(nowTime + ms));
      var oYear = today.getFullYear();
      var oMoth = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = "0" + oMoth;
      var oDay = today.getDate().toString();
      if (oDay.length <= 1) oDay = "0" + oDay;
      return oYear + str + oMoth + str + oDay;
    },
    getdate(type) {
      var myDate = new Date();
      var beforeseven = new Date();
      var thirty = new Date();
      myDate.setDate(myDate.getDate());
      beforeseven.setDate(beforeseven.getDate() - 1 - 6);
      thirty.setDate(thirty.getDate() - 1 - 29);
      if (type === 2) {
        return [
          beforeseven.getFullYear() +
            "-" +
            this.Twodigits(beforeseven.getMonth() + 1) +
            "-" +
            this.Twodigits(beforeseven.getDate()),
          myDate.getFullYear() +
            "-" +
            this.Twodigits(myDate.getMonth() + 1) +
            "-" +
            this.Twodigits(myDate.getDate()),
        ];
      } else if (type === 3) {
        // 最近30天
        return [
          thirty.getFullYear() +
            "-" +
            this.Twodigits(thirty.getMonth() + 1) +
            "-" +
            this.Twodigits(thirty.getDate()),
          myDate.getFullYear() +
            "-" +
            this.Twodigits(myDate.getMonth() + 1) +
            "-" +
            this.Twodigits(myDate.getDate()),
        ];
      } else if (type === 1) {
        // 昨天
        var yesterday = this.getDay(-1, "-");
        return [yesterday, yesterday];
      }
    },
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
         this.queryParms.query.bool.must =  [{
              range: {
                "ev_msec_detail_start_time": {
                  gte: this.getdate(2)[0],
                  lte: this.getdate(2)[1],
                },
              },
         }];
      });
      this.drawPolicitalStatus();
    },
    // async getData () {
    //   await TopAssetsUnderAttack(this.queryParms).then(({ data }) => {
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
          // title: {
          //   text: "World Population",
          // },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {},
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          color: ["#FFC0CB"],
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: "category",
            data: this.category,
          },
          series: [
            {
              // name: "2011",
              type: "bar",
              data: this.barData,
              barWidth: 30, // 柱图宽度
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
