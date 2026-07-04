import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    useSharedValue: jest.fn(() => ({ value: 0 })),
    useAnimatedStyle: jest.fn(() => ({})),
    withTiming: jest.fn(),
    withSpring: jest.fn(),
    withSequence: jest.fn(),
    withDelay: jest.fn(),
    runOnJS: jest.fn(),
    default: {
      createAnimatedComponent: (component) => component,
      View: View,
    },
    View: View,
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
