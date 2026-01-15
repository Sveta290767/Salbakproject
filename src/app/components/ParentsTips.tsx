import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, BookOpen, Volume2, Trophy, Heart, Star, Sparkles, CheckCircle } from "lucide-react";

interface ParentsTipsProps {
  onBack: () => void;
}

export function ParentsTips({ onBack }: ParentsTipsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto py-8">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="mb-6 text-2xl font-bold py-6 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Назад
        </Button>

        <Card className="p-6 md:p-10 shadow-xl bg-white/95 backdrop-blur">
          <div className="space-y-8">
            {/* Заголовок */}
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">📚👨‍👩‍👧‍👦</div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Советы для родителей
              </h1>
              <p className="text-lg text-gray-600">
                Как помочь ребёнку научиться читать по слогам
              </p>
            </div>

            {/* Основные принципы */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <Heart className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">1. Терпение и любовь</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Каждый ребёнок учится в своём темпе. Не сравнивайте с другими детьми. 
                    Хвалите за любые успехи, даже самые маленькие! Избегайте критики и давления.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                <BookOpen className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">2. Как работать с приложением</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Алфавит:</strong> Начните с изучения букв. Нажимайте на буквы, слушайте произношение вместе с ребёнком. <em>Нажмите на любую букву, чтобы узнать, как она называется и как звучит в словах!</em></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Гласные и Согласные:</strong> Изучайте сочетания букв. Ребёнок может нажимать на каждую карточку и слушать, как звучат разные комбинации.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Читаем по слогам:</strong> Самый важный раздел! Нажимайте на слоги по порядку, слушайте озвучку, затем слово целиком.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Конструктор слов:</strong> Пусть ребёнок собирает слова из слогов самостоятельно - это отличная практика!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Тексты для чтения:</strong> Начинайте с лёгких текстов. Используйте кнопку "Прочитать текст" для примера.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <Volume2 className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">3. Голосовое сопровождение (Web Speech API)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Приложение озвучивает буквы, слоги и слова. Это особенно важно для:
                  </p>
                  <ul className="space-y-1 text-gray-700 ml-6 list-disc">
                    <li>Детей глухонемых родителей (полная автономность обучения)</li>
                    <li>Самостоятельных занятий без взрослых</li>
                    <li>Правильного произношения звуков и слогов</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    <strong>Совет:</strong> Убедитесь, что громкость устройства включена. Пусть ребёнок повторяет вслух за голосом.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                <Star className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">4. Регулярность занятий</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Лучше заниматься 10-15 минут каждый день, чем один раз в неделю по часу. 
                    Создайте ритуал: например, читайте после завтрака или перед сном.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-lg">
                <Trophy className="w-8 h-8 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">5. Система мотивации</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    В приложении есть раздел "Достижения" 🏆. Отмечайте прогресс ребёнка:
                  </p>
                  <ul className="space-y-1 text-gray-700 ml-6 list-disc">
                    <li>Выучил весь алфавит? - Это достижение!</li>
                    <li>Прочитал первое слово самостоятельно? - Праздник!</li>
                    <li>Осилил средний текст? - Супер результат!</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    Создайте награды в реальной жизни: наклейки, маленькие призы за успехи.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                <Sparkles className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">6. Делайте обучение игрой</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Ищите буквы и слова в окружающем мире (на вывесках, упаковках)</li>
                    <li>• Придумывайте истории про слова из приложения</li>
                    <li>• Устраивайте соревнования: кто быстрее найдёт букву "А"?</li>
                    <li>• Рисуйте слова и буквы, лепите из пластилина</li>
                  </ul>
                </div>
              </div>

              {/* Возрастные рекомендации */}
              <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border-2 border-blue-300">
                <h3 className="text-xl font-bold text-gray-800 mb-3">📅 Возрастные рекомендации</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>4-5 лет:</strong> Знакомство с алфавитом, простые слоги (ма, па, ба)</p>
                  <p><strong>5-6 лет:</strong> Чтение простых слов (мама, папа, кот), лёгкие тексты</p>
                  <p><strong>6-7 лет:</strong> Средние и сложные тексты, самостоятельное чтение</p>
                  <p className="text-sm italic mt-3">* Помните: это примерные ориентиры. Ваш ребёнок уникален!</p>
                </div>
              </div>

              {/* Важное напоминание */}
              <div className="p-6 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-3">⚠️ Важно помнить</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>❌ Не заставляйте ребёнка заниматься силой</li>
                  <li>❌ Не ругайте за ошибки - это часть обучения</li>
                  <li>❌ Не сравнивайте с другими детьми</li>
                  <li>✅ Хвалите за старание, даже если результат не идеален</li>
                  <li>✅ Делайте перерывы, если ребёнок устал</li>
                  <li>✅ Радуйтесь каждому маленькому прогрессу вместе!</li>
                </ul>
              </div>

              {/* Автономность приложения */}
              <div className="p-6 bg-indigo-50 rounded-lg border-2 border-indigo-300">
                <h3 className="text-xl font-bold text-indigo-900 mb-3">🎯 Автономность обучения</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Это приложение создано так, чтобы ребёнок мог учиться <strong>полностью самостоятельно</strong>:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Все буквы, слоги и слова озвучиваются</li>
                  <li>• Яркие картинки помогают понять значение слов</li>
                  <li>• Интуитивный интерфейс не требует помощи взрослых</li>
                  <li>• Особенно важно для детей глухонемых родителей</li>
                </ul>
                <p className="text-gray-700 mt-3 font-semibold">
                  Но ваша поддержка и похвала всё равно очень важны! 💙
                </p>
              </div>
            </div>

            {/* Финальное напутствие */}
            <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
              <p className="text-2xl font-bold text-gray-800 mb-2">
                Успехов вам и вашему малышу! 🌟
              </p>
              <p className="text-lg text-gray-700">
                Чтение откроет ребёнку целый мир знаний и фантазии!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}