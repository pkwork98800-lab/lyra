import type { ReadAloud } from '@proj-lyra/evals-tts-speech-formula'

import { toSpeechText } from '@proj-lyra/core-agent'
import { voiceLanguage } from '@proj-lyra/evals-tts-speech-formula'

/** `toSpeechText` of `@proj-lyra/core-agent`, the rule engine that LYRA ships. The voice language selects the formula language. */
export const readAloud: ReadAloud = async (markdown, language) => toSpeechText(markdown, { language: voiceLanguage[language] })
