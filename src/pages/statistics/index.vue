<template>
  <view class="h-100vh bg-[#f6f7fb] overflow-hidden">
    <view class="flex items-center justify-center" style="height: 60vh">
      <text class="text-[32rpx] text-[#ccc]">统计</text>
    </view>
    <TabBar :active="2" />
  </view>
</template>

<script setup lang="ts">
import TabBar from "@/components/TabBar.vue";
</script>
