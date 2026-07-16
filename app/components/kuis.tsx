import React, { useState, useEffect, useRef } from "react";
import { Trophy } from "lucide-react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import kucing from '@/public/icons/kuis/kucing.webp'
import pisang from '@/public/icons/kuis/pisang.webp'
import round from '@/public/icons/kuis/round.svg'
import triangle from '@/public/icons/kuis/triangle.svg'

interface KuisProps {
  speechRate: number;
  onComplete: () => void;
  incrementWrongAnswers?: () => void;
  incrementHints?: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

export default function KuisGame({
  speechRate,
  onComplete,
  incrementWrongAnswers,
  incrementHints,
  startNewTask,
  trackTaskAction
}: KuisProps) {
  const [quizStep, setQuizStep] = useState<number>(1);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (quizFeedback !== null) return; // prevent spam clicks
    if (trackTaskAction) trackTaskAction();

    if (isCorrect) {
      playSynthSound("victory");
      setQuizScore((prev) => prev + 1);
      setQuizFeedback({ isCorrect: true, message: "HEBAT! Pilihanmu benar! ⭐️" });
      speakInstruction("Benar!", speechRate);
      toast.success("HEBAT! Pilihanmu benar! ⭐️", {
        className: "font-fredoka text-lg font-bold rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 shadow-md",
        duration: 2000
      });

      const timer = setTimeout(() => {
        setQuizFeedback(null);
        if (quizStep < 3) {
          setQuizStep((prev) => prev + 1);
          if (quizStep === 1) speakInstruction("Mana gambar yang berbentuk segitiga hijau?", speechRate);
          if (quizStep === 2) speakInstruction("Berapa jumlah kucing di bawah ini?", speechRate);
        } else {
          setQuizFinished(true);
          onComplete();
          speakInstruction("Selesai! Kamu luar biasa!", speechRate);
        }
      }, 2500);
      timeoutsRef.current.push(timer);
    } else {
      playSynthSound("wrong");
      setQuizFeedback({ isCorrect: false, message: "Ayo coba lagi! Kamu pasti bisa! 💪" });
      speakInstruction("Ulangi lagi.", speechRate);
      toast.error("Ayo coba lagi! Kamu pasti bisa! 💪", {
        className: "font-fredoka text-lg font-bold rounded-2xl border-2 border-red-200 bg-red-50 text-red-700 shadow-md",
        duration: 2000
      });
      if (incrementWrongAnswers) incrementWrongAnswers();

      const timer = setTimeout(() => {
        setQuizFeedback(null);
      }, 2500);
      timeoutsRef.current.push(timer);
    }
  };

  useEffect(() => {
    if (quizStep > 1 && startNewTask) {
      startNewTask();
    }
  }, [quizStep, startNewTask]);

  useEffect(() => {
    speakInstruction("Buah Pisang memiliki warna apa ya?", speechRate);
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, [speechRate]);

  return (
    <div className="w-full max-w-2xl flex flex-col items-center py-6 select-none">
      {!quizFinished ? (
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-between items-center bg-slate-50 dark:bg-slate-900 px-5 py-2 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6 text-lg font-black text-slate-600 dark:text-slate-300">
            <span>Pertanyaan {quizStep} dari 3</span>
            <span className="text-amber-500 flex items-center gap-1">
              ⭐ {quizScore} Bintang
            </span>
          </div>
          <Button
            onClick={() => {
              playSynthSound("bubble");
              if (quizStep === 1) speakInstruction("Buah Pisang memiliki warna apa ya?", speechRate);
              if (quizStep === 2) speakInstruction("Mana gambar yang berbentuk segitiga hijau?", speechRate);
              if (quizStep === 3) speakInstruction("Berapa jumlah kucing di bawah ini?", speechRate);
              if (incrementHints) incrementHints();
            }}
            variant="outline"
            className="btn-tactile mb-6 py-5 px-6 bg-sky-100 hover:bg-sky-200 dark:bg-sky-950/20 dark:hover:bg-sky-900/30 border-2 border-sky-300 dark:border-sky-800 rounded-[20px] text-sky-800 dark:text-sky-300 font-extrabold flex items-center gap-2 cursor-pointer shadow-sm text-sm h-auto"
          >
            🔊 Bantuan Suara (Ulangi Soal)
          </Button>

          {quizStep === 1 && (
            <div className="w-full flex flex-col items-center">
              <p className="text-2xl font-black text-slate-800 dark:text-slate-200 text-center mb-6">
                Buah Pisang memiliki warna apa ya?
              </p>
              <div className="relative mb-6 h-64 w-full max-w-md">
                <Image
                  src={pisang}
                  alt="Gambar pisang"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button
                  onClick={() => handleQuizAnswer(true)}
                  variant="ghost"
                  className="btn-tactile p-6 bg-yellow-500 hover:bg-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-500 border-4 border-yellow-300 dark:border-yellow-900 rounded-3xl text-2xl font-black text-slate-800 dark:text-slate-800 cursor-pointer h-32 w-full"
                >
                </Button>
                <Button
                  onClick={() => handleQuizAnswer(false)}
                  variant="ghost"
                  className="btn-tactile p-6 bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-500 border-4 border-red-300 dark:border-red-900 rounded-3xl text-2xl font-black text-red-800 dark:text-red-300 cursor-pointer h-32 w-full"
                >
                </Button>
              </div>
            </div>
          )}

          {quizStep === 2 && (
            <div className="w-full flex flex-col items-center">
              <p className="text-2xl font-black text-slate-800 dark:text-slate-200 text-center mb-6">
                Mana gambar yang berbentuk SEGITIGA hijau? 
              </p>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button
                  onClick={() => handleQuizAnswer(false)}
                  variant="ghost"
                  className="relative btn-tactile p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-4 border-slate-200 dark:border-slate-700 rounded-3xl flex justify-center items-center h-40 cursor-pointer w-full"
                >
                  <Image
                    src={round}
                    alt="Gambar Lingkaran"
                    fill
                    className="object-contain"
                  />
                </Button>
                <Button
                  onClick={() => handleQuizAnswer(true)}
                  variant="ghost"
                  className="relative btn-tactile p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-4 border-slate-200 dark:border-slate-700 rounded-3xl flex justify-center items-center h-40 cursor-pointer w-full"
                >
                  <Image
                    src={triangle}
                    alt="Gambar Segitiga"
                    fill
                    className="object-contain"
                    />
                </Button>
              </div>
            </div>
          )}

          {quizStep === 3 && (
            <div className="w-full flex flex-col items-center">
              <p className="text-2xl font-black text-slate-800 dark:text-slate-200 text-center mb-6">
                Berapa jumlah Kucing di bawah ini?
              </p>
              <div className="relative mb-6 h-64 w-full max-w-md">
                <Image
                  src={kucing}
                  alt="Gambar kucing"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 w-full">
                <Button
                  onClick={() => handleQuizAnswer(false)}
                  variant="ghost"
                  className="btn-tactile p-6 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/20 dark:hover:bg-sky-900/30 border-4 border-sky-200 dark:border-sky-850 rounded-3xl text-4xl font-black text-sky-700 dark:text-sky-300 cursor-pointer w-full h-auto"
                >
                  1
                </Button>
                <Button
                  onClick={() => handleQuizAnswer(false)}
                  variant="ghost"
                  className="btn-tactile p-6 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/20 dark:hover:bg-sky-900/30 border-4 border-sky-200 dark:border-sky-850 rounded-3xl text-4xl font-black text-sky-700 dark:text-sky-300 cursor-pointer w-full h-auto"
                >
                  2
                </Button>
                <Button
                  onClick={() => handleQuizAnswer(true)}
                  variant="ghost"
                  className="btn-tactile p-6 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/20 dark:hover:bg-sky-900/30 border-4 border-sky-200 dark:border-sky-850 rounded-3xl text-4xl font-black text-sky-700 dark:text-sky-300 cursor-pointer w-full h-auto"
                >
                  3
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center text-center">
          <div className="p-4 bg-amber-100 dark:bg-amber-950/30 rounded-full border-4 border-amber-300 dark:border-amber-900 mb-6">
            <Trophy className="w-20 h-20 text-amber-500 fill-amber-300" />
          </div>
          <span className="text-4xl font-black text-sky-950 dark:text-sky-100 mb-2">KUIS SELESAI! 🎉</span>
          <p className="text-2xl font-bold text-slate-600 dark:text-slate-350 mb-6">
            Kamu mendapatkan {quizScore} dari 3 bintang emas!
          </p>

          <Button
            onClick={() => {
              playSynthSound("bubble");
              setQuizStep(1);
              setQuizScore(0);
              setQuizFinished(false);
              setQuizFeedback(null);
              speakInstruction("Ayo kita mulai kuis kembali!", speechRate);
            }}
            className="btn-tactile w-full py-5 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xl font-extrabold cursor-pointer h-auto"
          >
            MAIN LAGI 🔄
          </Button>
        </div>
      )}
    </div>
  );
}
