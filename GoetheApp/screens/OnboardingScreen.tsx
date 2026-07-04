import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';

const { width } = Dimensions.get('window');

const onboardingSlides = [
  {
    id: '1',
    title: 'Welcome to SuvaGerman',
    nepaliTitle: 'SuvaGerman मा स्वागत छ',
    description: 'The ultimate app to pass your Goethe exams (A1 to C2). Tailored for Nepali students!',
    nepaliDescription: 'तपाईंको Goethe परीक्षाहरू (A1 देखि C2 सम्म) पास गर्नको लागि उत्कृष्ट एप। नेपाली विद्यार्थीहरूको लागि विशेष रूपमा तयार पारिएको!',
    icon: 'earth',
    color: '#E0F7FA', // Himalayan Blue
    iconColor: '#3498DB',
  },
  {
    id: '2',
    title: 'Instant Translations',
    nepaliTitle: 'तत्काल अनुवाद',
    description: 'Switch between English and Nepali instantly while reading rules, taking tests, or doing lessons.',
    nepaliDescription: 'नियमहरू पढ्दा, परीक्षा दिंदा वा पाठ पढ्दा तुरुन्तै अंग्रेजी र नेपाली बीच परिवर्तन गर्नुहोस्।',
    icon: 'language',
    color: '#F9EBEA',
    iconColor: '#E74C3C',
  },
  {
    id: '3',
    title: 'AI Mock Tests',
    nepaliTitle: 'AI मोडेल परीक्षाहरू',
    description: 'Take time-bound exams for all 4 Teile. Let our AI evaluate your answers based on Goethe marking rules.',
    nepaliDescription: 'सबै ४ खण्डहरूको लागि समयबद्ध परीक्षाहरू दिनुहोस्। Goethe मार्किङ नियमहरूमा आधारित हाम्रो AI लाई तपाईंको उत्तरहरू मूल्याङ्कन गर्न दिनुहोस्।',
    icon: 'hardware-chip',
    color: '#E8F5E9', // Hilly Green tinted
    iconColor: '#2E7D32',
  },
  {
    id: '4',
    title: 'Gamified Learning',
    nepaliTitle: 'रमाइलो सिकाइ',
    description: 'Earn XP, keep your daily streak alive, and unlock dopamine-boosting rewards as you study!',
    nepaliDescription: 'XP कमाउनुहोस्, आफ्नो दैनिक स्ट्रीक (निरन्तरता) कायम राख्नुहोस्, र तपाईंले अध्ययन गर्दा उत्साह बढाउने पुरस्कारहरू अनलक गर्नुहोस्!',
    icon: 'game-controller',
    color: '#FFF3E0',
    iconColor: '#F39C12',
  },
  {
    id: '5',
    title: 'Study Groups & Servers',
    nepaliTitle: 'अध्ययन समूह र सर्भरहरू',
    description: 'Join virtual servers, connect with consultancies, and access Zoom/WhatsApp classes directly.',
    nepaliDescription: 'भर्चुअल सर्भरहरूमा सामेल हुनुहोस्, कन्सल्टेन्सीहरूसँग सम्पर्क गर्नुहोस्, र सीधै जुम/ह्वाट्सएप कक्षाहरूमा पहुँच गर्नुहोस्।',
    icon: 'people',
    color: '#EFEBE9', // Terai Earthy tinted
    iconColor: '#8D6E63',
  },
];

export const OnboardingScreen: React.FC = () => {
  const { language, completeOnboarding } = useAppStore();
  const isNepali = language === 'nepali';
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {onboardingSlides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { backgroundColor: slide.color }]}>
            <View style={styles.iconContainer}>
              <Ionicons name={slide.icon as any} size={100} color={slide.iconColor} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                {isNepali ? slide.nepaliTitle : slide.title}
              </Text>
              <Text style={styles.description}>
                {isNepali ? slide.nepaliDescription : slide.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : null
              ]}
            />
          ))}
        </View>

        {currentIndex === onboardingSlides.length - 1 && (
          <Pressable style={styles.startBtn} onPress={completeOnboarding}>
            <Text style={styles.startBtnText}>
              {isNepali ? 'सुरु गरौं' : 'Get Started'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  iconContainer: {
    marginBottom: 50,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#34495E',
    textAlign: 'center',
    lineHeight: 28,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 40,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#2E7D32',
    width: 25,
  },
  startBtn: {
    backgroundColor: '#2E7D32', // Hilly Green
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  startBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  }
});
