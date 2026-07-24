export type DictItem = {
  value: number;
  label: string;
  icon?: string;
};

export const paymentMethods: DictItem[] = [
  { value: 1, label: "现金" },
  { value: 2, label: "微信支付" },
  { value: 3, label: "支付宝" },
  { value: 4, label: "信用卡" },
  { value: 5, label: "储蓄卡" },
  { value: 6, label: "其它" },
];

export const billCategories: DictItem[] = [
  { value: 1, label: "购物", icon: "🛒" },
  { value: 2, label: "交通", icon: "🛻" },
  { value: 3, label: "娱乐", icon: "💐" },
  { value: 4, label: "餐饮", icon: "☕" },
  { value: 5, label: "住房", icon: "🏠️" },
  { value: 6, label: "就医", icon: "🏥" },
  { value: 7, label: "人情", icon: "👫" },
];
