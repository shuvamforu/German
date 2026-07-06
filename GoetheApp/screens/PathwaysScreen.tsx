import React, { useCallback } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { mockPathways, Pathway } from '../data/mockPathways';

export const PathwaysScreen: React.FC = () => {
  const { language } = useAppStore();
  const isNepali = language === 'nepali';

  const renderPathwayItem = useCallback(({ item }: { item: Pathway }) => (
    <View style={styles.card}>
      <View style={styles.levelBadge}>
        <Text style={styles.levelText}>{item.level}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>
          {isNepali ? item.nepaliDescription : item.description}
        </Text>
        <Text style={styles.examText}>
          {isNepali ? 'परीक्षा: ' : 'Exam: '}
          {item.exams.join(', ')}
        </Text>
      </View>
    </View>
  ), [isNepali]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>
        {isNepali ? 'सिक्ने मार्ग (Pathways)' : 'Learning Pathways'}
      </Text>
      <FlatList
        data={mockPathways}
        keyExtractor={(item) => item.level}
        renderItem={renderPathwayItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA', // Himalayan Blue Theme
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32', // Hilly Green Theme
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: '#8D6E63', // Terai Earthy
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  levelText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  examText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32', // Hilly Green
  }
});
