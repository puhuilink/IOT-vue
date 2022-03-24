<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div
      ref="canvas1"
      style="height: 400px;"
    />
  </el-col>
</template>
<script>
import { setNotopt } from '@/utils/emptyEcharts.js'
import { policyNameEcharts, recipientEcharts, eventLevelEcharts, CreepeventNameEcharts, EventTypeDistribution, abnormalEventLevelDistribution, EventLevelDistribution, CreepdisposalStatuEcharts, selectEventLevelEcharts, selectDisposalStatusEcharts, EventStatusDispositionDiagram, eventCategoryEcharts, scanningEcharts, scanningeventStatusEcharts } from '@/api/system/echarts'
import tip from '@/components/EchartsTip'
export default {
  name: 'AAA',
  components: { tip },
  props: {
    tipname: { // tip内容
      default: '事件类型分布',
      type: String
    },
    name: { // 模块名称
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
    }
  },
  data() {
    return {
      policitalStatus: ['1'],
      datacopy: [],
      queryParms: {
      },
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
      switch (this.type) {
        case 1:
          switch (this.name) {
            case 'Jiangwoodcreep':
              await CreepeventNameEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            case 'host':
              await EventTypeDistribution(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            case 'abnormal':
              await abnormalEventLevelDistribution(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            case 'statisticalSnalysis':
              await EventLevelDistribution(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            case 5:
              this.datacopy = [
                { value: 3142, name: '僵木蠕事件' },
                { value: 2114, name: '漏洞' },
                { value: 1499, name: '配置核查' },
                { value: 423, name: '工业网络' },
                { value: 1362, name: '诱捕防护' }
              ]
              break
            case 6:
              this.datacopy = [
                { value: 3148, name: '僵木蠕事件' },
                { value: 1614, name: '漏洞' },
                { value: 2699, name: '配置核查' },
                { value: 2023, name: '工业网络' },
                { value: 462, name: '诱捕防护' }
              ]
              break
            case 'design':
              // 工业审计
              await eventCategoryEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }
          break
        case 2:
          switch (this.name) {
            case 'Jiangwoodcreep':
              await CreepdisposalStatuEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            case 'weakPassword':
              // 弱口令
              await selectDisposalStatusEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            case 'host':
              await EventStatusDispositionDiagram(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break

            case 5:
              this.datacopy = [
                { value: 3448, name: '待上报' },
                { value: 1514, name: '处置中' },
                { value: 1199, name: '已处置' },
                { value: 1623, name: '已完成' },
                { value: 562, name: '待处置' }
              ]
              break
            case 6:
              this.datacopy = [
                { value: 1948, name: '待上报' },
                { value: 1514, name: '处置中' },
                { value: 699, name: '已处置' },
                { value: 423, name: '已完成' },
                { value: 762, name: '待处置' }
              ]
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }

          break
        case 3:
          // 僵木蠕
          switch (this.name) {
            case 'Jiangwoodcreep':
              await CreepeventNameEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            case 'vulnerablity':
              await scanningeventStatusEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }

          break
        case 4:
          switch (this.name) {
            case 'dataSafe':
              await eventLevelEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transTypeDic(data)
              })
              break
            case 'weakPassword':
              // 弱口令
              await selectEventLevelEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transTypeDic(data)
              })
              break
            case 'vulnerablity':
              await scanningEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transTypeDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }

          break
        case 5:
          switch (this.name) {
            case 'dataSafe':
              await policyNameEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            case 2:
              await policyNameEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }
          break
        case 6:
          switch (this.name) {
            case 'dataSafe':
              await recipientEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            case 2:
              await recipientEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }
          break
        default:
          console.log('这里是项目类型', this.type)
          break
      }
      this.drawPolicitalStatus()
    },
    drawPolicitalStatus() {
      if (this.hasData.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1)
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item'
          },
          color: ['#1890FF', '#B592E4', '#F0B144', '#FF8745', '#F73030', '#43A682 ', '#ca8622'],
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 120,
            bottom: 20,
            formatter: function(value) {
              const val = value.length > 10 ? value.substr(0, 6) + '...' + value.substr(value.length - 3, value.length - 1) : value
              return val
            }

          },
          series: [
            {
              label: {
                show: true,
                normal: {
                  fontSize: 14,
                  formatter(v) {
                    const text = v.name
                    const val = text.length > 10 ? text.substr(0, 6) + '...' + text.substr(text.length - 3, text.length - 1) : text
                    return val
                  }
                }
              },
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
