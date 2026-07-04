import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { useShallow } from 'zustand/react/shallow';

const SWITCH_WIDTH = 120;
const SWITCH_HEIGHT = 40;
const CIRCLE_SIZE = 34;

export const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useAppStore(
    useShallow((state) => ({
      language: state.language,
      toggleLanguage: state.toggleLanguage,
    }))
  );
  const isNepali = language === 'nepali';

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(isNepali ? 3 : SWITCH_WIDTH - CIRCLE_SIZE - 3, {
            duration: 250,
          }),
        },
      ],
    };
  });

  return (
    <Pressable onPress={toggleLanguage} style={styles.container}>
      <View style={styles.switchBackground}>
        <Animated.View style={[styles.circle, animatedStyle]} />
        <View style={styles.textContainer}>
          <Text style={[styles.text, isNepali && styles.activeText]}>नेपाली</Text>
          <Text style={[styles.text, !isNepali && styles.activeText]}>EN</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  switchBackground: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    backgroundColor: '#E0E0E0',
    borderRadius: SWITCH_HEIGHT / 2,
    justifyContent: 'center',
    position: 'relative',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: '#FFFFFF',
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: (SWITCH_HEIGHT - CIRCLE_SIZE) / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    zIndex: 1, // Ensure text is above background
    pointerEvents: 'none', // Let touches pass through to Pressable
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
  },
  activeText: {
    color: '#333',
  },
});
