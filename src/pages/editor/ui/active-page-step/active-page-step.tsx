import { usePageStepStore } from "@/entities/page-step";
import type { Variant } from "motion/react";
import { motion } from "motion/react";

const variants: Record<string, Variant> = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    },
  },
  hide: {
    y: 6,
    opacity: 0,
  },
};

export function ActivePageStep() {
  const activePageStep = usePageStepStore((s) =>
    s.pageSteps.find((p) => p.id === s.activeId),
  );

  return (
    <div className="w-full">
      <motion.h2 className="text-xl text-center" transition={{ duration: 0.3 }}>
        Editing page:{" "}
      </motion.h2>

      {activePageStep && (
        <motion.div
          className="font-semibold flex text-xl text-center items-center justify-center"
          key={activePageStep.id}
          variants={variants}
          animate={"show"}
          initial="hide"
          transition={{ duration: 0.3 }}
        >
          {activePageStep.name}
        </motion.div>
      )}
    </div>
  );
}
