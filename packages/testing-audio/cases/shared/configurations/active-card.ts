import type { LyraCard, LyraExtension } from '@proj-lyra/stage-ui/types'

import type { AudioInputSession } from '../../../src/types'

type ActiveCardModules = Partial<Pick<LyraExtension['modules'], 'consciousness' | 'speech'>>

/** Updates Provider selections that the active LYRA Card reapplies during application startup. */
export async function configureActiveCardModules(
  runtime: AudioInputSession,
  modules: ActiveCardModules,
): Promise<void> {
  await runtime.runtimePage.evaluate(({ configuredModules }) => {
    const serializedCards = localStorage.getItem('lyra-cards')
    if (!serializedCards)
      throw new Error('The LYRA Card store is not initialized.')

    // The active Character is runtime state. Audio test sessions configure the
    // built-in startup Character before the application creates its stores.
    const activeCardId = 'default'
    const cards = JSON.parse(serializedCards) as Array<[string, LyraCard]>
    const activeCard = cards.find(([cardId]) => cardId === activeCardId)?.[1]
    if (!activeCard)
      throw new Error(`The active LYRA Card "${activeCardId}" does not exist.`)

    const currentModules = activeCard.extensions.lyra.modules
    activeCard.extensions.lyra.modules = {
      ...currentModules,
      ...(configuredModules.consciousness
        ? { consciousness: configuredModules.consciousness }
        : {}),
      ...(configuredModules.speech
        ? { speech: { ...currentModules.speech, ...configuredModules.speech } }
        : {}),
    }
    localStorage.setItem('lyra-cards', JSON.stringify(cards))
  }, { configuredModules: modules })
}
