import type { CSSOptions } from 'vite'
import viewport from 'postcss-px-to-viewport-8-plugin'
import { charsetRemoval, fontSize } from './src/design.config'

const Css: CSSOptions = {
  preprocessorOptions: {
    scss: {
      api: 'modern-compiler',
      silenceDeprecations: ['global-builtin', 'import'],
    },
  },
  postcss: {
    plugins: [
      viewport({
        unitToConvert: 'px',
        viewportWidth: (file: string) => {
          let num = fontSize * 100
          if (file.includes('wot-design-uni')) num = num / 2
          return num
        },
        unitPrecision: 6,
        propList: ['*'],
        viewportUnit: 'rpx',
        fontViewportUnit: 'rpx',
        selectorBlackList: ['uni-'],
        minPixelValue: 1,
        mediaQuery: true,
        replace: true,
        landscape: false,
      }),
      charsetRemoval(),
    ],
  },
}

export default Css
