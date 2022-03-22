import request from '@/utils/request'

// 查询策略统计事件分析
export function hostSecurityDetail() {
  return request({
    url: '/dm/dataSecurityManagement/policyName/grp',
    method: 'get'
  })
}

// 安全管理：主机安全管理：事件统计分析:事件趋势分析
export function EventTrendAnalysis() {
  return request({
    url: '/dm/hostSecurity/eventLevel/grp/',
    method: 'get'
  })
}

// 安全管理：主机安全管理：事件统计分析:事件类型分布
export function EventTypeDistribution() {
  return request({
    url: '/dm/hostSecurity/eventType/grp',
    method: 'get'
  })
}

// 安全管理：主机安全管理：事件统计分析:事件名称词云图
export function EventNameWordCloudMap(query) {
  return request({
    url: '/dm/hostSecurity/eventName/grp',
    method: 'get'
  })
}

// 安全管理：主机安全管理：事件统计分析:事件处置状态图
export function EventStatusDispositionDiagram() {
  return request({
    url: '/dm/hostSecurity/eventStatus/grp',
    method: 'get'
  })
}

// 安全管理：入侵诱捕：事件统计分析:受攻击的资产TOP5
export function TopAssetsUnderAttack() {
  return request({
    url: '/dm/trap/selectAttackAssets',
    method: 'get'
  })
}

// 安全管理：入侵诱捕：事件统计分析:探测事件/入侵事件趋势
export function UnderAttack() {
  return request({
    url: '/dm/trap/eventAttackType/selectType/{type}',
    method: 'get'
  })
}

// 安全管理：入侵诱捕：事件统计分析:受攻击沙箱TOP5
export function sandboxesAttacked() {
  return request({
    url: '/dm/trap/selectIsolationSandbox',
    method: 'get'
  })
}

// 安全管理：入侵诱捕：事件统计分析:事件等级分布
export function EventLevelDistribution() {
  return request({
    url: '/dm/trap/selectEventLevel',
    method: 'get'
  })
}

// 安全管理：异常行为管理：事件统计分析 :事件等级分布
export function abnormalEventLevelDistribution() {
  return request({
    url: '/dm/abnormal/selectThreatClassification',
    method: 'get'
  })
}

// 安全管理：异常行为管理：事件统计分析 :杀伤链阶段流量统计
export function KillChain() {
  return request({
    url: '/dm/abnormal/selectKillingChainStage',
    method: 'get'
  })
}



