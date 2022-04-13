<template>
  <div class="app-container home">

    <iframe id="mobsf"
            src="http://10.201.30.60:8080/intelligence/login-with-params?username=jiance&token=dd3fc4f8b58f39e176bc76f9d46b70b72d1d1d2a&redirect=manage-intel"
            scrolling="no"
            frameborder="0" />
  </div>
</template>

<script>
export default {
  name: 'Index',
  inject: ['closeCurrentTab'],
  data () {
    return {
      // 版本号
      version: '3.4.0'
    }
  },
  created () {
    this.log()
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
    log () {
      window.open('http://10.201.30.60:8080/intelligence/login-with-params?username=jiance&token=dd3fc4f8b58f39e176bc76f9d46b70b72d1d1d2a&redirect=manage-intel', '_blank')
      this.closeCurrentTab()
    }
  }
}
</script>

<style scoped lang="scss">
</style>

