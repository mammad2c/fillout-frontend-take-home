import ModalDialog from "./ModalDialog";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@headlessui/react";
import { useArgs } from "storybook/internal/preview-api";

const meta: Meta<typeof ModalDialog> = {
  title: "Design System/ModalDialog",
  component: ModalDialog,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ModalDialog>;

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log("Modal closed"),
    title: <div>Hello title</div>,
    children: <div>Hello Modal</div>,
  },
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs<typeof args>();

    return (
      <>
        <Button onClick={() => updateArgs({ isOpen: true })}>Show Modal</Button>
        <ModalDialog
          {...args}
          isOpen={isOpen}
          onClose={() => updateArgs({ isOpen: false })}
        />
      </>
    );
  },
};
