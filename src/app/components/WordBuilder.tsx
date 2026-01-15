import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Home, ArrowRight, CheckCircle, HelpCircle, ArrowLeft } from "lucide-react";
import { Progress } from "./ui/progress";
import { LEARNING_WORDS, Word } from "../data/words";

interface WordBuilderProps {
  onComplete: () => void;
  onHome: () => void;
  onBack?: () => void;
  onWordComplete: (word: string) => void;
}

export function WordBuilder({ onComplete, onHome, onBack, onWordComplete }: WordBuilderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [shuffledSyllables, setShuffledSyllables] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const currentWord = LEARNING_WORDS[currentIndex];
  const progressPercent = ((currentIndex + 1) / LEARNING_WORDS.length) * 100;

  useEffect(() => {
    // Don't shuffle syllables - keep them in correct order for learning
    setShuffledSyllables([...currentWord.syllables]);
    setSelectedSyllables([]);
    setIsCorrect(false);
    setShowCelebration(false);
  }, [currentIndex, currentWord.syllables]);

  const handleSyllableClick = (syllable: string, index: number) => {
    if (isCorrect) return;

    const newSelected = [...selectedSyllables, syllable];
    setSelectedSyllables(newSelected);

    const newShuffled = shuffledSyllables.filter((_, i) => i !== index);
    setShuffledSyllables(newShuffled);

    // Check if word is complete and correct
    if (newSelected.length === currentWord.syllables.length) {
      const assembled = newSelected.join("");
      if (assembled === currentWord.full) {
        setIsCorrect(true);
        setShowCelebration(true);
        onWordComplete(currentWord.full);
      }
    }
  };

  const handleSelectedClick = (index: number) => {
    if (isCorrect) return;

    const syllable = selectedSyllables[index];
    setSelectedSyllables(selectedSyllables.filter((_, i) => i !== index));
    setShuffledSyllables([...shuffledSyllables, syllable]);
  };

  const handleNext = () => {
    if (currentIndex < LEARNING_WORDS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleReset = () => {
    // Don't shuffle syllables - keep them in correct order for learning
    setShuffledSyllables([...currentWord.syllables]);
    setSelectedSyllables([]);
    setIsCorrect(false);
  };

  // Web Speech API utility
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto py-8">
        <Card className="p-6 md:p-8 shadow-xl bg-white/90 backdrop-blur">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 flex-wrap">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Слово {currentIndex + 1} из {LEARNING_WORDS.length}
                  </h2>
                  <Button onClick={() => setShowInstructions(!showInstructions)} variant="outline" size="sm" className="bg-blue-100 hover:bg-blue-200">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Как читать?
                  </Button>
                  {onBack && (
                    <Button 
                      onClick={onBack} 
                      size="lg"
                      className="text-2xl font-bold py-6 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    >
                      <ArrowLeft className="mr-2 h-6 w-6" />
                      На-зад
                    </Button>
                  )}
                  <Button 
                    onClick={onHome} 
                    size="lg"
                    className="text-2xl font-bold py-6 px-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white"
                  >
                    <Home className="mr-2 h-6 w-6" />
                    До-мой
                  </Button>
                </div>
                <Progress value={progressPercent} className="mt-3 h-2" />
              </div>
            </div>

            {/* Image showing the word */}
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-6xl mb-4">🎨</div>
                  <div className="text-2xl font-bold text-gray-700">{currentWord.full}</div>
                </div>
              </div>
            </div>

            {/* Selected syllables area */}
            <div className="bg-white rounded-lg p-8 min-h-40">
              <div className="flex gap-4 justify-center items-center min-h-24">
                {selectedSyllables.map((syllable, index) => (
                  <Button
                    key={index}
                    onClick={() => handleSelectedClick(index)}
                    size="lg"
                    className="text-4xl md:text-5xl px-10 py-10 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 font-bold shadow-xl"
                    disabled={isCorrect}
                  >
                    {syllable}
                  </Button>
                ))}
              </div>
            </div>

            {/* Available syllables */}
            {!isCorrect && shuffledSyllables.length > 0 && (
              <div className="bg-white rounded-lg p-8">
                <div className="flex gap-4 justify-center">
                  {shuffledSyllables.map((syllable, index) => (
                    <Button
                      key={index}
                      onClick={() => handleSyllableClick(syllable, index)}
                      size="lg"
                      variant="outline"
                      className="text-4xl md:text-5xl px-10 py-10 font-bold hover:bg-gradient-to-r hover:from-green-100 hover:to-blue-100 border-4 border-gray-300 hover:border-blue-400 shadow-lg"
                    >
                      {syllable}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Celebration */}
            {showCelebration && (
              <div className="text-center space-y-4 animate-bounce">
                <div className="text-6xl">🎉</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-600">
                    <CheckCircle className="h-8 w-8" />
                    Правильно!
                  </div>
                  <p className="text-xl text-gray-700">
                    Ты прочитал слово: <strong>{currentWord.full}</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {!isCorrect && selectedSyllables.length > 0 && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Начать заново
                </Button>
              )}
              {isCorrect && (
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg"
                >
                  {currentIndex < LEARNING_WORDS.length - 1 ? (
                    <>
                      Следующее слово
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  ) : (
                    "Завершить"
                  )}
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Instructions Modal */}
        {showInstructions && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowInstructions(false)}>
            <Card 
              className="max-w-2xl w-full p-8 bg-white shadow-2xl animate-in fade-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl mb-4">📖</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Как читать по слогам?
                  </h2>
                  <p className="text-gray-600">Подробная инструкция для самостоятельного обучения</p>
                </div>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 border-3 border-blue-300">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl font-bold bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Читай каждый слог отдельно</h3>
                        <p className="text-gray-700 mb-3">
                          Например, для слова "ма-ма": сначала скажи "ма", потом снова "ма"
                        </p>
                        <Button
                          onClick={() => {
                            speak("ма");
                            setTimeout(() => speak("ма"), 1000);
                          }}
                          size="sm"
                          className="bg-blue-500"
                        >
                          🔊 Послушать пример
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-6 border-3 border-green-300">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl font-bold bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Соедини слоги вместе</h3>
                        <p className="text-gray-700 mb-3">
                          Теперь произнеси слоги быстрее, один за другим: "ма-ма" → "мама"
                        </p>
                        <Button
                          onClick={() => speak("мама")}
                          size="sm"
                          className="bg-green-500"
                        >
                          🔊 Послушать целое слово
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-6 border-3 border-orange-300">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl font-bold bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Собери слово из слогов</h3>
                        <p className="text-gray-700">
                          Нажимай на слоги в правильном порядке, чтобы составить слово!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setShowInstructions(false)}
                  size="lg"
                  className="w-full"
                >
                  Понятно, начинаем!
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}