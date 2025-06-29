import { renderComponent } from "@/shared/tests/render-component";
import { Button } from ".";
import axe from "axe-core";

describe(Button.name, () => {
  it("should renders correctly", async () => {
    // Arrange
    const { container } = renderComponent(<Button>Click Me</Button>);

    // Act
    const results = await axe.run(container);

    // Assert
    expect(results.violations.length).toBe(0);
    expect(container).toBeInTheDocument();
  });

  it("should apply custom className", async () => {
    // Arrange
    const { container } = renderComponent(
      <Button className="custom-class">Click Me</Button>,
    );

    // Act
    const results = await axe.run(container);

    // Assert
    expect(results.violations.length).toBe(0);
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });

  it("should handle onClick event", () => {
    // Arrange
    const onClick = vi.fn();
    const { getByText } = renderComponent(
      <Button onClick={onClick}>Click Me</Button>,
    );

    // Act
    getByText("Click Me").click();

    // Assert
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
