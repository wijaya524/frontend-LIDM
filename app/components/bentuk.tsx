"use client";

import React, { useState } from "react";
import Image from "next/image"; 
import { playSynthSound, speakInstruction } from "../utils/audio";
import { Button } from "@/components/ui/button";
import round from '@/public/icons/bentuk/round.svg'
import triangle from '@/public/icons/bentuk/triangle.svg'
import square from '@/public/icons/bentuk/square.svg'
import trapezium from '@/public/icons/bentuk/trapezium.svg'

interface BentukProps {
  speechRate: number;
  onComplete: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

export default function BentukGame({
  speechRate,
  onComplete,
  trackTaskAction
}: BentukProps) {
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [shapeWobble, setShapeWobble] = useState<boolean>(false);

  return (
    <div className="w-full max-w-2xl flex flex-col items-center py-6 select-none">
      <h3 className="text-3xl font-black text-sky-950 dark:text-sky-100 mb-6 text-center">Ketuk untuk Mengenal Bentuk! 📐</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8">
        {[
          { id: "lingkaran", name: "LINGKARAN", illustration: round, tts: "Lingkaran" },
          { id: "persegi", name: "PERSEGI", illustration: square, tts: "Persegi" },
          { id: "segitiga", name: "SEGITIGA", illustration: triangle, tts: "Segitiga" },
           { id: "trapesium", name: "TRAPESIUM", illustration: trapezium, tts: "Trapesium" },
        ].map((s) => (
          <Button
            key={s.id}
            onClick={() => {
              if (trackTaskAction) trackTaskAction();
              playSynthSound("wobble");
              setSelectedShape(s.name);
              setShapeWobble(true);
              setTimeout(() => setShapeWobble(false), 500);
              speakInstruction(s.tts, speechRate);
              onComplete();
            }}
            variant="ghost"
            className={`btn-tactile flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800 border-4 rounded-[28px] cursor-pointer h-auto min-h-75 w-full transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 ${
              selectedShape === s.name ? "border-sky-400 dark:border-sky-500 bg-sky-50/50 dark:bg-sky-950/20 scale-105" : "border-slate-100 dark:border-slate-800"
            }`}
            aria-label={`Pilih bentuk ${s.tts}`}
          >
            <div className="flex-1 flex items-center justify-center w-full">
              <div className={selectedShape === s.name && shapeWobble ? "animate-bounce" : ""}>
                <Image 
                  src={s.illustration} 
                  alt={s.name}
                  width={160} 
                  height={160}
                  className="w-32 h-32 sm:w-40 sm:h-40 object-contain" 
                />
              </div>
            </div>
            <span className="text-xl font-black text-slate-700 dark:text-slate-200 mt-6">{s.name}</span>
          </Button>
        ))}
      </div>

      {selectedShape ? (
        <div className="text-center p-4 bg-sky-50 dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-slate-800">
          <span className="text-3xl font-black text-sky-900 dark:text-sky-100 uppercase">
            BENTUK {selectedShape}
          </span>
        </div>
      ) : (
        <p className="text-xl font-bold text-slate-400 dark:text-slate-500">Pilih salah satu bentuk di atas!</p>
      )}
    </div>
  );
}