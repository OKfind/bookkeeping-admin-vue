import type { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { uniAdapter } from 'fant-axios-adapter'

// 使用 fant-axios-adapter 适配 uni-app 网络请求
axios.defaults.adapter = uniAdapter as AxiosAdapter

// #ifdef H5
axios.defaults.baseURL = import.meta.env.VITE_APP_API
// #endif
// #ifndef H5
axios.defaults.baseURL = import.meta.env.VITE_APP_MP_API
// #endif

const baseConfig = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
}

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const token = uni.getStorageSync('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => Promise.resolve(error.response || error),
)

// 响应拦截器 - 统一处理网络错误
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = {} as AxiosResponse
    response.config = error.config
    response.data = null
    response.headers = error.config?.headers
    response.status = error.code
    response.statusText = error.msg
    response.request = error.request
    return Promise.resolve(response)
  },
)

// 处理 HTTP 状态码和业务 code
async function checkStatus(response: AxiosResponse): Promise<ResponseData<any>> {
  const resData = response.data

  if (response.status === 200 || response.status === 304) {
    return resData
  }

  if (response.status === 401 || (resData && resData.code === 401)) {
    uni.removeStorageSync('token')
    uni.showModal({
      title: '提示',
      content: '登录过期，请重新登录',
      success: (res) => {
        if (res.confirm) {
          uni.reLaunch({ url: '/pages/login/index' })
        }
      },
    })
    return resData
  }

  return {
    code: -404,
    data: response.statusText || response.toString(),
    msg: `接口返回数据错误, 错误代码: ${response.status}`,
  }
}

// 检查业务 code
function checkCodeFn(data: ResponseData<any>) {
  const successCodes = [0, 200, 1000]

  if (data.code === 401) {
    uni.removeStorageSync('token')
    uni.showModal({
      title: '提示',
      content: '当前未登录或登录超时，请重新登录',
      success: (res) => {
        if (res.confirm) {
          uni.reLaunch({ url: '/pages/login/index' })
        }
      },
    })
  } else if (!successCodes.includes(Number(data.code))) {
    uni.showToast({
      title: data.msg || '请求失败',
      icon: 'none',
    })
  } else {
    data.code = 200
  }

  return {
    ...data,
    code: data.code,
  }
}

/**
 * axios Api 封装
 * ```
 * $api.get<T>(url, params, header, checkCode)
 * $api.post<T>(url, data, header, checkCode)
 * $api.put<T>(url, data, header, checkCode)
 * $api.patch<T>(url, data, header, checkCode)
 * $api.delete<T>(url, data, header, checkCode)
 * ```
 */
export const $api: ApiType = {
  post(url, data = {}, header = {}, checkCode = true) {
    return this.RESTful(url, 'post', data, header, checkCode)
  },
  get(url, data = {}, header = {}, checkCode = true) {
    return this.RESTful(url, 'get', data, header, checkCode)
  },
  put(url, data = {}, header = {}, checkCode = true) {
    return this.RESTful(url, 'put', data, header, checkCode)
  },
  patch(url, data = {}, header = {}, checkCode = true) {
    return this.RESTful(url, 'patch', data, header, checkCode)
  },
  delete(url, data = {}, header = {}, checkCode = true) {
    return this.RESTful(url, 'delete', data, header, checkCode)
  },

  async downFile(url, method = 'get', data) {
    const config: AxiosRequestConfig = {
      ...baseConfig,
      responseType: 'arraybuffer',
      method,
      url,
    }
    if (method === 'get') {
      config.params = data
    } else {
      config.data = data
    }
    const response = await axios(config)
    return response
  },

  async RESTful(url, method = 'get', data, header, checkCode) {
    const xhr = await this.$RESTful(url, method, data, header)
    if (checkCode) {
      return checkCodeFn(xhr)
    }
    return { ...xhr, code: xhr.code }
  },

  async $RESTful(url, method = 'get', data, header) {
    const token = uni.getStorageSync('token') || ''
    const config: AxiosRequestConfig = {
      ...baseConfig,
      headers: {
        ...baseConfig.headers,
        ...header,
        Authorization: token,
      },
      method,
      url,
    }
    if (method === 'get') {
      config.params = data
    } else {
      config.data = data
    }
    const response = await axios(config)
    return checkStatus(response)
  },
}
