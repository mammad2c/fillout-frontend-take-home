import { create } from "zustand";
import type { PageStep } from "./types";
import { genId } from "@/shared/lib/id";

const id1 = "1";
const id2 = "2";
const id3 = "3";
const id4 = "4";

const initial: PageStep[] = [
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

interface PageStepState {
  pageSteps: PageStep[];
  firstPageId: string;
  activeId: string;
  add(index: number): void;
  reorder(src: number, dst: number): void;
  select(id: string): void;
  rename(id: string, title: string): void;
  duplicate(id: string): void;
  remove(id: string): void;
  setAsFirstPage(id: string): void;
}

export const usePageStepStore = create<PageStepState>((set) => ({
  pageSteps: initial,
  activeId: id1,
  firstPageId: id1,
  add: (index) =>
    set((s) => {
      const newPageStep: PageStep = {
        id: genId(),
        name: "Untitled",
        type: "form",
      };

      const pageSteps = [...s.pageSteps];

      pageSteps.splice(index, 0, newPageStep);

      return { pageSteps };
    }),
  reorder: (src, dst) =>
    set((s) => {
      const pageSteps = Array.from(s.pageSteps);
      const [item] = pageSteps.splice(src, 1);
      pageSteps.splice(dst, 0, item);

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
      const copy: PageStep = { ...s.pageSteps[idx], id: genId() };
      const pageSteps = [...s.pageSteps];
      pageSteps.splice(idx + 1, 0, copy);
      return { pageSteps };
    }),
  remove: (id) =>
    set((s) => ({
      pageSteps: s.pageSteps.filter((p) => p.id !== id),
      activeId: s.activeId === id ? (s.pageSteps[0]?.id ?? "") : s.activeId,
    })),
  setAsFirstPage: (id) =>
    set((s) => {
      const idx = s.pageSteps.findIndex((p) => p.id === id);
      if (idx === -1) return {};
      const pageSteps = [...s.pageSteps];
      pageSteps.splice(idx, 1);
      pageSteps.unshift(s.pageSteps[idx]);
      return { pageSteps, firstPageId: id };
    }),
}));
