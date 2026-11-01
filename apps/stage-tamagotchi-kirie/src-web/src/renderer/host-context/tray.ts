import type { WatchSource } from 'vue'

import type { LyraTrayLabels } from '../../shared/eventa'

import { defineInvoke } from '@proj-lyra/eventa'
import { watch } from 'vue'

import { lyraTraySetLabels } from '../../shared/eventa'
import { initializeHostContext } from './owner'

type Translate = (key: string) => string

const labelKeyPrefix = 'tamagotchi.electron.tray.menu.labels.label'

/** Translates the tray labels with the Electron tray keys. */
function createHostTrayLabels(t: Translate): LyraTrayLabels {
  const label = (key: string) => t(`${labelKeyPrefix}.${key}`)

  return {
    show: label('show'),
    adjustSizes: label('adjust_sizes'),
    recommendedSize: label('recommended_size'),
    fullHeight: label('full_height'),
    halfHeight: label('half_height'),
    fullScreen: label('full_screen'),
    alignTo: label('align_to'),
    center: label('center'),
    topLeft: label('top_left'),
    topRight: label('top_right'),
    bottomLeft: label('bottom_left'),
    bottomRight: label('bottom_right'),
    settings: label('settings'),
    about: label('about'),
    openInlay: label('open_inlay'),
    openWidgets: label('open_widgets'),
    openCaption: label('open_caption'),
    captionOverlay: label('caption_overlay'),
    followWindow: label('follow_window'),
    resetPosition: label('reset_position'),
    devtools: label('devtools'),
    troubleshootBeatSync: label('troubleshoot_beatsync'),
    quit: label('quit'),
  }
}

interface HostTrayLabelsOptions {
  locale: WatchSource<string>
  t: Translate
}

/** Sends translated tray labels to Godot at start and after each locale change. Call it only from the main renderer. */
export function startHostTrayLabels(options: HostTrayLabelsOptions): () => void {
  const host = initializeHostContext()
  const setLabels = defineInvoke(host.context, lyraTraySetLabels)

  return watch(options.locale, () => {
    setLabels(createHostTrayLabels(options.t)).catch((error) => {
      console.warn('[host-context] Failed to update the tray labels:', error)
    })
  }, { immediate: true })
}
