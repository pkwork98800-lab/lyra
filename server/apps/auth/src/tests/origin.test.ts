import { describe, expect, it } from 'vitest'

import { getAuthTrustedOrigins, getTrustedOrigin } from '../origin'

describe('auth origin policy', () => {
  it('collects public, first-party, loopback, and request origins', () => {
    const request = new Request('http://localhost/api/auth/sign-in/social', {
      headers: { origin: 'http://localhost:5173' },
    })

    expect(getAuthTrustedOrigins({
      PUBLIC_URL: 'https://api.lyra.local',
      ADDITIONAL_TRUSTED_ORIGINS: [],
    }, request)).toEqual([
      'https://api.lyra.local',
      'https://lyra.local',
      'https://accounts.lyra.build',
      'https://server-dev.lyra-server-auth.pages.dev',
      'https://admin.lyra.build',
      'https://server-dev.lyra-server-admin.pages.dev',
      'https://appleid.apple.com',
      'http://localhost:*',
      'http://127.0.0.1:*',
      'http://localhost:5173',
    ])
  })

  it('includes explicit development origins without trusting native callback schemes', () => {
    const origins = getAuthTrustedOrigins({
      PUBLIC_URL: 'https://api.lyra.build',
      ADDITIONAL_TRUSTED_ORIGINS: ['https://10.0.0.129:5273'],
    })

    expect(origins).toContain('https://10.0.0.129:5273')
    expect(getTrustedOrigin('capacitor://localhost')).toBe('capacitor://localhost')
    expect(origins).not.toContain('capacitor://localhost')
    expect(origins).not.toContain('ai.lyra-pocket://links')
  })

  it('always trusts the first-party auth UI for email callbacks', () => {
    expect(getAuthTrustedOrigins({
      PUBLIC_URL: 'https://api.lyra.build',
      ADDITIONAL_TRUSTED_ORIGINS: [],
    })).toContain('https://accounts.lyra.build')
  })
})
