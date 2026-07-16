/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { Button } from "@/components/ui/button";

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
    
    try {
      const audio = new Audio("/audio/pop_balloon.wav");
      audio.play().catch((err) => {
        console.warn("Failed to play custom pop sound, playing fallback synth", err);
        playSynthSound("pop");
      });
    } catch (e) {
      console.warn("Failed to instantiate Audio, playing fallback synth", e);
      playSynthSound("pop");
    }

    setBalloons((prev) => prev.filter((b) => b.id !== id));
    
    const newScore = balloonScore + 1;
    setBalloonScore(newScore);

    if (newScore >= 5) {
      playSynthSound("victory");
      onComplete();
      speakInstruction("Bagus! Semua balon sudah meletus!", speechRate);
    } else {
      if (startNewTask) startNewTask();
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center relative overflow-hidden py-6 select-none">
      <h3 className="text-3xl font-black text-sky-950 dark:text-sky-100 mb-2 text-center">Ketuk dan Pecahkan Balon! 🎈</h3>
      <p className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-4 text-center">Pecahkan 5 balon untuk menang!</p>

      <div className="relative border-4 border-dashed border-sky-200 dark:border-slate-800 rounded-3xl bg-sky-50/20 dark:bg-slate-900/30 w-full h-80 overflow-hidden shadow-inner">
        {balloons.map((b) => (
          <Button
            key={b.id}
            onClick={() => handlePopBalloon(b.id)}
            variant="ghost"
            className={`absolute rounded-full cursor-pointer btn-tactile ${b.color} border-4 border-white/50 flex items-center justify-center text-3xl font-black text-white p-0`}
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
          </Button>
        ))}

        {balloonScore >= 5 && (
          <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 flex flex-col items-center justify-center p-6 text-center ">
            <Trophy className="w-20 h-20 text-amber-500 fill-amber-200 mb-3 animate-pulse" />
            <span className="text-4xl font-black text-sky-950 dark:text-sky-100 mb-2">Kamu Juara! 🌟</span>
            <p className="text-xl font-bold text-slate-600 dark:text-slate-350 mb-6">Semua balon sudah dipecahkan!</p>
            <Button
              onClick={() => {
                playSynthSound("bubble");
                setBalloonScore(0);
                initBalloons();
              }}
              className="btn-tactile py-5 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xl font-extrabold cursor-pointer h-auto border-b-4 border-emerald-600"
            >
              MAIN LAGI 🔄
            </Button>
          </div>
        )}
      </div>

      {balloonScore < 5 && (
        <div className="mt-4 text-2xl font-black text-sky-800 dark:text-sky-400">
          Balon Pecah: {balloonScore} / 5
        </div>
      )}
    </div>
  );
}
