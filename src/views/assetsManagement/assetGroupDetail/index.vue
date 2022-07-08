<template>
  <div>
    <div class="box-container">
      <el-row>
        <!-- <el-col :span="6">
          <PubliceTree v-if="refreshTable"
                         ref="customTree"
                         :itemShow="itemShow"
                         :tree-data="treeData"
                         :tree-expand-all="treeExpandAll"
                         :tree-node-key="treeNodeKey"
                         @handleNodeClick='handleNodeClick'
                         @addItem="addTreeItem"
                         @deleteItem="deleteTreeItem"
                         @editItem="editTreeItem">
            </PubliceTree>
        </el-col> -->
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
// import PubliceTree from './components/tree'
import selectTree from './components/selectTree'
import assetGroupQuery from './components/assetGroupQuery'
export default {
 components: {
    selectTree,
    assetGroupQuery
  },
  data () {
    return {
      checkTreeData: {
        assetTypes:'',
         pageNum: 1,
        pageSize: 10,
      },
      checked: false,
      itemShow: true,
      treeExpandAll: false,
      refreshTable: true,
      treeNodeKey: 'assetId',
      treeData: [],
    };
  },
  created () { },
  mounted () {
    this.getTreeselect();
  },
  methods: {
    resetQuery () {
      this.getTreeselect();
    },
    //  查询左侧tree下拉树结构
    getTreeselect () {
        selectAssetGruop().then(res => {
        this.treeData= res.data;
         // 选择顶级节点展示
           this.formTableData = [{ assetId: 0, name: '顶级', children: this.treeData }];
      })
    },
    // 展开全部
    getTask () {
      this.refreshTable = false;
      this.treeExpandAll = !this.treeExpandAll;
      // this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行,类似全局刷新
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    // 选中每一个子节点---对应右边明细
    handleNodeClick (data) {
      getDetail({ assetId: data.assetId }).then(response => {
        this.formItem = {
          allFlag: response.data.allFlag,
          sort: response.data.sort,
          name: response.data.name,
          stander: response.data.stander,
          parentassetId: response.data.parentassetId,
          assetId: response.data.assetId
        };
        if (response.data.parentassetId === 0) {
          this.formItem.parentName = response.data.name;
        } else {
          this.formItem.parentName = response.data.parentName;
        }
      });
    },
    // 弹框------------------------新增表单数据
    addData (data) {
      // this.$refs.customTree.treeAddItem(data)
      this.getTreeselect();
      this.clean();
    },
    // 弹框-------------------------修改表单数据
    editData (data) {
      this.$refs.customTree.treeEditItem(data);
      this.handleNodeClick(data);
    },
    addTree () {
      this.$refs.placeDialog.openDialog(false, '', {}, this.formTableData);
    },
    // ----------------增加树节点设置默认父级节点
    addTreeItem (data) {
      this.$refs.placeDialog.openDialog(false, data.assetId, data, undefined);
    },
    checkTreeItem (data) {  
      this.checkTreeData.assetTypes = data;
    },
    // ----------------修改树节点
    editTreeItem (data) {
      this.$refs.placeDialog.openDialog(true, data.assetId, data, undefined);
    },
    // ---删除树节点
    deleteTreeItem (data) {
      this.$confirm('确认要删除当前节点 ' + data.name + ' 吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除树节点
          DeleteTreeselect({ assetId: data.assetId }).then(response => {
            this.$message({ type: 'success', message: '删除成功' });
            this.clean();
            this.$refs.customTree.treeDeleteItem(data);
          });
        })
        .catch(() => { });
    },
  }
};
</script>
<style lang="scss" scoped>
.box-container {
  padding: 15px;
}
</style>

