<template>
  <div>
    <el-card>
      <el-form :model="queryParams"
               ref="queryForm"
               :inline="true"
               v-show="showSearch"
               label-width="65px">
        <el-form-item label="资产组 :"
                      prop="categoryId"
                      class="label-type">
          <el-select v-model="queryParams.categoryId"
                     placeholder="请选择"
                     clearable
                     size="small"
                     @change="selectChanged">
            <el-option v-for="item in allTypeList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     size="mini"
                     @click="handleQuery">新增</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="resetQuery">编辑</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="resetQuery">删除</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="10"
              class="mb8">
        <el-col :span="1.5">
          <el-button v-hasPermi="['system:user:add']"
                     type="primary"
                     @click="handleAdd">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="12">
          <el-tree :data="data"
                   show-checkbox
                   node-key="id"
                   :default-expanded-keys="[2, 3]"
                   :default-checked-keys="[5]" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          id: 1,
          label: '全部',
          children: [
            {
              id: 3,
              label: '中交总部',
              children: [
                {
                  id: 4,
                  label: '三级 3-1-1'
                },
                {
                  id: 5,
                  label: '三级 3-1-2'
                  //   disabled: true,
                }
              ]
            },
            {
              id: 2,
              label: '二级单位',
              //   disabled: true,
              children: [
                {
                  id: 6,
                  label: '中交海投',
                  children: [{ id: 10, label: '三亚海投轨交' }]
                },
                {
                  id: 7,
                  label: '中国城乡',
                  //   disabled: true,
                  children: [
                    { id: 11, label: '北京城乡水厂' },
                    { id: 12, label: '山西三通燃气厂' }
                  ]
                },
                {
                  id: 8,
                  label: '中交四航局',
                  children: [
                    { id: 13, label: '深中通道沉管智慧工厂' }
                  ]
                },
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      showSearch: true,
      allTypeList: [
        {
          label: '主机',
          value: 0
        },
        {
          label: '服务器',
          value: 1
        },
        {
          label: '网闸',
          value: 0
        },
        {
          label: '网关',
          value: 1
        },
        {
          label: '防火墙',
          value: 0
        },
        {
          label: '平台系统',
          value: 1
        }
      ],
      queryParams: {}
    }
  },
  methods: {
  },
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
