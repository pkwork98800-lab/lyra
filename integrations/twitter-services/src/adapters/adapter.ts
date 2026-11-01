import type { Config } from '../config/types'
import type { Context } from '../core/browser/context'
import type { LyraAdapter } from './lyra-adapter'
import type { MCPAdapter } from './mcp-adapter'

import { logger } from '../utils/logger'

export function useAdapter() {
  const adapters: { lyra?: LyraAdapter, mcp?: MCPAdapter } = {}

  async function initAdapters(config: Config, ctx: Context): Promise<{ lyra?: LyraAdapter, mcp?: MCPAdapter }> {
    if (config.adapters.lyra?.enabled) {
      logger.main.log('Starting Lyra adapter...')
      const { LyraAdapter } = await import('./lyra-adapter')

      adapters.lyra = new LyraAdapter(ctx, {
        url: config.adapters.lyra.url,
        token: config.adapters.lyra.token,
        credentials: config.credentials || {},
      })

      await adapters.lyra.start()
      logger.main.log('Lyra adapter started')
    }

    if (config.adapters.mcp?.enabled) {
      logger.main.log('Starting MCP adapter...')
      const { MCPAdapter } = await import('./mcp-adapter')

      adapters.mcp = new MCPAdapter(config.adapters.mcp.port, ctx)

      await adapters.mcp.start()
      logger.main.log('MCP adapter started')
    }

    return adapters
  }

  return {
    adapters,
    initAdapters,
  }
}
