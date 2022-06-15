<template>
  <div>
    <div >
      <el-col :span="12">
        <tip>{{ tipname }}</tip>
        <div ref="canvas1" style="height: 400px" />
      </el-col>
    </div>
  </div>
</template>
<script>
import { setNotopt } from "@/utils/emptyEcharts.js";
import { eventEsDataInvasion } from "@/api/system/echarts";
import tip from "@/components/EchartsTip";
export default {
  name: "AAA",
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "探测事件/入侵事件趋势",
      type: String,
    },
    search: {
      //es索引
      default: "",
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
    eventType: {
      default: null,
      type: Number,
    },
  },
  data() {
    return {
         querys: {
        severity: "",
        beginGenerationTime: this.getdate(2)[0],
        endGenerationTime: this.getdate(2)[1]+ ' 23-59-59',
        location: "",
      },
       queryParms: {
        indexes: this.search,
        beginTime: "",
        endTime: "",
        severity: "",
        location: "",
        evKsecKillchain:""
      },
      policitalStatus: ["1"],
      hasData: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
    };
  },
  computed: {},
  watch: {
    query: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          if (val.severity) {
             this.querys.severity = val.severity;
            this.queryParms.severity = val.severity;
          } else {
             this.querys.severity ="";
            this.queryParms.severity = "";
          }
          if (val.location) {
             this.querys.location = val.location;
            this.queryParms.location = val.location;
          } else {
             this.querys.location = "";
            this.queryParms.location = "";
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
    transTypeDic(data) {
      var t = [
        {
          name: "1",
          content: "极低",
        },
        {
          name: "2",
          content: "低危",
        },
        {
          name: "3",
          content: "中危",
        },
        {
          name: "4",
          content: "高危",
        },
        {
          name: "5",
          content: "致命",
        },
      ];
      var arr = data;
      var arrNew = [];
      var area = [];
      data.forEach((item) => {
        area.push(item.name);
      });
      arr.map((r) => {
        t.map((d) => {
          if (r.name === d.name) {
            arrNew.push({
              value: r.count,
              name: d.content,
            });
          }
        });
      });
      return arrNew;
    },
    transDicCount(data) {
      var area = [];
      data.forEach((item) => {
        area.push(item.count);
      });
      return area;
    },
    transDicData(data) {
      if (data.length) {
        const aaa = data.filter((e) => e.eventSeverity === "PROBE");
        if (aaa.length) {
          aaa.map((d) => {
            this.data1 = d.data;
            this.date = d.date;
          });
        } else {
          this.data1 = [0,0,0,0,0,0,0];
        }
        const bbb = data.filter((e) => e.eventSeverity === "INVADE");
        if (bbb.length) {
          bbb.map((d) => {
            this.data2 = d.data;
            this.date = d.date;
          });
        } else {
          this.data2 = [0,0,0,0,0,0,0];
        }
      } else {
        this.data1 = [];
        this.data2 = [];
      }
      return [this.data1, this.data2];
    },
    async getData() {
      switch (this.name) {
        case "invade":
          await eventEsDataInvasion(this.queryParms).then(({ data }) => {
            this.hasData = data;
            this.data1 = this.transDicData(data)[0];
            this.data2 = this.transDicData(data)[1];
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
          animationDuration: 5000,
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["探测趋势", "入侵趋势"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            minInterval: 1,
            axisTick: {
              // x轴刻度线
              show: false,
            },
            data: this.date,
          },
          yAxis: {
            minInterval: 1,
            axisTick: {
              // x轴刻度线
              show: false,
            },
            type: "value",
            axisLine: { show: false },
          },
          series: [
            {
              name: "探测趋势",
              stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
              color: ["#1890FF"],
              type: "line",
              smooth: true,
              data: this.data1,
            },
            {
              name: "入侵趋势",
              stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
              color: ["#B592E4"],
              type: "line",
              smooth: true,
              data: this.data2,
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
