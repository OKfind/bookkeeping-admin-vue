/**
 * 本地存储封装
 */
export const ls = {
  set(key: string, value: any) {
    uni.setStorageSync(key, value)
  },
  get<T = any>(key: string): T {
    return uni.getStorageSync(key)
  },
  del(key: string) {
    uni.removeStorageSync(key)
  },
  clear() {
    uni.clearStorageSync()
  },
}

type ToastIcon = 'success' | 'loading' | 'error' | 'none' | 'fail' | 'exception'

/**
 * 封装 uni.showToast
 */
export function showToast(title: string, icon: ToastIcon = 'none', duration = 2000) {
  uni.showToast({ title, icon, duration })
}

/**
 * 封装 uni.showLoading
 */
export function showLoading(title: string = '加载中...', mask = true) {
  uni.showLoading({ title, mask })
}
