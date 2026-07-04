export type PathwayLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Pathway {
  level: PathwayLevel;
  title: string;
  description: string;
  nepaliDescription: string;
  exams: string[];
}

export const mockPathways: Pathway[] = [
  {
    level: 'A1',
    title: 'Beginner',
    description: 'Understand and use familiar everyday expressions and very basic phrases.',
    nepaliDescription: 'दैनिक जीवनमा प्रयोग हुने सामान्य अभिव्यक्ति र आधारभूत वाक्यांशहरू बुझ्नुहोस्।',
    exams: ['Goethe-Zertifikat A1: Start Deutsch 1'],
  },
  {
    level: 'A2',
    title: 'Elementary',
    description: 'Understand sentences and frequently used expressions related to immediate relevance.',
    nepaliDescription: 'तुरुन्त सान्दर्भिक वा महत्त्वपूर्ण विषयहरूसँग सम्बन्धित वाक्यहरू र बारम्बार प्रयोग हुने अभिव्यक्तिहरू बुझ्नुहोस्।',
    exams: ['Goethe-Zertifikat A2'],
  },
  {
    level: 'B1',
    title: 'Intermediate',
    description: 'Understand the main points of clear standard input on familiar matters.',
    nepaliDescription: 'परिचित विषयहरूमा स्पष्ट मानक इनपुटको मुख्य बुँदाहरू बुझ्नुहोस्।',
    exams: ['Goethe-Zertifikat B1'],
  },
  {
    level: 'B2',
    title: 'Upper Intermediate',
    description: 'Understand the main ideas of complex text on both concrete and abstract topics.',
    nepaliDescription: 'ठोस र अमूर्त दुवै विषयहरूमा जटिल पाठको मुख्य विचारहरू बुझ्नुहोस्।',
    exams: ['Goethe-Zertifikat B2'],
  },
  {
    level: 'C1',
    title: 'Advanced',
    description: 'Understand a wide range of demanding, longer texts, and recognize implicit meaning.',
    nepaliDescription: 'व्यापक दायराका माग गरिएका, लामा पाठहरू बुझ्नुहोस्, र अन्तर्निहित अर्थ पहिचान गर्नुहोस्।',
    exams: ['Goethe-Zertifikat C1'],
  },
  {
    level: 'C2',
    title: 'Proficiency',
    description: 'Can understand with ease virtually everything heard or read.',
    nepaliDescription: 'सुनेको वा पढेको लगभग सबै कुरा सजिलै बुझ्न सक्छ।',
    exams: ['Goethe-Zertifikat C2: Großes Deutsches Sprachdiplom'],
  }
];
