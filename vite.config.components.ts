import type { PluginOption } from 'vite'
import { wotDesignResolver } from '@lincy/uniapp-ui-resolver'
import Components from '@uni-helper/vite-plugin-uni-components'
import AutoImport from 'unplugin-auto-import/vite'

export default (): PluginOption[] => [
  AutoImport({
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
    imports: [
      'vue',
      {
        'pinia': ['defineStore', 'storeToRefs'],
        '@dcloudio/uni-app': [
          'onLaunch', 'onShow', 'onHide',
          'onLoad', 'onReady', 'onUnload',
        ],
      },
    ],
    dts: 'src/auto-imports.d.ts',
    dirs: ['src/components', 'src/**/components', 'src/composables', 'src/stores'],
    defaultExportByFilename: false,
    vueTemplate: true,
  }),
  Components({
    dirs: ['src/components', 'src/**/components'],
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
    extensions: ['vue', 'tsx', 'jsx'],
    resolvers: [wotDesignResolver()],
    dts: 'src/components.d.ts',
    directoryAsNamespace: true,
  }),
]
