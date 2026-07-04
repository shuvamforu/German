import { evaluateWithAI, AIEvaluationResult } from './aiService';
import { TeilType } from '../data/mockTests';

describe('aiService - evaluateWithAI', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const getResult = async (promise: Promise<AIEvaluationResult>) => {
    jest.advanceTimersByTime(2000);
    return await promise;
  };

  describe('Fallback for Empty Answers', () => {
    it('returns deterministic fallback of score 0 for empty string in English', async () => {
      const promise = evaluateWithAI('Schreiben', '', 'english');
      const result = await getResult(promise);

      expect(result).toEqual({
        score: 0,
        maxScore: 10,
        feedback: 'You provided no answer. Please write or upload something.',
      });
    });

    it('returns deterministic fallback of score 0 for whitespace string in Nepali', async () => {
      const promise = evaluateWithAI('Sprechen', '   ', 'nepali');
      const result = await getResult(promise);

      expect(result).toEqual({
        score: 0,
        maxScore: 10,
        feedback: 'तपाईंले कुनै उत्तर दिनुभएन। कृपया केही लेख्नुहोस् वा अपलोड गर्नुहोस्।',
      });
    });

    it('returns deterministic fallback for null-like empty string', async () => {
      const promise = evaluateWithAI('Hören', '', 'english');
      const result = await getResult(promise);

      expect(result.score).toBe(0);
      expect(result.maxScore).toBe(10);
    });
  });

  describe('Mock Random Scoring for Populated Answers', () => {
    it('returns random score and specific feedback for Schreiben (English)', async () => {
      const promise = evaluateWithAI('Schreiben', 'Here is my answer', 'english');
      const result = await getResult(promise);

      expect(result.maxScore).toBe(10);
      expect(result.score).toBeGreaterThanOrEqual(4);
      expect(result.score).toBeLessThanOrEqual(10);
      expect(result.feedback).toContain('Your score is');
      expect(result.feedback).toContain('/10');
      expect(result.feedback).toContain('perfect score');
    });

    it('returns random score and specific feedback for Sprechen (Nepali)', async () => {
      const promise = evaluateWithAI('Sprechen', 'My spoken answer text', 'nepali');
      const result = await getResult(promise);

      expect(result.maxScore).toBe(15);
      expect(result.score).toBeGreaterThanOrEqual(5);
      expect(result.score).toBeLessThanOrEqual(15);
      expect(result.feedback).toContain('तपाईंको स्कोर');
      expect(result.feedback).toContain('/15');
      expect(result.feedback).toContain('उत्कृष्ट अंक');
    });

    it('returns random score and specific feedback for Hören (Default/English)', async () => {
      const promise = evaluateWithAI('Hören', 'Some answer', 'english');
      const result = await getResult(promise);

      expect(result.maxScore).toBe(5);
      expect(result.score).toBeGreaterThanOrEqual(2);
      expect(result.score).toBeLessThanOrEqual(5);
      expect(result.feedback).toContain('Your score is');
      expect(result.feedback).toContain('/5');
      expect(result.feedback).toContain('Identifying the exact correct answer');
    });
  });
});
