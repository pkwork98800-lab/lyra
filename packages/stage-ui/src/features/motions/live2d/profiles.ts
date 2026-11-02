import type { Pose } from '@proj-lyra/model-driver-magic-live2d'

import gesturesProject from './assets/gestures.json'
import idleCalmProject from './assets/idle-calm.json'
import lookingAroundProject from './assets/looking-around.json'
import sleepingProject from './assets/sleeping.json'
import speakingExcitedProject from './assets/speaking-excited.json'
import walkingProject from './assets/walking.json'

/** One normalized Live2D pose in a MAGIC dataset. */
export interface Live2DMotionMagicSample extends Pose {
  /** Elapsed time from the start of the dataset, in milliseconds. */
  atMs: number
}

/** Timestamped Live2D poses that MAGIC can sample and fit. */
export interface Live2DMotionMagicDataset {
  /** Recording schema when the dataset comes from the Live2D motion recorder. */
  format?: 'lyra-live2d-motion/v6'
  /** Duration of the source dataset, in milliseconds. */
  durationMs: number
  /** Source poses in ascending timestamp order. */
  samples: readonly Live2DMotionMagicSample[]
}

/** One bundled reference dataset that can fit a MAGIC motion model. */
export interface Live2DMotionMagicProfile {
  /** Stable value stored in Live2D settings. */
  id: string
  /** Dataset used to fit VAR or AR-HMM. */
  dataset: Live2DMotionMagicDataset
}

/** Bundled MAGIC profiles available to Live2D settings. */
export const live2dMotionMagicProfiles = {
  'idle-calm': {
    id: 'idle-calm',
    dataset: {
      format: idleCalmProject.source.format as 'lyra-live2d-motion/v6',
      durationMs: idleCalmProject.source.durationMs,
      samples: idleCalmProject.source.samples,
    },
  },
  'speaking-excited': {
    id: 'speaking-excited',
    dataset: {
      format: speakingExcitedProject.source.format as 'lyra-live2d-motion/v6',
      durationMs: speakingExcitedProject.source.durationMs,
      samples: speakingExcitedProject.source.samples,
    },
  },
  'walking': {
    id: 'walking',
    dataset: {
      format: walkingProject.source.format as 'lyra-live2d-motion/v6',
      durationMs: walkingProject.source.durationMs,
      samples: walkingProject.source.samples,
    },
  },
  'gestures': {
    id: 'gestures',
    dataset: {
      format: gesturesProject.source.format as 'lyra-live2d-motion/v6',
      durationMs: gesturesProject.source.durationMs,
      samples: gesturesProject.source.samples,
    },
  },
  'looking-around': {
    id: 'looking-around',
    dataset: {
      format: lookingAroundProject.source.format as 'lyra-live2d-motion/v6',
      durationMs: lookingAroundProject.source.durationMs,
      samples: lookingAroundProject.source.samples,
    },
  },
  'sleeping': {
    id: 'sleeping',
    dataset: {
      format: sleepingProject.source.format as 'lyra-live2d-motion/v6',
      durationMs: sleepingProject.source.durationMs,
      samples: sleepingProject.source.samples,
    },
  },
} as const satisfies Record<string, Live2DMotionMagicProfile>

export type Live2DMotionMagicProfileId = keyof typeof live2dMotionMagicProfiles

/** Profile selected when the user has not chosen another bundled dataset. */
export const defaultLive2DMotionMagicProfileId: Live2DMotionMagicProfileId = 'speaking-excited'

/** Dataset selected when initialize receives no dataset. */
export const defaultLive2DMotionMagicDataset = live2dMotionMagicProfiles[defaultLive2DMotionMagicProfileId].dataset
