<template>
  <div>
    <div class="box-container">
      <el-row>
        <el-col :span="6">
          <select-tree />
        </el-col>
        <el-col :span="18">
          <asset-group-query />
        </el-col></el-row>
    </div>
  </div>
</template>
<script>
import selectTree from './components/selectTree'
import assetGroupQuery from './components/assetGroupQuery'

export default {
  components: {
    selectTree,
    assetGroupQuery
  },
  data() {
    return {
      clickIdParams: {}
    }
  },
  methods: {
    clickTree(data) {
      this.clickIdParams = data
    }
  }
}
</script>
<style lang="scss" scoped>
.box-container {
  padding: 15px;
}
</style>

