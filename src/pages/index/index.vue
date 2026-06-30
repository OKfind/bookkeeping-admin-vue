<template>
  <view class="index-page">
    <wd-button type="primary" @click="handleClick">Wot Design Uni 按钮</wd-button>
  </view>
</template>

<script setup lang="ts">
function handleClick() {
  uni.showToast({
    title: '项目启动成功！',
    icon: 'success',
  })
}
</script>

<style lang="scss">
.index-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 32rpx;
  background: #f6f7fb;
}
</style>
