export interface Blog {
  id: string;
  title: string;
  nepaliTitle: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'General';
  contentSummary: string;
  nepaliContentSummary: string;
}

export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Top 5 tips to pass A1 Hören (Listening)',
    nepaliTitle: 'A1 Hören (सुन्ने) पास गर्ने ५ उत्कृष्ट सुझावहरू',
    level: 'A1',
    contentSummary: 'Focus on keywords, numbers, and basic greetings. Listen to German podcasts daily.',
    nepaliContentSummary: 'मुख्य शब्दहरू, संख्याहरू, र आधारभूत अभिवादनहरूमा ध्यान दिनुहोस्। दैनिक जर्मन पडकास्ट सुन्नुहोस्।',
  },
  {
    id: '2',
    title: 'Mastering B1 Sprechen (Speaking)',
    nepaliTitle: 'B1 Sprechen (बोल्ने) मा निपुणता हासिल गर्दै',
    level: 'B1',
    contentSummary: 'Learn to give your opinion and structure your presentation with clear introductions.',
    nepaliContentSummary: 'आफ्नो विचार राख्न सिक्नुहोस् र स्पष्ट परिचयको साथ आफ्नो प्रस्तुतिको संरचना बनाउनुहोस्।',
  },
  {
    id: '3',
    title: 'Understanding C2 Redewendungen (Idioms)',
    nepaliTitle: 'C2 Redewendungen (उखान टुक्का) बुझ्दै',
    level: 'C2',
    contentSummary: 'Native level German requires knowing common idioms like "Da liegt der Hund begraben".',
    nepaliContentSummary: 'स्थानीय स्तरको जर्मन बोल्नको लागि "Da liegt der Hund begraben" जस्ता सामान्य उखानहरू जान्न आवश्यक छ।',
  }
];
