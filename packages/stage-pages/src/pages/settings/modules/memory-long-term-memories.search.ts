import type { SettingsSearchModule } from '@proj-lyra/stage-ui/libs/settings-search'
import type { MemoryEntry } from '@proj-lyra/stage-ui/types/memory'

import { settingsSearchItemKey } from '@proj-lyra/stage-shared/settings-search'
import { useMemoryStore } from '@proj-lyra/stage-ui/stores/memory'
import { useLyraCardStore } from '@proj-lyra/stage-ui/stores/modules/lyra-card'

/** The marker of a memory's row. General memories have no card. */
export function memorySearchKey(entry: MemoryEntry) {
  return settingsSearchItemKey('memory', entry.persona ?? '', entry.id)
}

/** The memories page, with each remembered fact and the card that keeps it, as the page groups them. The entries load from IndexedDB first. */
export default {
  routes: [{
    path: '/settings/modules/memory-long-term-memories',
    items: async ({ t }) => {
      const cards = useLyraCardStore().cards
      const memory = useMemoryStore()
      await memory.ready()
      return memory.entries.map(entry => ({
        title: entry.description || entry.body,
        key: memorySearchKey(entry),
        section: entry.persona
          ? cards.get(entry.persona)?.name || entry.persona
          : t('settings.pages.modules.memory-long-term.memories.general'),
      }))
    },
  }],
} satisfies SettingsSearchModule
