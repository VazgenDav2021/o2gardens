"use client";

import { create } from "zustand";

interface SelectedTableState {
  selectedTable: string | null;
  selectedTableSeats: number | null;
  setSelectedTable: (id: string | null, seats?: number | null) => void;
}

export const useSelectedTableStore = create<SelectedTableState>((set) => ({
  selectedTable: null,
  selectedTableSeats: null,
  setSelectedTable: (id, seats = null) => set({ selectedTable: id, selectedTableSeats: seats }),
}));
