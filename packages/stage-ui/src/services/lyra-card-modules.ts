import type { LyraExtension } from '../types/lyraCard'

/** Persisted defaults, separate from the selections applied by the active card. */
export type CardModuleDefaults = Pick<LyraExtension['modules'], 'consciousness' | 'vision' | 'speech'>

/**
 * Resolves a card selection without borrowing a model from another provider.
 * An empty model remains unconfigured when the card changes provider.
 * The caller must ask for a model or use that provider's own default.
 */
export function resolveModuleSelection(
  selection: LyraExtension['modules']['consciousness'],
  defaults: LyraExtension['modules']['consciousness'],
): LyraExtension['modules']['consciousness'] {
  const provider = selection.provider || defaults.provider
  const model = selection.model || (provider === defaults.provider ? defaults.model : '')
  return { provider, model }
}
