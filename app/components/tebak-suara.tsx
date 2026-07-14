/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2 } from "lucide-react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TebakSuaraProps {
  speechRate: number;
  onComplete: () => void;
  onBackToMenu: () => void;
  incrementWrongAnswers?: () => void;
  incrementHints?: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

export default function TebakSuaraGame({
  speechRate,
  onComplete,
  onBackToMenu,
  incrementWrongAnswers,
  incrementHints,
  startNewTask,
  trackTaskAction
}: TebakSuaraProps) {
  const [soundQuestionIndex, setSoundQuestionIndex] = useState<number>(0);
  const [selectedSoundAnswer, setSelectedSoundAnswer] = useState<string | null>(null);
  const [soundFeedback, setSoundFeedback] = useState<string | null>(null);
  const [soundSuccess, setSoundSuccess] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // 1. Tambahkan properti audioPath yang merujuk ke folder public
  const soundQuestions = [
    { 
      id: "kucing", 
      correctAnswer: "KUCING", 
      options: ["ANJING", "KUCING"], 
      ttsPrompt: "Dengarkan suara berikut, lalu tebak hewan apa ini!",
      audioPath: "/audio/kucing.wav" 
    },
    { 
      id: "anjing", 
      correctAnswer: "ANJING", 
      options: ["ANJING", "GAJAH"], 
      ttsPrompt: "Ayo tebak suara hewan apakah ini!",
      audioPath: "/audio/anjing.wav" 
    },
    { 
      id: "burung", 
      correctAnswer: "BURUNG", 
      options: ["KUCING", "BURUNG"], 
      ttsPrompt: "Hewan apa yang bunyinya seperti ini?",
      audioPath: "/audio/burung.wav" 
    }
  ];

  const clearTimers = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    setSelectedSoundAnswer(null);
    setSoundFeedback(null);
    setSoundSuccess(null);
    
    // Track initiation for subsequent questions
    if (soundQuestionIndex > 0 && startNewTask) {
      startNewTask();
    }
    
    const question = soundQuestions[soundQuestionIndex];
    
    const timer = setTimeout(() => {
      speakInstruction(question.ttsPrompt, speechRate);
      
      const playTimer = setTimeout(() => {
        playQuestionSound(question.audioPath);
      }, 3200);
      
      timeoutsRef.current.push(playTimer);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimers();
    };
  }, [soundQuestionIndex, speechRate]);

  // 2. Fungsi baru menggunakan pemutar objek Audio asli bawaan peramban
  const playQuestionSound = (path: string) => {
    if (isPlaying) return;
    
    try {
      setIsPlaying(true);
      const audio = new Audio(path);
      audio.volume = 0.8; // Atur volume yang nyaman
      audio.play();
      
      audio.onended = () => {
        setIsPlaying(false);
      };
    } catch (error) {
      console.warn("Gagal memutar audio asli:", error);
      setIsPlaying(false);
    }
  };

  const handleSoundAnswer = (option: string) => {
    if (selectedSoundAnswer !== null) return;
    if (trackTaskAction) trackTaskAction();
    
    const question = soundQuestions[soundQuestionIndex];
    setSelectedSoundAnswer(option);

    if (option === question.correctAnswer) {
      playSynthSound("victory");
      setSoundSuccess(true);
      setSoundFeedback("HEBAT! Jawabanmu benar! ⭐️");
      speakInstruction("Benar! Hebat!", speechRate);
      toast.success("HEBAT! Jawabanmu benar! ⭐️", {
        className: "font-fredoka text-lg font-bold rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 shadow-md",
        duration: 2000
      });
    } else {
      playSynthSound("wrong");
      setSoundSuccess(false);
      speakInstruction("Salah. Ayo coba lagi!", speechRate);
      toast.error("Bukan suara itu. Coba lagi! 💪", {
        className: "font-fredoka text-lg font-bold rounded-2xl border-2 border-red-200 bg-red-50 text-red-700 shadow-md",
        duration: 2000
      });
      if (incrementWrongAnswers) incrementWrongAnswers();
    }

    const timer = setTimeout(() => {
      if (option === question.correctAnswer) {
        if (soundQuestionIndex < soundQuestions.length - 1) {
          setSoundQuestionIndex((prev) => prev + 1);
        } else {
          onComplete();
          playSynthSound("victory");
    
          onBackToMenu();
        }
      } else {
        setSelectedSoundAnswer(null);
        setSoundFeedback(null);
        setSoundSuccess(null);
      }
    }, 2400);
    
    timeoutsRef.current.push(timer);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center py-6 select-none">
      <h3 className="text-3xl font-black text-sky-950 mb-2 text-center">Permainan Tebak Suara! </h3>
      <p className="text-lg font-bold text-slate-500 mb-6 text-center">Bunyi suara hewan apakah ini?</p>

      <div className="flex flex-col items-center   rounded-3xl p-6 w-full mb-6">
        <Button
          onClick={() => {
            playSynthSound("bubble");
            playQuestionSound(soundQuestions[soundQuestionIndex].audioPath);
            if (incrementHints) incrementHints();
          }}
          disabled={isPlaying}
          variant="ghost"
          className={`btn-tactile p-6 rounded-full cursor-pointer shadow-lg mb-6 transition-all flex items-center justify-center w-28 h-28 h-auto shrink-0 ${
            isPlaying 
              ? "bg-amber-400 text-amber-950 scale-95" 
              : "bg-indigo-500 hover:bg-indigo-600 text-white pulse-action"
          }`}
          aria-label="Bunyikan Suara Soal"
        >
          <Volume2 className={`w-16 h-16 ${isPlaying ? "animate-pulse" : ""}`} />
        </Button>

        <div className="grid grid-cols-2 gap-4 w-full">
          {soundQuestions[soundQuestionIndex].options.map((opt) => (
            <Button
              key={opt}
              onClick={() => handleSoundAnswer(opt)}
              disabled={selectedSoundAnswer !== null}
              variant="ghost"
              className={`btn-tactile p-4 border-4 rounded-3xl flex flex-col items-center gap-3 min-h-64 w-full h-auto cursor-pointer transition-all duration-300 hover:bg-slate-100/50 ${
                selectedSoundAnswer === opt
                  ? opt === soundQuestions[soundQuestionIndex].correctAnswer
                    ? "bg-emerald-50 border-emerald-400 text-emerald-700 scale-105"
                    : "bg-red-50 border-red-400 text-red-700"
                  : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
              }`}
            >
              <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-white flex items-center justify-center p-2 border-2 border-slate-100 shadow-sm">
                <Image
                  src={`/icons/tebak-suara/${opt.toLowerCase()}.webp`}
                  alt={opt}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black text-slate-700">{opt}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}