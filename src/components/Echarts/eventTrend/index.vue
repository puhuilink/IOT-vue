<template>
  <div>
    <div v-if="name == 'report'">
      <el-col :span="24">
        <div ref="canvas1" style="height: 400px" />
      </el-col>
    </div>
    <div v-else-if="name == 'host'">
      <el-col :span="24">
        <tip>{{ tipname }}</tip>
        <div ref="canvas1" style="height: 400px" />
      </el-col>
    </div>
    <div v-else-if="name == 'abnormal'">
      <el-col :span="24">
        <tip>{{ tipname }}</tip>
        <div ref="canvas1" style="height: 400px" />
      </el-col>
    </div>
     <div v-else-if="name == 'device'">
      <el-col :span="12">
        <div ref="canvas1" style="height: 400px" />
        <div style="text-align:center">{{tipname}}</div>
      </el-col>
    </div>
     <div v-else-if="name == 'equipment'">
      <el-col :span="24">
        <tip>{{ tipname }}</tip>
        <div ref="canvas1" style="height: 400px" />
        <!-- <div style="text-align:center">{{tipname}}</div> -->
      </el-col>
    </div>
    <div v-else>
      <el-col :span="12">
        <tip>{{ tipname }}</tip>
        <div ref="canvas1" style="height: 400px" />
      </el-col>
    </div>
  </div>
</template>
<script>
import { setNotopt } from "@/utils/emptyEcharts.js";
import { eventEsData,eventEsHostData, scanningeventLevelEcharts } from "@/api/system/echarts";
import tip from "@/components/EchartsTip";
export default {
  name: "AAA",
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "事件趋势分析",
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
        beginGenerationTime:this.getdate(2)[0],
        endGenerationTime:this.getdate(2)[1],
        severity: "",
        location: "",
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
        const aaa = data.filter((e) => e.eventSeverity === "1");
        if (aaa.length) {
          aaa.map((d) => {
            this.data1 = d.data;
            this.date = d.date;
          });
        } else {
          this.data1 = [0,0,0,0,0,0,0];
        }
        const bbb = data.filter((e) => e.eventSeverity === "2");
        if (bbb.length) {
          bbb.map((d) => {
            this.data2 = d.data;
            this.date = d.date;
          });
        } else {
          this.data2 = [0,0,0,0,0,0,0];
        }
        const ccc = data.filter((e) => e.eventSeverity === "3");
        if (ccc.length) {
          ccc.map((d) => {
            this.data3 = d.data;
            this.date = d.date;
          });
        } else {
          this.data3 = [0,0,0,0,0,0,0];
        }
        const ddd = data.filter((e) => e.eventSeverity === "4");
        if (ddd.length) {
          ddd.map((d) => {
            this.data4 = d.data;
            this.date = d.date;
          });
        } else {
          this.data4 = [0,0,0,0,0,0,0];
        }
        const eee = data.filter((e) => e.eventSeverity === "5");
        if (eee.length) {
          eee.map((d) => {
            this.data5 = d.data;
            this.date = d.date;
          });
        } else {
          this.data5 = [0,0,0,0,0,0,0];
        }
      } else {
        this.data1 = [];
        this.data2 = [];
        this.data3 = [];
        this.data4 = [];
        this.data5 = [];
      }
      return [this.data1, this.data2, this.data3, this.data4, this.data5];
    },
    async getData() {
      switch (this.name) {
        case "Jiangwoodcreep":
          await eventEsData(this.queryParms).then(({ data }) => {
            this.hasData = data;
            this.data1 = this.transDicData(data)[0];
            this.data2 = this.transDicData(data)[1];
            this.data3 = this.transDicData(data)[2];
            this.data4 = this.transDicData(data)[3];
            this.data5 = this.transDicData(data)[4];
          });
          break;
        case "weakPassword":
          await eventEsData(this.queryParms).then(({ data }) => {
            this.hasData = data;
            this.data1 = this.transDicData(data)[0];
            this.data2 = this.transDicData(data)[1];
            this.data3 = this.transDicData(data)[2];
            this.data4 = this.transDicData(data)[3];
            this.data5 = this.transDicData(data)[4];
          });
          break;
        case "design":
          await eventEsData(this.queryParms).then(({ data }) => {
            this.hasData = data;
            this.data1 = this.transDicData(data)[0];
            this.data2 = this.transDicData(data)[1];
            this.data3 = this.transDicData(data)[2];
            this.data4 = this.transDicData(data)[3];
            this.data5 = this.transDicData(data)[4];
          });
          break;
        case "host":
          await eventEsHostData(this.queryParms).then(({ data }) => {
            console.log(data);
            this.hasData = data;
            this.data1 = this.transDicData(data)[0];
            this.data2 = this.transDicData(data)[1];
            this.data3 = this.transDicData(data)[2];
            this.data4 = this.transDicData(data)[3];
            this.data5 = this.transDicData(data)[4];
          });
          break;
        case "device":
          this.hasData = [ 332, 601, 834, 590, 930, 1010];
          this.data1 = [ 632, 701, 1134, 890, 430, 210];
          this.data5 = [ 332, 601, 834, 590, 930, 1010];
          this.date = ['2022/5/13','2022/5/14','2022/5/15','2022/5/16','2022/5/17'];
          break;
         case "equipment":
          this.hasData = [ 332, 601, 834, 590, 930, 1010, 666];
          this.data1 = [ 632, 701, 1134, 890, 430, 210, 777];
          this.data2 = [ 332, 511, 134, 690, 830, 910, 888];
          this.data3 = [ 132, 201, 704, 590, 930, 310, 999];
          this.data4 = [ 32, 101, 94, 590, 930, 10, 555];
          this.data5 = [ 332, 601, 834, 590, 930, 610, 333];
          this.date = ['2022/5/13','2022/5/14','2022/5/15','2022/5/16','2022/5/17','2022/5/18','2022/5/19'];
          break;
          // 主机安全管理和异常行为管理，事件趋势分析都展示30天数据，用同一个接口
        case "abnormal":
          await eventEsHostData(this.queryParms).then(({ data }) => {
            this.hasData = data;
            this.data1 = this.transDicData(data)[0];
            this.data2 = this.transDicData(data)[1];
            this.data3 = this.transDicData(data)[2];
            this.data4 = this.transDicData(data)[3];
            this.data5 = this.transDicData(data)[4];
          });
          break;
        case "vulnerablity":
          await scanningeventLevelEcharts(this.querys).then(({ data }) => {
            this.hasData = data;
            if (data.length) {
              const aaa = data.filter((e) => e.eventLevel === "1");
              if (aaa.length) {
                aaa.map((d) => {
                  this.data1 = d.data;
                  this.date = d.date;
                });
              } else {
                this.data1 = [];
              }
              const bbb = data.filter((e) => e.eventLevel === "2");
              if (bbb.length) {
                bbb.map((d) => {
                  this.data2 = d.data;
                  this.date = d.date;
                });
              } else {
                this.data2 = [];
              }
              const ccc = data.filter((e) => e.eventLevel === "3");
              if (ccc.length) {
                ccc.map((d) => {
                  this.data3 = d.data;
                  this.date = d.date;
                });
              } else {
                this.data3 = [];
              }
              const ddd = data.filter((e) => e.eventLevel === "4");
              if (ddd.length) {
                ddd.map((d) => {
                  this.data4 = d.data;
                  this.date = d.date;
                });
              } else {
                this.data4 = [];
              }
            } else {
              this.data1 = [];
              this.data2 = [];
              this.data3 = [];
              this.data4 = [];
              this.data5 = [];
            }
          });
          break;
        case "event":
          await eventEsData(this.queryParms).then(({ data }) => {
            this.hasData = data;
            this.data1 = this.transDicData(data)[0];
            this.data2 = this.transDicData(data)[1];
            this.data3 = this.transDicData(data)[2];
            this.data4 = this.transDicData(data)[3];
            this.data5 = this.transDicData(data)[4];
          });
          break;
        case "report":
          this.hasData = [120, 132, 101, 134, 90, 230, 210];
          this.data1 = [120, 132, 101, 134, 90, 230, 210];
          this.data2 = [20, 32, 201, 334, 190, 230, 210];
          this.data3 = [120, 132, 101, 134, 90, 230, 110];
          this.data4 = [520, 132, 101, 134, 90, 230, 10];
          this.data5 = [120, 132, 201, 134, 190, 230, 310];
          this.date = [1, 2, 3, 4, 5, 6, 7];
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
            data: ["极低", "低危", "中危", "高危", "致命"],
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
              name: "极低",
              // stack: "Total",
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
              name: "低危",
              // stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
              color: ["#B592E4"],
              type: "line",
              smooth: true,
              data: this.data2,
            },
            {
              name: "中危",
              // stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
              color: ["#F0B144"],
              type: "line",
              smooth: true,
              data: this.data3,
            },
            {
              name: "高危",
              // stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
              color: ["#FF8745"],
              type: "line",
              smooth: true,
              data: this.data4,
            },
            {
              name: "致命",
              // stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
              color: ["#F73030"],
              type: "line",
              smooth: true,
              data: this.data5,
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
