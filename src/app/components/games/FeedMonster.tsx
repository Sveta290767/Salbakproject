import { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'motion/react';

interface FeedMonsterProps {
  onBack: () => void;
  onHome: () => void;
}

interface Monster {
  id: string;
  name: string;
  emoji: string;
  color: string;
  wantsSyllables: string[];
  fed: number;
  maxFood: number;
}

interface Cookie {
  id: string;
  syllable: string;
  color: string;
}

const MONSTERS: Monster[] = [
  {
    id: 'ma',
    name: 'Ма-ша',
    emoji: '👻',
    color: 'from-pink-500 to-purple-500',
    wantsSyllables: ['МА', 'МО', 'МУ'],
    fed: 0,
    maxFood: 3,
  },
  {
    id: 'pa',
    name: 'Па-ша',
    emoji: '👾',
    color: 'from-blue-500 to-cyan-500',
    wantsSyllables: ['ПА', 'ПО', 'ПУ'],
    fed: 0,
    maxFood: 3,
  },
];

const COOKIES: Cookie[] = [
  { id: '1', syllable: 'МА', color: 'from-pink-400 to-red-400' },
  { id: '2', syllable: 'ПА', color: 'from-blue-400 to-cyan-400' },
  { id: '3', syllable: 'МО', color: 'from-purple-400 to-pink-400' },
  { id: '4', syllable: 'ПО', color: 'from-teal-400 to-blue-400' },
  { id: '5', syllable: 'МУ', color: 'from-rose-400 to-pink-400' },
  { id: '6', syllable: 'ПУ', color: 'from-sky-400 to-cyan-400' },
  { id: '7', syllable: 'БА', color: 'from-yellow-400 to-orange-400' },
  { id: '8', syllable: 'СО', color: 'from-green-400 to-emerald-400' },
];

interface DraggableCookieProps {
  cookie: Cookie;
  isUsed: boolean;
}

function DraggableCookie({ cookie, isUsed }: DraggableCookieProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'cookie',
    item: { syllable: cookie.syllable, id: cookie.id },
    canDrag: !isUsed,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  if (isUsed) return null;

  return (
    <motion.div
      ref={drag}
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={`cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <Card className={`p-6 bg-gradient-to-br ${cookie.color} border-4 border-white shadow-xl`}>
        <div className="text-center">
          <div className="text-6xl mb-2">🍪</div>
          <div className="text-4xl font-black text-white" style={{ fontFamily: 'Comic Sans MS, cursive', textShadow: '3px 3px 6px rgba(0,0,0,0.3)', userSelect: 'none' }}>
            {cookie.syllable}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

interface MonsterCardProps {
  monster: Monster;
  onFeed: (monsterId: string, syllable: string, correct: boolean) => void;
}

function MonsterCard({ monster, onFeed }: MonsterCardProps) {
  const [shake, setShake] = useState(false);
  const [happy, setHappy] = useState(false);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'cookie',
    drop: (item: { syllable: string; id: string }) => {
      const isCorrect = monster.wantsSyllables.includes(item.syllable);
      
      if (isCorrect) {
        setHappy(true);
        setTimeout(() => setHappy(false), 1000);
        
        // Озвучка успеха
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(`Ням-ням! ${item.syllable}! Вкус-но!`);
          utterance.lang = 'ru-RU';
          utterance.rate = 0.9;
          utterance.pitch = 1.3;
          window.speechSynthesis.speak(utterance);
        }
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        
        // Озвучка отказа
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance('Фу! Не то!');
          utterance.lang = 'ru-RU';
          utterance.rate = 1.0;
          utterance.pitch = 0.8;
          window.speechSynthesis.speak(utterance);
        }
      }
      
      onFeed(monster.id, item.syllable, isCorrect);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isFull = monster.fed >= monster.maxFood;

  return (
    <motion.div
      ref={drop}
      animate={{
        scale: happy ? [1, 1.1, 1] : shake ? [1, 1.05, 0.95, 1.05, 1] : 1,
        rotate: shake ? [0, -5, 5, -5, 0] : 0,
      }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`
        p-8 transition-all border-4
        ${isFull ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-yellow-400' : `bg-gradient-to-br ${monster.color} border-white`}
        ${isOver && canDrop ? 'scale-105 border-yellow-400' : ''}
      `}>
        <div className="text-center space-y-4">
          <div className="text-9xl">
            {isFull ? '😋' : happy ? '😊' : shake ? '🤢' : monster.emoji}
          </div>
          <div className="text-4xl font-black text-white" style={{ fontFamily: 'Comic Sans MS, cursive', textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}>
            {monster.name}
          </div>
          {!isFull && (
            <div className="text-xl text-white/90 font-bold">
              Хо-чу: {monster.wantsSyllables.join(', ')}
            </div>
          )}
          <div className="flex gap-2 justify-center">
            {Array.from({ length: monster.maxFood }).map((_, i) => (
              <div key={i} className={`text-4xl ${i < monster.fed ? '' : 'opacity-30'}`}>
                {i < monster.fed ? '🍪' : '⭕'}
              </div>
            ))}
          </div>
          {isFull && (
            <div className="text-2xl font-bold text-yellow-200">
              ⭐ СЫТ! ⭐
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

function GameContent({ onBack, onHome }: FeedMonsterProps) {
  const [monsters, setMonsters] = useState<Monster[]>(MONSTERS);
  const [usedCookies, setUsedCookies] = useState<Set<string>>(new Set());

  const handleFeed = (monsterId: string, syllable: string, correct: boolean) => {
    if (correct) {
      setMonsters(prev =>
        prev.map(m =>
          m.id === monsterId && m.fed < m.maxFood
            ? { ...m, fed: m.fed + 1 }
            : m
        )
      );
      
      // Находим cookie с таким слогом и помечаем как использованную
      const cookie = COOKIES.find(c => c.syllable === syllable && !usedCookies.has(c.id));
      if (cookie) {
        setUsedCookies(prev => new Set([...prev, cookie.id]));
      }
    }
  };

  const handleReset = () => {
    setMonsters(MONSTERS);
    setUsedCookies(new Set());
  };

  const allFed = monsters.every(m => m.fed >= m.maxFood);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
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
              {allFed && (
                <Button 
                  onClick={handleReset} 
                  size="lg"
                  className="text-2xl font-bold py-6 px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  🎉 Иг-рать сно-ва
                </Button>
              )}
            </div>

            {/* Title */}
            <div className="text-center space-y-4">
              <div className="text-7xl">👾</div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                На-кор-ми монс-три-ка
              </h1>
              <p className="text-2xl text-gray-700 font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Да-вай пра-виль-ны-е сло-ги монс-трам!
              </p>
            </div>

            {/* Game Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monsters */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-6 text-purple-700" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Монс-тры
                </h2>
                <div className="space-y-4">
                  {monsters.map((monster) => (
                    <MonsterCard 
                      key={monster.id} 
                      monster={monster}
                      onFeed={handleFeed}
                    />
                  ))}
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-6 text-pink-700" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Пе-че-нь-я со сло-га-ми
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {COOKIES.map((cookie) => (
                    <DraggableCookie 
                      key={cookie.id} 
                      cookie={cookie}
                      isUsed={usedCookies.has(cookie.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Success Message */}
            {allFed && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-6 border-4 border-green-400"
              >
                <p className="text-4xl text-center font-black text-green-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  🎉 ПО-БЕ-ДА! Все монс-тры на-кор-мле-ны! 🎉
                </p>
              </motion.div>
            )}

            {/* Instructions */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 border-3 border-yellow-200">
              <p className="text-2xl text-center font-bold text-orange-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                💡 Пе-ре-тас-ки-вай пе-че-нье к монс-тру, ко-то-рый хо-чет та-кой слог!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function FeedMonster(props: FeedMonsterProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameContent {...props} />
    </DndProvider>
  );
}