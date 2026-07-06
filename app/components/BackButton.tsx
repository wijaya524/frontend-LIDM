"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLearning } from "../context/LearningContext";

interface BackButtonProps {
  href: string;
  label?: string;
  ttsText?: string;
}

export default function BackButton({ href, label = "KEMBALI", ttsText }: BackButtonProps) {
  const { playSynth, speak } = useLearning();

  return (
    <div className="w-full flex items-center mb-6 max-w-5xl mx-auto px-4 md:px-8">
      <Link
        href={href}
        onClick={() => {
          playSynth("bubble");
          if (ttsText) speak(ttsText);
        }}
        className="btn-tactile py-3 px-5 bg-white border-4 border-sky-100 hover:bg-slate-50 text-sky-950 rounded-2xl text-xl font-black flex items-center gap-2 cursor-pointer shadow-sm select-none"
      >
        <ArrowLeft className="w-6 h-6 stroke-[3]" /> {label}
      </Link>
    </div>
  );
}
