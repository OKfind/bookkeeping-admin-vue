<template>
  <view class="min-h-100vh bg-[#f6f7fb]">
    <!-- 顶部蓝色渐变区域 -->
    <view
      class="relative px-[56rpx] pt-[140rpx]"
      :style="{
        height: '440rpx',
        background: 'linear-gradient(135deg, #3b5fe0, #5a7ef5, #8aa4ff)',
      }"
    >
      <view class="flex flex-col gap-[16rpx]">
        <text class="text-[48rpx] font-bold text-white">您好，</text>
        <text class="text-[40rpx] font-bold text-white">欢迎使用千贝记账</text>
      </view>
      <!-- 底部白色弧形 -->
      <view
        class="absolute left-0 right-0 bg-white"
        :style="{
          bottom: '-2rpx',
          height: '50rpx',
          borderRadius: '36rpx 36rpx 0 0',
        }"
      />
    </view>

    <!-- 白色表单卡片 -->
    <view
      class="-mt-[16rpx] mx-[32rpx] bg-white px-[48rpx] pt-[48rpx] pb-[56rpx] relative z-1"
      style="border-radius: 36rpx 36rpx 0 0"
    >
      <!-- 用户名 -->
      <view class="mb-[36rpx]">
        <text class="block text-[32rpx] font-bold text-[#333] mb-[20rpx]"
          >用户名</text
        >
        <wd-input
          v-model="username"
          placeholder="请输入您的用户名"
          :type="'text'"
          :custom-style="'border-bottom: 1rpx solid #eee'"
        />
      </view>

      <!-- 密码 -->
      <view class="mb-[24rpx]">
        <text class="block text-[32rpx] font-bold text-[#333] mb-[20rpx]"
          >密码</text
        >
        <wd-input
          v-model="password"
          placeholder="请输入您的密码"
          show-password
          :custom-style="'border-bottom: 1rpx solid #eee'"
        />
      </view>

      <!-- 记住密码 -->
      <view class="mt-[8rpx] mb-[48rpx]">
        <wd-checkbox v-model="remember" shape="square">记住密码</wd-checkbox>
      </view>

      <!-- 按钮组 -->
      <view class="flex flex-col gap-[24rpx]">
        <wd-button
          type="primary"
          size="large"
          block
          :custom-style="'border-radius: 999rpx; height: 96rpx; font-size: 34rpx; font-weight: bold'"
          @click="handleLogin"
          >登录</wd-button
        >
        <wd-button
          size="large"
          block
          :custom-style="'background: #f0f2f8; color: #333; border: none; border-radius: 999rpx; height: 96rpx; font-size: 34rpx'"
          @click="handleRegister"
          >注册</wd-button
        >
      </view>
    </view>

    <!-- 第三方登录 -->
    <view class="mt-[100rpx] px-[60rpx]">
      <view class="flex items-center gap-[24rpx]">
        <view class="flex-1 h-[1rpx] bg-[#ddd]" />
        <text class="text-[26rpx] text-[#aaa]">第三方登录</text>
        <view class="flex-1 h-[1rpx] bg-[#ddd]" />
      </view>
      <view class="flex justify-center gap-[100rpx] mt-[48rpx]">
        <view
          class="w-[100rpx] h-[100rpx] rounded-full bg-[#3b5fe0] flex items-center justify-center"
        >
          <text class="text-[24rpx] text-white">微信</text>
        </view>
        <view
          class="w-[100rpx] h-[100rpx] rounded-full bg-[#3b5fe0] flex items-center justify-center"
        >
          <text class="text-[24rpx] text-white">QQ</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
const password = ref("");
const remember = ref(false);

const handleLogin = () => {
  if (!username.value) {
    uni.showToast({ title: "请输入用户名", icon: "none" });
    return;
  }
  if (!password.value) {
    uni.showToast({ title: "请输入密码", icon: "none" });
    return;
  }
  uni.showToast({ title: "登录成功", icon: "success" });
};

const handleRegister = () => {
  uni.navigateTo({ url: "/pages/register/index" });
};
</script>
