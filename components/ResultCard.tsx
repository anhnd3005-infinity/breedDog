import React, { useRef } from 'react';
import { DogPersona } from '../types';

interface ResultCardProps {
  persona: DogPersona;
  imageUrl: string;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ persona, imageUrl, onReset }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4 animate-fade-in-up">
      <div 
        ref={cardRef}
        className="w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-300/50 border border-stone-100 relative"
      >
        {/* Header Color Band */}
        <div 
          className="h-32 w-full relative"
          style={{ backgroundColor: persona.hexCode }}
        >
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
             <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                <img src={imageUrl} alt="Dog Persona" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>

        <div className="pt-20 pb-8 px-8 text-center">
            {/* Titles */}
            <h2 className="font-display text-2xl font-black text-stone-800 mb-1">
              {persona.breed}
            </h2>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: `${persona.hexCode}20`, color: persona.hexCode }}>
              {persona.colorName}
            </div>

            {/* Description */}
            <p className="text-stone-600 text-sm leading-relaxed mb-6 font-medium">
              {persona.personality}
            </p>

            {/* Quote */}
            <div className="bg-stone-50 rounded-2xl p-4 mb-6 relative">
              <span className="text-4xl absolute -top-3 -left-2 opacity-20">❝</span>
              <p className="text-stone-700 italic font-semibold text-sm relative z-10">
                "{persona.quote}"
              </p>
              <span className="text-4xl absolute -bottom-6 -right-2 opacity-20">❞</span>
            </div>

            {/* Traits */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {persona.traits.map((trait, i) => (
                <span key={i} className="px-4 py-2 bg-stone-100 text-stone-600 rounded-xl text-xs font-bold">
                  #{trait}
                </span>
              ))}
            </div>

            {/* Matches */}
            <div className="grid grid-cols-2 gap-4 border-t border-stone-100 pt-6">
              <div className="text-center">
                <div className="text-xs text-stone-400 font-bold uppercase tracking-wide mb-1">Hợp cạ (Best)</div>
                <div className="text-sm font-bold text-green-600">{persona.bestMatch}</div>
              </div>
              <div className="text-center border-l border-stone-100">
                <div className="text-xs text-stone-400 font-bold uppercase tracking-wide mb-1">Khắc tinh (Worst)</div>
                <div className="text-sm font-bold text-red-500">{persona.worstMatch}</div>
              </div>
            </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8 w-full max-w-xs">
        <button 
          onClick={onReset}
          className="flex-1 bg-white border-2 border-stone-200 text-stone-600 font-bold py-3 rounded-2xl hover:bg-stone-50 transition-colors"
        >
          Thử lại
        </button>
        <button 
          className="flex-1 bg-stone-800 text-white font-bold py-3 rounded-2xl hover:bg-stone-900 transition-colors shadow-lg shadow-stone-800/20"
          onClick={() => alert("Chức năng lưu ảnh đang phát triển! (Image saving coming soon)")}
        >
          Lưu ảnh
        </button>
      </div>
    </div>
  );
};