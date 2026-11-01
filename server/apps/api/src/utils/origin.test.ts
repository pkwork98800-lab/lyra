import { describe, expect, it } from 'vitest'

import { resolveCheckoutRedirectBase } from './origin'

describe('resolveCheckoutRedirectBase', () => {
  const fallback = 'https://lyra.local'

  it('returns a trusted request origin', () => {
    const request = new Request('https://api.lyra.build/checkout', { headers: { origin: 'http://localhost:5173' } })

    expect(resolveCheckoutRedirectBase(request, [], fallback)).toBe('http://localhost:5173')
  })

  it('falls back when the Origin header carries a path that ends with a trusted host suffix', () => {
    const request = new Request('https://api.lyra.build/checkout', { headers: { origin: 'https://evil.example/x.lyra-org.workers.dev' } })

    expect(resolveCheckoutRedirectBase(request, [], fallback)).toBe(fallback)
  })
})
