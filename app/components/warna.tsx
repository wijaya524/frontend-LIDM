"use client";

import React, { useState } from "react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { Button } from "@/components/ui/button";

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
  const textColorMap: Record<string, string> = {
    MERAH: "text-red-500",
    KUNING: "text-amber-500",
    BIRU: "text-blue-500",
    HIJAU: "text-green-600",
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center py-6 select-none">
      <h3 className="text-3xl font-black text-sky-950 dark:text-sky-100 mb-6 text-center">Ketuk untuk Mengenal Warna! 🎨</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-8">
        {[
          {
            name: "MERAH",
            color: "bg-red-500 hover:bg-red-500 border-red-600",
            tts: "Merah",
          },
          {
            name: "KUNING",
            color: "bg-yellow-400 hover:bg-yellow-400 border-yellow-500",
            tts: "Kuning",
          },
          {
            name: "BIRU",
            color: "bg-blue-500 hover:bg-blue-500 border-blue-600",
            tts: "Biru",
          },
          {
            name: "HIJAU",
            color: "bg-green-500 hover:bg-green-500 border-green-600",
            tts: "Hijau",
          },
        ].map((c) => (
          <Button
            key={c.name}
            onClick={() => {
              if (trackTaskAction) trackTaskAction();
              playSynthSound("bubble");
              setSelectedColor(c.name);
              speakInstruction(c.tts, speechRate);
              onComplete();
            }}
            variant="default"
            className={`btn-tactile h-32 rounded-3xl border-4 cursor-pointer transition-all duration-300 ${c.color} ${selectedColor === c.name ? "ring-8 ring-sky-200 dark:ring-sky-950 scale-105" : ""
              }`}
            aria-label={`Pilih warna ${c.tts}`}
          />
        ))}
      </div>

      {selectedColor ? (
        <div className="text-center p-4 bg-sky-50 dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800 animate-bounce">
          <span className={`text-4xl font-black tracking-widest uppercase ${textColorMap[selectedColor] || "text-sky-900 dark:text-sky-100"}`}>
            {selectedColor}
          </span>
        </div>
      ) : (
        <p className="text-xl font-bold text-slate-400 dark:text-slate-500">Pilih salah satu kotak di atas!</p>
      )}
    </div>
  );
}
