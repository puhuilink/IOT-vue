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
    },
    address: { // 厂家内容
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
        switch (this.type) {
          case 1:
            switch (this.address) {
              case 1:
                this.datacopy = [
                  { value: 1478, name: '僵木蠕事件' },
                  { value: 142, name: '漏洞' },
                  { value: 3588, name: '配置核查' },
                  { value: 456, name: '工业网络' },
                  { value: 1477, name: '诱捕防护' }
                ]
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
                this.datacopy = [
                  { value: 3948, name: '审计协议规约事件' },
                  { value: 2514, name: '审计协议白名单告警' },
                  { value: 1699, name: '审计用户自定义告警' },
                  { value: 1023, name: '审计关键事件告警' },
                  { value: 362, name: '其他' }
                ]
                break
              default:
                console.log('这里是项目类型', this.address)
                break
            }
            break
          case 2:
            switch (this.address) {
              case 1:
                this.datacopy = [
                  { value: 1548, name: '待上报' },
                  { value: 3514, name: '处置中' },
                  { value: 2699, name: '已处置' },
                  { value: 2023, name: '已完成' },
                  { value: 262, name: '待处置' }
                ]
                break
              case 2:
                this.datacopy = [
                  { value: 948, name: '待上报' },
                  { value: 3514, name: '处置中' },
                  { value: 699, name: '已处置' },
                  { value: 1023, name: '已完成' },
                  { value: 662, name: '待处置' }
                ]
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
            switch (this.address) {
              case 1:
                this.datacopy = [
                  { value: 1948, name: '僵尸网络' },
                  { value: 214, name: '间谍软件' },
                  { value: 1499, name: '木马' },
                  { value: 1033, name: '恶意软件' },
                  { value: 762, name: 'URL_malware' }
                ]
                break
              case 2:
                this.datacopy = [
                  { value: 3248, name: '僵尸网络' },
                  { value: 2414, name: '间谍软件' },
                  { value: 2699, name: '木马' },
                  { value: 7023, name: '恶意软件' },
                  { value: 462, name: 'URL_malware' }
                ]
                break
              case 3:
                this.datacopy = [
                  { value: 948, name: '僵尸网络' },
                  { value: 3514, name: '间谍软件' },
                  { value: 1619, name: '木马' },
                  { value: 2023, name: '恶意软件' },
                  { value: 462, name: 'URL_malware' }
                ]
                break
              case 4:
                this.datacopy = [
                  { value: 348, name: '僵尸网络' },
                  { value: 1514, name: '间谍软件' },
                  { value: 3699, name: '木马' },
                  { value: 1723, name: '恶意软件' },
                  { value: 962, name: 'URL_malware' }
                ]
                break
              case 5:
                this.datacopy = [
                  { value: 1248, name: '僵尸网络' },
                  { value: 2614, name: '间谍软件' },
                  { value: 1799, name: '木马' },
                  { value: 1063, name: '恶意软件' },
                  { value: 3762, name: 'URL_malware' }
                ]
                break
              case 6:
                this.datacopy = [
                  { value: 3948, name: '僵尸网络' },
                  { value: 2514, name: '间谍软件' },
                  { value: 1699, name: '木马' },
                  { value: 1023, name: '恶意软件' },
                  { value: 362, name: 'URL_malware' }
                ]
                break
              default:
                console.log('这里是项目类型', this.address)
                break
            }

            break
          case 4:
            switch (this.address) {
              case 1:
                this.datacopy = [
                  { value: 398, name: '低危' },
                  { value: 1514, name: '极低' },
                  { value: 2699, name: '中危' },
                  { value: 5023, name: '高危' },
                  { value: 362, name: '致命' }
                ]
                break
              case 2:
                this.datacopy = [
                  { value: 4948, name: '低危' },
                  { value: 514, name: '极低' },
                  { value: 2699, name: '中危' },
                  { value: 123, name: '高危' },
                  { value: 762, name: '致命' }
                ]
                break
              case 3:
                this.datacopy = [
                  { value: 1948, name: '低危' },
                  { value: 254, name: '极低' },
                  { value: 199, name: '中危' },
                  { value: 2023, name: '高危' },
                  { value: 3472, name: '致命' }
                ]
                break
              case 4:
                this.datacopy = [
                  { value: 2448, name: '低危' },
                  { value: 2514, name: '极低' },
                  { value: 2599, name: '中危' },
                  { value: 1723, name: '高危' },
                  { value: 662, name: '致命' }
                ]
                break
              case 5:
                this.datacopy = [
                  { value: 1948, name: '低危' },
                  { value: 3514, name: '极低' },
                  { value: 1799, name: '中危' },
                  { value: 1023, name: '高危' },
                  { value: 362, name: '致命' }
                ]
                break
              case 6:
                this.datacopy = [
                  { value: 448, name: '低危' },
                  { value: 2514, name: '极低' },
                  { value: 1699, name: '中危' },
                  { value: 1023, name: '高危' },
                  { value: 362, name: '致命' }
                ]
                break
              default:
                console.log('这里是项目类型', this.address)
                break
            }

            break
          case 5:
            switch (this.address) {
              case 1:
                this.datacopy = [
                  { value: 1248, name: 'monitor_文件类型' },
                  { value: 2514, name: 'MAIL_文件规则验证' },
                  { value: 7699, name: 'qwer' },
                  { value: 2023, name: 'monitor_内容规则或验证' },
                  { value: 862, name: 'MAIL_地址审批响应' }
                ]
                break
              case 2:
                this.datacopy = [
                  { value: 348, name: 'monitor_文件类型' },
                  { value: 514, name: 'MAIL_文件规则验证' },
                  { value: 2699, name: 'qwer' },
                  { value: 1743, name: 'monitor_内容规则或验证' },
                  { value: 562, name: 'MAIL_地址审批响应' }
                ]
                break
              case 3:
                this.datacopy = [
                  { value: 368, name: 'monitor_文件类型' },
                  { value: 714, name: 'MAIL_文件规则验证' },
                  { value: 1429, name: 'qwer' },
                  { value: 2023, name: 'monitor_内容规则或验证' },
                  { value: 662, name: 'MAIL_地址审批响应' }
                ]
                break
              case 4:
                this.datacopy = [
                  { value: 948, name: 'monitor_文件类型' },
                  { value: 2714, name: 'MAIL_文件规则验证' },
                  { value: 169, name: 'qwer' },
                  { value: 2023, name: 'monitor_内容规则或验证' },
                  { value: 1362, name: 'MAIL_地址审批响应' }
                ]
                break
              case 5:
                this.datacopy = [
                  { value: 1448, name: 'monitor_文件类型' },
                  { value: 2214, name: 'MAIL_文件规则验证' },
                  { value: 1599, name: 'qwer' },
                  { value: 323, name: 'monitor_内容规则或验证' },
                  { value: 762, name: 'MAIL_地址审批响应' }
                ]
                break
              case 6:
                this.datacopy = [
                  { value: 2548, name: 'monitor_文件类型' },
                  { value: 1414, name: 'MAIL_文件规则验证' },
                  { value: 1299, name: 'qwer' },
                  { value: 1123, name: 'monitor_内容规则或验证' },
                  { value: 762, name: 'MAIL_地址审批响应' }
                ]
                break
              default:
                console.log('这里是项目类型', this.address)
                break
            }

            break
          case 6:
            switch (this.address) {
              case 1:
                this.datacopy = [
                  { value: 1948, name: 'txt' },
                  { value: 514, name: 'eml' },
                  { value: 2699, name: 'docx' },
                  { value: 1423, name: 'doc' },
                  { value: 3262, name: 'png' }
                ]
                break
              case 2:
                this.datacopy = [
                  { value: 1148, name: 'txt' },
                  { value: 414, name: 'eml' },
                  { value: 2699, name: 'docx' },
                  { value: 2023, name: 'doc' },
                  { value: 162, name: 'png' }
                ]
                break
              case 3:
                this.datacopy = [
                  { value: 2548, name: 'txt' },
                  { value: 3514, name: 'eml' },
                  { value: 1299, name: 'docx' },
                  { value: 1043, name: 'doc' },
                  { value: 322, name: 'png' }
                ]
                break
              case 4:
                this.datacopy = [
                  { value: 1948, name: 'txt' },
                  { value: 2514, name: 'eml' },
                  { value: 1699, name: 'docx' },
                  { value: 2023, name: 'doc' },
                  { value: 3162, name: 'png' }
                ]
                break
              case 5:
                this.datacopy = [
                  { value: 2748, name: 'txt' },
                  { value: 2114, name: 'eml' },
                  { value: 1299, name: 'docx' },
                  { value: 1423, name: 'doc' },
                  { value: 322, name: 'png' }
                ]
                break
              case 6:
                this.datacopy = [
                  { value: 3948, name: 'txt' },
                  { value: 2514, name: 'eml' },
                  { value: 1699, name: 'docx' },
                  { value: 1023, name: 'doc' },
                  { value: 362, name: 'png' }
                ]
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
