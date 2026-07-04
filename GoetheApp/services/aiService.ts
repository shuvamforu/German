import { Language } from '../store/useAppStore';
import { TeilType } from '../data/mockTests';

export interface AIEvaluationResult {
  score: number;
  maxScore: number;
  feedback: string;
}

const mockEvaluateWithAI = async (
  teilType: TeilType,
  userAnswer: string,
  language: Language
): Promise<AIEvaluationResult> => {
  // Simulate network delay for AI evaluation
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const isNepali = language === 'nepali';
  let maxScore = 10;
  let score = Math.floor(Math.random() * (maxScore - 4)) + 4; // Mock score between 4 and 10

  // Fallback for empty answers
  if (!userAnswer || userAnswer.trim() === '') {
    score = 0;
    return {
      score,
      maxScore,
      feedback: isNepali
        ? 'तपाईंले कुनै उत्तर दिनुभएन। कृपया केही लेख्नुहोस् वा अपलोड गर्नुहोस्।'
        : 'You provided no answer. Please write or upload something.'
    };
  }

  let feedback = '';

  switch (teilType) {
    case 'Schreiben':
      maxScore = 10;
      feedback = isNepali
        ? `तपाईंको स्कोर ${score}/${maxScore} छ। पूर्ण अङ्क प्राप्त गर्न, तपाईंले सही व्याकरण प्रयोग गर्नुपर्छ, सबै ३ वटा बुँदाहरू समावेश गर्नुपर्छ (प्रत्येकको ३ अङ्क), र सही अभिवादन (१ अङ्क) प्रयोग गर्नुपर्छ। तपाईंको वाक्य संरचना अझै राम्रो हुन सक्छ।`
        : `Your score is ${score}/${maxScore}. To get a perfect score, you must use correct grammar, include all 3 bullet points (3 pts each), and use a correct greeting/closing (1 pt). Your sentence structure could be improved.`;
      break;
    case 'Sprechen':
      maxScore = 15;
      score = Math.floor(Math.random() * (maxScore - 5)) + 5;
      feedback = isNepali
        ? `तपाईंको स्कोर ${score}/${maxScore} छ। बोल्ने खण्डमा उत्कृष्ट अंक ल्याउन उच्चारण स्पष्ट हुनुपर्छ र अडकिएर बोल्नु हुँदैन। तपाईंका केही जर्मन शब्दहरूको उच्चारण सुधार गर्नुपर्ने देखिन्छ।`
        : `Your score is ${score}/${maxScore}. A perfect speaking score requires clear pronunciation and fluid delivery without long pauses. Practice pronouncing German vowels more clearly.`;
      break;
    default:
      maxScore = 5;
      score = Math.floor(Math.random() * (maxScore - 2)) + 2;
      feedback = isNepali
        ? `तपाईंको स्कोर ${score}/${maxScore} छ। यो खण्डमा सही उत्तर पहिचान गर्नु महत्त्वपूर्ण हुन्छ।`
        : `Your score is ${score}/${maxScore}. Identifying the exact correct answer is key for full marks in this section.`;
  }

  return {
    score,
    maxScore,
    feedback,
  };
};

export const evaluateWithAI = async (
  teilType: TeilType,
  userAnswer: string,
  language: Language
): Promise<AIEvaluationResult> => {
  // TODO: Replace with real API call (e.g., OpenAI or Claude)
  // Requires backend integration, API keys, and handling real responses.
  return mockEvaluateWithAI(teilType, userAnswer, language);
};
