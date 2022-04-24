<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import {
  getbaseJiangTableData,
  getHostSecurityData,
  getManagementThreatEventsData,
} from "@/utils/request";
import tip from "@/components/EchartsTip";
import { setNotopt } from "@/utils/emptyEcharts.js";
import { eventNameEcharts } from "@/api/system/echarts";
import "@/components/Echarts/echarts-wordcloud.min.js";
export default {
  name: "Wordcloud",
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "事件名称词云图",
      type: String,
    },
    name: {
      // 组件名称
      default: "",
      type: String,
    },
    query: {
      default: null,
      type: Object,
    },
    host: {
      //  主机安全管理-事件统计分析
      default: null,
      type: Number,
    },
  },
  data() {
    return {
      hasData: [],
      datacopy: [],
      queryParms: {
        query: {
          bool: {
            must: [],
          },
        },
        aggs: {
          field: {
            terms: {
              field: "event_name",
              size: 10,
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
                severity: val.severity,
              },
            });
          }
          if (val.location) {
            this.queryParms.query.bool.must.push({
              match: {
                location: val.location,
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
      var arr = data;
      var arrNew = [];
      var area = [];
      data.forEach((item) => {
        area.push(item.key);
      });
      arrNew = arr.map((item) => {
        return {
          value: item.doc_count,
          name: item.key,
        };
      });
      return arrNew;
    },
    async getData() {
      if (this.host) {
        await getHostSecurityData(this.queryParms).then(({ data }) => {
          this.hasData = data.aggregations.field.buckets;
          this.datacopy = this.transDic(data.aggregations.field.buckets);
          this.queryParms.query.bool.must = [];
        });
      } else {
        switch (this.name) {
          case "Jiangwoodcreep":
            await getbaseJiangTableData(this.queryParms).then(({ data }) => {
              this.hasData = data.aggregations.field.buckets;
              this.datacopy = this.transDic(data.aggregations.field.buckets);
              this.queryParms.query.bool.must = [];
            });
            break;
          case "event":
            await getManagementThreatEventsData(this.queryParms).then(
              ({ data }) => {
                this.hasData = data.aggregations.field.buckets;
                this.datacopy = this.transDic(data.aggregations.field.buckets);
                this.queryParms.query.bool.must = [];
              }
            );
            break;
          default:
            console.log("这里是项目类型", this.address);
            break;
        }
      }
      this.drawPolicitalStatus();
    },
    drawPolicitalStatus() {
      if (this.hasData.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1);
        // 绘制图表
        myChart.setOption({
          tooltip: {
            show: true,
            formatter: function (params) {
              return params.name + " : " + params.value;
            },
          },
          series: [
            {
              type: "wordCloud",
              shape: "circle",
              left: "center",
              top: "center",
              width: "100%",
              height: "100%",
              right: null,
              bottom: null,
              sizeRange: [12, 30],
              rotationRange: [0, 0],
              rotationStep: 45,
              gridSize: 8,
              drawOutOfBound: true,
              textStyle: {
                normal: {
                  color: function () {
                    return (
                      "rgb(" +
                      [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                      ].join(",") +
                      ")"
                    );
                  },
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowColor: "#333",
                },
              },
              data: this.datacopy,
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
.tip {
  border-left: 4px solid #3d6bca;
  border-radius: 3px;
  font-weight: bold;
  height: 24px;
  padding: 2px;
  padding-left: 12px;
}
</style>
