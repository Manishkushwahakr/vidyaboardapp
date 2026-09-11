import { create } from 'zustand';

export type Lang = 'en' | 'hi';

interface LangStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

export const useLangStore = create<LangStore>((set) => ({
  lang: 'en',
  setLang: (lang) => set({ lang }),
  toggle: () => set((s) => ({ lang: s.lang === 'en' ? 'hi' : 'en' })),
}));
