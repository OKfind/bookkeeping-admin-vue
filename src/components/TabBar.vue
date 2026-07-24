<template>
  <view class="tabbar">
    <view class="tabbar-item" @click="switchTab('/pages/index/index', 0)">
      <view :class="['tabbar-icon', active === 0 ? 'tabbar-icon-active' : '']">
        <text class="icon-text">{{ active === 0 ? "🏠" : "🛖" }}</text>
      </view>
      <text :class="['tabbar-text', active === 0 ? 'tabbar-text-active' : '']"
        >首页</text
      >
    </view>
    <view class="tabbar-item" @click="switchTab('/pages/flow/index', 1)">
      <view :class="['tabbar-icon', active === 1 ? 'tabbar-icon-active' : '']">
        <text class="icon-text">{{ active === 1 ? "🀄️" : "📋" }}</text>
      </view>
      <text :class="['tabbar-text', active === 1 ? 'tabbar-text-active' : '']"
        >流水</text
      >
    </view>

    <view class="tabbar-center" @click="handleAdd">
      <view class="tabbar-add-btn">
        <text class="add-icon">+</text>
      </view>
    </view>

    <view class="tabbar-item" @click="switchTab('/pages/statistics/index', 2)">
      <view :class="['tabbar-icon', active === 2 ? 'tabbar-icon-active' : '']">
        <text class="icon-text">{{ active === 2 ? "📒" : "📊" }}</text>
      </view>
      <text :class="['tabbar-text', active === 2 ? 'tabbar-text-active' : '']"
        >统计</text
      >
    </view>
    <view class="tabbar-item" @click="switchTab('/pages/mine/index', 3)">
      <view :class="['tabbar-icon', active === 3 ? 'tabbar-icon-active' : '']">
        <text class="icon-text">{{ active === 3 ? "🙋🏻‍♂️" : "🙅🏻‍♂️" }}</text>
      </view>
      <text :class="['tabbar-text', active === 3 ? 'tabbar-text-active' : '']"
        >我的</text
      >
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{ active: number }>();
const switchTab = (url: string, index: number) => {
  if (props.active === index) return;
  uni.switchTab({ url });
};
const handleAdd = () => {
  uni.navigateTo({ url: "/pages/bookkeeping/index" });
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 112rpx;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.04);
  z-index: 999;
}

/* 顶部中间切一个下凹的半圆（门洞），颜色=页面背景 */
.tabbar::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 170rpx;
  height: 85rpx;
  background: #f4f6ff;
  border-radius: 0 0 85rpx 85rpx;
  z-index: 1;
}

.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 8rpx;
  position: relative;
  z-index: 2;
}

.tabbar-icon {
  min-width: 48rpx;
  height: 44rpx;
  padding: 0 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rpx;
  border-radius: 10rpx;
  color: #c8cce4;
}

.tabbar-icon-active {
  color: #ffffff;
  background: linear-gradient(135deg, #3e5eff, #6d85ff);
  box-shadow: 0 4rpx 12rpx rgba(63, 94, 255, 0.28);
}

.icon-text {
  font-size: 34rpx;
  line-height: 1;
  font-weight: 700;
}

.tabbar-text {
  font-size: 22rpx;
  color: #c1c6de;
  line-height: 1;
  font-weight: 700;
}

.tabbar-text-active {
  color: #2854ff;
}

.tabbar-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  padding-bottom: 90rpx;
}

.tabbar-add-btn {
  width: 104rpx;
  height: 104rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff3f80, #ff5b91);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6rpx 24rpx rgba(245, 108, 108, 0.4);
}

.add-icon {
  font-size: 56rpx;
  color: #ffffff;
  line-height: 1;
  font-weight: 300;
  margin-top: -4rpx;
}
</style>
