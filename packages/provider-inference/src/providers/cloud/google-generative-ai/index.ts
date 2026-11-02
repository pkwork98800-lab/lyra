import type { ChatRequestOptions } from '../../../types'

import { createGoogleGenerativeAI } from '@xsai-ext/providers/create'
import { z } from 'zod'

import { ProviderValidationCheck } from '../../../types'
import { createOpenAICompatibleValidators } from '../../../validators'
import { defineProvider } from '../../registry'

const googleGenerativeConfigSchema = z.object({
  apiKey: z
    .string('API Key'),
  baseUrl: z
    .string('Base URL')
    .optional()
    .default('https://generativelanguage.googleapis.com/v1beta/openai/'),
})

type GoogleGenerativeConfig = z.input<typeof googleGenerativeConfigSchema>

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

export const providerGoogleGenerativeAI = defineProvider<GoogleGenerativeConfig, 'google-generative-ai'>({
  id: 'google-generative-ai',
  order: 8,
  name: 'Google Gemini',
  nameLocalize: ({ t }) => t('settings.pages.providers.provider.google-generative-ai.title'),
  description: 'ai.google.dev',
  descriptionLocalize: ({ t }) => t('settings.pages.providers.provider.google-generative-ai.description'),
  tasks: ['chat'],
  capabilities: { chat: { reasoning: { modes: ['enabled', 'disabled'] } } },
  icon: 'i-lobe-icons:gemini',
  iconColor: 'i-lobe-icons:gemini-color',

  createProviderConfig: ({ t }) => googleGenerativeConfigSchema.extend({
    apiKey: googleGenerativeConfigSchema.shape.apiKey.meta({
      labelLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.api-key.label'),
      descriptionLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.api-key.description'),
      placeholderLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.api-key.placeholder'),
      type: 'password',
    }),
    baseUrl: googleGenerativeConfigSchema.shape.baseUrl.meta({
      labelLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.base-url.label'),
      descriptionLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.base-url.description'),
      placeholderLocalized: t('settings.pages.providers.catalog.edit.config.common.fields.field.base-url.placeholder'),
    }),
  }),
  createProvider(config) {
    const provider = createGoogleGenerativeAI(config.apiKey, config.baseUrl)
    return {
      ...provider,
      chat(model: string, options?: ChatRequestOptions) {
        const request = provider.chat(model)
        if (!options?.reasoning)
          return request

        return { ...request, reasoningEffort: options.reasoning === 'enabled' ? 'medium' : 'none' }
      },
    }
  },

  validationRequiredWhen(config) {
    return !!config.apiKey?.trim()
  },
  validators: {
    ...createOpenAICompatibleValidators({
      checks: [ProviderValidationCheck.Connectivity, ProviderValidationCheck.ModelList, ProviderValidationCheck.ChatCompletions],
      normalizeModelId: normalizeGoogleValidationModel,
    }),
  },

  extraMethods: {
    listModels: async (config) => {
      const baseUrl = config.baseUrl ?? 'https://generativelanguage.googleapis.com/v1beta/openai/'
      const modelsUrl = baseUrl.endsWith('/') ? `${baseUrl}models` : `${baseUrl}/models`
      try {
        const response = await fetch(modelsUrl, {
          headers: { Authorization: `Bearer ${config.apiKey}` },
        })
        if (!response.ok)
          return []
        const data = await response.json() as { data?: Array<{ id?: string }> }
        return (data.data ?? [])
          .map(model => model.id ?? '')
          .filter(id => id.length > 0 && isGoogleChatModelId(id))
          .map(id => ({
            id,
            name: id.replace(/^models\//, ''),
            provider: 'google-generative-ai',
            description: 'Google Gemini chat model',
          }))
      }
      catch {
        return []
      }
    },
  },
})
