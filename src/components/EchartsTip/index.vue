<template>
  <div class="tip-container">
      <div class="tip flex j-s a-c">
        <slot />
        <slot name="right" />
        <div v-if=" date!==0&&date===7" class="right">最近7天数据</div>
        <div v-else-if=" date!==0&&date===12" class="right">最近一年数据</div>
         <div v-else class="right">最近一个月数据</div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Tip",
   props: {
    date: {
      // 分辨7天还是30天或者一年
      default: 7,
      type: Number,
    }
  },
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
}

.tip-container {
  margin: 10px 0 20px;
}
.right{
  float: right;
  margin-right:80px;
 font-weight: bold;
}
</style>
