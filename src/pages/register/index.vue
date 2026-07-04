<template>
  <view class="page-fill">
    <!-- 顶部蓝色渐变区域 -->
    <view
      class="relative pt-40rpx px-48rpx pb-120rpx overflow-hidden"
      :style="{
        background:
          'linear-gradient(135deg, #4f6ef7 0%, #6b8cff 50%, #8da4ff 100%)',
      }"
    >
      <view
        class="status-space"
        :style="{ height: 'var(--status-bar-height)' }"
      />

      <view class="mt-80rpx">
        <text class="text-white text-48rpx font-bold leading-[1.4] block"
          >创建账号</text
        >
        <text class="text-white text-28rpx opacity-80 leading-[1.5] mt-12rpx block"
          >注册后开始记录每一笔收支</text
        >
      </view>

      <view
        class="absolute -right-60rpx -bottom-20rpx w-360rpx h-360rpx rounded-full opacity-15"
        :style="{ background: '#fff' }"
      />
    </view>

    <!-- 白色卡片表单区域 -->
    <view
      class="relative mx-32rpx -mt-80rpx bg-white rounded-24rpx px-48rpx pb-48rpx"
      :style="{
        boxShadow: '0 8rpx 40rpx rgba(79, 110, 247, 0.12)',
      }"
    >
      <view class="pt-48rpx">
        <!-- 用户名 -->
        <view class="mb-36rpx">
          <text class="text-[#1f2937] text-28rpx font-semibold mb-16rpx block"
            >用户名</text
          >
          <view class="border-b border-[#e5e7eb] pb-16rpx">
            <wd-input
              v-model="form.username"
              placeholder="请输入用户名"
              :custom-style="{ padding: 0 }"
              custom-class="login-input"
            />
          </view>
        </view>

        <!-- 手机号 -->
        <view class="mb-36rpx">
          <text class="text-[#1f2937] text-28rpx font-semibold mb-16rpx block"
            >手机号</text
          >
          <view class="border-b border-[#e5e7eb] pb-16rpx">
            <wd-input
              v-model="form.phone"
              placeholder="请输入手机号"
              :custom-style="{ padding: 0 }"
              custom-class="login-input"
            />
          </view>
        </view>

        <!-- 密码 -->
        <view class="mb-36rpx">
          <text class="text-[#1f2937] text-28rpx font-semibold mb-16rpx block"
            >密码</text
          >
          <view class="border-b border-[#e5e7eb] pb-16rpx">
            <wd-input
              v-model="form.password"
              placeholder="请设置密码"
              show-password
              :custom-style="{ padding: 0 }"
              custom-class="login-input"
            />
          </view>
        </view>

        <!-- 确认密码 -->
        <view class="mb-36rpx">
          <text class="text-[#1f2937] text-28rpx font-semibold mb-16rpx block"
            >确认密码</text
          >
          <view class="border-b border-[#e5e7eb] pb-16rpx">
            <wd-input
              v-model="form.confirmPassword"
              placeholder="请再次输入密码"
              show-password
              :custom-style="{ padding: 0 }"
              custom-class="login-input"
            />
          </view>
        </view>

        <!-- 用户协议 -->
        <view class="flex items-center mb-48rpx">
          <wd-checkbox v-model="form.agreed" shape="square">
            <text class="text-[#6b7280] text-24rpx"
              >我已阅读并同意
              <text class="text-[#4f6ef7]">《用户协议》</text>
              <text class="text-[#6b7280]">和</text>
              <text class="text-[#4f6ef7]">《隐私政策》</text></text
            >
          </wd-checkbox>
        </view>

        <!-- 注册按钮 -->
        <wd-button
          block
          size="large"
          :custom-style="{
            background: '#4f6ef7',
            borderColor: '#4f6ef7',
            color: '#fff',
            borderRadius: '48rpx',
            height: '96rpx',
            fontSize: '32rpx',
            fontWeight: '600',
          }"
          :disabled="!form.agreed"
          @click="handleRegister"
        >
          注册
        </wd-button>
      </view>
    </view>

    <!-- 登录入口 -->
    <view class="mt-48rpx flex items-center justify-center gap-8rpx">
      <text class="text-[#9ca3af] text-26rpx">已有账号？</text>
      <text class="text-[#4f6ef7] text-26rpx font-medium" @click="goLogin">去登录</text>
    </view>

    <!-- 第三方登录 -->
    <view class="mt-80rpx px-48rpx">
      <view class="flex items-center gap-24rpx mb-48rpx">
        <view class="h-1rpx flex-1 bg-[#e5e7eb]" />
        <text class="text-[#9ca3af] text-24rpx">第三方登录</text>
        <view class="h-1rpx flex-1 bg-[#e5e7eb]" />
      </view>

      <view class="flex items-center justify-center gap-120rpx">
        <view
          class="flex-center w-96rpx h-96rpx rounded-full bg-[#4f6ef7]"
          @click="handleWechatLogin"
        >
          <text class="text-white text-40rpx">💬</text>
        </view>
        <view
          class="flex-center w-96rpx h-96rpx rounded-full bg-[#4f6ef7]"
          @click="handleQQLogin"
        >
          <text class="text-white text-40rpx">🐧</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ApiRegister } from '@/api/register'

const form = reactive({
  username: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreed: true,
})

async function handleRegister() {
  if (!form.username.trim()) {
    uni.showToast({ title: '请输入用户名', icon: 'none' })
    return
  }
  if (!form.phone.trim()) {
    uni.showToast({ title: '请输入手机号', icon: 'none' })
    return
  }
  if (!form.password) {
    uni.showToast({ title: '请设置密码', icon: 'none' })
    return
  }
  if (form.password.length < 6) {
    uni.showToast({ title: '密码至少6位', icon: 'none' })
    return
  }
  if (form.password !== form.confirmPassword) {
    uni.showToast({ title: '两次密码输入不一致', icon: 'none' })
    return
  }

  const res = await ApiRegister({
    username: form.username,
    phone: form.phone,
    password: form.password,
    confirmPassword: form.confirmPassword,
  })

  if (res.code === 200) {
    uni.setStorageSync('token', res.data.token)
    uni.showToast({ title: '注册成功', icon: 'success' })
    setTimeout(() => uni.navigateBack(), 1500)
  }
}

function goLogin() {
  uni.navigateBack()
}

function handleWechatLogin() {
  uni.showLoading({ title: '微信授权中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '微信登录成功', icon: 'success' })
  }, 1500)
}

function handleQQLogin() {
  uni.showToast({ title: 'QQ登录', icon: 'none' })
}
</script>
