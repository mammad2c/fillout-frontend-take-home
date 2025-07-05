import clsx from "clsx";
import type { PageStep } from "@/entities/page-step/model/types";
import { useSortable } from "@dnd-kit/sortable";
import {
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
  FlagIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PageStepIcon, usePageStepStore } from "@/entities/page-step";
import { motion } from "motion/react";
import { ContextMenu } from "@/shared/ui/context-menu";
import { useState } from "react";
import { PageStepRenameForm } from "@/entities/page-step/ui/page-step-rename-form/page-step-rename-form";
import { DeleteConfirm } from "./delete-confirm";

interface PageStepChipProps {
  pageStep: PageStep;
  isActive: boolean;
}

const initialStyles = {
  x: 0,
  y: 0,
  scale: 1,
};

export function PageStepChip({ pageStep, isActive }: PageStepChipProps) {
  const [showRenameForm, setShowRenameForm] = useState(false);
  const { id, type, name } = pageStep;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    node,
    isDragging,
    isSorting,
  } = useSortable({ id, transition: null });
  const rename = usePageStepStore((s) => s.rename);
  const duplicate = usePageStepStore((s) => s.duplicate);
  const remove = usePageStepStore((s) => s.remove);
  const setAsFirstPage = usePageStepStore((s) => s.setAsFirstPage);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const selectPageStep = usePageStepStore((s) => s.select);

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

  function handleSelect() {
    if (!isActive) {
      selectPageStep(id);
      return;
    }
  }

  function handleNameClick() {
    if (isActive) {
      setShowRenameForm(true);
    }
  }

  const contentTransitionLayout = {
    duration: isDragging || isSorting ? 0 : 0.25,
  };

  return (
    <>
      <ContextMenu
        title="Settings"
        items={[
          {
            label: (
              <>
                <FlagIcon className="w-4 h-4 mr-2 text-blue-500" /> Set as first
                page
              </>
            ),
            onClick: () => setAsFirstPage(id),
          },
          {
            label: (
              <>
                <PencilSquareIcon className="w-4 h-4 mr-2" /> Rename
              </>
            ),
            onClick: () => {
              setShowRenameForm(true);
            },
          },
          {
            label: (
              <>
                <DocumentDuplicateIcon className="w-4 h-4 mr-2" /> Duplicate
              </>
            ),
            onClick: () => duplicate(id),
          },
          {
            divider: true,
          },
          {
            label: (
              <>
                <TrashIcon className="w-4 h-4 mr-2" /> Delete
              </>
            ),
            onClick: () => setShowDeleteConfirm(true),
            danger: true,
          },
        ]}
      >
        <motion.button
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          onClick={handleSelect}
          onKeyDown={handleSelect}
          layoutId={id}
          className={clsx(
            "pages-step-chip select-none overflow-hidden relative flex justify-center items-center px-2.5 h-8 py-1 rounded-lg border-1 transition-background-color focus:border-[#2f72e2] focus:shadow-[0px_0px_0px_1.5px_rgba(47,114,226,0.25),_0px_1px_1px_rgba(0,0,0,0.02),_0px_1px_3px_rgba(0,0,0,0.04)]",
            {
              "bg-[#9da4b2]/[0.15] border-transparent hover:bg-[#9da4b2]/[0.35]":
                !isActive,
              "bg-white border-[#e1e1e1] active": isActive,
              "cursor-grabbing": isDragging,
              "cursor-pointer": !isDragging,
            },
          )}
          animate={
            transform
              ? {
                  x: transform.x,
                  y: transform.y,
                }
              : initialStyles
          }
          transition={{
            duration: !isDragging ? 0.25 : 0,
          }}
        >
          <div className="flex justify-start items-center relative gap-1.5">
            <motion.span layout transition={contentTransitionLayout}>
              <PageStepIcon
                type={type}
                className={clsx("w-5 h-5 page-step-chip-icon", {
                  "text-[#677289]": !isActive,
                  "text-[#F59D0E]": isActive,
                })}
                onClick={triggerContextMenuFromIconClick}
              />
            </motion.span>

            <motion.p
              layout
              transition={contentTransitionLayout}
              onKeyDown={handleNameClick}
              onClick={handleNameClick}
              className="text-sm font-medium text-center text-[#677289] whitespace-nowrap"
            >
              {name}
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

          {showRenameForm && (
            <PageStepRenameForm
              className="absolute p-1 left-0 z-[30] top-0 right-0 bottom-0 bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),_0px_10px_20px_-15px_rgba(22,23,24,0.2)]"
              pageStep={pageStep}
              onClose={() => setShowRenameForm(false)}
              onSubmit={(data) => {
                rename(data.id, data.name);
                setShowRenameForm(false);
              }}
            />
          )}
        </motion.button>
      </ContextMenu>

      <DeleteConfirm
        isOpen={showDeleteConfirm}
        name={pageStep.name}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={() => remove(id)}
      />
    </>
  );
}
