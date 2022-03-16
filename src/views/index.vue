<template>
  <div class="app-container home">

    <!-- <iframe id="mobsf" src="http://116.63.139.209:9081/#/previewScreen?id=2G14ZDRR8_20210226111843&pre=1" scrolling="no" frameborder="0" /> -->

  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      // 版本号
      version: '3.4.0'
    }
  },
  mounted() {
    /**
   * iframe-宽高自适应显示
   */
    function changeMobsfIframe() {
      const mobsf = document.getElementById('mobsf')
      const deviceWidth = document.body.clientWidth
      const deviceHeight = document.body.clientHeight
      mobsf.style.width = (Number(deviceWidth) - 240) + 'px' // 数字是页面布局宽度差值
      mobsf.style.height = (Number(deviceHeight) - 30) + 'px' // 数字是页面布局高度差
    }

    changeMobsfIframe()

    window.onresize = function() {
      changeMobsfIframe()
    }
  },
  methods: {
    goTarget(href) {
      window.open(href, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
</style>

