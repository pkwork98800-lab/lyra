import { isAuthenticationServerErrorMessage } from '@proj-lyra/server-shared'
import { errorMessageFrom } from '@proj-lyra/std'

interface LyraClientLike {
  connect: () => Promise<void>
}

interface LoggerLike {
  log: (message: string) => void
  warn: (message: string) => void
  withFields: (fields: Record<string, unknown>) => LoggerLike
}

/** Starts a background connection and reports each failure category once until the connection succeeds. */
export function startLyraClientConnection(client: LyraClientLike, deps: {
  logger: LoggerLike
  url: string
}) {
  let unavailableReported = false
  let authenticationReported = false

  const reportAuthenticationFailure = (error: unknown) => {
    const message = errorMessageFrom(error) ?? 'Unknown error'
    if (!isAuthenticationServerErrorMessage(message))
      return false

    if (!authenticationReported) {
      authenticationReported = true
      deps.logger.withFields({ url: deps.url, error: message }).warn(
        'LYRA authentication failed. Copy the token from LYRA Settings -> Connection. Set LYRA_WS_TOKEN in integrations/minecraft/.env.local to that token. Then restart the bot.',
      )
    }
    return true
  }

  const reportUnavailable = (error: unknown) => {
    if (reportAuthenticationFailure(error))
      return

    if (unavailableReported)
      return

    unavailableReported = true
    deps.logger.withFields({
      url: deps.url,
      error: errorMessageFrom(error) ?? 'Unknown error',
    }).warn('LYRA server is unavailable. Continuing startup without LYRA and retrying in background')
  }

  const reportDisconnected = () => {
    deps.logger.withFields({
      url: deps.url,
    }).warn('LYRA server connection closed. Retrying in background')
  }

  void client.connect()
    .then(() => {
      deps.logger.withFields({
        url: deps.url,
      }).log(
        unavailableReported
          ? 'Connected to LYRA server after background retry'
          : 'Connected to LYRA server',
      )
      unavailableReported = false
      authenticationReported = false
    })
    .catch((error) => {
      if (reportAuthenticationFailure(error))
        return

      deps.logger.withFields({
        url: deps.url,
        error: errorMessageFrom(error) ?? 'Unknown error',
      }).warn('LYRA client stopped retrying')
    })

  return {
    reportUnavailable,
    reportDisconnected,
  }
}
