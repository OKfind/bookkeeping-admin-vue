<template>
  <view class="min-h-100vh bg-[#f6f7fb] pb-[140rpx]">
    <!-- 顶部用户信息区 -->
    <view
      class="relative bg-gradient-to-br from-[#e8eaf6] via-[#f3e5f5] to-[#e8eaf6] px-[32rpx] pb-[40rpx] pt-[80rpx]"
    >
      <!-- 通知铃铛 -->
      <view class="absolute right-[32rpx] top-[40rpx]">
        <text class="text-[40rpx]">🔔</text>
      </view>

      <!-- 头像 + 昵称 -->
      <view class="mb-[40rpx] flex items-center">
        <image
          class="mr-[24rpx] h-[120rpx] w-[120rpx] flex-shrink-0 rounded-full"
          src="/static/avatar.png"
          mode="aspectFill"
        />
        <view class="flex flex-col">
          <view class="mb-[8rpx] flex items-center">
            <text class="mr-[12rpx] text-[36rpx] font-600 text-[#333]">{{ nickname }}</text>
            <text class="text-[28rpx]">✏️</text>
          </view>
          <text class="text-[24rpx] text-[#999]">欢迎来到Hugo记账</text>
        </view>
      </view>

      <!-- 统计数据 -->
      <view class="flex justify-around pb-[10rpx] pt-[20rpx]">
        <view class="flex flex-col items-center">
          <text class="mb-[8rpx] text-[44rpx] font-700 text-[#333]">382</text>
          <text class="text-[22rpx] text-[#999]">记账总笔数</text>
        </view>
        <view class="flex flex-col items-center">
          <text class="mb-[8rpx] text-[44rpx] font-700 text-[#333]">90</text>
          <text class="text-[22rpx] text-[#999]">记账总天数</text>
        </view>
        <view class="flex flex-col items-center">
          <text class="mb-[8rpx] text-[44rpx] font-700 text-[#333]">3</text>
          <text class="text-[22rpx] text-[#999]">账本数量</text>
        </view>
      </view>
    </view>

    <!-- 菜单列表 -->
    <view class="mx-[20rpx] mt-[20rpx] overflow-hidden rounded-[20rpx] bg-white">
      <view
        class="flex items-center justify-between px-[24rpx] py-[28rpx]"
        :class="{ 'border-b border-[#f0f0f0]': index !== menuList.length - 1 }"
        v-for="(item, index) in menuList"
        :key="index"
        @click="handleMenuClick(item)"
      >
        <view class="flex items-center">
          <view
            class="mr-[20rpx] flex h-[64rpx] w-[64rpx] items-center justify-center rounded-[16rpx]"
            :style="{ background: item.bgColor }"
          >
            <text class="text-[32rpx]">{{ item.icon }}</text>
          </view>
          <text class="text-[30rpx] font-500 text-[#333]">{{ item.title }}</text>
        </view>
        <view class="flex items-center">
          <text v-if="item.extra" class="mr-[12rpx] text-[24rpx] text-[#999]">
            {{ item.extra }}
          </text>
          <text class="text-[36rpx] text-[#ccc]">›</text>
        </view>
      </view>
    </view>

    <TabBar :active="3" />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import TabBar from "@/components/TabBar.vue";

const nickname = ref("暂无昵称");

const refreshUserInfo = () => {
  const userInfo = uni.getStorageSync("userInfo");
  const nextNickname =
    userInfo && typeof userInfo === "object" ? String(userInfo.nickname || "") : "";

  nickname.value = nextNickname.trim() || "暂无昵称";
};

onShow(() => {
  refreshUserInfo();
});

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
