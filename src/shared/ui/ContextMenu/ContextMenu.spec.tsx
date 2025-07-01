import { renderComponent } from "@/shared/tests/render-component";
import { ContextMenu } from ".";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "../button";
import axe from "axe-core";

function Component() {
  const [clickedItem, setClickedItem] = useState<ReactNode | null>(null);

  return (
    <div>
      <div>
        <span>Clicked item: {clickedItem}</span>
      </div>
      <ContextMenu
        items={[
          {
            label: "Edit",
            onClick: () => setClickedItem("Edit"),
          },
          {
            label: "Delete",
            onClick: () => setClickedItem("Delete"),
          },
        ]}
      >
        <Button>Right click to open</Button>
      </ContextMenu>
    </div>
  );
}

describe(ContextMenu.name, () => {
  it("should renders correctly", async () => {
    // Arrange
    const { container, user, getByText } = renderComponent(<Component />);
    const rightClickButton = getByText("Right click to open");

    // Act
    await user.pointer({
      target: rightClickButton,
      keys: "[MouseRight]",
    });
    const results = await axe.run(container);

    // Assert
    expect(results.violations.length).toBe(0);
    expect(container).toBeInTheDocument();
  });

  it("should trigger onClick", async () => {
    // Arrange
    const { user, getByText } = renderComponent(<Component />);
    const rightClickButton = getByText("Right click to open");

    // Act
    await user.pointer({
      target: rightClickButton,
      keys: "[MouseRight]",
    });
    const editButton = getByText("Edit");
    await user.click(editButton);

    // Assert
    expect(getByText("Clicked item: Edit")).toBeInTheDocument();
  });
});
