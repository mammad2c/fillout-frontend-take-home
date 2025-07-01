import clsx from "clsx";
import { usePageStepStore } from "../model/use-page-step-store";
import type { PageStep } from "../model/types";

interface PageStepChipProps {
  pageStep: PageStep;
}

export function PageStepChip({ pageStep }: PageStepChipProps) {
  const activeId = usePageStepStore((s) => s.activeId);
  const select = usePageStepStore((s) => s.select);

  function handleClick() {
    select(pageStep.id);
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "px-3 py-1 rounded-full text-sm border flex items-center gap-1 whitespace-nowrap",
        activeId === pageStep.id
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-slate-200 text-slate-700 hover:bg-slate-300",
      )}
    >
      {pageStep.name}
    </button>
  );
}
