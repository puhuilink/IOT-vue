<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import tip from '@/components/EchartsTip'
import { setNotopt } from '@/utils/emptyEcharts.js'
import '@/components/Echarts/echarts-wordcloud.min.js'
export default {
  components: { tip },
  props: {
    tipname: { // tip内容
      default: '事件名称词云图',
      type: String
    },
    type: { // tip内容
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
  },
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
        if (this.type === 1) {
          this.datacopy = [{ 'name': '僵木蠕管理', 'value': 2.64 },
            { 'name': '异常行为管理', 'value': 4.03 },
            { 'name': '弱口令管理', 'value': 24.95 },
            { 'name': '配置核查管理', 'value': 4.04 },
            { 'name': '数据安全管理', 'value': 5.27 },
            { 'name': '威胁情报管理', 'value': 5.80 },
            { 'name': '诱捕防护', 'value': 3.09 },
            { 'name': '工业网络审计', 'value': 24.71 },
            { 'name': '漏洞管理', 'value': 6.66 }
          ]
        } else {
          this.datacopy = [{ 'name': '僵尸网络', 'value': 2.64 },
            { 'name': '木马', 'value': 4.03 },
            { 'name': '勒索软件', 'value': 24.95 },
            { 'name': '恶意软件', 'value': 4.04 },
            { 'name': '间谍软件', 'value': 5.27 },
            { 'name': 'URL_walware', 'value': 5.80 }
          ]
        }
        // 绘制图表
        myChart.setOption({
          series: [{
            type: 'wordCloud',
            sizeRange: [15, 80],
            rotationRange: [0, 0],
            rotationStep: 45,
            gridSize: 8,
            shape: 'pentagon',
            width: '100%',
            height: '100%',
            textStyle: {
              normal: {
                color: function() {
                  return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(',') + ')'
                }
              }
            },
            data: this.datacopy
          }]
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
.tip {
  border-left: 4px solid #3d6bca;
  border-radius: 3px;
  font-weight: bold;
  height: 24px;
  padding: 2px;
  padding-left: 12px;
}

</style>
