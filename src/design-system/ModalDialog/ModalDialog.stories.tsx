import ModalDialog from "./ModalDialog";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@headlessui/react";
import { useArgs } from "storybook/internal/preview-api";

const meta: Meta<typeof ModalDialog> = {
  title: "Design System/ModalDialog",
  component: ModalDialog,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ModalDialog>;

export const Default: Story = {
  args: {
    isOpen: false,
    title: <div>Hello title</div>,
    children: <div>Hello Modal</div>,
  },
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs<typeof args>();

    function handleOpen() {
      updateArgs({ isOpen: true });
    }

    function handleClose() {
      updateArgs({ isOpen: false });
    }

    return (
      <>
        <Button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleOpen}
        >
          Show Modal
        </Button>
        <ModalDialog {...args} isOpen={isOpen} onClose={handleClose} />
      </>
    );
  },
};
