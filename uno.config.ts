import { defineConfig, presetAttributify, presetUno } from 'unocss'
import { presetApplet, presetRemRpx, transformerAttributify } from 'unocss-applet'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetApplet(),
    presetRemRpx(),
  ],
  transformers: [
    transformerAttributify(),
  ],
  shortcuts: {
    'page-fill': 'min-h-screen bg-[#f6f7fb] text-[#1f2937]',
    'safe-x': 'px-32rpx',
    'flex-center': 'flex items-center justify-center',
  },
  theme: {
    colors: {
      brand: {
        DEFAULT: '#22c55e',
        deep: '#16a34a',
        soft: '#dcfce7',
      },
    },
  },
})
