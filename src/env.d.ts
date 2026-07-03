/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string
  readonly VITE_APP_API: string
  readonly VITE_APP_MP_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
