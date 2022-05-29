
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
// import { EventStatusDispositionDiagram } from '@/api/system/echarts'
// import { EventTypeDistribution } from '@/api/system/echarts'
// import { EventLevelDistribution } from '@/api/system/echarts'
import { abnormalEventLevelDistribution } from '@/api/system/echarts'
export default {
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "事件等级分布",
      type: String,
    },
    // address: {
    //   // 厂家内容
    //   default: null,
    //   type: Number,
    // },
    // 主机安全-事件类型分布
    EventTypeDistribution: {
      default: null,
      type: Number,
    },
    // 入侵诱捕-事件等级分布
    attack: {
      default: null,
      type: Number,
    },
    //异常行为管理-事件等级分布
    abnormal: {
      default: null,
      type: Number,
    },
    query: {
      default: null,
      type: Object
    },
    // type: {
    //   default: null,
    //   type: Number
    // }
  },
  data () {
    return {
      policitalStatus: ["1"],
      barData: [],
      category: [],
      title: "",
      queryParms: {
      },
      type: 1
    };
  },
  computed: {},
  watch: {
    query: {
      handler (val, oldVal) {
        this.queryParms = this.query
        if (val !== oldVal) {
          this.getData()
          this.drawPolicitalStatus()
        }
      },
      deep: true
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.drawPolicitalStatus();
  },
  methods: {
    transDic (data) {
      var arr = data
      var arrNew = []
      var area = []
      data.forEach((item) => {
        area.push(item.name)
      })
      arrNew = arr.map((item) => {
        return {
          value: item.count,
          name: item.name
        }
      })
      return arrNew
    },
    async getData () {
      switch (this.type) {
        case 1:
          switch (this.name) {
            case 'abnormal':
              await abnormalEventLevelDistribution(this.queryParms).then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            case 3:
              this.datacopy = [
                { value: 3148, name: '僵木蠕事件' },
                { value: 2514, name: '漏洞' },
                { value: 1179, name: '配置核查' },
                { value: 2023, name: '工业网络' },
                { value: 562, name: '诱捕防护' }
              ]
              break
            case 4:
              this.datacopy = [
                { value: 3348, name: '僵木蠕事件' },
                { value: 2514, name: '漏洞' },
                { value: 2699, name: '配置核查' },
                { value: 623, name: '工业网络' },
                { value: 762, name: '诱捕防护' }
              ]
              break
            case 5:
              this.datacopy = [
                { value: 3142, name: '僵木蠕事件' },
                { value: 2114, name: '漏洞' },
                { value: 1499, name: '配置核查' },
                { value: 423, name: '工业网络' },
                { value: 1362, name: '诱捕防护' }
              ]
              break
            case 6:
              this.datacopy = [
                { value: 3148, name: '僵木蠕事件' },
                { value: 1614, name: '漏洞' },
                { value: 2699, name: '配置核查' },
                { value: 2023, name: '工业网络' },
                { value: 462, name: '诱捕防护' }
              ]
              break
            case 7:
              // 工业审计
              await eventCategoryEcharts(this.queryParms).then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }
          break
        case 2:
          switch (this.name) {
            case 'host':
              await EventStatusDispositionDiagram(this.queryParms).then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break

            case 5:
              this.datacopy = [
                { value: 3448, name: '待上报' },
                { value: 1514, name: '处置中' },
                { value: 1199, name: '已处置' },
                { value: 1623, name: '已完成' },
                { value: 562, name: '待处置' }
              ]
              break
            case 6:
              this.datacopy = [
                { value: 1948, name: '待上报' },
                { value: 1514, name: '处置中' },
                { value: 699, name: '已处置' },
                { value: 423, name: '已完成' },
                { value: 762, name: '待处置' }
              ]
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }

          break
        case 3:
          // 僵木蠕
          switch (this.name) {
            case '1':
              await CreepeventNameEcharts(this.queryParms).then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }

          break
        case 4:
          switch (this.name) {
            case 'dataSafe':
              await eventLevelEcharts(this.queryParms).then(({ data }) => {
                this.datacopy = this.transTypeDic(data)
              })
              break
            case 'weakPassword':
              // 弱口令
              await selectEventLevelEcharts(this.queryParms).then(({ data }) => {
                this.datacopy = this.transTypeDic(data)
              })
              break
            case 3:
              await eventLevelEcharts(this.queryParms).then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }

          break
        case 5:
          switch (this.name) {
            case 'dataSafe':
              await policyNameEcharts(this.queryParms).then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            case 2:
              await policyNameEcharts(this.queryParms).then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }
          break
        case 6:
          switch (this.name) {
            case 'dataSafe':
              await recipientEcharts(this.queryParms).then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            case 2:
              await recipientEcharts(this.queryParms).then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }
          break
        default:
          console.log('这里是项目类型', this.type)
          break
      }
      this.drawPolicitalStatus()
    },
    drawPolicitalStatus () {
      if (this.policitalStatus.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1)
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item'
          },
          color: ['#2C82FC ', '#ffaf37', '#31B3D2', '#9D6AFF', '#FF7B82', '#43A682 ', '#ca8622'],
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 120,
            bottom: 20,
            formatter: function (value) {
              const val = value.length > 10 ? value.substr(0, 6) + '...' + value.substr(value.length - 3, value.length - 1) : value
              return val
            }

          },
          series: [
            {
              label: {
                show: true
              },
              type: 'pie',
              radius: '50%',
              data: this.datacopy,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      } else {
        const myChart = this.$echarts.init(this.$refs.canvas1)
        this.$refs.canvas1.removeAttribute('_echarts_instance_')
        return setNotopt(myChart, '最近七天无数据')
      }
    }
    // async drawPolicitalStatus () {
    //   if (this.policitalStatus.length) {
    //     // switch (this.address) {
    //     //   case 1:
    //     //     (this.category = [
    //     //       { value: 1348, name: "不处置(3948)" },
    //     //       { value: 335, name: "处置中(2514)" },
    //     //       { value: 580, name: "已处置(1699)" },
    //     //       { value: 484, name: "误报(1023)" },
    //     //       { value: 300, name: "待处置(362)" },
    //     //     ]),
    //     //       // (this.barData = [18, 2, 32, 13, 15]),
    //     //       (this.title = "源IP");
    //     //     break;
    //     //   case 2:
    //     //     (this.category = [
    //     //       { value: 348, name: "不处置(3948)" },
    //     //       { value: 1335, name: "处置中(2514)" },
    //     //       { value: 580, name: "已处置(1699)" },
    //     //       { value: 484, name: "误报(1023)" },
    //     //       { value: 300, name: "待处置(362)" },
    //     //     ]),
    //     //       // (this.barData = [18, 12, 2, 3, 8]),
    //     //       (this.title = "源IP");
    //     //     break;
    //     //   case 3:
    //     //     (this.category = [
    //     //       { value: 1348, name: "不处置(3948)" },
    //     //       { value: 335, name: "处置中(2514)" },
    //     //       { value: 580, name: "已处置(1699)" },
    //     //       { value: 484, name: "误报(1023)" },
    //     //       { value: 300, name: "待处置(362)" },
    //     //     ]),
    //     //       // (this.barData = [8, 22, 22, 30, 85]),
    //     //       (this.title = "源IP");
    //     //     break;
    //     //   case 4:
    //     //     (this.category = [
    //     //       { value: 1348, name: "不处置(3948)" },
    //     //       { value: 335, name: "处置中(2514)" },
    //     //       { value: 580, name: "已处置(1699)" },
    //     //       { value: 484, name: "误报(1023)" },
    //     //       { value: 300, name: "待处置(362)" },
    //     //     ]),
    //     //       // (this.barData = [8, 22, 22, 30, 85]),
    //     //       (this.title = "源IP");
    //     //     break;
    //     //   case 5:
    //     //     (this.category = [
    //     //       { value: 1348, name: "不处置(3948)" },
    //     //       { value: 335, name: "处置中(2514)" },
    //     //       { value: 580, name: "已处置(1699)" },
    //     //       { value: 484, name: "误报(1023)" },
    //     //       { value: 300, name: "待处置(362)" },
    //     //     ]),
    //     //       // (this.barData = [8, 22, 22, 30, 85]),
    //     //       (this.title = "源IP");
    //     //     break;
    //     //   default:
    //     //     console.log("无数据", this.type);
    //     //     break;
    //     // }
    //     // 基于准备好的dom，初始化echarts实例
    //     if (this.EventTypeDistribution === 1) {
    //       await EventTypeDistribution(this.queryParms).then(({ data }) => {
    //         this.category = this.transDic(data)
    //       })
    //     } else if (this.attack === 1) {
    //       await EventLevelDistribution(this.queryParms).then(({ data }) => {
    //         this.category = this.transDic(data)
    //       })
    //     }
    //     else if (this.abnormal === 1) {
    //       await abnormalEventLevelDistribution(this.queryParms).then(({ data }) => {
    //         this.category = this.transDic(data)
    //       })
    //     }
    //     else {
    //       await EventStatusDispositionDiagram(this.queryParms).then(({ data }) => {
    //         this.category = this.transDic(data)
    //       })
    //     }

    //     const myChart = this.$echarts.init(this.$refs.canvas1);

    //     // 绘制图表
    //     myChart.setOption({
    //       title: {
    //         // text: 'Referer of a Website',
    //         // subtext: 'Fake Data',
    //         left: "center",
    //       },
    //       tooltip: {
    //         trigger: "item",
    //       },
    //       legend: {
    //         orient: "vertical",
    //         left: "right",
    //         //  data:this.opinion
    //       },
    //       color: ["#5599ff", "#77DDFF", "#00AA00", "#FFC851", "#E63F00"],
    //       series: [
    //         {
    //           name: "Access From",
    //           type: "pie",
    //           radius: "50%",
    //           data: this.category,
    //           emphasis: {
    //             itemStyle: {
    //               shadowBlur: 10,
    //               shadowOffsetX: 0,
    //               shadowColor: "rgba(0, 0, 0, 0.5)",
    //             },
    //           },
    //         },
    //       ],
    //     });
    //     window.addEventListener("resize", function () {
    //       myChart.resize();
    //     });
    //   } else {
    //     const myChart = this.$echarts.init(this.$refs.canvas1);
    //     this.$refs.canvas1.removeAttribute("_echarts_instance_");
    //     return setNotopt(myChart, "最近七天无数据");
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
</style>
