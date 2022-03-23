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
          <el-select v-model="formData.region" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in addressOptions"
              :key="index"
              :label="item.label"
              :value="item.label"
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
        <el-form-item v-if="eventType===1" label-width="1px" label="">
          <el-select v-model="formData.eventLevel" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in eventLevelOption"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-else label-width="1px" label="">
          <el-select v-model="formData.eventLevel" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in eventLevelOptions"
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
  props: {
    eventType: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      formData: {
        region: '',
        date: '',
        eventLevel: ''
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
      eventLevelOption: [{
        'label': '致命',
        'value': 5
      }, {
        'label': '高危',
        'value': 4
      }, {
        'label': '中危',
        'value': 3
      }, {
        'label': '低危',
        'value': 2
      }, {
        'label': '极低',
        'value': 1
      }],
      eventLevelOptions: [{
        'label': '致命',
        'value': '1'
      }, {
        'label': '高危',
        'value': 'High'
      }, {
        'label': '中危',
        'value': 'Medium'
      }, {
        'label': '低危',
        'value': '1'
      }, {
        'label': '极低',
        'value': '1'
      }]
    }
  },
  computed: {},
  watch: {
    'formData.region': {
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
          this.formData.params['beginGenerationTime'] = this.getdate(val)[0]
          this.formData.params['endGenerationTime'] = this.getdate(val)[1]
          this.getdata()
        } else {
          return
        }
      }
    },
    'formData.eventLevel': {
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
    Twodigits(num) {
      return num < 10 ? '0' + num : num
    },
    getdate(type) {
      var myDate = new Date()
      var beforeseven = new Date()
      var thirty = new Date()
      myDate.setDate(myDate.getDate())
      beforeseven.setDate(beforeseven.getDate() - 1 - 6)
      thirty.setDate(thirty.getDate() - 1 - 29)
      if (type === 2) {
        return [
          beforeseven.getFullYear() +
      '-' +
      this.Twodigits(beforeseven.getMonth() + 1) +
      '-' +
     this.Twodigits(beforeseven.getDate()),
          myDate.getFullYear() +
      '-' +
     this.Twodigits(myDate.getMonth() + 1) +
      '-' +
      this.Twodigits(myDate.getDate())
        ]
      } else if (type === 3) {
        // 最近30天
        return [
          thirty.getFullYear() +
      '-' +
      this.Twodigits(thirty.getMonth() + 1) +
      '-' +
      this.Twodigits(thirty.getDate()),
          myDate.getFullYear() +
      '-' +
      this.Twodigits(myDate.getMonth() + 1) +
      '-' +
     this.Twodigits(myDate.getDate())
        ]
      } else if (type === 1) {
        // 昨天
        var yesterday = this.getDay(-1, '-')
        return [
          yesterday,
          yesterday
        ]
      }
    },
    getdata() {
      this.$emit('getquery', {
        region: this.formData.region,
        // date: this.formData.date,
        eventLevel: this.formData.eventLevel
      })
    }

  }
}

</script>
<style lang="scss" scoped>

</style>
