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
      <!-- logo和欢迎文字 -->
      <view class="flex flex-col pt-[100rpx]">
        <view
          class="w-[88rpx] h-[88rpx] rounded-[20rpx] bg-white/20 flex items-center justify-center mb-[24rpx]"
        >
          <text class="text-[48rpx]">📒</text>
        </view>
        <text class="text-[52rpx] font-bold text-white">您好，</text>
        <text class="text-[40rpx] font-bold text-white mt-[8rpx]"
          >欢迎使用Hugo记账</text
        >
        <text class="text-[28rpx] text-white/70 mt-[16rpx]"
          >记录每一笔，生活更清晰</text
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
      <!-- 用户名 -->
      <view class="mb-[32rpx]">
        <text class="block text-[30rpx] font-bold text-[#333] mb-[16rpx]"
          >用户名</text
        >
        <wd-input
          v-model="username"
          placeholder="请输入您的用户名"
          :type="'text'"
          center
          no-border
          :custom-style="'height: 88rpx; background: #f7f8fc; border-radius: 16rpx; padding: 0 20rpx'"
        >
          <template #prefix>
            <text
              style="font-size: 32rpx; line-height: 88rpx; margin-right: 12rpx"
              >👤</text
            >
          </template>
        </wd-input>
      </view>

      <!-- 密码 -->
      <view class="mb-[20rpx]">
        <text class="block text-[30rpx] font-bold text-[#333] mb-[16rpx]"
          >密码</text
        >
        <wd-input
          v-model="password"
          placeholder="请输入您的密码"
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

      <!-- 忘记密码和记住密码 -->
      <view class="flex items-center justify-between mt-[12rpx] mb-[48rpx]">
        <wd-checkbox
          v-model="remember"
          shape="square"
          custom-class="text-[26rpx]"
          >记住密码</wd-checkbox
        >
        <text class="text-[26rpx] text-[#3b5fe0]" @click="handleForgotPassword"
          >忘记密码？</text
        >
      </view>

      <!-- 登录按钮 -->
      <wd-button
        type="primary"
        size="large"
        block
        :custom-style="'border-radius: 999rpx; height: 96rpx; font-size: 34rpx; font-weight: bold; box-shadow: 0 8rpx 32rpx rgba(59, 95, 224, 0.3)'"
        @click="handleLogin"
        >登 录</wd-button
      >

      <!-- 注册 -->
      <view class="flex justify-center mt-[32rpx]">
        <text class="text-[26rpx] text-[#999]">还没有账号？</text>
        <text
          class="text-[26rpx] text-[#3b5fe0] font-bold ml-[8rpx]"
          @click="handleRegister"
          >立即注册</text
        >
      </view>
    </view>

    <!-- 第三方登录 -->
    <view
      class="mt-[80rpx] px-[60rpx] flex-1 flex flex-col justify-end pb-[60rpx]"
    >
      <view class="flex items-center gap-[24rpx]">
        <view class="flex-1 h-[1rpx] bg-[#e0e0e0]" />
        <text class="text-[24rpx] text-[#bbb]">其他登录方式</text>
        <view class="flex-1 h-[1rpx] bg-[#e0e0e0]" />
      </view>
      <view class="flex justify-center mt-[36rpx]">
        <view
          class="w-[96rpx] h-[96rpx] rounded-full bg-[#07c160] flex items-center justify-center"
          hover-class="opacity-80"
          @click="handleWechatLogin"
        >
          <text class="text-[44rpx]">💬</text>
        </view>
      </view>
      <text class="text-[24rpx] text-[#bbb] text-center mt-[16rpx]"
        >微信一键登录</text
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ApiPostUserLogin, ApiGetUserInfo, ApiPostWxLogin } from "@/api/user";

const username = ref("");
const password = ref("");
const remember = ref(false);

const handleLogin = async () => {
  if (!username.value) {
    uni.showToast({ title: "请输入用户名", icon: "none" });
    return;
  }
  if (!password.value) {
    uni.showToast({ title: "请输入密码", icon: "none" });
    return;
  }

  uni.showLoading({ title: "登录中..." });
  try {
    const res = await ApiPostUserLogin({
      username: username.value,
      password: password.value,
    });
    if (res.code === 200) {
      uni.setStorageSync("token", res.data.token);

      // 获取用户基本信息
      const userRes = await ApiGetUserInfo();
      if (userRes.code === 200) {
        uni.setStorageSync("userInfo", userRes.data);
      }

      uni.hideLoading();
      uni.showToast({ title: "登录成功", icon: "success" });
      setTimeout(() => {
        uni.reLaunch({ url: "/pages/index/index" });
      }, 1500);
    } else {
      uni.hideLoading();
      uni.showToast({
        title: res.message || res.msg || "登录失败",
        icon: "none",
      });
    }
  } catch (err) {
    uni.hideLoading();
    uni.showToast({ title: "网络异常，请稍后重试", icon: "none" });
  }
};

const handleRegister = () => {
  uni.navigateTo({ url: "/pages/register/index" });
};

const handleForgotPassword = () => {
  uni.showToast({ title: "请联系管理员重置密码", icon: "none" });
};

const handleWechatLogin = () => {
  uni.showLoading({ title: "登录中..." });
  uni.login({
    success: async (loginRes) => {
      try {
        const res = await ApiPostWxLogin(loginRes.code);
        if (res.code === 200) {
          uni.setStorageSync("token", res.data.token);
          const userRes = await ApiGetUserInfo();
          if (userRes.code === 200) {
            uni.setStorageSync("userInfo", userRes.data);
          }
          uni.hideLoading();
          uni.showToast({ title: "登录成功", icon: "success" });
          setTimeout(() => {
            uni.reLaunch({ url: "/pages/index/index" });
          }, 1500);
        } else {
          uni.hideLoading();
          uni.showToast({
            title: res.message || res.msg || "登录失败",
            icon: "none",
          });
        }
      } catch (err) {
        uni.hideLoading();
        uni.showToast({ title: "网络异常，请稍后重试", icon: "none" });
      }
    },
    fail: () => {
      uni.hideLoading();
      uni.showToast({ title: "微信登录失败", icon: "none" });
    },
  });
};
</script>
