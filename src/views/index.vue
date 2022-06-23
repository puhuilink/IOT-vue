<template>
  <div >
    <iframe ref="vueIframe" id="mobsf" src="/static/index.html" scrolling="no" frameborder="0"  />
  </div>
</template>

<script>
import { getToken, getAPPtoken } from '@/api/system/echarts'
export default {
  name: 'Index',
  data() {
    return {
      // 版本号    
      version: '3.4.0',
      query:{
       token:'', //微步token
       appToken:'' //APP加固token
      }
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
  async created(){
      await Promise.all([
       this.getAppToken(),
    this.getToken()
    ])
    this.loaded()
  
  },
  methods: { 
      async getAppToken(){ 
    const res = await getAPPtoken()
    this.query.appToken = res
    },   
    async getToken(){
    const res = await getToken()
    this.query.token = res
    },
  loaded(){
			this.iframeWin.postMessage(this.query,'*');
			},

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

