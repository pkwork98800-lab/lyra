import type { InvocableEventContext } from '@proj-lyra/eventa'

import type { IOTraceRecordingService } from '.'

import { defineInvokeHandler } from '@proj-lyra/eventa'

import {
  ioTraceRecordingChanged,
  ioTraceRecordingGet,
  ioTraceRecordingSetEnabled,
} from '../../../../shared/eventa'

export function registerIOTraceRecording(
  context: InvocableEventContext<any, any>,
  service: IOTraceRecordingService,
): () => void {
  const disposers = [
    defineInvokeHandler(context, ioTraceRecordingGet, () => service.getState()),
    defineInvokeHandler(context, ioTraceRecordingSetEnabled, ({ enabled }) => service.setEnabled(enabled)),
    service.onStateChange((state) => {
      void context.emit(ioTraceRecordingChanged, state)
    }),
  ]

  return () => disposers.forEach(dispose => dispose())
}
