import { useEffect } from "react";
import { usePageStepStore } from "./use-page-step-store";
import type { PageStep } from "./types";

/**
 * Initializes the page step state with a predefined set of page steps.
 * It sets up the initial page steps with specific IDs and types, and
 * designates the first page and active page. This setup is executed
 * once when the component mounts.
 */
export function usePageStepSeed() {
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
}
