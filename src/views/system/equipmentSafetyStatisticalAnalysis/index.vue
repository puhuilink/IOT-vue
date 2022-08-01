<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="5">
        <div class="AssetsBox">
          <div class="Assets">已授权设备</div>
          <div class="AssetsNumber">{{ AssetsNumber }}</div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="intrusionBox">
          <div class="Assets">未授权设备</div>
          <div class="AssetsNumber">{{ Invand }}</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="explore">
          <div class="Assets">在线的设备</div>
          <div class="AssetsNumber">{{ Probe }}</div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="threat">
          <div class="Assets">异常的设备</div>
          <div class="AssetsNumber">{{ attackNumber }}</div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="AssetsType">
          <div class="Assets">设备类型</div>
          <div class="AssetsNumberLeft">汇聚网关</div>
          <div class="AssetsNumberRight">接入网关</div>
          <div class="AssetsNumberLeft">{{ GatherTheGateway }}</div>
          <div class="AssetsNumberRight">{{ Accessgateway }}</div>
        </div>
      </el-col>
    </el-row>
    <div class="boxContent">
      <div class="left">
        <tip :date="this.date">组网情况</tip>
        <div class="container" ref="container"></div>
        <!-- <pointsChart /> -->
      </div>
      <div class="right">
        <eventType
          :tipname="'告警类型分布'"
          :type="'report'"
          :name="'equipment'"
        />
        <eventTrend :name="'equipment'" :tipname="'事件趋势分析'" />
      </div>
    </div>
  </div>
</template>
<script>
pointsChart;

import {
  AssetsNumberList,
  InvandList,
  ProbeList,
  attackNumberList,
  mapDataList,
  GatewayNumberList,
} from "@/api/system/device";
// import pointsChart from "@/components/Echarts/pointsChart";
import pointsChart from "@/components/Echarts/map";
import eventType from "@/components/Echarts/eventType";
import eventTrend from "@/components/Echarts/eventTrend";
import tip from "@/components/EchartsTip";
export default {
  components: { pointsChart, eventType, eventTrend ,tip},
  data() {
    return {
      AssetsNumber: "",
      Invand: "",
      Probe: "",
      attackNumber: "",
      // deviceType: "汇聚网关",
      GatherTheGateway: "",
      Accessgateway: "",
    };
  },
  created() {
    // this.getCategoryList()
    this.getAssetsNumberList();
    this.getInvandList();
    this.getProbeList();
    this.getAttackNumberList();
    this.getGatewayList();
    this.getMapData();
  },
  mounted() {
    this.$nextTick((_) => {
      this.initMapInfo();
    });
  },
  methods: {
    getAssetsNumberList() {
      AssetsNumberList(this.queryParams).then((response) => {
        this.AssetsNumber = response.data[0].count;
      });
    },
    getInvandList() {
      InvandList(this.queryParams).then((response) => {
        this.Invand = response.data[0].count;
      });
    },
    getProbeList() {
      ProbeList(this.queryParams).then((response) => {
        this.Probe = response.data[0].count;
      });
    },
    getAttackNumberList() {
      attackNumberList(this.queryParams).then((response) => {
        this.attackNumber = response.data[0].count;
      });
    },
    getGatewayList() {
      GatewayNumberList(this.queryParams).then((response) => {
        this.GatherTheGateway = response.data[0].count;
        this.Accessgateway = response.data[1].count;
      });
    },
    getMapData() {
      mapDataList().then((response) => {
        console.log("response", response);
      });
    },
    initMapInfo() {
      // 地图数据
      var chinaGeoCoordMap = {
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891],
      };
      // 飞线点数据
      var chinaDatas = [
        [
          {
            name: "黑龙江",
            value: 0,
          },
        ],
        [
          {
            name: "内蒙古",
            value: 0,
          },
        ],
        [
          {
            name: "吉林",
            value: 0,
          },
        ],
        [
          {
            name: "辽宁",
            value: 0,
          },
        ],
        [
          {
            name: "河北",
            value: 0,
          },
        ],
        [
          {
            name: "天津",
            value: 0,
          },
        ],
        [
          {
            name: "山西",
            value: 0,
          },
        ],
        [
          {
            name: "陕西",
            value: 0,
          },
        ],
        [
          {
            name: "甘肃",
            value: 0,
          },
        ],
        [
          {
            name: "宁夏",
            value: 0,
          },
        ],
        [
          {
            name: "青海",
            value: 0,
          },
        ],
        [
          {
            name: "新疆",
            value: 0,
          },
        ],
        [
          {
            name: "西藏",
            value: 0,
          },
        ],
        [
          {
            name: "四川",
            value: 0,
          },
        ],
        [
          {
            name: "山东",
            value: 0,
          },
        ],
        [
          {
            name: "河南",
            value: 0,
          },
        ],
        [
          {
            name: "江苏",
            value: 0,
          },
        ],
        [
          {
            name: "安徽",
            value: 0,
          },
        ],
        [
          {
            name: "湖北",
            value: 0,
          },
        ],
        [
          {
            name: "浙江",
            value: 0,
          },
        ],
        [
          {
            name: "福建",
            value: 0,
          },
        ],
        [
          {
            name: "江西",
            value: 0,
          },
        ],
        [
          {
            name: "湖南",
            value: 0,
          },
        ],
        [
          {
            name: "贵州",
            value: 0,
          },
        ],
        [
          {
            name: "广西",
            value: 0,
          },
        ],
        [
          {
            name: "海南",
            value: 0,
          },
        ],
        [
          {
            name: "上海",
            value: 1,
          },
        ],
      ];

      let formdata = "重庆"; // 中心点

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          // console.log(data[i]);
          var dataItem = data[i];
          var fromCoord = chinaGeoCoordMap[dataItem[0].name];
          var toCoord = [108.384366, 30.439702]; //中心点地理坐标
          if (fromCoord && toCoord) {
            res.push([
              {
                // 飞线从哪里出发
                coord: toCoord,
              },
              {
                // 飞线去往哪里
                coord: fromCoord,
                value: dataItem[0].value,
              },
            ]);
          }
        }
        return res;
      };
      var series = [];
      [[formdata, chinaDatas]].forEach(function (item, i) {
        console.log(item);
        series.push(
          {
            type: "lines",
            coordinateSystem: "geo",
            zlevel: 2,
            effect: {
              show: false,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 5, //图标大小
              color: "#fcdd6e", // 图标颜色
            },
            lineStyle: {
              normal: {
                show: false,
                width: 0, //尾迹线条宽度
                opacity: 0, //尾迹线条透明度
                curveness: 0, //尾迹线条曲直度
                // color: "#fcdd6e", // 飞线颜色
              },
              color: "#fcdd6e",
            },
            data: convertData(item[1]),
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 8, //波纹圆环最大限制，值越大波纹越大
              color: "#fcdd6e",
            },
            label: {
              normal: {
                show: true,
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                formatter: function (params) {
                  //圆环显示文字
                  return params.data.name;
                },
                fontSize: 13,
              },
              emphasis: {
                show: true,
              },
            },
            symbol: "circle",
            symbolSize: function (val) {
              return 5; //圆环大小
            },
            itemStyle: {
              normal: {
                show: false,
                color: "#fce182",
              },
            },
            data: item[1].map(function (dataItem) {
              return {
                //在这里定义你所要展示的数据
                // name: dataItem[0].name,
                // value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
                name: dataItem[0].name,
                value: chinaGeoCoordMap[dataItem[0].name].concat([
                  dataItem[0].value,
                ]),
              };
            }),
          },
          //中心点
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 15,
            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4,
              color: "#38ff85",
            },
            label: {
              normal: {
                show: false,
                position: "right",
                //offset:[5, 0],
                color: "#38ff85",
                formatter: "{b}",
                textStyle: {
                  color: "#38ff85",
                },
              },
              emphasis: {
                show: false,
                color: "#38ff85",
              },
            },
            symbol: "circle",
            symbolSize: 5,
            itemStyle: {
              color: "#38ff85",
            },
            data: [
              {
                name: item[0],
                value: chinaGeoCoordMap[item[0]].concat([10]),
              },
            ],
          }
        );
      });
      this.initMap(series);
    },

    initMap(series) {
      let myChart = this.$echarts.init(this.$refs.container);
      let option = {
        // bgColor: '#1a1e45',
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal", //图例的排列方向
          // textStyle: { color: '#1a1e45' },
          x: "left", //图例的位置
          y: "-20000000000000",
        },
        visualMap: {
          //颜色的设置  dataRange
          // textStyle: { color: '#1a1e45' },
          x: "left",
          y: "bottom",
          // splitList: [{ start: 0, end: 150000 }],
          show: false,
          // text:['高','低'],// 文本，默认为数值文本
          // color: ['#1a1e45'],
        },
        geo: {
          map: "china",
          zoom: 1.2,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: "#FFFFFF",
              },
            },
            emphasis: {
              show: false,
            },
          },
          roam: false, //是否允许缩放
          itemStyle: {
            normal: {
              color: "#1a1e45", //地图背景色
              borderColor: "#22ccfb", //省市边界线00fcff 516a89
              borderWidth: 1,
              textStyle: "#fff",
            },
            emphasis: {
              color: "#22ccfb", //悬浮背景
            },
          },
          data: [],
        },
        series: series,
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style scoped lang="scss">
.AssetsBox {
  background: linear-gradient(180deg, #4fa8e7 0%, #3570d4 100%);
  .Assets {
    // background-color: #5599ff;
    // background: linear-gradient(180deg, #4FA8E7 0%, #3570D4 100%);
    text-align: center;
    padding-top: 20px;
    font-size: 16px;
    // padding: 10px 80px 10px 80px;
    // border-bottom: 1px solid #fff;
    color: #fff;
    font-weight: bold;
  }
  .AssetsNumber {
    width: 100%;
    height: 60px;
    font-size: 28px;
    // background-color: #5599ff;
    //  background: linear-gradient(180deg, #4FA8E7 0%, #3570D4 100%);
    color: #fff;
    // font-weight: 800;
    text-align: center;
    line-height: 50px;
  }
}
.intrusionBox {
  background: linear-gradient(180deg, #ffb070 0%, #ff605b 100%);
  .Assets {
    // background-color: #5599ff;
    // background: linear-gradient(180deg, #4FA8E7 0%, #3570D4 100%);
    text-align: center;
    padding-top: 20px;
    font-size: 16px;
    // padding: 10px 80px 10px 80px;
    // border-bottom: 1px solid #fff;
    color: #fff;
    font-weight: bold;
  }
  .AssetsNumber {
    width: 100%;
    height: 60px;
    font-size: 28px;
    // background-color: #5599ff;
    //  background: linear-gradient(180deg, #4FA8E7 0%, #3570D4 100%);
    color: #fff;
    // font-weight: 800;
    text-align: center;
    line-height: 50px;
  }
}
.explore {
  background: linear-gradient(180deg, #3cd3aa 0%, #229b9f 100%);
  .Assets {
    // background-color: #5599ff;
    // background: linear-gradient(180deg, #4FA8E7 0%, #3570D4 100%);
    text-align: center;
    padding-top: 20px;
    font-size: 16px;
    // padding: 10px 80px 10px 80px;
    // border-bottom: 1px solid #fff;
    color: #fff;
    font-weight: bold;
  }
  .AssetsNumber {
    width: 100%;
    height: 60px;
    font-size: 28px;
    // background-color: #5599ff;
    //  background: linear-gradient(180deg, #4FA8E7 0%, #3570D4 100%);
    color: #fff;
    // font-weight: 800;
    text-align: center;
    line-height: 50px;
  }
}
.threat {
  background: linear-gradient(180deg, #b56af9 0%, #6333b8 100%);
  .Assets {
    // background-color: #5599ff;
    // background: linear-gradient(180deg, #4FA8E7 0%, #3570D4 100%);
    text-align: center;
    padding-top: 20px;
    font-size: 16px;
    // padding: 10px 80px 10px 80px;
    // border-bottom: 1px solid #fff;
    color: #fff;
    font-weight: bold;
  }
  .AssetsNumber {
    width: 100%;
    height: 60px;
    font-size: 28px;
    // background-color: #5599ff;
    //  background: linear-gradient(180deg, #4FA8E7 0%, #3570D4 100%);
    color: #fff;
    // font-weight: 800;
    text-align: center;
    line-height: 50px;
  }
}
.AssetsType {
 background: linear-gradient(180deg, #4fa8e7 0%, #3570d4 100%);
  .Assets {
    // background-color: #5599ff;
    // background: linear-gradient(180deg, #4FA8E7 0%, #3570D4 100%);
    text-align: center;
    padding-top: 20px;
    font-size: 16px;
    // padding: 10px 80px 10px 80px;
    // border-bottom: 1px solid #fff;
    color: #fff;
    font-weight: bold;
  }
  .AssetsNumberLeft {
    width: 50%;
    height: 31px;
    background: #3570d4 ;
    color: #ffff77;
    font-weight: 800;
    text-align: center;
    line-height: 31px;
    float: left;
  }
  .AssetsNumberRight {
    width: 50%;
    height: 31px;
   background: #3570d4 ;
    color: #ffff77;
    font-weight: 800;
    text-align: center;
    line-height: 31px;
    float: right;
  }
}
// .AssetsBox {
//   .Assets {
//     background-color: #5599ff;
//     padding: 10px 80px 10px 10px;
//     border-bottom: 1px solid #fff;
//     color: #fff;
//     font-weight: bold;
//   }
//   .AssetsNumber {
//     width: 100%;
//     height: 100px;
//     background-color: #5599ff;
//     color: #ffff77;
//     font-weight: 800;
//     text-align: center;
//     line-height: 100px;
//   }
//   .AssetsNumberLeft{
//     width:50%;
//     height: 50px;
//     background-color: #5599ff;
//     color: #ffff77;
//     font-weight: 800;
//     text-align: center;
//     line-height: 50px;
//     float:left;
//   }
//   .AssetsNumberRight{
//     width: 50%;
//     height: 50px;
//     background-color: #5599ff;
//     color: #ffff77;
//     font-weight: 800;
//     text-align: center;
//     line-height: 50px;
//     float: right;
//   }
// }
.boxContent {
  height: 900px;
  .left {
    float: left;
    width: 50%;
    height: 900px;
    padding-left:30px;
    // background-color: #ffff77;
   
    .container {
      width: 100%;
      height: 800px;
       border:1px solid #000;
    }
  }
  .right {
    float: right;
    width: 50%;
    height: 900px;
    // background-color:aqua;
  }
}
</style>
