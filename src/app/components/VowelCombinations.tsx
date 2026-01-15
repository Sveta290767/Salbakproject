import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Home } from 'lucide-react';

interface VowelCombinationsProps {
  onBack: () => void;
  onHome: () => void;
}

const VOWEL_COMBINATIONS = [
  'АО', 'УА', 'ИА', 'ОУ', 'ЮО', 'ИУ', 'АУ', 'ЭЯ', 'ИЭ',
  'ОЕ', 'ЕО', 'ЯУ', 'УЯ', 'ЁА', 'АЁ', 'ЫО', 'ОЫ', 'ЮА', 'АЮ',
  'ИО', 'ОИ', 'ЕУ', 'УЕ', 'ЯО', 'ОЯ', 'ЁУ', 'УЁ', 'ЭО', 'ОЭ'
];

const COLORS = [
  'from-red-500 to-pink-500',
  'from-blue-500 to-purple-500',
  'from-green-500 to-teal-500',
  'from-orange-500 to-yellow-500',
  'from-purple-500 to-pink-500',
  'from-teal-500 to-cyan-500',
  'from-yellow-500 to-orange-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-blue-500'
];

export function VowelCombinations({ onBack, onHome }: VowelCombinationsProps) {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <Card className="p-6 md:p-10 shadow-xl bg-white/95 backdrop-blur">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Button 
                  onClick={onBack} 
                  size="lg"
                  className="text-2xl font-bold py-6 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  <ArrowLeft className="mr-2 h-6 w-6" />
                  На-зад
                </Button>
                <Button 
                  onClick={onHome} 
                  size="lg"
                  className="text-2xl font-bold py-6 px-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white"
                >
                  <Home className="mr-2 h-6 w-6" />
                  До-мой
                </Button>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-4">
              <div className="text-7xl">🎵</div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Глас-ны-е бук-вы
              </h1>
              <p className="text-2xl text-gray-700 font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                На-жи-май на каж-ду-ю кар-точ-ку и на-зо-ви бук-вы
              </p>
            </div>

            {/* Vowel combinations grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {VOWEL_COMBINATIONS.map((combination, index) => (
                <Card
                  key={index}
                  className={`
                    p-6 cursor-pointer transition-all hover:scale-110 hover:shadow-2xl
                    bg-gradient-to-br ${COLORS[index % COLORS.length]} border-4 border-white
                  `}
                >
                  <div className="text-center">
                    <div className="text-5xl md:text-6xl font-black text-white" style={{ fontFamily: 'Comic Sans MS, cursive', textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}>
                      {combination}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Info */}
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6 border-3 border-pink-200">
              <p className="text-2xl text-center font-bold text-pink-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                🎯 На-жи-май на каж-ду-ю кар-точ-ку и на-зо-ви бук-вы
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
