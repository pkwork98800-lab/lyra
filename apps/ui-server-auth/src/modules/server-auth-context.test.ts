// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'

import { getServerAuthBootstrapContext, resolveStandaloneServerAuthContext } from './server-auth-context'

describe('ui-server-auth bootstrap context', () => {
  it('uses the trusted API server origin carried by standalone server redirects', () => {
    expect(resolveStandaloneServerAuthContext(
      'https://accounts.lyra.build/ui/sign-in?api_server_url=https%3A%2F%2Fapi-dev.lyra.build%2Fapi%2Fauth&client_id=lyra-stage-web',
      'https://api.lyra.build',
    )).toEqual({
      apiServerUrl: 'https://api-dev.lyra.build',
      currentUrl: 'https://accounts.lyra.build/ui/sign-in?api_server_url=https%3A%2F%2Fapi-dev.lyra.build%2Fapi%2Fauth&client_id=lyra-stage-web',
    })
  })

  it('uses the trusted new Go backend origin carried by standalone server redirects', () => {
    const currentUrl = 'https://auth.lyra.build/ui/sign-in?api_server_url=https%3A%2F%2Flyra-server-next.up.railway.app&client_id=lyra-stage-pocket'

    expect(resolveStandaloneServerAuthContext(
      currentUrl,
      'https://api.lyra.build',
    )).toEqual({
      apiServerUrl: 'https://lyra-server-next.up.railway.app',
      currentUrl,
    })
  })

  it('ignores untrusted API server origins from crafted standalone auth URLs', () => {
    expect(resolveStandaloneServerAuthContext(
      'https://accounts.lyra.build/ui/sign-in?api_server_url=https%3A%2F%2Fevil.example&client_id=lyra-stage-web',
      'https://api.lyra.build',
    )).toBeNull()
  })

  it('allows localhost API origins for local development', () => {
    expect(resolveStandaloneServerAuthContext(
      'http://localhost:5173/ui/sign-in?api_server_url=http%3A%2F%2F127.0.0.1%3A3000',
      'https://api.lyra.build',
    )?.apiServerUrl).toBe('http://127.0.0.1:3000')
  })

  it('normalizes known production API hosts to HTTPS when typed with HTTP', () => {
    expect(resolveStandaloneServerAuthContext(
      'https://accounts.lyra.build/ui/sign-in?api_server_url=http%3A%2F%2Fapi.lyra.build',
      'http://localhost:3000',
    )?.apiServerUrl).toBe('https://api.lyra.build')
  })

  it('falls back to the standalone query context when the static placeholder script is still present', () => {
    document.body.innerHTML = '<script id="lyra-server-auth-context" type="application/json">__LYRA_SERVER_AUTH_CONTEXT__</script>'
    window.history.replaceState(
      null,
      '',
      '/ui/sign-in?api_server_url=https%3A%2F%2Fapi-dev.lyra.build',
    )

    expect(getServerAuthBootstrapContext()?.apiServerUrl).toBe('https://api-dev.lyra.build')
  })
})
