import { AnimatePresence, motion } from "motion/react";
import { useSceneManager } from "./SceneManagerProvider";

const transitionVariants = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  slideLeft: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
  slideRight: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "100%" } },
  scale: { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 1.2, opacity: 0 } },
};

export function SceneRenderer() {
  const { stack, getScene } = useSceneManager(); // expose stack + getter
  const currentKey = stack[stack.length - 1];
  const scene = getScene(currentKey);

  if (!scene) return null;

  const variants = transitionVariants[scene.transition || "fade"];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene.key}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5 }}
        style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      >
        {scene.component}
      </motion.div>
    </AnimatePresence>
  );
}
