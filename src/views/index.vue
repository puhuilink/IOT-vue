<template>
  <div class="home-container home">

    <iframe ref="vueIframe" id="mobsf" src="/static/index.html" @load="loaded" scrolling="no" frameborder="0"  />

  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      // 版本号
      resultData:'www',
      version: '3.4.0'
    }
  },
  mounted() {
    /**
   * iframe-宽高自适应显示
   */
  this.iframeWin = this.$refs.vueIframe.contentWindow;

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
    loaded(){
				this.iframeWin.postMessage(this.resultData,'*');
			},
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

