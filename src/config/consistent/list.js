//事件等级
export const LEVEL_OPTIONS = [
  {
    label: "极低",
    value: '1',
  },
  {
    label: "低危",
    value: '2',
  },
  {
    label: "中危",
    value: '3',
  },
  {
    label: "高危",
    value: '4',
  },
  {
    label: "致命",
    value: '5',
  },
]
//处置状态
export const DISPOSAL_STATUS_OPTIONS =  [
  {
    label: "未处置",
    value: 1,
  },
  {
    label: "处置中",
    value: 2,
  },
  {
    label: "已处置",
    value: 3,
  },
  {
    label: "已完成",
    value: 4,
  },
  {
    label: "待处置",
    value: 5,
  },
]
//区域
export const AREA_OPTIONS = [
  {
    label: "三亚海投轨交",
    value: 1,
  },
  {
    label: "深中通道预制厂",
    value: 2,
  },
  {
    label: "山西三通燃气厂",
    value: 3,
  },
  {
    label: "北京城乡水厂",
    value: 4,
  },
  {
    label: "天津管片厂",
    value: 5,
  },
]
//僵木蠕 威胁分类
export const THREAT_FLAG_OPTIONS = [
  {
    label: "僵尸网络",
    value: "Botnet",
  },
  {
    label: "网络木马",
    value: "Trojan",
  },
  {
    label: "恶意软件",
    value: "Malware",
  },
  {
    label: "恶意链接",
    value: "URL_malware",
  },
]
// 杀伤链阶段
export const KILL_OPTIONS= [
  {
    label: "侦察跟踪",
    value: 1,
  },
  {
    label: "武器构建",
    value: 2,
  },
  {
    label: "载荷投递",
    value: 3,
  },
  {
    label: "漏洞利用",
    value: 4,
  },
  {
    label: "安装植入",
    value: 5,
  },
  {
    label: "命令控制",
    value: 6,
  },
  {
    label: "目标达成",
    value: 7,
  },
]
//配置核查 状态
export const STATUS_OPTIONS= [
  {
    label: "合规",
    value: 1,
  },
  {
    label: "不合规",
    value: 2,
  },
  {
    label: "手动",
    value: 3,
  },
  {
    label: "失败",
    value: 4,
  },
]
//数据安全 
export const ACTION_TYPEoptions =[{
  'label': '记录',
  'value': 4
}, {
  'label': '阻断',
  'value': 5
}, {
  'label': '审批',
  'value': 5
}]