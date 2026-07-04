import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import { mockBlogs, Blog } from '../data/mockBlogs';
export const BlogsScreen: React.FC = () => {
  const language = useAppStore((state) => state.language);
  const isNepali = language === 'nepali';

  const renderBlogItem = ({ item }: { item: Blog }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.level}</Text>
        </View>
        <Ionicons name="bookmark-outline" size={24} color="#7F8C8D" />
      </View>

      <Text style={styles.title}>
        {isNepali ? item.nepaliTitle : item.title}
      </Text>

      <Text style={styles.summary}>
        {isNepali ? item.nepaliContentSummary : item.contentSummary}
      </Text>

      <Pressable style={styles.readMoreBtn}>
        <Text style={styles.readMoreText}>
          {isNepali ? 'थप पढ्नुहोस्' : 'Read More'}
        </Text>
        <Ionicons name="arrow-forward" size={16} color="#2E7D32" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>
        {isNepali ? 'अध्ययन सामग्री (Study Materials)' : 'Study Materials & Blogs'}
      </Text>
      <FlatList
        data={mockBlogs}
        keyExtractor={(item) => item.id}
        renderItem={renderBlogItem}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#8D6E63', // Terai Earthy
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
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
    marginBottom: 10,
  },
  summary: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    lineHeight: 20,
  },
  readMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    marginRight: 5,
  }
});
