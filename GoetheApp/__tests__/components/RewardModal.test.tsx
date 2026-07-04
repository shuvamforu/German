import React from 'react';
import { create, act } from 'react-test-renderer';
import { Text } from 'react-native';
import { RewardModal } from '../../components/RewardModal';
import { withTiming, runOnJS, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('RewardModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (runOnJS as jest.Mock).mockImplementation((fn) => fn);
    (useAnimatedStyle as jest.Mock).mockImplementation((fn) => fn());
    (useSharedValue as jest.Mock).mockImplementation(() => ({ value: 0 }));
  });

  it('does not render when visible is false initially', () => {
    let tree: any;
    act(() => {
      tree = create(
        <RewardModal visible={false} onAnimationComplete={jest.fn()} />
      );
    });
    expect(tree.toJSON()).toBeNull();
  });

  it('renders correctly with default xpAmount when visible is true', () => {
    let tree: any;
    act(() => {
      tree = create(
        <RewardModal visible={true} onAnimationComplete={jest.fn()} />
      );
    });

    const root = tree.root;
    const texts = root.findAllByType(Text);
    expect(texts[0].props.children).toEqual(['+', 10, ' XP']);
    expect(texts[1].props.children).toBe('उत्कृष्ट! (Awesome!)');
  });

  it('renders correctly with custom xpAmount', () => {
    let tree: any;
    act(() => {
      tree = create(
        <RewardModal visible={true} onAnimationComplete={jest.fn()} xpAmount={50} />
      );
    });

    const root = tree.root;
    const texts = root.findAllByType(Text);
    expect(texts[0].props.children).toEqual(['+', 50, ' XP']);
  });

  it('calls onAnimationComplete when the timing animation completes', () => {
    const onAnimationComplete = jest.fn();

    act(() => {
      create(
        <RewardModal visible={true} onAnimationComplete={onAnimationComplete} />
      );
    });

    const calls = (withTiming as jest.Mock).mock.calls;
    const callWithCallback = calls.find((c: any) => typeof c[2] === 'function');

    expect(callWithCallback).toBeDefined();
    expect(onAnimationComplete).not.toHaveBeenCalled();

    act(() => {
      callWithCallback[2]();
    });

    expect(onAnimationComplete).toHaveBeenCalledTimes(1);
  });

  it('resets animation values when visibility changes to false', () => {
    const mockScale = { value: 1 };
    const mockTranslateY = { value: -50 };
    const mockOpacity = { value: 1 };

    let callCount = 0;
    (useSharedValue as jest.Mock).mockImplementation(() => {
      const idx = callCount % 3;
      callCount++;
      if (idx === 0) return mockScale;
      if (idx === 1) return mockTranslateY;
      return mockOpacity;
    });

    let tree: any;
    act(() => {
      tree = create(
        <RewardModal visible={true} onAnimationComplete={jest.fn()} />
      );
    });

    act(() => {
      tree.update(
        <RewardModal visible={false} onAnimationComplete={jest.fn()} />
      );
    });

    expect(mockScale.value).toBe(0);
    expect(mockTranslateY.value).toBe(0);
    expect(mockOpacity.value).toBe(0);
  });
});
