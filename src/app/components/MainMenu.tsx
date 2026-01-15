import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Home, BookOpen, AlignLeft, BookText, Trophy, Target, Users, ArrowLeft, Volume2 } from "lucide-react";
import { Progress } from "../hooks/useProgress";

interface MainMenuProps {
  onAlphabet: () => void;
  onReadBySyllables: () => void;
  onReadingTexts: () => void;
  onViewAchievements: () => void;
  onViewPractice: () => void;
  onParentsTips?: () => void;
  onVowels?: () => void;
  onConsonants?: () => void;
  onBack?: () => void;
  progress: Progress;
}

export function MainMenu({ 
  onAlphabet, 
  onReadBySyllables, 
  onReadingTexts,
  onViewAchievements,
  onViewPractice,
  onParentsTips,
  onVowels,
  onConsonants,
  onBack,
  progress 
}: MainMenuProps) {
  const unlockedCount = progress.achievements.filter(a => a.unlocked).length;
  const wordsCount = progress.wordsCompleted.length;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Card className="max-w-3xl w-full p-8 md:p-12 shadow-2xl bg-white/90 backdrop-blur">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="text-5xl mb-3">🎓</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Главное меню
            </h1>
            <p className="text-gray-600">Выбери, чем хочешь заняться</p>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-800">{wordsCount}</div>
              <div className="text-xs text-blue-700">слов изучено</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-800">{unlockedCount}/{progress.achievements.length}</div>
              <div className="text-xs text-green-700">достижений</div>
            </div>
          </div>

          {/* Основные разделы */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200"
                  onClick={onAlphabet}>
              <div className="text-6xl mb-4">Ф</div>
              <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Ал-фа-вит
              </h3>
              <Button className="w-full text-2xl py-6 bg-red-500 hover:bg-red-600 font-bold">
                <AlignLeft className="mr-2 h-6 w-6" />
                От-крыть
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200"
                  onClick={onReadBySyllables}>
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Чи-та-ем по сло-гам
              </h3>
              <Button className="w-full text-2xl py-6 bg-blue-500 hover:bg-blue-600 font-bold">
                <BookOpen className="mr-2 h-6 w-6" />
                На-чать
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200"
                  onClick={onReadingTexts}>
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Тексты для чтения
              </h3>
              <Button className="w-full text-2xl py-6 bg-green-500 hover:bg-green-600 font-bold">
                <BookText className="mr-2 h-6 w-6" />
                Чи-тать
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-pink-50 to-purple-100 border-2 border-pink-200"
                  onClick={onVowels}>
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Глас-ны-е
              </h3>
              <Button className="w-full text-2xl py-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 font-bold">
                <Volume2 className="mr-2 h-6 w-6" />
                Про-чи-тай
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-cyan-50 to-blue-100 border-2 border-cyan-200"
                  onClick={onConsonants}>
              <div className="text-6xl mb-4">🎸</div>
              <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Со-глас-ны-е
              </h3>
              <Button className="w-full text-2xl py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 font-bold">
                <Volume2 className="mr-2 h-6 w-6" />
                Про-чи-тай
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200"
                  onClick={onViewPractice}>
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Прак-ти-ка
              </h3>
              <Button className="w-full text-2xl py-6 bg-purple-500 hover:bg-purple-600 font-bold">
                <Target className="mr-2 h-6 w-6" />
                Прак-ти-ко-вать
              </Button>
            </Card>

            <Card 
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200"
              onClick={onParentsTips}
            >
              <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Советы родителям
              </h3>
              <Button className="w-full text-2xl py-6 bg-pink-500 hover:bg-pink-600 font-bold">
                <Users className="mr-2 h-6 w-6" />
                Открыть
              </Button>
            </Card>
          </div>

          {/* Достижения */}
          <Button 
            onClick={onViewAchievements} 
            variant="outline" 
            size="lg" 
            className="w-full text-2xl py-6 font-bold border-3"
          >
            <Trophy className="mr-2 h-6 w-6" />
            Мои до-сти-же-ни-я
          </Button>

          {/* Назад */}
          {onBack && (
            <Button 
              onClick={onBack} 
              size="lg"
              className="text-2xl font-bold py-6 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <ArrowLeft className="mr-2 h-6 w-6" />
              Назад
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}