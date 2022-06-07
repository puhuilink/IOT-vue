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
    // url: '/m/asset/list',
    url: '/dm/asset/list',
    method: 'get',
    params: query
  })
}
// APP检测
export function appTesting(query) {
  return request({
    // url: '/m/asset/list',
    url: '/bangBangFile/queryBangBangFileList',
    method: 'get',
    params: query
  })
}
// APP检测---删除
export function appFileDelete(query) {
  return request({
    url: '/bangBangFile/removeBangBangFile/'+query,
    method: 'delete',
  })
}

// 资产列表 excel导入功能
export function uploadExcel(url, query) {
  return request({
    url: url,
    method: 'post',
    data: query
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
// 漏洞列表 zip导入功能
export function uploadZip(url, query,params) {
  return request({
    url: url,
    method: 'post',
    data: query,
    params:params
  })
}
// APP检测 pdf导入功能
export function uploadPdf(url, query,params) {
  return request({
    url: url,
    method: 'post',
    data: query,
    params:params
  })
}
// APP检测 pdf预览功能
export function downloadAction(id) {
  return request({
    url:'/bangBangFile/download',
    method: 'get',
    params:{
      path:id
    },
    responseType: "arraybuffer", //这行必写
    headers: { "Content-Type": "multipart/form-data" } //这行必写
  })
}
// 通报管理---列表
export function notificationList(query) {
  return request({
    url: '/dm/notificationManagement/list',
    method: 'get',
    params: query
  })
}
// 通报管理---上报
export function notificationExport(params) {
  return request({
    url: '/dm/notificationManagement/reportJson',
    // url:url,
    method: 'get',
    params: params
  })
}

// 漏洞管理---上报
export function vulnerabilityExport(params) {
  return request({
    url: '/dm/scanning/reportJson',
    // url:url,
    method: 'get',
    params: params
  })
}

// 通报管理--- 详情
export function notificationDetail(params) {
  return request({
    url: '/dm/notificationManagement/' + params,
    method: 'get',
  })
}

// 通报管理---编辑
export function notificationEdit(url,params) {
  return request({
    // url: '/dm/notificationManagement/edit',
    url: url,
    method: 'put',
    data:params,
    // params: params
  })
}
// 通报管理--- 删除
export function notificationDelete(params) {
  return request({
    url: '/dm/notificationManagement/' + params,
    method: 'delete',
  })
}
// 修改ES信息状态
export function stateChanges(params) {
  return request({
    url: '/dm/notificationManagement/updateState',
    method: 'get',
    params: params
  })
}
//漏洞管理状态变更
export function vulnerabilityStateChanges(params) {
  return request({
    url: '/dm/scanning/updateState',
    method: 'get',
    params: params
  })
}


//入库
export function putInStorage(params) {
  return request({
    url: '/dm/notificationManagement/reportingManagement',
    method: 'get',
    params: params
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

