import { PageStepsBar } from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof PageStepsBar> = {
  title: "Widgets/PageStepsBar",
  component: PageStepsBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PageStepsBar>;

export const Default: Story = {
  render: () => {
    return <PageStepsBar />;
  },
};
