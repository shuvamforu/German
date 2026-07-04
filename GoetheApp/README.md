# SuvaGerman: Gamified Goethe Exam Prep App

Welcome to SuvaGerman! This is a specialized, gamified mobile application designed for Nepali speakers preparing for Goethe-Institut German exams (A1-C2). It focuses on high engagement using gaming mechanics and is built with React Native and Expo.

## ✨ Key Features

* **Bilingual Interface (Nepali & English):** Instantly toggle between languages without navigating away or reloading the screen. Perfect for clear understanding of complex grammar rules and test formats.
* **Gamification & Dopamine Hits:** Employs gaming techniques to maintain user attention. Earn XP, maintain streaks, and receive visually rewarding popups (using "antigravity" spring animations) upon lesson and test completions.
* **AI-Simulated Mock Tests (Goethe Standard):** Includes 50+ time-bound mock tests for Reading, Writing, Listening, and Speaking, categorized by Goethe exam sections (Teil). Features simulated AI grading based on official Goethe rubrics, returning scores, feedback, and hidden perfect solutions.
* **Study Pathways & Blogs:** Structured A1 to C2 study guides and informative articles about studying and living in Germany.
* **Consultancy "Servers":** A Discord-like interface allowing users to join specific consultancy or study groups, with deep links to Zoom classes and WhatsApp groups.
* **Nepali Geographic Theme:** UI color palette inspired by Nepal's diverse geography (Himalayan Blue, Hilly Green, Terai Earthy).
* **Onboarding FTUE:** A smooth first-time user experience tutorial to introduce key features.

## 🚀 Installation & Setup

1. **Prerequisites:** Ensure you have Node.js installed on your machine. You will also need the [Expo Go](https://expo.dev/client) app installed on your physical iOS/Android device, or an emulator/simulator setup on your computer.
2. **Navigate to the app directory:**
   ```bash
   cd GoetheApp
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npx expo start
   ```
5. **Run the App:**
   * Scan the QR code presented in your terminal (or Expo dev tools in the browser) using the Expo Go app on your phone.
   * Press `a` in the terminal to open on an Android emulator, or `i` for an iOS simulator.

## 🛠 Important Technical Notes for the Developer (You!)

* **Framework:** React Native + Expo. This allows you to build for both iOS and Android simultaneously without dealing directly with native code immediately.
* **State Management:** Uses `zustand` (`store/useAppStore.ts`). It handles the current screen navigation, language toggle, and gamification stats (XP, streaks).
* **Animations:** Uses `react-native-reanimated`. This provides high-performance, 60fps animations. The reward modal uses its spring animations for the dopamine effect.
* **Mock Data:** Currently, lessons, tests, blogs, and the AI evaluation (`services/aiService.ts`) are **mocked**.
    * **Next Step for Production:** You will need to replace `services/aiService.ts` with real API calls to an LLM (like OpenAI's GPT-4 or Claude 3) to actually evaluate user writing and speaking inputs.
* **Audio/File Uploads:** The active test screen has UI placeholders for uploading audio or files. You will need to integrate native libraries (like `expo-av` for recording and `expo-document-picker`) to make these fully functional.
* **Vector Logo:** The app includes a custom SVG logo (`assets/logo.svg`) representing the Nepali mountains and German flag colors.

## 💰 Monetization Strategies (How to Make Money)

Here are the primary ways you can monetize the SuvaGerman app, tailored to your target audience:

1. **Freemium Model (In-App Purchases / Subscriptions):**
   * **Free:** Give access to basic A1 lessons, 2-3 free mock tests, and the initial study pathways.
   * **Premium (SuvaGerman Pro):** Charge a monthly or one-time fee to unlock all 50+ mock tests, advanced AI feedback (using real API credits), and C1/C2 material.

2. **Consultancy Partnerships (B2B Lead Generation):**
   * The "Servers" screen is a goldmine. You can charge Educational Consultancies in Nepal a monthly fee to be listed in the app.
   * You can act as an affiliate: Get a commission for every student that signs up for a real-life Zoom class or visa processing service through your app's WhatsApp/Zoom links.

3. **In-App Advertising:**
   * Integrate Google AdMob or Meta Audience Network.
   * Show ads (banners or rewarded video ads) to free users. *Tip: Offer users extra "XP" or an extra free mock test if they watch a full rewarded video ad.*

4. **Sell Add-on Content:**
   * Sell specific, highly targeted cheat sheets, vocabulary lists, or "Exam Secrets" PDFs as one-off in-app purchases.
   * Charge a small fee for human-expert reviews of speaking/writing tests if the user prefers that over AI grading.

5. **Data & Analytics (Anonymized):**
   * While respecting privacy laws, aggregated data on which exam sections Nepali students struggle with most can be highly valuable to educational institutions and consultancies.
