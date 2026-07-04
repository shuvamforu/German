import React from 'react';
import { create, act } from 'react-test-renderer';
import { HomeScreen } from '../../screens/HomeScreen';
import { useAppStore } from '../../store/useAppStore';

// Mock dependencies
jest.mock('../../store/useAppStore', () => ({
  useAppStore: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('../../components/LanguageSwitcher', () => ({
  LanguageSwitcher: 'LanguageSwitcher',
}));

describe('HomeScreen Gamification Logic', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupStore = (xp: number, language: string = 'english') => {
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      xp,
      streak: 5,
      navigate: mockNavigate,
      language,
    });
  };

  it('renders correctly with 0 XP', () => {
    setupStore(0);

    let root: any;
    act(() => {
      root = create(<HomeScreen />);
    });

    const tree = root.toJSON();
    const stringifiedTree = JSON.stringify(tree);

    // In React 19, the text elements are split in the JSON tree if they come from different parts
    expect(stringifiedTree).toContain('"0"');
    expect(stringifiedTree).toContain('" / 100 XP to next level"');
  });

  it('renders correctly with partial level XP (45 XP)', () => {
    setupStore(45);

    let root: any;
    act(() => {
      root = create(<HomeScreen />);
    });

    const tree = root.toJSON();
    const stringifiedTree = JSON.stringify(tree);

    expect(stringifiedTree).toContain('"45"');
    expect(stringifiedTree).toContain('" / 100 XP to next level"');
  });

  it('renders correctly with XP over 100 (150 XP)', () => {
    setupStore(150);

    let root: any;
    act(() => {
      root = create(<HomeScreen />);
    });

    const tree = root.toJSON();
    const stringifiedTree = JSON.stringify(tree);

    expect(stringifiedTree).toContain('"50"');
    expect(stringifiedTree).toContain('" / 100 XP to next level"');
  });

  it('renders correctly with exact level boundary XP (200 XP)', () => {
    setupStore(200);

    let root: any;
    act(() => {
      root = create(<HomeScreen />);
    });

    const tree = root.toJSON();
    const stringifiedTree = JSON.stringify(tree);

    expect(stringifiedTree).toContain('"0"');
    expect(stringifiedTree).toContain('" / 100 XP to next level"');
  });
});
