<template>
  <el-row :gutter="16">
    <el-form
      ref="elForm"
      :model="formData"
      size="mini"
      label-width="100px"
      label-position="left"
    >
      <el-col :span="3">
        <el-form-item label-width="1px" label="">
          <el-select v-model="formData.address" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in addressOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label-width="1px" label="">
          <el-select v-model="formData.date" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in dateOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label-width="1px" label="">
          <el-select v-model="formData.field102" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in field102Options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>
<script>
export default {
  name: 'Echarts',
  components: {},
  props: [],
  data() {
    return {
      formData: {
        address: 1,
        date: '最近一天',
        field102: '全部威胁等级'
      },
      rules: {
        address: [{
          required: true,
          message: '',
          trigger: 'change'
        }],
        date: [{
          required: true,
          message: '',
          trigger: 'change'
        }],
        time: [{
          required: true,
          message: '',
          trigger: 'change'
        }]
      },
      addressOptions: [{
        'label': '全部地区',
        'value': 1
      }, {
        'label': '山西燃气厂',
        'value': 2
      }, {
        'label': '北京城乡水厂',
        'value': 3
      }, {
        'label': '天津管片厂',
        'value': 4
      }, {
        'label': '珠海深中通道',
        'value': 5
      }, {
        'label': '三亚海投轨交',
        'value': 6
      }],
      dateOptions: [{
        'label': '最近一天',
        'value': 1
      }, {
        'label': '最近7天',
        'value': 2
      }, {
        'label': '最近30天',
        'value': 3
      }],
      field102Options: [{
        'label': '全部威胁等级',
        'value': 1
      }, {
        'label': '致命',
        'value': 2
      }, {
        'label': '高危',
        'value': 3
      }, {
        'label': '中危',
        'value': 4
      }, {
        'label': '低危',
        'value': 5
      }, {
        'label': '极低',
        'value': 6
      }]
    }
  },
  computed: {},
  watch: {
    'formData.address': {
      deep: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.getdata()
        } else {
          return
        }
      }
    },
    'formData.date': {
      deep: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.getdata()
        } else {
          return
        }
      }
    },
    'formData.time': {
      deep: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.getdata()
        } else {
          return
        }
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getdata() {
      this.$emit('getaddress', {
        address: this.formData.address,
        date: this.formData.date,
        time: this.formData.time
      })
    }

  }
}

</script>
<style lang="scss" scoped>

</style>
