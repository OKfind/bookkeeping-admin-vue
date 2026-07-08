<template>
  <view class="min-h-100vh bg-[#f6f7fb]">
    <!-- 顶部蓝色区域 -->
    <view
      class="h-[200rpx] bg-gradient-to-br from-[#4a6cf7] via-[#6c8cff] to-[#a8b8ff] flex items-end px-[60rpx] pb-[30rpx]"
    >
      <text class="text-[40rpx] font-bold text-white">注册账号</text>
    </view>

    <!-- 白色表单卡片 -->
    <view
      class="-mt-[20rpx] mx-[30rpx] bg-white rounded-[24rpx] p-[40rpx] relative z-1"
    >
      <!-- 手机号 -->
      <view class="mb-[30rpx]">
        <text class="block text-[30rpx] font-bold text-[#333] mb-[16rpx]"
          >手机号</text
        >
        <wd-input
          v-model="phone"
          placeholder="请输入您的手机号"
          type="number"
          :maxlength="11"
          :custom-style="'border-bottom: 1rpx solid #eee'"
        />
      </view>

      <!-- 密码 -->
      <view class="mb-[30rpx]">
        <text class="block text-[30rpx] font-bold text-[#333] mb-[16rpx]"
          >密码</text
        >
        <wd-input
          v-model="password"
          placeholder="请设置密码（6-20位）"
          show-password
          :custom-style="'border-bottom: 1rpx solid #eee'"
        />
      </view>

      <!-- 确认密码 -->
      <view class="mb-[30rpx]">
        <text class="block text-[30rpx] font-bold text-[#333] mb-[16rpx]"
          >确认密码</text
        >
        <wd-input
          v-model="confirmPassword"
          placeholder="请再次输入密码"
          show-password
          :custom-style="'border-bottom: 1rpx solid #eee'"
        />
      </view>

      <view class="mt-[40rpx]">
        <wd-button type="primary" size="large" block @click="handleRegister"
          >注册</wd-button
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const phone = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegister = () => {
  if (!phone.value) {
    uni.showToast({ title: "请输入手机号", icon: "none" });
    return;
  }
  if (password.value.length < 6) {
    uni.showToast({ title: "密码至少6位", icon: "none" });
    return;
  }
  if (password.value !== confirmPassword.value) {
    uni.showToast({ title: "两次密码不一致", icon: "none" });
    return;
  }
  uni.showToast({ title: "注册成功", icon: "success" });
  setTimeout(() => {
    uni.navigateBack();
  }, 1500);
};
</script>
