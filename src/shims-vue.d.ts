declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@adyen/ui-assets-icons-16' {
  import type { DefineComponent } from 'vue'
  const _default: Record<string, DefineComponent<{}, {}, any>>
  export const DownloadIcon: DefineComponent<{}, {}, any>
  export = _default
}
