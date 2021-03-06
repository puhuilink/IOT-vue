import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'

axios.defaults.headers.post['Content-Type'] = 'application/json'

// 入侵诱捕
// const base = '/esApi/event_ivtp/_search'
const base = '/esApi/dm_event_ivtp/_search'

export const getElasticDate = params => {
  return axios.post(`${base}`, params)
}


// 主机安全
// const baseHostSecurity = '/esApi/event_hsme/_search'
const baseHostSecurity = '/esApi/dm_event_hsme/_search'

export const getHostSecurityData = params => {
  return axios.post(`${baseHostSecurity}`, params)
}

// 配置核查
// const baseConfiguration = '/esApi/event_scce/_search'
const baseConfiguration = '/esApi/dm_event_scce/_search'

export const getConfigurationData = params => {
  return axios.post(`${baseConfiguration}`, params)
}

// 工业网络审计
// const baseIndustrialNetworkAudit = '/esApi/event_inpa/_search'
const baseIndustrialNetworkAudit = '/esApi/dm_event_inpa/_search'

export const getIndustrialNetworkAuditData = params => {
  return axios.post(`${baseIndustrialNetworkAudit}`, params)
}

// 防火墙访问控制事件
// const baseFirewallAccessControlEvent = '/esApi/event_infe/_search'
const baseFirewallAccessControlEvent = '/esApi/dm_event_infe/_search'

export const getFirewallAccessControlEventData = params => {
  return axios.post(`${baseFirewallAccessControlEvent}`, params)
}

// 僵木蠕
// const baseJiangTable = '/esApi/event_ztwe/_search'
const baseJiangTable = '/esApi/dm_event_ztwe/_search'

export const getbaseJiangTableData = params => {
  return axios.post(`${baseJiangTable}`, params)
}

// 弱口令
// const baseWeakPassword = '/esApi/event_wkpw/_search'
const baseWeakPassword = '/esApi/dm_event_wkpw/_search'

export const getWeakPasswordData = params => {
  return axios.post(`${baseWeakPassword}`, params)
}


// 异常行为管理
// const baseAbnormalBehaviorEventRetrieval = '/esApi/event_abbm/_search'
const baseAbnormalBehaviorEventRetrieval = '/esApi/dm_event_abbm/_search'

export const getAbnormalBehaviorEventRetrievalData = params => {
  return axios.post(`${baseAbnormalBehaviorEventRetrieval}`, params)
}

// 威胁情报列表
// const baseThreatIntelligenceList = '/esApi/event_iocm/_search'
const baseThreatIntelligenceList = '/esApi/dm_event_iocm/_search'

export const getThreatIntelligenceListData = params => {
  return axios.post(`${baseThreatIntelligenceList}`, params)
}

// 事件管理---威胁事件检索
// const baseManagementThreatEvents = '/esApi/eventlog/_search'
const baseManagementThreatEvents = '/esApi/dm_eventlog/_search'

export const getManagementThreatEventsData = params => {
  return axios.post(`${baseManagementThreatEvents}`, params)
}


// 设备分析统计---告警类型分布
const baseEquipmentData = '/dev-api/iot/statisticsAndAnalysis/getAlertName'

export const equipmentData = params => {
  return axios.get(`${baseEquipmentData}`, params)
}
//代码审计事件---列表
const baseapplicationManagement = '/qianxin/codesafeapi/quickcheck'

export const getApplicationManagementData = (params, authorizationValue) => {
  return axios.post(`${baseapplicationManagement}`, params,
    {
      headers:
      {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authorizationValue
      }
    }
  )
}
//代码审计---任务统计信息及详情
const codeAuditDetailData = '/qianxin/codesafeapi/result/'

export const codeAuditDetail = (params, authorizationValue) => {
  return axios.get(`${codeAuditDetailData + params}`, {
    headers:
    {
      Authorization: authorizationValue
    }
  }
  )
}

//APP加固---获取token
const codeGetTokenData = '/app/api/login/getToken'

export const codeGetToken = () => {
  return axios.get(`${codeGetTokenData}`, {
    params:{ username: "zgjt" }

  }
  )
}

// const baseAppToken = '/app/api/login/getToken?username=zgjt'
// export const getAPPtoken = params => {
//   return axios.post(`${baseAppToken}`, params)
// }


// //代码审计事件---详情---列表---查询一个任务的全部缺陷（分页）
const baseapplicationManagementDetailTable = '/qianxin/codesafeapi/result/'

export const getApplicationManagementDetailTable = (params, query, authorizationValue) => {
  return axios.get(`${baseapplicationManagementDetailTable + params + '/bug'}`, {
    params: query,
    headers:
    {
      Authorization: authorizationValue
    }
  })
}
// //代码审计事件---缺陷详情
const baseapplicationManagementDefectDetail = '/qianxin/codesafeapi/result/'

export const getApplicationManagementDefectDetail = (taskId, bugId, authorizationValue) => {
  return axios.get(`${baseapplicationManagementDefectDetail + taskId + '/bug/' + bugId}`, {
    headers:
    {
      Authorization: authorizationValue
    }
  })
}


// axios.defaults.headers['Content-Type'] = 'Basic base64encode(wuzhigang +":"+Admin@12345！)'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// axios.defaults.headers['Authorization'] = 'authorizationValue'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // var  queryAuthorization = base64encode("admin111" + ":" + "123456");
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }

  // config.headers['Authorization'] =  'Basic base64encode("wuzhigang"+":"+"123456")' 

  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?'
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName]
      var part = encodeURIComponent(propName) + '='
      if (value !== null && typeof (value) !== 'undefined') {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            const params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            url += subPart + encodeURIComponent(value[key]) + '&'
          }
        } else {
          url += part + encodeURIComponent(value) + '&'
        }
      }
    }
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode['default']
  if (code === 401) {
    MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }
    ).then(() => {
      store.dispatch('LogOut').then(() => {
        location.href = '/index'
      })
    })
  } else if (code === 500) {
    Message({
      message: msg,
      type: 'error'
    })
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    Notification.error({
      title: msg
    })
    return Promise.reject('error')
  } else {
    return res.data
  }
},
  error => {
    console.log('err' + error)
    let { message } = error
    if (message === 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
