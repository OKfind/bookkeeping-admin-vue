<template>
  <view class="h-100vh flex flex-col overflow-hidden bg-[#f4f6ff] text-[#4e5875]">
    <view class="flex-none px-[30rpx]">
      <view class="h-[calc(var(--status-bar-height)+40rpx)]" />
      <view class="flex items-center justify-between">
        <view>
          <text class="text-[30rpx] text-[#b1b8ca] font-700">Hi，</text>
          <text class="text-[34rpx] text-[#30384e] font-800">{{ displayName }}！</text>
        </view>
        <view class="h-[48rpx] w-[48rpx] flex items-center justify-center rounded-full bg-white">
          <text class="text-[28rpx] text-[#4e5875] font-800">{{ userInitial }}</text>
        </view>
      </view>

      <view
        class="relative mt-[42rpx] h-[340rpx] overflow-hidden rounded-[8rpx] bg-[#4163f5] px-[30rpx] pb-[26rpx] pt-[26rpx] text-white shadow-[0_12rpx_28rpx_rgba(65,99,245,0.22)]"
      >
        <view class="absolute right-0 top-0 h-[184rpx] w-[366rpx] overflow-hidden border-0 border-l-[1rpx] border-l-white/12">
          <view class="absolute inset-0 bg-white/4 [clip-path:polygon(0_42%,14%_58%,26%_36%,38%_49%,53%_28%,67%_44%,84%_36%,100%_54%,100%_100%,0_100%)]" />
          <view class="absolute left-0 top-[78rpx] h-[2rpx] w-[57rpx] origin-left rotate-[28deg] bg-white/46" />
          <view class="absolute left-[51rpx] top-[105rpx] h-[2rpx] w-[55rpx] origin-left rotate-[-39deg] bg-white/46" />
          <view class="absolute left-[94rpx] top-[71rpx] h-[2rpx] w-[53rpx] origin-left rotate-[25deg] bg-white/46" />
          <view class="absolute left-[142rpx] top-[93rpx] h-[2rpx] w-[65rpx] origin-left rotate-[-31deg] bg-white/46" />
          <view class="absolute left-[198rpx] top-[59rpx] h-[2rpx] w-[65rpx] origin-left rotate-[23deg] bg-white/46" />
          <view class="absolute left-[258rpx] top-[84rpx] h-[2rpx] w-[63rpx] origin-left rotate-[-11deg] bg-white/46" />
          <view class="absolute left-[320rpx] top-[72rpx] h-[2rpx] w-[55rpx] origin-left rotate-[34deg] bg-white/46" />
          <view class="absolute left-[316rpx] top-[64rpx] h-[18rpx] w-[18rpx] rounded-full bg-[#91a8ff]" />
          <view class="absolute bottom-0 right-[31rpx] h-full w-[1rpx] bg-white/14" />
        </view>

        <view class="relative z-1 h-full flex flex-col justify-between">
          <view>
            <view class="text-[27rpx] text-[#cbd6ff] font-600">本月支出（元）</view>
            <view class="mt-[2rpx] text-[58rpx] text-white font-800 leading-[68rpx]">{{ monthExpense }}</view>
          </view>

          <view class="grid grid-cols-2 gap-[24rpx] text-[25rpx] font-600">
            <view class="min-w-0 truncate">
              <text class="text-white/68">本月收入（元）：</text>
              <text class="text-[#72eadf] font-800">{{ monthIncome }}</text>
            </view>
            <view class="min-w-0 truncate">
              <text class="text-white/68">流水笔数（笔）：</text>
              <text class="text-[#ffd66f] font-800">{{ monthlyBills.length }}</text>
            </view>
          </view>

          <view>
            <view class="flex items-center justify-between text-[26rpx] font-600">
              <text>
                <text class="text-white/68">本月结余（元）：</text>
                <text class="text-[#72eadf] font-800">{{ monthBalance }}</text>
              </text>
              <text class="text-[24rpx] text-[#ffd66f] font-800">{{ balanceRatio }}%</text>
            </view>
            <view class="mt-[12rpx] h-[18rpx] overflow-hidden rounded-full bg-[#88a0ff]">
              <view
                :class="['h-full rounded-full bg-[#64eadf] transition-all duration-300', balanceProgressClass]"
              />
            </view>
          </view>
        </view>
      </view>
    </view>

    <scroll-view
      class="mb-[calc(112rpx+env(safe-area-inset-bottom))] mt-[28rpx] h-0 min-h-0 flex-1 bg-white"
      scroll-y
      :show-scrollbar="false"
      refresher-enabled
      refresher-default-style="black"
      :refresher-triggered="isRefreshing"
      @refresherrefresh="refreshMonthlyBills"
    >
      <view>
        <view class="flex items-baseline justify-between px-[30rpx] pb-[14rpx] pt-[28rpx]">
          <view class="flex items-baseline">
            <text class="text-[36rpx] text-[#515a78] font-800">今天</text>
            <text class="ml-[14rpx] text-[25rpx] text-[#929aaf] font-700">{{ todayDate }}</text>
          </view>
          <view class="flex gap-[24rpx] text-[24rpx] text-[#6f7893] font-700">
            <text>支：{{ todayExpense }}</text>
            <text>收：{{ todayIncome }}</text>
          </view>
        </view>

        <view v-if="isLoading" class="h-[300rpx] flex items-center justify-center text-[25rpx] text-[#a1a8b8]">
          加载中...
        </view>

        <view
          v-else-if="!flowItems.length"
          class="min-h-[520rpx] flex flex-col items-center justify-center px-[30rpx]"
        >
          <image class="h-[230rpx] w-[360rpx]" :src="blankImg" mode="aspectFit" />
          <wd-status-tip image="" tip="暂无流水" />
          <wd-button type="primary" size="small" icon="add" @click="goToBookkeeping">
            去记一笔
          </wd-button>
        </view>

        <view v-else>
          <view
            v-for="(item, index) in flowItems"
            :key="item.id"
            :class="[
              'ml-[30rpx] h-[142rpx] flex items-center pr-[30rpx]',
              index === flowItems.length - 1 ? '' : 'border-0 border-b-[1rpx] border-b-[#e8eaf0]',
            ]"
            hover-class="bg-[#f7f8fc]"
            hover-start-time="0"
            hover-stay-time="80"
            @click="openBillDetail(item.bill)"
          >
            <view
              :class="[
                'h-[86rpx] w-[86rpx] flex flex-none items-center justify-center rounded-full text-[34rpx]',
                item.isIncome ? 'bg-[#fff0f5]' : 'bg-[#eef2ff]',
              ]"
            >
              {{ item.icon }}
            </view>
            <view class="ml-[20rpx] min-w-0 flex-1">
              <view class="truncate text-[29rpx] text-[#59617d] font-800">{{ item.title }}</view>
              <view class="mt-[7rpx] truncate text-[22rpx] text-[#a1a8b8] font-600">
                {{ item.time }} · {{ item.payment }}<text v-if="item.remark"> · {{ item.remark }}</text>
              </view>
            </view>
            <view
              :class="[
                'ml-[18rpx] flex-none text-[36rpx] font-800',
                item.isIncome ? 'text-[#ff3478]' : 'text-[#535c79]',
              ]"
            >
              {{ item.amount }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <TabBar :active="0" />
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { computed, ref } from "vue";
import { ApiGetUserBill, type ResUserBill } from "@/api/bill";
import TabBar from "@/components/TabBar.vue";
import { billCategories, paymentMethods } from "@/constants/dict";
import blankImg from "@/static/tips/blank.png";
import { formatDateTime, parseDateTime } from "@/utils/date";

type StoredUserInfo = {
  id?: number;
  nickname?: string;
  username?: string;
};

type FlowViewItem = {
  id: number;
  bill: ResUserBill;
  title: string;
  remark: string;
  icon: string;
  payment: string;
  time: string;
  amount: string;
  isIncome: boolean;
  sortTime: number;
};

const monthlyBills = ref<ResUserBill[]>([]);
const storedUser = ref<StoredUserInfo>({});
const isLoading = ref(false);
const isRefreshing = ref(false);

const readStoredUser = () => {
  const value = uni.getStorageSync("userInfo") as StoredUserInfo | string | "";
  if (!value) return {};
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as StoredUserInfo;
    } catch {
      return {};
    }
  }
  return value;
};

const displayName = computed(() =>
  (storedUser.value.nickname || storedUser.value.username || "记账人").trim(),
);
const userInitial = computed(() => displayName.value.slice(0, 1));
const userId = computed(() => Number(storedUser.value.id) || 0);

const getAmount = (value: number | null) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};
const formatAmount = (value: number) => value.toFixed(2);
const padNumber = (value: number) => String(value).padStart(2, "0");
const todayDate = computed(() => {
  const date = new Date();
  return `${date.getMonth() + 1}月${date.getDate()}日`;
});
const currentMonth = () => formatDateTime(new Date()).slice(0, 7);
const isToday = (value: string) => {
  const date = parseDateTime(value);
  const today = new Date();
  return !Number.isNaN(date.getTime())
    && date.getFullYear() === today.getFullYear()
    && date.getMonth() === today.getMonth()
    && date.getDate() === today.getDate();
};
const dailyFlows = computed(() =>
  monthlyBills.value.filter((bill) => isToday(bill.bill_time)),
);

const monthIncomeTotal = computed(() =>
  monthlyBills.value.reduce(
    (total, bill) => total + (Number(bill.type) === 1 ? getAmount(bill.amount) : 0),
    0,
  ),
);
const monthExpenseTotal = computed(() =>
  monthlyBills.value.reduce(
    (total, bill) => total + (Number(bill.type) === 2 ? getAmount(bill.amount) : 0),
    0,
  ),
);
const dailyIncomeTotal = computed(() =>
  dailyFlows.value.reduce(
    (total, bill) => total + (Number(bill.type) === 1 ? getAmount(bill.amount) : 0),
    0,
  ),
);
const dailyExpenseTotal = computed(() =>
  dailyFlows.value.reduce(
    (total, bill) => total + (Number(bill.type) === 2 ? getAmount(bill.amount) : 0),
    0,
  ),
);
const monthIncome = computed(() => formatAmount(monthIncomeTotal.value));
const monthExpense = computed(() => formatAmount(monthExpenseTotal.value));
const monthBalance = computed(() =>
  formatAmount(monthIncomeTotal.value - monthExpenseTotal.value),
);
const todayIncome = computed(() => formatAmount(dailyIncomeTotal.value));
const todayExpense = computed(() => formatAmount(dailyExpenseTotal.value));
const balanceRatio = computed(() => {
  if (monthIncomeTotal.value <= 0) return 0;
  const balance = monthIncomeTotal.value - monthExpenseTotal.value;
  return Math.min(100, Math.max(0, Math.round((balance / monthIncomeTotal.value) * 100)));
});
const progressWidthClasses = [
  "w-0", "w-[5%]", "w-[10%]", "w-[15%]", "w-[20%]", "w-[25%]",
  "w-[30%]", "w-[35%]", "w-[40%]", "w-[45%]", "w-[50%]", "w-[55%]",
  "w-[60%]", "w-[65%]", "w-[70%]", "w-[75%]", "w-[80%]", "w-[85%]",
  "w-[90%]", "w-[95%]", "w-full",
];
const balanceProgressClass = computed(
  () => progressWidthClasses[Math.ceil(balanceRatio.value / 5)],
);

const flowItems = computed<FlowViewItem[]>(() =>
  dailyFlows.value
    .map((bill) => {
      const date = parseDateTime(bill.bill_time);
      const sortTime = Number.isNaN(date.getTime()) ? 0 : date.getTime();
      const category = billCategories.find(
        (item) => item.value === Number(bill.category_id),
      );
      const payment = paymentMethods.find(
        (item) => item.value === Number(bill.pay_type),
      );
      const isIncome = Number(bill.type) === 1;
      const amount = bill.amount === null ? "--" : formatAmount(getAmount(bill.amount));

      return {
        id: bill.id,
        bill,
        title: category?.label || "未分类",
        remark: bill.remark?.trim() || "",
        icon: category?.icon || "¥",
        payment: payment?.label || "其它",
        time: Number.isNaN(date.getTime())
          ? "--:--"
          : `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`,
        amount: bill.amount === null ? "--" : `${isIncome ? "+" : "-"}${amount}`,
        isIncome,
        sortTime,
      };
    })
    .sort((left, right) => right.sortTime - left.sortTime),
);

let requestId = 0;
const loadMonthlyBills = async (showLoading = true) => {
  storedUser.value = readStoredUser();
  if (!userId.value) {
    monthlyBills.value = [];
    uni.showToast({ title: "请先登录", icon: "none" });
    return;
  }

  const currentRequestId = ++requestId;
  if (showLoading) isLoading.value = true;
  try {
    const res = await ApiGetUserBill({
      userId: userId.value,
      month: currentMonth(),
    });
    if (currentRequestId !== requestId) return;
    if (res.code === 200) {
      monthlyBills.value = Array.isArray(res.data) ? res.data : [];
    } else {
      monthlyBills.value = [];
      uni.showToast({ title: "本月流水加载失败", icon: "none" });
    }
  } catch {
    if (currentRequestId !== requestId) return;
    monthlyBills.value = [];
    uni.showToast({ title: "本月流水加载失败", icon: "none" });
  } finally {
    if (showLoading && currentRequestId === requestId) {
      isLoading.value = false;
    }
  }
};

const refreshMonthlyBills = async () => {
  if (isRefreshing.value) return;
  isRefreshing.value = true;
  await loadMonthlyBills(false);
  isRefreshing.value = false;
};

const goToBookkeeping = () => {
  uni.navigateTo({ url: "/pages/bookkeeping/index" });
};

const openBillDetail = (bill: ResUserBill) => {
  uni.setStorageSync("selectedBillDetail", bill);
  uni.navigateTo({ url: `/pages/bill-detail/index?id=${bill.id}` });
};

onShow(() => loadMonthlyBills());
</script>
