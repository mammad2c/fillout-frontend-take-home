import type { PageStep } from "@/entities/page-step";
import { Button } from "@/shared/ui/button";
import { ModalDialog } from "@/shared/ui/modal-dialog";

interface DeleteConfirmProps {
  isOpen: boolean;
  name: PageStep["name"];
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirm({
  isOpen,
  name,
  onConfirm,
  onCancel,
}: DeleteConfirmProps) {
  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onCancel}
      title={<span>Delete {name}</span>}
    >
      <p className="mb-4">
        Are you sure you want to delete{" "}
        <span className="font-bold">{name}</span>?
      </p>
      <div className="flex">
        <Button className="mr-2" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Yes
        </Button>
      </div>
    </ModalDialog>
  );
}
