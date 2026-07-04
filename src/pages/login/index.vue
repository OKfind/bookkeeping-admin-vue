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

      <view class="mt-40rpx">
        <text class="text-white text-48rpx font-bold leading-[1.4] block"
          >您好，</text
        >
        <text class="text-white text-48rpx font-bold leading-[1.4] block"
          >欢迎使用Hugo记账</text
        >
      </view>

      <!-- 背景装饰圆 -->
      <view
        class="absolute -right-40rpx -bottom-40rpx w-320rpx h-320rpx rounded-full opacity-20"
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
              v-model="form.account"
              placeholder="请输入您的用户名"
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
              placeholder="请输入您的密码"
              show-password
              :custom-style="{ padding: 0 }"
              custom-class="login-input"
            />
          </view>
        </view>

        <!-- 记住密码 -->
        <view class="flex items-center mb-48rpx">
          <wd-checkbox v-model="form.remember" shape="square"
            >记住密码</wd-checkbox
          >
        </view>

        <!-- 登录按钮 -->
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
          @click="handleAccountLogin"
        >
          登录
        </wd-button>

        <!-- 注册按钮 -->
        <wd-button
          block
          size="large"
          :custom-style="{
            background: '#f0f2ff',
            borderColor: 'transparent',
            color: '#4f6ef7',
            borderRadius: '48rpx',
            height: '96rpx',
            fontSize: '32rpx',
            fontWeight: '600',
            marginTop: '24rpx',
          }"
          @click="handleRegister"
        >
          注册
        </wd-button>
      </view>
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
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ApiUserLogin, ApiWxLogin } from "@/api/user";
import { reactive } from "vue";

const form = reactive({
  account: "",
  password: "",
  remember: true,
});

async function handleAccountLogin() {
  if (!form.account.trim()) {
    uni.showToast({ title: "请输入用户名", icon: "none" });
    return;
  }
  if (!form.password) {
    uni.showToast({ title: "请输入密码", icon: "none" });
    return;
  }

  try {
    const res = await ApiUserLogin({
      username: form.account,
      password: form.password,
    });
    if (res.code === 200) {
      uni.setStorageSync("token", res.data.token);
      uni.showToast({ title: "登录成功", icon: "success" });
      setTimeout(() => uni.reLaunch({ url: "/pages/index/index" }), 1500);
    }
  } catch (error) {
    uni.showToast({ title: "登录失败", icon: "none" });
    return;
  }
}

function handleRegister() {
  uni.navigateTo({ url: "/pages/register/index" });
}

async function handleWechatLogin() {
  uni.showLoading({ title: "微信授权中..." });

  try {
    // 获取微信 code
    const loginRes = await new Promise<any>((resolve, reject) => {
      uni.login({
        provider: "weixin",
        success: (res) => resolve(res),
        fail: (err) => reject(err),
      });
    });

    // 调用后端微信登录接口
    const res = await ApiWxLogin(loginRes.code);
    if (res.code === 200) {
      uni.setStorageSync("token", res.data.token);
      uni.hideLoading();
      uni.showToast({ title: "微信登录成功", icon: "success" });
      // 跳转到首页
      setTimeout(() => uni.reLaunch({ url: "/pages/index/index" }), 1500);
    } else {
      uni.hideLoading();
      uni.showToast({ title: res.msg || "微信登录失败", icon: "none" });
    }
  } catch (error) {
    uni.hideLoading();
    uni.showToast({ title: "微信登录失败", icon: "none" });
  }
}
</script>
