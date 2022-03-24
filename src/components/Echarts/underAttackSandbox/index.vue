
<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1"
         style="height: 400px" />
  </el-col>
</template>
<script>
import { setNotopt } from "@/utils/emptyEcharts.js";
import tip from "@/components/EchartsTip";
import echarts from "echarts";
import { sandboxesAttacked } from '@/api/system/echarts'
export default {
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "受攻击沙箱TOP5",
      type: String,
    },
    address: {
      // 厂家内容
      default: null,
      type: Number,
    },
    query: {
      default: null,
      type: Object
    }
  },
  data () {
    return {
      policitalStatus: ["1"],
      barData: [],
      category: [],
      title: "",
    };
  },
  computed: {},
  watch: {
    query: {
      handler (val, oldVal) {
        this.queryParms = this.query
        if (val !== oldVal) {
          this.getData()
          this.drawPolicitalStatus()
        }
      },
      deep: true
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.drawPolicitalStatus();
  },
  methods: {
    transDicName (data) {
      var area = []
      data.forEach((item) => {
        area.push(item.name)
      })
      return area
    },
    transDicCount (data) {
      var area = []
      data.forEach((item) => {
        area.push(item.count)
      })
      return area
    },
    async getData () {
      await sandboxesAttacked(this.queryParms).then(({ data }) => {
        this.category = this.transDicName(data)
        this.barData = this.transDicCount(data)
      })
      this.drawPolicitalStatus()
    },
    async drawPolicitalStatus () {
      if (this.policitalStatus.length) {
        const myChart = this.$echarts.init(this.$refs.canvas1);

        // 绘制图表
        myChart.setOption({
          color: ["#FFC0CB"],
          xAxis: {
            type: "category",
            data: this.category,
          },
          yAxis: {
            type: "value",
            data: this.category,
          },
          series: [
            {
              data: this.barData,
              type: "bar",
              barWidth: 30, //柱图宽度
            },
          ],
        });
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      } else {
        const myChart = this.$echarts.init(this.$refs.canvas1);
        this.$refs.canvas1.removeAttribute("_echarts_instance_");
        return setNotopt(myChart, "暂无数据");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
