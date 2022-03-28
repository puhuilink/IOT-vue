<template>
  <el-col :span="12">
    <div :class="id===2 ? 'box' : ''" style="height:380px;width:780px;cursor:pointer;" @click="log">
      <tip>{{ tipname }}</tip>
      <div id="bg" style="position: relative;">
        <!-- 事件关联分析左半部分 -->
        <div id="text" style="position: absolute; top: 18px; left: 10px;color:#0E6CCB;color:#0E6CCB;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">协议异常</div>
        <div id="text" style="position: absolute; top: 18px; right: 680px;color:#0E6CCB;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">4</div>
        <div id="text" style="position: absolute; top: 54px; left: 10px;color:#0E6CCB;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">应用异常</div>
        <div id="text" style="position: absolute; top: 54px; right: 680px;color:#0E6CCB;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">3</div>
        <div id="text" style="position: absolute; top: 90px; left: 10px;color:#0E6CCB;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">其他</div>
        <div id="text" style="position: absolute; top: 90px; right: 680px;color:#0E6CCB;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">22</div>
        <div id="text" style="position: absolute; top: 126px; left: 10px;color:#0E6CCB;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">木马类</div>
        <div id="text" style="position: absolute; top: 126px; right: 680px;color:#0E6CCB;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">13</div>
        <div id="text" style="position: absolute; top: 162px; left: 10px;color:#F73030;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">工控僵木蠕类</div>
        <div id="text" style="position: absolute; top: 162px; right: 680px;color:#F73030;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">1</div>
        <div id="text" style="position: absolute; top: 198px; left: 10px;color:#0E6CCB;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">其他</div>
        <div id="text" style="position: absolute; top: 198px; right: 680px;color:#0E6CCB;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">53</div>
        <div id="text" style="position: absolute; top: 234px; left: 10px;color:#0E6CCB;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">Webshell</div>
        <div id="text" style="position: absolute; top: 234px; right: 680px;color:#0E6CCB;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">8</div>
        <div id="text" style="position: absolute; top: 270px; left: 10px;color:#0E6CCB;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">执行命令</div>
        <div id="text" style="position: absolute; top: 270px; right: 680px;color:#0E6CCB;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">14</div>
        <div id="text" style="position: absolute; top: 306px; left: 10px;color:#0E6CCB;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">其他</div>
        <div id="text" style="position: absolute; top: 306px; right: 680px;color:#0E6CCB;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">106</div>
        <div id="text" style="position: absolute; top: 20px; left: 150px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">异常事件规则</div>
        <div id="text" style="position: absolute; top: 35px; left: 150px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">29</div>
        <div id="text" style="position: absolute; top: 150px; left: 150px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">恶意软件规则</div>
        <div id="text" style="position: absolute; top: 165px; left: 150px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">76</div>
        <div id="text" style="position: absolute; top: 280px; left: 150px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">攻击利用规则</div>
        <div id="text" style="position: absolute; top: 295px; left: 150px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">128</div>
        <div id="text" style="position: absolute; top: 120px; left: 315px;font-size: 24px; font-family:Microsoft YaHei;">关联规则</div>
        <div id="text" style="position: absolute; top: 140px; left: 320px;color:#0E6CCB;font-weight: bold;font-size: 48px; font-family:Microsoft YaHei;">{{ ruleForm.text }}</div>
        <img :src="showPhoto" alt="HIGH">
        <!-- 事件关联分析右半部分 -->
        <div id="text" style="position: absolute; top: 22px; left: 630px;color:#0E6CCB;color:#0E6CCB;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">信息泄露</div>
        <div id="text" style="position: absolute; top: 22px; right: 60px;color:#0E6CCB;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">5</div>
        <div id="text" style="position: absolute;top: 76px; left: 630px;;color:#F73030;;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">工控数据安全</div>
        <div id="text" style="position: absolute; top: 76px; right: 60px;color:#F73030;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">1</div>
        <div id="text" style="position: absolute; top: 134px;left: 630px;color:#0E6CCB;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">其他</div>
        <div id="text" style="position: absolute; top: 134px; right: 60px;color:#0E6CCB;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">1</div>
        <div id="text" style="position: absolute; top: 188px; left: 630px;;color:#0E6CCB;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">APT事件</div>
        <div id="text" style="position: absolute; top: 188px; right: 60px;color:#0E6CCB;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">12</div>
        <div id="text" style="position: absolute; top: 246px; left: 630px;color:#0E6CCB;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">其他</div>
        <div id="text" style="position: absolute; top: 246px; right: 60px;color:#0E6CCB;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">1</div>
        <div id="text" style="position: absolute; top: 300px; left: 630px;color:#F73030;;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">工控协议审计</div>
        <div id="text" style="position: absolute; top: 300px; right: 60px;color:#F73030;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">4</div>
        <div id="text" style="position: absolute; top: 20px; left: 500px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">数据异常规则</div>
        <div id="text" style="position: absolute; top: 35px; left: 500px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">5</div>
        <div id="text" style="position: absolute; top: 110px; left: 500px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">其他规则</div>
        <div id="text" style="position: absolute; top: 125px; left: 500px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">218</div>
        <div id="text" style="position: absolute; top: 200px; left: 500px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">威胁活动规则</div>
        <div id="text" style="position: absolute; top: 215px; left: 500px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">68</div>
        <div id="text" style="position: absolute; top: 290px; left: 500px;color:#402165;font-weight: bold;font-size: 12px; font-family:Microsoft YaHei;">操作异常规则</div>
        <div id="text" style="position: absolute; top: 305px; left: 500px;color:#402165;font-weight: bold;font-size: 14px; font-family:Microsoft YaHei;">5</div>
      </div>
    </div>
  </el-col>
</template>
<script>
import approval_url from '@/icons/echarts/treeBK_04.png'
import tip from '@/components/EchartsTip'
export default {
  components: { tip },
  props: {
    tipname: { // tip内容
      default: '事件关联分析',
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
      window.open('https://10.201.30.40/associate/config', '_blank')
    }
  }
}

</script>
<style lang="scss" scoped>
.box{
 background:#E7EDF5;
}
</style>
