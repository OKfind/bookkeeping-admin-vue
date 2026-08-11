export interface ReqAddBill {
  user_id: number;
  type: number;
  pay_type: number;
  amount: number;
  category_id: number;
  bill_img: string;
  remark: string;
  bill_time: string;
}
/**
 * 添加账单
 * @param data
 * @returns
 */
export function ApiPostAddBill(data: ReqAddBill) {
  return $api.post("/bill", data);
}

export interface ReqUserBill {
  month: string;
  userId: number;
  type?: number;
  payType?: number;
  categoryId?: number;
}
export interface ResUserBill {
  id: number;
  type: number;
  amount: number | null;
  remark: string;
  user_id: number;
  pay_type: number;
  bill_img: string | null;
  category_id: number;
  bill_time: string;
  create_time: string;
}
/**
 * 查询当前用户的流水状况
 * @param data
 * @returns
 */
export function ApiGetUserBill(data: ReqUserBill) {
  return $api.get<ResUserBill[]>("/bill", { ...data });
}

export interface ReqUpdateBill extends ReqAddBill {
  id: number;
}

/**
 * 编辑当前用户账单的流水状况
 */
export function ApiPutUserBill(data: ReqUpdateBill) {
  return $api.put("/bill", data);
}

/**
 * 删除用户账单
 * @param id
 * @returns
 */
export function ApiDeleteUserBill(id: number) {
  return $api.delete(`/bill/${id}`);
}

export interface ResCategoryList {
  id: number;
  name: string;
  type: number;
  icon?: any;
  sort: number;
}
/**
 * 获取账单类型列表
 * @returns
 */
export function ApiGetCategoryList() {
  return $api.get<ResCategoryList[]>("/category/list");
}

export interface ResDailyFlow {
  id: number;
  type: number;
  amount: number | null;
  remark: string;
  user_id: number;
  pay_type: number;
  bill_img: string | null;
  category_id: number;
  category_name: string;
  bill_time: string;
  create_time: string;
}
/**
 * 查询当前用户当天的流水状况
 * @param id
 * @returns
 */
export function ApiGetDailyFlow(id: number) {
  return $api.get<ResDailyFlow[]>(`/bill/dailyFlow/${id}`);
}
