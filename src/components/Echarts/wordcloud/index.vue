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
import tip from '@/components/EchartsTip'
import { setNotopt } from '@/utils/emptyEcharts.js'
import { CreepthreatEcharts } from '@/api/system/echarts'
import '@/components/Echarts/echarts-wordcloud.min.js'
import { EventNameWordCloudMap } from '@/api/system/echarts'
export default {
  components: { tip },
  props: {
    tipname: { // tip内容
      default: '事件名称词云图',
      type: String
    },
    name: { // 组件名称
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
    },
    host: { //  主机安全管理-事件统计分析
      default: null,
      type: Number
    }
  },
  data() {
    return {
      hasData: [],
      queryParms: {
      }
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
    transDic(data) {
      var arr = data
      var arrNew = []
      var area = []
      data.forEach((item) => {
        area.push(item.name)
      })
      arrNew = arr.map((item) => {
        return {
          value: item.count,
          name: item.name
        }
      })
      return arrNew
    },
    async getData() {
      if (this.type === 1) {
        switch (this.address) {
          case 1:
            this.datacopy = [{ 'name': '僵木蠕管理', 'value': 12.64 },
              { 'name': '异常行为管理', 'value': 24.03 },
              { 'name': '弱口令管理', 'value': 54.95 },
              { 'name': '配置核查管理', 'value': 44.04 },
              { 'name': '数据安全管理', 'value': 51.27 },
              { 'name': '威胁情报管理', 'value': 25.40 },
              { 'name': '诱捕防护', 'value': 33.09 },
              { 'name': '工业网络审计', 'value': 24.71 },
              { 'name': '漏洞管理', 'value': 8.66 }
            ]
            break
          case 2:
            this.datacopy = [{ 'name': '僵木蠕管理', 'value': 12.64 },
              { 'name': '异常行为管理', 'value': 24.03 },
              { 'name': '弱口令管理', 'value': 54.95 },
              { 'name': '配置核查管理', 'value': 44.04 },
              { 'name': '数据安全管理', 'value': 51.27 },
              { 'name': '威胁情报管理', 'value': 25.40 },
              { 'name': '诱捕防护', 'value': 33.09 },
              { 'name': '工业网络审计', 'value': 24.71 },
              { 'name': '漏洞管理', 'value': 8.66 }
            ]
            break
          case 3:
            this.datacopy = [{ 'name': '僵木蠕管理', 'value': 12.14 },
              { 'name': '异常行为管理', 'value': 24.03 },
              { 'name': '弱口令管理', 'value': 27.95 },
              { 'name': '配置核查管理', 'value': 14.84 },
              { 'name': '数据安全管理', 'value': 12.27 },
              { 'name': '威胁情报管理', 'value': 42.80 },
              { 'name': '诱捕防护', 'value': 12.09 },
              { 'name': '工业网络审计', 'value': 13.71 },
              { 'name': '漏洞管理', 'value': 25.66 }
            ]
            break
          case 4:
            this.datacopy = [{ 'name': '僵木蠕管理', 'value': 32.64 },
              { 'name': '异常行为管理', 'value': 21.03 },
              { 'name': '弱口令管理', 'value': 34.95 },
              { 'name': '配置核查管理', 'value': 14.04 },
              { 'name': '数据安全管理', 'value': 15.27 },
              { 'name': '威胁情报管理', 'value': 18.80 },
              { 'name': '诱捕防护', 'value': 34.09 },
              { 'name': '工业网络审计', 'value': 23.71 },
              { 'name': '漏洞管理', 'value': 13.66 }
            ]
            break
          case 5:
            this.datacopy = [{ 'name': '僵木蠕管理', 'value': 14.64 },
              { 'name': '异常行为管理', 'value': 2.03 },
              { 'name': '弱口令管理', 'value': 14.95 },
              { 'name': '配置核查管理', 'value': 24.04 },
              { 'name': '数据安全管理', 'value': 65.27 },
              { 'name': '威胁情报管理', 'value': 53.81 },
              { 'name': '诱捕防护', 'value': 21.09 },
              { 'name': '工业网络审计', 'value': 27.11 },
              { 'name': '漏洞管理', 'value': 17.66 }
            ]
            break
          case 6:
            this.datacopy = [{ 'name': '僵木蠕管理', 'value': 34.64 },
              { 'name': '异常行为管理', 'value': 15.03 },
              { 'name': '弱口令管理', 'value': 34.95 },
              { 'name': '配置核查管理', 'value': 25.04 },
              { 'name': '数据安全管理', 'value': 16.27 },
              { 'name': '威胁情报管理', 'value': 13.80 },
              { 'name': '诱捕防护', 'value': 24.09 },
              { 'name': '工业网络审计', 'value': 29.71 },
              { 'name': '漏洞管理', 'value': 34.66 }
            ]
            break
          default:
            console.log('这里是项目类型', this.address)
            break
        }
      } else if (this.host) {
        await EventNameWordCloudMap().then(({ data }) => {
          this.hasData = data
          this.datacopy = this.transDic(data)
        })
      } else {
        switch (this.name) {
          case 'Jiangwoodcreep':
            await CreepthreatEcharts(this.queryParms).then(({ data }) => {
              this.hasData = data
              this.datacopy = this.transDic(data)
            })
            break
          default:
            console.log('这里是项目类型', this.address)
            break
        }
      }
      this.drawPolicitalStatus()
    },
    drawPolicitalStatus() {
      if (this.hasData.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1)

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
