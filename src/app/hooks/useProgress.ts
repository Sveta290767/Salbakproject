import { useState, useEffect } from "react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface Progress {
  wordsCompleted: string[];
  totalSessions: number;
  achievements: Achievement[];
  lastSession?: number;
}

const STORAGE_KEY = "syllable-reading-progress";

const AVAILABLE_ACHIEVEMENTS: Omit<Achievement, "unlocked" | "unlockedAt">[] = [
  {
    id: "first-word",
    title: "Первое слово! 🎉",
    description: "Прочитал первое слово по слогам",
    icon: "🌟",
  },
  {
    id: "five-words",
    title: "Умница! ⭐",
    description: "Прочитал 5 разных слов",
    icon: "⭐",
  },
  {
    id: "ten-words",
    title: "Знаток! 🏆",
    description: "Прочитал 10 разных слов",
    icon: "🏆",
  },
  {
    id: "twenty-words",
    title: "Мастер чтения! 👑",
    description: "Прочитал 20 разных слов",
    icon: "👑",
  },
  {
    id: "fifty-words",
    title: "Супер читатель! 🎓",
    description: "Прочитал 50 разных слов",
    icon: "🎓",
  },
  {
    id: "first-session",
    title: "Начало пути! 🚀",
    description: "Начал первое занятие",
    icon: "🚀",
  },
  {
    id: "five-sessions",
    title: "Постоянство! 💪",
    description: "Провел 5 занятий",
    icon: "💪",
  },
  {
    id: "ten-sessions",
    title: "Целеустремленный! 🔥",
    description: "Провел 10 занятий",
    icon: "🔥",
  },
];

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      wordsCompleted: [],
      totalSessions: 0,
      achievements: AVAILABLE_ACHIEVEMENTS.map(a => ({ ...a, unlocked: false })),
      lastSession: undefined,
    };
  });

  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const checkAchievements = (updatedProgress: Progress): Achievement[] => {
    const newlyUnlocked: Achievement[] = [];
    const wordsCount = updatedProgress.wordsCompleted.length;
    const sessionsCount = updatedProgress.totalSessions;

    const achievementChecks = [
      { id: "first-word", condition: wordsCount >= 1 },
      { id: "five-words", condition: wordsCount >= 5 },
      { id: "ten-words", condition: wordsCount >= 10 },
      { id: "twenty-words", condition: wordsCount >= 20 },
      { id: "fifty-words", condition: wordsCount >= 50 },
      { id: "first-session", condition: sessionsCount >= 1 },
      { id: "five-sessions", condition: sessionsCount >= 5 },
      { id: "ten-sessions", condition: sessionsCount >= 10 },
    ];

    achievementChecks.forEach(({ id, condition }) => {
      const achievement = updatedProgress.achievements.find(a => a.id === id);
      if (achievement && !achievement.unlocked && condition) {
        achievement.unlocked = true;
        achievement.unlockedAt = Date.now();
        newlyUnlocked.push(achievement);
      }
    });

    return newlyUnlocked;
  };

  const addWordCompletion = (word: string) => {
    setProgress(prev => {
      if (prev.wordsCompleted.includes(word)) {
        return prev;
      }

      const updated = {
        ...prev,
        wordsCompleted: [...prev.wordsCompleted, word],
      };

      const newAchs = checkAchievements(updated);
      if (newAchs.length > 0) {
        setNewAchievements(newAchs);
      }

      return updated;
    });
  };

  const incrementSession = () => {
    setProgress(prev => {
      const updated = {
        ...prev,
        totalSessions: prev.totalSessions + 1,
        lastSession: Date.now(),
      };

      const newAchs = checkAchievements(updated);
      if (newAchs.length > 0) {
        setNewAchievements(newAchs);
      }

      return updated;
    });
  };

  const resetProgress = () => {
    const fresh: Progress = {
      wordsCompleted: [],
      totalSessions: 0,
      achievements: AVAILABLE_ACHIEVEMENTS.map(a => ({ ...a, unlocked: false })),
      lastSession: undefined,
    };
    setProgress(fresh);
    setNewAchievements([]);
  };

  return {
    progress,
    addWordCompletion,
    incrementSession,
    newAchievements,
    resetProgress,
  };
}
