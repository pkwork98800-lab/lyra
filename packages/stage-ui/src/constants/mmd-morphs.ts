/**
 * MMD Morph mappings for emotions.
 *
 * MMD models typically have these standard morphs:
 * - Vowels: vowelA, vowelI, vowelU, vowelE, vowelO (for lip sync)
 * - Blink: blink, blinkLeft, blinkRight
 * - Emotions: smile, anger, sad, surprise, troubled, serious
 * - Eye: eyeLOpen, eyeROpen, eyeSmile, eyeLOpen, eyeROpen
 * - Eyebrow: browLY, browRY, browLX, browRX, browLAngle, browRAngle, browLForm, browRForm
 * - Mouth: mouthOpen, mouthForm
 * - Cheek: cheek
 * - Body: bodyX, bodyY, bodyZ, bodyAngleX, bodyAngleY, bodyAngleZ
 * - Head: headX, headY, headZ
 * - Eye: eyeX, eyeY, eyeSquint
 */

export interface MMDMorphMapping {
  /** Base morph value (0-1) */
  base?: number
  /** Target morph value when emotion is active (0-1) */
  target: number
  /** Transition duration in ms */
  duration?: number
  /** Whether this morph should be additive (added to base) or absolute */
  additive?: boolean
}

export interface MMDEmotionMorphMapping {
  /** Morphs to activate for this emotion */
  morphs: Record<string, MMDMorphMapping>
  /** Duration for the emotion expression in ms */
  duration: number
  /** Whether to loop the expression */
  loop?: boolean
}

/** MMD Morph names for standard emotions */
export const MMD_EMOTION_MORPHS = {
  /** Happy/Joy - smile, bright eyes, raised brows */
  happy: {
    smile: { target: 1, duration: 300 },
    cheek: { target: 0.5, duration: 300 },
    eyeSmile: { target: 0.5, duration: 300 },
    browLY: { target: 0.3, duration: 300 },
    browRY: { target: 0.3, duration: 300 },
    browLAngle: { target: -0.2, duration: 300 },
    browRAngle: { target: -0.2, duration: 300 },
    eyeLOpen: { target: 1, duration: 300 },
    eyeROpen: { target: 1, duration: 300 },
  },
  /** Sad - droopy eyes, downturned mouth, lowered brows */
  sad: {
    smile: { target: -0.5, duration: 500 },
    mouthOpen: { target: 0.1, duration: 500 },
    mouthForm: { target: -0.3, duration: 500 },
    eyeLOpen: { target: 0.3, duration: 500 },
    eyeROpen: { target: 0.3, duration: 500 },
    eyeSmile: { target: -0.5, duration: 500 },
    browLY: { target: 0.5, duration: 500 },
    browRY: { target: 0.5, duration: 500 },
    browLAngle: { target: 0.5, duration: 500 },
    browRAngle: { target: 0.5, duration: 500 },
    browLForm: { target: -0.3, duration: 500 },
    browRForm: { target: -0.3, duration: 500 },
    cheek: { target: 0, duration: 500 },
  },
  /** Angry - narrowed eyes, furrowed brows, tight mouth */
  angry: {
    eyeLOpen: { target: 0.5, duration: 300 },
    eyeROpen: { target: 0.5, duration: 300 },
    eyeSquint: { target: 0.8, duration: 300 },
    browLX: { target: -0.5, duration: 300 },
    browRX: { target: 0.5, duration: 300 },
    browLY: { target: -0.5, duration: 300 },
    browRY: { target: -0.5, duration: 300 },
    browLAngle: { target: -0.5, duration: 300 },
    browRAngle: { target: -0.5, duration: 300 },
    browLForm: { target: 0.5, duration: 300 },
    browRForm: { target: 0.5, duration: 300 },
    mouthForm: { target: -0.5, duration: 300 },
    mouthOpen: { target: 0.1, duration: 300 },
    cheek: { target: 0.3, duration: 300 },
  },
  /** Surprise - wide eyes, raised brows, open mouth */
  surprised: {
    eyeLOpen: { target: 1, duration: 200 },
    eyeROpen: { target: 1, duration: 200 },
    browLY: { target: 1, duration: 200 },
    browRY: { target: 1, duration: 200 },
    browLAngle: { target: 0.5, duration: 200 },
    browRAngle: { target: 0.5, duration: 200 },
    mouthOpen: { target: 0.8, duration: 200 },
    mouthForm: { target: 0, duration: 200 },
    eyeSmile: { target: -0.3, duration: 200 },
  },
  /** Think/Contemplative - slight squint, slight head tilt */
  think: {
    eyeLOpen: { target: 0.5, duration: 400 },
    eyeROpen: { target: 0.5, duration: 400 },
    eyeSquint: { target: 0.3, duration: 400 },
    headX: { target: 0.1, duration: 400 },
    headY: { target: -0.1, duration: 400 },
    browLY: { target: 0.2, duration: 400 },
    browRY: { target: 0.2, duration: 400 },
    browLAngle: { target: 0.2, duration: 400 },
    browRAngle: { target: 0.2, duration: 400 },
    mouthForm: { target: 0.1, duration: 400 },
  },
  /** Awkward - averted gaze, nervous smile */
  awkward: {
    eyeX: { target: -0.3, duration: 400 },
    eyeY: { target: -0.2, duration: 400 },
    eyeLOpen: { target: 0.7, duration: 400 },
    eyeROpen: { target: 0.7, duration: 400 },
    smile: { target: 0.3, duration: 400 },
    mouthForm: { target: 0.2, duration: 400 },
    cheek: { target: 0.4, duration: 400 },
    headX: { target: -0.1, duration: 400 },
    headY: { target: 0.1, duration: 400 },
    browLY: { target: 0.2, duration: 400 },
    browRY: { target: 0.2, duration: 400 },
  },
  /** Curious - wide eyes, tilted head, raised brows */
  curious: {
    eyeLOpen: { target: 1, duration: 300 },
    eyeROpen: { target: 1, duration: 300 },
    eyeX: { target: 0.2, duration: 300 },
    eyeY: { target: 0.2, duration: 300 },
    headX: { target: 0.1, duration: 300 },
    headY: { target: -0.1, duration: 300 },
    browLY: { target: 0.5, duration: 300 },
    browRY: { target: 0.5, duration: 300 },
    browLAngle: { target: 0.3, duration: 300 },
    browRAngle: { target: 0.3, duration: 300 },
    smile: { target: 0.2, duration: 300 },
  },
  /** Neutral/Idle - relaxed, natural */
  neutral: {
    smile: { target: 0, duration: 500 },
    mouthOpen: { target: 0, duration: 500 },
    mouthForm: { target: 0, duration: 500 },
    eyeLOpen: { target: 1, duration: 500 },
    eyeROpen: { target: 1, duration: 500 },
    eyeSmile: { target: 0, duration: 500 },
    eyeSquint: { target: 0, duration: 500 },
    eyeX: { target: 0, duration: 500 },
    eyeY: { target: 0, duration: 500 },
    headX: { target: 0, duration: 500 },
    headY: { target: 0, duration: 500 },
    headZ: { target: 0, duration: 500 },
    bodyX: { target: 0, duration: 500 },
    bodyY: { target: 0, duration: 500 },
    bodyZ: { target: 0, duration: 500 },
    browLX: { target: 0, duration: 500 },
    browRX: { target: 0, duration: 500 },
    browLY: { target: 0, duration: 500 },
    browRY: { target: 0, duration: 500 },
    browLAngle: { target: 0, duration: 500 },
    browRAngle: { target: 0, duration: 500 },
    browLForm: { target: 0, duration: 500 },
    browRForm: { target: 0, duration: 500 },
    cheek: { target: 0, duration: 500 },
  },
  /** Question - tilted head, raised brow, curious expression */
  question: {
    headX: { target: 0.15, duration: 300 },
    headY: { target: -0.1, duration: 300 },
    headZ: { target: 0.1, duration: 300 },
    browLY: { target: 0.5, duration: 300 },
    browRY: { target: 0.3, duration: 300 },
    browLAngle: { target: 0.3, duration: 300 },
    browRAngle: { target: 0.2, duration: 300 },
    eyeLOpen: { target: 1, duration: 300 },
    eyeROpen: { target: 1, duration: 300 },
    eyeX: { target: 0.1, duration: 300 },
    eyeY: { target: 0.1, duration: 300 },
    smile: { target: 0.1, duration: 300 },
  },
  /** Winking - playful */
  wink: {
    blinkLeft: { target: 1, duration: 150, additive: true },
    blinkRight: { target: 0, duration: 150 },
    smile: { target: 0.5, duration: 300 },
    cheek: { target: 0.3, duration: 300 },
    headZ: { target: -0.1, duration: 300 },
  } as const,
  /** Heart hands gesture - make heart shape with hands */
  heart: {
    bodyX: { target: 0.2, duration: 500 },
    bodyY: { target: -0.1, duration: 500 },
    bodyZ: { target: 0.2, duration: 500 },
    bodyAngleX: { target: 10, duration: 500 },
    bodyAngleY: { target: 0, duration: 500 },
    bodyAngleZ: { target: 0, duration: 500 },
    headX: { target: 0, duration: 500 },
    headY: { target: -0.1, duration: 500 },
    headZ: { target: 0, duration: 500 },
    smile: { target: 1, duration: 500 },
    cheek: { target: 0.5, duration: 500 },
    eyeSmile: { target: 1, duration: 500 },
    browLY: { target: 0.5, duration: 500 },
    browRY: { target: 0.5, duration: 500 },
    browLAngle: { target: -0.3, duration: 500 },
    browRAngle: { target: -0.3, duration: 500 },
  } as const,
  /** Waving hand greeting */
  wave: {
    bodyX: { target: 0.3, duration: 300 },
    bodyY: { target: 0.2, duration: 300 },
    bodyZ: { target: 0.3, duration: 300 },
    bodyAngleX: { target: 20, duration: 300 },
    bodyAngleY: { target: 0, duration: 300 },
    bodyAngleZ: { target: 0, duration: 300 },
    headX: { target: 0, duration: 300 },
    headY: { target: -0.05, duration: 300 },
    headZ: { target: 0, duration: 300 },
    smile: { target: 0.8, duration: 300 },
    cheek: { target: 0.4, duration: 300 },
    eyeSmile: { target: 0.5, duration: 300 },
  } as const,
  /** Looking left */
  lookLeft: {
    eyeX: { target: -0.5, duration: 300 },
    headX: { target: -0.3, duration: 300 },
    headY: { target: 0, duration: 300 },
    headZ: { target: 0, duration: 300 },
    bodyX: { target: -0.1, duration: 300 },
  } as const,
  /** Looking right */
  lookRight: {
    eyeX: { target: 0.5, duration: 300 },
    headX: { target: 0.3, duration: 300 },
    headY: { target: 0, duration: 300 },
    headZ: { target: 0, duration: 300 },
    bodyX: { target: 0.1, duration: 300 },
  } as const,
  /** Looking up */
  lookUp: {
    eyeY: { target: 0.5, duration: 300 },
    headY: { target: 0.3, duration: 300 },
    headX: { target: 0, duration: 300 },
    bodyY: { target: 0.1, duration: 300 },
  } as const,
  /** Looking down */
  lookDown: {
    eyeY: { target: -0.5, duration: 300 },
    headY: { target: -0.3, duration: 300 },
    headX: { target: 0, duration: 300 },
    bodyY: { target: -0.1, duration: 300 },
  } as const,
} satisfies Record<string, Record<string, { target: number, duration?: number, additive?: boolean }>>

/** Get morph mapping for an emotion */
export function getMMDEmotionMorphs(emotion: string): Record<string, { target: number, duration?: number, additive?: boolean }> | undefined {
  return MMD_EMOTION_MORPHS[emotion as keyof typeof MMD_EMOTION_MORPHS]
}

/** Default morph reset values */
export const MMD_MORPH_RESET: Record<string, number> = {
  smile: 0,
  cheek: 0,
  eyeSmile: 0,
  eyeSquint: 0,
  eyeX: 0,
  eyeY: 0,
  eyeLOpen: 1,
  eyeROpen: 1,
  mouthOpen: 0,
  mouthForm: 0,
  browLX: 0,
  browRX: 0,
  browLY: 0,
  browRY: 0,
  browLAngle: 0,
  browRAngle: 0,
  browLForm: 0,
  browRForm: 0,
  headX: 0,
  headY: 0,
  headZ: 0,
  bodyX: 0,
  bodyY: 0,
  bodyZ: 0,
  bodyAngleX: 0,
  bodyAngleY: 0,
  bodyAngleZ: 0,
  blinkLeft: 0,
  blinkRight: 0,
  blink: 0,
}
