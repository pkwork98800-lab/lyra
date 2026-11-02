import type { ProviderModelCatalog } from '../../types'

import { createOpenAI } from '@xsai-ext/providers/create'
import { z } from 'zod'

import { ProviderValidationCheck } from '../../types'
import { createOpenAICompatibleValidators } from '../../validators'
import { defineProvider } from '../registry'

function getEnvVar(key: string): string {
  if (typeof import.meta !== 'undefined' && import.meta.env)
    return import.meta.env[key] ?? ''
  return ''
}

const googleConfigSchema = z.object({
  apiKey: z.string().optional(),
  baseUrl: z.string().optional().default('https://generativelanguage.googleapis.com/v1beta/openai/'),
})

type GoogleConfig = z.input<typeof googleConfigSchema>

function createGoogleConfigSchema(t: import('vue-i18n').ComposerTranslation) {
  return googleConfigSchema.extend({
    apiKey: googleConfigSchema.shape.apiKey.meta({
      labelLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.api-key.label'),
      descriptionLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.api-key.description'),
      placeholderLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.api-key.placeholder'),
      type: 'password',
    }),
    baseUrl: googleConfigSchema.shape.baseUrl.meta({
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

function createGoogleProvider(config: GoogleConfig) {
  return createOpenAI(config.apiKey?.trim() ?? '', normalizeBaseUrl(config.baseUrl))
}

const nonChatModelFragments = ['embed', 'tts', 'image', 'lyria', 'robotics', 'computer-use', 'transcribe', 'nano-banana']

/**
 * Reports whether Google still serves this model for chat to new API keys.
 * Gemini 1.x and 2.x models return 404 at chat time even though the models
 * list still advertises them.
 */
function isGoogleChatModelId(modelId: string): boolean {
  const bare = modelId.replace(/^models\//, '')
  if (nonChatModelFragments.some(fragment => bare.includes(fragment)))
    return false
  return !bare.startsWith('gemini-1.') && !bare.startsWith('gemini-2.')
}

/** Routes retired models to a model confirmed to answer, so key validation tests the key and not the model choice. */
function normalizeGoogleValidationModel(modelId: string): string {
  return isGoogleChatModelId(modelId) ? modelId : 'gemini-3.5-flash'
}

function createGoogleValidators() {
  return {
    ...createOpenAICompatibleValidators({
      checks: [
        ProviderValidationCheck.Connectivity,
        ProviderValidationCheck.ModelList,
        ProviderValidationCheck.ChatCompletions,
      ],
      normalizeModelId: normalizeGoogleValidationModel,
    }),
  }
}

const googleFallbackModels: ProviderModelCatalog['models'] = [
  { id: 'gemini-3.5-flash', name: 'gemini-3.5-flash', provider: 'google', description: 'Google Gemini 3.5 Flash' },
  { id: 'gemini-3.7-flash', name: 'gemini-3.7-flash', provider: 'google', description: 'Google Gemini 3.7 Flash' },
  { id: 'gemini-3.1-flash-lite', name: 'gemini-3.1-flash-lite', provider: 'google', description: 'Google Gemini 3.1 Flash Lite' },
  { id: 'gemini-flash-lite-latest', name: 'gemini-flash-lite-latest', provider: 'google', description: 'Google Gemini Flash Lite' },
]

async function listGoogleModels(config?: GoogleConfig): Promise<ProviderModelCatalog> {
  const apiKey = config?.apiKey?.trim() || getEnvVar('GOOGLE_API_KEY')
  if (apiKey) {
    const baseUrl = normalizeBaseUrl(config?.baseUrl) || 'https://generativelanguage.googleapis.com/v1beta/openai/'
    try {
      const response = await fetch(`${baseUrl}models`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      })
      if (response.ok) {
        const data = await response.json() as { data?: Array<{ id?: string }> }
        const models = (data.data ?? [])
          .map(model => model.id ?? '')
          .filter(id => id.length > 0 && isGoogleChatModelId(id))
          .map(id => ({
            id,
            name: id.replace(/^models\//, ''),
            provider: 'google',
            description: 'Google Gemini chat model',
          }))
        if (models.length > 0)
          return { models }
      }
    }
    catch {
      // Fall through to the static list below.
    }
  }
  return { models: googleFallbackModels }
}

export const providerGoogle = defineProvider<GoogleConfig, 'google'>({
  id: 'google',
  order: 20,
  name: 'Google (Gemini)',
  nameLocalize: ({ t }) => t('settings.pages.providers.provider.google.title'),
  description: 'Google Gemini API - Multimodal AI models',
  descriptionLocalize: ({ t }) => t('settings.pages.providers.provider.google.description'),
  tasks: ['text-generation'],
  icon: 'i-lobe-icons:google',
  createProviderConfig: ({ t }) => createGoogleConfigSchema(t),
  createProvider: createGoogleProvider,
  validators: createGoogleValidators(),
  extraMethods: {
    listModelCatalog: listGoogleModels,
    listModels: async config => (await listGoogleModels(config)).models,
    normalizeModelId: normalizeGoogleValidationModel,
  },
})
