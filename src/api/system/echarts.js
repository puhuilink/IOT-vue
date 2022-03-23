import request from '@/utils/request'
/** ****************************************************************************
 * 数据安全管理
 ******************************************************************************/
// 查询策略统计事件分析
export function policyNameEcharts(query) {
  return request({
    url: '/dm/dataSecurityManagement/policyName/grp',
    method: 'get',
    params: query
  })
}

// 安全管理：主机安全管理：事件统计分析:事件趋势分析
export function EventTrendAnalysis() {
  return request({
    url: '/dm/hostSecurity/eventLevel/grp/',
    method: 'get'
  })
}

// 查询事件等级分析
export function eventLevelEcharts(query) {
  return request({
    url: '/dm/dataSecurityManagement/eventLevel/grp',
    method: 'get',
    params: query
  })
}
// 查询邮件统计分析
export function recipientEcharts(query) {
  return request({
    url: '/dm/dataSecurityManagement/recipient/grp',
    method: 'get',
    params: query
  })
}
// 查询源Ip统计事件TOP10分析
export function sourceIpEcharts(query) {
  return request({
    url: '/dm/dataSecurityManagement/sourceIp/top10',
    method: 'get',
    params: query
  })
}

// 安全管理：主机安全管理：事件统计分析:事件类型分布
export function EventTypeDistribution() {
  return request({
    url: '/dm/hostSecurity/eventType/grp',
    method: 'get'
  })
}
// 查询目的IP统计TOP10分析
export function targetIpEcharts(query) {
  return request({
    url: '/dm/dataSecurityManagement/targetIp/top10',
    method: 'get',
    params: query
  })
}
/** ****************************************************************************
 * 僵木蠕
 ******************************************************************************/
// 查询事件状态分析
export function CreepdisposalStatuEcharts(query) {
  return request({
    url: '/dm/dmStiffWoodCreep/disposalStatus/grp',
    method: 'get',
    params: query
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

// 查询事件趋势分析
export function CreepeventLevelEcharts(query) {
  return request({
    url: '/dm/dmStiffWoodCreep/eventLevel/grp',
    method: 'get',
    params: query
  })
}
// 查询事件等级
export function CreepeventLevelsEcharts(query) {
  return request({
    url: '/dm/dmStiffWoodCreep/eventLevels',
    method: 'get',
    params: query
  })
}
// 查询事件类型分布
export function CreepeventNameEcharts(query) {
  return request({
    url: '/dm/dmStiffWoodCreep/eventName/grp',
    method: 'get',
    params: query
  })
}
// 查询事件名称词云图
export function CreepthreatEcharts(query) {
  return request({
    url: '/dm/dmStiffWoodCreep/threat/grp',
    method: 'get',
    params: query
  })
}
/** ****************************************************************************
 * 弱口令
 ******************************************************************************/
// 查询攻击者TOP5
export function selectAgreementEcharts(query) {
  return request({
    url: '/dm/dmWeakPassword/selectAgreement',
    method: 'get',
    params: query
  })
}
// 查询事件状态处置图
export function selectDisposalStatusEcharts(query) {
  return request({
    url: '/dm/dmWeakPassword/selectDisposalStatus',
    method: 'get',
    params: query
  })
}
// 查询事件等级分布
export function selectEventLevelEcharts(query) {
  return request({
    url: '/dm/dmWeakPassword/selectEventLevel',
    method: 'get',
    params: query
  })
}
// 查询事件等级
export function selectEventLevelGradeEcharts(query) {
  return request({
    url: '/dm/dmWeakPassword/selectEventLevelGrade',
    method: 'get',
    params: query
  })
}
/** ****************************************************************************
 * 工业网络审计
 ******************************************************************************/

// 查询事件类型分布
export function eventCategoryEcharts(query) {
  return request({
    url: '/dm/industrialNetworkAudit/eventCategory/grp',
    method: 'get',
    params: query
  })
}
// 查询源IP统计TOP5
export function industrialNetworkAuditsourceIpEcharts(query) {
  return request({
    url: '/dm/industrialNetworkAudit/sourceIp/top5',
    method: 'get',
    params: query
  })
}
// 查询目的IPtop5
export function industrialNetworkAudittargetIpEcharts(query) {
  return request({
    url: '/dm/industrialNetworkAudit/targetIp/top5',
    method: 'get',
    params: query
  })
}
