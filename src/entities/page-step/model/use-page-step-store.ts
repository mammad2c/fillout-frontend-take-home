import { create } from "zustand";
import type { PageStep } from "./types";
import { genId } from "@/shared/lib/id";
import { produce } from "immer";

interface PageStepState {
  pageSteps: PageStep[];
  firstPageId?: string;
  activeId?: string;
  add(data: Omit<PageStep, "id">, prevPageStepId?: PageStep["id"]): void;
  reorder(src: PageStep["id"], dst: PageStep["id"]): void;
  select(id: string): void;
  rename(id: string, title: string): void;
  duplicate(id: string): void;
  remove(id: string): void;
  setAsFirstPage(id: string): void;
  init(state: Partial<PageStepState>): void;
}

export const usePageStepStore = create<PageStepState>((set) => ({
  pageSteps: [],
  activeId: undefined,
  firstPageId: undefined,
  init(state: PageStepState) {
    const initState = produce(state, (draftState) => {
      if (!draftState.firstPageId) {
        draftState.firstPageId = draftState.pageSteps[0]?.id;
      }
    });

    set(initState);
  },
  add: (data, prevPageStepId) =>
    set((s) => {
      const newPageStep = {
        id: genId(),
        ...data,
      };

      const pageSteps = produce(s.pageSteps, (draftState) => {
        const prevPageStepIndex = prevPageStepId
          ? draftState.findIndex((pageStep) => pageStep.id === prevPageStepId)
          : -1;

        if (prevPageStepIndex !== -1) {
          const prevPageStep = draftState[prevPageStepIndex];
          const nextStepId = prevPageStep.nextStepId;
          prevPageStep.nextStepId = newPageStep.id;
          newPageStep.nextStepId = nextStepId;
          draftState.splice(prevPageStepIndex + 1, 0, newPageStep);
        } else {
          draftState.push(newPageStep);
        }
      });

      return { pageSteps };
    }),
  reorder: (srcId, dstId) =>
    set((s) => {
      if (srcId === dstId) return {};

      if (!srcId || !dstId) return {};

      const pageSteps = produce(s.pageSteps, (draftState) => {
        const src = draftState.findIndex((p) => p.id === srcId);
        const dst = draftState.findIndex((p) => p.id === dstId);
        const [item] = draftState.splice(src, 1);
        draftState.splice(dst, 0, item);
      });

      let firstPageId = s.firstPageId;

      if (pageSteps[0].id !== s.firstPageId) {
        firstPageId = pageSteps[0].id;
      }

      return { pageSteps, firstPageId };
    }),
  select: (id) => set({ activeId: id }),
  rename: (id, name) =>
    set((s) => ({
      pageSteps: s.pageSteps.map((p) => (p.id === id ? { ...p, name } : p)),
    })),
  duplicate: (id) =>
    set((s) => {
      const idx = s.pageSteps.findIndex((p) => p.id === id);

      if (idx === -1) return {};

      const pageSteps = produce(s.pageSteps, (draftState) => {
        const pageStep = draftState[idx];
        const copy = {
          ...pageStep,
          name: `${pageStep.name} copy`,
          id: genId(),
        };
        draftState.splice(idx + 1, 0, copy);
      });

      return { pageSteps };
    }),
  remove: (id) =>
    set((s) => {
      const pageSteps = s.pageSteps.filter((p) => p.id !== id);
      const activeId =
        s.activeId === id ? (pageSteps[0]?.id ?? "") : s.activeId;

      return {
        pageSteps,
        activeId,
      };
    }),
  setAsFirstPage: (id) =>
    set((s) => {
      const idx = s.pageSteps.findIndex((p) => p.id === id);

      if (idx === -1) return {};

      const pageSteps = produce(s.pageSteps, (draftState) => {
        const pageStep = draftState[idx];
        draftState.splice(idx, 1);
        draftState.unshift(pageStep);
      });

      return { pageSteps, firstPageId: id };
    }),
}));
