import { ContextMenu } from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/shared/ui/button";
import type { ReactNode } from "react";
import { useState } from "react";

const meta: Meta<typeof ContextMenu> = {
  title: "Shared/UI/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  args: {
    items: [
      { label: "Edit", onClick: () => {} },
      { label: "Delete", onClick: () => {} },
    ],
  },
  render: (args) => {
    const [clickedItem, setClickedItem] = useState<ReactNode | null>(null);

    args.items.forEach((item) => {
      item.onClick = () => {
        setClickedItem(item.label);
      };
    });

    return (
      <div>
        <div className="mb-4">
          <span className="bg-gray-200 p-2 text-black">
            Clicked item: {clickedItem}
          </span>
        </div>

        <ContextMenu {...args}>
          <Button className="bg-blue-500 text-white p-2 rounded">
            Open Context Menu
          </Button>
        </ContextMenu>
      </div>
    );
  },
};
