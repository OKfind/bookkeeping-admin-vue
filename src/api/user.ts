export interface RequestLoginParams {
  username: string;
  password: string;
}

export interface LoginData {
  openid: string;
  token: string;
}

/**
 * 用户登录
 */
export function ApiPostUserLogin(data: RequestLoginParams) {
  return $api.post<LoginData>("/user/login", data);
}

/**
 * 用户注册
 */
export function ApiPostUserRegister(data: RequestLoginParams) {
  return $api.post("/user/register", data);
}

export interface ResUserInfo {
  id: number;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  userPic: string;
  openid: string;
  billCount: number;
  accountingDates: number;
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

/**
 * 微信一键登录
 * @param code
 * @returns
 */
export function ApiPostWxLogin(code: string) {
  return $api.post<LoginData>("/wx/login", { code });
}

export interface ReqUpdateUserInfo {
  id: number;
  username?: string;
  nickname?: string;
  email?: string;
  phone?: string;
  userPic?: string;
}
/**
 * 编辑用户信息
 * @param data
 * @returns
 */
export function ApiPutUserInfo(data: ReqUpdateUserInfo) {
  return $api.put("/user", data);
}
