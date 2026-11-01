import type { AnalyserBeatEvent, AnalyserWorkletParameters } from '@nekopaw/tempora'
import type { InvocableEventContext } from '@proj-lyra/eventa'

import type { BeatSyncDetectorState } from './types'

import { createContext as createWebContext, defineInvokeEventa } from '@proj-lyra/eventa'
import { createContext as createBroadcastChannelContext } from '@proj-lyra/eventa/adapters/broadcast-channel'

import { isElectronWindow } from '../window'

// Functions
export const beatSyncToggleInvokeEventa = defineInvokeEventa<void, boolean>('eventa:invoke:electron:beat-sync:toggle')
export const beatSyncGetStateInvokeEventa = defineInvokeEventa<BeatSyncDetectorState>('eventa:invoke:electron:beat-sync:get-state')
export const beatSyncUpdateParametersInvokeEventa = defineInvokeEventa<void, Partial<AnalyserWorkletParameters>>('eventa:event:electron:beat-sync:update-parameters')
export const beatSyncGetInputByteFrequencyDataInvokeEventa = defineInvokeEventa<Uint8Array<ArrayBuffer>>('eventa:invoke:electron:beat-sync:get-input-byte-frequency-data')

// Events
export const beatSyncStateChangedInvokeEventa = defineInvokeEventa<void, BeatSyncDetectorState>('eventa:event:electron:beat-sync:state-changed')
export const beatSyncBeatSignaledInvokeEventa = defineInvokeEventa<void, AnalyserBeatEvent>('eventa:event:electron:beat-sync:beat-signaled')

let broadcastChannel: BroadcastChannel | undefined
function getBroadcastChannel() {
  broadcastChannel ??= new BroadcastChannel('lyra::beat-sync')
  return broadcastChannel
}

export function createContext(): InvocableEventContext<unknown, { raw?: unknown }> {
  if (isElectronWindow(window)) {
    return createBroadcastChannelContext(getBroadcastChannel()).context as InvocableEventContext<unknown, { raw?: unknown }>
  }
  else {
    return createWebContext()
  }
}
