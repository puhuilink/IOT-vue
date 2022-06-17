<template>
  <div class="app-container home">
    <iframe id="mobsf" :src="url" scrolling="no" frameborder="0" />
  </div>
</template>

<script>
import { getToken } from "@/api/system/echarts";
import { codeGetToken, getAPPtoken } from "@/utils/request";
export default {
  name: "Index",
  inject: ["closeCurrentTab"],
  data() {
    return {
      // 版本号
      version: "3.4.0",
      url: "",
      token: "",
    };
  },
  created() {
    //App加固获取token
    this.getAppToken();
    // this.getToken();
  },
  mounted() {
    /**
     * iframe-宽高自适应显示
     */
    function changeMobsfIframe() {
      const mobsf = document.getElementById("mobsf");
      const deviceWidth = document.body.clientWidth;
      const deviceHeight = document.body.clientHeight;
      mobsf.style.width = Number(deviceWidth) - 240 + "px"; // 数字是页面布局宽度差值
      mobsf.style.height = Number(deviceHeight) - 30 + "px"; // 数字是页面布局高度差
    }

    changeMobsfIframe();

    window.onresize = function () {
      changeMobsfIframe();
    };
  },
  methods: {
    async getAppToken() {
      //   const userName = 'zgjt'
      await codeGetToken().then(({ data }) => {
        console.log("data-6-16", data);
        this.token = data.info.token;
        this.url ="http://10.201.31.103:8000/api/login/doLoginByToken?token=" + this.token + "&username=zgjt"
      window.open(this.url, "_blank");
      this.closeCurrentTab();
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>

