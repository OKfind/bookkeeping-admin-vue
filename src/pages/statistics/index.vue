<template>
  <view class="h-100vh flex flex-col overflow-hidden bg-[#f4f6ff] text-[#30384e]">
    <scroll-view
      class="h-0 min-h-0 flex-1"
      scroll-y
      :show-scrollbar="false"
      refresher-enabled
      refresher-default-style="black"
      :refresher-triggered="isRefreshing"
      @refresherrefresh="refreshStatistics"
    >
      <view class="box-border px-[28rpx] pb-[calc(148rpx+env(safe-area-inset-bottom))] pt-[28rpx]">
        <view class="flex items-end justify-between">
          <view>
            <view class="text-[38rpx] font-800">统计</view>
            <view class="mt-[8rpx] text-[23rpx] text-[#929aaf]">月度收支分析</view>
          </view>
          <view class="text-[23rpx] text-[#7d86a0] font-700">{{ selectedMonthText }}</view>
        </view>

        <scroll-view class="mt-[28rpx] w-full whitespace-nowrap" scroll-x :show-scrollbar="false">
          <view class="inline-flex gap-[14rpx] pr-[28rpx]">
            <view
              v-for="month in monthOptions"
              :key="month.value"
              :class="[
                'h-[62rpx] min-w-[112rpx] flex items-center justify-center rounded-[7rpx] px-[18rpx] text-[24rpx] font-700',
                selectedMonth === month.value
                  ? 'bg-[#4264f4] text-white shadow-[0_8rpx_18rpx_rgba(66,100,244,0.22)]'
                  : 'bg-white text-[#8b93aa]',
              ]"
              @click="selectMonth(month.value)"
            >
              {{ month.label }}
            </view>
          </view>
        </scroll-view>

        <view v-if="isLoading" class="mt-[28rpx] h-[560rpx] flex items-center justify-center text-[25rpx] text-[#929aaf]">
          加载中...
        </view>

        <template v-else>
          <view class="mt-[24rpx] bg-white px-[20rpx] pb-[18rpx] pt-[22rpx]">
            <view class="flex items-center justify-between px-[8rpx]">
              <view>
                <view class="text-[29rpx] font-800">收支趋势</view>
                <view class="mt-[5rpx] text-[21rpx] text-[#9ba3b7]">按账单发生日期统计</view>
              </view>
              <view class="flex items-center gap-[20rpx] text-[21rpx] text-[#778098] font-700">
                <view class="flex items-center gap-[7rpx]">
                  <view class="h-[12rpx] w-[12rpx] rounded-full bg-[#ff3f7f]" />
                  支出
                </view>
                <view class="flex items-center gap-[7rpx]">
                  <view class="h-[12rpx] w-[12rpx] rounded-full bg-[#4264f4]" />
                  收入
                </view>
              </view>
            </view>
            <view class="mt-[10rpx] h-[330rpx] w-full">
              <UChart
                type="line"
                canvas-id="statisticsTrendChart"
                :canvas2d="true"
                :animation="false"
                :ontouch="true"
                :chart-data="trendChartData"
                :opts="trendChartOpts"
              />
            </view>
          </view>

          <view class="mt-[18rpx] grid grid-cols-3 overflow-hidden bg-[#4264f4] text-white">
            <view
              v-for="metric in summaryMetrics"
              :key="metric.label"
              class="h-[116rpx] box-border border-0 border-white/12 px-[18rpx] py-[19rpx] even:border-l-[1rpx]"
            >
              <view class="truncate text-[20rpx] text-white/70">{{ metric.label }}</view>
              <view :class="['mt-[8rpx] truncate text-[27rpx] font-800', metric.color]">{{ metric.value }}</view>
            </view>
          </view>

          <view class="mt-[18rpx] bg-white pb-[18rpx]">
            <swiper
              class="h-[390rpx]"
              :current="activeCategorySlide"
              :duration="260"
              @change="handleCategorySlideChange"
            >
              <swiper-item v-for="panel in categoryPanels" :key="panel.key">
                <view class="h-full box-border px-[24rpx] pt-[24rpx]">
                  <view class="flex items-end justify-between">
                    <view>
                      <view class="text-[29rpx] font-800">{{ panel.title }}</view>
                      <view class="mt-[5rpx] text-[21rpx] text-[#9ba3b7]">{{ panel.description }}</view>
                    </view>
                    <view :class="['text-[22rpx] font-800', panel.totalClass]">{{ panel.totalText }}</view>
                  </view>

                  <view v-if="!panel.categories.length" class="h-[290rpx] flex items-center justify-center text-[24rpx] text-[#a0a7b8]">
                    {{ panel.emptyText }}
                  </view>

                  <view v-else class="mt-[22rpx] flex items-center">
                    <view class="min-w-0 flex-1 pr-[16rpx]">
                      <view
                        v-for="item in panel.categories.slice(0, 5)"
                        :key="item.id"
                        class="mb-[18rpx] flex items-center last:mb-0"
                        hover-class="bg-[#f7f8fc]"
                        @click="openCategoryDetail(panel, item)"
                      >
                        <view :class="['h-[14rpx] w-[14rpx] flex-none rounded-full', item.colorClass]" />
                        <view class="ml-[12rpx] min-w-0 flex-1 truncate text-[23rpx] text-[#606a83] font-700">{{ item.name }}</view>
                        <view class="ml-[12rpx] flex-none text-right">
                          <text class="text-[23rpx] text-[#30384e] font-800">{{ item.amountText }}</text>
                          <text class="ml-[10rpx] text-[20rpx] text-[#9ba3b7]">{{ item.ratio }}%</text>
                        </view>
                      </view>
                    </view>

                    <view class="relative h-[260rpx] w-[260rpx] flex-none">
                      <UChart
                        type="ring"
                        :canvas-id="panel.canvasId"
                        :canvas2d="true"
                        :animation="false"
                        :ontouch="false"
                        :chart-data="panel.chartData"
                        :opts="categoryChartOpts"
                      />
                      <view class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <text class="text-[21rpx] text-[#9ba3b7]">{{ panel.centerLabel }}</text>
                        <text class="mt-[4rpx] max-w-[130rpx] truncate text-[25rpx] text-[#30384e] font-800">{{ panel.compactTotal }}</text>
                      </view>
                    </view>
                  </view>
                </view>
              </swiper-item>
            </swiper>

            <view class="mt-[4rpx] flex items-center justify-center gap-[12rpx]">
              <view
                v-for="(_, index) in categoryPanels"
                :key="index"
                :class="[
                  'h-[8rpx] rounded-full transition-all duration-200',
                  activeCategorySlide === index ? 'w-[32rpx] bg-[#4264f4]' : 'w-[8rpx] bg-[#d8ddeb]',
                ]"
                @click="activeCategorySlide = index"
              />
            </view>
          </view>

          <view class="mt-[18rpx] bg-white px-[24rpx] pb-[10rpx] pt-[24rpx]">
            <view class="flex items-end justify-between">
              <view>
                <view class="text-[29rpx] font-800">{{ activeCategoryPanel.overviewTitle }}</view>
                <view class="mt-[5rpx] text-[21rpx] text-[#9ba3b7]">跟随上方分类图表切换</view>
              </view>
              <view :class="['text-[22rpx] font-800', activeCategoryPanel.totalClass]">
                {{ activeCategoryPanel.totalText }}
              </view>
            </view>

            <view v-if="!overviewItems.length" class="h-[260rpx] flex items-center justify-center text-[24rpx] text-[#a0a7b8]">
              {{ activeCategoryPanel.emptyText }}
            </view>

            <view v-else class="mt-[26rpx]">
              <view
                v-for="item in overviewItems"
                :key="item.label"
                class="mb-[30rpx] min-h-[86rpx] flex items-center last:mb-0"
                hover-class="bg-[#f7f8fc]"
                @click="openCategoryDetail(activeCategoryPanel, item.category)"
              >
                <view :class="['h-[68rpx] w-[68rpx] flex flex-none items-center justify-center rounded-full text-[27rpx] font-800', item.iconClass]">
                  {{ item.icon }}
                </view>
                <view class="ml-[16rpx] min-w-0 flex-1">
                  <view class="flex items-center justify-between text-[23rpx] font-700">
                    <text class="text-[#606a83]">{{ item.label }}</text>
                    <view class="flex items-center">
                      <text class="text-[20rpx] text-[#9ba3b7]">{{ item.ratio }}%</text>
                      <text class="ml-[16rpx]" :class="item.valueClass">{{ item.value }}</text>
                      <text class="ml-[12rpx] text-[30rpx] text-[#a0a7b8] font-300 leading-none">›</text>
                    </view>
                  </view>
                  <view class="mt-[14rpx] h-[12rpx] overflow-hidden rounded-full bg-[#edf0f8]">
                    <view :class="['h-full rounded-full', item.barClass, item.widthClass]" />
                  </view>
                </view>
              </view>
            </view>
          </view>
        </template>
      </view>
    </scroll-view>

    <TabBar :active="2" />
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { computed, ref } from "vue";
import { ApiGetCategoryList, ApiGetUserBill, type ResCategoryList, type ResUserBill } from "@/api/bill";
import TabBar from "@/components/TabBar.vue";
import UChart from "@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue";
import { parseDateTime } from "@/utils/date";

type StoredUserInfo = { id?: number };
type MonthOption = { value: string; label: string };
type CategoryStat = {
  id: number;
  name: string;
  icon: string;
  amount: number;
  amountText: string;
  ratio: number;
  color: string;
  colorClass: string;
};
type CategoryPanel = {
  key: "expense" | "income";
  title: string;
  overviewTitle: string;
  description: string;
  totalText: string;
  totalClass: string;
  compactTotal: string;
  centerLabel: string;
  emptyText: string;
  canvasId: string;
  categories: CategoryStat[];
  chartData: { series: Array<{ name: string; data: number; color: string }> };
};

const chartColors = ["#4264f4", "#64d8cb", "#ffca57", "#ff6b8f", "#8f7cf6", "#55a9f8", "#9ed766"];
const chartColorClasses = ["bg-[#4264f4]", "bg-[#64d8cb]", "bg-[#ffca57]", "bg-[#ff6b8f]", "bg-[#8f7cf6]", "bg-[#55a9f8]", "bg-[#9ed766]"];
const widthClasses = [
  "w-0", "w-[5%]", "w-[10%]", "w-[15%]", "w-[20%]", "w-[25%]",
  "w-[30%]", "w-[35%]", "w-[40%]", "w-[45%]", "w-[50%]", "w-[55%]",
  "w-[60%]", "w-[65%]", "w-[70%]", "w-[75%]", "w-[80%]", "w-[85%]",
  "w-[90%]", "w-[95%]", "w-full",
];

const formatMonthValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
const currentDate = new Date();
const selectedMonth = ref(formatMonthValue(currentDate));
const bills = ref<ResUserBill[]>([]);
const categoryList = ref<ResCategoryList[]>([]);
const activeCategorySlide = ref(0);
const isLoading = ref(false);
const isRefreshing = ref(false);
const requestId = ref(0);

const monthOptions = computed<MonthOption[]>(() =>
  Array.from({ length: 5 }, (_, index) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - (4 - index), 1);
    return {
      value: formatMonthValue(date),
      label: index === 4 ? "本月" : `${date.getMonth() + 1}月`,
    };
  }),
);
const selectedMonthText = computed(() => {
  const [year, month] = selectedMonth.value.split("-");
  return `${year}年${Number(month)}月`;
});
const selectedYear = computed(() => Number(selectedMonth.value.slice(0, 4)));
const selectedMonthIndex = computed(() => Number(selectedMonth.value.slice(5, 7)) - 1);
const daysInMonth = computed(() => new Date(selectedYear.value, selectedMonthIndex.value + 1, 0).getDate());

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
const compactMoney = (value: number) => {
  if (value >= 10000) return `¥${(value / 10000).toFixed(1)}万`;
  return `¥${formatAmount(value)}`;
};
const getWidthClass = (ratio: number) => widthClasses[Math.ceil(Math.min(100, Math.max(0, ratio)) / 5)];

const incomeTotal = computed(() => bills.value.reduce(
  (total, bill) => total + (Number(bill.type) === 1 ? getAmount(bill.amount) : 0),
  0,
));
const expenseTotal = computed(() => bills.value.reduce(
  (total, bill) => total + (Number(bill.type) === 2 ? getAmount(bill.amount) : 0),
  0,
));
const balanceTotal = computed(() => incomeTotal.value - expenseTotal.value);
const incomeBills = computed(() => bills.value.filter((bill) => Number(bill.type) === 1));
const expenseBills = computed(() => bills.value.filter((bill) => Number(bill.type) === 2));
const averageExpense = computed(() => expenseBills.value.length ? expenseTotal.value / expenseBills.value.length : 0);
const maxExpense = computed(() => expenseBills.value.reduce((max, bill) => Math.max(max, getAmount(bill.amount)), 0));

const dailyTotals = computed(() => {
  const income = Array.from({ length: daysInMonth.value }, () => 0);
  const expense = Array.from({ length: daysInMonth.value }, () => 0);
  bills.value.forEach((bill) => {
    const date = parseDateTime(bill.bill_time);
    if (Number.isNaN(date.getTime())) return;
    const index = date.getDate() - 1;
    if (index < 0 || index >= daysInMonth.value) return;
    const amount = getAmount(bill.amount);
    if (Number(bill.type) === 1) income[index] += amount;
    if (Number(bill.type) === 2) expense[index] += amount;
  });
  return { income, expense };
});

const trendChartData = computed(() => ({
  categories: Array.from({ length: daysInMonth.value }, (_, index) => `${index + 1}`),
  series: [
    { name: "支出", data: dailyTotals.value.expense.map((value) => Number(value.toFixed(2))), color: "#ff3f7f" },
    { name: "收入", data: dailyTotals.value.income.map((value) => Number(value.toFixed(2))), color: "#4264f4" },
  ],
}));
const trendChartOpts = {
  color: ["#ff3f7f", "#4264f4"],
  padding: [16, 12, 5, 8],
  dataLabel: false,
  dataPointShape: false,
  legend: { show: false },
  xAxis: {
    disableGrid: true,
    axisLineColor: "#e8ebf3",
    fontColor: "#929aaf",
    fontSize: 10,
    labelCount: 7,
    scrollShow: false,
    boundaryGap: "justify",
  },
  yAxis: {
    gridType: "dash",
    dashLength: 3,
    gridColor: "#edf0f6",
    data: [{ min: 0, fontColor: "#929aaf", fontSize: 10 }],
  },
  extra: { line: { type: "curve", width: 2, activeType: "hollow" } },
};

const buildCategoryStats = (source: ResUserBill[], total: number, type: 1 | 2): CategoryStat[] => {
  const totals = new Map<number, number>();
  source.forEach((bill) => {
    const categoryId = Number(bill.category_id);
    totals.set(categoryId, (totals.get(categoryId) || 0) + getAmount(bill.amount));
  });
  return Array.from(totals.entries())
    .map(([id, amount]) => ({ id, amount }))
    .sort((left, right) => right.amount - left.amount)
    .map((item, index) => ({
      ...item,
      name: categoryList.value.find(
        (category) => Number(category.id) === item.id && Number(category.type) === type,
      )?.name || "未分类",
      icon: String(categoryList.value.find(
        (category) => Number(category.id) === item.id && Number(category.type) === type,
      )?.icon || "￥"),
      amountText: formatMoney(item.amount),
      ratio: total > 0 ? Math.round((item.amount / total) * 100) : 0,
      color: chartColors[index % chartColors.length],
      colorClass: chartColorClasses[index % chartColorClasses.length],
    }));
};
const expenseCategories = computed(() =>
  buildCategoryStats(expenseBills.value, expenseTotal.value, 2),
);
const incomeCategories = computed(() =>
  buildCategoryStats(incomeBills.value, incomeTotal.value, 1),
);
const createCategoryChartData = (categories: CategoryStat[]) => ({
  series: categories.map((item) => ({
    name: item.name,
    data: Number(item.amount.toFixed(2)),
    color: item.color,
  })),
});
const categoryPanels = computed<CategoryPanel[]>(() => [
  {
    key: "expense",
    title: "大类支出",
    overviewTitle: "消费数据",
    description: "餐饮、购物等支出构成",
    totalText: formatMoney(expenseTotal.value),
    totalClass: "text-[#ff3f7f]",
    compactTotal: compactMoney(expenseTotal.value),
    centerLabel: "总支出",
    emptyText: "暂无支出数据",
    canvasId: "statisticsExpenseCategoryChart",
    categories: expenseCategories.value,
    chartData: createCategoryChartData(expenseCategories.value),
  },
  {
    key: "income",
    title: "主要收入",
    overviewTitle: "收益数据",
    description: "工资、礼金等收入构成",
    totalText: formatMoney(incomeTotal.value),
    totalClass: "text-[#20ae99]",
    compactTotal: compactMoney(incomeTotal.value),
    centerLabel: "总收入",
    emptyText: "暂无收入数据",
    canvasId: "statisticsIncomeCategoryChart",
    categories: incomeCategories.value,
    chartData: createCategoryChartData(incomeCategories.value),
  },
]);
const categoryChartOpts = {
  color: chartColors,
  padding: [4, 4, 4, 4],
  dataLabel: false,
  legend: { show: false },
  title: { name: "" },
  subtitle: { name: "" },
  extra: {
    ring: {
      ringWidth: 24,
      activeOpacity: 0.5,
      activeRadius: 5,
      offsetAngle: -90,
      border: true,
      borderWidth: 2,
      borderColor: "#ffffff",
    },
  },
};

const summaryMetrics = computed(() => [
  { label: "本月支出", value: formatMoney(expenseTotal.value), color: "text-white" },
  { label: "本月收入", value: formatMoney(incomeTotal.value), color: "text-[#72eadf]" },
  { label: "本月结余", value: formatMoney(balanceTotal.value), color: balanceTotal.value >= 0 ? "text-[#ffd66f]" : "text-[#ffb0c6]" },
  { label: "支出笔数", value: `${expenseBills.value.length} 笔`, color: "text-white" },
  { label: "平均支出", value: formatMoney(averageExpense.value), color: "text-white" },
  { label: "单笔最高", value: formatMoney(maxExpense.value), color: "text-white" },
]);
const activeCategoryPanel = computed(() => categoryPanels.value[activeCategorySlide.value] || categoryPanels.value[0]);
const overviewItems = computed(() => activeCategoryPanel.value.categories.map((item) => ({
  category: item,
  label: item.name,
  value: item.amountText,
  ratio: item.ratio,
  icon: item.icon,
  iconClass: activeCategorySlide.value === 0
    ? "bg-[#eef1ff] text-[#4264f4]"
    : "bg-[#fff0f5] text-[#ff3f7f]",
  valueClass: activeCategorySlide.value === 0
    ? "text-[#56627e] font-800"
    : "text-[#56627e] font-800",
  barClass: activeCategorySlide.value === 0 ? "bg-[#4264f4]" : "bg-[#ff6b93]",
  widthClass: getWidthClass(item.ratio),
})));

const openCategoryDetail = (panel: CategoryPanel, category: CategoryStat) => {
  uni.navigateTo({
    url: `/pages/category-detail/index?categoryId=${category.id}&type=${panel.key === "income" ? 1 : 2}&month=${selectedMonth.value}&name=${encodeURIComponent(category.name)}`,
  });
};

const loadStatistics = async (showLoading = true) => {
  const userId = getUserId();
  if (!userId) {
    bills.value = [];
    uni.showToast({ title: "请先登录", icon: "none" });
    return;
  }
  const currentRequestId = ++requestId.value;
  if (showLoading) isLoading.value = true;
  try {
    const [res, categoryRes] = await Promise.all([
      ApiGetUserBill({ userId, month: selectedMonth.value }),
      ApiGetCategoryList(),
    ]);
    if (currentRequestId !== requestId.value) return;
    if (res.code === 200) {
      bills.value = Array.isArray(res.data) ? res.data : [];
    } else {
      bills.value = [];
      uni.showToast({ title: "统计数据加载失败", icon: "none" });
    }
    if (categoryRes.code === 200) {
      categoryList.value = Array.isArray(categoryRes.data) ? categoryRes.data : [];
    } else {
      categoryList.value = [];
    }
  } catch {
    if (currentRequestId !== requestId.value) return;
    bills.value = [];
    uni.showToast({ title: "统计数据加载失败", icon: "none" });
  } finally {
    if (showLoading && currentRequestId === requestId.value) isLoading.value = false;
  }
};
const selectMonth = (month: string) => {
  if (month === selectedMonth.value) return;
  selectedMonth.value = month;
  loadStatistics();
};
const handleCategorySlideChange = (event: { detail: { current: number } }) => {
  activeCategorySlide.value = Number(event.detail.current) || 0;
};
const refreshStatistics = async () => {
  if (isRefreshing.value) return;
  isRefreshing.value = true;
  await loadStatistics(false);
  isRefreshing.value = false;
};

onShow(() => loadStatistics());
</script>
