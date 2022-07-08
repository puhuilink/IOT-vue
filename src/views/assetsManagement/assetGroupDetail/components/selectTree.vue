<template>
  <div> 
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
      <el-row>
        <el-col :span="12">
          <el-tree :data="selectList"
                   show-checkbox
                   node-key="assetId" 
                   :props="defaultProps"
                  @check="getCheckedKeys(true)"
                    :filter-node-method="filterNode"
                     :default-expanded-keys="[2]"
                    ref="tree"/>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { selectAssetGruop} from "@/api/system/list";
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
     filterNode(value, data) {
        if (!value) return true;
        return data.assetType.indexOf(value) !== -1;
      },
    getTableList(){
      selectAssetGruop().then(res => {
        this.selectList= res.data;
      })
    },
    }
};
</script>
<style lang="scss"
 scoped>
::v-deep .label-type {
  .el-form-item__label {
    color: #333;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal !important;
  }
}
</style>
