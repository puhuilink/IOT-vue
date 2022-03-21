import request from '@/utils/request'

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
