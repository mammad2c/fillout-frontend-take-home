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
import { PageStepChip } from "./page-step-chip";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { AddPageStepButton } from "./add-page-step-button";

export function PageStepsBar() {
  const pageSteps = usePageStepStore((s) => s.pageSteps);
  const reorderPageSteps = usePageStepStore((s) => s.reorder);
  const selectPageStep = usePageStepStore((s) => s.select);
  const activeId = usePageStepStore((s) => s.activeId);

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

      reorderPageSteps(oldIndex, newIndex);
    }
  }

  function handleSelect(id: string) {
    selectPageStep(id);
  }

  return (
    <div className="bg-white border-b px-4 py-2 overflow-x-auto flex w-full">
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
          {pageSteps.map((p) => {
            const { id } = p;

            return (
              <PageStepChip
                key={id}
                pageStep={p}
                onSelect={handleSelect}
                isActive={id === activeId}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
