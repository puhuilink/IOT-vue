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
import echarts from "echarts";
export default {
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "杀伤链阶段流量统计",
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
      categoryThree: [],
      categoryFour: [],
      categorySix: [],
      categorySeven: [],
      title: "",
      queryParms: {
        indexes: this.search,
        beginTime: "",
        endTime: "",
        severity: "",
        location: "",
        evKsecKillchain:""
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
            console.log(r, d);
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
    async getData() {
      await KillChain(this.queryParms).then(({ data }) => {
        this.hasData = data;
        if (data.length) {
          const aaa = data.filter((e) => e.killingChainStage === "载荷投递");
          if (aaa.length) {
            aaa.map((d) => {
              this.categoryThree = d.data;
              this.date = d.date;
            });
          } else {
            this.categoryThree = [];
          }
          const bbb = data.filter((e) => e.killingChainStage === "侦查跟踪");
          if (bbb.length) {
            bbb.map((d) => {
              this.category = d.data;
              this.date = d.date;
            });
          } else {
            this.category = [];
          }
          const ccc = data.filter((e) => e.killingChainStage === "漏洞利用");
          if (bbb.length) {
            bbb.map((d) => {
              this.categoryFour = d.data;
              this.date = d.date;
            });
          } else {
            this.categoryFour = [];
          }
          const ddd = data.filter((e) => e.killingChainStage === "安装植入");
          if (bbb.length) {
            bbb.map((d) => {
              this.categoryFive = d.data;
              this.date = d.date;
            });
          } else {
            this.categoryFive = [];
          }
          const eee = data.filter((e) => e.killingChainStage === "命令控制");
          if (bbb.length) {
            bbb.map((d) => {
              this.barData = d.data;
              this.date = d.date;
            });
          } else {
            this.barData = [];
          }
        } else {
          this.categoryThree = [];
          this.category = [];
          this.categoryFour = [];
          this.categoryFive = [];
          this.barData = [];
        }
      });
      this.drawPolicitalStatus();
    },
    async drawPolicitalStatus() {
      if (this.hasData.length) {
        // 基于准备好的dom，初始化echarts实例
        // const { data } = await KillChain()
        // this.category = [450, 50, 650, 780, 150, 1000, 800],
        //   this.barData = [580, 280, 100, 560, 50, 900, 760],
        //   this.categoryThree = [420, 600, 50, 500, 200, 750, 580],
        //   this.categoryFour = [300, 500, 500, 350, 200, 600, 100],
        //   this.categoryFive = [820, 932, 901, 934, 290, 1030, 1120],
        //   this.categorySix = [(230, 220, 580, 220, 700, 200, 1100)],
        //   this.categorySeven = [(110, 100, 800, 350, 700, 650, 450)];
        const myChart = this.$echarts.init(this.$refs.canvas1);

        // 绘制图表
        myChart.setOption({
          // color: ["#FFC0CB"],
          title: {
            // text: "Stacked Line",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["侦查跟踪", "命令控制", "载荷投递", "漏洞利用", "安装植入"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.date,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "侦查跟踪",
              type: "line",
              stack: "Total",
              data: this.category,
            },
            {
              name: "命令控制",
              type: "line",
              // stack: "Total",
              data: this.barData,
            },
            {
              name: "载荷投递",
              type: "line",
              // stack: "Total",
              data: this.categoryThree,
            },
            {
              name: "漏洞利用",
              type: "line",
              // stack: "Total",
              data: this.categoryFour,
            },
            {
              name: "安装植入",
              type: "line",
              // stack: "Total",
              data: this.categoryFive,
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
