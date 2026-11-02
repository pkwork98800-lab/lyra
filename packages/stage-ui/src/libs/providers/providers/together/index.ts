import type { ProviderModelCatalog } from '../../types'

import { createOpenAI } from '@xsai-ext/providers/create'
import { z } from 'zod'

import { defineProvider } from '../registry'

function getEnvVar(key: string): string {
  if (typeof import.meta !== 'undefined' && import.meta.env)
    return import.meta.env[key] ?? ''
  return ''
}

const togetherConfigSchema = z.object({
  apiKey: z.string().optional(),
  baseUrl: z.string().optional().default('https://api.together.xyz/v1'),
})

type TogetherConfig = z.input<typeof togetherConfigSchema>

function createTogetherConfigSchema(t: import('vue-i18n').ComposerTranslation) {
  return togetherConfigSchema.extend({
    apiKey: togetherConfigSchema.shape.apiKey.meta({
      labelLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.api-key.label'),
      descriptionLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.api-key.description'),
      placeholderLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.api-key.placeholder'),
      type: 'password',
    }),
    baseUrl: togetherConfigSchema.shape.baseUrl.meta({
      labelLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.base-url.label'),
      descriptionLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.base-url.description'),
      placeholderLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.base-url.placeholder'),
    }),
  })
}

function normalizeBaseUrl(baseUrl: string | undefined) {
  const normalized = baseUrl?.trim() ?? ''
  return normalized && !normalized.endsWith('/') ? `${normalized}/` : normalized
}

function createTogetherProvider(config: TogetherConfig) {
  return createOpenAI(config.apiKey?.trim() ?? '', normalizeBaseUrl(config.baseUrl))
}

function createTogetherValidators() {
  return {
    validateConfig: [
      ({ t }: { t: import('vue-i18n').ComposerTranslation }) => ({
        id: 'together:check-config',
        name: t('settings.pages.providers.catalog.edit.validators.openai-compatible.check-config.title'),
        validator: async (config: TogetherConfig) => {
          const valid = Boolean(config.apiKey?.trim())
          const reason = valid
            ? ''
            : 'API key is required. Get one from https://api.together.xyz/settings/api-keys'
          return {
            errors: valid ? [] : [{ error: new Error('API key is required') }],
            reason,
            reasonKey: '',
            valid,
          }
        },
      }),
    ],
  }
}

async function listTogetherModels(): Promise<ProviderModelCatalog> {
  try {
    const apiKey = getEnvVar('TOGETHER_API_KEY')
    const response = await fetch('https://api.together.xyz/v1/models', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    if (!response.ok)
      throw new Error(`Together models fetch failed: ${response.status}`)

    const data = await response.json() as { data: Array<{ id: string, name?: string }> }
    return {
      models: data.data.map(m => ({
        id: m.id,
        name: m.name ?? m.id,
        provider: 'together',
        description: `Together AI model: ${m.id}`,
      })),
    }
  }
  catch {
    return {
      models: [
        { id: 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo', name: 'Llama 3.1 405B Turbo', provider: 'together', description: 'Meta Llama 3.1 405B' },
        { id: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', name: 'Llama 3.1 70B Turbo', provider: 'together', description: 'Meta Llama 3.1 70B' },
        { id: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo', name: 'Llama 3.1 8B Turbo', provider: 'together', description: 'Meta Llama 3.1 8B' },
        { id: 'Qwen/Qwen2.5-72B-Instruct-Turbo', name: 'Qwen 2.5 72B Turbo', provider: 'together', description: 'Qwen 2.5 72B' },
        { id: 'mistralai/Mixtral-8x7B-Instruct-v0.1', name: 'Mixtral 8x7B', provider: 'together', description: 'Mistral Mixtral 8x7B' },
        { id: 'google/gemma-2-27b-it', name: 'Gemma 2 27B IT', provider: 'together', description: 'Google Gemma 2 27B' },
      ],
    }
  }
}

export const providerTogether = defineProvider<TogetherConfig, 'together'>({
  id: 'together',
  order: 60,
  name: 'Together AI',
  nameLocalize: ({ t }) => t('settings.pages.providers.provider.together.title'),
  description: 'Together AI API - Open-source models at scale',
  descriptionLocalize: ({ t }) => t('settings.pages.providers.provider.together.description'),
  tasks: ['text-generation'],
  icon: 'i-lobe-icons:together',
  createProviderConfig: ({ t }) => createTogetherConfigSchema(t),
  createProvider: createTogetherProvider,
  validators: createTogetherValidators(),
  extraMethods: {
    listModelCatalog: listTogetherModels,
    listModels: async () => (await listTogetherModels()).models,
  },
})
