import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Home, Target, CheckCircle, ArrowLeft } from "lucide-react";
import { Progress as ProgressType } from "../hooks/useProgress";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Word {
  syllables: string[];
  full: string;
  imageQuery: string;
}

interface PracticeModeProps {
  progress: ProgressType;
  onBack: () => void;
  onPracticeWord: (word: Word) => void;
}

const ALL_WORDS: Word[] = [
  { syllables: ["ма", "ма"], full: "мама", imageQuery: "mother child" },
  { syllables: ["па", "па"], full: "папа", imageQuery: "father child" },
  { syllables: ["ко", "т"], full: "кот", imageQuery: "cute cat" },
  { syllables: ["со", "ба", "ка"], full: "собака", imageQuery: "happy dog" },
  { syllables: ["ры", "ба"], full: "рыба", imageQuery: "colorful fish" },
  { syllables: ["до", "м"], full: "дом", imageQuery: "house home" },
  { syllables: ["де", "ре", "во"], full: "дерево", imageQuery: "tree nature" },
  { syllables: ["цве", "ток"], full: "цветок", imageQuery: "flower bloom" },
  { syllables: ["солн", "це"], full: "солнце", imageQuery: "sun sunny" },
  { syllables: ["ма", "ши", "на"], full: "машина", imageQuery: "toy car" },
  { syllables: ["кни", "га"], full: "книга", imageQuery: "children book" },
  { syllables: ["я", "бло", "ко"], full: "яблоко", imageQuery: "red apple" },
  { syllables: ["мяч"], full: "мяч", imageQuery: "ball play" },
  { syllables: ["ли", "са"], full: "лиса", imageQuery: "fox animal" },
  { syllables: ["за", "яц"], full: "заяц", imageQuery: "rabbit bunny" },
];

export function PracticeMode({ progress, onBack, onPracticeWord }: PracticeModeProps) {
  const completedWords = ALL_WORDS.filter(word => 
    progress.wordsCompleted.includes(word.full)
  );

  const notCompletedWords = ALL_WORDS.filter(word => 
    !progress.wordsCompleted.includes(word.full)
  );

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="max-w-5xl mx-auto py-8">
        <Card className="p-6 md:p-8 shadow-xl bg-white/90 backdrop-blur">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                🎯 Практика
              </h1>
              <Button 
                onClick={onBack} 
                size="lg"
                className="text-2xl font-bold py-6 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                <ArrowLeft className="mr-2 h-6 w-6" />
                Назад
              </Button>
            </div>

            {/* Statistics */}
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-800">
                    {completedWords.length}
                  </div>
                  <div className="text-sm text-blue-700">
                    слов изучено
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-800">
                    {notCompletedWords.length}
                  </div>
                  <div className="text-sm text-purple-700">
                    слов доступно
                  </div>
                </div>
              </div>
            </div>

            {/* Completed words */}
            {completedWords.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  Изученные слова
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {completedWords.map((word) => (
                    <Card
                      key={word.full}
                      className="p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
                      onClick={() => onPracticeWord(word)}
                    >
                      <div className="space-y-3">
                        <div className="text-center py-6">
                          <div className="text-5xl mb-2">📚</div>
                          <p className="font-bold text-xl text-gray-800">{word.full}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {word.syllables.join("-")}
                          </p>
                        </div>
                        <Button size="sm" className="w-full bg-green-500 hover:bg-green-600">
                          <Target className="mr-1 h-3 w-3" />
                          Повторить
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Not completed words */}
            {notCompletedWords.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300" />
                  Еще не изученные
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {notCompletedWords.map((word) => (
                    <Card
                      key={word.full}
                      className="p-4 opacity-60 bg-gray-50 border-2 border-gray-200"
                    >
                      <div className="space-y-3">
                        <div className="text-center py-6">
                          <div className="text-5xl mb-2 grayscale opacity-50">📚</div>
                          <p className="font-bold text-xl text-gray-600">{word.full}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {word.syllables.join("-")}
                          </p>
                        </div>
                        <div className="text-xs text-center text-gray-500 py-2">
                          Еще не изучено
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {completedWords.length === 0 && (
              <div className="text-center py-12 space-y-4">
                <div className="text-6xl">📚</div>
                <h3 className="text-2xl font-bold text-gray-700">
                  Пока нет изученных слов
                </h3>
                <p className="text-gray-600">
                  Начни занятие "Читаем по слогам", чтобы выучить первые слова!
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}