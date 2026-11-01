import type { ContextMessage } from '../../../types/chat'

import { ContextUpdateStrategy } from '@proj-lyra/server-sdk'
import { nanoid } from 'nanoid'

import { useMinecraftStore } from '../../modules/gaming-minecraft'

const MINECRAFT_CONTEXT_ID = 'system:minecraft-integration'

export function createMinecraftContext(): ContextMessage | null {
  const minecraftStore = useMinecraftStore()
  minecraftStore.initialize()

  if (!minecraftStore.configured)
    return null

  const serviceStatus = minecraftStore.serviceConnected ? 'online' : 'offline'
  const runtimeContextText = minecraftStore.latestRuntimeContextText.trim()

  return {
    id: nanoid(),
    contextId: MINECRAFT_CONTEXT_ID,
    strategy: ContextUpdateStrategy.ReplaceSelf,
    text: [
      'Minecraft integration is active because LYRA has observed a Minecraft service.',
      'LYRA can oversee a connected Minecraft bot through LYRA server events.',
      'Minecraft can send status and context upward, and LYRA can send high-level guidance back down.',
      'Minecraft context updates are side context for the next turn and do not automatically trigger a new LLM response.',
      `Minecraft service is currently ${serviceStatus}.`,
      runtimeContextText
        ? `Latest Minecraft bot context: ${runtimeContextText}`
        : 'No live Minecraft bot context has been pushed yet.',
      serviceStatus === 'online'
        ? 'The Minecraft service is online, but LYRA should still rely on live bot context before assuming the bot can act.'
        : 'Do not assume the Minecraft bot can act right now unless fresh bot context confirms it.',
    ].join(' '),
    createdAt: Date.now(),
  }
}
