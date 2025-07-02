import { PageStepIcon } from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof PageStepIcon> = {
  title: "Entities/PageStep/PageStepIcon",
  component: PageStepIcon,
  tags: ["autodocs"],
  args: {
    className: "w-6 h-6 text-blue-500",
  },
};

export default meta;

type Story = StoryObj<typeof PageStepIcon>;

export const Cover: Story = {
  args: {
    type: "cover",
  },
};

export const Ending: Story = {
  args: {
    type: "ending",
  },
};

export const Form: Story = {
  args: {
    type: "form",
  },
};

export const Login: Story = {
  args: {
    type: "login",
  },
};

export const Payment: Story = {
  args: {
    type: "payment",
  },
};

export const Scheduling: Story = {
  args: {
    type: "scheduling",
  },
};

export const SubmissionReview: Story = {
  args: {
    type: "submission_review",
  },
};
