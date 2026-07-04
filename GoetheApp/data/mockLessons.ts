export type Lesson = {
  id: number;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  german: string;
  nepali: string;
  english: string;
  type: 'vocabulary' | 'grammar';
  germanSentence: string;
  nepaliSentence: string;
  englishSentence: string;
};

export const mockLessons: Lesson[] = [
  {
    id: 1,
    level: 'A1',
    german: 'Hallo',
    nepali: 'नमस्ते',
    english: 'Hello',
    type: 'vocabulary',
    germanSentence: 'Hallo, wie geht es dir?',
    nepaliSentence: 'नमस्ते, तिमीलाई कस्तो छ?',
    englishSentence: 'Hello, how are you?',
  },
  {
    id: 2,
    level: 'A1',
    german: 'Danke',
    nepali: 'धन्यवाद',
    english: 'Thank you',
    type: 'vocabulary',
    germanSentence: 'Danke für deine Hilfe.',
    nepaliSentence: 'तपाईंको सहयोगको लागि धन्यवाद।',
    englishSentence: 'Thank you for your help.',
  },
  {
    id: 3,
    level: 'A1',
    german: 'Bitte',
    nepali: 'कृपया',
    english: 'Please',
    type: 'vocabulary',
    germanSentence: 'Ein Kaffee, bitte.',
    nepaliSentence: 'कृपया एक कफी दिनुहोस्।',
    englishSentence: 'A coffee, please.',
  },
  {
    id: 4,
    level: 'A1',
    german: 'Ja',
    nepali: 'हो',
    english: 'Yes',
    type: 'vocabulary',
    germanSentence: 'Ja, ich verstehe.',
    nepaliSentence: 'हो, मैले बुझें।',
    englishSentence: 'Yes, I understand.',
  },
  {
    id: 5,
    level: 'A1',
    german: 'Nein',
    nepali: 'होइन',
    english: 'No',
    type: 'vocabulary',
    germanSentence: 'Nein, danke.',
    nepaliSentence: 'होइन, धन्यवाद।',
    englishSentence: 'No, thank you.',
  },
  {
    id: 6,
    level: 'C2',
    german: 'Außerdem',
    nepali: 'यसबाहेक',
    english: 'Furthermore',
    type: 'grammar',
    germanSentence: 'Er ist klug, und außerdem ist er fleißig.',
    nepaliSentence: 'उनी चतुर छन्, र यसबाहेक उनी मेहेनती पनि छन्।',
    englishSentence: 'He is smart, and furthermore, he is hardworking.',
  }
];
