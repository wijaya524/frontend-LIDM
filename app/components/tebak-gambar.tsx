/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from "react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface TebakGambarProps {
  speechRate: number;
  onComplete: () => void;
  onBackToMenu: () => void;
  incrementWrongAnswers?: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

export default function TebakGambarGame({
  speechRate,
  onComplete,
  onBackToMenu,
  incrementWrongAnswers,
  startNewTask,
  trackTaskAction
}: TebakGambarProps) {
  const [imageQuestionIndex, setImageQuestionIndex] = useState<number>(0);
  const [selectedImageAnswer, setSelectedImageAnswer] = useState<string | null>(null);
  const [imageFeedback, setImageFeedback] = useState<string | null>(null);
  const [imageSuccess, setImageSuccess] = useState<boolean | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const imageQuestions: {
    targetWord: string;
    correctAnswer: string;
    options: string[];
    illustrations: Record<string, string>;
    ttsPrompt: string;
  }[] = [
    { targetWord: "MOBIL", correctAnswer: "MOBIL", options: ["BOLA", "MOBIL"], illustrations: { BOLA: '/icons/tebak-gambar/bola.png', MOBIL: '/icons/tebak-gambar/mobil.png' }, ttsPrompt: "Pilih gambar yang sesuai dengan tulisan M O B I L" },
    { targetWord: "APEL", correctAnswer: "APEL", options: ["APEL", "JERUK"], illustrations: { APEL: '/icons/tebak-gambar/apel.png', JERUK: '/icons/tebak-gambar/jeruk.png' }, ttsPrompt: "Tunjuk gambar buah APEL!" },
    { targetWord: "BUKU", correctAnswer: "BUKU", options: ["PISANG", "BUKU"], illustrations: { PISANG: '/icons/tebak-gambar/pisang.png', BUKU: '/icons/tebak-gambar/buku.png'  }, ttsPrompt: "Mana gambar yang merupakan BUKU bacaan?" }
  ];

  const clearTimers = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    setSelectedImageAnswer(null);
    setImageFeedback(null);
    setImageSuccess(null);

    // Start tracking task initiation for subsequent questions
    if (imageQuestionIndex > 0 && startNewTask) {
      startNewTask();
    }

    const question = imageQuestions[imageQuestionIndex];
    const timer = setTimeout(() => {
      speakInstruction(question.ttsPrompt, speechRate);
    }, 500);
    return () => {
      clearTimeout(timer);
      clearTimers();
    };
  }, [imageQuestionIndex, speechRate]);

  const handleImageAnswer = (option: string) => {
    if (selectedImageAnswer !== null) return;
    if (trackTaskAction) trackTaskAction();

    const question = imageQuestions[imageQuestionIndex];
    setSelectedImageAnswer(option);

    if (option === question.correctAnswer) {
      playSynthSound("victory");
      setImageSuccess(true);
      setImageFeedback("LUAR BIASA! Pilihanmu benar! ⭐️");
      speakInstruction("Betul!", speechRate);
    } else {
      playSynthSound("wrong");
      setImageSuccess(false);
      setImageFeedback("Bukan gambar itu. Ayo coba lagi! 💪");
      speakInstruction("Coba lagi!", speechRate);
      if (incrementWrongAnswers) incrementWrongAnswers();
    }

    const timer = setTimeout(() => {
      if (option === question.correctAnswer) {
        if (imageQuestionIndex < imageQuestions.length - 1) {
          setImageQuestionIndex((prev) => prev + 1);
        } else {
          onComplete();
          playSynthSound("victory");
          speakInstruction("Hebat! Tebak gambar selesai!", speechRate);
          onBackToMenu();
        }
      } else {
        setSelectedImageAnswer(null);
        setImageFeedback(null);
        setImageSuccess(null);
      }
    }, 2400);
    timeoutsRef.current.push(timer);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center py-6 select-none">
      <h3 className="text-3xl font-black text-sky-950 mb-2 text-center">Permainan Tebak Gambar! </h3>
      <p className="text-lg font-bold text-slate-500 mb-6 text-center">Tunjuk gambar yang cocok dengan tulisan</p>

      <div className="flex flex-col items-center bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 w-full mb-6">
        <div className="text-5xl font-black text-sky-900 tracking-wider bg-white px-6 py-3 rounded-2xl border-2 border-slate-100 mb-6 shadow-inner">
          {imageQuestions[imageQuestionIndex].targetWord}
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          {imageQuestions[imageQuestionIndex].options.map((opt) => (
            <Button
              key={opt}
              onClick={() => handleImageAnswer(opt)}
              disabled={selectedImageAnswer !== null}
              variant="ghost"
              className={`btn-tactile p-4 border-4 rounded-3xl flex flex-col items-center gap-3 min-h-80 w-full h-auto cursor-pointer transition-all duration-300 hover:bg-slate-100/50 ${
                selectedImageAnswer === opt
                  ? opt === imageQuestions[imageQuestionIndex].correctAnswer
                    ? "bg-emerald-50 border-emerald-400"
                    : "bg-red-50 border-red-400"
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-white">
                <Image
                  src={
                    imageQuestions[imageQuestionIndex].illustrations[opt] || ""
                  }
                  alt={opt}
                  fill
                  className="object-cover"
                />
              </div>

              <span className="text-xl font-black text-slate-700 text-center block">
                {opt}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {imageFeedback && (
        <div className={`p-4 rounded-2xl text-center w-full text-xl font-black border-2 ${imageSuccess ? "bg-emerald-50 border-emerald-300 text-emerald-700 animate-bounce" : "bg-red-50 border-red-300 text-red-700"
          }`}>
          {imageFeedback}
        </div>
      )}
    </div>
  );
}
