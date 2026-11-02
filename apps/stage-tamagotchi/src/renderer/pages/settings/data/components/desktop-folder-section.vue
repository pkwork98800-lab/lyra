<script setup lang="ts">
import type { DataSettingsStatusEmits } from '@proj-lyra/stage-pages/pages/settings/data/status'

import { defineInvoke } from '@proj-lyra/eventa'
import { createContext } from '@proj-lyra/eventa/adapters/electron/renderer'
import { createDataSettingsStatusHelpers } from '@proj-lyra/stage-pages/pages/settings/data/status'
import { isElectronWindow } from '@proj-lyra/stage-shared'
import { Button } from '@proj-lyra/ui'
import { useI18n } from 'vue-i18n'

import { electronAppOpenUserDataFolder, electronAppPickFolder } from '../../../../../shared/eventa'

const emit = defineEmits<DataSettingsStatusEmits>()
const { t } = useI18n()
const { handleActionError } = createDataSettingsStatusHelpers(emit)

async function triggerOpenDesktopUserDataFolder() {
  if (typeof window === 'undefined' || !isElectronWindow(window))
    return

  try {
    const { context } = createContext(window.electron.ipcRenderer)
    const openUserDataFolder = defineInvoke(context, electronAppOpenUserDataFolder)

    await openUserDataFolder()
  }
  catch (error) {
    handleActionError(error)
  }
}

async function triggerPickMemoryFolder() {
  if (typeof window === 'undefined' || !isElectronWindow(window))
    return

  try {
    const { context } = createContext(window.electron.ipcRenderer)
    const pickFolder = defineInvoke(context, electronAppPickFolder)

    const result = await pickFolder()
    if (result.path) {
      // TODO: Save the chosen folder path to settings
      // For now just show it
      // eslint-disable-next-line no-alert
      window.alert(`Selected folder: ${result.path}`)
    }
  }
  catch (error) {
    handleActionError(error)
  }
}
</script>

<template>
  <div :class="['border-2 border-neutral-200/50 rounded-xl bg-white/70 p-4 shadow-sm', 'dark:border-neutral-800/60 dark:bg-neutral-900/60']">
    <div :class="['grid grid-cols-1 items-start gap-3 md:grid-cols-[minmax(0,1fr)_auto]']">
      <div :class="['flex flex-col gap-1 md:max-w-[560px]']">
        <div :class="['text-lg font-medium']">
          {{ t('settings.pages.data.sections.desktop-folder.title') }}
        </div>
        <p :class="['text-sm text-neutral-600 dark:text-neutral-400']">
          {{ t('settings.pages.data.sections.desktop-folder.description') }}
        </p>
      </div>
      <div :class="['flex flex-col items-start gap-2']">
        <Button @click="triggerOpenDesktopUserDataFolder">
          {{ t('settings.pages.data.sections.desktop-folder.open') }}
        </Button>
        <Button variant="secondary" @click="triggerPickMemoryFolder">
          {{ t('settings.pages.data.sections.desktop-folder.choose') }}
        </Button>
      </div>
    </div>
  </div>
</template>
