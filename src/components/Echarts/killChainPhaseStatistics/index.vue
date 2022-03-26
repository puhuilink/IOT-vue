
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
import tip from '@/components/EchartsTip'
import { KillChain } from '@/api/system/echarts'
export default {
  name: 'AAA',
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: '杀伤链阶段统计',
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
      policitalStatus: ['1'],
      barData: [],
      category: [],
      date: [],
      categoryName: [],
      axisData: [],
      hasData: []
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
    },
    category: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          console.log(1)
          this.drawPolicitalStatus()
        }
      },
      deep: true
    },
    categoryName: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          console.log(1)
          this.drawPolicitalStatus()
        }
      },
      deep: true
    },
    date: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          console.log(1)
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
    async getData() {
      const { data } = await KillChain(this.queryParms)
      this.hasData = data
      this.categoryName = []
      if (this.hasData.length) {
        var dataArray = data[0].data
        for (let j = 0; j < dataArray.length; j++) {
          const dataArr = data[j].data

          this.categoryName.push(data[j].killingChainStage)
          for (let i = 0; i < dataArr.length; i++) {
            const height = dataArr[i]
            const newArr = [j, i, height]
            this.axisData.push(newArr)
          }
          this.category = this.axisData.map(function(item) {
            return [item[1], item[0], item[2]]
          })
          this.date = data[0].date
        }
      } else {
        this.category = []
        this.date = []
        this.categoryName = []
      }
    },
    async drawPolicitalStatus() {
      if (this.hasData.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1)
        const hours = this.date
        // prettier-ignore
        const days = this.categoryName
        // 绘制图表
        myChart.setOption({
          color: ['#ADD8E6'],
          tooltip: {
            position: 'top',
            formatter: function(params) {
              return (
                params.value[2] +
                ' commits in ' +
                hours[params.value[0]] +
                ' of ' +
                days[params.value[1]]
              )
            }
          },
          grid: {
            left: 2,
            bottom: 10,
            right: 10,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: hours,
            boundaryGap: false,
            splitLine: {
              show: true
            },
            axisLine: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: days,
            axisLine: {
              show: false
            }
          },
          series: [
            {
              type: 'scatter',
              symbolSize: function(val) {
                return val[2] * 0.5
              },
              data: this.category,
              animationDelay: function(idx) {
                return idx * 5
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
