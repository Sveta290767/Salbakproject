import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Home, RotateCcw, Lock } from "lucide-react";
import { Progress } from "../hooks/useProgress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface AchievementsScreenProps {
  progress: Progress;
  onBack: () => void;
  onResetProgress: () => void;
}

export function AchievementsScreen({ progress, onBack, onResetProgress }: AchievementsScreenProps) {
  const unlockedCount = progress.achievements.filter(a => a.unlocked).length;
  const totalCount = progress.achievements.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="max-w-4xl mx-auto py-8">
        <Card className="p-6 md:p-8 shadow-xl bg-white/90 backdrop-blur">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="text-5xl">🏆</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Мои достижения
              </h1>
              <p className="text-gray-600">
                Открыто {unlockedCount} из {totalCount} достижений ({percentage}%)
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Achievements grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progress.achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`p-5 transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 shadow-md'
                      : 'bg-gray-50 border-2 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">
                      {achievement.unlocked ? achievement.icon : (
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <Lock className="h-6 w-6 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <p className="text-xs text-gray-500 mt-2">
                          Получено: {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU')}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Statistics */}
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-3">📊 Статистика</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-blue-800">
                    {progress.wordsCompleted.length}
                  </div>
                  <div className="text-sm text-blue-700">
                    слов прочитано
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-800">
                    {progress.totalSessions}
                  </div>
                  <div className="text-sm text-purple-700">
                    занятий проведено
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button 
                onClick={onBack} 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Home className="mr-2 h-5 w-5" />
                Вернуться на главную
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Сбросить прогресс
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Это действие нельзя отменить. Весь прогресс, все достижения и статистика будут удалены.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={onResetProgress}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Да, сбросить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
