
import React, { useState, useCallback, useEffect } from 'react';
import { PRESET_ROASTS } from './constants';
import { generateAIRoast } from './services/geminiService';
import { RoastSentence } from './types';

const App: React.FC = () => {
  const [currentSentence, setCurrentSentence] = useState<RoastSentence>({
    text: PRESET_ROASTS[0],
    source: 'local'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [bgHue, setBgHue] = useState(330); // Default to a more pinkish-orange hue

  const handleNextLocal = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * PRESET_ROASTS.length);
    setCurrentSentence({
      text: PRESET_ROASTS[randomIndex],
      source: 'local'
    });
    setCount(prev => prev + 1);
    setBgHue(Math.random() * 360);
  }, []);

  const handleNextAI = async () => {
    setIsLoading(true);
    const aiText = await generateAIRoast();
    setCurrentSentence({
      text: aiText,
      source: 'ai'
    });
    setIsLoading(false);
    setCount(prev => prev + 1);
    setBgHue(Math.random() * 360);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-1000 overflow-hidden relative"
      style={{ backgroundColor: `hsla(${bgHue}, 70%, 95%, 1)` }}
    >
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float pointer-events-none">✨</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }}>💖</div>
      <div className="absolute top-1/4 right-1/4 text-4xl opacity-10 animate-pulse pointer-events-none">⭐</div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-5xl md:text-7xl font-funny text-pink-600 mb-4 animate-bounce">
          李腾观察站
        </h1>
        <p className="text-gray-500 font-medium">李腾，一个被笨蛋之神眷顾的奇女子</p>
      </div>

      {/* Card Section */}
      <div className="relative w-full max-w-2xl z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 transform transition-all duration-500 hover:scale-[1.02] border-4 border-dashed border-pink-300">
          {/* Decorative Elements */}
          <div className="absolute -top-6 -left-6 text-4xl animate-float">🎀</div>
          <div className="absolute -bottom-6 -right-6 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>🧁</div>
          
          <div className="flex flex-col items-center justify-center min-h-[220px]">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-pink-500 font-bold">正在捕捉李腾的新傻萌瞬间...</p>
              </div>
            ) : (
              <p className="text-2xl md:text-4xl font-funny text-center leading-relaxed text-gray-800 transition-opacity duration-300">
                {currentSentence.text}
              </p>
            )}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleNextLocal}
              disabled={isLoading}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              <i className="fas fa-random mr-2"></i>
              换条语录
            </button>
            <button
              onClick={handleNextAI}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
            >
              <i className="fas fa-magic mr-2"></i>
              AI 捕捉灵感
            </button>
          </div>
        </div>

        {/* Counter Widget */}
        <div className="mt-8 text-center text-gray-400 font-bold text-sm">
          今日已记录李腾傻萌值: <span className="text-pink-500 text-xl">{count}</span> 点
        </div>
      </div>

      {/* Footer / Floating Labels */}
      <div className="fixed bottom-8 flex gap-8 opacity-40 select-none pointer-events-none hidden md:flex">
        <span className="text-4xl font-funny rotate-12 text-pink-400">萌萌哒</span>
        <span className="text-4xl font-funny -rotate-12 text-purple-400">大笨蛋</span>
        <span className="text-4xl font-funny rotate-6 text-orange-400">李腾女侠</span>
      </div>

      {/* Disclaimer */}
      <p className="mt-12 text-xs text-gray-400 italic z-10">
        * 本网站仅供娱乐，记录李腾女侠的各种可爱瞬间。
      </p>
    </div>
  );
};

export default App;
