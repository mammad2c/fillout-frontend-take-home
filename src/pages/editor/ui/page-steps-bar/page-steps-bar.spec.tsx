import { renderComponent, waitFor } from "@/shared/tests/render-component";
import { PageStepsBar } from "./page-steps-bar";
import axe from "axe-core";
import type { PageStep } from "@/entities/page-step";
import { usePageStepStore } from "@/entities/page-step";
import { usePageStepForm } from "@/entities/page-step/ui/page-step-form";
import { useEffect } from "react";

describe(PageStepsBar.name, () => {
  beforeEach(() => {
    // in here we clean up after each test

    const Component = () => {
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

      return <></>;
    };

    renderComponent(<Component />);
  });

  it("should renders correctly", async () => {
    // Arrange
    const { container } = renderComponent(<PageStepsBar />);

    // Act
    const results = await axe.run(container);

    // Assert
    expect(results.violations.length).toBe(0);
    expect(container).toBeInTheDocument();
  });

  it("should open context menu", async () => {
    // Arrange
    const { user, getByText, container } = renderComponent(<PageStepsBar />);

    // Act
    await user.pointer({
      target: getByText("Form 1"),
      keys: "[MouseRight]",
    });

    // Assert
    await waitFor(() => {
      expect(getByText("Duplicate")).toBeInTheDocument();
    });

    // Check accessibility
    const results = await axe.run(container);
    expect(results.violations.length).toBe(0);
  });

  it("should open context menu on icon click", async () => {
    // Arrange
    const { user, getByText } = renderComponent(<PageStepsBar />);

    // Act
    const form1 = getByText("Form 1");
    await user.click(form1);

    await user.click(form1.parentElement!.querySelector("svg")!);

    // Assert
    await waitFor(() => {
      expect(getByText("Duplicate")).toBeInTheDocument();
    });
  });

  it("should add page step", async () => {
    // Arrange
    const { user, getByText, getByLabelText, queryByText } = renderComponent(
      <PageStepsBar />,
    );

    // Act
    await user.click(getByText("Add page"));
    await waitFor(() => {
      expect(getByText("Create Page")).toBeInTheDocument();
    });

    // Assert
    await user.type(getByLabelText("Name"), "New Page");
    await user.click(getByLabelText("Form"));
    await user.click(getByText("Submit"));

    await waitFor(() => {
      expect(queryByText("Create Page")).toBe(null);
      expect(getByText("New Page")).toBeInTheDocument();
    });
  });

  it("should add page step after specific page step", async () => {
    // Arrange
    const Component = () => {
      const firstPageStep = usePageStepStore((s) => s.pageSteps)[0];
      const showForm = usePageStepForm((s) => s.showForm);

      function handleClick() {
        showForm({ prevPageStepId: firstPageStep.id });
      }

      return (
        <>
          <PageStepsBar />
          <button onClick={handleClick}>Add after info</button>
        </>
      );
    };

    const { user, getByText, getByLabelText, queryByText, container } =
      renderComponent(<Component />);

    // Act
    await user.click(getByText("Add after info"));
    await waitFor(() => {
      expect(getByText("Create Page")).toBeInTheDocument();
    });

    // Assert
    await user.type(getByLabelText("Name"), "After info");
    await user.click(getByLabelText("Form"));
    await user.click(getByText("Submit"));

    await waitFor(() => {
      expect(queryByText("Create Page")).toBe(null);
      expect(getByText("After info")).toBeInTheDocument();
    });

    expect(container.querySelectorAll(".pages-step-chip")[1].textContent).toBe(
      "After info",
    );
  });

  it("should add as first page step", async () => {
    // Arrange
    const { user, getByText, container } = renderComponent(<PageStepsBar />);

    // Act
    await user.pointer({
      target: getByText("Form 1"),
      keys: "[MouseRight]",
    });

    await waitFor(() => {
      expect(getByText("Duplicate")).toBeInTheDocument();
    });

    await user.click(getByText(/Set as first page/i));

    // Assert
    await waitFor(() => {
      const pageSteps = container.querySelectorAll(".pages-step-chip");
      expect(pageSteps[0].textContent).toBe("Form 1");
    });
  });

  it("should duplicate page step", async () => {
    // Arrange
    const { user, getByText } = renderComponent(<PageStepsBar />);

    // Act
    await user.pointer({
      target: getByText("Form 1"),
      keys: "[MouseRight]",
    });

    await waitFor(() => {
      expect(getByText("Duplicate")).toBeInTheDocument();
    });

    await user.click(getByText("Duplicate"));

    // Assert
    await waitFor(() => {
      expect(getByText("Form 1 copy")).toBeInTheDocument();
    });
  });

  it("should rename page step from context menu", async () => {
    // Arrange
    const { user, getByText, getByLabelText } = renderComponent(
      <PageStepsBar />,
    );

    const form1 = getByText("Form 1");

    // Act

    // first we select the page step
    await user.click(form1);

    // then we bring input
    await user.click(form1);

    // await waitFor(() => {
    //   expect(document.querySelector("input")).toBeInTheDocument();
    // });

    // Assert
    await waitFor(async () => {
      const input = getByLabelText("Page step name");

      await user.clear(input);
      await user.type(input, "Renamed");
      await user.keyboard("{Enter}");
    });

    await waitFor(() => {
      expect(getByText("Renamed")).toBeInTheDocument();
    });
  });

  it("should delete page step", async () => {
    // Arrange
    const { user, getByText, queryByText } = renderComponent(<PageStepsBar />);

    // Act
    await user.pointer({
      target: getByText("Form 1"),
      keys: "[MouseRight]",
    });

    await waitFor(() => {
      expect(getByText("Duplicate")).toBeInTheDocument();
    });

    await user.click(getByText("Delete"));

    // Assert
    await waitFor(() => {
      expect(queryByText("Form 1")).toBe(null);
    });
  });
});
