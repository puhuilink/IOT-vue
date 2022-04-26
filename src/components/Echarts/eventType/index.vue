<template>
  <el-col :span="12">
    <tip>{{ tipname }}</tip>
    <div ref="canvas1" style="height: 400px" />
  </el-col>
</template>
<script>
import { setNotopt } from "@/utils/emptyEcharts.js";
import { TYPE_ARR } from "@/config/consistent/syslogType";
import {
  getWeakPasswordData,
  getbaseJiangTableData,
  getIndustrialNetworkAuditData,
  getHostSecurityData,
  getAbnormalBehaviorEventRetrievalData,
  getElasticDate,
  getManagementThreatEventsData,
} from "@/utils/request";
import {
 scanningeventStatusEcharts,
  scanninghostEcharts,
  industrialNetworkAuditeventLevelEcharts,
  policyNameEcharts,
  recipientEcharts,
  scanningEcharts,
} from "@/api/system/echarts";

import tip from "@/components/EchartsTip";
export default {
  name: "AAA",
  components: { tip },
  props: {
    tipname: {
      // tip内容
      default: "事件类型分布",
      type: String,
    },
    name: {
      // 模块名称
      default: "",
      type: String,
    },
    type: {
      // tip内容
      default: null,
      type: String,
    },
    query: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      TYPE_ARR,
      datacopy: [],
      assetsData: [],
      querys:{
   beginTime: "",
        endTime: "",
        severity: "",
        location: "",
      },
      queryParms: {
        query: {
          bool: {
            must: [],
          },
        },
        aggs: {
          field: {
            terms: {
              field: this.type,
              size: 10,
            },
          },
        },
      },
      hasData: [],
    };
  },
  computed: {},
  watch: {
    query: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          if (val.severity) {
             this.querys.severity = val.severity;
            this.queryParms.query.bool.must.push({
              match: {
                severity: val.severity,
              },
            });
          }
          if (val.location) {
              this.querys.location = val.location;
            this.queryParms.query.bool.must.push({
              match: {
                location: val.location,
              },
            });
          }
          if (val.beginGenerationTime) {
            this.querys.beginGenerationTime = val.beginGenerationTime;
            this.querys.endGenerationTime = val.endGenerationTime;
            this.queryParms.query.bool.must.push({
              range: {
                generationTime: {
                  gte: val.beginGenerationTime,
                  lte: val.endGenerationTime,
                },
              },
            });
          }
          this.getData();
          this.drawPolicitalStatus();
        }
      },
      deep: true,
    },
  },
  created() {
    this.getType();
    this.getData();
  },

  mounted() {
    this.drawPolicitalStatus();
  },

  methods: {
      transTypeDicTwo(data) {
      var t = [{
        name: '1',
        content: '极低'
      }, {
        name: '2',
        content: '低危'
      }, {
        name: '3',
        content: '中危'
      }, {
        name: '4',
        content: '高危'
      }, {
        name: '5',
        content: '致命'
      }]
      var arr = data
      var arrNew = []
      var area = []
      data.forEach((item) => {
        area.push(item.name)
      })
      arr.map(r => {
        t.map(d => {
          if (r.name === d.name) {
            console.log(r, d)
            arrNew.push({
              value: r.count,
              name: d.content
            })
          }
        })
      })
      return arrNew
    },
    transTypeDic(data) {
      var t = [
        {
          key: "1",
          content: "极低",
        },
        {
          key: "2",
          content: "低危",
        },
        {
          key: "3",
          content: "中危",
        },
        {
          key: "4",
          content: "高危",
        },
        {
          key: "5",
          content: "致命",
        },
      ];
      var arr = data;
      var arrNew = [];
      var area = [];
      data.forEach((item) => {
        area.push(item.key);
      });
      arr.map((r) => {
        t.map((d) => {
          if (r.key === d.key) {
            arrNew.push({
              value: r.doc_count,
              name: d.content,
            });
          }
        });
      });
      return arrNew;
    },
    transType(data) {
      var t = [
        {
          key: "class_ivtp",
          content: "入侵诱捕事件",
        },
        {
          key: "class_abbm",
          content: "异常行为管理",
        },
        {
          key: "class_ztwe",
          content: "僵木蠕事件",
        },
        {
          key: "class_iocm",
          content: "威胁情报管理",
        },
        {
          key: "class_wkpw",
          content: "弱口令事件",
        },
        {
          key: "class_inpa",
          content: "工业网络审计",
        },
        {
          key: "class_hsme",
          content: "主机安全管理",
        },
        {
          key: "class_scce",
          content: "配置核查管理",
        },
        {
          key: "class_dsme",
          content: "数据安全管理",
        },
        {
          key: "class_infe",
          content: "工业防火墙事件",
        },
        {
          key: "class_wppe",
          content: "网页防篡改事件",
        },
      ];
      var arr = data;
      var arrNew = [];
      var area = [];
      data.forEach((item) => {
        area.push(item.key);
      });
      arr.map((r) => {
        t.map((d) => {
          if (r.key === d.key) {
            arrNew.push({
              value: r.doc_count,
              name: d.content,
            });
          }
        });
      });
      return arrNew;
    },
    transDic(data, type) {
      var arr = data;
      var arrNew = [];
      if (type !== 1) {
        arrNew = arr.map((item) => {
          return {
            value: item.doc_count,
            name: item.key,
          };
        });
      } else {
        arr.map((r) => {
          this.TYPE_ARR.map((d) => {
            if (r.key === d.value) {
              arrNew.push({
                value: r.doc_count,
                name: d.label,
              });
            }
          });
        });
      }
      return arrNew;
    },
      transDicTwo(data) {
      var arr = data
      var arrNew = []
      arrNew = arr.map((item) => {
        return {
          value: item.count,
          name: item.name
        }
      })
      return arrNew
    },
    getType() {
      this.queryParms.aggs.field.terms.field = this.type;
    },
    async getData() {
      // 根据type值进行不同的参数区分
      switch (this.type) {
        // 事件等级
        case "severity":
          switch (this.name) {
            case "weakPassword":
              // 弱口令
              await getWeakPasswordData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets;
                this.datacopy = this.transTypeDic(
                  data.aggregations.field.buckets
                );
                this.queryParms.query.bool.must = [];
              });
              break;
            case "Jiangwoodcreep":
              // 僵木蠕
              await getbaseJiangTableData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets;
                this.datacopy = this.transTypeDic(
                  data.aggregations.field.buckets
                );
                this.queryParms.query.bool.must = [];
              });
              break;
                //漏洞
              case "vulnerablity":
              await scanningEcharts(this.querys).then(({ data }) => {
                this.hasData = data;
                this.datacopy = this.transTypeDicTwo(data);
              });
              break;
            case "abnormal":
              // 异常行为
              await getAbnormalBehaviorEventRetrievalData(this.queryParms).then(
                ({ data }) => {
                  this.hasData = data.aggregations.field.buckets;
                  this.datacopy = this.transTypeDic(
                    data.aggregations.field.buckets
                  );
                  this.queryParms.query.bool.must = [];
                }
              );
              break;
            case "statisticalSnalysis":
              // 入侵诱捕--事件等级分布
              await getElasticDate(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets;
                this.datacopy = this.transTypeDic(
                  data.aggregations.field.buckets
                );
                this.queryParms.query.bool.must = [];
              });
              break;
            case "design":
              // 工业审计
              await getIndustrialNetworkAuditData(this.queryParms).then(
                ({ data }) => {
                  this.hasData = data.aggregations.field.buckets;
                  this.datacopy = this.transTypeDic(
                    data.aggregations.field.buckets
                  );
                  this.queryParms.query.bool.must = [];
                }
              );
              break;
            default:
              console.log("这里是项目类型", this.name);
              break;
          }
          break;
        // 处置状态
        case "procedure":
          switch (this.name) {
            case "Jiangwoodcreep":
              // 僵木蠕
              await getbaseJiangTableData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets;
                this.datacopy = this.transDic(data.aggregations.field.buckets);
                this.queryParms.query.bool.must = [];
              });
              break;
            case "weakPassword":
              // 弱口令
              await getWeakPasswordData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets;
                this.datacopy = this.transDic(data.aggregations.field.buckets);
                this.queryParms.query.bool.must = [];
              });
              break;
                case 'vulnerablity':
                  //漏洞
              await scanningeventStatusEcharts(this.querys).then(({ data }) => {
                this.hasData = data
                this.datacopy = this.transDicTwo(data)
              })
              break
            case "host":
              await getHostSecurityData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets;
                this.datacopy = this.transDic(data.aggregations.field.buckets);
                this.queryParms.query.bool.must = [];
              });
              break;

            case "design":
              await industrialNetworkAuditeventLevelEcharts(
                this.queryParms
              ).then(({ data }) => {
                this.hasData = data;
                this.datacopy = this.transTypeDic(data);
              });
              break;
            case "event":
              await getManagementThreatEventsData(this.queryParms).then(
                ({ data }) => {
                  this.hasData = data.aggregations.field.buckets;
                  this.datacopy = this.transDic(
                    data.aggregations.field.buckets
                  );
                  this.queryParms.query.bool.must = [];
                }
              );
              break;

            default:
              console.log("这里是项目类型", this.name);
              break;
          }
          break;
        // 事件类型
        case "event_format":
          switch (this.name) {
            case "host":
              await getHostSecurityData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets;
                this.datacopy = this.transDic(data.aggregations.field.buckets);
                this.queryParms.query.bool.must = [];
              });
              break;
            case "dataSafe":
              await policyNameEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data;
                this.datacopy = this.transDic(data);
              });
              break;
            case "design":
              await getIndustrialNetworkAuditData(this.queryParms).then(
                ({ data }) => {
                  this.hasData = data.aggregations.field.buckets;
                  this.datacopy = this.transDic(
                    data.aggregations.field.buckets,
                    1
                  );
                  this.queryParms.query.bool.must = [];
                }
              );
              break;
           
            case "event":
              await getManagementThreatEventsData(this.queryParms).then(
                ({ data }) => {
                  this.hasData = data.aggregations.field.buckets;
                  this.datacopy = this.transType(
                    data.aggregations.field.buckets
                  );
                  this.queryParms.query.bool.must = [];
                }
              );
              break;
            default:
              console.log("这里是项目类型", this.name);
              break;
          }
          break;
        // 威胁分类
        case 'top':
          switch (this.name) {
             case "vulnerablity":
              await scanninghostEcharts(this.querys).then(({ data }) => {
                this.hasData = data;
                this.datacopy = this.transDicTwo(data);
              });
              break;
            case 2:
              await recipientEcharts(this.queryParms).then(({ data }) => {
                this.hasData = data;
                this.datacopy = this.transDic(data);
              });
              break;
            default:
              console.log("这里是项目类型", this.name);
              break;
          }
          break;
      
      default:
          console.log("这里是项目类型", this.type);
          break;
      }
      this.drawPolicitalStatus();
    },
    drawPolicitalStatus() {
      if (this.hasData.length) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.canvas1);
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: "item",
          },
          color: [
            "#1890FF",
            "#B592E4",
            "#F0B144",
            "#FF8745",
            "#F73030",
            "#43A682 ",
            "#ca8622",
          ],
          legend: {
            type: "scroll",
            orient: "vertical",
            right: 10,
            top: 120,
            bottom: 20,
            formatter: function (value) {
              const val =
                value.length > 10
                  ? value.substr(0, 6) +
                    "..." +
                    value.substr(value.length - 3, value.length - 1)
                  : value;
              return val;
            },
          },
          series: [
            {
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                normal: {
                  show: true,
                  fontSize: 14,
                  formatter(v) {
                    const text = v.name;
                    const val =
                      text.length > 10
                        ? text.substr(0, 6) +
                          "..." +
                          text.substr(text.length - 3, text.length - 1)
                        : text;
                    return val;
                  },
                },
              },
              type: "pie",
              data: this.datacopy,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
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
<style lang="scss" scoped></style>
