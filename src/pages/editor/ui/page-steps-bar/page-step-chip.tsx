import clsx from "clsx";
import type { PageStep } from "@/entities/page-step/model/types";
import { useSortable } from "@dnd-kit/sortable";
import { PageStepSettingsMenu } from "@/pages/editor/ui/page-steps-bar/page-step-settings-menu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { PageStepIcon } from "@/entities/page-step";
import { motion } from "motion/react";

interface PageStepChipProps {
  pageStep: PageStep;
  isActive: boolean;
  onSelect: (id: PageStep["id"]) => void;
}

const initialStyles = {
  x: 0,
  y: 0,
  scale: 1,
};

export function PageStepChip({
  pageStep,
  isActive,
  onSelect,
}: PageStepChipProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    node,
    isDragging,
    isSorting,
  } = useSortable({ id: pageStep.id, transition: null });

  function triggerContextMenuFromIconClick(
    e: React.MouseEvent | React.KeyboardEvent,
  ) {
    if (!isActive) {
      return;
    }

    const triggerElement = node.current;

    if (!triggerElement) {
      return;
    }

    if ("clientX" in e) {
      triggerElement.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          clientX: e.clientX,
          clientY: e.clientY,
        }),
      );
    }
  }

  function handleClick() {
    if (!isActive) {
      onSelect(pageStep.id);
      return;
    }
  }

  return (
    <PageStepSettingsMenu id={pageStep.id}>
      <motion.button
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onClick={handleClick}
        onKeyDown={handleClick}
        layoutId={pageStep.id}
        className={clsx(
          "pages-step-chip flex justify-center items-center px-2.5 h-8 py-1 rounded-lg border-1 transition-background-color focus:border-[#2f72e2] focus:shadow-[0px_0px_0px_1.5px_rgba(47,114,226,0.25),_0px_1px_1px_rgba(0,0,0,0.02),_0px_1px_3px_rgba(0,0,0,0.04)]",
          {
            "bg-[#9da4b2]/[0.15] border-transparent hover:bg-[#9da4b2]/[0.35]":
              !isActive,
            "bg-white border-[#e1e1e1] active": isActive,
            "cursor-grabbing": isDragging,
          },
        )}
        animate={
          transform
            ? {
                x: transform.x,
                y: transform.y,
                zIndex: isDragging ? 1 : 0,
              }
            : initialStyles
        }
        transition={{
          duration: !isDragging ? 0.25 : 0,
          zIndex: {
            delay: isDragging ? 0 : 0.25,
          },
          boxShadow: {
            delay: isDragging ? 0 : 0.25,
          },
        }}
      >
        <div className="flex justify-start items-center relative gap-1.5">
          <motion.span layout={!isSorting}>
            <PageStepIcon
              type={pageStep.type}
              className={clsx("w-5 h-5 page-step-chip-icon", {
                "text-[#677289]": !isActive,
                "text-[#F59D0E]": isActive,
              })}
              onClick={triggerContextMenuFromIconClick}
            />
          </motion.span>

          <motion.p
            layout={!isSorting}
            className="text-sm font-medium text-center text-[#677289] whitespace-nowrap"
          >
            {pageStep.name}
          </motion.p>

          {isActive ? (
            <motion.span
              initial={{ opacity: 0, transform: "scale(0)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              transition={{ duration: 0.25 }}
            >
              <EllipsisVerticalIcon
                onClick={triggerContextMenuFromIconClick}
                className="w-5 h-5 text-[#9DA4B2] page-step-chip-icon"
              />
            </motion.span>
          ) : null}
        </div>
      </motion.button>
    </PageStepSettingsMenu>
  );
}
