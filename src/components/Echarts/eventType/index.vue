<template>
  <div>
    <div v-if="name == 'report'">
      <el-col :span="22">
        <div ref="canvas1" style="height: 400px" />
      </el-col>
    </div>
    <div v-if="name == 'equipment'">
      <el-col :span="22">
        <tip>{{ tipname }}</tip>
        <div ref="canvas1" style="height: 400px" />
      </el-col>
    </div>
    <div v-else>
      <el-col :span="12">
        <tip>{{ tipname }}</tip>
        <div ref="canvas1" style="height: 400px" />
      </el-col>
    </div>
  </div>
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
      querys: {
        severity: "",
        beginGenerationTime: this.getdate(2)[0],
        endGenerationTime: this.getdate(2)[1]+ ' 23-59-59',
        location: "",
      },
      queryParms: {
        query: {
          bool: {
            must: [
              {
                range: {
                  occur_time: {
                    gte: this.getdate(2)[0],
                    lte: this.getdate(2)[1],
                  },
                },
              },
            ],
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
      queryTimeParms: {
        query: {
          bool: {
            must: [
              {
                range: {
                  occur_time: {
                    gte: this.getdate(2)[0],
                    lte: this.getdate(2)[1],
                  },
                },
              },
            ],
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
         c
            this.queryParms.query.bool.must.push({
              match: {
                location: val.location,
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
    Twodigits(num) {
      return num < 10 ? "0" + num : num;
    },
    getDay(num, str) {
      var today = new Date();
      var nowTime = today.getTime();
      var ms = 24 * 3600 * 1000 * num;
      today.setTime(parseInt(nowTime + ms));
      var oYear = today.getFullYear();
      var oMoth = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = "0" + oMoth;
      var oDay = today.getDate().toString();
      if (oDay.length <= 1) oDay = "0" + oDay;
      return oYear + str + oMoth + str + oDay;
    },
    getdate(type) {
      var myDate = new Date();
      var beforeseven = new Date();
      var thirty = new Date();
      myDate.setDate(myDate.getDate());
      beforeseven.setDate(beforeseven.getDate() - 6);
      thirty.setDate(thirty.getDate() - 1 - 29);
      if (type === 2) {
        return [
          beforeseven.getFullYear() +
            "-" +
            this.Twodigits(beforeseven.getMonth() + 1) +
            "-" +
            this.Twodigits(beforeseven.getDate()),
          myDate.getFullYear() +
            "-" +
            this.Twodigits(myDate.getMonth() + 1) +
            "-" +
            this.Twodigits(myDate.getDate()),
        ];
      } else if (type === 3) {
        // 最近30天
        return [
          thirty.getFullYear() +
            "-" +
            this.Twodigits(thirty.getMonth() + 1) +
            "-" +
            this.Twodigits(thirty.getDate()),
          myDate.getFullYear() +
            "-" +
            this.Twodigits(myDate.getMonth() + 1) +
            "-" +
            this.Twodigits(myDate.getDate()),
        ];
      } else if (type === 1) {
        // 昨天
        var yesterday = this.getDay(-1, "-");
        return [yesterday, yesterday];
      }
    },
    transTypeDicTwo(data) {
      var t = [
        {
          name: "1",
          content: "极低",
        },
        {
          name: "2",
          content: "低危",
        },
        {
          name: "3",
          content: "中危",
        },
        {
          name: "4",
          content: "高危",
        },
        {
          name: "5",
          content: "致命",
        },
      ];
      var arr = data;
      var arrNew = [];
      var area = [];
      data.forEach((item) => {
        area.push(item.name);
      });
      arr.map((r) => {
        t.map((d) => {
          if (r.name === d.name) {
            console.log(r, d);
            arrNew.push({
              value: r.count,
              name: d.content,
            });
          }
        });
      });
      return arrNew;
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
    transTypeHost(data) {
      var t = [
        {
          key: "wsec_syslog_hsme_ev_07",
          content: "程序告警事件",
        },
        {
          key: "wsec_syslog_hsme_ev_08",
          content: "外设告警事件",
        },
        {
          key: "wsec_syslog_hsme_ev_09",
          content: "主机防火墙事件",
        },
        {
          key: "wsec_syslog_hsme_ev_10",
          content: "访问控制事件",
        },
        {
          key: "wsec_syslog_hsme_ev_22",
          content: "主机非法外联",
        },
        {
          key: "wsec_syslog_hsme_ev_30",
          content: "恶意文件事件",
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
      var arr = data;
      var arrNew = [];
      arrNew = arr.map((item) => {
        return {
          value: item.count,
          name: item.name,
        };
      });
      return arrNew;
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
                this.queryParms.query.bool.must = [
                  {
                    range: {
                      occur_time: {
                        gte: this.getdate(2)[0],
                        lte: this.getdate(2)[1],
                      },
                    },
                  },
                ];
              });
              break;
            case "Jiangwoodcreep":
              // 僵木蠕
              await getbaseJiangTableData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets;
                this.datacopy = this.transTypeDic(
                  data.aggregations.field.buckets
                );
                this.queryParms.query.bool.must = [
                  {
                    range: {
                      occur_time: {
                        gte: this.getdate(2)[0],
                        lte: this.getdate(2)[1],
                      },
                    },
                  },
                ];
              });
              break;
            //漏洞
            case "vulnerablity":
              await scanningEcharts(this.querys).then(({ data }) => {
                this.hasData = data;
                this.datacopy = this.transTypeDicTwo(data);
                this.querys = {
                  severity: "",
                  location: "",
                };
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
                  this.queryParms.query.bool.must = [
                    {
                      range: {
                        occur_time: {
                          gte: this.getdate(2)[0],
                          lte: this.getdate(2)[1],
                        },
                      },
                    },
                  ];
                }
              );
              break;
            case "statisticalSnalysis":
              // 入侵诱捕--事件等级分布
              await getElasticDate(this.queryTimeParms).then(({ data }) => {
                // console.log
                this.hasData = data.aggregations.field.buckets;
                this.datacopy = this.transTypeDic(
                  data.aggregations.field.buckets
                );
                this.queryTimeParms.query.bool.must = [
                  {
                    range: {
                      occur_time: {
                        gte: this.getdate(2)[0],
                        lte: this.getdate(2)[1],
                      },
                    },
                  },
                ];
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
                  this.queryParms.query.bool.must = [
                    {
                      range: {
                        occur_time: {
                          gte: this.getdate(2)[0],
                          lte: this.getdate(2)[1],
                        },
                      },
                    },
                  ];
                }
              );
              break;
            case "dataSafe":
              // await policyNameEcharts(this.queryParms).then(({ data }) => {
              //   this.hasData = data;
              //   this.datacopy = this.transDic(data);
              // });
              await getAbnormalBehaviorEventRetrievalData(this.queryParms).then(
                ({ data }) => {
                  this.hasData = data.aggregations.field.buckets;
                  this.datacopy = this.transTypeDic(
                    data.aggregations.field.buckets
                  );
                  this.queryParms.query.bool.must = [
                    {
                      range: {
                        occur_time: {
                          gte: this.getdate(2)[0],
                          lte: this.getdate(2)[1],
                        },
                      },
                    },
                  ];
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
                this.queryParms.query.bool.must = [
                  {
                    range: {
                      occur_time: {
                        gte: this.getdate(2)[0],
                        lte: this.getdate(2)[1],
                      },
                    },
                  },
                ];
              });
              break;
            case "weakPassword":
              // 弱口令
              await getWeakPasswordData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets;
                this.datacopy = this.transDic(data.aggregations.field.buckets);
                this.queryParms.query.bool.must = [
                  {
                    range: {
                      occur_time: {
                        gte: this.getdate(2)[0],
                        lte: this.getdate(2)[1],
                      },
                    },
                  },
                ];
              });
              break;
            case "vulnerablity":
              //漏洞
              await scanningeventStatusEcharts(this.querys).then(({ data }) => {
                this.hasData = data;
                this.datacopy = this.transDicTwo(data);
                this.querys = {
                  severity: "",
                  location: "",
                };
              });
              break;
            case "host":
              await getHostSecurityData(this.queryParms).then(({ data }) => {
                this.hasData = data.aggregations.field.buckets;
                this.datacopy = this.transDic(data.aggregations.field.buckets);
                this.queryParms.query.bool.must = [
                  {
                    range: {
                      occur_time: {
                        gte: this.getdate(2)[0],
                        lte: this.getdate(2)[1],
                      },
                    },
                  },
                ];
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
                  this.queryParms.query.bool.must = [
                    {
                      range: {
                        occur_time: {
                          gte: this.getdate(2)[0],
                          lte: this.getdate(2)[1],
                        },
                      },
                    },
                  ];
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
                this.datacopy = this.transTypeHost(
                  data.aggregations.field.buckets
                );
                this.queryParms.query.bool.must = [
                  {
                    range: {
                      occur_time: {
                        gte: this.getdate(2)[0],
                        lte: this.getdate(2)[1],
                      },
                    },
                  },
                ];
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
                  this.queryParms.query.bool.must = [
                    {
                      range: {
                        occur_time: {
                          gte: this.getdate(2)[0],
                          lte: this.getdate(2)[1],
                        },
                      },
                    },
                  ];
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
                  this.queryParms.query.bool.must = [
                    {
                      range: {
                        occur_time: {
                          gte: this.getdate(2)[0],
                          lte: this.getdate(2)[1],
                        },
                      },
                    },
                  ];
                }
              );
              break;
            default:
              console.log("这里是项目类型", this.name);
              break;
          }
          break;
        // 事件管理---事件类型分布
        case "event_class":
          switch (this.name) {
            case "event":
              await getManagementThreatEventsData(this.queryParms).then(
                ({ data }) => {
                  this.hasData = data.aggregations.field.buckets;
                  this.datacopy = this.transType(
                    data.aggregations.field.buckets
                  );
                  this.queryParms.query.bool.must = [
                    {
                      range: {
                        occur_time: {
                          gte: this.getdate(2)[0],
                          lte: this.getdate(2)[1],
                        },
                      },
                    },
                  ];
                }
              );
              break;
            default:
              console.log("这里是项目类型", this.name);
              break;
          }
          break;
        // 威胁分类
        case "top":
          switch (this.name) {
            case "vulnerablity":
              await scanninghostEcharts(this.querys).then(({ data }) => {
                this.hasData = data;
                this.datacopy = this.transDicTwo(data);
                this.querys = {
                  severity: "",
                  location: "",
                };
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
        case "report":
          switch (this.name) {
            case "report":
              this.hasData = [
                { value: 1394, name: "僵木蠕事件" },
                { value: 651, name: "漏洞" },
                { value: 569, name: "配置核查" },
                { value: 102, name: "工业网络" },
                { value: 62, name: "诱捕防护" },
              ];
              this.datacopy = [
                { value: 1394, name: "僵木蠕事件" },
                { value: 651, name: "漏洞" },
                { value: 569, name: "配置核查" },
                { value: 102, name: "工业网络" },
                { value: 62, name: "诱捕防护" },
              ];
              break;
            case "equipment":
              this.hasData = [
                { value: 3948, name: "CPU使用率过高" },
                { value: 2514, name: "磁盘使用率过高" },
                { value: 1699, name: "内存使用率过高" },
                { value: 1023, name: "异常操作" },
                { value: 362, name: "震动幅度过高" },
              ];
              this.datacopy = [
                { value: 3948, name: "CPU使用率过高" },
                { value: 2514, name: "磁盘使用率过高" },
                { value: 1699, name: "内存使用率过高" },
                { value: 1023, name: "异常操作" },
                { value: 362, name: "震动幅度过高" },
              ];
              break;
            default:
              console.log("这里是项目类型", this.name);
              break;
          }
          break;
        // 资产管理---资产安全统计分析，目前都是假数据
        case "assetType":
          switch (this.name) {
            case "assetsOne":
              this.hasData = [
                { value: 3948, name: "主机" },
                { value: 2514, name: "服务器" },
                { value: 1699, name: "防火墙" },
                { value: 1023, name: "网闸" },
                { value: 362, name: "网关" },
              ];
              this.datacopy = [
                { value: 3948, name: "主机" },
                { value: 2514, name: "服务器" },
                { value: 1699, name: "防火墙" },
                { value: 1023, name: "网闸" },
                { value: 362, name: "网关" },
              ];
              break;
            case "assetsTwo":
              this.hasData = [
                { value: 3948, name: "Linux" },
                { value: 2514, name: "Window 7" },
                { value: 1699, name: "Window XP" },
                { value: 1023, name: "Unix" },
                { value: 362, name: "MAC OS" },
              ];
              this.datacopy = [
                { value: 3948, name: "Linux" },
                { value: 2514, name: "Window 7" },
                { value: 1699, name: "Window XP" },
                { value: 1023, name: "Unix" },
                { value: 362, name: "MAC OS" },
              ];
              break;
            case "assetsThree":
              this.hasData = [
                { value: 3948, name: "主机" },
                { value: 2514, name: "服务器" },
                { value: 1699, name: "防火墙" },
                { value: 1023, name: "网闸" },
                { value: 362, name: "网关" },
              ];
              this.datacopy = [
                { value: 3948, name: "主机" },
                { value: 2514, name: "服务器" },
                { value: 1699, name: "防火墙" },
                { value: 1023, name: "网闸" },
                { value: 362, name: "网关" },
              ];
              break;
            case "assetsFour":
              this.hasData = [
                { value: 3948, name: "S7" },
                { value: 2514, name: "MODBUS" },
                { value: 1699, name: "DNP3" },
                { value: 1023, name: "IEC104" },
                { value: 362, name: "MMS" },
              ];
              this.datacopy = [
                { value: 3948, name: "S7" },
                { value: 2514, name: "MODBUS" },
                { value: 1699, name: "DNP3" },
                { value: 1023, name: "IEC104" },
                { value: 362, name: "MMS" },
              ];
              break;
            default:
              console.log("这里是项目类型", this.name);
              break;
          }
          break;
        // 策略统计事件分析
        case "PolicyStatisticsEventAnalysis":
          this.hasData = [
            { value: 3948, name: "monitor_文件类型1" },
            { value: 2514, name: "MAIL_文件规则验证" },
            { value: 1699, name: "qwer" },
            { value: 1023, name: "monitor_内容规则或验证1" },
            { value: 362, name: "MAIL_地址审批响应" },
          ];
          this.datacopy = [
            { value: 3948, name: "monitor_文件类型1" },
            { value: 2514, name: "MAIL_文件规则验证" },
            { value: 1699, name: "qwer" },
            { value: 1023, name: "monitor_内容规则或验证1" },
            { value: 362, name: "MAIL_地址审批响应" },
          ];
          break;
        case "emailAnalysis":
          this.hasData = [
            { value: 3948, name: "txt" },
            { value: 2514, name: "eml" },
            { value: 1699, name: "docx" },
            { value: 1023, name: "doc" },
            { value: 362, name: "png" },
          ];
          this.datacopy = [
            { value: 3948, name: "txt" },
            { value: 2514, name: "eml" },
            { value: 1699, name: "docx" },
            { value: 1023, name: "doc" },
            { value: 362, name: "png" },
          ];
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
              avoidLabelOverlap: true,
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
        return setNotopt(myChart, "最近七天无数据");
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
