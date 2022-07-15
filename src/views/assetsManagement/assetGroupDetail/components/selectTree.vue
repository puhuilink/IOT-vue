<template>
  <div class="tree_container"> 
    <el-card>
      <el-row>
          <el-col :span="24">
            <el-input
              v-model="filterText"
              clearable
              placeholder="请输入名称"
              prefix-icon="el-icon-search"
              size="small"
            />
          </el-col>
        </el-row>
      <el-row class="setHeight">
        <el-col :span="18">
          <el-tree :data="selectList"
                   show-checkbox
                   node-key="assetId" 
                   :props="defaultProps"
                  @check="getCheckedKeys(true)"
                    :filter-node-method="filterNode"
                     :default-expanded-keys="[2]"
                    ref="tree">
                  <span class="custom-tree-node show-hide" slot-scope="{ node}">
                <span>{{ node.label }}</span>
                <!-- <span style="display:none;">
                    <i  style="color:blue" @click="() => appendNode(node, data)" class="small-operation-btn el-icon-plus" title="增加"></i> -->
                    <!--增加节点-->
                    <!-- 根节点不需要删除和修改 -->
                    <!-- <i  style="color:blue" v-if="data.id !== 1" @click="() => removeNode(node,data)" class="small-operation-btn el-icon-delete" title="删除"></i> -->
                    <!--删除节点-->
                    <!-- <i  style="color:blue"  v-if="data.id !== 1" @click="() => editNode(node,data)" class="small-operation-btn el-icon-edit" title="编辑"></i> -->
                    <!--编辑节点-->
                <!-- </span> -->
            </span>
          </el-tree>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { selectAssetGruop,getNatureTreeNode,putNatureTreeNode,delNatureTreeNode} from "@/api/system/list";
export default {
  data () {
    return {
      selectList:[],
      filterText: '',
      checkData: [],
      defaultProps: {
        children: 'children',
        label: 'assetType'
      },
    }
  },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
  created() {
    this.getTableList();
  },
  methods: {
      // tree组件的点击事件
      getCheckedKeys() {  
      this.checkData = this.$refs.tree.getCheckedNodes(true);
      this.orgTreeData = this.checkData.filter((e) => e.assetType)
        .map(({ assetType }) => (
          assetType
        )).join(',')
        this.$emit('checkItem', this.orgTreeData) // 这是选中的节点数组  
      },
      //筛选tree
     filterNode(value, data) {
        if (!value) return true;
        return data.assetType.indexOf(value) !== -1;
      },
      //获取tree
    getTableList(){
      selectAssetGruop().then(res => {
        this.selectList= res.data;
      })
    },
    	// 新增树节点
    appendNode(node, data) {
      this.nodeForm.parentId = data.id;
      getNatureTreeNode().then(res =>{
        console.log(res);
      });
    },
    // 删除树节点
    removeNode(node, data) {
      // 判断该节点是否有子节点
      if(node.childNodes.length != 0){
        this.$message({
          message: '该节点下存在子节点，不允许直接删除',
          type: 'warning'
        });
        return;
      }
      this.$confirm("是否确认删除此节点?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delNatureTreeNode(data.id);
        })
        .then(res => {
      console.log(res);
        })
        .catch(function () {});
    },
    // 编辑树节点
    editNode(node, data) {
      putNatureTreeNode(data.id).then(res =>{
  console.log(res);
      });
    }

    }
};
</script>
<style lang="scss"
 scoped>
 .tree_container{
  margin-top: 20px;
 
  .setHeight{
     height:630px;
  }
 }
 .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
     .small-operation-btn {
    margin: 0px 5px;
  }
    .el-icon-plus:hover {
  color: #1c92e0;
}
.el-icon-edit:hover {
  color: #1c92e0;
}
.el-icon-delete:hover {
  color: #1c92e0;
}

  .show-hide:hover :nth-child(2) {
      display: inline-block !important;
    }
</style>
