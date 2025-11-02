"use client";

import { create } from "zustand";

interface SelectedTableState {
  selectedTable: string | null;
  setSelectedTable: (id: string | null) => void;
}

export const useSelectedTableStore = create<SelectedTableState>((set) => ({
  selectedTable: null,
  setSelectedTable: (id) => set({ selectedTable: id }),
}));
