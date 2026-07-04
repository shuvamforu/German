import { create } from 'zustand';

export type Language = 'nepali' | 'english';
export type Screen = 'onboarding' | 'home' | 'lesson' | 'servers' | 'pathways' | 'blogs' | 'modelsets' | 'activetest';

interface AppState {
  language: Language;
  xp: number;
  streak: number;
  currentScreen: Screen;
  hasSeenOnboarding: boolean;

  toggleLanguage: () => void;
  addXp: (amount: number) => void;
  navigate: (screen: Screen) => void;
  completeOnboarding: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'nepali',
  xp: 0,
  streak: 1, // Assume 1 for dopamine hit right away on day 1
  hasSeenOnboarding: false,
  currentScreen: 'onboarding',

  toggleLanguage: () =>
    set((state) => ({
      language: state.language === 'nepali' ? 'english' : 'nepali',
    })),

  addXp: (amount: number) =>
    set((state) => ({
      xp: state.xp + amount,
    })),

  navigate: (screen: Screen) =>
    set(() => ({
      currentScreen: screen,
    })),

  completeOnboarding: () =>
    set(() => ({
      hasSeenOnboarding: true,
      currentScreen: 'home',
    })),
}));
