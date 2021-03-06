import request from '@/utils/request'

// 查询主机安全详情
export function hostSecurityDetail(query) {
  return request({
    url: '/dm/hostSecurity/queryDmHostSecurityById/' + query,
    method: 'get'
  })
}
// 查询僵木蠕详情
export function StiffWoodCreepDetail(query) {
  return request({
    url: '/dm/dmStiffWoodCreep/queryDmStiffWoodCreepById/' + query,
    method: 'get'
  })
}
// 查询威胁情报详情
export function ThreatIntelligenceDetail(query) {
  return request({
    url: '/dm/dmThreatIntelligence/queryDmThreatIntelligenceById/' + query,
    method: 'get'
  })
}
// 查询弱口令详情
export function WeakPasswordDetail(query) {
  return request({
    url: '/dm/dmWeakPassword/queryDmWeakPasswordById/' + query,
    method: 'get'
  })
}
// 查询入侵诱捕详情
export function trapDetail(query) {
  return request({
    url: '/dm/trap/' + query,
    method: 'get'
  })
}
// 查询工业网络审计详情
export function industrialNetworkAuditDetail(query) {
  return request({
    url: '/dm/industrialNetworkAudit/' + query,
    method: 'get'
  })
}
// 查询异常行为详情
export function abnormalDetail(query) {
  return request({
    url: '/dm/abnormal/queryDmAbnormalById/' + query,
    method: 'get'
  })
}
// 查询数据安全详情
export function dataSecurityManagementDetail(query) {
  return request({
    url: '/dm/dataSecurityManagement/' + query,
    method: 'get'
  })
}
// 查询漏洞扫描详情
export function scanningDetail(query) {
  return request({
    url: '/dm/scanning/' + query,
    method: 'get'
  })
}
// 查询配置核查详情
export function configurationVerificationDetail(query) {
  return request({
    url: '/dm/configurationVerification/' + query,
    method: 'get'
  })
}

// 查询资产详情
export function assetDetail(query) {
  return request({
    url: '/dm/asset/' + query,
    method: 'get'
  })
}

// 设备管理--设备列表--详情
export function deviceListDetail(query) {
  return request({
    url: '/iot/device/queryGetInfo?deviceId=' + query,
    method: 'get'
  })
}

// 设备管理--设备列表--详情---任务列表
export function TaskListDetail(query) {
  return request({
    url: '/iot/manage/selectTaskManageBydeviceId?dmDeviceId=' + query,
    method: 'get'
  })
}
// 设备管理--设备列表--详情---接口属性
export function interfacePropertiesDetail(query) {
  return request({
    url: '/iot/attribute/selectInterfaceByDeviceId?dmDeviceId=' + query,
    method: 'get'
  })
}


// 设备管理--设备列表--配置详情
export function handleSetDetail(query) {
  return request({
    url: '/iot/configuration/getEquipmentconfigurationId?iotDeviceId=' + query,
    method: 'get'
  })
}

// 设备管理--告警事件--详情
export function alarmEventListDetail(query) {
  return request({
    url: '/iot/alert/queryGetInfo?alertId=' + query,
    method: 'get'
  })
}