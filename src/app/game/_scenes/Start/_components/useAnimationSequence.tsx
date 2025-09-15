import { useEffect, useState, useRef } from "react";

type SequenceStep = {
  delay: number; // ms before running
  action: () => void;
};

export function useAnimationSequence(steps: SequenceStep[]) {
  const [index, setIndex] = useState(0);
  const stepRef = useRef(0);

  useEffect(() => {
    if (!steps.length) return;

    const runStep = () => {
      if (stepRef.current >= steps.length) return;

      const step = steps[stepRef.current];
      step.action();

      stepRef.current += 1;
      setIndex(stepRef.current);

      if (stepRef.current < steps.length) {
        const nextStep = steps[stepRef.current];
        timer = setTimeout(runStep, nextStep.delay);
      }
    };

    let timer = setTimeout(runStep, steps[0].delay);

    return () => clearTimeout(timer);
  }, [steps]);

  return index;
}
