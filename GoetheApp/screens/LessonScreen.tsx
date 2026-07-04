import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { RewardModal } from '../components/RewardModal';
import { mockLessons } from '../data/mockLessons';

export const LessonScreen: React.FC = () => {
  const { language, navigate, addXp } = useAppStore();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const isNepali = language === 'nepali';

  const lesson = mockLessons[currentLessonIndex];

  const handleNext = () => {
    // Show dopamine reward modal
    setShowReward(true);
    addXp(10);
  };

  const handleRewardComplete = () => {
    setShowReward(false);
    if (currentLessonIndex < mockLessons.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
    } else {
      // Completed all mock lessons, return home
      navigate('home');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigate('home')} style={styles.backButton}>
          <Ionicons name="close" size={28} color="#7F8C8D" />
        </Pressable>
        <LanguageSwitcher />
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.germanWord}>{lesson.german}</Text>
          <Text style={styles.translationWord}>
            {isNepali ? lesson.nepali : lesson.english}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.germanSentence}>{lesson.germanSentence}</Text>
          <Text style={styles.translationSentence}>
            {isNepali ? lesson.nepaliSentence : lesson.englishSentence}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.nextButton, pressed && styles.nextButtonPressed]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {isNepali ? 'अर्को' : 'Next'}
          </Text>
        </Pressable>
      </View>

      <RewardModal
        visible={showReward}
        onAnimationComplete={handleRewardComplete}
        xpAmount={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA', // Himalayan Blue Theme
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  germanWord: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E7D32', // Hilly Green Theme
    marginBottom: 10,
  },
  translationWord: {
    fontSize: 24,
    color: '#8D6E63', // Terai Earthy Theme
    marginBottom: 30,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  germanSentence: {
    fontSize: 20,
    color: '#2C3E50',
    marginBottom: 10,
    textAlign: 'center',
  },
  translationSentence: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  nextButtonPressed: {
    transform: [{ translateY: 2 }],
    shadowOffset: { width: 0, height: 2 },
  },
  nextButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
