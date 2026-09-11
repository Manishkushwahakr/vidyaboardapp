import { create } from 'zustand';

interface SettingsStore {
  gridEnabled: boolean;
  autoSave: boolean;
  penPressure: boolean;
  setGridEnabled: (v: boolean) => void;
  setAutoSave: (v: boolean) => void;
  setPenPressure: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  gridEnabled: false,
  autoSave: true,
  penPressure: false,
  setGridEnabled: (v) => set({ gridEnabled: v }),
  setAutoSave: (v) => set({ autoSave: v }),
  setPenPressure: (v) => set({ penPressure: v }),
}));
