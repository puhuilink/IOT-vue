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
              label: '服务器',
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
              label: '终端设备',
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
            },
            {
              id: 10,
              label: '网络设备',
              children: [
                {
                  id: 11,
                  label: '三级 3-1-1'
                },
              ]
            },
             {
              id: 12,
              label: '通信设备',
              children: [
                {
                  id: 13,
                  label: '三级 3-1-1'
                },
              ]
            },
             {
              id: 14,
              label: '安全设备',
              children: [
                {
                  id: 15,
                  label: '安全网关'
                },
              ]
            },
             {
              id: 16,
              label: '数据网闸',
              children: [
                {
                  id: 17,
                  label: '安全网关'
                },
              ]
            },
             {
              id: 18,
              label: '工业防火墙',
              children: [
                 {
                  id: 19,
                  label: '长亭WAF'
                },
                {
                  id: 20,
                  label: '华三WAF'
                },
                 {
                  id: 21,
                  label: '山石WAF'
                },
              ]
            },
             {
              id: 22,
              label: '显示设备',
              children: [
                {
                  id: 23,
                  label: '安全网关'
                },
              ]
            },
             {
              id: 24,
              label: '风控设备',
              children: [
                {
                  id: 25,
                  label: '安全网关'
                },
              ]
            },
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
