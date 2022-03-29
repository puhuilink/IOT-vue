<template>
  <el-col :span="12">
    <div :class="id===1 ? 'box' : ''"
         style="height:380px;width:780px;cursor:pointer;"
         @click="log">
      <tip>{{ tipname }}</tip>
      <div id="bg"
           style="position: relative; left:200px">
        <img :src="showPhoto"
             style="position: absolute;top:200px;left:-100px"
             alt="HIGH">
        <img :src="showPhoto"
             style="position: absolute;top:240px;left:-100px"
             alt="HIGH">
        <div id="text"
             style="position: absolute; top: 205px; left: -90px;color:#158CC6;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">操作异常事件</div>
        <div id="text"
             style="position: absolute; top: 205px; left: 10px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">17133</div>
        <div id="text"
             style="position: absolute; top: 245px; left: -90px;color:#158CC6;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">数据异常事件</div>
        <div id="text"
             style="position: absolute; top: 245px; left: 10px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">11422</div>
        <div id="text"
             style="position: absolute; top: 15px; left: 161px;color:#FFFFFF;font-size: 16px; font-family:Microsoft YaHei;">日志接入量</div>
        <div id="text"
             style="position: absolute; top: 30px; left: 145px;color:#FFFFFF;font-size: 28px; font-family:Microsoft YaHei;">956.19亿</div>
        <div id="text"
             style="position: absolute; top: 90px; left: 162px;color:#FFFFFF;font-size: 16px; font-family:Microsoft YaHei;">安全告警</div>
        <div id="text"
             style="position: absolute; top: 105px; left: 140px;color:#FFFFFF;font-size: 28px; font-family:Microsoft YaHei;">59752391</div>
        <div id="text"
             style="position: absolute; top: 165px; left: 162px;color:#FFFFFF;font-size: 16px; font-family:Microsoft YaHei;">有效告警</div>
        <div id="text"
             style="position: absolute; top: 180px; left: 145px;color:#FFFFFF;font-size: 28px; font-family:Microsoft YaHei;">241513</div>
        <div id="text"
             style="position: absolute; top: 240px; left: 162px;color:#FFFFFF;font-size: 16px; font-family:Microsoft YaHei;">安全事件</div>
        <div id="text"
             style="position: absolute; top: 255px; left: 150px;color:#FFFFFF;font-size: 28px; font-family:Microsoft YaHei;">54396</div>
        <img :src="showPhoto2"
             alt="HIGH">
        <img :src="showPhoto"
             style="position: absolute;top:200px;left:320px"
             alt="HIGH">
        <img :src="showPhoto"
             style="position: absolute;top:240px;left:320px"
             alt="HIGH">
        <div id="text"
             style="position: absolute; top: 205px; left: 325px;color:#158CC6;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">恶意软件事件</div>
        <div id="text"
             style="position: absolute; top: 205px; left: 425px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">5439</div>
        <div id="text"
             style="position: absolute; top: 245px; left: 325px;color:#158CC6;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">其他事件</div>
        <div id="text"
             style="position: absolute; top: 245px; left: 425px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">22845</div>
      </div>
    </div>
  </el-col>
</template>
<script>
import approval_url from '@/icons/echarts/textBK_s_B.png'
import img_url from '@/icons/echarts/loudouBK.png'
import tip from '@/components/EchartsTip'
export default {
  components: { tip },
  props: {
    tipname: { // tip内容
      default: '日志异常分析',
      type: String
    },
    address: { // 厂家内容
      default: null,
      type: Number
    },
    id: { // 路由类型
      default: null,
      type: Number
    }
  },
  data () {
    return {
      showPhoto: approval_url,
      showPhoto2: img_url,
      policitalStatus: ['1']
    }
  },
  computed: {},
  watch: {
    address: {
      handler (val, oldVal) {
        if (val !== oldVal) {
          this.drawPolicitalStatus()
        }
      },
      deep: true
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
    log () {
      window.open('https://10.201.30.40/dashboard', '_blank')
    }
  }
}

</script>
<style lang="scss" scoped>
.box {
  background: #e7edf5;
}
</style>
