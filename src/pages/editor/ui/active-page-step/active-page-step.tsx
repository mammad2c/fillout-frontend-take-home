import { usePageStepStore } from "@/entities/page-step";

export function ActivePageStep() {
  const activePageStep = usePageStepStore((s) =>
    s.pageSteps.find((p) => p.id === s.activeId),
  );

  return (
    <div>
      <h2 className="text-xl">
        Editing page:{" "}
        <span className="font-semibold">{activePageStep?.name}</span>
      </h2>
    </div>
  );
}
