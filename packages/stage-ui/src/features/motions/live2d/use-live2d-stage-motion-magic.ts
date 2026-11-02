import type { MaybeRefOrGetter } from 'vue'

import { defaultLive2DMotionControlDynamics, useLive2DMotionControl } from '@proj-lyra/stage-ui-live2d'
import { storeToRefs } from 'pinia'
import { toValue, watch } from 'vue'

import { live2dMotionMagicProfiles } from './profiles'
import { useLive2DMotionMagicSettings } from './settings'
import { useLive2DMotionMagic } from './use-live2d-motion-magic'

/**
 * Runs the MAGIC motion driver for one Live2D scene.
 *
 * Each renderer that shows the character runs its own driver and keeps the
 * poses in its own window. The main stage and a settings preview then both
 * move, and two windows do not replace the poses of each other. A devtools
 * window that claims exclusive control pauses every driver.
 */
export function useLive2DStageMotionMagic(options: {
  /** The scene shows a Live2D model with the MAGIC driver, and is not paused. */
  active: MaybeRefOrGetter<boolean>
}) {
  const motionControl = useLive2DMotionControl()
  const { exclusiveOwnerId } = storeToRefs(motionControl)
  const { forceViewTarget, profileId, shuffleProfiles, skipMouthOpen } = storeToRefs(useLive2DMotionMagicSettings())
  const ownerId = `stage:live2d-motion-magic:${Math.random().toString(36).slice(2, 10)}`
  const localDelivery = { broadcast: false }

  const magic = useLive2DMotionMagic({
    dataset: () => live2dMotionMagicProfiles[profileId.value].dataset,
    forceViewTarget,
    skipMouthOpen,
    disabled: () => exclusiveOwnerId.value !== null,
    publishPose: pose => motionControl.setPose(ownerId, pose, defaultLive2DMotionControlDynamics, localDelivery),
    releasePose: () => motionControl.release(ownerId, localDelivery),
  })
  let activationRequest = 0

  // Shuffle timer
  let shuffleTimer: ReturnType<typeof setInterval> | null = null
  const profileIds = Object.keys(live2dMotionMagicProfiles) as Array<keyof typeof live2dMotionMagicProfiles>

  function startShuffleTimer() {
    stopShuffleTimer()
    if (!shuffleProfiles.value)
      return

    shuffleTimer = setInterval(() => {
      if (!toValue(options.active) || exclusiveOwnerId.value !== null || magic.status.value !== 'playing')
        return

      const currentIndex = profileIds.indexOf(profileId.value)
      const nextIndex = (currentIndex + 1) % profileIds.length
      profileId.value = profileIds[nextIndex]
    }, 30000) // Switch every 30 seconds
  }

  function stopShuffleTimer() {
    if (shuffleTimer) {
      clearInterval(shuffleTimer)
      shuffleTimer = null
    }
  }

  watch(
    [() => toValue(options.active), profileId, shuffleProfiles, exclusiveOwnerId],
    async ([active, , shuffleEnabled, controlOwnerId]) => {
      const request = ++activationRequest
      if (!active || controlOwnerId !== null) {
        magic.stop()
        stopShuffleTimer()
        return
      }

      if (magic.status.value === 'idle')
        await magic.initialize()

      if (request !== activationRequest || !toValue(options.active) || exclusiveOwnerId.value !== null)
        return

      magic.start()

      if (shuffleEnabled)
        startShuffleTimer()
    },
    { immediate: true },
  )

  // Cleanup on scope dispose
  // Note: The returned object doesn't include stopShuffleTimer, but the watch handler handles it

  return magic
}
