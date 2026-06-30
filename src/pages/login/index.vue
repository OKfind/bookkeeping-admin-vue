<template>
  <view class="login-page page-fill">
    <view class="status-space" />

    <view class="login-hero safe-x">
      <view class="brand-mark flex-center">账</view>
      <view class="hero-copy">
        <text class="title">欢迎回来</text>
        <text class="subtitle">登录后开始记录每一笔收入与支出</text>
      </view>
    </view>

    <view class="login-panel">
      <view class="panel-header">
        <text class="panel-title">账号登录</text>
        <text class="panel-subtitle">请选择一种方式继续</text>
      </view>

      <view class="form-body">
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

      <view class="form-options">
        <wd-checkbox v-model="form.remember" shape="square">记住登录</wd-checkbox>
        <text class="link-text">忘记密码</text>
      </view>

      <wd-button
        custom-class="login-button"
        block
        size="large"
        @click="handleAccountLogin"
      >
        登录
      </wd-button>

      <view class="divider">
        <view class="line" />
        <text>或</text>
        <view class="line" />
      </view>

      <wd-button
        custom-class="wechat-button"
        block
        size="large"
        plain
        @click="handleWechatLogin"
      >
        微信一键登录
      </wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  account: '',
  password: '',
  remember: true,
})

function handleAccountLogin() {
  if (!form.account.trim()) {
    uni.showToast({
      title: '请输入账号',
      icon: 'none',
    })
    return
  }
  if (!form.password) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none',
    })
    return
  }

  uni.showToast({
    title: '登录成功',
    icon: 'success',
  })
}

function handleWechatLogin() {
  uni.showLoading({
    title: '微信授权中...',
  })

  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '微信登录成功',
      icon: 'success',
    })
  }, 1500)
}
</script>

<style lang="scss">
$brand-color: #22c55e;
$brand-deep: #16a34a;
$brand-soft: #dcfce7;
$page-bg: #f6f7fb;
$surface-color: #ffffff;
$text-primary: #1f2937;
$text-secondary: #6b7280;
$border-color: #e5e7eb;
$shadow-soft: 0 18rpx 50rpx rgba(31, 41, 55, 0.08);

.login-page {
  box-sizing: border-box;
  min-height: 100vh;
  overflow: hidden;
}

.status-space {
  height: calc(var(--status-bar-height) + 32rpx);
}

.login-hero {
  display: flex;
  align-items: center;
  gap: 24rpx;
  margin-bottom: 42rpx;
  padding: 0 32rpx;
}

.brand-mark {
  width: 96rpx;
  height: 96rpx;
  border-radius: 24rpx;
  background: $brand-color;
  color: #fff;
  font-size: 40rpx;
  font-weight: 700;
  box-shadow: 0 16rpx 36rpx rgba(34, 197, 94, 0.28);
}

.hero-copy {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 8rpx;
}

.title {
  color: $text-primary;
  font-size: 44rpx;
  font-weight: 700;
  line-height: 1.25;
}

.subtitle {
  color: $text-secondary;
  font-size: 26rpx;
  line-height: 1.5;
}

.login-panel {
  margin: 0 32rpx;
  padding: 40rpx 32rpx 36rpx;
  border: 1rpx solid rgba(229, 231, 235, 0.9);
  border-radius: 16rpx;
  background: $surface-color;
  box-shadow: $shadow-soft;
}

.panel-header {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  margin-bottom: 28rpx;
}

.panel-title {
  color: $text-primary;
  font-size: 34rpx;
  font-weight: 700;
  line-height: 1.3;
}

.panel-subtitle {
  color: $text-secondary;
  font-size: 24rpx;
}

.form-body {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1rpx solid $border-color;
  border-radius: 12rpx;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76rpx;
  color: $text-secondary;
  font-size: 24rpx;
}

.link-text {
  color: $brand-deep;
  font-size: 24rpx;
}

.divider {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin: 30rpx 0;
  color: #9ca3af;
  font-size: 24rpx;
}

.line {
  height: 1rpx;
  flex: 1;
  background: $border-color;
}

:deep(.login-button) {
  background: $brand-color !important;
  border-color: $brand-color !important;
}

:deep(.wechat-button) {
  color: $brand-deep !important;
  border-color: $brand-color !important;
  background: #fff !important;
}
</style>
