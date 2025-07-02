import {
  PencilSquareIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FlagIcon } from "@heroicons/react/20/solid";
import { usePageStepStore } from "@/entities/page-step/model/use-page-step-store";
import { ContextMenu } from "@/shared/ui/context-menu";

export function PageStepSettingsMenu({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const rename = usePageStepStore((s) => s.rename);
  const duplicate = usePageStepStore((s) => s.duplicate);
  const remove = usePageStepStore((s) => s.remove);
  const setAsFirstPage = usePageStepStore((s) => s.setAsFirstPage);

  return (
    <ContextMenu
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
          onClick: () => rename(id, prompt("New page name") || ""),
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
          onClick: () => remove(id),
          danger: true,
        },
      ]}
    >
      {children}
    </ContextMenu>
  );
}
