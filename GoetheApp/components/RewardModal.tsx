import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface RewardModalProps {
  visible: boolean;
  onAnimationComplete: () => void;
  xpAmount?: number;
}

export const RewardModal: React.FC<RewardModalProps> = ({
  visible,
  onAnimationComplete,
  xpAmount = 10,
}) => {
  const scale = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 10, stiffness: 100 }),
        withSpring(1, { damping: 10, stiffness: 100 })
      );
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSequence(
        withSpring(-50, { damping: 12, stiffness: 90 }), // Antigravity float up
        withDelay(
          1000,
          withTiming(-150, { duration: 500 }, () => {
            runOnJS(onAnimationComplete)();
          })
        )
      );

      // fade out at the end
      opacity.value = withDelay(1200, withTiming(0, { duration: 300 }));
    } else {
      scale.value = 0;
      translateY.value = 0;
      opacity.value = 0;
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
      ],
      opacity: opacity.value,
    };
  });

  if (!visible && opacity.value === 0) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <Animated.View style={[styles.container, animatedStyle]}>
        <Ionicons name="star" size={50} color="#FFD700" />
        <Text style={styles.xpText}>+{xpAmount} XP</Text>
        <Text style={styles.motivationalText}>उत्कृष्ट! (Awesome!)</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  xpText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  motivationalText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    fontWeight: '600',
  },
});
