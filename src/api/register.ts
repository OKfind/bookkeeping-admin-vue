export interface ReqRegisterParams {
  username: string
  phone: string
  password: string
  confirmPassword: string
}

export interface ResRegister {
  token: string
}

/**
 * 用户注册
 * @param params
 */
export function ApiRegister(params: ReqRegisterParams) {
  return $api.post<ResRegister>('/user/register', params)
}
