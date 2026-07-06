import React, { useState } from "react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { ApelIllustration, PisangIllustration, JerukIllustration } from "../illustrations";

interface AngkaProps {
  speechRate: number;
  onComplete: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

export default function AngkaGame({
  speechRate,
  onComplete,
  startNewTask,
  trackTaskAction
}: AngkaProps) {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-6 md:p-8 flex flex-col items-center">
      <h3 className="text-3xl font-black text-sky-950 mb-6 text-center">Ketuk untuk Belajar Berhitung! 🔢</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8">
        {[
          {
            num: 1,
            label: "SATU",
            tts: "Satu apel",
            illustration: <div className="flex gap-1"><ApelIllustration className="w-24 h-24" /></div>
          },
          {
            num: 2,
            label: "DUA",
            tts: "Dua pisang",
            illustration: <div className="flex gap-1"><PisangIllustration className="w-20 h-20" /><PisangIllustration className="w-20 h-20" /></div>
          },
          {
            num: 3,
            label: "TIGA",
            tts: "Tiga jeruk",
            illustration: <div className="flex gap-1"><JerukIllustration className="w-16 h-16" /><JerukIllustration className="w-16 h-16" /><JerukIllustration className="w-16 h-16" /></div>
          },
        ].map((n) => (
          <button
            key={n.num}
            onClick={() => {
              if (trackTaskAction) trackTaskAction();
              playSynthSound("bubble");
              setSelectedNumber(n.num);
              speakInstruction(n.tts, speechRate);
              onComplete();
            }}
            className={`btn-tactile flex flex-col items-center justify-between p-6 bg-slate-50 border-4 rounded-3xl min-h-64 cursor-pointer ${
              selectedNumber === n.num ? "border-sky-400 bg-sky-50/50 scale-105" : "border-slate-100"
            }`}
            aria-label={`Angka ${n.num}`}
          >
            <span className="text-6xl font-black text-sky-700">{n.num}</span>
            <div className="my-4">{n.illustration}</div>
            <span className="text-xl font-black text-slate-800">{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
