<template>
  <div class="app-container home">

    <iframe id="mobsf"
          :src="url"
            scrolling="no"
            frameborder="0" />
  </div>
</template>

<script>
import { getToken } from '@/api/system/echarts'
export default {
  name: 'Index',
  inject: ['closeCurrentTab'],
  data () {
    return {
      // 版本号
      version: '3.4.0',
      url:''
    }
  },
  created () {
      this.getToken()
  },
  mounted () {
    /**
   * iframe-宽高自适应显示
   */
    function changeMobsfIframe () {
      const mobsf = document.getElementById('mobsf')
      const deviceWidth = document.body.clientWidth
      const deviceHeight = document.body.clientHeight
      mobsf.style.width = (Number(deviceWidth) - 240) + 'px' // 数字是页面布局宽度差值
      mobsf.style.height = (Number(deviceHeight) - 30) + 'px' // 数字是页面布局高度差
    }

    changeMobsfIframe()

    window.onresize = function () {
      changeMobsfIframe()
    }
  },
  methods: {
      async getToken(){
    const res = await getToken()
   this.url =  'http://10.201.30.60:80/intelligence/login-with-params?username=jiance&token='+res+'&redirect=manage-intel'
    window.open(this.url, '_blank')
      this.closeCurrentTab()
    },
  }
}
</script>

<style scoped lang="scss">
</style>

