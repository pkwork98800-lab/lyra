import type { KirieEventaContext } from '@gd-kirie/ipc-eventa'
import type { DeepReadonly, Ref } from 'vue'

import type {
  LyraMicrophonePermissionDecision,
  LyraMicrophonePermissionPromptPayload,
  LyraMicrophonePermissionState,
} from '../../shared/eventa'

import { defineInvoke } from '@proj-lyra/eventa'
import { shallowReadonly, shallowRef } from 'vue'

import {
  lyraMicrophonePermissionGetPrompt,
  lyraMicrophonePermissionGetState,
  lyraMicrophonePermissionPromptDismissed,
  lyraMicrophonePermissionPromptRequested,
  lyraMicrophonePermissionReset,
  lyraMicrophonePermissionResolvePrompt,
  lyraMicrophonePermissionStateChanged,
} from '../../shared/eventa'
import { initializeHostContext } from './owner'

export interface HostMicrophonePermission {
  prompt: DeepReadonly<Ref<LyraMicrophonePermissionPromptPayload | undefined>>
  status: DeepReadonly<Ref<LyraMicrophonePermissionState>>
  refresh: () => Promise<LyraMicrophonePermissionState>
  reset: () => Promise<void>
  resolvePrompt: (decision: LyraMicrophonePermissionDecision) => Promise<void>
}

function createHostMicrophonePermission(context: KirieEventaContext): HostMicrophonePermission {
  const status = shallowRef<LyraMicrophonePermissionState>('not-determined')
  const prompt = shallowRef<LyraMicrophonePermissionPromptPayload>()
  const getState = defineInvoke(context, lyraMicrophonePermissionGetState)
  const getPrompt = defineInvoke(context, lyraMicrophonePermissionGetPrompt)
  const resetPermission = defineInvoke(context, lyraMicrophonePermissionReset)
  const resolvePrompt = defineInvoke(context, lyraMicrophonePermissionResolvePrompt)

  context.on(lyraMicrophonePermissionStateChanged, ({ body }) => {
    if (body?.permission === 'microphone')
      status.value = body.state
  })
  context.on(lyraMicrophonePermissionPromptRequested, ({ body }) => {
    if (body?.permission === 'microphone')
      prompt.value = body
  })
  context.on(lyraMicrophonePermissionPromptDismissed, ({ body }) => {
    if (body?.promptId === prompt.value?.promptId)
      prompt.value = undefined
  })

  async function refresh() {
    const [stateSnapshot, promptSnapshot] = await Promise.all([
      getState({}),
      getPrompt({}),
    ])
    status.value = stateSnapshot.state
    prompt.value = promptSnapshot.promptId
      ? { permission: 'microphone', promptId: promptSnapshot.promptId }
      : undefined
    return stateSnapshot.state
  }

  return {
    prompt: shallowReadonly(prompt),
    status: shallowReadonly(status),
    refresh,
    async reset() {
      const snapshot = await resetPermission({})
      status.value = snapshot.state
    },
    async resolvePrompt(decision) {
      const currentPrompt = prompt.value
      if (!currentPrompt)
        return

      await resolvePrompt({
        decision,
        promptId: currentPrompt.promptId,
      })
      if (prompt.value?.promptId === currentPrompt.promptId)
        prompt.value = undefined
    },
  }
}

let microphonePermission: HostMicrophonePermission | undefined
let microphonePermissionContext: KirieEventaContext | undefined

/** Returns the renderer bridge for LYRA-owned Kirie microphone permission state. */
export function useHostMicrophonePermission(): HostMicrophonePermission {
  const host = initializeHostContext()
  if (!microphonePermission || microphonePermissionContext !== host.context) {
    microphonePermission = createHostMicrophonePermission(host.context)
    microphonePermissionContext = host.context
  }

  return microphonePermission
}
