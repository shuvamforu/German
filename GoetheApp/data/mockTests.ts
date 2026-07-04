export type TeilType = 'Lesen' | 'Hören' | 'Schreiben' | 'Sprechen';

export interface Teil {
  type: TeilType;
  prompt: string;
  nepaliPrompt: string;
  timeLimitMinutes: number;
  hiddenSolution: string;
  nepaliHiddenSolution: string;
  solutionExplanation: string; // Explains Goethe marking rules
  nepaliSolutionExplanation: string;
}

export interface ModelSet {
  id: string;
  title: string;
  level: string;
  teile: Teil[];
}

// Generate 50 Mock sets
export const mockModelSets: ModelSet[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Model Set ${i + 1}`,
  level: 'A1',
  teile: [
    {
      type: 'Lesen',
      prompt: 'Read the short email and answer if the statement is True or False: "Ich komme um 15 Uhr an."',
      nepaliPrompt: 'छोटो इमेल पढ्नुहोस् र भनाइ सही हो वा गलत भन्नुहोस्: "Ich komme um 15 Uhr an."',
      timeLimitMinutes: 15,
      hiddenSolution: 'True. The person arrives at 3 PM (15 Uhr).',
      nepaliHiddenSolution: 'सही। व्यक्ति दिउँसो ३ बजे आउँदैछ।',
      solutionExplanation: 'For Reading part 1, full marks (5 points) are awarded for exact comprehension of times and dates.',
      nepaliSolutionExplanation: 'रिडिङ भाग १ को लागि, समय र मितिहरूको सही बुझाइको लागि पूर्ण अङ्क (५ अङ्क) प्रदान गरिन्छ।',
    },
    {
      type: 'Hören',
      prompt: 'Listen to the audio (mock) about a train delay. Where is the train going?',
      nepaliPrompt: 'रेल ढिलो भएको अडियो सुन्नुहोस्। रेल कहाँ जाँदैछ?',
      timeLimitMinutes: 20,
      hiddenSolution: 'Berlin Hbf',
      nepaliHiddenSolution: 'बर्लिन मुख्य स्टेशन',
      solutionExplanation: 'Listening part 2 requires identifying specific nouns like cities from loudspeaker announcements.',
      nepaliSolutionExplanation: 'लिस्निङ भाग २ मा लाउडस्पीकरबाट सहरहरूको नाम पहिचान गर्नुपर्छ।',
    },
    {
      type: 'Schreiben',
      prompt: 'Write an email to your friend inviting them to your birthday party on Saturday at 8 PM. (At least 30 words)',
      nepaliPrompt: 'आफ्नो साथीलाई शनिबार बेलुका ८ बजे आफ्नो जन्मदिनको पार्टीमा आमन्त्रण गर्दै इमेल लेख्नुहोस्। (कम्तीमा ३० शब्द)',
      timeLimitMinutes: 15,
      hiddenSolution: 'Hallo [Name],\nich lade dich herzlich zu meiner Geburtstagsparty ein. Die Party ist am Samstag um 20 Uhr bei mir zu Hause. Bitte sag mir Bescheid, ob du kommen kannst.\nLiebe Grüße,\n[Dein Name]',
      nepaliHiddenSolution: 'नमस्कार [नाम],\nम तिमीलाई मेरो जन्मदिनको पार्टीमा आमन्त्रण गर्दछु। पार्टी शनिबार बेलुका ८ बजे मेरो घरमा छ। आउन सक्छौ कि सक्दैनौ कृपया मलाई खबर गर।\nमायाको साथ,\n[तपाईंको नाम]',
      solutionExplanation: 'Writing is scored on: 1) Fulfilling all 3 points (3 points each), 2) Communicative design/greeting (1 point). Perfect score requires addressing time, place, and asking for a reply.',
      nepaliSolutionExplanation: 'लेखनमा ३ वटा बुँदाहरू पूरा गरे बापत र सही अभिवादन प्रयोग गरे बापत अङ्क दिइन्छ।',
    },
    {
      type: 'Sprechen',
      prompt: 'Introduce yourself (Name, Age, Country, Languages, Hobbies).',
      nepaliPrompt: 'आफ्नो परिचय दिनुहोस् (नाम, उमेर, देश, भाषाहरू, शौकहरू)।',
      timeLimitMinutes: 15,
      hiddenSolution: 'Ich heiße... Ich bin ... Jahre alt. Ich komme aus Nepal. Ich spreche Nepali, Englisch und ein bisschen Deutsch. Meine Hobbys sind Lesen und Fußball spielen.',
      nepaliHiddenSolution: 'मेरो नाम ... हो। म ... वर्षको भएँ। म नेपालबाट हुँ। म नेपाली, अंग्रेजी र अलिअलि जर्मन बोल्छु। मेरा शौकहरू पढ्ने र फुटबल खेल्ने हुन्।',
      solutionExplanation: 'Speaking Teil 1 is scored on pronunciation and fluid delivery of basic personal data. Maximum 3 points per item.',
      nepaliSolutionExplanation: 'बोल्ने भाग १ मा उच्चारण र व्यक्तिगत जानकारी कसरी दिइन्छ त्यसमा अङ्क दिइन्छ। प्रत्येक जानकारीको ३ अङ्क हुन्छ।',
    },
  ]
}));
