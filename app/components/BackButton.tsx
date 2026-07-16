"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLearning } from "../context/LearningContext";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label?: string;
  ttsText?: string;
}

export default function BackButton({ href, label = "KEMBALI", ttsText }: BackButtonProps) {
  const { playSynth, speak } = useLearning();

  return (
    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
      <Button
        variant="outline"
        nativeButton={false}
        className="btn-tactile py-3 px-4 sm:py-5 sm:px-6 dark:bg-[#4A90E2] dark:hover:bg-[#5BA0F2] bg-[#4A90E2] border-4 border-[#3B7FCE] hover:bg-[#5BA0F2] hover:text-white text-white rounded-2xl text-lg sm:text-xl font-black flex items-center gap-2 cursor-pointer shadow-md select-none h-auto"
        render={
          <Link
            href={href}
            onClick={() => {
              playSynth("bubble");
              if (ttsText) speak(ttsText);
            }}
          />
        }
      >
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-3" /> {label}
      </Button>
    </div>
  );
}
