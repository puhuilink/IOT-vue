/******************************************************************************
 * 作者：kerwincui
 * 时间：2021-06-08
 * 邮箱：164770707@qq.com
 * 源码地址：https://gitee.com/kerwincui/wumei-smart
 * author: kerwincui
 * create: 2021-06-08
 * email：164770707@qq.com
 * source:https://github.com/kerwincui/wumei-smart
 ******************************************************************************/
import request from '@/utils/request'

// 查询设备列表
export function listDevice(query) {
  return request({
    url: '/iot/device/list',
    method: 'get',
    params: query
  })
}
// 查询设备列表---用户和部门
export function UsernameAndDepartmentOptions(query) {
  return request({
    url: '/iot/device/getUsernames',
    method: 'get',
    params: query
  })
}


// 查询告警事件列表
export function listAlarmEvent(query) {
  return request({
    url: '/iot/alert/list',
    method: 'get',
    params: query
  })
}
// //设备管理列表接口--分页查询
// export function listDevice(query) {
//   return request({
//     url: '/iot/device/list',
//     method: 'get',
//     params: query
//   })
// }

// 查询设备详细
export function getDevice(deviceId) {
  return request({
    url: '/system/device/' + deviceId,
    method: 'get'
  })
}

// 新增设备
export function addDevice(data) {
  return request({
    url: '/system/device',
    method: 'post',
    data: data
  })
}

// 修改设备
export function updateDevice(data) {
  return request({
    url: '/iot/device/edit',
    method: 'put',
    data: data
  })
}

// 配置设备 ---保存
export function handleSetDevice(data) {
  return request({
    url: '/iot/configuration/toConfigure',
    method: 'post',
    data: data
  })
}
// 删除设备
export function delDevice(deviceId) {
  return request({
    url: '/system/device/' + deviceId,
    method: 'delete'
  })
}

// 导出设备
export function exportDevice(query) {
  return request({
    url: '/system/device/export',
    method: 'get',
    params: query
  })
}

// 设备安全统计与分析---已授权设备
export function AssetsNumberList(query) {
  return request({
    url: 'iot/statisticsAndAnalysis/getauthorizationType',
    method: 'get',
    params: query
  })
}
// 设备安全统计与分析---未授权设备
export function InvandList(query) {
  return request({
    url: 'iot/statisticsAndAnalysis/getauthorizationTypeNo',
    method: 'get',
    params: query
  })
}
// 设备安全统计与分析---在线设备
export function ProbeList(query) {
  return request({
    url: 'iot/statisticsAndAnalysis/getStatus',
    method: 'get',
    params: query
  })
}
// 设备安全统计与分析---异常设备
export function attackNumberList(query) {
  return request({
    url: 'iot/statisticsAndAnalysis/getStatusNo',
    method: 'get',
    params: query
  })
}
// 设备安全统计与分析--- 中国地图
export function mapDataList(query) {
  return request({
    url: 'iot/statisticsAndAnalysis/selectLongitudeAndLatitude',
    method: 'get',
    params: query
  })
}