import { defineConfig } from 'vite'
import { createRequire } from 'node:module'
import UnoCSS from 'unocss/vite'

const require = createRequire(import.meta.url)
const _uni = require('@dcloudio/vite-plugin-uni')
const uni = _uni.default || _uni

export default defineConfig({
  plugins: [uni(), UnoCSS()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'legacy-js-api', 'global-builtin'],
        quietDeps: true,
      },
    },
  },
})
