<template>
 <el-col :span="24">
  <tip :date="this.date">{{ tipname }}</tip>
		<div id="main" style="width: 100%;height:400px;"></div>
</el-col>
</template>
 
<script>
	import * as echarts from 'echarts';
  import { agetTestEventIds} from "@/api/system/echarts";
  import tip from "@/components/EchartsTip";
	export default {
     components: { tip },
  props: {
    date:{
       // 数据日期
      default: 7,
      type: Number,
    },
    tipname: {
      // tip内容
      default: "事件趋势分析",
      type: String,
    },
    query: {
      default: null,
      type: Object,
    }
  },
		data() {
			return {
    queryParms: {
        severity: "4",
        location: "",
      },
			}
		},
     watch: {
    query: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          if (val.location) {
            this.queryParms.location = val.location;
          } else {
            this.queryParms.location = "";
          }
          this.getData();
          this.getMain();
        }
      },
      deep: true,
    },
  },
   created() {
    this.getData();
  },
		mounted() {
			this.getMain();
		},
		methods: {
     async getData(){
         await agetTestEventIds(this.queryParms).then(({ data }) => {
            this.VALUE = data.data;
            this.DATE = data.date
          });
      },
			getMain() {
				let chartDom = document.getElementById('main');
				let myChart = echarts.init(chartDom);
				const CubeLeft = echarts.graphic.extendShape({
					shape: {
						x: 0,
						y: 0
					},
					buildPath: function(ctx, shape) {
						const xAxisPoint = shape.xAxisPoint
						const c0 = [shape.x, shape.y]
						const c1 = [shape.x - 9, shape.y - 9]
						const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9]
						const c3 = [xAxisPoint[0], xAxisPoint[1]]
						ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1])
							.closePath()
					}
				})
				const CubeRight = echarts.graphic.extendShape({
					shape: {
						x: 0,
						y: 0
					},
					buildPath: function(ctx, shape) {
						const xAxisPoint = shape.xAxisPoint
						const c1 = [shape.x, shape.y]
						const c2 = [xAxisPoint[0], xAxisPoint[1]]
						const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
						const c4 = [shape.x + 18, shape.y - 9]
						ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1])
							.closePath()
					}
				})
				const CubeTop = echarts.graphic.extendShape({
					shape: {
						x: 0,
						y: 0
					},
					buildPath: function(ctx, shape) {
						const c1 = [shape.x, shape.y]
						const c2 = [shape.x + 18, shape.y - 9]
						const c3 = [shape.x + 9, shape.y - 18]
						const c4 = [shape.x - 9, shape.y - 9]
						ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1])
							.closePath()
					}
				})
				echarts.graphic.registerShape('CubeLeft', CubeLeft)
				echarts.graphic.registerShape('CubeRight', CubeRight)
				echarts.graphic.registerShape('CubeTop', CubeTop)
				let option = {

					grid: {
						left: 20,
						right: 40,
						bottom: '19%',
						top: 107,
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: this.DATE,
						axisLine: {
							show: true,
							lineStyle: {
								color: '#010d3a'
							}
						},
						offset: 20,
						axisTick: {
							show: false,
							length: 9,
							alignWithLabel: true,
							lineStyle: {
								color: '#7DFFFD'
							}
						},
						axisLabel: {
							fontSize: 10
						}
					},
					yAxis: {
						type: 'value',
						axisLine: {
							show: true,
							lineStyle: {
								color: '#010d3a'
							}
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							fontSize: 16
						},
						boundaryGap: ['20%', '20%']
					},
					series: [ {
						type: 'custom',
						renderItem: (params, api) => {
							const location = api.coord([api.value(0), api.value(1)])
							return {
								type: 'group',
								children: [{
									type: 'CubeLeft',
									shape: {
										api,
										xValue: api.value(0),
										yValue: api.value(1),
										x: location[0],
										y: location[1],
										xAxisPoint: api.coord([api.value(0), 0])
									},
									style: {
										fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
												offset: 0,
												color: '#3B80E2'
											},
											{
												offset: 1,
												color: '#49BEE5'
											}
										])
									}
								}, {
									type: 'CubeRight',
									shape: {
										api,
										xValue: api.value(0),
										yValue: api.value(1),
										x: location[0],
										y: location[1],
										xAxisPoint: api.coord([api.value(0), 0])
									},
									style: {
										fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
												offset: 0,
												color: '#3B80E2'
											},
											{
												offset: 1,
												color: '#49BEE5'
											}
										])
									}
								}, {
									type: 'CubeTop',
									shape: {
										api,
										xValue: api.value(0),
										yValue: api.value(1),
										x: location[0],
										y: location[1],
										xAxisPoint: api.coord([api.value(0), 0])
									},
									style: {
										fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
												offset: 0,
												color: '#3B80E2'
											},
											{
												offset: 1,
												color: '#49BEE5'
											}
										])
									}
								}]
							}
						},
						data: VALUE
					}, {
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top',
								formatter: (e) => {
									switch (e.name) {
										case '10kV线路':
											return VALUE[0]
										case '公用配变':
											return VALUE[1]
										case '35kV主变':
											return VALUE[2]
										case '水':
 
									}
								},
								fontSize: 16,
								color: '#010d3a',
								offset: [4, -25]
							}
						},
						itemStyle: {
							color: 'transparent'
						},
						data: VALUE
					}]
				}
				myChart.setOption(option);
			}
		}
	}
</script>
 
<style scoped>
</style>