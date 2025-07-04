import { PageStepsBar } from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePageStepSeed } from "@/entities/page-step";

const meta: Meta<typeof PageStepsBar> = {
  title: "Pages/Editor/UI/PageStepsBar",
  component: PageStepsBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PageStepsBar>;

export const Default: Story = {
  render: () => {
    usePageStepSeed();

    return <PageStepsBar />;
  },
};
