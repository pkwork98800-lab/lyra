/**
 * Spine Animation mappings for emotions.
 *
 * Spine animations are defined by the model author. These mappings
 * assume common animation names. Models may need custom mappings.
 */

export interface SpineAnimationMapping {
  /** Animation name in the Spine model */
  animation: string
  /** Whether to loop the animation */
  loop: boolean
  /** Track index to play on (0 = base, 1 = additive, etc.) */
  track?: number
  /** Mix duration for smooth transitions (seconds) */
  mixDuration?: number
  /** Delay before starting (ms) */
  delay?: number
  /** Time scale (1 = normal speed) */
  timeScale?: number
}

/**
 * Spine animation names for standard emotions.
 *
 * These are common animation names. Your model may use different names.
 * Override in your model's configuration if needed.
 */
export const SPINE_EMOTION_ANIMATIONS = {
  happy: {
    animation: 'celebrate',
    loop: true,
    track: 0,
    mixDuration: 0.3,
    timeScale: 1,
  },
  sad: {
    animation: 'sad',
    loop: true,
    track: 0,
    mixDuration: 0.5,
    timeScale: 1,
  },
  angry: {
    animation: 'angry',
    loop: true,
    track: 0,
    mixDuration: 0.3,
    timeScale: 1,
  },
  surprised: {
    animation: 'surprise',
    loop: false,
    track: 0,
    mixDuration: 0.2,
    timeScale: 1,
  },
  think: {
    animation: 'think',
    loop: true,
    track: 0,
    mixDuration: 0.4,
    timeScale: 1,
  },
  awkward: {
    animation: 'awkward',
    loop: true,
    track: 0,
    mixDuration: 0.4,
    timeScale: 1,
  },
  curious: {
    animation: 'curious',
    loop: true,
    track: 0,
    mixDuration: 0.3,
    timeScale: 1,
  },
  neutral: {
    animation: 'idle',
    loop: true,
    track: 0,
    mixDuration: 0.5,
    timeScale: 1,
  },
  question: {
    animation: 'question',
    loop: true,
    track: 0,
    mixDuration: 0.3,
    timeScale: 1,
  },
  // Special gestures
  wave: {
    animation: 'wave',
    loop: false,
    track: 1,
    mixDuration: 0.3,
    delay: 0,
    timeScale: 1,
  },
  heart: {
    animation: 'heart',
    loop: false,
    track: 1,
    mixDuration: 0.5,
    timeScale: 1,
  },
  nod: {
    animation: 'nod',
    loop: false,
    track: 1,
    mixDuration: 0.2,
    timeScale: 1,
  },
  shake: {
    animation: 'shake',
    loop: false,
    track: 1,
    mixDuration: 0.2,
    timeScale: 1,
  },
} satisfies Record<string, SpineAnimationMapping>

/** Get animation mapping for an emotion */
export function getSpineEmotionAnimation(emotion: string): SpineAnimationMapping | undefined {
  return SPINE_EMOTION_ANIMATIONS[emotion as keyof typeof SPINE_EMOTION_ANIMATIONS]
}

/** Default idle animation */
export const SPINE_DEFAULT_IDLE = 'idle'
