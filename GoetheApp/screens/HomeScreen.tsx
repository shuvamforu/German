import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useShallow } from 'zustand/react/shallow';

export const HomeScreen: React.FC = () => {
  const { xp, streak, navigate, language } = useAppStore(
    useShallow((state) => ({
      xp: state.xp,
      streak: state.streak,
      navigate: state.navigate,
      language: state.language,
    }))
  );
  const isNepali = language === 'nepali';

  // Gamification logic
  const currentLevelXP = xp % 100;
  const progressPercentage = `${currentLevelXP}%`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statContainer}>
          <Ionicons name="flame" size={24} color="#FF9800" />
          <Text style={styles.statText}>{streak}</Text>
        </View>
        <LanguageSwitcher />
        <View style={styles.statContainer}>
          <Ionicons name="star" size={24} color="#FFD700" />
          <Text style={styles.statText}>{xp}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {isNepali ? 'German A1 तयारी' : 'German A1 Prep'}
        </Text>

        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>
            {isNepali ? 'तपाईंको प्रगति' : 'Your Progress'}
          </Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: progressPercentage as any }]} />
          </View>
          <Text style={styles.progressText}>{currentLevelXP} / 100 XP to next level</Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.startButton, pressed && styles.startButtonPressed]}
          onPress={() => navigate('lesson')}
        >
          <Text style={styles.startButtonText}>
            {isNepali ? 'पाठ सुरु गर्नुहोस्' : 'Start Lesson'}
          </Text>
        </Pressable>
      </View>
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
    marginBottom: 40,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32', // Hilly Green Theme
    marginBottom: 40,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 40,
  },
  progressLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 10,
  },
  progressBarBackground: {
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  progressText: {
    marginTop: 8,
    color: '#7F8C8D',
    fontSize: 14,
    textAlign: 'right',
  },
  startButton: {
    backgroundColor: '#8D6E63', // Terai Earthy Accent
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#5D4037',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    alignItems: 'center',
  },
  startButtonPressed: {
    transform: [{ translateY: 2 }],
    shadowOffset: { width: 0, height: 2 },
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
