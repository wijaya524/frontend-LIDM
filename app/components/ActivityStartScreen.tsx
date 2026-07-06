"use client";

import React from "react";
import { Play } from "lucide-react";

interface StartScreenProps {
  title: string;
  onStart: () => void;
}

export default function ActivityStartScreen({ title, onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-10 rounded-[36px] shadow-xl border-4 border-sky-100 text-center animate-in fade-in zoom-in duration-500 w-full max-w-xl mx-auto my-12">
      <h2 className="text-3xl md:text-4xl font-black text-sky-950 mb-8 leading-snug">
        {title} 🎮
      </h2>
      <button
        onClick={onStart}
        className="btn-tactile flex items-center justify-center gap-4 bg-emerald-400 hover:bg-emerald-500 text-white py-6 px-12 rounded-full text-3xl font-black border-b-8 border-emerald-600 cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-lg w-full"
      >
        <Play className="w-10 h-10 fill-current" />
        MULAI MAIN
      </button>
    </div>
  );
}
