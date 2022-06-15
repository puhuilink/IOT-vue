<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import { setNotopt } from "@/utils/emptyEcharts.js";
import { KillChain } from "@/api/system/echarts";
import tip from "@/components/EchartsTip";
export default {
  name: "AAA",
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "杀伤链阶段统计",
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
    search: {
      //es索引
      default: "",
      type: String,
    },
  },
  data() {
    return {
      name:"KillChainPhaseStatistics",
      policitalStatus: ["1"],
      barData: [],
      category: [],
      date: [],
      categoryName: [],
      dataArray:[],
      axisData: [],
      hasData: [],
      // data:[],
      dataArr:[],
      queryParms: {
        indexes: this.search,
        beginTime: "",
        endTime: "",
        severity: "",
        location: "",
        evKsecKillchain: "",
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
      // const { data } = await KillChain(this.queryParms);
      await KillChain(this.queryParms).then(({ data }) => {
        // console.log('6-15',data)
      //  接口数据格式：
        // var data = [
        //   {eventSeverity: "Delivery",data: [1, 2, 0, 4, 8, 0, 0],date: ["2022-06-09", "2022-06-10", "2022-06-11", "2022-06-12", "2022-06-13", "2022-06-14", "2022-06-15"]},
        //   {eventSeverity: "Recon",data: [97, 2,7, 8, 0, 6, 0],date: ["2022-06-09", "2022-06-10", "2022-06-11", "2022-06-12", "2022-06-13", "2022-06-14", "2022-06-15"]},
        //   {eventSeverity: "Exploitation",data: [0, 2, 6, 2, 42, 1, 0],date: ["2022-06-09", "2022-06-10", "2022-06-11", "2022-06-12", "2022-06-13", "2022-06-14", "2022-06-15"]},
        //   {eventSeverity: "Beacon",data: [0, 74, 0, 0, 0, 0, 0],date: ["2022-06-09", "2022-06-10", "2022-06-11", "2022-06-12", "2022-06-13", "2022-06-14", "2022-06-15"]},
        //   {},
        //   {eventSeverity: "CnC",data: [7, 2, 8, 6, 7, 0, 0],date: ["2022-06-09", "2022-06-10", "2022-06-11", "2022-06-12", "2022-06-13", "2022-06-14", "2022-06-15"]},
        //   {}
        //   ];
          console.log('data---6-15--假',data)
        this.hasData = data;
        this.categoryName = [];
        if (this.hasData) {
          var dataArray = data[0].data;
          // console.log('dataArray',dataArray)
          for (let j = 0; j < dataArray.length; j++) {
            const dataArr = data[j].data;

            this.categoryName.push(data[j].eventSeverity);
            for (let i = 0; i < dataArr.length; i++) {
              const height = dataArr[i];
              const newArr = [j, i, height];
              this.axisData.push(newArr);
            }
            this.category = this.axisData.map(function (item) {
              return [item[1], item[0], item[2]];
            });
            this.date = data[0].date;
            console.log('this.category',this.category)
          }
        } else {
          this.category = [];
          this.date = [];
          this.categoryName = [];
        }
      });
      this.drawPolicitalStatus();
    },
   drawPolicitalStatus() {
      if (this.hasData) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1);
        const hours = this.date;
        // prettier-ignore
        const days = this.categoryName
        // 绘制图表
        myChart.setOption({
          color: ["#ADD8E6"],
          tooltip: {
            position: "top",
            formatter: function (params) {
              return (
                params.value[2] +
                " commits in " +
                hours[params.value[0]] +
                " of " +
                days[params.value[1]]
              );
            },
          },
          grid: {
            left: 2,
            bottom: 10,
            right: 10,
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: hours,
            boundaryGap: false,
            splitLine: {
              show: true,
            },
            axisLine: {
              show: false,
            },
          },
          yAxis: {
            type: "category",
            data: days,
            axisLine: {
              show: false,
            },
          },
          series: [
            {
              type: "scatter",
              symbolSize: function (val) {
                // TODO 根据不同值设置不同散点大小
                // if (val[2] < 20) {
                //   return val[2] * 4
                // } else if (val[2] > 20 < 50) {
                //   return val[2] * 2
                // }
                return val[2] * 2;
              },
              data: this.category,
              animationDelay: function (idx) {
                return idx * 5;
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
