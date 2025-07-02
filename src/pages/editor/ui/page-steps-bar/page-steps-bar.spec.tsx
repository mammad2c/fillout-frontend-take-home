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
    const { user, getByText } = renderComponent(<PageStepsBar />);

    // Act
    await user.click(getByText("Form 1"));

    // Assert
    waitFor(() => {
      expect(getByText("Duplicate")).toBeInTheDocument();
    });
  });
});
