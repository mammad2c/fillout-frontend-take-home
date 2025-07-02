import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";
import { usePageStepStore } from "@/entities/page-step";

export function AddPageStepButton({ index }: { index: number }) {
  const add = usePageStepStore((s) => s.add);

  return (
    <Button
      title="Add page"
      onClick={() => add(index)}
      className="h-6 w-6 grid place-content-center rounded hover:bg-slate-200"
    >
      <PlusIcon className="w-4 h-4 text-slate-500" />
    </Button>
  );
}
