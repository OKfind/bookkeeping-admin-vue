import { defineConfig } from 'vite'
import { createRequire } from 'node:module'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

const require = createRequire(import.meta.url)
const _uni = require('@dcloudio/vite-plugin-uni')
const uni = _uni.default || _uni

export default defineConfig({
  plugins: [
    uni(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        {
          '@dcloudio/uni-app': [
            'onLaunch',
            'onShow',
            'onHide',
            'onLoad',
            'onReady',
            'onUnload',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables'],
      vueTemplate: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'legacy-js-api', 'global-builtin'],
        quietDeps: true,
      },
    },
  },
})
