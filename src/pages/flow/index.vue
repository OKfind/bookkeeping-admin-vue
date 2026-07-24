<template>
  <view class="h-100vh overflow-hidden bg-[#f4f6ff] text-[#4c5574]">
    <view class="px-[30rpx] pb-[28rpx]">
      <view class="h-[calc(var(--status-bar-height)+42rpx)]" />
      <view class="h-[48rpx] flex items-center justify-between">
        <view class="flex items-center text-[32rpx] text-[#32384a] font-700">
          <text>全部类型</text>
          <text class="ml-[14rpx] text-[42rpx] text-[#4f5668] font-400 leading-none">›</text>
        </view>
        <view class="relative h-[44rpx] w-[44rpx]">
          <view class="absolute left-[8rpx] top-[9rpx] h-[19rpx] w-[19rpx] border-[4rpx] border-[#263042] rounded-full" />
          <view class="absolute left-[29rpx] top-[30rpx] h-[4rpx] w-[16rpx] origin-left rotate-45 rounded-[2rpx] bg-[#263042]" />
        </view>
      </view>

      <wd-datetime-picker v-model="selectedMonthTime" type="year-month" root-portal @open="monthPickerOpen = true" @close="monthPickerOpen = false" @confirm="monthPickerOpen = false" @cancel="monthPickerOpen = false">
        <view
          :class="[
            'mt-[36rpx] h-[50rpx] w-[166rpx] flex items-center justify-center gap-[8rpx] rounded-[5rpx] text-[24rpx] text-[#1652ff] transition-all duration-150 active:scale-96',
            monthPickerOpen ? 'bg-[#cfdcff] shadow-[0_6rpx_14rpx_rgba(22,82,255,0.16)]' : 'bg-[#dfe7ff]',
          ]"
          hover-class="opacity-75"
          hover-start-time="0"
          hover-stay-time="80"
        >
          <text class="h-[30rpx] leading-[30rpx]">{{ selectedMonth }}</text>
          <view :class="['relative h-[18rpx] w-[18rpx] flex-none transition-transform duration-150', monthPickerOpen ? 'rotate-180' : '']">
            <view class="absolute left-[2rpx] top-[8rpx] h-[3rpx] w-[9rpx] rotate-45 rounded-[2rpx] bg-[#1652ff]" />
            <view class="absolute right-[2rpx] top-[8rpx] h-[3rpx] w-[9rpx] -rotate-45 rounded-[2rpx] bg-[#1652ff]" />
          </view>
        </view>
      </wd-datetime-picker>

      <view class="mt-[30rpx] grid grid-cols-2 gap-[24rpx]">
        <view class="relative h-[146rpx] overflow-hidden rounded-[7rpx] bg-[linear-gradient(135deg,#2f5aff_0%,#6687ff_100%)] shadow-[0_8rpx_16rpx_rgba(60,91,245,0.2)]">
          <view class="absolute right-[-30rpx] top-[-26rpx] h-[108rpx] w-[108rpx] rotate-45 border-l-[2rpx] border-l-white/32 bg-white/12" />
          <view class="relative z-1 h-full flex items-center px-[32rpx] text-white">
            <view class="relative mr-[18rpx] h-[46rpx] w-[52rpx]">
              <view class="absolute left-[2rpx] top-[1rpx] h-[10rpx] w-[48rpx] rounded-t-[8rpx] rounded-b-[2rpx] bg-white" />
              <view class="absolute bottom-0 left-0 h-[28rpx] w-[52rpx] box-border border-[4rpx] border-white rounded-[6rpx]">
                <view class="absolute left-[12rpx] top-[-4rpx] h-[28rpx] w-[4rpx] bg-white" />
                <view class="absolute right-[8rpx] top-[8rpx] h-[7rpx] w-[7rpx] rounded-full bg-white" />
              </view>
            </view>
            <view>
              <view class="text-[35rpx] font-700 leading-[42rpx]">130295.85</view>
              <view class="mt-[8rpx] text-[19rpx] text-white/92 font-700">本月总支出（元）</view>
            </view>
          </view>
        </view>

        <view class="relative h-[146rpx] overflow-hidden rounded-[7rpx] bg-[linear-gradient(135deg,#ff3f80_0%,#ff75a5_100%)] shadow-[0_8rpx_16rpx_rgba(255,63,128,0.22)]">
          <view class="absolute right-[-30rpx] top-[-26rpx] h-[108rpx] w-[108rpx] rotate-45 border-l-[2rpx] border-l-white/32 bg-white/12" />
          <view class="relative z-1 h-full flex items-center px-[32rpx] text-white">
            <view class="relative mr-[18rpx] h-[46rpx] w-[52rpx]">
              <view class="absolute left-[2rpx] top-[1rpx] h-[10rpx] w-[48rpx] rounded-t-[8rpx] rounded-b-[2rpx] bg-white" />
              <view class="absolute bottom-0 left-0 h-[28rpx] w-[52rpx] box-border border-[4rpx] border-white rounded-[6rpx]">
                <view class="absolute left-[27rpx] top-[-4rpx] h-[28rpx] w-[4rpx] bg-white" />
                <view class="absolute right-[8rpx] top-[8rpx] h-[7rpx] w-[7rpx] rounded-full bg-white" />
              </view>
            </view>
            <view>
              <view class="text-[35rpx] font-700 leading-[42rpx]">4865.46</view>
              <view class="mt-[8rpx] text-[19rpx] text-white/92 font-700">本月总收入（元）</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <scroll-view class="h-[calc(100vh-332rpx)] box-border pb-[calc(140rpx+env(safe-area-inset-bottom))]" scroll-y :show-scrollbar="false">
      <view v-for="(group, groupIndex) in flowGroups" :key="group.label" :class="['bg-white pt-[30rpx]', groupIndex === 0 ? '' : 'border-0 border-t-[12rpx] border-t-[#f2f4fd]']">
        <view class="flex items-baseline justify-between px-[30rpx] pb-[12rpx]">
          <view class="flex items-baseline">
            <text class="text-[30rpx] text-[#58617e] font-800">{{ group.label }}</text>
            <text class="ml-[16rpx] text-[22rpx] text-[#9aa1b3] font-700">{{ group.date }}</text>
          </view>
          <view class="flex gap-[26rpx] text-[21rpx] text-[#7b849e] font-700">
            <text>支：{{ group.expense }}</text>
            <text>收：{{ group.income }}</text>
          </view>
        </view>

        <view class="bg-white">
          <view
            v-for="(item, itemIndex) in group.items"
            :key="`${group.label}-${item.title}-${item.time}`"
            :class="['ml-[30rpx] h-[146rpx] flex items-center pr-[30rpx]', itemIndex === group.items.length - 1 ? '' : 'border-0 border-b-[1rpx] border-b-[#e7e9f0]']"
          >
            <view :class="['h-[88rpx] w-[88rpx] flex flex-none items-center justify-center rounded-full text-[34rpx] font-700', item.type === 'income' ? 'bg-[#fff0f5] text-[#ff2f75]' : 'bg-[#eef2ff] text-[#3d5dff]']">
              <text>{{ item.icon }}</text>
            </view>
            <view class="ml-[22rpx] min-w-0 flex-1">
              <view class="text-[30rpx] text-[#59617d] font-800 leading-[38rpx]">{{ item.title }}</view>
              <view class="mt-[6rpx] text-[23rpx] text-[#a0a7b8] font-600">{{ item.time }}　{{ item.pay }}</view>
            </view>
            <view :class="['ml-[20rpx] flex-none text-[38rpx] font-800 leading-none', item.type === 'income' ? 'text-[#ff2f75]' : 'text-[#535b78]']">
              {{ item.amount }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <TabBar :active="1" />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import TabBar from "@/components/TabBar.vue";

type FlowItem = {
  title: string;
  time: string;
  pay: string;
  amount: string;
  icon: string;
  type: "income" | "expense";
};

type FlowGroup = {
  label: string;
  date: string;
  expense: string;
  income: string;
  items: FlowItem[];
};

const selectedMonthTime = ref(new Date(2026, 11, 1).getTime());
const monthPickerOpen = ref(false);
const selectedMonth = computed(() => {
  const date = new Date(selectedMonthTime.value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
});

const flowGroups: FlowGroup[] = [
  {
    label: "今天",
    date: "12月19日",
    expense: "390.29",
    income: "8.66",
    items: [
      { title: "公共交通", time: "18:39", pay: "微信支付", amount: "-12.00", icon: "▣", type: "expense" },
      { title: "收益", time: "09:45", pay: "支付宝", amount: "+8.66", icon: "↗", type: "income" },
      { title: "餐饮", time: "10:02", pay: "微信支付", amount: "-29.50", icon: "♧", type: "expense" },
    ],
  },
  {
    label: "昨天",
    date: "12月18日",
    expense: "1696.23",
    income: "8.66",
    items: [
      { title: "购物", time: "18:39", pay: "微信支付", amount: "-520.00", icon: "□", type: "expense" },
      { title: "收益", time: "09:45", pay: "支付宝", amount: "+8.66", icon: "↗", type: "income" },
      { title: "住房", time: "08:20", pay: "储蓄卡", amount: "-1176.23", icon: "⌂", type: "expense" },
    ],
  },
];
</script>
