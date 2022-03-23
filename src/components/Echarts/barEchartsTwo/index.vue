
<template>
  <el-col :span="12">
    <!-- <tip>{{ tipname }}</tip> -->
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import { setNotopt } from '@/utils/emptyEcharts.js'
import tip from '@/components/EchartsTip'
import echarts from 'echarts'
export default {
  components: { tip },
  props: {
    // tipname: { // tip内容
    //   default: '事件趋势分析',
    //   type: String
    // },
    address: {
      // 厂家内容
      default: null,
      type: Number
    }
  },
  data() {
    return {
      policitalStatus: ['1']
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
  created() {},
  mounted() {
    this.drawPolicitalStatus()
  },
  methods: {
    drawPolicitalStatus() {
      if (this.policitalStatus.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1)
        switch (this.address) {
          case 1:
            this.data1 = [
              ['183.131.72.196', 218, 90, 70, 44, 39],
              ['110.122.72.102', 90, 12.1, 100, 50],
              ['10.201.33.106', 70, 92.1, 100, 50],
              ['192.131.72.188', 44, 102.1, 100, 50],
              ['173,131,59,46', 39, 132.1, 100, 50]
            ]
            break
          case 2:
            this.data1 = [
              ['MySQL', 19, 20.4, 70, 90],
              ['DNS_TCP', 23, 17.1, 100, 50],
              ['Redis', 63, 42.1, 200, 70],
              ['FTP', 6, 102.1, 212, 70],
              ['DNS', 14, 122.1, 176, 50]
            ]
            break
          case 3:
            this.data1 = [
              ['MySQL', 49, 30.4, 40, 120],
              ['DNS_TCP', 33, 12.1, 60, 80],
              ['Redis', 13, 92.1, 77, 70],
              ['FTP', 26, 172.1, 30, 20],
              ['DNS', 4, 102.1, 107, 53]
            ]
            break
          case 4:
            this.data1 = [
              ['MySQL', 29, 30.4, 170, 100],
              ['DNS_TCP', 13, 12.1, 110, 50],
              ['Redis', 13, 92.1, 200, 50],
              ['FTP', 74, 171.1, 47, 50],
              ['DNS', 15, 42.1, 25, 50]
            ]
            break
          case 5:
            this.data1 = [
              ['MySQL', 79, 30.4, 100, 114],
              ['DNS_TCP', 143, 12.1, 140, 50],
              ['Redis', 13, 92.1, 110, 24],
              ['FTP', 16, 132.1, 130, 55],
              ['DNS', 54, 172.1, 700, 67]
            ]
            break
          case 6:
            this.data1 = [
              ['MySQL', 39, 29.4, 160, 114],
              ['DNS_TCP', 143, 12.1, 340, 50],
              ['Redis', 113, 72.1, 110, 24],
              ['FTP', 16, 132.1, 130, 68],
              ['DNS', 54, 272.1, 400, 67]
            ]
            break
          default:
            console.log('无数据', this.type)
            break
        }

        // 绘制图表
        myChart.setOption({
          dataset: {
            source: this.data1
          },
          backgroundColor: '#fff',
          grid: {
            left: '0%',
            // right: "10%",
            bottom: '10%',
            top: '5%',
            containLabel: true
          },
          xAxis: [
            {
              show: false
            }
          ],
          yAxis: {
            type: 'category',
            inverse: true,
            show: true,
            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,.0)'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#333333',
                align: 'left'
              },
              height: 70,
              margin: -5,
              rich: {}
            }
          },

          series: [
            // 亮色条 百分比
            {
              show: true,
              type: 'bar',
              barGap: '-100%',
              barWidth: '20%',
              z: 2,
              itemStyle: {
                emphasis: {
                  barBorderRadius: 7
                },
                normal: {
                  barBorderRadius: 7,
                  color: function(params) {
                    return new echarts.graphic.LinearGradient(0, 0.4, 0.8, 1, [
                    //   { offset: 0, color: "#F73030" },
                      { offset: 1, color: '#1890FF' }
                    ])
                  }
                }
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#1890FF',
                    fontSize: 14
                  },
                  position: 'right'
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
