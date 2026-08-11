<template>
  <view class="h-100vh overflow-hidden bg-[#f6f7fb] text-[#252a34]">
    <scroll-view class="h-full" scroll-y :show-scrollbar="false">
      <view
        class="box-border px-[32rpx] pb-[calc(160rpx+env(safe-area-inset-bottom))] pt-[30rpx]"
      >
        <view>
          <view class="text-[38rpx] font-600">统计</view>
          <view class="mt-[10rpx] text-[24rpx] text-[#8b93a4]">
            近 7 日收支趋势
          </view>
        </view>

        <view
          class="mt-[30rpx] rounded-[8rpx] bg-white px-[24rpx] pb-[20rpx] pt-[26rpx]"
        >
          <view class="flex items-center justify-between px-[8rpx]">
            <view>
              <view class="text-[30rpx] font-600">收支趋势</view>
              <view class="mt-[8rpx] text-[22rpx] text-[#9aa1af]">
                近 7 日演示数据
              </view>
            </view>
            <view
              class="flex items-center gap-[22rpx] text-[22rpx] text-[#6f7785]"
            >
              <view class="flex items-center gap-[8rpx]">
                <view
                  class="h-[12rpx] w-[12rpx] rounded-full bg-[#ef5b5b]"
                />
                支出
              </view>
              <view class="flex items-center gap-[8rpx]">
                <view
                  class="h-[12rpx] w-[12rpx] rounded-full bg-[#22a06b]"
                />
                收入
              </view>
            </view>
          </view>

          <view class="mt-[12rpx] h-[420rpx] w-full">
            <UChart
              type="line"
              canvas-id="statisticsTrendChart"
              :canvas2d="true"
              :animation="false"
              :ontouch="true"
              :chart-data="chartData"
              :opts="chartOpts"
            />
          </view>
        </view>
      </view>
    </scroll-view>
    <TabBar :active="2" />
  </view>
</template>

<script setup lang="ts">
import TabBar from "@/components/TabBar.vue";
import UChart from "@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue";

const expenseData = [86, 132, 78, 164, 118, 205, 96];
const incomeData = [0, 360, 0, 0, 260, 0, 420];

const recentDateLabels = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - index));
  return `${date.getMonth() + 1}/${date.getDate()}`;
});

const chartData = {
  categories: recentDateLabels,
  series: [
    { name: "支出", data: expenseData, color: "#ef5b5b" },
    { name: "收入", data: incomeData, color: "#22a06b" },
  ],
};

const chartOpts = {
  color: ["#ef5b5b", "#22a06b"],
  padding: [14, 12, 8, 4],
  dataLabel: false,
  dataPointShape: true,
  legend: { show: false },
  xAxis: {
    disableGrid: true,
    axisLineColor: "#e7eaf0",
    fontColor: "#8b93a4",
    fontSize: 11,
    boundaryGap: "justify",
  },
  yAxis: {
    gridType: "dash",
    dashLength: 4,
    gridColor: "#edf0f5",
    data: [{ min: 0, fontColor: "#8b93a4", fontSize: 11 }],
  },
  extra: {
    line: { type: "curve", width: 2, activeType: "hollow" },
  },
};
</script>
