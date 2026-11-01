import type { AnalyserWorkletParameters, BeatSyncSpectrumScale } from '@proj-lyra/stage-shared/beat-sync'

import { DEFAULT_BEAT_SYNC_PARAMETERS } from '@proj-lyra/stage-shared/beat-sync'
import { useLocalStorageManualReset } from '@proj-lyra/stage-shared/composables'
import { defineStore } from 'pinia'

export const useSettingsBeatSync = defineStore('settings-beat-sync', () => {
  const parameters = useLocalStorageManualReset<AnalyserWorkletParameters>(
    'settings/beat-sync/parameters',
    { ...DEFAULT_BEAT_SYNC_PARAMETERS },
  )
  const spectrumScale = useLocalStorageManualReset<BeatSyncSpectrumScale>(
    'settings/beat-sync/spectrum-scale',
    'logarithm',
  )

  function resetState() {
    parameters.reset()
    spectrumScale.reset()
  }

  return {
    parameters,
    spectrumScale,
    resetState,
  }
})
