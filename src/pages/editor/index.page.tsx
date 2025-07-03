import { PageStepsBar } from "@/pages/editor/ui/page-steps-bar";
import { ActivePageStep } from "./ui/active-page-step";
import { useEffect } from "react";
import type { PageStep } from "@/entities/page-step";
import { usePageStepStore } from "@/entities/page-step";

export default function EditorPage() {
  const initPageStepState = usePageStepStore((s) => s.init);

  useEffect(() => {
    const id1 = "1";
    const id2 = "2";
    const id3 = "3";
    const id4 = "4";

    const pageSteps: PageStep[] = [
      {
        id: id1,
        name: "Info",
        type: "cover",
      },
      {
        id: id2,
        name: "Form 1",
        type: "form",
      },
      {
        id: id3,
        name: "Form 2",
        type: "form",
      },
      {
        id: id4,
        name: "Ending",
        type: "ending",
      },
    ];

    initPageStepState({
      pageSteps,
      activeId: id1,
      firstPageId: id1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <main className="flex-1 grid place-content-center">
        <ActivePageStep />
      </main>
      <PageStepsBar />
    </div>
  );
}
