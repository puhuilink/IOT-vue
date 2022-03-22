<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px;" />
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
    address: { // 厂家内容
      default: null,
      type: Number
    }
  },
  data() {
    return {
      policitalStatus: ['1'],
      barData: [],
      category: [],
      title: ''
    }
  },
  computed: {},
  watch: {
    address: {
      handler(val, oldVal) {
        if (val !== oldVal) {
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
    transDicName(data) {
      var area = []
      data.forEach((item) => {
        area.push(item.name)
      })
      return area
    },
    transDicCount(data) {
      var area = []
      data.forEach((item) => {
        area.push(item.count)
      })
      return area
    },
    async getData() {
      switch (this.type) {
        case 1:
          switch (this.name) {
            case 'dataSafe':
              await sourceIpEcharts().then(({ data }) => {
                this.category = this.transDicName(data)
                this.barData = this.transDicCount(data)
                this.title = '源IP'
              })
              break
            case 2:
              await sourceIpEcharts().then(({ data }) => {
                this.category = this.transDicName(data)
                this.barData = this.transDicCount(data)
                this.title = '源IP'
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
              await targetIpEcharts().then(({ data }) => {
                this.category = this.transDicName(data)
                this.barData = this.transDicCount(data)
                this.title = '文件大小单位/M'
              })
              break
            case 2:
              await targetIpEcharts().then(({ data }) => {
                this.category = this.transDicName(data)
                this.barData = this.transDicCount(data)
                this.title = '文件大小单位/M'
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
    drawPolicitalStatus() {
      if (this.policitalStatus.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1)
        // 绘制图表
        myChart.setOption({
          title: {
            subtext: this.title
          },
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
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: this.category,
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
              barWidth: 14,
              barGap: 10,
              smooth: true,
              label: {
                normal: {
                  show: true,
                  position: 'right',
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
                  color: function(params) {
                    var colorList = ['#2C82FC ', '#ffaf37', '#31B3D2', '#9D6AFF', '#FF7B82', '#43A682 ', '#ca8622']
                    return colorList[params.dataIndex % colorList.length]
                  }
                }
              }
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
