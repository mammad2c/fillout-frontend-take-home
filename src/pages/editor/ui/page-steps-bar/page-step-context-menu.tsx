import {
  PencilSquareIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { usePageStepStore } from "@/entities/page-step/model/use-page-step-store";
import { ContextMenu } from "@/shared/ui/context-menu";

export function PageStepContextMenu({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const rename = usePageStepStore((s) => s.rename);
  const duplicate = usePageStepStore((s) => s.duplicate);
  const remove = usePageStepStore((s) => s.remove);

  return (
    <ContextMenu
      items={[
        {
          label: (
            <>
              <PencilSquareIcon className="w-4 h-4" /> Rename
            </>
          ),
          onClick: () => rename(id, prompt("New page name") || ""),
        },
        {
          label: (
            <>
              <DocumentDuplicateIcon className="w-4 h-4" /> Duplicate
            </>
          ),
          onClick: () => duplicate(id),
        },
        {
          label: (
            <>
              <TrashIcon className="w-4 h-4" /> Delete
            </>
          ),
          onClick: () => remove(id),
          danger: true,
        },
      ]}
    >
      {children}
    </ContextMenu>
  );
}
