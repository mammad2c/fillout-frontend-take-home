import { renderComponent, waitFor } from "@/shared/tests/render-component";
import { PageStepsBar } from "./page-steps-bar";
import axe from "axe-core";

describe(PageStepsBar.name, () => {
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

  it("should add page step", async () => {
    // Arrange
    const { user, getByText, getByLabelText, queryByText } = renderComponent(
      <PageStepsBar />,
    );

    // Act
    await user.click(getByText("Add page"));

    // Assert
    await waitFor(() => {
      expect(getByText("Create Page")).toBeInTheDocument();
    });

    // Arrange
    await user.type(getByLabelText("Name"), "New Page");
    await user.click(getByLabelText("Form"));
    await user.click(getByText("Submit"));

    // Assert
    await waitFor(() => {
      expect(queryByText("Create Page")).toBe(null);
      expect(getByText("New Page")).toBeInTheDocument();
    });
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
