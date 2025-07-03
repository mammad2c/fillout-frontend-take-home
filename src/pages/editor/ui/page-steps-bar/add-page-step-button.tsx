import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";
import { usePageStepForm } from "@/entities/page-step/ui/page-step-form";
import type { PageStep } from "@/entities/page-step";

interface AddPageStepButtonProps {
  prevPageStepId?: PageStep["id"];
}

export function AddPageStepButton({ prevPageStepId }: AddPageStepButtonProps) {
  const showForm = usePageStepForm((s) => s.showForm);

  function handleShowForm() {
    showForm({ prevPageStepId });
  }

  return (
    <Button
      onClick={handleShowForm}
      className="cursor-pointer flex justify-center items-center flex-grow-0 flex-shrink-0 h-8 gap-1.5 px-2.5 py-1 rounded-lg bg-white border-[0.5px] border-[#e1e1e1] text-[#1a1a1a] hover:bg-[#f1f1f1]"
    >
      <PlusIcon className="w-4 h-4" />
      <span>Add page</span>
    </Button>
  );
}
