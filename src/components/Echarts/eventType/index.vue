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
    }
  },
  data() {
    return {
      policitalStatus: ['1'],
      datacopy: []
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
        switch (this.type) {
          case 1:
            this.datacopy = [
              { value: 3948, name: '僵木蠕事件' },
              { value: 2514, name: '漏洞' },
              { value: 1699, name: '配置核查' },
              { value: 1023, name: '工业网络' },
              { value: 362, name: '诱捕防护' }
            ]
            break
          case 2:
            this.datacopy = [
              { value: 3948, name: '待上报' },
              { value: 2514, name: '处置中' },
              { value: 1699, name: '已处置' },
              { value: 1023, name: '已完成' },
              { value: 362, name: '待处置' }
            ]
            break
          case 3:
            this.datacopy = [
              { value: 3948, name: '僵尸网络' },
              { value: 2514, name: '间谍软件' },
              { value: 1699, name: '木马' },
              { value: 1023, name: '恶意软件' },
              { value: 362, name: 'URL_malware' }
            ]
            break
          case 4:
            this.datacopy = [
              { value: 3948, name: '低危' },
              { value: 2514, name: '极低' },
              { value: 1699, name: '中危' },
              { value: 1023, name: '高危' },
              { value: 362, name: '致命' }
            ]
            break
          default:
            console.log('这里是项目类型', this.type)
            break
        }
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1)
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 120,
            bottom: 20
          },
          series: [
            {

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
