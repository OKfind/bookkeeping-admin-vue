let isShowingModal = false

const BASE_URL = import.meta.env.VITE_APP_MP_API || '/api'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: Record<string, any>
  header?: Record<string, string>
  timeout?: number
}

function doRequest(options: RequestOptions): Promise<UniApp.RequestSuccessCallbackResult> {
  const token = uni.getStorageSync('token') || ''
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: (options.method || 'GET') as UniApp.RequestOptions['method'],
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        Authorization: token,
        ...options.header,
      },
      timeout: options.timeout || 30000,
      success: (res) => resolve(res),
      fail: (err) => reject(err),
    })
  })
}

function handleLoginError() {
  if (isShowingModal) return
  isShowingModal = true
  uni.clearStorageSync()

  uni.showModal({
    title: '提示',
    content: '登录过期，请重新登录',
    complete: () => (isShowingModal = false),
    success: (res) => {
      if (res.confirm) uni.reLaunch({ url: '/pages/login/index' })
    },
  })
}

function checkCodeFn(data: ResponseData<any>) {
  const code = [0, 200, 1000]

  if (data.code === 401) {
    if (isShowingModal) return data
    isShowingModal = true
    uni.showModal({
      title: '提示',
      content: '当前未登录或登录超时, 请重新登录',
      complete: () => {
        isShowingModal = false
      },
      success: (res) => {
        if (res.confirm) {
          uni.clearStorageSync()
          uni.reLaunch({ url: '/pages/login/index' })
        }
      },
    })
  } else if (!code.includes(Number(data.code))) {
    uni.showToast({ title: data.message || data.msg, icon: 'none' })
  } else {
    data.code = 200
  }
  return { ...data, code: data.code }
}

async function checkStatus(res: UniApp.RequestSuccessCallbackResult): Promise<ResponseData<any>> {
  const resData = res.data as ResponseData<any>
  if (res.statusCode === 200 || res.statusCode === 304) {
    return resData
  }

  if (res.statusCode === 401 || (resData && resData.code === 401)) {
    if (!uni.getStorageSync('token')) {
      handleLoginError()
      return resData
    }
  }

  return {
    code: -404,
    data: res.statusCode,
    msg: `接口返回数据错误, 错误代码: ${res.statusCode}`,
  }
}

/**
 * $api 封装（基于 uni.request）
 *
 * 用法：
 * $api.get('/user/info', { id: 1 })
 * $api.post('/user/login', { username, password })
 * $api.put('/user/update', { name: 'xxx' })
 * $api.delete('/user/delete', { id: 1 })
 */
export const $api: ApiType = {
  post(url: string, data: StringObj = {}, header: StringObj = {}, checkCode = true) {
    return this.RESTful(url, 'post', data, header, checkCode)
  },
  get(url: string, data: StringObj = {}, header: StringObj = {}, checkCode = true) {
    return this.RESTful(url, 'get', data, header, checkCode)
  },
  put(url: string, data: StringObj = {}, header: StringObj = {}, checkCode = true) {
    return this.RESTful(url, 'put', data, header, checkCode)
  },
  patch(url: string, data: StringObj = {}, header: StringObj = {}, checkCode = true) {
    return this.RESTful(url, 'patch', data, header, checkCode)
  },
  delete(url: string, data: StringObj = {}, header: StringObj = {}, checkCode = true) {
    return this.RESTful(url, 'delete', data, header, checkCode)
  },

  async downFile(url, method = 'get', data) {
    const token = uni.getStorageSync('token') || ''
    const res = await doRequest({
      url,
      method: method.toUpperCase() as any,
      data,
      header: { Authorization: token },
      timeout: url.includes('NoTimeout') ? 9999999 : 30000,
    })
    return res
  },

  async RESTful(url, method = 'get', data, header, checkCode) {
    const res = await doRequest({ url, method: method.toUpperCase() as any, data, header })
    const result = await checkStatus(res)
    if (checkCode) {
      return checkCodeFn(result)
    }
    return { ...result, code: result.code }
  },

  async $RESTful(url, method = 'get', data, header) {
    const res = await doRequest({ url, method: method.toUpperCase() as any, data, header })
    return checkStatus(res)
  },
}
