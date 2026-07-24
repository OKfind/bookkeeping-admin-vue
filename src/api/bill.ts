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
  bill_img: string;
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
