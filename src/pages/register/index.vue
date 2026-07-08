<template>
  <view class="min-h-100vh bg-[#f6f7fb] flex flex-col">
    <!-- 顶部蓝色渐变区域 -->
    <view
      class="relative px-[56rpx]"
      :style="{
        height: '540rpx',
        background: 'linear-gradient(135deg, #3b5fe0, #5a7ef5, #8aa4ff)',
      }"
    >
      <view class="flex flex-col pt-[120rpx]">
        <view
          class="w-[88rpx] h-[88rpx] rounded-[20rpx] bg-white/20 flex items-center justify-center mb-[24rpx]"
        >
          <text class="text-[48rpx]">📝</text>
        </view>
        <text class="text-[52rpx] font-bold text-white">注册账号</text>
        <text class="text-[40rpx] font-bold text-white mt-[8rpx]"
          >加入Hugo记账</text
        >
        <text class="text-[28rpx] text-white/70 mt-[16rpx]"
          >轻松记录，智能管理</text
        >
      </view>
      <!-- 底部白色弧形 -->
      <view
        class="absolute left-0 right-0 bg-white"
        :style="{
          bottom: '0',
          height: '60rpx',
          borderRadius: '40rpx 40rpx 0 0',
        }"
      />
    </view>

    <!-- 白色表单卡片 -->
    <view
      class="-mt-[120rpx] mx-[32rpx] bg-white px-[44rpx] pt-[44rpx] pb-[40rpx] relative z-1"
      style="
        border-radius: 40rpx;
        box-shadow: 0 4rpx 40rpx rgba(0, 0, 0, 0.06);
        border: 1rpx solid rgba(0, 0, 0, 0.03);
      "
    >
      <!-- 手机号 -->
      <view class="mb-[32rpx]">
        <text class="block text-[30rpx] font-bold text-[#333] mb-[16rpx]"
          >手机号</text
        >
        <wd-input
          v-model="phone"
          placeholder="请输入您的手机号"
          :type="'number'"
          :maxlength="11"
          center
          no-border
          :custom-style="'height: 88rpx; background: #f7f8fc; border-radius: 16rpx; padding: 0 20rpx'"
        >
          <template #prefix>
            <text
              style="font-size: 32rpx; line-height: 88rpx; margin-right: 12rpx"
              >📱</text
            >
          </template>
        </wd-input>
      </view>

      <!-- 密码 -->
      <view class="mb-[24rpx]">
        <text class="block text-[30rpx] font-bold text-[#333] mb-[16rpx]"
          >密码</text
        >
        <wd-input
          v-model="password"
          placeholder="请设置密码（6-20位）"
          show-password
          center
          no-border
          :custom-style="'height: 88rpx; background: #f7f8fc; border-radius: 16rpx; padding: 0 20rpx'"
        >
          <template #prefix>
            <text
              style="font-size: 32rpx; line-height: 88rpx; margin-right: 12rpx"
              >🔒</text
            >
          </template>
        </wd-input>
      </view>

      <!-- 确认密码 -->
      <view class="mb-[32rpx]">
        <text class="block text-[30rpx] font-bold text-[#333] mb-[16rpx]"
          >确认密码</text
        >
        <wd-input
          v-model="confirmPassword"
          placeholder="请再次输入密码"
          show-password
          center
          no-border
          :custom-style="'height: 88rpx; background: #f7f8fc; border-radius: 16rpx; padding: 0 20rpx'"
        >
          <template #prefix>
            <text
              style="font-size: 32rpx; line-height: 88rpx; margin-right: 12rpx"
              >🔐</text
            >
          </template>
        </wd-input>
      </view>

      <!-- 注册按钮 -->
      <wd-button
        type="primary"
        size="large"
        block
        :custom-style="'border-radius: 999rpx; height: 96rpx; font-size: 34rpx; font-weight: bold; box-shadow: 0 8rpx 32rpx rgba(59, 95, 224, 0.3)'"
        @click="handleRegister"
        >注 册</wd-button
      >

      <!-- 去登录 -->
      <view class="flex justify-center mt-[32rpx]">
        <text class="text-[26rpx] text-[#999]">已有账号？</text>
        <text
          class="text-[26rpx] text-[#3b5fe0] font-bold ml-[8rpx]"
          @click="handleGoLogin"
          >去登录</text
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

const handleGoLogin = () => {
  uni.navigateBack();
};
</script>
