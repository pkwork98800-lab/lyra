import type { SettingsSearchModule } from '@proj-lyra/stage-ui/libs/settings-search'

import { settingsSearchItemKey } from '@proj-lyra/stage-shared/settings-search'
import { useLyraCardStore } from '@proj-lyra/stage-ui/stores/modules/lyra-card'

/** The character cards page, with each card. A result of a card opens the page of the card. */
export default {
  routes: [{
    path: '/settings/lyra-card',
    items: () => [...useLyraCardStore().cards.entries()].map(([id, card]) => ({
      title: card.name,
      key: settingsSearchItemKey('card', id),
      to: `/settings/lyra-card/${id}`,
    })),
  }],
} satisfies SettingsSearchModule
