<template>
  <div class="tip-container">
    <div class="tip flex j-s a-c">
      <slot />
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tip'
}
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
</style>
