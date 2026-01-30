import { useEffect, useState } from "react";

type AnimationStep = {
  key: string;
  delay?: number;
  after?: string;
  stagger?: number;
  count?: number;
  class?: string;
};

type AnimationState = Record<string, boolean | number>;

function getDurationFromClass(className?: string) {
  if (!className) return 0;
  const match = className.match(/duration-(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function getStepEndTime(step: AnimationStep): number {
  const duration = getDurationFromClass(step.class);
  if (step.stagger && step.count) {
    return (step.count - 1) * (step.stagger ?? 0) + duration;
  }
  return duration;
}

/**
 * Drives the Start scene's reveal sequence.
 *
 * Note: This is intentionally tailored to the Start scene's timeline format
 * (delay/after/stagger/count + tailwind duration classes).
 */
export function useTimelineAnimationState(sequence: AnimationStep[]): AnimationState {
  const [state, setState] = useState<AnimationState>({});

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const stepEndTimes: Record<string, number> = {};

    sequence.forEach((step) => {
      let startDelay = step.delay ?? 0;

      if (step.after) {
        const prevEnd = stepEndTimes[step.after] ?? 0;
        startDelay += prevEnd;
      }

      // compute absolute end time
      stepEndTimes[step.key] = startDelay + getStepEndTime(step);

      if (step.stagger && step.count) {
        for (let i = 0; i < step.count; i++) {
          timers.push(
            setTimeout(() => {
              setState((prev) => ({ ...prev, [step.key]: i }));
            }, startDelay + i * (step.stagger ?? 0))
          );
        }
      } else {
        timers.push(
          setTimeout(() => {
            setState((prev) => ({ ...prev, [step.key]: true }));
          }, startDelay)
        );
      }
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [sequence]);

  return state;
}
