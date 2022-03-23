<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import { setNotopt } from '@/utils/emptyEcharts.js'
import { CreepeventLevelEcharts } from '@/api/system/echarts'
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
    }
  },
  data() {
    return {
      type: 1,
      queryParms: {
      },
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
        content: '正常'
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
        content: '失陷'
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
    async  getData() {
      switch (this.type) {
        case 1:
          console.log(this.queryParms)
          await CreepeventLevelEcharts(this.queryParms).then(({ data }) => {
            console.log(data)
            this.category = this.transDicName(data)
            this.barData = this.transDicCount(data)
            this.title = '源IP'
          })
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
