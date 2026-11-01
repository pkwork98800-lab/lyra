import { describe, expect, it } from 'vitest'

import { buildAuthUiRedirectUrl, buildAuthUiUrl, resolveAuthUiUrl } from '../routes'

describe('auth UI URL helpers', () => {
  it('builds auth UI URLs under the configured auth base path', () => {
    expect(buildAuthUiUrl('https://accounts.lyra.build/ui', '/sign-in', '?client_id=web')).toBe(
      'https://accounts.lyra.build/ui/sign-in?client_id=web',
    )
  })

  it('maps server /auth requests to the standalone auth UI while preserving queries', () => {
    expect(buildAuthUiRedirectUrl(
      'https://accounts.lyra.build/ui/',
      'https://api.lyra.build/auth/verify-email?verified=true',
    )).toBe('https://accounts.lyra.build/ui/verify-email?verified=true')
  })

  it('adds the API server origin for standalone auth UI cross-environment redirects', () => {
    expect(buildAuthUiRedirectUrl(
      'https://auth-preview.example/ui/',
      'https://api-dev.lyra.build/auth/sign-in?client_id=lyra-stage-web&api_server_url=https%3A%2F%2Fevil.example',
      'https://api-dev.lyra.build/api/auth',
    )).toBe(
      'https://auth-preview.example/ui/sign-in?client_id=lyra-stage-web&api_server_url=https%3A%2F%2Fapi-dev.lyra.build',
    )
  })

  it('routes server-dev default auth UI redirects to the matching Pages branch', () => {
    expect(buildAuthUiRedirectUrl(
      'https://accounts.lyra.build/ui',
      'https://api-dev.lyra.build/auth/sign-in?client_id=lyra-stage-web',
      'https://api-dev.lyra.build',
    )).toBe(
      'https://server-dev.lyra-server-auth.pages.dev/ui/sign-in?client_id=lyra-stage-web&api_server_url=https%3A%2F%2Fapi-dev.lyra.build',
    )
  })

  it('keeps an explicitly configured auth UI URL for server-dev', () => {
    expect(resolveAuthUiUrl(
      'https://auth-preview.example/ui',
      'https://api-dev.lyra.build',
    )).toBe('https://auth-preview.example/ui')
  })
})
