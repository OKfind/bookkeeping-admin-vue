/** 键为字符串，值为 any 的对象 */
declare type StringObj<T = any> = Record<string, T>

/** 接口返回统一格式 */
declare interface ResponseData<T> {
  data: T
  code: number
  msg: string
}

type Methods = 'get' | 'post' | 'delete' | 'put' | '' | 'patch'

/** 封装的 API 方法类型 */
declare interface ApiType {
  get: <T>(url: string, data?: StringObj, header?: StringObj, checkCode?: boolean) => Promise<ResponseData<T>>
  post: <T>(url: string, data?: StringObj, header?: StringObj, checkCode?: boolean) => Promise<ResponseData<T>>
  put: <T>(url: string, data?: StringObj, header?: StringObj, checkCode?: boolean) => Promise<ResponseData<T>>
  patch: <T>(url: string, data?: StringObj, header?: StringObj, checkCode?: boolean) => Promise<ResponseData<T>>
  delete: <T>(url: string, data?: StringObj, header?: StringObj, checkCode?: boolean) => Promise<ResponseData<T>>
  downFile: (url: string, method: Methods, data?: StringObj) => Promise<any>
  RESTful: <T>(url: string, method: Methods, data?: StringObj, header?: StringObj, checkCode?: boolean) => Promise<ResponseData<T>>
  $RESTful: <T>(url: string, method: Methods, data?: StringObj, header?: StringObj) => Promise<ResponseData<T>>
}
