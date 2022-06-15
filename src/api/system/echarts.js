import request from '@/utils/request'
//获取微步token
export function getToken(query) {
  return request({
    url: '/iotGetToken/getToken',
    method: 'get',
    params: query
  })
}
//es趋势分析接口
export function eventEsData(query) {
  return request({
    url: '/event/eventMapping/getTestEventIds',
    method: 'post',
    params: query
  })
}

//主机安全es趋势分析接口--展示30天数据
export function eventEsHostData(query) {
  return request({
    url: '/event/eventMappingTO/getTestEventIds',
    method: 'post',
    params: query
  })
}
/** ****************************************************************************
 * 事件管理
 ******************************************************************************/
// 查询事件趋势分析
export function eventEcharts(query) {
  return request({
    url: '/dm/event/eventLevel/grp/a',
    method: 'get',
    params: query
  })
}
// 查询事件名称词云图分析
export function eventNameEcharts(query) {
  return request({
    url: '/dm/event/eventName/grp',
    method: 'get',
    params: query
  })
}
// 查询事件状态处置图
export function eventStatusEcharts(query) {
  return request({
    url: '/dm/event/eventStatus/grp',
    method: 'get',
    params: query
  })
}
// 查询事件类型分布
export function eventTypeEcharts(query) {
  return request({
    url: '/dm/event/eventType/grp',
    method: 'get',
    params: query
  })
}

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
export function EventTrendAnalysis(query) {
  return request({
    url: '/dm/hostSecurity/eventLevel/grp/a',
    method: 'get',
    params: query
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
// 查询事件等级分布
export function dataSecurityManagementEcharts(query) {
  return request({
    url: '/dm/dataSecurityManagement/eventLevel/grp',
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
export function EventTypeDistribution(query) {
  return request({
    url: '/dm/hostSecurity/eventType/grp',
    method: 'get',
    params: query
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
export function EventStatusDispositionDiagram(query) {
  return request({
    url: '/dm/hostSecurity/eventStatus/grp',
    method: 'get',
    params: query
  })
}
// 安全管理：入侵诱捕：资产防护数量
export function AssetsNumber(query) {
  return request({
    url: '/dm/trap/selectSandboxAttackSource',
    method: 'get',
    params: query
  })
}
// 安全管理：入侵诱捕： 威胁人员数量
export function attackNumber(query) {
  return request({
    url: '/dm/trap/selectAttackSource',
    method: 'get',
    params: query
  })
}
// 安全管理：入侵诱捕： 入侵事件/探测事件
export function InvandProbe(query) {
  return request({
    url: '/dm/trap/selectInvandProbe',
    method: 'get',
    params: query
  })
}

// 安全管理：入侵诱捕：事件统计分析:受攻击的资产TOP5
export function TopAssetsUnderAttack(query) {
  return request({
    url: '/dm/trap/selectAttackAssets',
    method: 'get',
    params: query
  })
}

// 安全管理：入侵诱捕：事件统计分析:探测事件/入侵事件趋势
export function UnderAttack(query) {
  return request({
    url: '/dm/trap/eventAttackType/selectType/a',
    method: 'get',
    params: query
  })
}

// 安全管理：入侵诱捕：事件统计分析:受攻击沙箱TOP5
export function sandboxesAttacked(query) {
  return request({
    url: '/dm/trap/selectIsolationSandbox',
    method: 'get',
    params: query
  })
}

// 安全管理：入侵诱捕：事件统计分析:事件等级分布
export function EventLevelDistribution(query) {
  return request({
    url: '/dm/trap/selectEventLevel',
    method: 'get',
    params: query
  })
}

// 安全管理：异常行为管理：事件统计分析 :事件趋势分析
export function abnormalAnalysis(query) {
  return request({
    url: '/dm/abnormal/eventLevel/selectEventLevels/a',
    method: 'get',
    params: query
  })
}
// 安全管理：异常行为管理：事件统计分析 :事件等级分布
export function abnormalEventLevelDistribution(query) {
  return request({
    url: '/dm/abnormal/selectThreatClassification',
    method: 'get',
    params: query
  })
}

// 安全管理：异常行为管理：事件统计分析 :杀伤链阶段流量统计
export function KillChain(query) {
  return request({
    url: '/event/trendChartKillingChain/getTestEventIds',
    method: 'post',
    params: query
  })
}

// 安全管理：入侵诱捕：探测事件/入侵事件趋势
export function eventEsDataInvasion(query) {
  return request({
    url: '/event/trendChartPROBE/getTestEventIds',
    method: 'post',
    params: query
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
// 查询趋势分析
export function selectEventLevelGradeEcharts(query) {
  return request({
    url: '/dm/dmWeakPassword/eventLevelAnalysis/selectEventLevelGrade/a',
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
// 查询事件等级分布
export function industrialNetworkAuditeventLevelEcharts(query) {
  return request({
    url: '/dm/industrialNetworkAudit/eventLevelGrp',
    method: 'get',
    params: query
  })
}
// 查询事件趋势分析
export function industrialNetworkAuditEcharts(query) {
  return request({
    url: '/dm/industrialNetworkAudit/eventLevel/grp/a',
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
/** ****************************************************************************
 * 漏洞管理
 ******************************************************************************/

// 查询事件等级分布
export function scanningEcharts(query) {
  return request({
    url: '/dm/scanning/eventLevel/grp',
    method: 'get',
    params: query
  })
}
// 查询事件趋势分析
export function scanningeventLevelEcharts(query) {
  return request({
    url: '/dm/scanning/eventLevel/grp/',
    method: 'get',
    params: query
  })
}

// 查询事件处置状态
export function scanningeventStatusEcharts(query) {
  return request({
    url: '/dm/scanning/eventStatus/grp',
    method: 'get',
    params: query
  })
}
// 查询主机趋势TOP5
export function scanninghostEcharts(query) {
  return request({
    url: '/dm/scanning/host/top5',
    method: 'get',
    params: query
  })
}

