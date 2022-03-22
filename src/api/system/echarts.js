import request from '@/utils/request'

// 查询策略统计事件分析
export function hostSecurityDetail() {
  return request({
    url: '/dm/dataSecurityManagement/policyName/grp',
    method: 'get'
  })
}
