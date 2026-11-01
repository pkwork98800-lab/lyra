declare module '*?settings-search' {
  import type { SettingsSearchViewEntry } from '@proj-lyra/stage-shared/settings-search'

  /** The settings that the component renders. `@proj-lyra/stage-pages/vite/settings-search` reads them at build time. */
  const entries: SettingsSearchViewEntry[]
  export default entries
}
