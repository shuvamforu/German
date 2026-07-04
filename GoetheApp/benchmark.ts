import { evaluateWithAI } from './services/aiService';

async function runBenchmark() {
  const start = Date.now();
  for (let i = 0; i < 5; i++) {
    await evaluateWithAI('Schreiben', 'My answer', 'english');
  }
  const end = Date.now();
  console.log(`Time taken for 5 calls: ${end - start}ms`);
}

runBenchmark();
