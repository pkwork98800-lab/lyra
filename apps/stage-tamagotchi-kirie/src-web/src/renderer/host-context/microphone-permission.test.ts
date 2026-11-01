import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  lyraMicrophonePermissionPromptDismissed,
  lyraMicrophonePermissionPromptRequested,
  lyraMicrophonePermissionStateChanged,
} from '../../shared/eventa'
import { useHostMicrophonePermission } from './microphone-permission'

const eventHandlers = vi.hoisted(() => new Map<object, (event: { body?: Record<string, string> }) => void>())
const invoke = vi.hoisted(() => vi.fn())

vi.mock('@proj-lyra/eventa', async (importOriginal) => {
  const original = await importOriginal<typeof import('@proj-lyra/eventa')>()
  return {
    ...original,
    defineInvoke: (_context: unknown, event: { sendEvent: { id: string } }) => {
      return (payload: unknown) => invoke(event.sendEvent.id, payload)
    },
  }
})

vi.mock('./owner', () => ({
  initializeHostContext: () => ({
    context: {
      on: (event: object, handler: (event: { body?: Record<string, string> }) => void) => {
        eventHandlers.set(event, handler)
        return () => eventHandlers.delete(event)
      },
    },
  }),
}))

describe('host microphone permission', () => {
  const permission = useHostMicrophonePermission()

  beforeEach(() => {
    invoke.mockReset().mockImplementation(async (eventId: string) => {
      if (eventId.includes('get-state'))
        return { permission: 'microphone', state: 'granted' }
      if (eventId.includes('get-prompt'))
        return { permission: 'microphone', promptId: null }
      if (eventId.includes('reset'))
        return { permission: 'microphone', state: 'not-determined' }
      return undefined
    })
  })

  it('tracks host state and resolves only the opaque active prompt', async () => {
    await permission.refresh()
    expect(permission.status.value).toBe('granted')

    eventHandlers.get(lyraMicrophonePermissionPromptRequested)?.({
      body: { permission: 'microphone', promptId: 'opaque-prompt' },
    })
    expect(permission.prompt.value?.promptId).toBe('opaque-prompt')

    await permission.resolvePrompt('denied')
    expect(invoke).toHaveBeenLastCalledWith(
      'eventa:invoke:lyra:permissions:microphone:resolve-prompt-send',
      { decision: 'denied', promptId: 'opaque-prompt' },
    )
    expect(permission.prompt.value).toBeUndefined()

    eventHandlers.get(lyraMicrophonePermissionStateChanged)?.({
      body: { permission: 'microphone', state: 'denied' },
    })
    expect(permission.status.value).toBe('denied')
  })

  it('clears a prompt when the host times it out', () => {
    eventHandlers.get(lyraMicrophonePermissionPromptRequested)?.({
      body: { permission: 'microphone', promptId: 'expired-prompt' },
    })
    eventHandlers.get(lyraMicrophonePermissionPromptDismissed)?.({
      body: { promptId: 'expired-prompt' },
    })

    expect(permission.prompt.value).toBeUndefined()
  })

  it('resets a persisted decision through the host', async () => {
    await permission.reset()

    expect(invoke).toHaveBeenLastCalledWith(
      'eventa:invoke:lyra:permissions:microphone:reset-send',
      {},
    )
    expect(permission.status.value).toBe('not-determined')
  })
})
