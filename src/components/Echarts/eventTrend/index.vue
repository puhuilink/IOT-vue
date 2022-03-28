<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div
      ref="canvas1"
      style="height: 400px"
    />
  </el-col>
</template>
<script>
import { setNotopt } from '@/utils/emptyEcharts.js'
import { eventEcharts, CreepeventLevelEcharts, EventTrendAnalysis, abnormalAnalysis, selectEventLevelGradeEcharts, industrialNetworkAuditEcharts, scanninghostEcharts, scanningeventLevelEcharts } from '@/api/system/echarts'
import tip from '@/components/EchartsTip'
export default {
  name: 'AAA',
  components: { tip },
  props: {
    tipname: { // tip内容
      default: '事件趋势分析',
      type: String
    },
    name: {
      default: '',
      type: String
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
  data() {
    return {
      queryParms: {
      },
      policitalStatus: ['1'],
      hasData: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: []

    }
  },
  computed: {},
  watch: {
    query: {
      handler(val, oldVal) {
        this.queryParms = this.query
        if (val !== oldVal) {
          this.getData()
          this.drawPolicitalStatus()
        }
      },
      deep: true
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.drawPolicitalStatus()
  },
  methods: {
    transTypeDic(data) {
      var t = [{
        name: '1',
        content: '极低'
      }, {
        name: '2',
        content: '低危'
      }, {
        name: '3',
        content: '中危'
      }, {
        name: '4',
        content: '高危'
      }, {
        name: '5',
        content: '致命'
      }]
      var arr = data
      var arrNew = []
      var area = []
      data.forEach((item) => {
        area.push(item.name)
      })
      arr.map(r => {
        t.map(d => {
          if (r.name === d.name) {
            console.log(r, d)
            arrNew.push({
              value: r.count,
              name: d.content
            })
          }
        })
      })
      return arrNew
    },
    transDicCount(data) {
      var area = []
      data.forEach((item) => {
        area.push(item.count)
      })
      return area
    },
    async getData() {
      switch (this.name) {
        case 'Jiangwoodcreep':
          await CreepeventLevelEcharts(this.queryParms).then(({ data }) => {
            this.hasData = data
            if (data.length) {
              const aaa = data.filter((e) => e.eventLevel === '1')
              if (aaa.length) {
                aaa.map(d => {
                  this.data1 = d.data
                  this.date = d.date
                })
              } else {
                this.data1 = []
              }
              const bbb = data.filter((e) => e.eventLevel === '2')
              if (bbb.length) {
                bbb.map(d => {
                  this.data2 = d.data
                  this.date = d.date
                })
              } else {
                this.data2 = []
              }
              const ccc = data.filter((e) => e.eventLevel === '3')
              if (ccc.length) {
                ccc.map(d => {
                  this.data3 = d.data
                  this.date = d.date
                })
              } else {
                this.data3 = []
              }
              const ddd = data.filter((e) => e.eventLevel === '4')
              if (ddd.length) {
                ddd.map(d => {
                  this.data4 = d.data
                  this.date = d.date
                })
              } else {
                this.data4 = []
              }
            } else {
              this.data1 = []
              this.data2 = []
              this.data3 = []
              this.data4 = []
              this.data5 = []
            }
          })
          break
        case 'weakPassword':
          await selectEventLevelGradeEcharts(this.queryParms).then(({ data }) => {
            this.hasData = data
            if (data.length) {
              const aaa = data.filter((e) => e.eventLevel === '1')
              if (aaa.length) {
                aaa.map(d => {
                  this.data1 = d.data
                  this.date = d.date
                })
              } else {
                this.data1 = []
              }
              const bbb = data.filter((e) => e.eventLevel === '2')
              if (bbb.length) {
                bbb.map(d => {
                  this.data2 = d.data
                  this.date = d.date
                })
              } else {
                this.data2 = []
              }
              const ccc = data.filter((e) => e.eventLevel === '3')
              if (ccc.length) {
                ccc.map(d => {
                  this.data3 = d.data
                  this.date = d.date
                })
              } else {
                this.data3 = []
              }
              const ddd = data.filter((e) => e.eventLevel === '4')
              if (ddd.length) {
                ddd.map(d => {
                  this.data4 = d.data
                  this.date = d.date
                })
              } else {
                this.data4 = []
              }
            } else {
              this.data1 = []
              this.data2 = []
              this.data3 = []
              this.data4 = []
              this.data5 = []
            }
          })
          break
        case 'design':
          await industrialNetworkAuditEcharts(this.queryParms).then(({ data }) => {
            this.hasData = data
            if (data.length) {
              const aaa = data.filter((e) => e.eventLevel === '1')
              if (aaa.length) {
                aaa.map(d => {
                  this.data1 = d.data
                  this.date = d.date
                })
              } else {
                this.data1 = []
              }
              const bbb = data.filter((e) => e.eventLevel === '2')
              if (bbb.length) {
                bbb.map(d => {
                  this.data2 = d.data
                  this.date = d.date
                })
              } else {
                this.data2 = []
              }
              const ccc = data.filter((e) => e.eventLevel === '3')
              if (ccc.length) {
                ccc.map(d => {
                  this.data3 = d.data
                  this.date = d.date
                })
              } else {
                this.data3 = []
              }
              const ddd = data.filter((e) => e.eventLevel === '4')
              if (ddd.length) {
                ddd.map(d => {
                  this.data4 = d.data
                  this.date = d.date
                })
              } else {
                this.data4 = []
              }
            } else {
              this.data1 = []
              this.data2 = []
              this.data3 = []
              this.data4 = []
              this.data5 = []
            }
          })
          break
        case 'host':
          await EventTrendAnalysis(this.queryParms).then(({ data }) => {
            this.hasData = data
            if (data.length) {
              const aaa = data.filter((e) => e.eventLevel === '1')
              if (aaa.length) {
                aaa.map(d => {
                  this.data1 = d.data
                  this.date = d.date
                })
              } else {
                this.data1 = []
              }
              const bbb = data.filter((e) => e.eventLevel === '2')
              if (bbb.length) {
                bbb.map(d => {
                  this.data2 = d.data
                  this.date = d.date
                })
              } else {
                this.data2 = []
              }
              const ccc = data.filter((e) => e.eventLevel === '3')
              if (ccc.length) {
                ccc.map(d => {
                  this.data3 = d.data
                  this.date = d.date
                })
              } else {
                this.data3 = []
              }
              const ddd = data.filter((e) => e.eventLevel === '4')
              if (ddd.length) {
                ddd.map(d => {
                  this.data4 = d.data
                  this.date = d.date
                })
              } else {
                this.data4 = []
              }
            } else {
              this.data1 = []
              this.data2 = []
              this.data3 = []
              this.data4 = []
              this.data5 = []
            }
          })
          break
        case 'abnormal':
          await abnormalAnalysis(this.queryParms).then(({ data }) => {
            this.hasData = data
            if (data.length) {
              const aaa = data.filter((e) => e.eventLevel === '1')
              if (aaa.length) {
                aaa.map(d => {
                  this.data1 = d.data
                  this.date = d.date
                })
              } else {
                this.data1 = []
              }
              const bbb = data.filter((e) => e.eventLevel === '2')
              if (bbb.length) {
                bbb.map(d => {
                  this.data2 = d.data
                  this.date = d.date
                })
              } else {
                this.data2 = []
              }
              const ccc = data.filter((e) => e.eventLevel === '3')
              if (ccc.length) {
                ccc.map(d => {
                  this.data3 = d.data
                  this.date = d.date
                })
              } else {
                this.data3 = []
              }
              const ddd = data.filter((e) => e.eventLevel === '4')
              if (ddd.length) {
                ddd.map(d => {
                  this.data4 = d.data
                  this.date = d.date
                })
              } else {
                this.data4 = []
              }
            } else {
              this.data1 = []
              this.data2 = []
              this.data3 = []
              this.data4 = []
              this.data5 = []
            }
          })
          break
        case 'vulnerablity':
          await scanningeventLevelEcharts(this.queryParms).then(({ data }) => {
            this.hasData = data
            if (data.length) {
              const aaa = data.filter((e) => e.eventLevel === '1')
              if (aaa.length) {
                aaa.map(d => {
                  this.data1 = d.data
                  this.date = d.date
                })
              } else {
                this.data1 = []
              }
              const bbb = data.filter((e) => e.eventLevel === '2')
              if (bbb.length) {
                bbb.map(d => {
                  this.data2 = d.data
                  this.date = d.date
                })
              } else {
                this.data2 = []
              }
              const ccc = data.filter((e) => e.eventLevel === '3')
              if (ccc.length) {
                ccc.map(d => {
                  this.data3 = d.data
                  this.date = d.date
                })
              } else {
                this.data3 = []
              }
              const ddd = data.filter((e) => e.eventLevel === '4')
              if (ddd.length) {
                ddd.map(d => {
                  this.data4 = d.data
                  this.date = d.date
                })
              } else {
                this.data4 = []
              }
            } else {
              this.data1 = []
              this.data2 = []
              this.data3 = []
              this.data4 = []
              this.data5 = []
            }
          })
          break
        case 'vulnerablity1':
          // scanninghostEcharts
          await scanninghostEcharts(this.queryParms).then(({ data }) => {
            this.hasData = data
            if (data.length) {
              const aaa = data.filter((e) => e.eventLevel === '1')
              if (aaa.length) {
                aaa.map(d => {
                  this.data1 = d.data
                  this.date = d.date
                })
              } else {
                this.data1 = []
              }
              const bbb = data.filter((e) => e.eventLevel === '2')
              if (bbb.length) {
                bbb.map(d => {
                  this.data2 = d.data
                  this.date = d.date
                })
              } else {
                this.data2 = []
              }
              const ccc = data.filter((e) => e.eventLevel === '3')
              if (ccc.length) {
                ccc.map(d => {
                  this.data3 = d.data
                  this.date = d.date
                })
              } else {
                this.data3 = []
              }
              const ddd = data.filter((e) => e.eventLevel === '4')
              if (ddd.length) {
                ddd.map(d => {
                  this.data4 = d.data
                  this.date = d.date
                })
              } else {
                this.data4 = []
              }
            } else {
              this.data1 = []
              this.data2 = []
              this.data3 = []
              this.data4 = []
              this.data5 = []
            }
          })
          break
        case 'event':
          await eventEcharts(this.queryParms).then(({ data }) => {
            this.hasData = data
            if (data.length) {
              const aaa = data.filter((e) => e.eventLevel === '1')
              if (aaa.length) {
                aaa.map(d => {
                  this.data1 = d.data
                  this.date = d.date
                })
              } else {
                this.data1 = []
              }
              const bbb = data.filter((e) => e.eventLevel === '2')
              if (bbb.length) {
                bbb.map(d => {
                  this.data2 = d.data
                  this.date = d.date
                })
              } else {
                this.data2 = []
              }
              const ccc = data.filter((e) => e.eventLevel === '3')
              if (ccc.length) {
                ccc.map(d => {
                  this.data3 = d.data
                  this.date = d.date
                })
              } else {
                this.data3 = []
              }
              const ddd = data.filter((e) => e.eventLevel === '4')
              if (ddd.length) {
                ddd.map(d => {
                  this.data4 = d.data
                  this.date = d.date
                })
              } else {
                this.data4 = []
              }
            } else {
              this.data1 = []
              this.data2 = []
              this.data3 = []
              this.data4 = []
              this.data5 = []
            }
          })
          break
        default:
          console.log('无数据', this.type)
          break
      }
      this.drawPolicitalStatus()
    },
    drawPolicitalStatus() {
      if (this.hasData.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1)
        // 绘制图表
        myChart.setOption({
          animationDuration: 5000,
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['极低', '低危', '中危', '高危', '致命']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            minInterval: 1,
            axisTick: { // x轴刻度线
              show: false
            },
            data: this.date
          },
          yAxis: {
            minInterval: 1,
            axisTick: { // x轴刻度线
              show: false
            },
            type: 'value',
            axisLine: { show: false }

          },
          series: [
            {
              name: '极低',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              color: ['#1890FF'],
              type: 'line',
              smooth: true,
              data: this.data1
            },
            {
              name: '低危',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              color: ['#B592E4'],
              type: 'line',
              smooth: true,
              data: this.data2
            },
            {
              name: '中危',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              color: ['#F0B144'],
              type: 'line',
              smooth: true,
              data: this.data3
            },
            {
              name: '高危',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              color: ['#FF8745'],
              type: 'line',
              smooth: true,
              data: this.data4
            },
            {
              name: '致命',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              color: ['#F73030'],
              type: 'line',
              smooth: true,
              data: this.data5
            }
          ]
        })
        window.addEventListener('resize', function() {
          myChart.resize()
        })
      } else {
        const myChart = this.$echarts.init(this.$refs.canvas1)
        this.$refs.canvas1.removeAttribute('_echarts_instance_')
        return setNotopt(myChart, '暂无数据')
      }
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
