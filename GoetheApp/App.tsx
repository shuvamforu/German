import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Pressable, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from './screens/HomeScreen';
import { LessonScreen } from './screens/LessonScreen';
import { ServersScreen } from './screens/ServersScreen';
import { PathwaysScreen } from './screens/PathwaysScreen';
import { BlogsScreen } from './screens/BlogsScreen';
import { ModelSetsScreen } from './screens/ModelSetsScreen';
import { ActiveTestScreen } from './screens/ActiveTestScreen';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const { currentScreen, navigate, language } = useAppStore();
  const isNepali = language === 'nepali';

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'lesson' && <LessonScreen />}
        {currentScreen === 'servers' && <ServersScreen />}
        {currentScreen === 'pathways' && <PathwaysScreen />}
        {currentScreen === 'blogs' && <BlogsScreen />}
        {currentScreen === 'modelsets' && <ModelSetsScreen />}
        {currentScreen === 'activetest' && <ActiveTestScreen />}

        {/* Simple Bottom Navigation */}
        {currentScreen !== 'lesson' && currentScreen !== 'activetest' && (
          <View style={styles.bottomNav}>
            <Pressable onPress={() => navigate('home')} style={styles.navTab}>
              <Ionicons name="home" size={24} color={currentScreen === 'home' ? '#2E7D32' : '#7F8C8D'} />
              <Text style={[styles.navText, currentScreen === 'home' && styles.navTextActive]}>
                {isNepali ? 'गृह' : 'Home'}
              </Text>
            </Pressable>
            <Pressable onPress={() => navigate('pathways')} style={styles.navTab}>
              <Ionicons name="map" size={24} color={currentScreen === 'pathways' ? '#2E7D32' : '#7F8C8D'} />
              <Text style={[styles.navText, currentScreen === 'pathways' && styles.navTextActive]}>
                {isNepali ? 'मार्ग' : 'Pathways'}
              </Text>
            </Pressable>
            <Pressable onPress={() => navigate('blogs')} style={styles.navTab}>
              <Ionicons name="book" size={24} color={currentScreen === 'blogs' ? '#2E7D32' : '#7F8C8D'} />
              <Text style={[styles.navText, currentScreen === 'blogs' && styles.navTextActive]}>
                {isNepali ? 'ब्लग' : 'Blogs'}
              </Text>
            </Pressable>
            <Pressable onPress={() => navigate('modelsets')} style={styles.navTab}>
              <Ionicons name="document-text" size={24} color={currentScreen === 'modelsets' ? '#2E7D32' : '#7F8C8D'} />
              <Text style={[styles.navText, currentScreen === 'modelsets' && styles.navTextActive]}>
                {isNepali ? 'परीक्षा' : 'Tests'}
              </Text>
            </Pressable>
            <Pressable onPress={() => navigate('servers')} style={styles.navTab}>
              <Ionicons name="people" size={24} color={currentScreen === 'servers' ? '#2E7D32' : '#7F8C8D'} />
              <Text style={[styles.navText, currentScreen === 'servers' && styles.navTextActive]}>
                {isNepali ? 'समूह' : 'Servers'}
              </Text>
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
