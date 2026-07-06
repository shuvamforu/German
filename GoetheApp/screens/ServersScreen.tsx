import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';

const mockServers = [
  { id: '1', name: 'Kathmandu German Inst.', initials: 'KGI', color: '#3498DB' },
  { id: '2', name: 'Everest Language Ctr.', initials: 'ELC', color: '#E67E22' },
  { id: '3', name: 'Lumbini Study Abroad', initials: 'LSA', color: '#9B59B6' },
];

const mockServersMap = mockServers.reduce((acc, server) => {
  acc[server.id] = server;
  return acc;
}, {} as Record<string, typeof mockServers[0]>);

const mockMessages = [
  { id: '1', sender: 'Admin', text: 'Welcome to the A1 study group! Tomorrow we have a Zoom meeting.' },
  { id: '2', sender: 'Student', text: 'Thank you! What time is the class?' },
];

export const ServersScreen: React.FC = () => {
  const { language } = useAppStore();
  const [activeServer, setActiveServer] = useState(mockServers[0].id);
  const isNepali = language === 'nepali';

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/9779800000000').catch(err => console.error("An error occurred", err));
  };

  const openZoom = () => {
    Linking.openURL('zoomus://').catch(err => console.error("An error occurred", err));
  };

  const renderMessageItem = useCallback(({ item }: { item: { id: string; sender: string; text: string; } }) => (
    <View style={styles.messageItem}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={20} color="white" />
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.messageSender}>{item.sender}</Text>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      {/* Sidebar for Server list (Discord style) */}
      <View style={styles.sidebar}>
        {mockServers.map((server) => (
          <Pressable
            key={server.id}
            style={[styles.serverIcon, { backgroundColor: server.color }, activeServer === server.id && styles.activeServerIcon]}
            onPress={() => setActiveServer(server.id)}
          >
            <Text style={styles.serverInitials}>{server.initials}</Text>
          </Pressable>
        ))}
      </View>

      {/* Main Chat Area */}
      <View style={styles.mainArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {mockServersMap[activeServer]?.name}
          </Text>
          <View style={styles.actionButtons}>
            <Pressable onPress={openWhatsApp} style={styles.iconBtn}>
              <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            </Pressable>
            <Pressable onPress={openZoom} style={styles.iconBtn}>
              <Ionicons name="videocam" size={24} color="#2D8CFF" />
            </Pressable>
          </View>
        </View>

        <FlatList
          data={mockMessages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.chatList}
        />

        <View style={styles.inputArea}>
          <Text style={styles.placeholderText}>
            {isNepali ? 'सन्देश लेख्नुहोस्...' : 'Type a message...'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E0F7FA', // Himalayan Blue Theme
  },
  sidebar: {
    width: 70,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    paddingTop: 20,
  },
  serverIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  activeServerIcon: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  serverInitials: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mainArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32', // Hilly Green Theme
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 15,
  },
  chatList: {
    padding: 15,
  },
  messageItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8D6E63', // Terai Earthy
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  messageSender: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  messageText: {
    color: '#555',
  },
  inputArea: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  placeholderText: {
    color: '#999',
    backgroundColor: '#EEEEEE',
    padding: 12,
    borderRadius: 20,
  },
});
