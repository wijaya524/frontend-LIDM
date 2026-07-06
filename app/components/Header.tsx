"use client";

import React from "react";
import { useLearning } from "../context/LearningContext";
import { PandaAvatar, RabbitAvatar, BearAvatar } from "../illustrations";

export default function Header() {
  const { childName, childAvatar, speechRate, setSpeechRate, speak, playSynth } = useLearning();

  const renderAvatar = (type: "panda" | "kelinci" | "beruang", sizeClass = "w-full h-full") => {
    if (type === "panda") return <PandaAvatar className={sizeClass} />;
    if (type === "kelinci") return <RabbitAvatar className={sizeClass} />;
    return <BearAvatar className={sizeClass} />;
  };

  return (
    <header className="sticky top-0 bg-white border-b-4 border-sky-100 py-4 px-4 md:px-8 z-40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 select-none w-full">
      <div className="hidden md:flex items-center gap-3">
        <div className="w-14 h-14 bg-sky-50 p-1 border-2 border-sky-200 rounded-full flex items-center justify-center shadow-sm">
          {renderAvatar(childAvatar)}
        </div>
        <div className="flex flex-col text-left">
          <span className="text-2xl font-black text-sky-950 leading-none">{childName}</span>
          <span className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wider">Anak Pintar</span>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 p-1.5 rounded-2xl">
        <span className="text-base font-black text-slate-500 px-2">Suara:</span>
        <button
          onClick={() => {
            playSynth("bubble");
            setSpeechRate(0.4);
            speak("Kecepatan kura-kura");
          }}
          className={`flex items-center gap-1.5 py-2.5 px-4 rounded-xl text-lg font-extrabold cursor-pointer transition-all ${
            speechRate === 0.4
              ? "bg-amber-400 text-amber-950 border-b-4 border-amber-500 shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          aria-label="Atur suara lambat"
        >
          🐢 Lambat
        </button>
        <button
          onClick={() => {
            playSynth("bubble");
            setSpeechRate(0.6);
            speak("Kecepatan normal");
          }}
          className={`flex items-center gap-1.5 py-2.5 px-4 rounded-xl text-lg font-extrabold cursor-pointer transition-all ${
            speechRate === 0.6
              ? "bg-sky-400 text-sky-950 border-b-4 border-sky-500 shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          aria-label="Atur suara sedang"
        >
          🐰 Sedang
        </button>
      </div>
    </header>
  );
}
