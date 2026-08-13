<template>
  <view class="h-100vh flex flex-col overflow-hidden bg-[#f4f6ff] text-[#30384e]">
    <view class="flex-none bg-white px-[28rpx] pb-[22rpx] pt-[calc(var(--status-bar-height)+18rpx)]">
      <view class="flex items-center justify-between">
        <view class="h-[56rpx] w-[56rpx] flex items-center justify-center text-[48rpx] text-[#4e5875] font-300 leading-none" @click="goBack">
          ‹
        </view>
        <view class="text-[30rpx] font-800">{{ categoryName }}</view>
        <view class="h-[56rpx] w-[56rpx]" />
      </view>
      <view class="mt-[18rpx] flex items-center justify-between">
        <view class="text-[21rpx] text-[#9aa2b8]">{{ selectedMonthText }} {{ isIncome ? "收入" : "支出" }}</view>
        <view :class="['text-[21rpx] font-700', isIncome ? 'text-[#20ae99]' : 'text-[#ff3f7f]']">
          {{ billCount }} 笔
        </view>
      </view>
    </view>

    <scroll-view
      class="h-0 min-h-0 flex-1"
      scroll-y
      :show-scrollbar="false"
      refresher-enabled
      refresher-default-style="black"
      :refresher-triggered="isRefreshing"
      @refresherrefresh="refreshDetail"
    >
      <view class="px-[20rpx] pb-[60rpx] pt-[18rpx]">
        <view class="bg-white px-[14rpx] pb-[18rpx] pt-[18rpx]">
          <view class="flex items-center justify-between px-[10rpx]">
            <view class="text-[24rpx] text-[#7c859e] font-700">{{ isIncome ? "当月收入" : "当月支出" }}</view>
            <view :class="['text-[34rpx] font-800', isIncome ? 'text-[#20ae99]' : 'text-[#ff3f7f]']">
              {{ totalText }}
            </view>
          </view>
          <view v-if="isLoading" class="h-[250rpx] flex items-center justify-center text-[24rpx] text-[#a0a7b8]">
            加载中...
          </view>
          <view v-else class="mt-[8rpx] h-[280rpx] w-full">
            <UChart
              type="line"
              canvas-id="categoryDetailTrendChart"
              :canvas2d="true"
              :animation="false"
              :ontouch="true"
              :chart-data="trendChartData"
              :opts="trendChartOpts"
            />
          </view>
        </view>

        <view class="mt-[16rpx] grid grid-cols-3 overflow-hidden rounded-[8rpx] bg-[#4264f4] text-white">
          <view v-for="metric in metrics" :key="metric.label" class="h-[112rpx] min-w-0 flex flex-col items-center justify-center px-[8rpx] py-[16rpx] text-center">
            <view class="w-full truncate text-[22rpx] text-white/70">{{ metric.label }}</view>
            <view :class="['mt-[6rpx] w-full truncate text-[29rpx] font-800', metric.color]">{{ metric.value }}</view>
          </view>
        </view>

        <view class="mt-[16rpx] bg-white px-[18rpx] pb-[12rpx] pt-[22rpx]">
          <view class="flex items-center justify-between">
            <view class="text-[27rpx] font-800">按金额排序</view>
            <view class="text-[20rpx] text-[#9aa2b8]">{{ selectedMonthText }}</view>
          </view>

          <view v-if="!isLoading && !sortedBills.length" class="h-[300rpx] flex items-center justify-center text-[24rpx] text-[#a0a7b8]">
            暂无{{ isIncome ? "收入" : "支出" }}记录
          </view>
          <view v-else class="mt-[12rpx]">
            <view
              v-for="item in sortedBills"
              :key="item.id"
              class="min-h-[116rpx] flex items-center border-0 border-b-[1rpx] border-b-[#edf0f5] py-[14rpx] last:border-b-0"
              hover-class="bg-[#f8f9fc]"
              @click="openBillDetail(item)"
            >
              <view :class="['h-[58rpx] w-[58rpx] flex flex-none items-center justify-center rounded-full text-[24rpx]', isIncome ? 'bg-[#fff0f5] text-[#ff3f7f]' : 'bg-[#eef1ff] text-[#4264f4]']">
                {{ categoryIcon }}
              </view>
              <view class="ml-[16rpx] min-w-0 flex-1">
                <view class="flex items-center justify-between">
                  <text class="text-[24rpx] text-[#59617d] font-800">{{ categoryName }}</text>
                  <text :class="['text-[27rpx] font-800', isIncome ? 'text-[#ff3f7f]' : 'text-[#59617d]']">{{ formatBillAmount(item) }}</text>
                </view>
                <view class="mt-[8rpx] truncate text-[20rpx] text-[#9aa2b8]">
                  {{ getTime(item.bill_time) }} · {{ getPayment(item.pay_type) }}<text v-if="item.remark"> · {{ item.remark }}</text>
                </view>
              </view>
              <text class="ml-[10rpx] text-[29rpx] text-[#a0a7b8] font-300">›</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { computed, ref } from "vue";
import { ApiGetUserBill, type ResUserBill } from "@/api/bill";
import { paymentMethods } from "@/constants/dict";
import UChart from "@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue";
import { parseDateTime } from "@/utils/date";

type StoredUserInfo = { id?: number };

const categoryId = ref(0);
const billType = ref<1 | 2>(2);
const selectedMonth = ref("");
const categoryName = ref("分类详情");
const bills = ref<ResUserBill[]>([]);
const isLoading = ref(false);
const isRefreshing = ref(false);
let latestRequestId = 0;

const getUserId = () => {
  const value = uni.getStorageSync("userInfo") as StoredUserInfo | string | "";
  if (!value) return 0;
  if (typeof value === "string") {
    try {
      return Number((JSON.parse(value) as StoredUserInfo).id) || 0;
    } catch {
      return 0;
    }
  }
  return Number(value.id) || 0;
};
const getAmount = (value: number | null) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};
const formatAmount = (value: number) => value.toFixed(2);
const formatMoney = (value: number) => `¥ ${formatAmount(value)}`;
const pad = (value: number) => String(value).padStart(2, "0");
const isIncome = computed(() => billType.value === 1);
const selectedMonthText = computed(() => {
  const [year, month] = selectedMonth.value.split("-");
  return year && month ? `${year}年${Number(month)}月` : "当月";
});
const categoryIcon = computed(() => isIncome.value ? "收" : "支");
const billCount = computed(() => bills.value.length);
const total = computed(() => bills.value.reduce((sum, bill) => sum + getAmount(bill.amount), 0));
const average = computed(() => billCount.value ? total.value / billCount.value : 0);
const maxAmount = computed(() => bills.value.reduce((max, bill) => Math.max(max, getAmount(bill.amount)), 0));
const totalText = computed(() => formatMoney(total.value));
const sortedBills = computed(() => [...bills.value].sort((left, right) => {
  const leftDate = parseDateTime(left.bill_time).getTime();
  const rightDate = parseDateTime(right.bill_time).getTime();
  return rightDate - leftDate;
}));
const daysInMonth = computed(() => {
  const [year, month] = selectedMonth.value.split("-").map(Number);
  return year && month ? new Date(year, month, 0).getDate() : 31;
});
const dailyTotals = computed(() => {
  const values = Array.from({ length: daysInMonth.value }, () => 0);
  bills.value.forEach((bill) => {
    const date = parseDateTime(bill.bill_time);
    if (!Number.isNaN(date.getTime()) && date.getDate() <= values.length) {
      values[date.getDate() - 1] += getAmount(bill.amount);
    }
  });
  return values;
});
const trendChartData = computed(() => ({
  categories: Array.from({ length: daysInMonth.value }, (_, index) => `${index + 1}`),
  series: [{ name: isIncome.value ? "收入" : "支出", data: dailyTotals.value.map((value) => Number(value.toFixed(2))), color: isIncome.value ? "#4264f4" : "#4264f4" }],
}));
const trendChartOpts = {
  color: ["#4264f4"],
  padding: [16, 12, 5, 8],
  dataLabel: false,
  dataPointShape: false,
  legend: { show: false },
  xAxis: { disableGrid: true, axisLineColor: "#e8ebf3", fontColor: "#929aaf", fontSize: 10, labelCount: 7, boundaryGap: "justify" },
  yAxis: { gridType: "dash", dashLength: 3, gridColor: "#edf0f6", data: [{ min: 0, fontColor: "#929aaf", fontSize: 10 }] },
  extra: { line: { type: "curve", width: 2, activeType: "hollow" } },
};
const metrics = computed(() => [
  { label: "总金额", value: formatMoney(total.value), color: isIncome.value ? "text-[#72eadf]" : "text-white" },
  { label: "平均金额", value: formatMoney(average.value), color: "text-white" },
  { label: "最高单笔", value: formatMoney(maxAmount.value), color: "text-[#ffd66f]" },
]);
const getPayment = (value: number) => paymentMethods.find((item) => item.value === Number(value))?.label || "其它";
const getTime = (value: string) => {
  const date = parseDateTime(value);
  return Number.isNaN(date.getTime()) ? "--:--" : `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
const formatBillAmount = (bill: ResUserBill) => {
  if (bill.amount === null) return "--";
  return `${isIncome.value ? "+" : "-"}${formatAmount(getAmount(bill.amount))}`;
};
const loadDetail = async (showLoading = true) => {
  const userId = getUserId();
  if (!userId || !categoryId.value || !selectedMonth.value) return;
  const requestId = ++latestRequestId;
  if (showLoading) isLoading.value = true;
  try {
    const res = await ApiGetUserBill({
      userId,
      month: selectedMonth.value,
      type: billType.value,
      categoryId: categoryId.value,
    });
    if (requestId !== latestRequestId) return;
    bills.value = res.code === 200 && Array.isArray(res.data) ? res.data : [];
    if (res.code !== 200) uni.showToast({ title: "分类统计加载失败", icon: "none" });
  } catch {
    if (requestId !== latestRequestId) return;
    bills.value = [];
    uni.showToast({ title: "分类统计加载失败", icon: "none" });
  } finally {
    if (showLoading && requestId === latestRequestId) isLoading.value = false;
  }
};
const refreshDetail = async () => {
  if (isRefreshing.value) return;
  isRefreshing.value = true;
  await loadDetail(false);
  isRefreshing.value = false;
};
const openBillDetail = (bill: ResUserBill) => {
  uni.setStorageSync("selectedBillDetail", bill);
  uni.navigateTo({ url: `/pages/bill-detail/index?id=${bill.id}` });
};
const goBack = () => uni.navigateBack();

onLoad((options) => {
  categoryId.value = Number(options?.categoryId) || 0;
  billType.value = Number(options?.type) === 1 ? 1 : 2;
  selectedMonth.value = String(options?.month || "");
  categoryName.value = options?.name ? decodeURIComponent(String(options.name)) : "分类详情";
  loadDetail();
});
</script>
