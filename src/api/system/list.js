/** ****************************************************************************
 * 作者：Asuna
 ******************************************************************************/
import request from '@/utils/request'

// 事件检索
export function eventList(query) {
  return request({
    url: '/dm/event/list',
    method: 'get',
    params: query
  })
}
// 异常事件检索
export function abnormalList(query) {
  return request({
    url: '/dm/abnormal/queryDmAbnormalList',
    method: 'get',
    params: query
  })
}
// 资产列表
export function assetList(query) {
  return request({
    url: '/m/asset/list',
    method: 'get',
    params: query
  })
}
// 数据安全事件检索
export function dataSecurityManagementList(query) {
  return request({
    url: '/dm/dataSecurityManagement/list',
    method: 'get',
    params: query
  })
}
// 蜜罐事件检索
export function honeypotList(query) {
  return request({
    url: '/m/honeypot/list',
    method: 'get',
    params: query
  })
}
//
// 主机安全检索
export function hostList(query) {
  return request({
    url: '/dm/hostSecurity/queryDmHostSecurityList',
    method: 'get',
    params: query
  })
}
// 工业网络审计检索
export function industryList(query) {
  return request({
    url: '/dm/industrialNetworkAudit/list',
    method: 'get',
    params: query
  })
}
// 漏洞事件检索
export function leakList(query) {
  return request({
    url: '/dm/scanning/list',
    method: 'get',
    params: query
  })
}
// 通报管理
export function notificationList(query) {
  return request({
    url: '/m/notification/list',
    method: 'get',
    params: query
  })
}

// 弱口令事件检索
export function weakList(query) {
  return request({
    url: '/dm/dmWeakPassword/queryDmWeakPasswordList',
    method: 'get',
    params: query
  })
}
// 僵木蠕事件检索
export function zombieList(query) {
  return request({
    url: '/dm/dmStiffWoodCreep/queryDmStiffWoodCreepList',
    method: 'get',
    params: query
  })
}
// 入侵诱捕检索
export function trapList(query) {
  return request({
    url: '/dm/trap/list',
    method: 'get',
    params: query
  })
}
// 威胁情报检索
export function ThreatIntelligenceList(query) {
  return request({
    url: '/dm/dmThreatIntelligence/queryDmThreatIntelligenceList',
    method: 'get',
    params: query
  })
}
// 配置核查检索
export function configurationVerificationList(query) {
  return request({
    url: '/dm/configurationVerification/list',
    method: 'get',
    params: query
  })
}

