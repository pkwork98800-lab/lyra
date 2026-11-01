import type { DebugTargetLike } from './debug-targets'

import { describe, expect, it } from 'vitest'

import {

  isChatSurfaceTarget,
  isInspectableLyraRendererTarget,
  prioritizeInspectableLyraTargets,
} from './debug-targets'

function createTarget(partial: Partial<DebugTargetLike>): DebugTargetLike {
  return {
    id: partial.id || 'target',
    title: partial.title || '',
    type: partial.type || 'page',
    url: partial.url || 'http://localhost:5173/',
    webSocketDebuggerUrl: partial.webSocketDebuggerUrl,
  }
}

describe('debug target helpers', () => {
  it('filters out helper renderer pages like beat-sync and devtools', () => {
    expect(isInspectableLyraRendererTarget(createTarget({
      url: 'http://localhost:5173/beat-sync.html',
    }))).toBe(false)

    expect(isInspectableLyraRendererTarget(createTarget({
      url: 'http://localhost:5173/__inspect__',
    }))).toBe(false)

    expect(isInspectableLyraRendererTarget(createTarget({
      url: 'http://localhost:5173/',
    }))).toBe(true)
  })

  it('prioritizes chat and main LYRA surfaces ahead of generic pages', () => {
    const targets = prioritizeInspectableLyraTargets([
      createTarget({
        id: 'generic',
        title: '',
        url: 'http://localhost:5173/widgets.html',
      }),
      createTarget({
        id: 'main',
        title: 'LYRA',
        url: 'http://localhost:5173/',
      }),
      createTarget({
        id: 'chat',
        title: 'Chat',
        url: 'http://localhost:5173/#/chat',
      }),
    ])

    expect(targets.map(target => target.id)).toEqual(['chat', 'main', 'generic'])
  })

  it('detects chat surfaces from either target metadata or LYRA debug snapshots', () => {
    expect(isChatSurfaceTarget(createTarget({
      title: 'Chat',
      url: 'http://localhost:5173/',
    }))).toBe(true)

    expect(isChatSurfaceTarget(createTarget({
      title: 'LYRA',
      url: 'http://localhost:5173/',
    }), {
      route: '#/chat',
    })).toBe(true)

    expect(isChatSurfaceTarget(createTarget({
      title: 'LYRA',
      url: 'http://localhost:5173/',
    }), {
      route: '#/',
    })).toBe(false)
  })
})
