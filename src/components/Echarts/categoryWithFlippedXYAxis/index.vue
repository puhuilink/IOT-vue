<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import { getIndustrialNetworkAuditData } from "@/utils/request";
import { setNotopt } from "@/utils/emptyEcharts.js";
import { quickSort } from "@/utils/hexColorValueOrdering.js";
import {
  industrialNetworkAuditsourceIpEcharts,
  industrialNetworkAudittargetIpEcharts,
} from "@/api/system/echarts";
import tip from "@/components/EchartsTip";
export default {
  name: "AAA",
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "事件类型分布",
      type: String,
    },
    type: {
      // tip内容
      default: null,
      type: Number,
    },
    query: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      policitalStatus: ["1"],
      barData: [],
      hasData: [],
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
                "occur_time": {
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
      category: [],
      title: "",
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
      beforeseven.setDate(beforeseven.getDate()  - 6);
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
    transDic(data) {
      var arr = data;
      var arrNew = [];
      arrNew = arr.map((item) => {
        return {
          value: item.doc_count,
          name: item.key,
        };
      });
      return arrNew;
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
    async getData() {
      switch (this.type) {
        case 1:
          await getIndustrialNetworkAuditData(this.queryParms).then(
            ({ data }) => {
              console.log("4-13-getWeakPasswordData", data);
              this.hasData = data.aggregations.field.buckets;
              // this.data1 = this.transDic(data.aggregations.field.buckets)
              this.category = this.transDicName(
                data.aggregations.field.buckets
              );
              this.barData = this.transDicCount(
                data.aggregations.field.buckets
              );
              this.queryParms.query.bool.must =  [{
                  range: {
                    "occur_time": {
                      gte: this.getdate(2)[0],
                      lte: this.getdate(2)[1],
                    },
                  },
                }];
            }
          );
          break;
        case 2:
          await industrialNetworkAudittargetIpEcharts(this.queryParms).then(
            ({ data }) => {
              this.hasData = data;
              this.category = this.transDicName(data);
              this.barData = this.transDicCount(data);
            }
          );
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
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            minInterval: 1,
            position: "bottom",
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            type: "category",
            inverse: true,
            minInterval: 1,
            data: this.category,
            splitLine: { show: false },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            offset: 10,
            nameTextStyle: {
              fontSize: 15,
            },
          },
          series: [
            {
              name: "数量",
              type: "bar",
              data: this.barData,
              realtimeSort: true,
              barWidth: 14,
              barGap: 10,
              smooth: true,
              label: {
                normal: {
                  show: true,
                  position: "right",
                  offset: [5, -2],
                  textStyle: {
                    color: "#F68300",
                    fontSize: 13,
                  },
                },
              },
              itemStyle: {
                emphasis: {
                  barBorderRadius: 0,
                },
                normal: {
                  barBorderRadius: 0,
                  color: function (params) {
                    var colorList = [
                      "#1890FF",
                      "#B592E4",
                      "#F0B144",
                      "#FF8745",
                      "#F73030",
                      "#43A682",
                      "#ca8622",
                    ];
                    var newcolorList = quickSort(colorList);
                    return newcolorList[params.dataIndex];
                  },
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
        return setNotopt(myChart, "最近七天无数据");
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
