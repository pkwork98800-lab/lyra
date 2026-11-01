import type { ReadAloud } from '@proj-lyra/evals-tts-speech-formula'

/** The markdown as the model wrote it. This is LYRA without formula speech, the lower reference. */
export const readAloud: ReadAloud = async markdown => markdown
