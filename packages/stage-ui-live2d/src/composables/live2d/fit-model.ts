import type { MaybeRefOrGetter } from 'vue'

import { computed, toValue } from 'vue'

/**
 * Normalizes the model so that user `scale == 1` means the full viewport height,
 * and the model centered horizontally and vertically when `position.x == 0` and `position.y == 0`,
 * showing the full body.
 */
export function useFitModel(
  canvasDim: MaybeRefOrGetter<{ width: number, height: number }>,
  modelDim: MaybeRefOrGetter<{ width: number, height: number }>,
) {
  const normalizedParam = computed(() => {
    const canvas = toValue(canvasDim)
    const model = toValue(modelDim)

    const heightScale = (canvas.height / model.height)
    const widthScale = (canvas.width / model.width)
    let minScale = Math.min(heightScale, widthScale)

    if (Number.isNaN(minScale) || minScale <= 0) {
      minScale = 1e-6
    }
    return {
      scale: minScale * 0.9, // Leave 10% margin
      x: canvas.width / 2,
      y: canvas.height / 2, // Center vertically to show full body
    }
  })

  return normalizedParam
}
