import type { ProviderModelCatalog } from '../../types'

import { createOpenAI } from '@xsai-ext/providers/create'
import { z } from 'zod'

import { defineProvider } from '../registry'

function getEnvVar(key: string): string {
  if (typeof import.meta !== 'undefined' && import.meta.env)
    return import.meta.env[key] ?? ''
  return ''
}

const nvidiaConfigSchema = z.object({
  apiKey: z.string().optional(),
  baseUrl: z.string().optional().default('https://integrate.api.nvidia.com/v1'),
})

type NvidiaConfig = z.input<typeof nvidiaConfigSchema>

function createNvidiaConfigSchema(t: import('vue-i18n').ComposerTranslation) {
  return nvidiaConfigSchema.extend({
    apiKey: nvidiaConfigSchema.shape.apiKey.meta({
      labelLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.api-key.label'),
      descriptionLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.api-key.description'),
      placeholderLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.api-key.placeholder'),
      type: 'password',
    }),
    baseUrl: nvidiaConfigSchema.shape.baseUrl.meta({
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

function createNvidiaProvider(config: NvidiaConfig) {
  return createOpenAI(config.apiKey?.trim() ?? '', normalizeBaseUrl(config.baseUrl))
}

function createNvidiaValidators() {
  return {
    validateConfig: [
      ({ t }: { t: import('vue-i18n').ComposerTranslation }) => ({
        id: 'nvidia:check-config',
        name: t('settings.pages.providers.catalog.edit.validators.openai-compatible.check-config.title'),
        validator: async (config: NvidiaConfig) => {
          const valid = Boolean(config.apiKey?.trim())
          const reason = valid
            ? ''
            : 'API key is required. Get one from https://build.nvidia.com/'
          return {
            errors: valid ? [] : [{ error: new Error('API key is required') }],
            reason,
            reasonKey: '',
            valid,
          }
        },
      }),
      ({ t }: { t: import('vue-i18n').ComposerTranslation }) => ({
        id: 'nvidia:check-models',
        name: t('settings.pages.providers.catalog.edit.validators.openai-compatible.check-supports-model-listing.title'),
        validator: async (config: NvidiaConfig) => {
          if (!config.apiKey?.trim()) {
            return { errors: [], reason: '', reasonKey: '', valid: true }
          }
          try {
            const response = await fetch('https://integrate.api.nvidia.com/v1/models', {
              headers: { Authorization: `Bearer ${config.apiKey.trim()}` },
            })
            if (!response.ok) {
              const text = await response.text()
              return {
                errors: [{ error: new Error(`Models list failed: ${response.status}`) }],
                reason: text.slice(0, 200),
                reasonKey: '',
                valid: false,
              }
            }
            return { errors: [], reason: '', reasonKey: '', valid: true }
          }
          catch (error) {
            return {
              errors: [{ error: new Error('Network error') }],
              reason: String(error),
              reasonKey: '',
              valid: false,
            }
          }
        },
      }),
    ],
  }
}

async function listNvidiaModels(): Promise<ProviderModelCatalog> {
  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/models', {
      headers: {
        Authorization: `Bearer ${getEnvVar('NVIDIA_API_KEY')}`,
      },
    })
    if (!response.ok)
      throw new Error(`NVIDIA models fetch failed: ${response.status}`)

    const data = await response.json() as { data: Array<{ id: string, name?: string }> }
    return {
      models: data.data.map(m => ({
        id: m.id,
        name: m.name ?? m.id,
        provider: 'nvidia',
        description: `NVIDIA model: ${m.id}`,
      })),
    }
  }
  catch {
    // Return known NVIDIA models as fallback
    return {
      models: [
        { id: 'meta/llama-3.1-405b-instruct', name: 'Llama 3.1 405B Instruct', provider: 'nvidia', description: 'Meta Llama 3.1 405B' },
        { id: 'meta/llama-3.1-70b-instruct', name: 'Llama 3.1 70B Instruct', provider: 'nvidia', description: 'Meta Llama 3.1 70B' },
        { id: 'meta/llama-3.1-8b-instruct', name: 'Llama 3.1 8B Instruct', provider: 'nvidia', description: 'Meta Llama 3.1 8B' },
        { id: 'nvidia/nemotron-3-ultra', name: 'Nemotron 3 Ultra', provider: 'nvidia', description: 'NVIDIA Nemotron 3 Ultra' },
        { id: 'nvidia/nemotron-3-ultra-550b', name: 'Nemotron 3 Ultra 550B', provider: 'nvidia', description: 'NVIDIA Nemotron 3 Ultra 550B' },
        { id: 'microsoft/phi-3.5-mini-instruct', name: 'Phi-3.5 Mini Instruct', provider: 'nvidia', description: 'Microsoft Phi-3.5 Mini' },
        { id: 'google/gemma-2-27b-it', name: 'Gemma 2 27B IT', provider: 'nvidia', description: 'Google Gemma 2 27B' },
        { id: 'mistralai/mistral-large-2-instruct', name: 'Mistral Large 2 Instruct', provider: 'nvidia', description: 'Mistral Large 2' },
        { id: 'qwen/qwen-2.5-72b-instruct', name: 'Qwen 2.5 72B Instruct', provider: 'nvidia', description: 'Qwen 2.5 72B' },
        { id: 'nvidia/cosmos-1.0-diffusion-7b', name: 'Cosmos 1.0 Diffusion 7B', provider: 'nvidia', description: 'NVIDIA Cosmos Diffusion' },
      ],
    }
  }
}

export const providerNvidia = defineProvider<NvidiaConfig, 'nvidia'>({
  id: 'nvidia',
  order: 10,
  name: 'NVIDIA',
  nameLocalize: ({ t }) => t('settings.pages.providers.provider.nvidia.title'),
  description: 'NVIDIA NIM API - accelerated LLM inference on NVIDIA GPUs',
  descriptionLocalize: ({ t }) => t('settings.pages.providers.provider.nvidia.description'),
  tasks: ['text-generation'],
  icon: 'i-lobe-icons:nvidia',
  createProviderConfig: ({ t }) => createNvidiaConfigSchema(t),
  createProvider: createNvidiaProvider,
  validators: createNvidiaValidators(),
  extraMethods: {
    listModelCatalog: listNvidiaModels,
    listModels: async () => (await listNvidiaModels()).models,
  },
})
