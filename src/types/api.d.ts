/**
 * 通用类型定义
 */

/** 通用对象类型 */
declare type StringObj = Record<string, any>

/** 通用函数类型 */
declare type AnyFn = (...args: any[]) => any

/** API 响应格式 */
interface ResponseData<T = any> {
  code: number
  data: T
  msg: string
}

/** Api 封装对象类型 */
interface ApiType {
  get<T = any>(url: string, params?: StringObj, header?: StringObj, checkCode?: boolean): Promise<ResponseData<T>>
  post<T = any>(url: string, data?: StringObj, header?: StringObj, checkCode?: boolean): Promise<ResponseData<T>>
  put<T = any>(url: string, data?: StringObj, header?: StringObj, checkCode?: boolean): Promise<ResponseData<T>>
  patch<T = any>(url: string, data?: StringObj, header?: StringObj, checkCode?: boolean): Promise<ResponseData<T>>
  delete<T = any>(url: string, data?: StringObj, header?: StringObj, checkCode?: boolean): Promise<ResponseData<T>>
  downFile(url: string, method?: string, data?: StringObj): Promise<any>
  RESTful<T = any>(url: string, method?: string, data?: StringObj, header?: StringObj, checkCode?: boolean): Promise<ResponseData<T>>
  $RESTful<T = any>(url: string, method?: string, data?: StringObj, header?: StringObj): Promise<ResponseData<T>>
}
