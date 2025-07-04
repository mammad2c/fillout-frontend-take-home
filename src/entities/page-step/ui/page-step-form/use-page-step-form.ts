import { create } from "zustand";
import { type PageStep } from "../../model/types";

interface PageStepFormState {
  isShowingForm: boolean;
  formType: "create" | "edit";
  prevPageStepId?: PageStep["id"];
  showForm({ prevPageStepId }: { prevPageStepId?: PageStep["id"] }): void;
  hideForm(): void;
}

export const usePageStepForm = create<PageStepFormState>((set) => ({
  isShowingForm: false,
  formType: "create",
  prevPageStepId: undefined,
  showForm: ({ prevPageStepId }) =>
    set({ prevPageStepId, isShowingForm: true }),
  hideForm: () => set({ isShowingForm: false, prevPageStepId: undefined }),
}));
