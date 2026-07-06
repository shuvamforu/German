import { useAppStore } from './useAppStore';

describe('useAppStore', () => {
  const initialState = useAppStore.getState();

  beforeEach(() => {
    useAppStore.setState(initialState, true);
  });

  it('should have correct initial state', () => {
    const state = useAppStore.getState();
    expect(state.language).toBe('nepali');
    expect(state.xp).toBe(0);
    expect(state.streak).toBe(1);
    expect(state.hasSeenOnboarding).toBe(false);
    expect(state.currentScreen).toBe('onboarding');
  });

  it('should toggle language', () => {
    const { toggleLanguage } = useAppStore.getState();

    toggleLanguage();
    expect(useAppStore.getState().language).toBe('english');

    useAppStore.getState().toggleLanguage();
    expect(useAppStore.getState().language).toBe('nepali');
  });

  it('should add xp', () => {
    const { addXp } = useAppStore.getState();

    addXp(10);
    expect(useAppStore.getState().xp).toBe(10);

    useAppStore.getState().addXp(20);
    expect(useAppStore.getState().xp).toBe(30);
  });

  it('should navigate to a new screen', () => {
    const { navigate } = useAppStore.getState();

    navigate('home');
    expect(useAppStore.getState().currentScreen).toBe('home');

    useAppStore.getState().navigate('lesson');
    expect(useAppStore.getState().currentScreen).toBe('lesson');
  });

  it('should complete onboarding', () => {
    const { completeOnboarding } = useAppStore.getState();

    completeOnboarding();
    const state = useAppStore.getState();
    expect(state.hasSeenOnboarding).toBe(true);
    expect(state.currentScreen).toBe('home');
  });
});
