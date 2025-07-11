import { PageStepsBar } from "@/pages/editor/ui/page-steps-bar";
import { ActivePageStep } from "./ui/active-page-step";
import { usePageStepSeed } from "@/entities/page-step";

export default function EditorPage() {
  usePageStepSeed();

  return (
    <div className="h-screen flex flex-col">
      <main className="flex-1 grid place-content-center">
        <ActivePageStep />
      </main>
      <PageStepsBar />
    </div>
  );
}
