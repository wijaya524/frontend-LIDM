/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from "react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import {
  ApelIllustration,
  PisangIllustration,
  JerukIllustration,
  BukuIllustration,
  MobilIllustration,
  BolaIllustration
} from "../illustrations";

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

  const imageQuestions = [
    { targetWord: "MOBIL", correctAnswer: "MOBIL", options: ["BOLA", "MOBIL"], illustrations: { BOLA: <BolaIllustration className="w-32 h-32" />, MOBIL: <MobilIllustration className="w-32 h-32" /> }, ttsPrompt: "Pilih gambar yang sesuai dengan tulisan M O B I L" },
    { targetWord: "APEL", correctAnswer: "APEL", options: ["APEL", "JERUK"], illustrations: { APEL: <ApelIllustration className="w-32 h-32" />, JERUK: <JerukIllustration className="w-32 h-32" /> }, ttsPrompt: "Tunjuk gambar buah APEL!" },
    { targetWord: "BUKU", correctAnswer: "BUKU", options: ["PISANG", "BUKU"], illustrations: { PISANG: <PisangIllustration className="w-32 h-32" />, BUKU: <BukuIllustration className="w-32 h-32" /> }, ttsPrompt: "Mana gambar yang merupakan BUKU bacaan?" }
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
  }, [imageQuestionIndex, imageQuestions, speechRate]);

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
    <div className="w-full max-w-2xl bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-6 md:p-8 flex flex-col items-center">
      <h3 className="text-3xl font-black text-sky-950 mb-2 text-center">Permainan Tebak Gambar! 🖼️</h3>
      <p className="text-lg font-bold text-slate-500 mb-6 text-center">Tunjuk gambar yang cocok dengan tulisan</p>

      <div className="flex flex-col items-center bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 w-full mb-6">
        <div className="text-5xl font-black text-sky-900 tracking-wider bg-white px-6 py-3 rounded-2xl border-2 border-slate-100 mb-6 shadow-inner">
          {imageQuestions[imageQuestionIndex].targetWord}
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          {imageQuestions[imageQuestionIndex].options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleImageAnswer(opt)}
              disabled={selectedImageAnswer !== null}
              className={`btn-tactile p-4 border-4 rounded-3xl flex flex-col justify-center items-center h-48 cursor-pointer transition-all ${
                selectedImageAnswer === opt
                  ? opt === imageQuestions[imageQuestionIndex].correctAnswer
                    ? "bg-emerald-50 border-emerald-400 scale-105"
                    : "bg-red-50 border-red-400"
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }`}
              aria-label={`Pilih gambar ${opt}`}
            >
              <div className="mb-2">
                {imageQuestions[imageQuestionIndex].illustrations[opt as "BOLA" | "MOBIL" | "APEL" | "JERUK" | "PISANG" | "BUKU"]}
              </div>
              <span className="text-lg font-extrabold text-slate-700">{opt}</span>
            </button>
          ))}
        </div>
      </div>

      {imageFeedback && (
        <div className={`p-4 rounded-2xl text-center w-full text-xl font-black border-2 ${
          imageSuccess ? "bg-emerald-50 border-emerald-300 text-emerald-700 animate-bounce" : "bg-red-50 border-red-300 text-red-700"
        }`}>
          {imageFeedback}
        </div>
      )}
    </div>
  );
}
