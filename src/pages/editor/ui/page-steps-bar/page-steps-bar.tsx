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
import { Connector } from "./connector";
import { PageStepForm } from "@/entities/page-step";
import { usePageStepForm } from "@/entities/page-step/ui/page-step-form";

export function PageStepsBar() {
  const pageSteps = usePageStepStore((s) => s.pageSteps);
  const reorderPageSteps = usePageStepStore((s) => s.reorder);
  const activeId = usePageStepStore((s) => s.activeId);
  const showPageStepForm = usePageStepForm((s) => s.showForm);

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

    reorderPageSteps(active.id as string, over?.id as string);
  }

  function onConnectorAddClick(params?: unknown) {
    const id = typeof params === "string" ? params : undefined;
    // handle the logic using id if needed
    showPageStepForm({
      prevPageStepId: id,
    });
  }

  return (
    <div className="bg-white border-b px-4 py-2 overflow-x-auto flex w-full flex items-center">
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
        sensors={sensors}
      >
        <SortableContext
          items={pageSteps}
          strategy={horizontalListSortingStrategy}
        >
          {pageSteps.map((p, index) => {
            const { id } = p;

            return (
              <div key={id} className="flex items-center">
                <PageStepChip pageStep={p} isActive={id === activeId} />

                {index < pageSteps.length - 1 && (
                  <Connector onClick={() => onConnectorAddClick(id)} />
                )}
              </div>
            );
          })}
        </SortableContext>
      </DndContext>

      <Connector onClick={onConnectorAddClick} />
      <AddPageStepButton />

      <PageStepForm />
    </div>
  );
}
