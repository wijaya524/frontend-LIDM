import React, { useState } from "react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { CircleIllustration, SquareIllustration, TriangleIllustration } from "../illustrations";

interface BentukProps {
  speechRate: number;
  onComplete: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

export default function BentukGame({
  speechRate,
  onComplete,
  startNewTask,
  trackTaskAction
}: BentukProps) {
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [shapeWobble, setShapeWobble] = useState<boolean>(false);

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-6 md:p-8 flex flex-col items-center">
      <h3 className="text-3xl font-black text-sky-950 mb-6 text-center">Ketuk untuk Mengenal Bentuk! 📐</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8">
        {[
          { id: "lingkaran", name: "LINGKARAN", illustration: <CircleIllustration className="w-36 h-36" />, tts: "Lingkaran" },
          { id: "persegi", name: "PERSEGI", illustration: <SquareIllustration className="w-36 h-36" />, tts: "Persegi" },
          { id: "segitiga", name: "SEGITIGA", illustration: <TriangleIllustration className="w-36 h-36" />, tts: "Segitiga" },
        ].map((s) => (
          <button
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
            className={`btn-tactile flex flex-col items-center p-6 bg-slate-50 border-4 rounded-3xl cursor-pointer ${
              selectedShape === s.name ? "border-sky-400 bg-sky-50/50 scale-105" : "border-slate-100"
            }`}
            aria-label={`Pilih bentuk ${s.tts}`}
          >
            <div className={selectedShape === s.name && shapeWobble ? "animate-bounce" : ""}>
              {s.illustration}
            </div>
            <span className="text-xl font-black text-slate-700 mt-4">{s.name}</span>
          </button>
        ))}
      </div>

      {selectedShape ? (
        <div className="text-center p-4 bg-sky-50 rounded-2xl border border-sky-100">
          <span className="text-3xl font-black text-sky-900 uppercase">
            BENTUK {selectedShape}
          </span>
        </div>
      ) : (
        <p className="text-xl font-bold text-slate-400">Pilih salah satu bentuk di atas!</p>
      )}
    </div>
  );
}
