import type { FakemicWebPrepareContext } from '@proj-lyra/vitest-plugin-fakemic'

import type { AudioInputSession } from '../types'

import { browserProbeOptions, stubForBrowser } from '../setup/browser-probe'
import { createSession } from '../setup/session'

/** Adapts a Fakemic Chromium process into an LYRA Web audio session. */
export default async function prepareWebRuntime(context: FakemicWebPrepareContext): Promise<AudioInputSession> {
  await context.context.addInitScript(stubForBrowser, browserProbeOptions)

  const page = await context.context.newPage()
  await page.goto(context.runtime.url)

  return createSession({
    page,
    target: 'web',
    close: context.close,
  })
}
