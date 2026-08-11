<template>
  <view class="h-100vh overflow-hidden bg-[#f6f7fb] text-[#252a34]">
    <scroll-view class="h-full" scroll-y :show-scrollbar="false">
      <view
        class="box-border px-[32rpx] pb-[calc(160rpx+env(safe-area-inset-bottom))] pt-[30rpx]"
      >
        <view class="flex items-end justify-between">
          <view>
            <view class="text-[38rpx] font-600">账本概览</view>
            <view class="mt-[10rpx] text-[24rpx] text-[#8b93a4]">
              {{ currentDate }}
            </view>
          </view>
          <view
            class="rounded-[6rpx] bg-[#e7ecff] px-[16rpx] py-[8rpx] text-[22rpx] text-[#3458f5]"
          >
            近 7 日
          </view>
        </view>

        <view
          class="mt-[30rpx] rounded-[8rpx] bg-[#3458f5] px-[34rpx] py-[30rpx] text-white"
        >
          <view class="text-[23rpx] text-white/70">本周结余</view>
          <view class="mt-[8rpx] text-[48rpx] font-600">
            ¥ {{ weeklyBalance }}
          </view>
          <view class="mt-[28rpx] h-[1rpx] bg-white/18" />
          <view class="mt-[24rpx] flex">
            <view class="w-1/2">
              <view class="text-[22rpx] text-white/65">总支出</view>
              <view class="mt-[8rpx] text-[29rpx] font-600">
                ¥ {{ totalExpense }}
              </view>
            </view>
            <view
              class="w-1/2 border-0 border-l-[1rpx] border-l-white/18 pl-[34rpx]"
            >
              <view class="text-[22rpx] text-white/65">总收入</view>
              <view class="mt-[8rpx] text-[29rpx] font-600">
                ¥ {{ totalIncome }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <TabBar :active="0" />
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import TabBar from "@/components/TabBar.vue";

const expenseData = [86, 132, 78, 164, 118, 205, 96];
const incomeData = [0, 360, 0, 0, 260, 0, 420];

const sum = (values: number[]) =>
  values.reduce((total, value) => total + value, 0);
const formatAmount = (value: number) => value.toFixed(2);

const totalExpense = computed(() => formatAmount(sum(expenseData)));
const totalIncome = computed(() => formatAmount(sum(incomeData)));
const weeklyBalance = computed(() =>
  formatAmount(sum(incomeData) - sum(expenseData)),
);
const currentDate = computed(() => {
  const date = new Date();
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
});
</script>
