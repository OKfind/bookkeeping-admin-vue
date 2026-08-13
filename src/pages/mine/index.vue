<template>
  <view class="min-h-100vh bg-[#f6f7fb] pb-[140rpx]">
    <!-- 顶部用户信息区 -->
    <view
      class="relative bg-gradient-to-br from-[#e8eaf6] via-[#f3e5f5] to-[#e8eaf6] px-[32rpx] pb-[40rpx] pt-[80rpx]"
    >
      <!-- 通知铃铛 -->
      <view class="absolute right-[32rpx] top-[40rpx]">
        <text class="text-[40rpx]">🔔</text>
      </view>

      <!-- 头像 + 昵称 -->
      <view class="mb-[40rpx] flex items-center">
        <image
          class="mr-[24rpx] h-[120rpx] w-[120rpx] flex-shrink-0 rounded-full"
          :src="avatarUrl"
          mode="aspectFill"
        />
        <view class="flex flex-col">
          <view class="mb-[8rpx] flex items-center" @click="openEditDialog">
            <text class="mr-[12rpx] text-[36rpx] font-600 text-[#333]">{{ nickname }}</text>
            <text class="text-[28rpx]">✏️</text>
          </view>
          <text class="text-[24rpx] text-[#999]">欢迎来到Hugo记账</text>
        </view>
      </view>

      <!-- 统计数据 -->
      <view class="flex justify-around pb-[10rpx] pt-[20rpx]">
        <view class="flex flex-col items-center">
          <text class="mb-[8rpx] text-[44rpx] font-700 text-[#333]">{{ billCount }}</text>
          <text class="text-[22rpx] text-[#999]">记账总笔数</text>
        </view>
        <view class="flex flex-col items-center">
          <text class="mb-[8rpx] text-[44rpx] font-700 text-[#333]">{{ accountingDates }}</text>
          <text class="text-[22rpx] text-[#999]">记账总天数</text>
        </view>
      </view>
    </view>

    <!-- 菜单列表 -->
    <view class="mx-[20rpx] mt-[20rpx] overflow-hidden rounded-[20rpx] bg-white">
      <view
        class="flex items-center justify-between px-[24rpx] py-[28rpx]"
        :class="{ 'border-b border-[#f0f0f0]': index !== menuList.length - 1 }"
        v-for="(item, index) in menuList"
        :key="index"
        @click="handleMenuClick(item)"
      >
        <view class="flex items-center">
          <view
            class="mr-[20rpx] flex h-[64rpx] w-[64rpx] items-center justify-center rounded-[16rpx]"
            :style="{ background: item.bgColor }"
          >
            <text class="text-[32rpx]">{{ item.icon }}</text>
          </view>
          <text class="text-[30rpx] font-500 text-[#333]">{{ item.title }}</text>
        </view>
        <view class="flex items-center">
          <text v-if="item.extra" class="mr-[12rpx] text-[24rpx] text-[#999]">
            {{ item.extra }}
          </text>
          <text class="text-[36rpx] text-[#ccc]">›</text>
        </view>
      </view>
    </view>

    <view v-if="isEditDialogVisible" class="fixed inset-0 z-1000 flex items-center justify-center bg-black/45 px-[36rpx]" @click="closeEditDialog">
      <view class="w-full rounded-[16rpx] bg-white px-[30rpx] pb-[30rpx] pt-[28rpx]" @click.stop>
        <view class="flex items-center justify-between">
          <text class="text-[32rpx] text-[#333] font-700">编辑个人信息</text>
          <text class="text-[40rpx] text-[#a6acbb] font-300 leading-none" @click="closeEditDialog">×</text>
        </view>

        <view class="mt-[28rpx]">
          <view class="mb-[24rpx] flex flex-col items-center">
            <view class="relative" @click="chooseAvatar">
              <image class="h-[132rpx] w-[132rpx] rounded-full" :src="avatarPreview" mode="aspectFill" />
              <view class="absolute bottom-0 right-0 h-[38rpx] w-[38rpx] flex items-center justify-center rounded-full bg-[#4264f4] text-[22rpx] text-white">
                ✎
              </view>
            </view>
            <text class="mt-[10rpx] text-[21rpx] text-[#9aa2b8]">点击更换头像</text>
          </view>

          <view class="mb-[20rpx]">
            <text class="text-[24rpx] text-[#69728e] font-700">用户名</text>
            <input v-model="editForm.username" class="mt-[10rpx] h-[76rpx] box-border rounded-[8rpx] bg-[#f6f7fb] px-[20rpx] text-[26rpx] text-[#333]" placeholder="请输入用户名" />
          </view>
          <view class="mb-[20rpx]">
            <text class="text-[24rpx] text-[#69728e] font-700">昵称</text>
            <input v-model="editForm.nickname" class="mt-[10rpx] h-[76rpx] box-border rounded-[8rpx] bg-[#f6f7fb] px-[20rpx] text-[26rpx] text-[#333]" placeholder="请输入昵称" maxlength="20" />
          </view>
          <view class="mb-[20rpx]">
            <text class="text-[24rpx] text-[#69728e] font-700">邮箱</text>
            <input v-model="editForm.email" class="mt-[10rpx] h-[76rpx] box-border rounded-[8rpx] bg-[#f6f7fb] px-[20rpx] text-[26rpx] text-[#333]" type="text" placeholder="请输入邮箱" />
          </view>
          <view>
            <text class="text-[24rpx] text-[#69728e] font-700">手机号</text>
            <input v-model="editForm.phone" class="mt-[10rpx] h-[76rpx] box-border rounded-[8rpx] bg-[#f6f7fb] px-[20rpx] text-[26rpx] text-[#333]" type="number" placeholder="请输入手机号" maxlength="11" />
          </view>
        </view>

        <view class="mt-[32rpx] flex gap-[18rpx]">
          <button class="h-[78rpx] flex-1 border-0 rounded-[8rpx] bg-[#f1f3f8] text-[27rpx] text-[#69728e] leading-[78rpx] after:border-0" @click="closeEditDialog">取消</button>
          <button class="h-[78rpx] flex-1 border-0 rounded-[8rpx] bg-[#4264f4] text-[27rpx] text-white leading-[78rpx] after:border-0" :loading="isSaving" :disabled="isSaving" @click="saveUserInfo">保存</button>
        </view>
      </view>
    </view>

    <TabBar :active="3" />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { ApiPutUserInfo, type ReqUpdateUserInfo } from "@/api/user";
import TabBar from "@/components/TabBar.vue";
import { readImageAsBase64DataUrl } from "@/utils/file";

type StoredUserInfo = {
  id?: number;
  username?: string;
  nickname?: string;
  email?: string;
  phone?: string;
  userPic?: string;
  user_pic?: string;
  billCount?: number;
  accountingDates?: number;
};

type EditUserForm = Pick<ReqUpdateUserInfo, "username" | "nickname" | "email" | "phone" | "userPic">;

const defaultAvatar = "/static/avatar.png";
const nickname = ref("暂无昵称");
const billCount = ref(0);
const accountingDates = ref(0);
const avatarUrl = ref(defaultAvatar);
const userInfo = ref<StoredUserInfo>({});
const isEditDialogVisible = ref(false);
const isSaving = ref(false);
const editForm = ref<EditUserForm>({
  username: "",
  nickname: "",
  email: "",
  phone: "",
});

const refreshUserInfo = () => {
  const storedValue = uni.getStorageSync("userInfo") as StoredUserInfo | string | "";
  let parsedUserInfo: StoredUserInfo = {};
  if (typeof storedValue === "string") {
    try {
      parsedUserInfo = JSON.parse(storedValue) as StoredUserInfo;
    } catch {
      parsedUserInfo = {};
    }
  } else if (storedValue && typeof storedValue === "object") {
    parsedUserInfo = storedValue;
  }

  userInfo.value = parsedUserInfo;
  const nextNickname = String(parsedUserInfo.nickname || "");

  nickname.value = nextNickname.trim() || "暂无昵称";
  billCount.value = Number(parsedUserInfo.billCount) || 0;
  accountingDates.value = Number(parsedUserInfo.accountingDates) || 0;
  avatarUrl.value = getUserPic(parsedUserInfo) || defaultAvatar;
};

const avatarPreview = ref(defaultAvatar);

const getUserPic = (info: StoredUserInfo) =>
  String(info.userPic || info.user_pic || "").trim();

const openEditDialog = () => {
  editForm.value = {
    username: userInfo.value.username || "",
    nickname: userInfo.value.nickname || "",
    email: userInfo.value.email || "",
    phone: userInfo.value.phone || "",
    userPic: getUserPic(userInfo.value),
  };
  avatarPreview.value = getUserPic(userInfo.value) || defaultAvatar;
  isEditDialogVisible.value = true;
};

const chooseAvatar = () => {
  if (isSaving.value) return;
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    success: ({ tempFilePaths }) => {
      const filePath = tempFilePaths?.[0];
      if (!filePath) return;
      avatarPreview.value = filePath;
      editForm.value.userPic = filePath;
    },
  });
};

const closeEditDialog = () => {
  if (isSaving.value) return;
  isEditDialogVisible.value = false;
};

const getErrorMessage = (error: unknown) => {
  if (!error || typeof error !== "object") return "";
  const value = error as {
    message?: unknown;
    msg?: unknown;
    response?: { data?: { message?: unknown; msg?: unknown } };
  };
  return String(
    value.message
      || value.msg
      || value.response?.data?.message
      || value.response?.data?.msg
      || "",
  ).trim();
};

const saveUserInfo = async () => {
  const id = Number(userInfo.value.id) || 0;
  if (!id) {
    uni.showToast({ title: "用户信息不存在", icon: "none" });
    return;
  }
  const nicknameValue = editForm.value.nickname?.trim() || "";
  if (!nicknameValue) {
    uni.showToast({ title: "请输入昵称", icon: "none" });
    return;
  }
  if (isSaving.value) return;

  isSaving.value = true;
  uni.showLoading({ title: "保存中...", mask: true });
  try {
    const updateData: ReqUpdateUserInfo = {
      id,
      username: editForm.value.username?.trim() || undefined,
      nickname: nicknameValue,
      email: editForm.value.email?.trim() || undefined,
      phone: editForm.value.phone?.trim() || undefined,
    };
    if (editForm.value.userPic && editForm.value.userPic !== getUserPic(userInfo.value)) {
      updateData.userPic = await readImageAsBase64DataUrl(editForm.value.userPic);
    }
    const res = await ApiPutUserInfo(updateData);
    uni.hideLoading();
    if (res.code !== 200) {
      uni.showToast({
        title: res.message || res.msg || "保存失败，请稍后重试",
        icon: "none",
      });
      return;
    }

    const nextUserInfo: StoredUserInfo = {
      ...userInfo.value,
      ...updateData,
      nickname: nicknameValue,
    };
    if (updateData.userPic) {
      nextUserInfo.userPic = updateData.userPic;
      nextUserInfo.user_pic = updateData.userPic;
    }
    delete nextUserInfo.id;
    nextUserInfo.id = id;
    uni.setStorageSync("userInfo", nextUserInfo);
    isEditDialogVisible.value = false;
    refreshUserInfo();
    uni.showToast({ title: "保存成功", icon: "success" });
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: getErrorMessage(error) || "保存失败，请稍后重试",
      icon: "none",
    });
  } finally {
    isSaving.value = false;
  }
};

onShow(() => {
  refreshUserInfo();
});

const menuList = [
  { title: "退出登录", icon: "🚪", bgColor: "#fee2e2", extra: "" },
];

const handleMenuClick = (item: any) => {
  if (item.title === "退出登录") {
    uni.showModal({
      title: "提示",
      content: "确定要退出登录吗？",
      confirmText: "退出",
      confirmColor: "#ef4444",
      success: (res) => {
        if (res.confirm) {
          uni.clearStorageSync();
          uni.reLaunch({ url: "/pages/login/index" });
        }
      },
    });
    return;
  }

  uni.showToast({ title: item.title, icon: "none" });
};
</script>
