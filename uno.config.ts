import { uniappConfig } from '@lincy/unocss-base-config'
import { defineConfig } from 'unocss'

const base = uniappConfig({
  baseFontSize: 1,
  unti: 'rpx',
}, {
  deleteAttributes: false,
})

export default defineConfig({
  ...base,
  presets: [
    ...(base.presets || []),
  ],
})
