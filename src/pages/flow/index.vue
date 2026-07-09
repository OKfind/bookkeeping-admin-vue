<template>
  <view class="min-h-100vh bg-[#f6f7fb] pb-[140rpx]">
    <view class="flex items-center justify-center" style="height: 60vh;">
      <text class="text-[32rpx] text-[#ccc]">流水</text>
    </view>
    <TabBar :active="1" />
  </view>
</template>

<script setup lang="ts">
import TabBar from '@/components/TabBar.vue'
</script>
