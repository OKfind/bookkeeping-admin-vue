import path from 'node:path'
import { createRequire } from 'node:module'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'

import Build from './vite.config.build'
import Components from './vite.config.components'
import Css from './vite.config.css'
import { uniPolyfill } from './vite.config.uniapp'

const require = createRequire(import.meta.url)
const _uni = require('@dcloudio/vite-plugin-uni')
const uni = _uni.default || _uni

export default defineConfig({
  base: './',
  css: Css,
  server: Build.server,
  build: Build.build,
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  optimizeDeps: {
    include: [],
  },
  plugins: [
    ...Components(),
    Unocss(),
    uni(),
    uniPolyfill(),
  ],
})
