import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { usePageStepStore } from "@/entities/page-step/model/use-page-step-store";
import { PageStepChip } from "@/entities/page-step/ui/page-step-chip";
import { PageStepContextMenu } from "@/pages/editor/ui/page-steps-bar/page-step-context-menu";
import { Sortable } from "@/shared/ui/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { AddPageStepButton } from "./add-page-step-button";

export function PageStepsBar() {
  const pageSteps = usePageStepStore((s) => s.pageSteps);
  const reorder = usePageStepStore((s) => s.reorder);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over?.id) {
      const oldIndex = pageSteps.findIndex((p) => p.id === active.id);
      const newIndex = pageSteps.findIndex((p) => p.id === over.id);

      reorder(oldIndex, newIndex);
    }
  }

  return (
    <div className="bg-white border-b px-4 py-2 overflow-x-auto flex">
      <AddPageStepButton index={0} />

      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
        sensors={sensors}
      >
        <SortableContext
          items={pageSteps}
          strategy={horizontalListSortingStrategy}
        >
          {pageSteps.map((p) => (
            <Sortable id={p.id} key={p.id}>
              <PageStepContextMenu id={p.id}>
                <div>
                  <PageStepChip pageStep={p} />
                </div>
              </PageStepContextMenu>
            </Sortable>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
