<template>
  <div class="tip-container">
    <div>
      <div class="tip flex j-s a-c">
        <slot />
        <slot name="right" />
      </div>
      <div class="right">最近7天数据</div>
      <!-- <div class="right" v-else>最近一个月数据</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Tip",
};
</script>

<style lang='scss' scoped>
.tip {
  border-left: 4px solid #3d6bca;
  border-radius: 3px;
  font-weight: bold;
  height: 24px;
  padding: 2px;
  padding-left: 12px;
  margin-top: 10px;
  float: left;
}

.tip-container {
  margin: 10px 0 20px;
}
.right{
  float:right;
  margin-right:80px;
  margin-top:20px;
}
</style>
