<template>
  <view class="min-h-100vh bg-white text-[#333]">
    <view class="h-[638rpx] overflow-hidden bg-[#3458f5] text-white">
      <view class="h-[calc(var(--status-bar-height)+12rpx)]" />
      <view class="h-[84rpx] flex items-center justify-between px-[34rpx]">
        <view class="relative h-[48rpx] w-[48rpx]" @click="goBack">
          <view class="absolute left-[1rpx] top-[23rpx] h-[4rpx] w-[45rpx] rotate-45 rounded-[2rpx] bg-white" />
          <view class="absolute left-[1rpx] top-[23rpx] h-[4rpx] w-[45rpx] -rotate-45 rounded-[2rpx] bg-white" />
        </view>
        <view class="text-[34rpx] font-600">个人账本 <text class="ml-[4rpx] text-[18rpx]">▼</text></view>
        <view class="w-[48rpx]" />
      </view>
      <view class="h-[72rpx] flex items-center justify-between px-[58rpx] pt-[10rpx]">
        <view class="flex gap-[56rpx]">
          <view :class="['relative py-[12rpx] text-[29rpx]', billType === 2 ? 'font-600 text-white' : 'text-white/70']" @click="billType = 2">
            支出<view v-if="billType === 2" class="absolute bottom-0 left-1/2 h-[4rpx] w-[28rpx] -translate-x-1/2 rounded-[2rpx] bg-white" />
          </view>
          <view :class="['relative py-[12rpx] text-[29rpx]', billType === 1 ? 'font-600 text-white' : 'text-white/70']" @click="billType = 1">
            收入<view v-if="billType === 1" class="absolute bottom-0 left-1/2 h-[4rpx] w-[28rpx] -translate-x-1/2 rounded-[2rpx] bg-white" />
          </view>
        </view>
        <wd-datetime-picker v-model="billDate" type="date" :max-date="today" root-portal>
          <view class="rounded-[5rpx] bg-white/18 px-[12rpx] py-[8rpx] text-[24rpx]">{{ displayDate }} <text class="ml-[4rpx] text-[14rpx]">▼</text></view>
        </wd-datetime-picker>
      </view>
      <input v-model="amount" class="mx-[58rpx] box-border h-[112rpx] border-0 border-b-[1rpx] border-b-white/18 text-[58rpx] text-white" type="digit" placeholder="0.0" placeholder-class="text-white/48" />
      <scroll-view class="h-[208rpx] w-full" scroll-x :show-scrollbar="false">
        <view class="inline-flex min-w-full box-border gap-[29rpx] whitespace-nowrap px-[42rpx] pb-[20rpx] pt-[50rpx]">
          <view v-for="item in categories" :key="item.value" class="w-[88rpx] flex flex-none flex-col items-center" @click="category = item.value">
            <view :class="['h-[74rpx] w-[74rpx] flex items-center justify-center rounded-full text-[38rpx] text-white/72', category === item.value ? 'bg-white/43 ring-[3rpx] ring-white/22' : 'bg-white/27']"><text>{{ item.icon }}</text></view>
            <text :class="['mt-[15rpx] text-[24rpx]', category === item.value ? 'text-white' : 'text-white/66']">{{ item.label }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="min-h-[calc(100vh-638rpx)] box-border px-[58rpx] pb-[calc(160rpx+env(safe-area-inset-bottom))] pt-[42rpx]">
      <view class="text-[27rpx] font-600 text-[#555]">支付方式</view>
      <view class="mt-[30rpx] flex flex-wrap gap-x-[18rpx] gap-y-[16rpx]">
        <view v-for="item in paymentMethods" :key="item.value" :class="['rounded-[7rpx] border-[1rpx] px-[22rpx] py-[9rpx] text-[23rpx] leading-none', paymentMethod === item.value ? 'border-[#3458f5] bg-[#f3f5ff] text-[#3458f5]' : 'border-[#9aa4c3] text-[#8d96af]']" @click="paymentMethod = item.value">{{ item.label }}</view>
      </view>
      <view class="mt-[38rpx] text-[27rpx] font-600 text-[#555]">上传照片或拍摄凭证（最多1张）</view>
      <view class="mt-[28rpx] flex flex-wrap gap-[18rpx]">
        <view v-for="(image, index) in images" :key="image" class="relative h-[100rpx] w-[100rpx] rounded-[7rpx]">
          <image class="h-full w-full rounded-[7rpx]" :src="image" mode="aspectFill" />
          <view class="absolute -right-[12rpx] -top-[12rpx] h-[32rpx] w-[32rpx] rounded-full bg-[#555] text-center text-[26rpx] text-white leading-[29rpx]" @click="removeImage(index)">×</view>
        </view>
        <view v-if="images.length < 1" class="h-[100rpx] w-[100rpx] flex items-center justify-center rounded-[7rpx] bg-[#f3f5ff]" @click="chooseImages"><text class="text-[56rpx] font-200 text-[#3458f5]">＋</text></view>
      </view>
      <view class="mt-[40rpx] text-[27rpx] font-600 text-[#555]">备注</view>
      <textarea v-model="remark" class="mt-[28rpx] h-[118rpx] w-full box-border border-0 border-b-[1rpx] border-b-[#ddd] px-0 py-[12rpx] text-[26rpx] leading-[42rpx]" maxlength="50" placeholder="请填写备注信息（限50字）" placeholder-class="text-[#b9bdc8]" />
      <button class="fixed bottom-[calc(40rpx+env(safe-area-inset-bottom))] left-[58rpx] right-[58rpx] h-[88rpx] border-0 rounded-[9rpx] bg-[#3458f5] text-[32rpx] font-600 text-white leading-[88rpx] after:border-0 disabled:opacity-70" :loading="isSaving" :disabled="isSaving" @click="save">保存</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { ApiPostAddBill } from "@/api/bill";
import { billCategories, paymentMethods } from "@/constants/dict";
import { formatDateTime } from "@/utils/date";
import { readImageAsBase64DataUrl } from "@/utils/file";

type StoredUserInfo = { id?: number };

const categories = billCategories;

const now = new Date();
const today = now.getTime();
const billType = ref(2);
const amount = ref("");
const category = ref(1);
const paymentMethod = ref(1);
const billDate = ref(today);
const images = ref<string[]>([]);
const remark = ref("");
const isSaving = ref(false);
const displayDate = computed(() => {
  const date = new Date(billDate.value);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
});
const getUserId = () => {
  const userInfo = uni.getStorageSync("userInfo") as StoredUserInfo | string | "";
  if (!userInfo) return 0;
  if (typeof userInfo === "string") {
    try {
      return Number((JSON.parse(userInfo) as StoredUserInfo).id) || 0;
    } catch {
      return 0;
    }
  }
  return Number(userInfo.id) || 0;
};
const goBack = () => uni.navigateBack();
const chooseImages = () => {
  uni.chooseImage({
    count: 1 - images.value.length,
    sizeType: ["compressed"],
    success: ({ tempFilePaths }) => images.value.push(...tempFilePaths.slice(0, 1 - images.value.length)),
  });
};
const removeImage = (index: number) => images.value.splice(index, 1);
const save = async () => {
  const billAmount = Number(amount.value);
  if (!amount.value || !Number.isFinite(billAmount) || billAmount <= 0) {
    uni.showToast({ title: "请输入账单金额", icon: "none" });
    return;
  }

  const userId = getUserId();
  if (!userId) {
    uni.showToast({ title: "请先登录", icon: "none" });
    return;
  }

  if (isSaving.value) return;
  isSaving.value = true;
  uni.showLoading({ title: "保存中..." });

  try {
    const billImg = images.value[0] ? await readImageAsBase64DataUrl(images.value[0]) : "";
    const res = await ApiPostAddBill({
      user_id: userId,
      type: billType.value,
      pay_type: paymentMethod.value,
      amount: billAmount,
      category_id: category.value,
      bill_img: billImg,
      remark: remark.value.trim(),
      bill_time: formatDateTime(billDate.value),
    });

    uni.hideLoading();
    if (res.code === 200) {
      uni.showToast({ title: "保存成功", icon: "success" });
      setTimeout(() => {
        uni.navigateBack();
      }, 800);
    }
  } catch (error) {
    uni.hideLoading();
    uni.showToast({ title: "保存失败，请稍后重试", icon: "none" });
  } finally {
    isSaving.value = false;
  }
};
</script>
