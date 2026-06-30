import { defineConfig } from 'vite'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const _uni = require('@dcloudio/vite-plugin-uni')
const uni = _uni.default || _uni

export default defineConfig({
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'legacy-js-api', 'global-builtin'],
        quietDeps: true,
      },
    },
  },
})
