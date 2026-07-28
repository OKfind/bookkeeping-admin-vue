<template>
  <view
    class="h-100vh flex flex-col overflow-hidden bg-[#f4f6ff] text-[#4c5574]"
  >
    <view class="flex-none px-[30rpx] pb-[28rpx]">
      <view class="h-[calc(var(--status-bar-height)+42rpx)]" />
      <view class="h-[48rpx] flex items-center justify-between">
        <view
          class="flex items-center text-[32rpx] text-[#32384a] font-700"
          hover-class="opacity-60"
          hover-start-time="0"
          hover-stay-time="80"
          @click="categorySheetVisible = true"
        >
          <text class="max-w-[500rpx] truncate">{{ categoryFilterLabel }}</text>
          <text
            class="ml-[14rpx] text-[42rpx] text-[#4f5668] font-400 leading-none"
            >›</text
          >
        </view>
        <view class="relative h-[44rpx] w-[44rpx]">
          <view
            class="absolute left-[8rpx] top-[9rpx] h-[19rpx] w-[19rpx] border-[4rpx] border-[#263042] rounded-full"
          />
          <view
            class="absolute left-[29rpx] top-[30rpx] h-[4rpx] w-[16rpx] origin-left rotate-45 rounded-[2rpx] bg-[#263042]"
          />
        </view>
      </view>

      <wd-datetime-picker
        v-model="selectedMonthTime"
        type="year-month"
        root-portal
        @open="monthPickerOpen = true"
        @close="monthPickerOpen = false"
        @confirm="monthPickerOpen = false"
        @cancel="monthPickerOpen = false"
      >
        <view
          :class="[
            'mt-[36rpx] h-[50rpx] w-[166rpx] flex items-center justify-center gap-[8rpx] rounded-[5rpx] text-[24rpx] text-[#1652ff] transition-all duration-150 active:scale-96',
            monthPickerOpen
              ? 'bg-[#cfdcff] shadow-[0_6rpx_14rpx_rgba(22,82,255,0.16)]'
              : 'bg-[#dfe7ff]',
          ]"
          hover-class="opacity-75"
          hover-start-time="0"
          hover-stay-time="80"
        >
          <text class="h-[30rpx] leading-[30rpx]">{{ selectedMonth }}</text>
          <view
            :class="[
              'relative h-[18rpx] w-[18rpx] flex-none transition-transform duration-150',
              monthPickerOpen ? 'rotate-180' : '',
            ]"
          >
            <view
              class="absolute left-[2rpx] top-[8rpx] h-[3rpx] w-[9rpx] rotate-45 rounded-[2rpx] bg-[#1652ff]"
            />
            <view
              class="absolute right-[2rpx] top-[8rpx] h-[3rpx] w-[9rpx] -rotate-45 rounded-[2rpx] bg-[#1652ff]"
            />
          </view>
        </view>
      </wd-datetime-picker>

      <view class="mt-[30rpx] grid grid-cols-2 gap-[24rpx]">
        <view
          :class="[
            'relative h-[146rpx] overflow-hidden rounded-[7rpx] bg-[linear-gradient(135deg,#2f5aff_0%,#6687ff_100%)] shadow-[0_8rpx_16rpx_rgba(60,91,245,0.2)] transition-opacity duration-150',
            selectedBillType === 1 ? 'opacity-45' : 'opacity-100',
          ]"
          hover-class="opacity-80"
          hover-start-time="0"
          hover-stay-time="80"
          @click="toggleBillType(2)"
        >
          <view
            class="absolute right-[-30rpx] top-[-26rpx] h-[108rpx] w-[108rpx] rotate-45 border-l-[2rpx] border-l-white/32 bg-white/12"
          />
          <view
            class="relative z-1 h-full flex items-center px-[32rpx] text-white"
          >
            <text
              class="mr-[18rpx] w-[52rpx] flex-none text-[46rpx] leading-none"
              >💔</text
            >
            <view>
              <view class="text-[35rpx] font-700 leading-[42rpx]">{{
                monthExpense
              }}</view>
              <view class="mt-[8rpx] text-[19rpx] text-white/92 font-700"
                >本月总支出（元）</view
              >
            </view>
          </view>
        </view>

        <view
          :class="[
            'relative h-[146rpx] overflow-hidden rounded-[7rpx] bg-[linear-gradient(135deg,#ff3f80_0%,#ff75a5_100%)] shadow-[0_8rpx_16rpx_rgba(255,63,128,0.22)] transition-opacity duration-150',
            selectedBillType === 2 ? 'opacity-45' : 'opacity-100',
          ]"
          hover-class="opacity-80"
          hover-start-time="0"
          hover-stay-time="80"
          @click="toggleBillType(1)"
        >
          <view
            class="absolute right-[-30rpx] top-[-26rpx] h-[108rpx] w-[108rpx] rotate-45 border-l-[2rpx] border-l-white/32 bg-white/12"
          />
          <view
            class="relative z-1 h-full flex items-center px-[32rpx] text-white"
          >
            <text
              class="mr-[18rpx] w-[52rpx] flex-none text-[46rpx] leading-none"
              >💜</text
            >
            <view>
              <view class="text-[35rpx] font-700 leading-[42rpx]">{{
                monthIncome
              }}</view>
              <view class="mt-[8rpx] text-[19rpx] text-white/92 font-700"
                >本月总收入（元）</view
              >
            </view>
          </view>
        </view>
      </view>

      <scroll-view
        class="mt-[20rpx] h-[52rpx] w-full"
        scroll-x
        enable-flex
        :show-scrollbar="false"
      >
        <view class="w-max flex gap-[12rpx] pr-[30rpx]">
          <view
            :class="[
              'h-[48rpx] box-border flex flex-none items-center justify-center border-[1rpx] rounded-[6rpx] px-[20rpx] text-[22rpx] font-700 transition-colors duration-150',
              selectedPayType === null
                ? 'border-[#1652ff] bg-[#e4ebff] text-[#1652ff]'
                : 'border-[#dfe3ef] bg-white text-[#6e7792]',
            ]"
            hover-class="opacity-65"
            hover-start-time="0"
            hover-stay-time="80"
            @click="setPayType(null)"
          >
            全部
          </view>
          <view
            v-for="payment in paymentMethods"
            :key="payment.value"
            :class="[
              'h-[48rpx] box-border flex flex-none items-center justify-center border-[1rpx] rounded-[6rpx] px-[20rpx] text-[22rpx] font-700 transition-colors duration-150',
              selectedPayType === payment.value
                ? 'border-[#1652ff] bg-[#e4ebff] text-[#1652ff]'
                : 'border-[#dfe3ef] bg-white text-[#6e7792]',
            ]"
            hover-class="opacity-65"
            hover-start-time="0"
            hover-stay-time="80"
            @click="setPayType(payment.value)"
          >
            {{ payment.label }}
          </view>
        </view>
      </scroll-view>
    </view>

    <scroll-view
      class="h-0 min-h-0 flex-1"
      scroll-y
      :show-scrollbar="false"
      refresher-enabled
      refresher-default-style="black"
      :refresher-triggered="isRefreshing"
      @refresherrefresh="refreshUserBills"
    >
      <view
        v-if="isLoading"
        class="h-full box-border flex items-center justify-center bg-white pb-[calc(112rpx+env(safe-area-inset-bottom))] text-[26rpx] text-[#a0a7b8] font-600"
      >
        加载中...
      </view>
      <view
        v-else-if="!flowGroups.length"
        class="h-full box-border flex items-center justify-center bg-white pb-[calc(112rpx+env(safe-area-inset-bottom))]"
      >
        <view class="flex flex-col items-center">
          <image
            class="h-[320rpx] w-[480rpx]"
            :src="blankImg"
            mode="aspectFit"
          />
          <wd-status-tip image="" tip="暂无内容" />
          <wd-button
            type="primary"
            size="small"
            icon="add"
            @click="goToBookkeeping"
          >
            去记一笔
          </wd-button>
        </view>
      </view>
      <view v-else class="pb-[calc(140rpx+env(safe-area-inset-bottom))]">
        <block v-for="(group, groupIndex) in flowGroups" :key="group.dateKey">
          <view v-if="groupIndex > 0" class="h-[14rpx] bg-[#edf0f8]" />
          <view class="bg-white pt-[30rpx]">
            <view
              class="flex items-baseline justify-between px-[30rpx] pb-[12rpx]"
            >
              <view class="flex items-baseline">
                <text class="text-[30rpx] text-[#58617e] font-800">{{
                  group.label
                }}</text>
                <text class="ml-[16rpx] text-[22rpx] text-[#9aa1b3] font-700">{{
                  group.date
                }}</text>
              </view>
              <view
                class="flex gap-[26rpx] text-[21rpx] text-[#7b849e] font-700"
              >
                <text>支：{{ group.expense }}</text>
                <text>收：{{ group.income }}</text>
              </view>
            </view>

            <view class="bg-white">
              <view
                v-for="(item, itemIndex) in group.items"
                :key="`${item.id}-${item.time}`"
                :class="[
                  'ml-[30rpx] h-[146rpx] flex items-center pr-[30rpx]',
                  itemIndex === group.items.length - 1
                    ? ''
                    : 'border-0 border-b-[1rpx] border-b-[#e7e9f0]',
                ]"
                hover-class="bg-[#f7f8fc]"
                hover-start-time="0"
                hover-stay-time="80"
                @click="openBillDetail(item.id)"
              >
                <view
                  :class="[
                    'h-[88rpx] w-[88rpx] flex flex-none items-center justify-center rounded-full text-[34rpx] font-700',
                    item.type === 'income'
                      ? 'bg-[#fff0f5] text-[#ff2f75]'
                      : 'bg-[#eef2ff] text-[#3d5dff]',
                  ]"
                >
                  <text>{{ item.icon }}</text>
                </view>
                <view class="ml-[22rpx] min-w-0 flex-1">
                  <view
                    class="text-[30rpx] text-[#59617d] font-800 leading-[38rpx]"
                    >{{ item.title }}</view
                  >
                  <view class="mt-[6rpx] text-[23rpx] text-[#a0a7b8] font-600"
                    >{{ item.time }}　{{ item.pay }}</view
                  >
                </view>
                <view
                  :class="[
                    'ml-[20rpx] flex-none text-[38rpx] font-800 leading-none',
                    item.type === 'income'
                      ? 'text-[#ff2f75]'
                      : 'text-[#535b78]',
                  ]"
                >
                  {{ item.displayAmount }}
                </view>
              </view>
            </view>
          </view>
          <block v-if="groupIndex === weekStatsInsertIndex">
            <view class="h-[14rpx] bg-[#edf0f8]" />
            <view class="bg-white pt-[30rpx]">
              <view
                class="flex items-baseline justify-between px-[30rpx] pb-[12rpx]"
              >
                <view class="flex items-baseline">
                  <text class="text-[30rpx] text-[#58617e] font-800"
                    >近1周</text
                  >
                  <text class="ml-[16rpx] text-[22rpx] text-[#9aa1b3] font-700"
                    >近7天</text
                  >
                </view>
                <view
                  class="flex gap-[26rpx] text-[21rpx] text-[#7b849e] font-700"
                >
                  <text>支：{{ weekStats.expense }}</text>
                  <text>收：{{ weekStats.income }}</text>
                </view>
              </view>
              <view class="bg-white">
                <view
                  v-for="(item, itemIndex) in weekItems"
                  :key="`week-${item.id}-${item.time}`"
                  :class="[
                    'ml-[30rpx] h-[146rpx] flex items-center pr-[30rpx]',
                    itemIndex === weekItems.length - 1
                      ? ''
                      : 'border-0 border-b-[1rpx] border-b-[#e7e9f0]',
                  ]"
                  hover-class="bg-[#f7f8fc]"
                  hover-start-time="0"
                  hover-stay-time="80"
                  @click="openBillDetail(item.id)"
                >
                  <view
                    :class="[
                      'h-[88rpx] w-[88rpx] flex flex-none items-center justify-center rounded-full text-[34rpx] font-700',
                      item.type === 'income'
                        ? 'bg-[#fff0f5] text-[#ff2f75]'
                        : 'bg-[#eef2ff] text-[#3d5dff]',
                    ]"
                  >
                    <text>{{ item.icon }}</text>
                  </view>
                  <view class="ml-[22rpx] min-w-0 flex-1">
                    <view
                      class="text-[30rpx] text-[#59617d] font-800 leading-[38rpx]"
                      >{{ item.title }}</view
                    >
                    <view class="mt-[6rpx] text-[23rpx] text-[#a0a7b8] font-600"
                      >{{ item.date }} {{ item.time }}　{{ item.pay }}</view
                    >
                  </view>
                  <view
                    :class="[
                      'ml-[20rpx] flex-none text-[38rpx] font-800 leading-none',
                      item.type === 'income'
                        ? 'text-[#ff2f75]'
                        : 'text-[#535b78]',
                    ]"
                  >
                    {{ item.displayAmount }}
                  </view>
                </view>
              </view>
            </view>
          </block>
        </block>
      </view>
    </scroll-view>

    <wd-action-sheet
      v-model="categorySheetVisible"
      :actions="categoryActions"
      title="选择账单使用类型"
      cancel-text="取消"
      root-portal
      :z-index="1001"
      @select="handleCategorySelect"
    />

    <TabBar :active="1" />
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { computed, ref, watch } from "vue";
import { ApiGetUserBill, type ResUserBill } from "@/api/bill";
import TabBar from "@/components/TabBar.vue";
import { billCategories, paymentMethods } from "@/constants/dict";
import blankImg from "@/static/tips/blank.png";

type FlowItem = {
  id: number;
  title: string;
  date: string;
  time: string;
  pay: string;
  displayAmount: string;
  icon: string;
  sortTime: number;
  type: "income" | "expense";
};

type FlowGroup = {
  label: string;
  date: string;
  dateKey: string;
  expense: string;
  income: string;
  items: FlowItem[];
};

type StoredUserInfo = { id?: number };
type CategoryAction = {
  name: string;
  categoryId: number | null;
  color?: string;
};
type CategorySelectEvent = {
  item: CategoryAction;
  index: number;
};

const now = new Date();
const selectedMonthTime = ref(
  new Date(now.getFullYear(), now.getMonth(), 1).getTime(),
);
const monthPickerOpen = ref(false);
const bills = ref<ResUserBill[]>([]);
const monthlyBills = ref<ResUserBill[]>([]);
const selectedBillType = ref<1 | 2 | null>(null);
const selectedCategoryId = ref<number | null>(null);
const selectedPayType = ref<number | null>(null);
const categorySheetVisible = ref(false);
const isLoading = ref(false);
const isRefreshing = ref(false);
const categoryFilterLabel = computed(() => {
  return (
    billCategories.find((item) => item.value === selectedCategoryId.value)
      ?.label || "全部类型"
  );
});
const categoryActions = computed<CategoryAction[]>(() => {
  const actions: CategoryAction[] = [
    {
      name: "全部类型",
      categoryId: null,
      color: selectedCategoryId.value === null ? "#1652ff" : undefined,
    },
  ];

  return actions.concat(
    billCategories.map((category) => ({
      name: category.label,
      categoryId: category.value,
      color:
        selectedCategoryId.value === category.value ? "#1652ff" : undefined,
    })),
  );
});
const selectedMonth = computed(() => {
  const date = new Date(selectedMonthTime.value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
});

const getUserId = () => {
  const userInfo = uni.getStorageSync("userInfo") as
    | StoredUserInfo
    | string
    | "";
  if (!userInfo) return 0;
  if (typeof userInfo === "string") {
    try {
      return Number((JSON.parse(userInfo) as StoredUserInfo).id) || 0;
    } catch {
      return 0;
    }
  }
  return Number(userInfo.id) || 0;
};

const parseBillTime = (value: string) =>
  new Date(value.includes("T") ? value : value.replace(/-/g, "/"));
const padNumber = (value: number) => String(value).padStart(2, "0");
const formatAmount = (value: number) => value.toFixed(2);
const getDateKey = (date: Date) =>
  `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
const getTimeText = (date: Date) =>
  `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`;
const getDateText = (date: Date) =>
  `${date.getMonth() + 1}月${date.getDate()}日`;
const getStartOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
const isSameDate = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();
const getDateLabel = (date: Date) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (isSameDate(date, today)) return "今天";
  if (isSameDate(date, yesterday)) return "昨天";
  return getDateText(date);
};
const getPayLabel = (payType: number) =>
  paymentMethods.find((item) => item.value === payType)?.label || "其它";
const getCategory = (categoryId: number) =>
  billCategories.find((item) => item.value === categoryId);
const getBillAmount = (amount: number | null) => {
  if (amount === null || amount === undefined) return null;
  const value = Number(amount);
  return Number.isFinite(value) ? value : null;
};

const monthIncome = computed(() =>
  formatAmount(
    monthlyBills.value.reduce(
      (total, item) =>
        total + (Number(item.type) === 1 ? getBillAmount(item.amount) || 0 : 0),
      0,
    ),
  ),
);
const monthExpense = computed(() =>
  formatAmount(
    monthlyBills.value.reduce(
      (total, item) =>
        total + (Number(item.type) === 2 ? getBillAmount(item.amount) || 0 : 0),
      0,
    ),
  ),
);
const weekStats = computed(() => {
  const todayStart = getStartOfDay(new Date());
  const weekStart = addDays(todayStart, -6);
  const weekEnd = addDays(todayStart, 1);
  const total = bills.value.reduce(
    (result, bill) => {
      const billDate = parseBillTime(bill.bill_time);
      if (Number.isNaN(billDate.getTime())) return result;

      const billDayStart = getStartOfDay(billDate);
      if (billDayStart < weekStart || billDayStart >= weekEnd) return result;

      const amount = getBillAmount(bill.amount);
      if (amount === null) return result;

      if (Number(bill.type) === 1) {
        result.income += amount;
      } else if (Number(bill.type) === 2) {
        result.expense += amount;
      }
      return result;
    },
    { income: 0, expense: 0 },
  );

  return {
    income: formatAmount(total.income),
    expense: formatAmount(total.expense),
  };
});
const flowGroups = computed<FlowGroup[]>(() => {
  const groupMap = new Map<
    string,
    { billDate: Date; items: FlowItem[]; income: number; expense: number }
  >();

  bills.value.forEach((bill) => {
    const billDate = parseBillTime(bill.bill_time);
    if (Number.isNaN(billDate.getTime())) return;

    const dateKey = getDateKey(billDate);
    const group = groupMap.get(dateKey) || {
      billDate,
      items: [],
      income: 0,
      expense: 0,
    };
    const amount = getBillAmount(bill.amount);
    const isIncome = Number(bill.type) === 1;
    const category = getCategory(bill.category_id);

    if (billDate.getTime() > group.billDate.getTime()) {
      group.billDate = billDate;
    }

    if (isIncome) {
      group.income += amount || 0;
    } else {
      group.expense += amount || 0;
    }

    group.items.push({
      id: bill.id,
      title: category?.label || bill.remark || "未分类",
      date: getDateText(billDate),
      time: getTimeText(billDate),
      pay:
        amount === null
          ? `${getPayLabel(bill.pay_type)} | 金额缺失`
          : getPayLabel(bill.pay_type),
      displayAmount:
        amount === null
          ? "--"
          : `${isIncome ? "+" : "-"}${formatAmount(amount)}`,
      icon: category?.icon || "□",
      sortTime: billDate.getTime(),
      type: isIncome ? "income" : "expense",
    });
    groupMap.set(dateKey, group);
  });

  return Array.from(groupMap.entries())
    .sort(
      ([, left], [, right]) =>
        right.billDate.getTime() - left.billDate.getTime(),
    )
    .map(([dateKey, group]) => ({
      label: getDateLabel(group.billDate),
      date: getDateText(group.billDate),
      dateKey,
      expense: formatAmount(group.expense),
      income: formatAmount(group.income),
      items: group.items.sort((left, right) => right.sortTime - left.sortTime),
    }));
});
const weekItems = computed<FlowItem[]>(() => {
  const todayStart = getStartOfDay(new Date());
  const weekStartTime = addDays(todayStart, -6).getTime();
  const weekEndTime = addDays(todayStart, 1).getTime();

  return flowGroups.value
    .flatMap((group) => group.items)
    .filter(
      (item) => item.sortTime >= weekStartTime && item.sortTime < weekEndTime,
    )
    .sort((left, right) => right.sortTime - left.sortTime);
});
const weekStatsInsertIndex = computed(() => {
  const yesterdayKey = getDateKey(addDays(getStartOfDay(new Date()), -1));
  const yesterdayIndex = flowGroups.value.findIndex(
    (group) => group.dateKey === yesterdayKey,
  );
  return yesterdayIndex >= 0 ? yesterdayIndex : 0;
});

let latestBillRequestId = 0;
const loadUserBills = async (showLoading = true) => {
  const userId = getUserId();
  if (!userId) {
    bills.value = [];
    monthlyBills.value = [];
    uni.showToast({ title: "请先登录", icon: "none" });
    return;
  }

  const requestId = ++latestBillRequestId;
  const filterType = selectedBillType.value;
  const filterCategoryId = selectedCategoryId.value;
  const filterPayType = selectedPayType.value;
  const baseParams = {
    month: selectedMonth.value,
    userId,
    ...(filterCategoryId === null ? {} : { categoryId: filterCategoryId }),
    ...(filterPayType === null ? {} : { payType: filterPayType }),
  };
  if (showLoading) isLoading.value = true;
  try {
    const listRequest = ApiGetUserBill({
      ...baseParams,
      ...(filterType === null ? {} : { type: filterType }),
    });
    const summaryRequest =
      filterType === null ? listRequest : ApiGetUserBill(baseParams);
    const [listRes, summaryRes] = await Promise.all([
      listRequest,
      summaryRequest,
    ]);

    if (requestId !== latestBillRequestId) return;
    if (listRes.code === 200) {
      bills.value = Array.isArray(listRes.data) ? listRes.data : [];
    }
    if (summaryRes.code === 200) {
      monthlyBills.value = Array.isArray(summaryRes.data)
        ? summaryRes.data
        : [];
    }
  } catch (error) {
    if (requestId !== latestBillRequestId) return;
    uni.showToast({ title: "流水加载失败", icon: "none" });
  } finally {
    if (showLoading && requestId === latestBillRequestId) {
      isLoading.value = false;
    }
  }
};

const toggleBillType = (type: 1 | 2) => {
  selectedBillType.value = selectedBillType.value === type ? null : type;
  loadUserBills();
};

const handleCategorySelect = ({ item }: CategorySelectEvent) => {
  categorySheetVisible.value = false;
  selectedCategoryId.value = item.categoryId;
  loadUserBills();
};

const setPayType = (payType: number | null) => {
  if (selectedPayType.value === payType) return;
  selectedPayType.value = payType;
  loadUserBills();
};

const refreshUserBills = async () => {
  if (isRefreshing.value) return;
  isRefreshing.value = true;
  await loadUserBills(false);
  isRefreshing.value = false;
};

const goToBookkeeping = () => {
  uni.navigateTo({ url: "/pages/bookkeeping/index" });
};

const openBillDetail = (billId: number) => {
  const selectedBill = bills.value.find((bill) => bill.id === billId);
  if (!selectedBill) {
    uni.showToast({ title: "账单信息不存在", icon: "none" });
    return;
  }

  uni.setStorageSync("selectedBillDetail", selectedBill);
  uni.navigateTo({ url: `/pages/bill-detail/index?id=${billId}` });
};

watch(selectedMonth, () => loadUserBills());
onShow(loadUserBills);
</script>
