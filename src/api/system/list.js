/** ****************************************************************************
 * 作者：Asuna
 ******************************************************************************/
import request from '@/utils/request'

// 异常事件检索
export function abnormalList(query) {
  return request({
    url: '/m/abnormal/list',
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
export function dataList(query) {
  return request({
    url: '/m/date/list',
    method: 'get',
    params: query
  })
}
// 事件列表
export function eventlList(query) {
  return request({
    url: '/m/event/list',
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
// 主机安全检索
export function hostList(query) {
  return request({
    url: '/m/host/list',
    method: 'get',
    params: query
  })
}
// 工业网络审计检索
export function industryList(query) {
  return request({
    url: '/m/industry/list',
    method: 'get',
    params: query
  })
}
// 漏洞事件检索
export function leakList(query) {
  return request({
    url: '/m/leak/list',
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
    url: '/m/weak/list',
    method: 'get',
    params: query
  })
}
// 僵木蠕事件检索
export function zombieList(query) {
  return request({
    url: '/m/zombie/list',
    method: 'get',
    params: query
  })
}

