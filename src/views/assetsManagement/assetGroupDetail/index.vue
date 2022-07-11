<template>
  <div>
    <div class="box-container">
      <el-row>
        <el-col :span="6">
        <select-tree @checkItem="checkTreeItem" />
        </el-col>
        
        <el-col :span="18">
          <asset-group-query :selectParams="this.checkTreeData"  />
        </el-col></el-row>
    </div>
  </div>
</template>
<script>
import { selectAssetGruop} from "@/api/system/list";
import selectTree from './components/selectTree'
import assetGroupQuery from './components/assetGroupQuery'
export default {
 components: {
    selectTree,
    assetGroupQuery,
  },
  data () {
    return {
      checkTreeData: {
        assetTypes:'',
         pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    checkTreeItem (data) {  
      this.checkTreeData.assetTypes = data;
    },
  }
};
</script>
<style lang="scss" scoped>
.box-container {
  padding: 15px;
}
</style>

