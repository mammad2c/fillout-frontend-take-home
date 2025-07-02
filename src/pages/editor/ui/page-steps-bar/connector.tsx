import { PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";

const button = {
  hidden: { opacity: 0, scale: 0.5, pointerEvents: "none" },
  show: {
    opacity: 1,
    scale: 1,
  },
};

const dashedLine = {
  hidden: {
    width: 20,
  },
  show: {
    width: 56,
  },
};

interface ConnectorProps {
  onClick?: () => void;
}

export function Connector({ onClick }: ConnectorProps) {
  return (
    <motion.div
      /* The wrapper orchestrates all child variants */
      initial="hidden"
      whileHover="show"
      className="relative inline-flex items-center select-none py-1.5"
    >
      {/* 20-pixel dashed line */}
      <motion.div
        className="h-px border-t border-dashed border-gray-300"
        variants={dashedLine}
      />

      {/* The “insert” button that appears on hover */}
      <motion.button
        variants={button}
        aria-label="Insert step"
        onClick={onClick}
        className="absolute left-1/2 -translate-x-1/2 bg-white rounded-full shadow p-1"
      >
        <PlusIcon className="h-4 w-4 text-gray-600" />
      </motion.button>
    </motion.div>
  );
}
