<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px;" />
  </el-col>
</template>
<script>
import { setNotopt } from '@/utils/emptyEcharts.js'
import tip from '@/components/EchartsTip'
export default {
  name: 'AAA',
  components: { tip },
  props: {
    tipname: { // tip内容
      default: '事件类型分布',
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

  },
  mounted() {
    this.drawPolicitalStatus()
  },
  methods: {
    drawPolicitalStatus() {
      if (this.policitalStatus.length) {
        switch (this.type) {
          case 1:
            switch (this.address) {
              case 1:
                this.category = ['192.168.148.151', '192.168.154.55', '192.168.148.160', '0.0.0.0', '192.168.148.125', '192.168.148.67', '192.168.154.213', '192.168.154.155', '192.168.154.222', '192.168.154.107']
                this.barData = [154, 195, 268, 845, 431, 1789, 1400, 1755, 3100, 1449, 4200]
                this.title = '源IP'
                break
              case 2:
                this.category = ['192.168.148.151', '192.168.154.55', '192.168.148.160', '0.0.0.0', '192.168.148.125', '192.168.148.67', '192.168.154.213', '192.168.154.155', '192.168.154.222', '192.168.154.107']
                this.barData = [114, 125, 218, 445, 41, 1789, 1200, 1155, 2100, 1449, 2200]
                this.title = '源IP'
                break
              case 3:
                this.category = ['192.168.148.151', '192.168.154.55', '192.168.148.160', '0.0.0.0', '192.168.148.125', '192.168.148.67', '192.168.154.213', '192.168.154.155', '192.168.154.222', '192.168.154.107']
                this.barData = [1544, 295, 168, 805, 41, 789, 2400, 1425, 1100, 1049, 2200]
                this.title = '源IP'
                break
              case 4:
                this.category = ['192.168.148.151', '192.168.154.55', '192.168.148.160', '0.0.0.0', '192.168.148.125', '192.168.148.67', '192.168.154.213', '192.168.154.155', '192.168.154.222', '192.168.154.107']
                this.barData = [1154, 1455, 2168, 245, 1431, 789, 1000, 1155, 2100, 3449, 2200]
                this.title = '源IP'
                break
              case 5:
                this.category = ['192.168.148.151', '192.168.154.55', '192.168.148.160', '0.0.0.0', '192.168.148.125', '192.168.148.67', '192.168.154.213', '192.168.154.155', '192.168.154.222', '192.168.154.107']
                this.barData = [354, 125, 168, 445, 121, 1289, 1300, 1255, 1100, 2449, 4100]
                this.title = '源IP'
                break
              case 6:
                this.category = ['192.168.148.151', '192.168.154.55', '192.168.148.160', '0.0.0.0', '192.168.148.125', '192.168.148.67', '192.168.154.213', '192.168.154.155', '192.168.154.222', '192.168.154.107']
                this.barData = [374, 225, 118, 315, 221, 1289, 1800, 1255, 1140, 2449, 3100]
                this.title = '源IP'
                break
              default:
                console.log('无数据', this.type)
                break
            }

            break
          case 2:
            switch (this.address) {
              case 1:
                this.category = ['1', '2', '11', '6', '5', '3']
                this.barData = [183, 421, 218, 1161, 1249, 2011]
                this.title = '文件大小单位/M'
                break
              case 2:
                this.category = ['1', '2', '11', '6', '5', '3']
                this.barData = [483, 731, 1018, 1161, 1409, 1231]
                this.title = '文件大小单位/M'
                break
              case 3:
                this.category = ['1', '2', '11', '6', '5', '3']
                this.barData = [183, 531, 1318, 1161, 1199, 2231]
                this.title = '文件大小单位/M'
                break
              case 4:
                this.category = ['1', '2', '11', '6', '5', '3']
                this.barData = [3143, 131, 1718, 461, 1299, 2131]
                this.title = '文件大小单位/M'
                break
              case 5:
                this.category = ['1', '2', '11', '6', '5', '3']
                this.barData = [2483, 431, 1418, 1161, 1299, 2131]
                this.title = '文件大小单位/M'
                break
              case 6:
                this.category = ['1', '2', '11', '6', '5', '3']
                this.barData = [1483, 331, 1218, 1171, 1499, 1141]
                this.title = '文件大小单位/M'
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
