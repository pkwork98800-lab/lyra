import { defineInvokeEventa } from '@proj-lyra/eventa'

export const electronPluginGetAssetBaseUrl = defineInvokeEventa<string>('eventa:invoke:electron:plugins:asset-base-url')
