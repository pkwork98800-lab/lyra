import type { ModelSettingsRuntimeSnapshot } from '@proj-lyra/stage-ui/components'

import { defineEventa } from '@proj-lyra/eventa'
import { createContext as createBroadcastChannelContext } from '@proj-lyra/eventa/adapters/broadcast-channel'

export const modelSettingsRuntimeChannelName = 'lyra-model-settings-runtime'

export const modelSettingsRuntimeSnapshotRequested = defineEventa<void>('eventa:model-settings-runtime:snapshot:request')
export const modelSettingsRuntimeSnapshotChanged = defineEventa<ModelSettingsRuntimeSnapshot>('eventa:model-settings-runtime:snapshot:changed')
export const modelSettingsRuntimeOwnerGone = defineEventa<{ ownerInstanceId: string }>('eventa:model-settings-runtime:owner:gone')

let context: ReturnType<typeof createBroadcastChannelContext>['context'] | undefined

/** The Eventa context that carries model-settings state and commands. */
export type ModelSettingsRuntimeContext = ReturnType<typeof createBroadcastChannelContext>['context']

/** Returns the Eventa context for model-settings state and commands. */
export function getModelSettingsRuntimeContext() {
  context ??= createBroadcastChannelContext(new BroadcastChannel(modelSettingsRuntimeChannelName)).context
  return context
}
