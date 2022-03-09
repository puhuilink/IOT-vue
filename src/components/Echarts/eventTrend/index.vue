<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import { setNotopt } from '@/utils/emptyEcharts.js'
import tip from '@/components/EchartsTip'
export default {
  components: { tip },
  props: {
    tipname: { // tip内容
      default: '事件趋势分析',
      type: String
    },
    address: { // 厂家内容
      default: null,
      type: Number
    }
  },
  data() {
    return {
      policitalStatus: ['1'],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: []
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
        switch (this.address) {
          case 1:
            this.data1 = [120, 132, 101, 134, 90, 230, 210]
            this.data2 = [0, 182, 191, 234, 290, 11, 310]
            this.data3 = [12, 182, 391, 634, 950, 111, 310]
            this.data4 = [47, 142, 111, 2204, 390, 101, 810]
            this.data5 = [5, 282, 291, 434, 490, 41, 210]
            break
          case 2:
            this.data1 = [140, 232, 141, 634, 90, 230, 210]
            this.data2 = [74, 472, 791, 274, 390, 11, 310]
            this.data3 = [24, 102, 491, 204, 211, 11, 310]
            this.data4 = [35, 782, 391, 184, 230, 11, 310]
            this.data5 = [14, 582, 81, 24, 280, 11, 310]
            break
          case 3:
            this.data1 = [30, 432, 1101, 534, 120, 230, 210]
            this.data2 = [74, 182, 291, 344, 2140, 11, 310]
            this.data3 = [20, 152, 301, 124, 90, 230, 210]
            this.data4 = [25, 422, 451, 374, 380, 11, 310]
            this.data5 = [12, 572, 111, 244, 620, 11, 310]
            break
          case 4:
            this.data1 = [140, 1302, 171, 134, 100, 230, 210]
            this.data2 = [154, 1168, 255, 789, 1155, 2100, 2200]
            this.data3 = [150, 192, 141, 434, 20, 230, 1210]
            this.data4 = [74, 282, 131, 334, 1030, 11, 310]
            this.data5 = [35, 172, 201, 534, 790, 11, 380]
            break
          case 5:
            this.data1 = [140, 182, 301, 734, 90, 230, 210]
            this.data2 = [34, 165, 468, 155, 1289, 2449, 4100]
            this.data3 = [120, 122, 151, 254, 90, 230, 210]
            this.data4 = [70, 482, 132, 414, 290, 11, 340]
            this.data5 = [20, 382, 171, 232, 290, 11, 310]
            break
          case 6:
            this.data1 = [142, 182, 311, 734, 910, 230, 210]
            this.data2 = [34, 165, 438, 155, 1689, 2449, 400]
            this.data3 = [120, 122, 151, 254, 90, 230, 210]
            this.data4 = [70, 492, 122, 414, 290, 11, 340]
            this.data5 = [20, 382, 171, 230, 290, 11, 710]
            break
          default:
            console.log('无数据', this.type)
            break
        }
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1)
        // 绘制图表
        myChart.setOption({
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
            axisTick: { // x轴刻度线
              show: false
            },
            data: ['2022/2/1', '2022/2/2', '2022/2/3', '2022/2/4', '2022/2/5', '2022/2/6', '2022/2/7']
          },
          yAxis: {
            axisTick: { // x轴刻度线
              show: false
            },
            type: 'value',
            axisLine: { show: false }

          },
          series: [
            {
              name: '极低',
              type: 'line',
              smooth: true,
              data: this.data1
            },
            {
              name: '低危',
              type: 'line',
              smooth: true,
              data: this.data2
            },
            {
              name: '中危',
              type: 'line',
              smooth: true,
              data: this.data3
            },
            {
              name: '高危',
              type: 'line',
              smooth: true,
              data: this.data4
            },
            {
              name: '致命',
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
