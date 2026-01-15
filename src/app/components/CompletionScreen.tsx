import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Home, RotateCcw, Trophy } from "lucide-react";
import { Progress } from "../hooks/useProgress";
import { useEffect, useState } from "react";

interface CompletionScreenProps {
  onRestart: () => void;
  onHome: () => void;
  progress: Progress;
}

export function CompletionScreen({ onRestart, onHome, progress }: CompletionScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const encouragements = [
    "Ты большой молодец! 🌟",
    "Отличная работа! 🎉",
    "Супер! Ты умница! ⭐",
    "Так держать! 👏",
    "Замечательно! 🎊"
  ];

  const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 relative overflow-hidden">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${20 + Math.random() * 20}px`,
              }}
            >
              {['🎉', '⭐', '🌟', '✨', '🎊', '🏆'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      <Card className="max-w-2xl w-full p-8 md:p-12 shadow-2xl bg-white/90 backdrop-blur relative z-10">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="text-7xl md:text-9xl mb-4 animate-bounce">🎉</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Поздравляю!
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              {randomEncouragement}
            </p>
            <p className="text-lg text-gray-600">
              Ты прочитал все слова в этом занятии!
            </p>
          </div>

          {/* Статистика */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold text-purple-800">
                  {progress.wordsCompleted.length}
                </div>
                <div className="text-sm text-purple-700">
                  всего слов
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-800">
                  {progress.achievements.filter(a => a.unlocked).length}
                </div>
                <div className="text-sm text-pink-700">
                  достижений
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={onRestart} 
              size="lg" 
              className="w-full text-lg h-14 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Еще раз!
            </Button>
            
            <Button 
              onClick={onHome} 
              size="lg" 
              className="w-full text-2xl py-8 font-black bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              <Home className="mr-2 h-6 w-6" />
              До-мой
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}