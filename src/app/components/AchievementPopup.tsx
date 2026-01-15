import { useEffect, useState } from "react";
import { Achievement } from "../hooks/useProgress";
import { Card } from "./ui/card";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface AchievementPopupProps {
  achievements: Achievement[];
}

export function AchievementPopup({ achievements }: AchievementPopupProps) {
  const [visibleAchievements, setVisibleAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (achievements.length > 0) {
      // Show achievements one by one with a delay
      achievements.forEach((achievement, index) => {
        setTimeout(() => {
          setVisibleAchievements(prev => [...prev, achievement]);
          
          // Auto-hide after 5 seconds
          setTimeout(() => {
            setVisibleAchievements(prev => 
              prev.filter(a => a.id !== achievement.id)
            );
          }, 5000);
        }, index * 500);
      });
    }
  }, [achievements]);

  const handleClose = (achievementId: string) => {
    setVisibleAchievements(prev => 
      prev.filter(a => a.id !== achievementId)
    );
  };

  if (visibleAchievements.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {visibleAchievements.map((achievement, index) => (
        <Card
          key={achievement.id}
          className="p-4 shadow-2xl bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400 animate-in slide-in-from-right duration-500"
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="text-4xl flex-shrink-0 animate-bounce">
              {achievement.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight">
                    🎉 Новое достижение!
                  </h3>
                  <p className="font-semibold text-gray-800 mt-1">
                    {achievement.title}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {achievement.description}
                  </p>
                </div>
                
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 flex-shrink-0"
                  onClick={() => handleClose(achievement.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Progress bar animation */}
          <div className="mt-3 w-full bg-yellow-200 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-yellow-500 h-full rounded-full animate-progress"
              style={{
                animation: 'progress 5s linear forwards'
              }}
            />
          </div>
        </Card>
      ))}

      <style>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        .animate-progress {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
