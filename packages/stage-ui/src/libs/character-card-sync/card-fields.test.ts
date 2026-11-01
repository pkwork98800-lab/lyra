import type { LyraCard } from '../../types/lyraCard'

import { describe, expect, it } from 'vitest'

import { joinCard, splitCard } from './card-fields'

const card: LyraCard = {
  name: 'Luna',
  version: '1.0.0',
  description: 'A calm character',
  tags: ['calm', 'night'],
  greetings: ['Hello'],
  extensions: {
    'depth/prompt': { depth: 4 },
    'lyra': {
      wakeWords: [],
      avatarModels: [{ id: 'avatar-model-1', displayModelId: 'display-model-1', type: 'vrm', config: {} }],
      defaultAvatarModelId: 'avatar-model-1',
      modules: {
        consciousness: { provider: 'openai', model: 'gpt' },
        vision: { provider: '', model: '' },
        speech: { provider: 'azure', model: 'neural', voice_id: 'aria', pitch: undefined },
      },
      agents: {},
    },
  },
}

describe('splitCard', () => {
  it('gives one part for each first-level key and each module', () => {
    expect(splitCard(card)).toEqual({
      '/name': 'Luna',
      '/version': '1.0.0',
      '/description': 'A calm character',
      '/tags': ['calm', 'night'],
      '/greetings': ['Hello'],
      '/extensions/depth~1prompt': { depth: 4 },
      '/extensions/lyra/wakeWords': [],
      '/extensions/lyra/avatarModels': [{ id: 'avatar-model-1', displayModelId: 'display-model-1', type: 'vrm', config: {} }],
      '/extensions/lyra/defaultAvatarModelId': 'avatar-model-1',
      '/extensions/lyra/agents': {},
      '/extensions/lyra/modules/consciousness': { provider: 'openai', model: 'gpt' },
      '/extensions/lyra/modules/vision': { provider: '', model: '' },
      '/extensions/lyra/modules/speech': { provider: 'azure', model: 'neural', voice_id: 'aria' },
    })
  })
})

describe('joinCard', () => {
  it('restores the card that was split', () => {
    expect(joinCard(splitCard(card))).toEqual(JSON.parse(JSON.stringify(card)))
  })

  it('ignores keys that do not name a part', () => {
    const joined = joinCard({
      '/name': 'Luna',
      'name': 'no pointer',
      '/extensions': { lyra: 'container' },
      '/extensions/lyra/modules': { speech: 'container' },
      '/extensions/lyra/modules/speech/provider': 'too deep',
      '/__proto__': { polluted: true },
      '/extensions/__proto__': { polluted: true },
    })

    expect(joined).toEqual({ name: 'Luna' })
    expect(Object.getPrototypeOf(joined)).toBe(Object.prototype)
    expect(({} as { polluted?: boolean }).polluted).toBeUndefined()
  })
})

describe('the built-in card', () => {
  const builtIn: LyraCard = {
    name: 'ReLU',
    version: '1.0.0',
    description: 'Built-in description',
    extensions: { lyra: { avatarModels: [], modules: { consciousness: { provider: '', model: '' }, speech: { provider: '', model: '', voice_id: '' }, vision: { provider: '', model: '' } }, agents: {} } },
  }

  it('leaves out the parts that equal the built-in card', () => {
    const edited: LyraCard = { ...builtIn, systemPrompt: 'Be kind', extensions: { lyra: { ...builtIn.extensions.lyra, modules: { ...builtIn.extensions.lyra.modules, speech: { provider: 'a', model: 'b', voice_id: 'c' } } } } }

    expect(splitCard(builtIn, [builtIn])).toEqual({})
    expect(splitCard(edited, [builtIn])).toEqual({
      '/systemPrompt': 'Be kind',
      '/extensions/lyra/modules/speech': { provider: 'a', model: 'b', voice_id: 'c' },
    })
  })

  it('leaves out a part that equals the built-in card of another language', () => {
    const inJapanese = { ...builtIn, description: '日本語の説明' }

    expect(splitCard(inJapanese, [builtIn, inJapanese])).toEqual({})
    expect(splitCard({ ...builtIn, description: 'Edited by the user' }, [builtIn, inJapanese])).toEqual({ '/description': 'Edited by the user' })
  })

  it('takes the parts that the fields lack from the built-in card', () => {
    const joined = joinCard({ '/systemPrompt': 'Be kind' }, builtIn)

    expect(joined).toMatchObject({ name: 'ReLU', description: 'Built-in description', systemPrompt: 'Be kind' })
    expect(joinCard(splitCard({ ...builtIn, name: 'Mine' }, [builtIn]), builtIn)).toEqual(JSON.parse(JSON.stringify({ ...builtIn, name: 'Mine' })))
  })
})
