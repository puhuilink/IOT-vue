<template>
  <div class="home-container home">

    <iframe id="mobsf" src="/static/index.html" scrolling="no" frameborder="0" onload="adjustIframe()" />

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
      var ifm = document.getElementById('mobsf')

      ifm.height = 1600 + 'px'

      ifm.width = 1920 + 'px'
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
.home-container {
  margin-top: 20px;
  margin-right: 20px;
  margin-left: -10px;
}
</style>

