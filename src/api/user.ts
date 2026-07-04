export interface ResUserInfo {
  id: number;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  userPic?: string;
  openid?: string;
  deleted: number;
  createTime: string;
  updateTime: string;
}

/**
 * 获取用户信息
 */
export function ApiGetUserInfo() {
  return $api.get<ResUserInfo>("/user");
}

export interface ReqUserLoginParams {
  username: string;
  password: string;
}
export function ApiUserLogin(params: ReqUserLoginParams) {
  return $api.post("/user/login", params);
}

/* 微信一键登录 */
export function ApiWxLogin(code: string) {
  return $api.post("/wx/login", { code });
}
