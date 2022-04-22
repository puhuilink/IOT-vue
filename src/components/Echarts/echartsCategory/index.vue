<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1"
         style="height: 400px; top:-40px" />
  </el-col>
</template>
<script>
import { setNotopt } from '@/utils/emptyEcharts.js'
import { sourceIpEcharts, targetIpEcharts } from '@/api/system/echarts'
import tip from '@/components/EchartsTip'
export default {
  name: 'AAA',
  components: { tip },
  props: {
    tipname: { // tip内容
      default: '事件类型分布',
      type: String
    },
    name: {
      default: '',
      type: String
    },
    type: { // tip内容
      default: null,
      type: Number
    },
    query: {
      default: null,
      type: Object
    }
  },
  data () {
    return {
      queryParms: {
      },
      hasData: [],
      barData: [],
      category: [],
      title: ''
    }
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
    this.drawPolicitalStatus()
  },
  methods: {
    transDicName (data) {
      var area = []
      data.forEach((item) => {
        area.push(item.name)
      })
      return area
    },
    transDicCount (data) {
      var area = []
      data.forEach((item) => {
        area.push(item.count)
      })
      return area
    },
    async getData () {
      switch (this.type) {
        case 1:
          switch (this.name) {
            case 'dataSafe':
              await sourceIpEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.category = this.transDicName(data)
                this.barData = this.transDicCount(data)
              })
              break
            case 'dataSource':
              await sourceIpEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                // this.category = [
                //   "流量采集",
                //   "数据防泄漏",
                //   "主机卫士",
                //   "配置核查",
                //   "蜜罐",
                //   "漏洞扫描",
                //   "工业网络审计",
                //   "安全网关",
                //   "日志管理平台",
                //   "微步"
                // ]
                this.category = [
                  "日志管理平台",
                  "安全网关",
                  "流量采集",
                  "微步",
                  "漏洞扫描",
                  "工业网络审计",
                  "配置核查",
                  "数据防泄漏",
                  "蜜罐",
                  "主机卫士",
                ]
                // this.barData = [
                //   1033, 500, 500, 500, 500, 500, 500, 500, 450, 15]
                this.barData = [
                  7708423, 3303610, 7026, 5269, 3600, 3540, 3513, 2600, 1756, 1508]
              })
              break
            default:
              console.log('无数据', this.type)
              break
          }

          break
        case 2:
          switch (this.name) {
            case 'dataSafe':
              await targetIpEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.category = this.transDicName(data)
                this.barData = this.transDicCount(data)
              })
              break
            case 2:
              await targetIpEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.category = this.transDicName(data)
                this.barData = this.transDicCount(data)
              })
              break
            default:
              console.log('无数据', this.type)
              break
          }
          break
        default:
          console.log('无数据', this.type)
          break
      }
      this.drawPolicitalStatus()
    },
    drawPolicitalStatus () {
      if (this.hasData.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1)
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            position: 'bottom',
            // name: '条',
            minInterval: 1,
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            inverse: true,
            minInterval: 1,
            data: this.category,
            animationDuration: 300,
            animationDurationUpdate: 300,
            splitLine: { show: false },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            offset: 10,
            nameTextStyle: {
              fontSize: 15
            }
          },
          series: [
            {
              name: '数量',
              type: 'bar',
              data: this.barData,
              realtimeSort: true,
              barWidth: 14,
              barGap: 10,
              smooth: true,
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  valueAnimation: true,
                  offset: [5, -2],
                  textStyle: {
                    color: '#F68300',
                    fontSize: 13
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  barBorderRadius: 7
                },
                normal: {
                  barBorderRadius: 7,
                  color: function (params) {
                    var colorList = ['#1890FF', '#B592E4', '#F0B144', '#FF8745', '#F73030', '#43A682 ', '#ca8622']
                    return colorList[params.dataIndex % colorList.length]
                  }
                }
              }
            }
          ],
          animationDuration: 0,
          animationDurationUpdate: 3000,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear'
        })
        window.addEventListener('resize', function () {
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
