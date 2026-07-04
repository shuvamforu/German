import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import { mockModelSets, TeilType } from '../data/mockTests';
import { evaluateWithAI, AIEvaluationResult } from '../services/aiService';

export const ActiveTestScreen: React.FC = () => {
  const { language, navigate } = useAppStore();
  const isNepali = language === 'nepali';

  // Hardcode test ID 0 for the mock
  const activeSet = mockModelSets[0];
  const [activeTeilIndex, setActiveTeilIndex] = useState(0);
  const activeTeil = activeSet.teile[activeTeilIndex];

  const [timeLeft, setTimeLeft] = useState(activeTeil.timeLimitMinutes * 60);
  const [userAnswer, setUserAnswer] = useState('');

  // AI Evaluation State
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<AIEvaluationResult | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  // Timer effect
  useEffect(() => {
    setTimeLeft(activeTeil.timeLimitMinutes * 60);
    setUserAnswer('');
    setEvaluationResult(null);
    setShowSolution(false);
  }, [activeTeilIndex]);

  useEffect(() => {
    if (timeLeft <= 0 || isEvaluating) return;
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isEvaluating]);

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    try {
      const result = await evaluateWithAI(activeTeil.type, userAnswer, language);
      setEvaluationResult(result);
    } catch (error) {
      console.error('Error during AI evaluation:', error);
      Alert.alert(
        isNepali ? 'त्रुटि' : 'Error',
        isNepali ? 'मूल्याङ्कन विफल भयो। कृपया फेरि प्रयास गर्नुहोस्।' : 'Evaluation failed. Please try again.'
      );
    } finally {
      setIsEvaluating(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigate('modelsets')} style={styles.closeBtn}>
          <Ionicons name="close" size={28} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>{activeSet.title} - {activeTeil.type}</Text>
        <View style={styles.timerContainer}>
          <Ionicons name="timer-outline" size={20} color="white" />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        {activeSet.teile.map((teil, index) => (
          <Pressable
            key={teil.type}
            style={[styles.tab, activeTeilIndex === index && styles.activeTab]}
            onPress={() => !isEvaluating && setActiveTeilIndex(index)}
          >
            <Text style={[styles.tabText, activeTeilIndex === index && styles.activeTabText]}>
              {teil.type}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView style={styles.contentContainer} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.promptCard}>
          <Text style={styles.promptLabel}>
            {isNepali ? 'प्रश्न (Question):' : 'Question:'}
          </Text>
          <Text style={styles.promptText}>
            {isNepali ? activeTeil.nepaliPrompt : activeTeil.prompt}
          </Text>
        </View>

        <Text style={styles.inputLabel}>
          {isNepali ? 'तपाईंको उत्तर यहाँ लेख्नुहोस् वा फाइल अपलोड गर्नुहोस्:' : 'Write your answer or upload a file:'}
        </Text>

        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={6}
          placeholder={isNepali ? 'यहाँ टाइप गर्नुहोस्...' : 'Type here...'}
          value={userAnswer}
          onChangeText={setUserAnswer}
          editable={!isEvaluating && evaluationResult === null}
        />

        <View style={styles.uploadRow}>
          <Pressable style={styles.uploadBtn}>
            <Ionicons name="mic-outline" size={20} color="#34495E" />
            <Text style={styles.uploadText}>{isNepali ? 'रेकर्ड (Audio)' : 'Record Audio'}</Text>
          </Pressable>
          <Pressable style={styles.uploadBtn}>
            <Ionicons name="document-attach-outline" size={20} color="#34495E" />
            <Text style={styles.uploadText}>{isNepali ? 'फाइल (File)' : 'Upload File'}</Text>
          </Pressable>
        </View>

        {!evaluationResult ? (
          <Pressable style={styles.evaluateBtn} onPress={handleEvaluate} disabled={isEvaluating}>
            {isEvaluating ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="sparkles" size={20} color="white" />
                <Text style={styles.evaluateBtnText}>
                  {isNepali ? 'AI द्वारा जाँच्नुहोस्' : 'Evaluate with AI'}
                </Text>
              </>
            )}
          </Pressable>
        ) : (
          <View style={styles.feedbackContainer}>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>{isNepali ? 'स्कोर:' : 'Score:'}</Text>
              <Text style={styles.scoreValue}>{evaluationResult.score} / {evaluationResult.maxScore}</Text>
            </View>
            <Text style={styles.feedbackText}>{evaluationResult.feedback}</Text>

            <Pressable style={styles.solutionBtn} onPress={() => setShowSolution(!showSolution)}>
              <Ionicons name={showSolution ? "eye-off-outline" : "eye-outline"} size={20} color="white" />
              <Text style={styles.solutionBtnText}>
                {showSolution
                  ? (isNepali ? 'समाधान लुकाउनुहोस्' : 'Hide Perfect Solution')
                  : (isNepali ? 'उत्कृष्ट समाधान हेर्नुहोस्' : 'Reveal Perfect Solution')}
              </Text>
            </Pressable>

            {showSolution && (
              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>Perfect Answer:</Text>
                <Text style={styles.solutionText}>
                  {isNepali ? activeTeil.nepaliHiddenSolution : activeTeil.hiddenSolution}
                </Text>
                <View style={styles.divider} />
                <Text style={styles.solutionTitle}>Goethe Marking Rules:</Text>
                <Text style={styles.solutionText}>
                  {isNepali ? activeTeil.nepaliSolutionExplanation : activeTeil.solutionExplanation}
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    backgroundColor: '#2E7D32', // Hilly Green
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  closeBtn: { padding: 5 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  timerContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
  timerText: { color: 'white', fontWeight: 'bold', marginLeft: 5 },
  tabs: { flexDirection: 'row', backgroundColor: '#2E7D32', paddingBottom: 5 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 3, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: 'white' },
  tabText: { color: 'rgba(255,255,255,0.7)', fontWeight: 'bold' },
  activeTabText: { color: 'white' },
  contentContainer: { padding: 20 },
  promptCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  promptLabel: { fontSize: 14, fontWeight: 'bold', color: '#7F8C8D', marginBottom: 5 },
  promptText: { fontSize: 18, color: '#2C3E50', lineHeight: 26 },
  inputLabel: { fontSize: 16, fontWeight: 'bold', color: '#34495E', marginBottom: 10 },
  textInput: { backgroundColor: 'white', borderRadius: 12, padding: 15, fontSize: 16, textAlignVertical: 'top', minHeight: 120, borderWidth: 1, borderColor: '#E0E0E0', marginBottom: 15 },
  uploadRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  uploadBtn: { flex: 0.48, flexDirection: 'row', backgroundColor: '#E0E0E0', paddingVertical: 12, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  uploadText: { marginLeft: 8, color: '#34495E', fontWeight: 'bold' },
  evaluateBtn: { backgroundColor: '#8D6E63', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, borderRadius: 30, shadowColor: '#5D4037', shadowOffset: { width:0, height: 3}, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  evaluateBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  feedbackContainer: { backgroundColor: '#E8F5E9', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#C8E6C9' },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  scoreLabel: { fontSize: 18, fontWeight: 'bold', color: '#2E7D32' },
  scoreValue: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32' },
  feedbackText: { fontSize: 16, color: '#2C3E50', lineHeight: 24, marginBottom: 20 },
  solutionBtn: { backgroundColor: '#34495E', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 20 },
  solutionBtnText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },
  solutionCard: { marginTop: 15, backgroundColor: 'white', padding: 15, borderRadius: 10 },
  solutionTitle: { fontSize: 14, fontWeight: 'bold', color: '#7F8C8D', marginBottom: 5 },
  solutionText: { fontSize: 16, color: '#2C3E50', lineHeight: 24 },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 15 }
});
