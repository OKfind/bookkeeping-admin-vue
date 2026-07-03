export interface ResUserInfo {
  userId: string
  username: string
  avatar: string
  phone: string
  email: string
  createTime: string
}

/**
 * 获取用户信息
 */
export function ApiGetUserInfo() {
  return $api.get<ResUserInfo>('/user/info')
}

export interface ReqUpdateUserInfo {
  username?: string
  avatar?: string
  phone?: string
  email?: string
}

/**
 * 更新用户信息
 * @param params
 */
export function ApiUpdateUserInfo(params: ReqUpdateUserInfo) {
  return $api.put('/user/info', params)
}

export interface ReqUserLoginParams {
	username: string;
	password: string;
}
export function ApiUserLogin(params: ReqUserLoginParams){
  return $api.post('/user/login', params)
}