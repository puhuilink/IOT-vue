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
              :value="item.value"
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
          label: "新疆八一钢筋厂",
          value: "新疆八一钢筋厂",
        },
        {
          label: "浙江联顺预制厂",
          value: "浙江联顺预制厂",
        },
        {
          label: "重庆预制厂",
          value: "重庆预制厂",
        },
        {
          label: "安徽天恩砂石厂",
          value: "安徽天恩砂石厂",
        },
         {
          label: "青岛混凝土厂",
          value: "青岛混凝土厂",
        },
        {
          label: "三亚海投轨交",
          value: "三亚海投轨交",
        },
        {
          label: "山西三通燃气厂",
          value: "山西三通燃气厂",
        },
        {
          label: "松通高速预制厂",
          value: "松通高速预制厂",
        },
        {
          label: "北京城乡水厂",
          value: "北京城乡水厂",
        },
       
        {
          label: "深中通道预制厂",
          value: "深中通道预制厂",
        },
        {
          label: "广州地铁钢筋厂",
          value: "广州地铁钢筋厂",
        },
        {
          label: "乌尉高速制梁厂",
          value: "乌尉高速制梁厂",
        },
        {
          label: "玉湛高速制梁厂",
          value: "玉湛高速制梁厂",
        },
      ],
      severityOption: [
        {
          label: "极低",
          value: 1,
        },
        {
          label: "低危",
          value: 2,
        },
        {
          label: "中危",
          value: 3,
        },
        {
          label: "高危",
          value: 4,
        },
        {
          label: "致命",
          value: 5,
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
