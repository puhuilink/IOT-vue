<template>
  <div class="app-container home">

    <iframe
      id="mobsf"
      src="https://10.201.30.40/microapps/app-sso/index.html?token=e1a08736dede6c2f0f0ad2bfef727ce4d72b10ffd6ea32888cc0fd4e26bcaf15&redirectUrl=https://10.201.30.40/situation-awareness/integrated"
      scrolling="no"
      frameborder="0"
    />

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
  }
}
</script>

<style scoped lang="scss">
</style>

