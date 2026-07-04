import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import { mockModelSets, ModelSet } from '../data/mockTests';

export const ModelSetsScreen: React.FC = () => {
  const { language, navigate } = useAppStore();
  const isNepali = language === 'nepali';

  const startTest = (setId: string) => {
    // In a real app we would set the active test ID in the store
    navigate('activetest');
  };

  const renderModelSet = ({ item }: { item: ModelSet }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.level}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={16} color="#7F8C8D" />
        <Text style={styles.infoText}>
          {isNepali ? '६५ मिनेट' : '65 mins'}
        </Text>
        <Ionicons name="document-text-outline" size={16} color="#7F8C8D" style={{ marginLeft: 15 }} />
        <Text style={styles.infoText}>
          {isNepali ? '४ खण्डहरू' : '4 Teile'}
        </Text>
      </View>

      <Pressable style={styles.startBtn} onPress={() => startTest(item.id)}>
        <Text style={styles.startBtnText}>
          {isNepali ? 'परीक्षा सुरु गर्नुहोस्' : 'Start Test'}
        </Text>
        <Ionicons name="play" size={16} color="white" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>
        {isNepali ? 'मोडल सेटहरू (Model Sets)' : 'Model Sets'}
      </Text>
      <FlatList
        data={mockModelSets}
        keyExtractor={(item) => item.id}
        renderItem={renderModelSet}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  badge: {
    backgroundColor: '#8D6E63', // Terai Earthy
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 5,
  },
  startBtn: {
    backgroundColor: '#2E7D32', // Hilly Green
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
  },
  startBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  }
});
