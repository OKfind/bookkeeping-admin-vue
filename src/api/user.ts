export interface RequestLoginParams {
  username: string
  password: string
}

/**
 * 用户登录
 */
export function ApiPostUserLogin(data: RequestLoginParams) {
  return $api.post<string>('/user/login', data)
}

/**
 * 用户注册
 */
export function ApiPostUserRegister(data: RequestLoginParams) {
  return $api.post('/user/register', data)
}

export interface ResUserInfo {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  userPic: string
  openid: string
  deleted: number
  createTime: string
  updateTime: string
}

/**
 * 获取用户信息
 */
export function ApiGetUserInfo() {
  return $api.get<ResUserInfo>('/user')
}
