import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft } from "lucide-react";
import { LetterDetailModal } from "./LetterDetailModal";

interface AlphabetProps {
  onBack: () => void;
}

const ALL_LETTERS = [
  { letter: "А", name: "а", sound: "а", examples: "арбуз, аист", word: "а-ист", color: "from-red-400 to-red-600", imageQuery: "watermelon" },
  { letter: "Б", name: "бэ", sound: "б", examples: "бабочка, банан", word: "ба-нан", color: "from-orange-500 to-yellow-500", imageQuery: "butterfly" },
  { letter: "В", name: "вэ", sound: "в", examples: "волк, ворона", word: "волк", color: "from-yellow-400 to-yellow-600", imageQuery: "wolf" },
  { letter: "Г", name: "гэ", sound: "г", examples: "гриб, гора", word: "гриб", color: "from-lime-400 to-lime-600", imageQuery: "mushroom" },
  { letter: "Д", name: "дэ", sound: "д", examples: "дом, дерево", word: "дом", color: "from-green-400 to-green-600", imageQuery: "house" },
  { letter: "Е", name: "е", sound: "е", examples: "ель, енот", word: "ель", color: "from-emerald-400 to-emerald-600", imageQuery: "pine tree" },
  { letter: "Ё", name: "ё", sound: "ё", examples: "ёжик, ёлка", word: "ё-жик", color: "from-teal-400 to-teal-600", imageQuery: "hedgehog" },
  { letter: "Ж", name: "жэ", sound: "ж", examples: "жук, жираф", word: "жук", color: "from-cyan-400 to-cyan-600", imageQuery: "beetle" },
  { letter: "З", name: "зэ", sound: "з", examples: "заяц, зебра", word: "за-яц", color: "from-sky-400 to-sky-600", imageQuery: "rabbit" },
  { letter: "И", name: "и", sound: "и", examples: "игла, ива", word: "и-ва", color: "from-blue-400 to-blue-600", imageQuery: "willow tree" },
  { letter: "Й", name: "и краткое", sound: "й", examples: "йогурт, май", word: "май", color: "from-indigo-400 to-indigo-600", imageQuery: "yogurt" },
  { letter: "К", name: "ка", sound: "к", examples: "кот, книга", word: "кот", color: "from-violet-400 to-violet-600", imageQuery: "cat" },
  { letter: "Л", name: "эл", sound: "л", examples: "лиса, луна", word: "ли-са", color: "from-purple-400 to-purple-600", imageQuery: "fox" },
  { letter: "М", name: "эм", sound: "м", examples: "мама, мяч", word: "ма-ма", color: "from-fuchsia-400 to-fuchsia-600", imageQuery: "ball" },
  { letter: "Н", name: "эн", sound: "н", examples: "нос, небо", word: "нос", color: "from-pink-400 to-pink-600", imageQuery: "nose" },
  { letter: "О", name: "о", sound: "о", examples: "окно, осень", word: "о-сень", color: "from-rose-400 to-rose-600", imageQuery: "window" },
  { letter: "П", name: "пэ", sound: "п", examples: "папа, пила", word: "па-па", color: "from-red-500 to-orange-500", imageQuery: "saw tool" },
  { letter: "Р", name: "эр", sound: "р", examples: "рыба, рука", word: "ры-ба", color: "from-orange-400 to-amber-500", imageQuery: "fish" },
  { letter: "С", name: "эс", sound: "с", examples: "слон, солнце", word: "слон", color: "from-yellow-400 to-lime-500", imageQuery: "elephant" },
  { letter: "Т", name: "тэ", sound: "т", examples: "торт, туча", word: "торт", color: "from-green-400 to-emerald-500", imageQuery: "cake" },
  { letter: "У", name: "у", sound: "у", examples: "утка, улица", word: "ут-ка", color: "from-teal-500 to-cyan-500", imageQuery: "duck" },
  { letter: "Ф", name: "эф", sound: "ф", examples: "фрукт, флаг", word: "флаг", color: "from-sky-400 to-blue-500", imageQuery: "flag" },
  { letter: "Х", name: "ха", sound: "х", examples: "хлеб, хвост", word: "хлеб", color: "from-indigo-400 to-violet-500", imageQuery: "bread" },
  { letter: "Ц", name: "цэ", sound: "ц", examples: "цветок, цапля", word: "цве-ток", color: "from-purple-400 to-fuchsia-500", imageQuery: "flower" },
  { letter: "Ч", name: "че", sound: "ч", examples: "часы, чайник", word: "ча-сы", color: "from-pink-500 to-rose-500", imageQuery: "clock" },
  { letter: "Ш", name: "ша", sound: "ш", examples: "шар, шапка", word: "шар", color: "from-red-400 to-pink-400", imageQuery: "balloon" },
  { letter: "Щ", name: "ща", sound: "щ", examples: "щука, щётка", word: "щу-ка", color: "from-orange-500 to-yellow-400", imageQuery: "pike fish" },
  { letter: "Ъ", name: "твёрдый знак", sound: "ъ", examples: "объём, подъезд", word: "объ-ём", color: "from-slate-400 to-slate-600", imageQuery: "volume" },
  { letter: "Ы", name: "ы", sound: "ы", examples: "мыло, рыба", word: "мы-ло", color: "from-amber-400 to-orange-500", imageQuery: "soap" },
  { letter: "Ь", name: "мягкий знак", sound: "ь", examples: "конь, день", word: "конь", color: "from-gray-400 to-gray-600", imageQuery: "horse" },
  { letter: "Э", name: "э", sound: "э", examples: "эхо, экран", word: "э-хо", color: "from-lime-500 to-green-500", imageQuery: "screen" },
  { letter: "Ю", name: "ю", sound: "ю", examples: "юла, юбка", word: "ю-ла", color: "from-emerald-500 to-teal-500", imageQuery: "spinning top" },
  { letter: "Я", name: "я", sound: "я", examples: "яблоко, ягода", word: "я-го-да", color: "from-cyan-500 to-blue-500", imageQuery: "apple" },
];

export function Alphabet({ onBack }: AlphabetProps) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const selectedLetterData = selectedLetter 
    ? ALL_LETTERS.find(l => l.letter === selectedLetter) 
    : null;

  // Simplified letter card for grid view
  const renderSimpleLetterCard = (item: { letter: string; name: string; sound: string; examples: string; color: string; word: string; imageQuery: string }) => (
    <Card
      key={item.letter}
      className={`p-2 md:p-3 cursor-pointer transition-all hover:shadow-xl hover:scale-110 border-3 bg-gradient-to-br ${item.color}`}
      onClick={() => setSelectedLetter(item.letter)}
    >
      <div className="text-center">
        <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-2xl">
          {item.letter}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto py-8">
        <Card className="p-6 md:p-8 shadow-xl bg-white/90 backdrop-blur">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                🔤 Алфавит
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

            {/* All letters in colorful grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-3">
              {ALL_LETTERS.map(renderSimpleLetterCard)}
            </div>
          </div>
        </Card>

        {/* Letter Detail Modal */}
        {selectedLetterData && (
          <LetterDetailModal
            letter={selectedLetterData.letter}
            name={selectedLetterData.name}
            sound={selectedLetterData.sound}
            word={selectedLetterData.word}
            color={selectedLetterData.color}
            imageQuery={selectedLetterData.imageQuery}
            onClose={() => setSelectedLetter(null)}
          />
        )}
      </div>
    </div>
  );
}