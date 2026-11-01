import type { PluginCapabilityState } from '@proj-lyra/stage-shared/plugin-host'

import { defineInvokeEventa } from '@proj-lyra/eventa'

/**
 * Plugin capability state change payload reported by renderer or plugin code.
 *
 * Use when:
 * - Updating one plugin capability lifecycle state through the host bridge
 *
 * Expects:
 * - `key` matches a capability known to the plugin host or plugin SDK
 *
 * Returns:
 * - N/A
 */
export interface PluginCapabilityPayload {
  key: string
  state: 'announced' | 'ready' | 'degraded' | 'withdrawn'
  metadata?: Record<string, unknown>
}

export const pluginProtocolListProvidersEventName = 'proj-lyra:plugin-sdk:apis:protocol:resources:providers:list-providers'
export const pluginProtocolListProviders = defineInvokeEventa<Array<{ name: string }>>(pluginProtocolListProvidersEventName)
// TODO: Replace these manually duplicated IPC types with re-exports from
// @proj-lyra/plugin-sdk (CapabilityDescriptor) once stage-ui and the shared
// eventa layer can depend on the SDK without introducing unwanted coupling.
export const electronPluginUpdateCapability = defineInvokeEventa<PluginCapabilityState, PluginCapabilityPayload>('eventa:invoke:electron:plugins:capability:update')
