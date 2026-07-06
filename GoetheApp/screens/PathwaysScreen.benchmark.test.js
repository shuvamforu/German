import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { PathwaysScreen } from './PathwaysScreen';
import { View } from 'react-native';

describe('PathwaysScreen Benchmark', () => {
  it('renders 10000 times', async () => {
    // Force a re-render of PathwaysScreen by re-rendering its parent
    const Parent = ({ count }) => {
      return (
        <View>
          <PathwaysScreen />
        </View>
      );
    };

    let root;
    await act(async () => {
      root = renderer.create(<Parent count={0} />);
    });

    const ITERATIONS = 10000;
    const start = performance.now();
    await act(async () => {
      for (let i = 0; i < ITERATIONS; i++) {
        root.update(<Parent count={i} />);
      }
    });
    const end = performance.now();
    console.log(`Rendered PathwaysScreen ${ITERATIONS} times in ${end - start} ms`);
  });
});
