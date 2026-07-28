<template>
  <view class="h-100vh flex flex-col overflow-hidden bg-[#3458f5] text-[#4f5875]">
    <view class="flex-none text-white">
      <view class="h-[calc(var(--status-bar-height)+12rpx)]" />
      <view class="h-[84rpx] flex items-center justify-between px-[28rpx]">
        <view
          class="h-[56rpx] w-[56rpx] flex items-center justify-center text-[54rpx] font-300 leading-none"
          hover-class="opacity-60"
          @click="goBack"
        >
          ‹
        </view>
        <text class="text-[32rpx] font-700">账单详情</text>
        <view class="h-[56rpx] w-[56rpx]" />
      </view>
    </view>

    <scroll-view class="h-0 min-h-0 flex-1" scroll-y :show-scrollbar="false">
      <view v-if="bill" class="px-[30rpx] pb-[70rpx] pt-[50rpx]">
        <view class="relative rounded-[8rpx] bg-white pb-[42rpx] pt-[76rpx] shadow-[0_12rpx_28rpx_rgba(24,50,155,0.18)]">
          <view class="absolute left-1/2 top-[-48rpx] h-[96rpx] w-[96rpx] flex -translate-x-1/2 items-center justify-center border-[6rpx] border-[#3458f5] rounded-full bg-white text-[42rpx] text-[#3458f5] font-700">
            {{ categoryIcon }}
          </view>

          <view class="px-[34rpx] text-center">
            <view class="text-[24rpx] text-[#9aa2b8] font-700">{{ categoryLabel }}</view>
            <view :class="['mt-[14rpx] text-[44rpx] font-800 leading-none', isIncome ? 'text-[#ff3979]' : 'text-[#363d50]']">
              {{ amountText }}
            </view>
          </view>

          <view class="relative my-[46rpx] h-[1rpx] border-0 border-t-[1rpx] border-dashed border-t-[#d8dce7]">
            <view class="absolute left-[-12rpx] top-[-12rpx] h-[24rpx] w-[24rpx] rounded-full bg-[#3458f5]" />
            <view class="absolute right-[-12rpx] top-[-12rpx] h-[24rpx] w-[24rpx] rounded-full bg-[#3458f5]" />
          </view>

          <view class="px-[64rpx]">
            <view v-for="row in detailRows" :key="row.label" class="mb-[30rpx] grid grid-cols-[150rpx_1fr] gap-[24rpx] text-[25rpx] leading-[38rpx]">
              <text class="text-[#a1a9bd] font-700">{{ row.label }}</text>
              <text class="min-w-0 break-all text-right text-[#69728e] font-700">{{ row.value }}</text>
            </view>

            <view v-if="bill.bill_img" class="mt-[8rpx]">
              <view class="mb-[18rpx] text-[25rpx] text-[#a1a9bd] font-700">账单凭证</view>
              <image
                class="h-[280rpx] w-full rounded-[7rpx] bg-[#f4f6fb]"
                :src="bill.bill_img"
                mode="aspectFill"
                @click="previewBillImage"
              />
            </view>
          </view>
        </view>

        <view class="mt-[48rpx] flex items-start justify-around px-[60rpx] text-white">
          <view
            :class="['w-[120rpx] flex flex-col items-center', isDeleting ? 'opacity-55' : '']"
            hover-class="opacity-65"
            @click="handleDelete"
          >
            <view class="h-[96rpx] w-[96rpx] flex items-center justify-center rounded-full bg-white shadow-[0_10rpx_22rpx_rgba(22,45,143,0.24)]">
              <text v-if="isDeleting" class="text-[24rpx] text-[#ff477d] font-700">...</text>
              <wd-icon v-else name="delete" size="44rpx" color="#ff477d" />
            </view>
            <text class="mt-[18rpx] text-[25rpx] font-700">删除</text>
          </view>

          <view
            :class="['w-[120rpx] flex flex-col items-center', isDeleting ? 'opacity-55' : '']"
            hover-class="opacity-65"
            @click="goToEdit"
          >
            <view class="h-[96rpx] w-[96rpx] flex items-center justify-center rounded-full bg-white shadow-[0_10rpx_22rpx_rgba(22,45,143,0.24)]">
              <wd-icon name="edit-outline" size="44rpx" color="#3458f5" />
            </view>
            <text class="mt-[18rpx] text-[25rpx] font-700">编辑</text>
          </view>
        </view>
      </view>

      <view v-else class="h-full flex items-center justify-center px-[30rpx]">
        <wd-status-tip image="" tip="账单信息不存在" />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow } from "@dcloudio/uni-app";
import { computed, ref } from "vue";
import { ApiDeleteUserBill, type ResUserBill } from "@/api/bill";
import { billCategories, paymentMethods } from "@/constants/dict";
import { formatFullDateTime } from "@/utils/date";

type StoredUserInfo = { nickname?: string };

const bill = ref<ResUserBill | null>(null);
const routeBillId = ref(0);
const isDeleting = ref(false);

const category = computed(() =>
  billCategories.find((item) => item.value === Number(bill.value?.category_id)),
);
const categoryLabel = computed(() => category.value?.label || "未分类");
const categoryIcon = computed(() => category.value?.icon || "□");
const paymentLabel = computed(() =>
  paymentMethods.find((item) => item.value === Number(bill.value?.pay_type))?.label || "其它",
);
const isIncome = computed(() => Number(bill.value?.type) === 1);
const amountText = computed(() => {
  if (bill.value?.amount === null || bill.value?.amount === undefined) return "--";
  const amount = Number(bill.value.amount);
  if (!Number.isFinite(amount)) return "--";
  return `${isIncome.value ? "+" : "-"}${amount.toFixed(2)}`;
});
const recorderName = computed(() => {
  const userInfo = uni.getStorageSync("userInfo") as StoredUserInfo | string | "";
  if (!userInfo) return `用户 ${bill.value?.user_id || "--"}`;
  if (typeof userInfo === "string") {
    try {
      return (JSON.parse(userInfo) as StoredUserInfo).nickname || `用户 ${bill.value?.user_id || "--"}`;
    } catch {
      return `用户 ${bill.value?.user_id || "--"}`;
    }
  }
  return userInfo.nickname || `用户 ${bill.value?.user_id || "--"}`;
});
const detailRows = computed(() => {
  if (!bill.value) return [];
  return [
    { label: "账单类型", value: isIncome.value ? "收入" : "支出" },
    { label: "支付方式", value: paymentLabel.value },
    { label: "账单分类", value: categoryLabel.value },
    { label: "记录人", value: recorderName.value },
    { label: "发生时间", value: formatFullDateTime(bill.value.bill_time) },
    { label: "创建时间", value: formatFullDateTime(bill.value.create_time) },
    { label: "备注", value: bill.value.remark?.trim() || "无" },
  ];
});

const parseStoredBill = (value: unknown) => {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as ResUserBill;
    } catch {
      return null;
    }
  }
  return value as ResUserBill;
};

const goBack = () => uni.navigateBack();
const goToEdit = () => {
  if (!bill.value || isDeleting.value) return;
  uni.setStorageSync("selectedBillDetail", bill.value);
  uni.navigateTo({ url: `/pages/bookkeeping/index?mode=edit&id=${bill.value.id}` });
};
const previewBillImage = () => {
  const imageUrl = bill.value?.bill_img;
  if (!imageUrl) return;
  uni.previewImage({ current: imageUrl, urls: [imageUrl] });
};

const syncBillFromStorage = () => {
  const storedBill = parseStoredBill(uni.getStorageSync("selectedBillDetail"));
  if (!storedBill || (routeBillId.value && storedBill.id !== routeBillId.value)) return;
  bill.value = storedBill;
};

const handleDelete = async () => {
  const currentBill = bill.value;
  if (!currentBill || isDeleting.value) return;

  const modal = await uni.showModal({
    title: "删除账单",
    content: "删除后无法恢复，确定删除这笔账单吗？",
    confirmText: "删除",
    confirmColor: "#ff477d",
  });
  if (!modal.confirm) return;

  isDeleting.value = true;
  uni.showLoading({ title: "删除中...", mask: true });
  let deleteSucceeded = false;
  try {
    const res = await ApiDeleteUserBill(currentBill.id);
    uni.hideLoading();
    if (res.code !== 200) {
      uni.showToast({ title: "删除失败，请稍后重试", icon: "none" });
      return;
    }

    uni.removeStorageSync("selectedBillDetail");
    deleteSucceeded = true;
    uni.showToast({ title: "删除成功", icon: "success" });
    setTimeout(() => uni.navigateBack(), 700);
  } catch (error) {
    uni.hideLoading();
    uni.showToast({ title: "删除失败，请稍后重试", icon: "none" });
  } finally {
    if (!deleteSucceeded) isDeleting.value = false;
  }
};

onLoad((options) => {
  routeBillId.value = Number(options?.id);
  syncBillFromStorage();
  if (!bill.value) {
    uni.showToast({ title: "账单信息不存在", icon: "none" });
  }
});
onShow(syncBillFromStorage);
</script>
