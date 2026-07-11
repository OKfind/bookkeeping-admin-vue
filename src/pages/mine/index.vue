<template>
  <view class="page">
    <!-- 顶部用户信息区 -->
    <view class="header">
      <!-- 通知铃铛 -->
      <view class="header-bell">
        <text class="bell-icon">🔔</text>
      </view>

      <!-- 头像 + 昵称 -->
      <view class="user-info">
        <image class="avatar" src="/static/avatar.png" mode="aspectFill" />
        <view class="user-detail">
          <view class="user-name-row">
            <text class="user-name">小菜花</text>
            <text class="edit-icon">✏️</text>
          </view>
          <text class="user-desc">欢迎来到Hugo记账</text>
        </view>
      </view>

      <!-- 统计数据 -->
      <view class="stats-row">
        <view class="stat-item">
          <text class="stat-num">382</text>
          <text class="stat-label">记账总笔数</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">90</text>
          <text class="stat-label">记账总天数</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">3</text>
          <text class="stat-label">账本数量</text>
        </view>
      </view>
    </view>

    <!-- 菜单列表 -->
    <view class="menu-list">
      <view
        class="menu-item"
        v-for="(item, index) in menuList"
        :key="index"
        @click="handleMenuClick(item)"
      >
        <view class="menu-left">
          <view class="menu-icon-wrap" :style="{ background: item.bgColor }">
            <text class="menu-icon">{{ item.icon }}</text>
          </view>
          <text class="menu-title">{{ item.title }}</text>
        </view>
        <view class="menu-right">
          <text v-if="item.extra" class="menu-extra">{{ item.extra }}</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>

    <TabBar :active="3" />
  </view>
</template>

<script setup lang="ts">
import TabBar from "@/components/TabBar.vue";

const menuList = [
  { title: "协作成员", icon: "💎", bgColor: "#e8f0fe", extra: "4位协作成员" },
  { title: "邀请好友", icon: "📩", bgColor: "#fef3e0", extra: "" },
  { title: "记账提醒", icon: "⏰", bgColor: "#fce4ec", extra: "" },
  { title: "意见反馈", icon: "💬", bgColor: "#e0f7f0", extra: "" },
  { title: "关于我们", icon: "👥", bgColor: "#fce4ec", extra: "" },
  { title: "设置", icon: "⚙️", bgColor: "#f3e8ff", extra: "" },
  { title: "退出登录", icon: "🚪", bgColor: "#fee2e2", extra: "" },
];

const handleMenuClick = (item: any) => {
  if (item.title === "退出登录") {
    uni.showModal({
      title: "提示",
      content: "确定要退出登录吗？",
      confirmText: "退出",
      confirmColor: "#ef4444",
      success: (res) => {
        if (res.confirm) {
          uni.clearStorageSync();
          uni.reLaunch({ url: "/pages/login/index" });
        }
      },
    });
    return;
  }

  uni.showToast({ title: item.title, icon: "none" });
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f6f7fb;
  padding-bottom: 140rpx;
}

/* 顶部区域 */
.header {
  position: relative;
  background: linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 50%, #e8eaf6 100%);
  padding: 60rpx 32rpx 40rpx;
  padding-top: 80rpx;
}

.header-bell {
  position: absolute;
  top: 40rpx;
  right: 32rpx;
}

.bell-icon {
  font-size: 40rpx;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.user-detail {
  display: flex;
  flex-direction: column;
}

.user-name-row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.user-name {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  margin-right: 12rpx;
}

.edit-icon {
  font-size: 28rpx;
}

.user-desc {
  font-size: 24rpx;
  color: #999;
}

/* 统计行 */
.stats-row {
  display: flex;
  justify-content: space-around;
  padding: 20rpx 0 10rpx;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  font-size: 44rpx;
  font-weight: 700;
  color: #333;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 22rpx;
  color: #999;
}

/* 菜单列表 */
.menu-list {
  margin: 20rpx 20rpx 0;
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-left {
  display: flex;
  align-items: center;
}

.menu-icon-wrap {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.menu-icon {
  font-size: 32rpx;
}

.menu-title {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}

.menu-right {
  display: flex;
  align-items: center;
}

.menu-extra {
  font-size: 24rpx;
  color: #999;
  margin-right: 12rpx;
}

.menu-arrow {
  font-size: 36rpx;
  color: #ccc;
}
</style>
