import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { X } from "lucide-react";
import React from "react";

interface LetterDetailModalProps {
  letter: string;
  name: string;
  sound: string;
  word: string;
  color: string;
  imageQuery: string;
  onClose: () => void;
}

// Web Speech API utility
const speak = (text: string, lang: string = 'ru-RU') => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8; // Slower for children
    utterance.pitch = 1.2; // Higher pitch for children
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Speech synthesis not supported");
  }
};

export function LetterDetailModal({ 
  letter, 
  name, 
  sound, 
  word, 
  color, 
  imageQuery,
  onClose 
}: LetterDetailModalProps) {
  // Auto-play when modal opens
  const handleOpen = () => {
    speak(`Буква ${letter}`);
  };

  // Call handleOpen when component mounts
  React.useEffect(() => {
    handleOpen();
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" 
      onClick={onClose}
    >
      <Card 
        className="max-w-3xl w-full p-12 bg-white shadow-2xl animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-8">
          {/* Close button */}
          <div className="flex justify-end">
            <Button 
              onClick={onClose}
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Large letters - uppercase and lowercase */}
          <div className="text-center">
            <div 
              className={`text-[180px] md:text-[240px] font-black bg-gradient-to-br ${color} bg-clip-text text-transparent drop-shadow-2xl leading-none`}
              onClick={handleOpen}
              style={{ cursor: 'pointer' }}
            >
              {letter}{letter.toLowerCase()}
            </div>
          </div>

          {/* Back button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={onClose}
              className="text-2xl px-8 py-6 font-bold"
            >
              Назад к алфавиту
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}