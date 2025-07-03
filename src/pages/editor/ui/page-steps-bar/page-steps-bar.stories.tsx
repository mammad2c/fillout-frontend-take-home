import { useEffect } from "react";
import { PageStepsBar } from ".";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { PageStep } from "@/entities/page-step";
import { usePageStepStore } from "@/entities/page-step";

const meta: Meta<typeof PageStepsBar> = {
  title: "Widgets/PageStepsBar",
  component: PageStepsBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PageStepsBar>;

export const Default: Story = {
  render: () => {
    const initPageStepState = usePageStepStore((s) => s.init);

    useEffect(() => {
      const id1 = "1";
      const id2 = "2";
      const id3 = "3";
      const id4 = "4";

      const pageSteps: PageStep[] = [
        {
          id: id1,
          name: "Info",
          type: "cover",
        },
        {
          id: id2,
          name: "Form 1",
          type: "form",
        },
        {
          id: id3,
          name: "Form 2",
          type: "form",
        },
        {
          id: id4,
          name: "Ending",
          type: "ending",
        },
      ];

      initPageStepState({
        pageSteps,
        activeId: id1,
        firstPageId: id1,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <PageStepsBar />;
  },
};
