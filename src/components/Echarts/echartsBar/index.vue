<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import { getWeakPasswordData } from "@/utils/request";
import { setNotopt } from "@/utils/emptyEcharts.js";
import tip from "@/components/EchartsTip";
import echarts from "echarts";
export default {
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "事件趋势分析",
      type: String,
    },
    name: {
      default: "",
      type: String,
    },
    query: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      hasData: [],
      queryParms: {
        query: {
          bool: {
            must: [],
          },
        },
        aggs: {
          field: {
            terms: {
              field: "detail_protocol",
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
            this.queryParms.query.bool.must.push({
              match: {
                "severity.keyword": val.severity,
              },
            });
          }
          if (val.location) {
            this.queryParms.query.bool.must.push({
              match: {
                "location.keyword": val.location,
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
          this.getData();
          this.drawPolicitalStatus();
        }
      },
      deep: true,
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.drawPolicitalStatus();
  },
  methods: {
    transDic(data) {
      var area = [];
      data.forEach((item) => {
        area.push(item);
      });
      return area;
    },
    async getData() {
      switch (this.name) {
        case "weakPassword":
          await getWeakPasswordData(this.queryParms).then(({ data }) => {
            this.hasData = data.aggregations.field.buckets;
            this.data1 = this.transDic(data.aggregations.field.buckets);
            this.queryParms.query.bool.must = [];
          });
          break;
        default:
          console.log("无数据", this.type);
          break;
      }
      this.drawPolicitalStatus();
    },
    drawPolicitalStatus() {
      if (this.hasData.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1);

        // 绘制图表
        myChart.setOption({
          dataset: {
            source: this.data1,
          },
          backgroundColor: "#fff",
          grid: {
            left: "2%",
            right: "10%",
            bottom: "10%",
            top: "10%",
            containLabel: true,
          },
          xAxis: [
            {
              show: false,
            },
          ],
          yAxis: {
            type: "category",
            inverse: true,
            show: true,
            axisLine: {
              lineStyle: {
                color: "rgba(0,0,0,.0)",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#2A86E3",
                align: "left",
              },
              height: 70,
              margin: -5,
              rich: {},
            },
          },

          series: [
            // 亮色条 百分比
            {
              show: true,
              type: "bar",
              barGap: "-100%",
              barWidth: "10%",
              z: 2,
              itemStyle: {
                emphasis: {
                  barBorderRadius: 7,
                },
                normal: {
                  barBorderRadius: 7,
                  color: function (params) {
                    return new echarts.graphic.LinearGradient(0, 0.4, 0.8, 1, [
                      { offset: 0, color: "#2A86E3" },
                      { offset: 1, color: "#48A3F1" },
                    ]);
                  },
                },
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: "#2A86E3",
                    fontSize: 14,
                  },
                  position: "right",
                },
              },
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
