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
