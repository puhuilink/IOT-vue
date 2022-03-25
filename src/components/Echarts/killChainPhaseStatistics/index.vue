
<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1"
         style="height: 400px" />
  </el-col>
</template>
<script>
import { setNotopt } from "@/utils/emptyEcharts.js";
import tip from "@/components/EchartsTip";
import echarts from "echarts";
import { KillChain } from '@/api/system/echarts'
import threatAlarmsVue from '../../../views/eventMonitoringAndEarlyWarning/threatAlarms.vue';
export default {
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "杀伤链阶段统计",
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
      policitalStatus: ["1"],
      barData: [],
      category: [],
      categoryArr: [],
      axisData: [],
      title: "",
    };
  },
  computed: {},
  watch: {
    address: {
      handler (val, oldVal) {
        if (val !== oldVal) {
          this.drawPolicitalStatus();
        }
      },
      deep: true,
    },
  },
  created () {
    this.getData()
  },
  mounted () {
    this.drawPolicitalStatus();
  },
  methods: {
    // async getData () {
    //   await KillChain(this.queryParms).then(({ data }) => {
    //     // var axisData = []
    //     var dataArray = data[0].data
    //     for (let j = 0; j < dataArray.length; j++) {
    //       let dataArr = data[j].data
    //       console.log('j', j)
    //       console.log('data[j].data', data[j].data)
    //       for (let i = 0; i < dataArr.length; i++) {
    //         let height = dataArr[i]
    //         let newArr = [j, i, height]
    //         axisData.push(newArr)
    //       }
    //       console.log('axisData', this.axisData);
    //       const categoryArr = [];
    //       const this_ = this;
    //       this_.categoryArr = this_.axisData;
    //     }
    //     console.log('this.categoryArr', this.categoryArr);
    //     this.category = axisData.map(function (item) {
    //       return [item[1], item[0], item[2]];
    //     }),
    //       console.log('this.category---3----24', this.category)
    //         (this.title = "源IP");
    //     // this.hasData = data
    //     // if (data.length) {
    //     // } else {
    //     //   this.category = []
    //     // }
    //   })
    //   this.drawPolicitalStatus()
    // },
    async getData () {
      await KillChain(this.queryParms).then(({ data }) => {
        var dataArray = data[0].data;
        for (let j = 0; j < dataArray.length; j++) {
          const dataArr = data[j].data;
          console.log('j', j);
          console.log('data[j].data', data[j].data);
          for (let i = 0; i < dataArr.length; i++) {
            const height = dataArr[i];
            const newArr = [j, i, height];
            this.axisData.push(newArr);
          }
          this.category = this.axisData.map(function (item) {
            return [item[1], item[0], item[2]];
          });
          (this.title = '源IP');
          // const categoryArr = [];
          // const this_ = this;
          // this_.categoryArr = this_.axisData;
        }
        // console.log('this.categoryArr', this.categoryArr);
        // this.category = axisData
        // console.log('this.category---3----24', this.category)
      });
      this.drawPolicitalStatus();
    },
    async drawPolicitalStatus () {
      if (this.policitalStatus.length) {
        // switch (this.address) {
        //   case 1:
        // (this.category = [
        //   [0, 0, 5],
        //   [0, 1, 5],
        //   [0, 2, 5],
        //   [0, 3, 5],
        //   [0, 4, 5],
        //   [0, 5, 5],
        //   [0, 6, 5],
        //   [1, 0, 4],
        //   [1, 1, 4],
        //   [1, 2, 4],
        //   [1, 3, 4],
        //   [1, 4, 4],
        //   [1, 5, 4],
        //   [1, 6, 4],
        //   [2, 0, 7],
        //   [2, 1, 7],
        //   [2, 2, 7],
        //   [2, 3, 7],
        //   [2, 4, 7],
        //   [2, 5, 7],
        //   [2, 6, 7],
        //   [3, 0, 9],
        //   [3, 1, 9],
        //   [3, 2, 9],
        //   [3, 3, 9],
        //   [3, 4, 9],
        //   [3, 5, 9],
        //   [3, 6, 9],
        //   [4, 0, 1],
        //   [4, 1, 1],
        //   [4, 2, 1],
        //   [4, 3, 1],
        //   [4, 4, 1],
        //   [4, 5, 1],
        //   [4, 6, 1],
        //   [5, 0, 3],
        //   [5, 1, 3],
        //   [5, 2, 3],
        //   [5, 3, 3],
        //   [5, 4, 3],
        //   [5, 5, 3],
        //   [5, 6, 3],
        //   [6, 0, 9],
        //   [6, 1, 9],
        //   [6, 2, 9],
        //   [6, 3, 9],
        //   [6, 4, 9],
        //   [6, 5, 9],
        //   [6, 6, 9],
        // ].map(function (item) {
        //   return [item[1], item[0], item[2]];
        // })),
        //   // (this.barData = [18, 2, 32, 13, 15]),
        //   (this.title = "源IP");
        // break;


        // default:
        //   console.log("无数据", this.type);
        //   break;
        // }
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1);
        const hours = [
          "01-20",
          "01-21",
          "01-22",
          "01-23",
          "01-24",
          "01-25",
          "01-26",
        ];
        // prettier-ignore
        const days = ['侦察跟踪', '武器构建', '荷载投递', '突防利用', '安装植入'];
        // prettier-ignore
        //         const data = [[0, 0, 5], [0, 1, 5], [0, 2, 5], [0, 3, 5], [0, 4, 5], [0, 5, 5], [0, 6, 5],  [1, 0, 4], [1, 1,4], [1, 2, 4], [1, 3, 4], [1, 4, 4], [1, 5,4], [1, 6, 4],  [2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0],  [3, 0, 5], [3, 1, 5], [3, 2, 5], [3, 3, 5], [3, 4, 5], [3, 5, 5], [3, 6, 5],  [4, 0, 6], [4, 1, 6], [4, 2, 6], [4, 3, 6], [4, 4, 6], [4, 5, 6], [4, 6, 6],  [5, 0, 9], [5, 1, 9], [5, 2, 9], [5, 3, 9], [5, 4, 9], [5, 5, 9], [5, 6, 9], [6, 0, 2], [6, 1, 2], [6, 2, 2], [6, 3, 2], [6, 4, 2], [6, 5, 2], [6, 6, 2]]
        //     .map(function (item) {
        //     return [item[1], item[0], item[2]];
        // });
        // 绘制图表
        myChart.setOption({
          color: ["#ADD8E6"],
          title: {
            text: "Punch Card of Github",
          },
          legend: {
            data: ["Punch Card"],
            left: "right",
          },
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
              name: "Punch Card",
              type: "scatter",
              symbolSize: function (val) {
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
        return setNotopt(myChart, "暂无数据");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
