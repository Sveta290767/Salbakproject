import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { MainMenu } from "./components/MainMenu";
import { Alphabet } from "./components/Alphabet";
import { ReadingTexts } from "./components/ReadingTexts";
import { WordBuilder } from "./components/WordBuilder";
import { CompletionScreen } from "./components/CompletionScreen";
import { AchievementsScreen } from "./components/AchievementsScreen";
import { PracticeMode } from "./components/PracticeMode";
import { SingleWordPractice } from "./components/SingleWordPractice";
import { AchievementPopup } from "./components/AchievementPopup";
import { ParentsTips } from "./components/ParentsTips";
import { VowelCombinations } from "./components/VowelCombinations";
import { ConsonantCombinations } from "./components/ConsonantCombinations";
import { useProgress } from "./hooks/useProgress";

type AppState = "welcome" | "menu" | "alphabet" | "reading-texts" | "learning" | "completed" | "achievements" | "practice" | "single-practice" | "parents-tips" | "vowels" | "consonants";

interface Word {
  syllables: string[];
  full: string;
  imageQuery: string;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>("welcome");
  const [practiceWord, setPracticeWord] = useState<Word | null>(null);
  const { progress, addWordCompletion, incrementSession, newAchievements, resetProgress } = useProgress();

  const handleStart = () => {
    incrementSession();
    setAppState("learning");
  };

  const handleComplete = () => {
    setAppState("completed");
  };

  const handleRestart = () => {
    incrementSession();
    setAppState("learning");
  };

  const handleBackToWelcome = () => {
    setAppState("welcome");
  };

  const handleGoToMenu = () => {
    setAppState("menu");
  };

  const handleViewAchievements = () => {
    setAppState("achievements");
  };

  const handleViewPractice = () => {
    setAppState("practice");
  };

  const handleWordComplete = (word: string) => {
    addWordCompletion(word);
  };

  const handlePracticeWord = (word: Word) => {
    setPracticeWord(word);
    setAppState("single-practice");
  };

  const handleBackToPractice = () => {
    setPracticeWord(null);
    setAppState("practice");
  };

  const handleViewParentsTips = () => {
    setAppState("parents-tips");
  };

  const handleViewVowels = () => {
    setAppState("vowels");
  };

  const handleViewConsonants = () => {
    setAppState("consonants");
  };

  return (
    <div className="min-h-screen bg-background">
      {appState === "welcome" && (
        <WelcomeScreen 
          onMenu={handleGoToMenu}
          onParentsTips={handleViewParentsTips}
        />
      )}
      {appState === "menu" && (
        <MainMenu
          onAlphabet={() => setAppState("alphabet")}
          onReadBySyllables={handleStart}
          onReadingTexts={() => setAppState("reading-texts")}
          onViewAchievements={handleViewAchievements}
          onViewPractice={handleViewPractice}
          onParentsTips={handleViewParentsTips}
          onVowels={handleViewVowels}
          onConsonants={handleViewConsonants}
          onBack={handleBackToWelcome}
          progress={progress}
        />
      )}
      {appState === "alphabet" && (
        <Alphabet
          onBack={handleGoToMenu}
        />
      )}
      {appState === "reading-texts" && (
        <ReadingTexts
          onBack={handleGoToMenu}
        />
      )}
      {appState === "learning" && (
        <WordBuilder 
          onComplete={handleComplete} 
          onHome={handleBackToWelcome}
          onBack={handleGoToMenu}
          onWordComplete={handleWordComplete}
        />
      )}
      {appState === "completed" && (
        <CompletionScreen 
          onRestart={handleRestart} 
          onHome={handleBackToWelcome}
          progress={progress}
        />
      )}
      {appState === "achievements" && (
        <AchievementsScreen
          progress={progress}
          onBack={handleBackToWelcome}
          onResetProgress={resetProgress}
        />
      )}
      {appState === "practice" && (
        <PracticeMode
          progress={progress}
          onBack={handleBackToWelcome}
          onPracticeWord={handlePracticeWord}
        />
      )}
      {appState === "single-practice" && practiceWord && (
        <SingleWordPractice
          word={practiceWord}
          onBack={handleBackToPractice}
          onComplete={handleWordComplete}
        />
      )}
      {appState === "parents-tips" && (
        <ParentsTips
          onBack={handleBackToWelcome}
        />
      )}
      {appState === "vowels" && (
        <VowelCombinations
          onBack={handleGoToMenu}
          onHome={handleBackToWelcome}
        />
      )}
      {appState === "consonants" && (
        <ConsonantCombinations
          onBack={handleGoToMenu}
          onHome={handleBackToWelcome}
        />
      )}
      
      {/* Всплывающие уведомления о достижениях */}
      <AchievementPopup achievements={newAchievements} />
    </div>
  );
}