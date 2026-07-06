/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import { playSynthSound, speakInstruction } from "../utils/audio";

interface MenyentuhProps {
  speechRate: number;
  onComplete: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

export default function MenyentuhGame({ speechRate, onComplete, startNewTask, trackTaskAction }: MenyentuhProps) {
  const [balloonScore, setBalloonScore] = useState<number>(0);
  const [balloons, setBalloons] = useState<{ id: number; color: string; left: number; top: number; size: number }[]>([]);

  useEffect(() => {
    initBalloons();
  }, []);

  const initBalloons = () => {
    const list = [];
    const colors = ["bg-red-400", "bg-yellow-400", "bg-sky-400", "bg-emerald-400", "bg-purple-400"];
    for (let i = 0; i < 5; i++) {
      list.push({
        id: i,
        color: colors[i % colors.length],
        left: 12 + i * 18 + Math.random() * 4,
        top: 60 + Math.random() * 10,
        size: 80 + Math.random() * 45
      });
    }
    setBalloons(list);
  };

  const handlePopBalloon = (id: number) => {
    if (trackTaskAction) trackTaskAction();
    playSynthSound("pop");
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setBalloonScore((score) => {
      const newScore = score + 1;
      if (newScore >= 5) {
        playSynthSound("victory");
        onComplete();
        speakInstruction("Bagus! Semua balon sudah meletus!", speechRate);
      } else {
        speakInstruction(`Meletus! Skor ${newScore}`, speechRate);
        if (startNewTask) startNewTask();
      }
      return newScore;
    });
  };

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-6 md:p-8 flex flex-col items-center relative overflow-hidden">
      <h3 className="text-3xl font-black text-sky-950 mb-2 text-center">Ketuk dan Pecahkan Balon! 🎈</h3>
      <p className="text-lg font-bold text-slate-500 mb-4 text-center">Pecahkan 5 balon untuk menang!</p>

      <div className="relative border-4 border-dashed border-sky-200 rounded-3xl bg-sky-50/20 w-full h-80 overflow-hidden shadow-inner">
        {balloons.map((b) => (
          <button
            key={b.id}
            onClick={() => handlePopBalloon(b.id)}
            className={`absolute rounded-full cursor-pointer btn-tactile ${b.color} border-4 border-white/50 flex items-center justify-center text-3xl font-black text-white`}
            style={{
              left: `${b.left}%`,
              top: `${b.top}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}
            aria-label="Pecahkan balon"
          >
            🎈
          </button>
        ))}

        {balloonScore >= 5 && (
          <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center animate-bounce">
            <Trophy className="w-20 h-20 text-amber-500 fill-amber-200 mb-3 animate-pulse" />
            <span className="text-4xl font-black text-sky-950 mb-2">Kamu Juara! 🌟</span>
            <p className="text-xl font-bold text-slate-600 mb-6">Semua balon sudah dipecahkan!</p>
            <button
              onClick={() => {
                playSynthSound("bubble");
                setBalloonScore(0);
                initBalloons();
              }}
              className="btn-tactile py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xl font-extrabold cursor-pointer"
            >
              MAIN LAGI 🔄
            </button>
          </div>
        )}
      </div>

      {balloonScore < 5 && (
        <div className="mt-4 text-2xl font-black text-sky-800">
          Balon Pecah: {balloonScore} / 5
        </div>
      )}
    </div>
  );
}
