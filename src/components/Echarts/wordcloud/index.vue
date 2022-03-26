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
import { eventNameEcharts, CreepthreatEcharts } from '@/api/system/echarts'
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
      if (this.host) {
        await EventNameWordCloudMap(this.queryParms).then(({ data }) => {
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
          case 'event':
            await eventNameEcharts(this.queryParms).then(({ data }) => {
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
            gridSize: 20,
            sizeRange: [12, 50],
            rotationRange: [0, 0],
            shape: 'circle',
            textStyle: {
              normal: {
                color: function() {
                  return (
                    'rgb(' +
              [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') +
              ')'
                  )
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
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
