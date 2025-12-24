import React, { useState } from 'react';
import { QUESTIONS } from '../data/questions';
import { QuizAnswer } from '../types';

interface WelcomeScreenProps {
  onAnalyze: (name: string, answers: QuizAnswer[]) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onAnalyze }) => {
  const [started, setStarted] = useState(false);
  const [name, setName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  // Handle Name Submission
  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setStarted(true);
    }
  };

  // Handle Option Selection
  const handleOptionSelect = (optionValue: string) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      answerText: optionValue
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      // Next Question
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 250); // Small delay for visual feedback
    } else {
      // Finish Quiz
      onAnalyze(name, updatedAnswers);
    }
  };

  // View 1: Name Input
  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto px-6">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4 animate-bounce">🐶</div>
          <h1 className="font-display text-4xl font-extrabold text-stone-800 mb-2">
            Color<span className="text-orange-500">Woof</span>
          </h1>
          <p className="text-stone-500 font-medium">
            Trả lời câu hỏi để tìm ra "hệ" chó văn phòng của bạn!
          </p>
        </div>

        <form onSubmit={handleStart} className="w-full bg-white p-8 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100">
          <label htmlFor="name" className="block text-sm font-bold text-stone-700 mb-3 ml-1">
            Đầu tiên, tên bạn là gì?
          </label>
          <input
            id="name"
            type="text"
            required
            autoFocus
            className="w-full px-5 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all text-stone-800 font-bold text-lg placeholder-stone-300 mb-6"
            placeholder="Nhập tên của bạn..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-stone-800 hover:bg-stone-900 text-white font-display font-bold py-4 rounded-2xl shadow-lg shadow-stone-800/20 transform transition-all hover:scale-[1.02] active:scale-95 text-lg"
          >
            Bắt đầu Quiz 🦴
          </button>
        </form>
      </div>
    );
  }

  // View 2: Quiz Questions
  const question = QUESTIONS[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto px-6 min-h-[60vh] justify-center">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-stone-200 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-orange-500 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${((currentQuestionIndex) / QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      <div className="w-full bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 animate-fade-in-up">
        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold mb-4">
          Câu hỏi {currentQuestionIndex + 1}/{QUESTIONS.length}
        </span>
        
        <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-800 mb-8 leading-relaxed">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(option.value)}
              className="w-full text-left p-4 rounded-2xl border-2 border-stone-100 hover:border-orange-400 hover:bg-orange-50 transition-all group flex items-center gap-4"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-stone-100 text-stone-500 font-bold rounded-full group-hover:bg-orange-200 group-hover:text-orange-700 transition-colors text-sm">
                {option.label}
              </span>
              <span className="font-medium text-stone-700 group-hover:text-stone-900 text-sm sm:text-base">
                {option.value}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};