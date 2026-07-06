import React, { useState } from "react";
import { playSynthSound, speakInstruction } from "../utils/audio";

interface WarnaProps {
  speechRate: number;
  onComplete: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

export default function WarnaGame({
  speechRate,
  onComplete,
  startNewTask,
  trackTaskAction
}: WarnaProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-6 md:p-8 flex flex-col items-center">
      <h3 className="text-3xl font-black text-sky-950 mb-6 text-center">Ketuk untuk Mengenal Warna! 🎨</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-8">
        {[
          { name: "MERAH", color: "bg-red-500 border-red-600", tts: "Merah" },
          { name: "KUNING", color: "bg-yellow-400 border-yellow-500", tts: "Kuning" },
          { name: "BIRU", color: "bg-blue-500 border-blue-600", tts: "Biru" },
          { name: "HIJAU", color: "bg-green-500 border-green-600", tts: "Hijau" },
        ].map((c) => (
          <button
            key={c.name}
            onClick={() => {
              if (trackTaskAction) trackTaskAction();
              playSynthSound("bubble");
              setSelectedColor(c.name);
              speakInstruction(c.tts, speechRate);
              onComplete();
            }}
            className={`btn-tactile h-32 rounded-3xl border-4 cursor-pointer transition-all ${c.color} ${
              selectedColor === c.name ? "ring-8 ring-sky-300 scale-105" : ""
            }`}
            aria-label={`Pilih warna ${c.tts}`}
          />
        ))}
      </div>

      {selectedColor ? (
        <div className="text-center p-4 bg-sky-50 rounded-2xl border border-sky-100 animate-bounce">
          <span className="text-4xl font-black tracking-widest text-sky-900 uppercase">
            {selectedColor}
          </span>
        </div>
      ) : (
        <p className="text-xl font-bold text-slate-400">Pilih salah satu kotak di atas!</p>
      )}
    </div>
  );
}
