import React, { useState, useEffect, useRef } from "react";
import { Trophy } from "lucide-react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { CircleIllustration, TriangleIllustration } from "../illustrations";

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
    } else {
      playSynthSound("wrong");
      setQuizFeedback({ isCorrect: false, message: "Ayo coba lagi! Kamu pasti bisa! 💪" });
      speakInstruction("Ulangi lagi.", speechRate);
      if (incrementWrongAnswers) incrementWrongAnswers();
    }

    const timer = setTimeout(() => {
      setQuizFeedback(null);
      if (quizStep < 3) {
        setQuizStep((prev) => prev + 1);
        if (quizStep === 1) speakInstruction("Mana gambar yang berbentuk segitiga hijau?", speechRate);
        if (quizStep === 2) speakInstruction("Berapa jumlah jeruk di bawah ini?", speechRate);
      } else {
        setQuizFinished(true);
        onComplete();
        speakInstruction("Selesai! Kamu luar biasa!", speechRate);
      }
    }, 2500);
    timeoutsRef.current.push(timer);
  };

  useEffect(() => {
    if (quizStep > 1 && startNewTask) {
      startNewTask();
    }
  }, [quizStep, startNewTask]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-6 md:p-8 flex flex-col items-center">
      <h3 className="text-3xl font-black text-sky-950 mb-6 text-center">Kuis Bintang Pintar! 🏆</h3>
      
      {!quizFinished ? (
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-between items-center bg-slate-50 px-5 py-2 rounded-2xl border border-slate-100 mb-6 text-lg font-black text-slate-600">
            <span>Pertanyaan {quizStep} dari 3</span>
            <span className="text-amber-500 flex items-center gap-1">
              ⭐ {quizScore} Bintang
            </span>
          </div>

          {/* Tombol Bantuan Suara (Repeat Instruction) */}
          <button
            onClick={() => {
              playSynthSound("bubble");
              if (quizStep === 1) speakInstruction("Buah Pisang memiliki warna apa ya?", speechRate);
              if (quizStep === 2) speakInstruction("Mana gambar yang berbentuk segitiga hijau?", speechRate);
              if (quizStep === 3) speakInstruction("Berapa jumlah jeruk di bawah ini?", speechRate);
              if (incrementHints) incrementHints();
            }}
            className="btn-tactile mb-6 py-3 px-5 bg-sky-100 hover:bg-sky-200 border-2 border-sky-300 rounded-[20px] text-sky-800 font-extrabold flex items-center gap-2 cursor-pointer shadow-sm text-sm"
          >
            🔊 Bantuan Suara (Ulangi Soal)
          </button>

          {quizStep === 1 && (
            <div className="w-full flex flex-col items-center">
              <p className="text-2xl font-black text-slate-800 text-center mb-6">
                Buah Pisang memiliki warna apa ya? 🍌
              </p>
              <div className="grid grid-cols-2 gap-4 w-full">
                <button
                  onClick={() => handleQuizAnswer(true)}
                  className="btn-tactile p-6 bg-yellow-100 hover:bg-yellow-200 border-4 border-yellow-300 rounded-3xl text-2xl font-black text-yellow-800 cursor-pointer h-32"
                >
                  🟡 KUNING
                </button>
                <button
                  onClick={() => handleQuizAnswer(false)}
                  className="btn-tactile p-6 bg-red-100 hover:bg-red-200 border-4 border-red-300 rounded-3xl text-2xl font-black text-red-800 cursor-pointer h-32"
                >
                  🔴 MERAH
                </button>
              </div>
            </div>
          )}

          {quizStep === 2 && (
            <div className="w-full flex flex-col items-center">
              <p className="text-2xl font-black text-slate-800 text-center mb-6">
                Mana gambar yang berbentuk SEGITIGA hijau? 📐
              </p>
              <div className="grid grid-cols-2 gap-4 w-full">
                <button
                  onClick={() => handleQuizAnswer(false)}
                  className="btn-tactile p-4 bg-slate-50 hover:bg-slate-100 border-4 border-slate-200 rounded-3xl flex justify-center items-center h-40 cursor-pointer"
                >
                  <CircleIllustration className="w-28 h-28" />
                </button>
                <button
                  onClick={() => handleQuizAnswer(true)}
                  className="btn-tactile p-4 bg-slate-50 hover:bg-slate-100 border-4 border-slate-200 rounded-3xl flex justify-center items-center h-40 cursor-pointer"
                >
                  <TriangleIllustration className="w-28 h-28" />
                </button>
              </div>
            </div>
          )}

          {quizStep === 3 && (
            <div className="w-full flex flex-col items-center">
              <p className="text-2xl font-black text-slate-800 text-center mb-6">
                Berapa jumlah Jeruk di bawah ini? 🍊 🍊 🍊
              </p>
              <div className="grid grid-cols-3 gap-4 w-full">
                <button
                  onClick={() => handleQuizAnswer(false)}
                  className="btn-tactile p-6 bg-sky-50 hover:bg-sky-100 border-4 border-sky-200 rounded-3xl text-4xl font-black text-sky-700 cursor-pointer"
                >
                  1
                </button>
                <button
                  onClick={() => handleQuizAnswer(false)}
                  className="btn-tactile p-6 bg-sky-50 hover:bg-sky-100 border-4 border-sky-200 rounded-3xl text-4xl font-black text-sky-700 cursor-pointer"
                >
                  2
                </button>
                <button
                  onClick={() => handleQuizAnswer(true)}
                  className="btn-tactile p-6 bg-sky-50 hover:bg-sky-100 border-4 border-sky-200 rounded-3xl text-4xl font-black text-sky-700 cursor-pointer"
                >
                  3
                </button>
              </div>
            </div>
          )}

          {quizFeedback && (
            <div className={`mt-6 p-4 rounded-2xl text-center w-full text-xl font-black border-2 ${
              quizFeedback.isCorrect ? "bg-emerald-50 border-emerald-300 text-emerald-700 animate-bounce" : "bg-red-50 border-red-300 text-red-700"
            }`}>
              {quizFeedback.message}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center text-center animate-bounce">
          <div className="p-4 bg-amber-100 rounded-full border-4 border-amber-300 mb-6">
            <Trophy className="w-20 h-20 text-amber-500 fill-amber-300" />
          </div>
          <span className="text-4xl font-black text-sky-950 mb-2">KUIS SELESAI! 🎉</span>
          <p className="text-2xl font-bold text-slate-600 mb-6">
            Kamu mendapatkan {quizScore} dari 3 bintang emas!
          </p>
          
          <button
            onClick={() => {
              playSynthSound("bubble");
              setQuizStep(1);
              setQuizScore(0);
              setQuizFinished(false);
              setQuizFeedback(null);
              speakInstruction("Ayo kita mulai kuis kembali!", speechRate);
            }}
            className="btn-tactile w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xl font-extrabold cursor-pointer"
          >
            MAIN LAGI 🔄
          </button>
        </div>
      )}
    </div>
  );
}
