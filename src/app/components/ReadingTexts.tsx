import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Home, BookOpen, ArrowLeft, Volume2 } from "lucide-react";
import { READING_TEXTS, Text } from "../data/readingTexts";

interface ReadingTextsProps {
  onBack: () => void;
}

// Web Speech API utility
const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 0.75; // Slower for children
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
};

export function ReadingTexts({ onBack }: ReadingTextsProps) {
  const [selectedText, setSelectedText] = useState<Text | null>(null);

  if (selectedText) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-3xl mx-auto py-8">
          <Card className="p-6 md:p-8 shadow-xl bg-white/90 backdrop-blur">
            <div className="space-y-6">
              {/* Back button at top */}
              <div className="flex justify-start">
                <Button 
                  onClick={() => setSelectedText(null)}
                  size="lg"
                  variant="outline"
                  className="text-lg font-semibold border-2 hover:bg-gray-100"
                >
                  <ArrowLeft className="mr-2 h-6 w-6" />
                  Назад
                </Button>
              </div>

              {/* Header */}
              <div className="text-center space-y-3">
                <div className="text-5xl">{selectedText.emoji}</div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {selectedText.title}
                </h1>
                <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {selectedText.level}
                </div>
              </div>

              {/* Text content */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-8 border-2 border-yellow-200">
                <div className="space-y-4">
                  {selectedText.content.map((line, index) => (
                    <p key={index} className="text-xl md:text-2xl text-gray-800 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Self-check button */}
              <Button
                onClick={() => {
                  const fullText = selectedText.content.join(' ').replace(/-/g, '');
                  speak(fullText);
                }}
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-2xl py-6 font-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                <Volume2 className="mr-3 h-6 w-6" />
                🔊 Про-верь се-бя
              </Button>

              {/* Back button at bottom - big and obvious */}
              <Button
                onClick={() => setSelectedText(null)}
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-2xl py-6 font-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                <ArrowLeft className="mr-3 h-6 w-6" />
                На-зад к текстам
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto py-8">
        <Card className="p-6 md:p-8 shadow-xl bg-white/90 backdrop-blur">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  📚 Тексты для чтения
                </h1>
                <p className="text-2xl text-gray-600 mt-2 font-semibold">
                  Выбери интересный рассказ
                </p>
              </div>
              <Button 
                onClick={onBack} 
                size="lg"
                className="text-2xl font-bold py-6 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                <ArrowLeft className="mr-2 h-6 w-6" />
                Назад
              </Button>
            </div>

            {/* Texts list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {READING_TEXTS.map((text) => (
                <Card
                  key={text.id}
                  className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-white to-gray-50 border-3"
                  onClick={() => setSelectedText(text)}
                >
                  <div className="space-y-3">
                    <div className="text-5xl">{text.emoji}</div>
                    <div>
                      <h3 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        {text.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                          {text.level}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full mt-2 text-2xl py-6 font-black bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                      <BookOpen className="mr-2 h-6 w-6" />
                      Чи-тать
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Info */}
            <div className="bg-purple-50 rounded-lg p-4 mt-6">
              <p className="text-sm text-gray-700">
                🎯 <strong>Все тексты разбиты по слогам</strong> — это поможет тебе легче читать!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}