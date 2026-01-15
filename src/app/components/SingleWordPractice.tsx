import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, CheckCircle, RotateCcw } from "lucide-react";

interface Word {
  syllables: string[];
  full: string;
  imageQuery: string;
}

interface SingleWordPracticeProps {
  word: Word;
  onBack: () => void;
  onComplete: (word: string) => void;
  onNext: () => void;
}

export function SingleWordPractice({ word, onBack, onComplete, onNext }: SingleWordPracticeProps) {
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [shuffledSyllables, setShuffledSyllables] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    resetPractice();
  }, [word]);

  const resetPractice = () => {
    const shuffled = [...word.syllables].sort(() => Math.random() - 0.5);
    setShuffledSyllables(shuffled);
    setSelectedSyllables([]);
    setIsCorrect(false);
  };

  const handleSyllableClick = (syllable: string, index: number) => {
    if (isCorrect) return;

    const newSelected = [...selectedSyllables, syllable];
    setSelectedSyllables(newSelected);

    const newShuffled = shuffledSyllables.filter((_, i) => i !== index);
    setShuffledSyllables(newShuffled);

    // Check if word is complete and correct
    if (newSelected.length === word.syllables.length) {
      const assembled = newSelected.join("");
      if (assembled === word.full) {
        setIsCorrect(true);
        setAttempts(attempts + 1);
        onComplete(word.full);
      }
    }
  };

  const handleSelectedClick = (index: number) => {
    if (isCorrect) return;

    const syllable = selectedSyllables[index];
    setSelectedSyllables(selectedSyllables.filter((_, i) => i !== index));
    setShuffledSyllables([...shuffledSyllables, syllable]);
  };

  const handleTryAgain = () => {
    resetPractice();
    setAttempts(attempts + 1);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto py-8">
        <Card className="p-6 md:p-8 shadow-xl bg-white/90 backdrop-blur">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Button 
                onClick={onBack} 
                size="lg"
                className="text-2xl font-bold py-6 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                <ArrowLeft className="mr-2 h-6 w-6" />
                Назад
              </Button>
              <div className="text-sm text-gray-600">
                Попыток: {attempts}
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">
                Практика слова
              </h1>
              <p className="text-gray-600 mt-1">
                Собери слово из слогов
              </p>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-6xl mb-4">🎨</div>
                  <div className="text-2xl font-bold text-gray-700">{word.full}</div>
                </div>
              </div>
            </div>

            {/* Selected syllables area */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 min-h-32 border-4 border-dashed border-yellow-300">
              <p className="text-sm text-gray-600 mb-3 text-center">
                Собери слово:
              </p>
              <div className="flex flex-wrap gap-3 justify-center items-center min-h-16">
                {selectedSyllables.length === 0 ? (
                  <p className="text-gray-400 text-lg">Нажми на слоги ниже</p>
                ) : (
                  selectedSyllables.map((syllable, index) => (
                    <Button
                      key={index}
                      onClick={() => handleSelectedClick(index)}
                      size="lg"
                      className="text-2xl md:text-3xl px-6 py-6 bg-blue-500 hover:bg-blue-600 font-bold"
                      disabled={isCorrect}
                    >
                      {syllable}
                    </Button>
                  ))
                )}
              </div>
            </div>

            {/* Available syllables */}
            {!isCorrect && shuffledSyllables.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-3 text-center">
                  Доступные слоги:
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {shuffledSyllables.map((syllable, index) => (
                    <Button
                      key={index}
                      onClick={() => handleSyllableClick(syllable, index)}
                      size="lg"
                      variant="outline"
                      className="text-2xl md:text-3xl px-6 py-6 font-bold hover:bg-blue-100 border-2"
                    >
                      {syllable}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Celebration */}
            {isCorrect && (
              <div className="text-center space-y-4">
                <div className="text-6xl animate-bounce">🎉</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-600">
                    <CheckCircle className="h-8 w-8" />
                    Отлично!
                  </div>
                  <p className="text-xl text-gray-700">
                    Ты правильно собрал слово: <strong>{word.full}</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {!isCorrect && selectedSyllables.length > 0 && (
                <Button
                  onClick={resetPractice}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Начать заново
                </Button>
              )}
              {isCorrect && (
                <>
                  <Button
                    onClick={handleTryAgain}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Повторить еще раз
                  </Button>
                  <Button
                    onClick={onBack}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    Выбрать другое слово
                  </Button>
                </>
              )}
            </div>

            <div className="text-center space-y-4">
              <Button 
                onClick={onNext} 
                size="lg"
                className="w-full md:w-auto px-12 py-6 text-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                Следующее слово
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}