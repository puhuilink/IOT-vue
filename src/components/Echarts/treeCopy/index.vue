<template>
  <el-col :span="12">
    <div :class="id===3 ? 'box' : ''" style="height:380px;width:780px;cursor:pointer;">
      <tip>{{ tipname }}</tip>
      <div id="bg" style="position: relative;">
        <!-- 事件关联分析左半部分 -->
        <div @click="log">
          <div id="text" style="position: absolute; top: 10px; left: 250px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">北京防火墙</div>
          <div id="text" style="position: absolute; top: 25px; left: 250px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">600</div>
          <div id="text" style="position: absolute; top: 155px; left: 250px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">厦门防火墙</div>
          <div id="text" style="position: absolute; top: 170px; left: 250px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">412</div>
          <div id="text" style="position: absolute; top: 300px; left: 250px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">区域防火墙</div>
          <div id="text" style="position: absolute; top: 315px; left: 250px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">0</div>
          <div id="text" style="position: absolute; top: 120px; left: 60px;font-size: 24px; font-family:Microsoft YaHei;">联动处置</div>
          <div id="text" style="position: absolute; top: 160px; left: 70px;color:#0E6CCB;font-weight: bold;font-size: 32px; font-family:Microsoft YaHei;">1012</div>
          <img :src="showPhoto" alt="HIGH">
        </div>
        <div @click="logtwo">
          <!-- 事件关联分析右半部分 -->
          <div id="text" style="position: absolute; top: 15px; left: 620px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">流氓推广</div>
          <div id="text" style="position: absolute; top: 30px; left: 620px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">132874</div>
          <div id="text" style="position: absolute; top: 70px; left: 620px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">定向攻击</div>
          <div id="text" style="position: absolute; top: 85px; left: 620px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">10090209</div>
          <div id="text" style="position: absolute; top: 125px; left: 620px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">僵尸网络</div>
          <div id="text" style="position: absolute; top: 140px; left: 620px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">12872328</div>
          <div id="text" style="position: absolute; top: 180px; left: 620px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">网络蠕虫</div>
          <div id="text" style="position: absolute; top: 195px; left: 620px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">122382</div>
          <div id="text" style="position: absolute; top: 235px; left: 620px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">运控木马</div>
          <div id="text" style="position: absolute; top: 250px; left: 620px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">87398437</div>
          <div id="text" style="position: absolute; top: 290px; left: 620px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">其他事件</div>
          <div id="text" style="position: absolute; top: 305px; left: 620px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">12872328</div>
          <div id="text" style="position: absolute; top: 120px; left: 420px;font-size: 24px; font-family:Microsoft YaHei;">情报命中数</div>
          <div id="text" style="position: absolute; top: 160px; left: 410px;color:#0E6CCB;font-weight: bold;font-size: 32px; font-family:Microsoft YaHei;">3268842</div>
        </div>
      </div>
    </div></el-col>
</template>
<script>
import approval_url from '@/icons/echarts/treeBK_03.png'
import tip from '@/components/EchartsTip'
export default {
  components: { tip },
  props: {
    tipname: { // tip内容
      default: '安全联动处置',
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
  data() {
    return {
      showPhoto: approval_url,
      ruleForm: {
        text: 477
      }
    }
  },
  computed: {},
  watch: {
  },
  created() {

  },
  mounted() {
  },
  methods: {
    log() {
      window.open('https://10.201.30.40/devlink', '_blank')
    },
    logtwo() {
      window.open('https://10.201.30.40/ti', '_blank')
    }

  }
}

</script>
<style lang="scss" scoped>
.box{
 background:#E7EDF5;
}
</style>
