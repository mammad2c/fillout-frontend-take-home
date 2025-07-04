import type { PageStep } from "@/entities/page-step";
import { usePageStepStore } from "@/entities/page-step";
import { ActivePageStep } from ".";
import { renderComponent, waitFor } from "@/shared/tests/render-component";
import axe from "axe-core";
import { useEffect } from "react";

describe(ActivePageStep.name, () => {
  it("should renders correctly", async () => {
    // Arrange
    const { container } = renderComponent(<ActivePageStep />);

    // Act
    const results = await axe.run(container);

    // Assert
    expect(results.violations.length).toBe(0);
    expect(container).toBeInTheDocument();
  });

  it("should show different page step name", async () => {
    // Arrange
    const Component = () => {
      const initPageStepState = usePageStepStore((s) => s.init);
      const pageSteps = usePageStepStore((s) => s.pageSteps);
      const activePageStepId = usePageStepStore((s) => s.activeId);
      const selectPageStep = usePageStepStore((s) => s.select);

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

      function changePageStep() {
        const notActive = pageSteps.find(
          (step) => step.id !== activePageStepId,
        );

        if (!notActive) {
          throw new Error("Wrong logic, no not active page step");
        }

        selectPageStep(notActive.id);
      }

      return (
        <div>
          <button onClick={changePageStep}> Change step </button>
          <ActivePageStep />
        </div>
      );
    };

    const { getByText, user, container } = renderComponent(<Component />);
    const currentText = container.textContent;

    // Act
    await user.click(getByText("Change step"));

    // Assert
    await waitFor(() => {
      expect(container.textContent).not.toBe(currentText);
    });
  });
});
