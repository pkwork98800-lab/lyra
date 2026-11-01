import type { MetricSample } from './types'

import { describe, expect, it } from 'vitest'

import { defineMetric } from '../core/define'
import { summarizeMetric } from './metrics'

describe('summarizeMetric', () => {
  it('summarizes each dimension combination and leaves out excluded samples', () => {
    const definition = defineMetric({
      key: 'handoff_ms',
      dimensions: ['from', 'to'],
      aggregate: ['sum', 'count'],
      value: { kind: 'derived', projection: 'handoff' },
    })
    const samples: MetricSample[] = [
      { time: 0, value: 10, dimensions: { from: 'user', to: 'lyra' } },
      { time: 1, value: 20, dimensions: { from: 'user', to: 'lyra' } },
      { time: 2, value: 5, dimensions: { from: 'lyra', to: 'user' } },
      { time: 3, value: 99, dimensions: { from: 'lyra', to: 'user' }, excluded: 'censored' },
    ]

    const summary = summarizeMetric('handoff_ms', samples, definition)

    expect(summary.byDimension).toEqual({
      'user|lyra': { sum: 30, count: 2 },
      'lyra|user': { sum: 5, count: 1 },
    })
    expect(Object.keys(summary.byDimension!)).toEqual(['user|lyra', 'lyra|user'])
    expect(summary.excluded).toEqual({ censored: 1, warmup: 0, failed: 0 })
  })
})
