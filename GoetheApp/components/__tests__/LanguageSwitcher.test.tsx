import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useAppStore } from '../../store/useAppStore';

jest.mock('../../store/useAppStore', () => ({
  useAppStore: jest.fn(),
}));

describe('LanguageSwitcher', () => {
  const mockToggleLanguage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with nepali language by default', () => {
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      language: 'nepali',
      toggleLanguage: mockToggleLanguage,
    });

    let renderer: TestRenderer.ReactTestRenderer | undefined;
    act(() => {
      renderer = TestRenderer.create(<LanguageSwitcher />);
    });

    // Both texts are rendered
    expect(renderer!.root.findByProps({ children: 'नेपाली' })).toBeTruthy();
    expect(renderer!.root.findByProps({ children: 'EN' })).toBeTruthy();
  });

  it('renders correctly when language is english', () => {
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      language: 'english',
      toggleLanguage: mockToggleLanguage,
    });

    let renderer: TestRenderer.ReactTestRenderer | undefined;
    act(() => {
      renderer = TestRenderer.create(<LanguageSwitcher />);
    });

    // Both texts are rendered
    expect(renderer!.root.findByProps({ children: 'नेपाली' })).toBeTruthy();
    expect(renderer!.root.findByProps({ children: 'EN' })).toBeTruthy();
  });

  it('calls toggleLanguage when pressed', () => {
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      language: 'nepali',
      toggleLanguage: mockToggleLanguage,
    });

    let renderer: TestRenderer.ReactTestRenderer | undefined;
    act(() => {
      renderer = TestRenderer.create(<LanguageSwitcher />);
    });

    const switcher = renderer!.root.findByProps({ testID: 'language-switcher' });
    act(() => {
      switcher.props.onPress();
    });

    expect(mockToggleLanguage).toHaveBeenCalledTimes(1);
  });
});
