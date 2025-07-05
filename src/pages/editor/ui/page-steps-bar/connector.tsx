import { PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";

const button = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
    },
  },
};

const dashedLine = {
  hidden: {
    width: 20,
  },
  show: {
    width: 56,
    transition: {
      delay: 0.3,
    },
  },
};

interface ConnectorProps {
  onClick: (params?: unknown) => void;
}

export function Connector({ onClick }: ConnectorProps) {
  function handleClick() {
    onClick();
  }

  return (
    <motion.div
      /* The wrapper orchestrates all child variants */
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
        onClick={handleClick}
        aria-label="Insert page step"
        className="absolute cursor-pointer hover:bg-gray-100 left-1/2 -translate-x-1/2 bg-white rounded-full shadow p-1"
      >
        <PlusIcon className="h-4 w-4 text-gray-600" />
      </motion.button>
    </motion.div>
  );
}
