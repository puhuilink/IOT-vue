<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import { setNotopt } from "@/utils/emptyEcharts.js";
import { eventEsData } from "@/api/system/echarts";
import tip from "@/components/EchartsTip";
import echarts from "echarts";
import { UnderAttack } from "@/api/system/echarts";
export default {
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "探测事件/入侵事件趋势",
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
    search: {
      //es索引
      default: "",
      type: String,
    },
  },
  data() {
    return {
      policitalStatus: ["1"],
      barData: [],
      category: [],
      hasData: [],
      date: [],
      title: "",
      queryParms: {
        indexes: this.search,
        beginTime: "",
        endTime: "",
        severity: "",
        location: "",
      },
    };
  },
  computed: {},
  watch: {
    query: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          if (val.severity) {
            this.queryParms.severity = val.severity;
          } else {
            this.queryParms.severity = "";
          }
          if (val.location) {
            this.queryParms.location = val.location;
          } else {
            this.queryParms.location = "";
          }

          if (val.beginGenerationTime && val.endGenerationTime) {
            this.queryParms.beginTime = val.beginGenerationTime;
            this.queryParms.endTime = val.endGenerationTime;
          } else {
            this.queryParms.beginTime = "";
            this.queryParms.endTime = "";
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
    async getData() {
      await eventEsData(this.queryParms).then(({ data }) => {
        this.hasData = data;
        console.log("data", data);
        if (data.length) {
          const aaa = data.filter((e) => e.type === "INVADE");
          if (aaa.length) {
            aaa.map((d) => {
              this.category = d.data;
              console.log("this.category", this.category);
              this.date = d.date;
            });
          } else {
            this.category = [];
          }
          const bbb = data.filter((e) => e.type === "PROBE");
          if (bbb.length) {
            bbb.map((d) => {
              this.barData = d.data;
              this.date = d.date;
            });
          } else {
            this.barData = [];
          }
        } else {
          this.category = [];
          this.barData = [];
        }
      });
      this.drawPolicitalStatus();
    },
    async drawPolicitalStatus() {
      if (this.hasData.length) {
        // switch (this.eventType) {
        //   case 1:
        //     (this.category = ["", 0, 0, 0, 0, 6, 10, 0]),
        //       (this.barData = ["", 0, 0, 0, 0, 6, 2, 0]),
        //       (this.title = "源IP");
        //     break;
        //   case 2:
        //     (this.category = ["", 0, 0, 10, 0, 6, 11, 0]),
        //       (this.barData = ["", 0, 0, 0, 0, 6, 9, 0]),
        //       (this.title = "源IP");
        //     break;
        //   case 3:
        //     (this.category = ["", 0, 0, 0, 0, 6, 12, 0]),
        //       (this.barData = ["", 0, 0, 0, 0, 6, 17, 0]),
        //       (this.title = "源IP");
        //     break;
        //   case 4:
        //     (this.category = ["", 0, 0, 0, 0, 6, 13, 0]),
        //       (this.barData = ["", 0, 0, 0, 0, 6, 18, 0]),
        //       (this.title = "源IP");
        //     break;
        //   case 5:
        //     (this.category = ["", 0, 0, 0, 0, 6, 14, 0]),
        //       (this.barData = ["", 0, 0, 0, 0, 5, 19, 0]),
        //       (this.title = "源IP");
        //     break;
        //   default:
        //     console.log("无数据", this.type);
        //     break;
        // }
        // 基于准备好的dom，
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1);

        // 绘制图表
        myChart.setOption({
          title: {
            // text: "Stacked Area Chart",
          },
          color: ["#FFC0CB", "#00BBFF"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          legend: {
            data: [
              // "Email",
              // "Union Ads",
              // "Video Ads",
              // "Direct",
              // "Search Engine",
            ],
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: this.date,
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            // {
            //   name: "Email",
            //   type: "line",
            //   stack: "Total",
            //   areaStyle: {},
            //   emphasis: {
            //     focus: "series",
            //   },
            //   data: [120, 132, 101, 134, 90, 230, 210],
            // },
            // {
            //   name: "Union Ads",
            //   type: "line",
            //   stack: "Total",
            //   areaStyle: {},
            //   emphasis: {
            //     focus: "series",
            //   },
            //   data: [220, 182, 191, 234, 290, 330, 310],
            // },
            {
              name: "探测",
              type: "line",
              stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
              data: this.category,
            },
            {
              name: "入侵",
              type: "line",
              stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
              data: this.barData,
            },
            // {
            //   name: "Search Engine",
            //   type: "line",
            //   stack: "Total",
            //   label: {
            //     show: true,
            //     position: "top",
            //   },
            //   areaStyle: {},
            //   emphasis: {
            //     focus: "series",
            //   },
            //   data: [820, 932, 901, 934, 1290, 1330, 1320],
            // },
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
