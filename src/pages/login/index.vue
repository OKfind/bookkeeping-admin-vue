<template>
  <view class="login-page box-border min-h-screen overflow-hidden">
    <view
      class="status-space"
      :style="{ height: 'calc(var(--status-bar-height) + 32rpx)' }"
    />

    <view class="flex items-center gap-24rpx mb-42rpx safe-x">
      <view
        class="flex-center w-96rpx h-96rpx rounded-24rpx text-white text-40rpx font-bold"
        :style="{
          background: 'var(--brand-color, #22c55e)',
          boxShadow: '0 16rpx 36rpx rgba(34, 197, 94, 0.28)',
        }"
      >
        账
      </view>
      <view class="flex flex-1 min-w-0 flex-col gap-8rpx">
        <text class="text-[#1f2937] text-44rpx font-bold leading-[1.25]"
          >欢迎回来</text
        >
        <text class="text-[#6b7280] text-26rpx leading-[1.5]"
          >登录后开始记录每一笔收入与支出</text
        >
      </view>
    </view>

    <view
      class="mx-32rpx pt-40rpx px-32rpx pb-36rpx rounded-16rpx bg-white"
      :style="{
        border: '1rpx solid rgba(229, 231, 235, 0.9)',
        boxShadow: '0 18rpx 50rpx rgba(31, 41, 55, 0.08)',
      }"
    >
      <view class="flex flex-col gap-8rpx mb-28rpx">
        <text class="text-[#1f2937] text-34rpx font-bold leading-[1.3]"
          >账号登录</text
        >
        <text class="text-[#6b7280] text-24rpx">请选择一种方式继续</text>
      </view>

      <view
        class="overflow-hidden rounded-12rpx"
        :style="{ border: '1rpx solid #e5e7eb' }"
      >
        <wd-input
          v-model="form.account"
          label="账号"
          label-width="70px"
          placeholder="请输入手机号或账号"
          clearable
        />
        <wd-input
          v-model="form.password"
          label="密码"
          label-width="70px"
          placeholder="请输入密码"
          show-password
          clearable
        />
      </view>

      <view
        class="flex items-center justify-between min-h-76rpx text-[#6b7280] text-24rpx"
      >
        <wd-checkbox v-model="form.remember" shape="square"
          >记住登录</wd-checkbox
        >
        <text class="text-[#16a34a] text-24rpx">忘记密码</text>
      </view>

      <wd-button
        block
        size="large"
        :custom-style="{
          background: '#22c55e',
          borderColor: '#22c55e',
          color: '#fff',
        }"
        @click="handleAccountLogin"
      >
        登录
      </wd-button>

      <view
        class="flex items-center gap-20rpx my-30rpx text-[#9ca3af] text-24rpx"
      >
        <view class="h-1rpx flex-1" :style="{ background: '#e5e7eb' }" />
        <text>或</text>
        <view class="h-1rpx flex-1" :style="{ background: '#e5e7eb' }" />
      </view>

      <wd-button
        block
        size="large"
        plain
        :custom-style="{
          color: '#16a34a',
          borderColor: '#22c55e',
          background: '#fff',
        }"
        @click="handleWechatLogin"
      >
        微信一键登录
      </wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const form = reactive({
  account: "",
  password: "",
  remember: true,
});

function handleAccountLogin() {
  if (!form.account.trim()) {
    uni.showToast({
      title: "请输入账号",
      icon: "none",
    });
    return;
  }
  if (!form.password) {
    uni.showToast({
      title: "请输入密码",
      icon: "none",
    });
    return;
  }

  uni.showToast({
    title: "登录成功",
    icon: "success",
  });
}

function handleWechatLogin() {
  uni.showLoading({
    title: "微信授权中...",
  });

  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: "微信登录成功",
      icon: "success",
    });
  }, 1500);
}
</script>
