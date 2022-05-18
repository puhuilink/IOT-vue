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
          <el-select
            v-model="formData.location"
            placeholder="请选择区域"
            clearable
            :style="{ width: '100%' }"
          >
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
          <el-select
            v-model="formData.severity"
            placeholder="请选择等级"
            clearable
            :style="{ width: '100%' }"
          >
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
  name: "Echarts",
  components: {},
  props: {
    eventType: {
      default: null,
      type: Number,
    },
  },
  data() {
    return {
      formData: {
        location: "",
        severity: "",
      },
      rules: {
        address: [
          {
            required: true,
            message: "",
            trigger: "change",
          },
        ],
        time: [
          {
            required: true,
            message: "",
            trigger: "change",
          },
        ],
      },
      addressOptions: [
        {
          label: "山西三通燃气厂",
          value: 2,
        },
        {
          label: "北京城乡水厂",
          value: 3,
        },
        {
          label: "天津管片厂",
          value: 4,
        },
        {
          label: "珠海深中通道",
          value: 5,
        },
        {
          label: "三亚海投轨交",
          value: 6,
        },
      ],
      severityOption: [
        {
          label: "致命",
          value: 5,
        },
        {
          label: "高危",
          value: 4,
        },
        {
          label: "中危",
          value: 3,
        },
        {
          label: "低危",
          value: 2,
        },
        {
          label: "极低",
          value: 1,
        },
      ],
    };
  },
  computed: {},
  watch: {
    "formData.location": {
      deep: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.getdata();
        } else {
          return;
        }
      },
    },
    "formData.severity": {
      deep: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.getdata();
        } else {
          return;
        }
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    getdata() {
      this.$emit("getquery", {
        location: this.formData.location,
        severity: this.formData.severity,
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
