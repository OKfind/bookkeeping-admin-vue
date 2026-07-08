<template>
  <view style="padding: 40rpx">
    <text style="font-size: 32rpx; margin-bottom: 20rpx">wd-input 测试：</text>
    <wd-input v-model="value" placeholder="请输入内容" />
    <view style="margin-top: 20rpx; font-size: 28rpx">输入值：{{ value }}</view>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
const value = ref("");
</script>
