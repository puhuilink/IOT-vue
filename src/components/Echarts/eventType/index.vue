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
import { getWeakPasswordData, getbaseJiangTableData, getIndustrialNetworkAuditData, getHostSecurityData, getAbnormalBehaviorEventRetrievalData, getElasticDate } from '@/utils/request'
import { eventStatusEcharts, scanninghostEcharts, industrialNetworkAuditeventLevelEcharts, policyNameEcharts, recipientEcharts, scanningEcharts } from '@/api/system/echarts'

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
      type: String
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
      assetsData: [],
      queryParms: {
        query: {
          bool: {
            must: [
            ]
          }
        },
        aggs: {
          field: {
            terms: {
              field: '',
              size: 10
            }
          }
        }
      },
      hasData: []
    }
  },
  computed: {},
  watch: {
    query: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          if (val.severity) {
            this.queryParms.query.bool.must.push({
              match: {
                severity: val.severity
              }
            })
          }
          if (val.location) {
            this.queryParms.query.bool.must.push({
              match: {
                location: val.location
              }
            })
          }
          if (val.beginGenerationTime) {
            this.queryParms.query.bool.must.push({
              range: {
                generationTime: {
                  gte: val.beginGenerationTime,
                  lte: val.endGenerationTime
                }
              }
            })
          }
          this.getData()
          this.drawPolicitalStatus()
        }
      },
      deep: true
    }
  },
  created() {
    this.getType()
    this.getData()
  },

  mounted() {
    this.drawPolicitalStatus()
  },

  methods: {
    transTypeDic(data) {
      var t = [{
        key: '1',
        content: '极低'
      }, {
        key: '2',
        content: '低危'
      }, {
        key: '3',
        content: '中危'
      }, {
        key: '4',
        content: '高危'
      }, {
        key: '5',
        content: '致命'
      }]
      var arr = data
      var arrNew = []
      var area = []
      data.forEach((item) => {
        area.push(item.key)
      })
      arr.map(r => {
        t.map(d => {
          if (r.key === d.key) {
            arrNew.push({
              value: r.doc_count,
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
      arrNew = arr.map((item) => {
        return {
          value: item.doc_count,
          name: item.key
        }
      })
      return arrNew
    },
    getType() {
      this.queryParms.aggs.field.terms.field = this.type
    },
    async getData() {
      // 根据type值进行不同的参数区分
      switch (this.type) {
        // 事件等级
        case 'severity':
          switch (this.name) {
            case 'weakPassword':
              // 弱口令
              await getWeakPasswordData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets
                this.datacopy = this.transTypeDic(data.aggregations.field.buckets)
                this.queryParms.query.bool.must = []
              })
              break
            case 'Jiangwoodcreep':
              // 僵木蠕
              await getbaseJiangTableData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets
                this.datacopy = this.transTypeDic(data.aggregations.field.buckets)
                this.queryParms.query.bool.must = []
              })
              break
            case 'abnormal':
              // 异常行为
              await getAbnormalBehaviorEventRetrievalData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets
                this.datacopy = this.transTypeDic(data.aggregations.field.buckets)
                this.queryParms.query.bool.must = []
              })
              break
            case 'statisticalSnalysis':
              // 入侵诱捕--事件等级分布
              await getElasticDate(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets
                this.datacopy = this.transTypeDic(data.aggregations.field.buckets)
                this.queryParms.query.bool.must = []
              })
              break
            case 'design':
              // 工业审计
              await getIndustrialNetworkAuditData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets
                this.datacopy = this.transTypeDic(data.aggregations.field.buckets)
                this.queryParms.query.bool.must = []
              })
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }
          break
        // 处置状态
        case 'procedure':
          switch (this.name) {
            case 'Jiangwoodcreep':
              // 僵木蠕
              await getbaseJiangTableData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets
                this.datacopy = this.transDic(data.aggregations.field.buckets)
                this.queryParms.query.bool.must = []
              })
              break
            case 'weakPassword':
              // 弱口令
              await getWeakPasswordData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets
                this.datacopy = this.transDic(data.aggregations.field.buckets)
                this.queryParms.query.bool.must = []
              })
              break
            case 'host':
              await getHostSecurityData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets
                this.datacopy = this.transDic(data.aggregations.field.buckets)
                this.queryParms.query.bool.must = []
              })
              break

            case 'design':
              await industrialNetworkAuditeventLevelEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transTypeDic(data)
              })
              break
            case 'event':
              await eventStatusEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break

            default:
              console.log('这里是项目类型', this.name)
              break
          }
          break
        // 事件类型
        case 'event_format':
          switch (this.name) {
            case 'design':
              await getIndustrialNetworkAuditData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets
                this.datacopy = this.transDic(data.aggregations.field.buckets)
                this.queryParms.query.bool.must = []
              })
              break
            case 'weakPassword':
              // 弱口令
              await getWeakPasswordData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets
                this.datacopy = this.transTypeDic(data.aggregations.field.buckets)
                this.queryParms.query.bool.must = []
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
        // 事件类型--主机安全页面的， 其他页面的类型不一定是这个字段
        case 'ev_wsec_hsme_format_label':
          switch (this.name) {
            case 'host':
              await getHostSecurityData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets
                this.datacopy = this.transDic(data.aggregations.field.buckets)
                this.queryParms.query.bool.must = []
              })
              break
            case 'dataSafe':
              await policyNameEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            case 'vulnerablity':
              await scanninghostEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.name)
              break
          }
          break
        // 威胁分类
        case 5:
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
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                normal: {
                  show: true,
                  fontSize: 14,
                  formatter(v) {
                    const text = v.name
                    const val = text.length > 10 ? text.substr(0, 6) + '...' + text.substr(text.length - 3, text.length - 1) : text
                    return val
                  }
                }
              },
              type: 'pie',
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
