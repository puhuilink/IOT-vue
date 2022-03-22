<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px;" />
  </el-col>
</template>
<script>
import { setNotopt } from '@/utils/emptyEcharts.js'
import { policyNameEcharts, recipientEcharts, eventLevelEcharts, CreepeventNameEcharts, CreepdisposalStatuEcharts, selectEventLevelGradeEcharts, selectDisposalStatusEcharts, eventCategoryEcharts } from '@/api/system/echarts'
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
    address: { // 厂家内容
      default: null,
      type: Number
    }
  },
  data() {
    return {
      policitalStatus: ['1'],
      datacopy: [],
      nuM: []
    }
  },
  computed: {},
  watch: {
    address: {
      handler(val, oldVal) {
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
      switch (this.type) {
        case 1:
          switch (this.address) {
            case 'Jiangwoodcreep':
              await CreepeventNameEcharts().then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            case 2:
              this.datacopy = [
                { value: 1248, name: '僵木蠕事件' },
                { value: 1414, name: '漏洞' },
                { value: 199, name: '配置核查' },
                { value: 1023, name: '工业网络' },
                { value: 522, name: '诱捕防护' }
              ]
              break
            case 3:
              this.datacopy = [
                { value: 3148, name: '僵木蠕事件' },
                { value: 2514, name: '漏洞' },
                { value: 1179, name: '配置核查' },
                { value: 2023, name: '工业网络' },
                { value: 562, name: '诱捕防护' }
              ]
              break
            case 4:
              this.datacopy = [
                { value: 3348, name: '僵木蠕事件' },
                { value: 2514, name: '漏洞' },
                { value: 2699, name: '配置核查' },
                { value: 623, name: '工业网络' },
                { value: 762, name: '诱捕防护' }
              ]
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
            case 7:
              // 工业审计
              await eventCategoryEcharts().then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.address)
              break
          }
          break
        case 2:
          switch (this.name) {
            case 'Jiangwoodcreep':
              await CreepdisposalStatuEcharts().then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            case 'weakPassword':
              // 弱口令
              await selectDisposalStatusEcharts().then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            case 3:
              this.datacopy = [
                { value: 1948, name: '待上报' },
                { value: 8514, name: '处置中' },
                { value: 5699, name: '已处置' },
                { value: 4023, name: '已完成' },
                { value: 962, name: '待处置' }
              ]
              break
            case 4:
              this.datacopy = [
                { value: 1948, name: '待上报' },
                { value: 3514, name: '处置中' },
                { value: 1799, name: '已处置' },
                { value: 2023, name: '已完成' },
                { value: 762, name: '待处置' }
              ]
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
              console.log('这里是项目类型', this.address)
              break
          }

          break
        case 3:
          // 僵木蠕
          switch (this.name) {
            case 'Jiangwoodcreep':
              console.log('aaaa')
              await CreepeventNameEcharts().then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.address)
              break
          }

          break
        case 4:
          switch (this.name) {
            case 'dataSafe':
              await eventLevelEcharts().then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            case 'weakPassword':
              // 弱口令
              await selectEventLevelGradeEcharts().then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            case 3:
              await eventLevelEcharts().then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.address)
              break
          }

          break
        case 5:
          switch (this.name) {
            case 'dataSafe':
              await policyNameEcharts().then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            case 2:
              await policyNameEcharts().then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.address)
              break
          }
          break
        case 6:
          switch (this.name) {
            case 'dataSafe':
              await recipientEcharts().then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            case 2:
              await recipientEcharts().then(({ data }) => {
                this.datacopy = this.transDic(data)
              })
              break
            default:
              console.log('这里是项目类型', this.address)
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
      if (this.policitalStatus.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1)
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item'
          },
          color: ['#2C82FC ', '#ffaf37', '#31B3D2', '#9D6AFF', '#FF7B82', '#43A682 ', '#ca8622'],
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 120,
            bottom: 20
          },
          series: [
            {
              label: {
                show: false,
                position: 'center'
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
