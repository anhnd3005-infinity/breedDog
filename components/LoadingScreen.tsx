import React, { useEffect, useState } from 'react';

const messages = [
  "Đang kết nối với vũ trụ loài chó...",
  "Đang phân tích phong cách làm việc...",
  "Đang tìm giống chó phù hợp...",
  "Đang vẫy đuôi chờ kết quả...",
  "Chờ xíu nhé, gâu gâu..."
];

export const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 bg-orange-200 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-2 bg-orange-100 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
          🦴
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-stone-800 mb-2 font-display">
        {messages[messageIndex]}
      </h3>
      <p className="text-stone-400 text-sm">
        AI đang làm việc chăm chỉ...
      </p>
    </div>
  );
};