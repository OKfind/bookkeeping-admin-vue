import type { BuildOptions, ServerOptions } from 'vite'

const config: { server: ServerOptions; build: BuildOptions } = {
  server: {
    port: 6778,
    warmup: {
      clientFiles: ['./src/main.ts', './src/pages/**/*.vue'],
    },
  },
  build: {
    target: 'es2018',
    cssTarget: 'chrome79',
    minify: true,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('.css') || id.includes('.scss') || id.includes('.sass') || id.includes('.less')) {
            if (id.includes('node_modules')) return 'vendor'
            if (id.includes('__uno.css')) return 'unocss'
          }
        },
      },
    },
  },
}

export default config
