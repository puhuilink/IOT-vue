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
    }
  },
  data() {
    return {
      policitalStatus: ['1']
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {
    this.drawPolicitalStatus()
  },
  methods: {
    drawPolicitalStatus() {
      if (this.policitalStatus.length) {
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
              data: [100, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '低危',
              type: 'line',
              smooth: true,
              data: [0, 182, 191, 234, 290, 11, 310]
            },
            {
              name: '中危',
              type: 'line',
              smooth: true,
              data: [150, 0, 201, 154, 190, 330, 410]
            },
            {
              name: '高危',
              type: 'line',
              smooth: true,
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '致命',
              type: 'line',
              smooth: true,
              data: [820, 932, 901, 934, 1290, 1330, 1320]
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
