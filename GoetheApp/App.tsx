import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Pressable, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from './screens/HomeScreen';
import { LessonScreen } from './screens/LessonScreen';
import { ServersScreen } from './screens/ServersScreen';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const { currentScreen, navigate } = useAppStore();

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'lesson' && <LessonScreen />}
        {currentScreen === 'servers' && <ServersScreen />}

        {/* Simple Bottom Navigation */}
        {currentScreen !== 'lesson' && (
          <View style={styles.bottomNav}>
            <Pressable onPress={() => navigate('home')} style={styles.navTab}>
              <Ionicons name="home" size={24} color={currentScreen === 'home' ? '#2E7D32' : '#7F8C8D'} />
              <Text style={[styles.navText, currentScreen === 'home' && styles.navTextActive]}>Home</Text>
            </Pressable>
            <Pressable onPress={() => navigate('servers')} style={styles.navTab}>
              <Ionicons name="people" size={24} color={currentScreen === 'servers' ? '#2E7D32' : '#7F8C8D'} />
              <Text style={[styles.navText, currentScreen === 'servers' && styles.navTextActive]}>Servers</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20, // Add some padding for modern devices without physical home buttons
  },
  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  navTextActive: {
    color: '#2E7D32',
    fontWeight: 'bold',
  }
});
