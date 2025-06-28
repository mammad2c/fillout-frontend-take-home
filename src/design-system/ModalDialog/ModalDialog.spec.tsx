import { renderComponent, waitFor } from "@/tests/render-component";
import { ModalDialog } from ".";
import axe from "axe-core";
import { useState } from "react";

describe(ModalDialog.name, () => {
  it("should renders correctly", async () => {
    // Arrange
    const { container } = renderComponent(
      <ModalDialog isOpen={true} title="Modal Title" onClose={() => {}}>
        Modal Content
      </ModalDialog>,
    );

    // Act
    const results = await axe.run(container);

    // Assert
    expect(results.violations.length).toBe(0);
    expect(container).toBeInTheDocument();
  });

  it("should open and close", async () => {
    // Arrange
    const Parent = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <button onClick={() => setIsOpen(true)}>Open Modal</button>
          <ModalDialog
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
            title="Test Modal"
          >
            Modal Content
          </ModalDialog>
        </>
      );
    };

    const { getByText, user, getByLabelText, queryByText } = renderComponent(
      <Parent />,
    );

    // Act & Assert
    // Open
    const openButton = getByText("Open Modal");
    await user.click(openButton);
    expect(getByText("Test Modal")).toBeInTheDocument();
    expect(getByText("Modal Content")).toBeInTheDocument();

    // Close
    const closeButton = getByLabelText("Close dialog"); // Assuming there's a close button
    await user.click(closeButton);
    await waitFor(() => {
      expect(queryByText("Test Modal")).not.toBeInTheDocument();
      expect(queryByText("Modal Content")).not.toBeInTheDocument();
    });
  });
});
