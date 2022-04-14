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
          <el-select v-model="formData.location" placeholder="请选择区域" clearable :style="{width: '100%'}">
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
          <el-select v-model="formData.date" placeholder="请选择时间" clearable :style="{width: '100%'}">
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
          <el-select v-model="formData.severity" placeholder="请选择等级" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in severityOption"
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
        location: '',
        date: '',
        severity: ''
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
      severityOption: [{
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
      }]
    }
  },
  computed: {},
  watch: {
    'formData.location': {
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
        if (val !== oldVal && val) {
          this.formData.beginGenerationTime = this.getdate(val)[0]
          this.formData.endGenerationTime = this.getdate(val)[1]
          this.getdata()
        } else {
          this.formData.beginGenerationTime = ''
          this.formData.endGenerationTime = ''
          this.getdata()
        }
      }
    },
    'formData.severity': {
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
    getDay(num, str) {
      var today = new Date()
      var nowTime = today.getTime()
      var ms = 24 * 3600 * 1000 * num
      today.setTime(parseInt(nowTime + ms))
      var oYear = today.getFullYear()
      var oMoth = (today.getMonth() + 1).toString()
      if (oMoth.length <= 1) oMoth = '0' + oMoth
      var oDay = today.getDate().toString()
      if (oDay.length <= 1) oDay = '0' + oDay
      return oYear + str + oMoth + str + oDay
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
        date: this.formData.date,
        location: this.formData.location,
        beginGenerationTime: this.formData.beginGenerationTime,
        endGenerationTime: this.formData.endGenerationTime,
        severity: this.formData.severity
      })
    }

  }
}

</script>
<style lang="scss" scoped>

</style>
