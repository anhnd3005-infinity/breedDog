import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ResultCard } from './components/ResultCard';
import { LoadingScreen } from './components/LoadingScreen';
import { generateDogPersona, generateDogImage } from './services/gemini';
import { AppStep, DogPersona, QuizAnswer } from './types';

function App() {
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [persona, setPersona] = useState<DogPersona | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAnalyze = async (name: string, answers: QuizAnswer[]) => {
    setStep(AppStep.LOADING);
    setError('');

    try {
      // 1. Generate Text Persona based on Quiz Answers
      const data = await generateDogPersona(name, answers);
      setPersona(data);

      // 2. Generate Image based on persona
      const img = await generateDogImage(data);
      setImageUrl(img);

      setStep(AppStep.RESULT);
    } catch (err: any) {
      console.error(err);
      // Display the actual error message for better debugging
      setError(err.message || 'Có lỗi xảy ra khi kết nối với AI.');
      setStep(AppStep.ERROR);
    }
  };

  const handleReset = () => {
    setStep(AppStep.INPUT);
    setPersona(null);
    setImageUrl('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col relative overflow-hidden">
      {/* Decorative background blobs - Updated to Orange/Yellow/Blue for Dog theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-200/30 rounded-full blur-3xl mix-blend-multiply filter pointer-events-none animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/30 rounded-full blur-3xl mix-blend-multiply filter pointer-events-none animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-yellow-200/30 rounded-full blur-3xl mix-blend-multiply filter pointer-events-none animate-blob animation-delay-4000"></div>

      <main className="flex-grow flex items-center justify-center relative z-10 py-12">
        {step === AppStep.INPUT && (
          <WelcomeScreen onAnalyze={handleAnalyze} />
        )}

        {step === AppStep.LOADING && (
          <LoadingScreen />
        )}

        {step === AppStep.RESULT && persona && (
          <ResultCard persona={persona} imageUrl={imageUrl} onReset={handleReset} />
        )}

        {step === AppStep.ERROR && (
          <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-sm mx-4">
            <div className="text-4xl mb-4">🐕‍🦺</div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Úi chà! Có lỗi rồi</h3>
            <p className="text-stone-600 mb-6 text-sm break-words">{error}</p>
            <button 
              onClick={handleReset}
              className="px-6 py-2 bg-stone-800 text-white rounded-xl font-bold hover:bg-stone-900"
            >
              Thử lại
            </button>
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-stone-400 text-xs relative z-10">
        <p>&copy; {new Date().getFullYear()} ColorWoof AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;