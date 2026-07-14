"use client";

import React, { useState } from "react";
import Image from "next/image";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const [currentPage, setCurrentPage] = useState<"1-5" | "6-10">("1-5");
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const numbersData = [
    { num: 1, label: "SATU", tts: "Satu", emoji: "🍎", count: 1, image: "/icons/berhitung/satu.webp" },
    { num: 2, label: "DUA", tts: "Dua", emoji: "🍌", count: 2, image: "/icons/berhitung/dua.webp" },
    { num: 3, label: "TIGA", tts: "Tiga", emoji: "🍊", count: 3, image: "/icons/berhitung/tiga.webp" },
    { num: 4, label: "EMPAT", tts: "Empat", emoji: "🍓", count: 4, image: "/icons/berhitung/empat1.webp" },
    { num: 5, label: "LIMA", tts: "Lima", emoji: "🍉", count: 5, image: "/icons/berhitung/lima.webp" },
    { num: 6, label: "ENAM", tts: "Enam", emoji: "🍇", count: 6, image: "/icons/berhitung/enam1.webp" },
    { num: 7, label: "TUJUH", tts: "Tujuh", emoji: "🍒", count: 7, image: "/icons/berhitung/tujuh1.webp" },
    { num: 8, label: "DELAPAN", tts: "Delapan", emoji: "🍍", count: 8, image: "/icons/berhitung/delapan1.webp" },
    { num: 9, label: "SEMBILAN", tts: "Sembilan", emoji: "🥭", count: 9, image: "/icons/berhitung/sembilan.webp" },
    { num: 10, label: "SEPULUH", tts: "Sepuluh", emoji: "🥑", count: 10, image: "/icons/berhitung/sepuluh.webp" },
  ];

  const displayedNumbers = currentPage === "1-5" 
    ? numbersData.slice(0, 5) 
    : numbersData.slice(5, 10);

  const getNumberColorClass = (num: number) => {
    switch (num) {
      case 1: return "bg-rose-100 border-rose-300 text-rose-700 hover:bg-rose-200";
      case 2: return "bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200";
      case 3: return "bg-emerald-100 border-emerald-300 text-emerald-700 hover:bg-emerald-200";
      case 4: return "bg-sky-100 border-sky-300 text-sky-700 hover:bg-sky-200";
      case 5: return "bg-purple-100 border-purple-300 text-purple-700 hover:bg-purple-200";
      case 6: return "bg-pink-100 border-pink-300 text-pink-700 hover:bg-pink-200";
      case 7: return "bg-teal-100 border-teal-300 text-teal-700 hover:bg-teal-200";
      case 8: return "bg-indigo-100 border-indigo-300 text-indigo-700 hover:bg-indigo-200";
      case 9: return "bg-orange-100 border-orange-300 text-orange-700 hover:bg-orange-200";
      case 10: return "bg-lime-100 border-lime-300 text-lime-700 hover:bg-lime-200";
      default: return "bg-slate-100 border-slate-300 text-slate-700";
    }
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center select-none py-6">
      <h3 className="text-3xl md:text-4xl font-black text-sky-950 mb-8 text-center">Ketuk untuk Mengenal Angka</h3>
      <div className="w-full max-w-sm h-56 relative border-4 border-sky-100 rounded-3xl overflow-hidden bg-white shadow-md mb-8 flex items-center justify-center">
        {selectedNumber !== null ? (
          <div className="w-full h-full relative p-4 flex flex-col items-center justify-center">
            {/* Display the image */}
            <div className="w-full h-36 relative">
              <Image
                src={numbersData.find(x => x.num === selectedNumber)?.image || ""}
                alt={`Ilustrasi ${selectedNumber}`}
                fill
                className="object-contain animate-in zoom-in duration-300"
              />
            </div>
            {/* Label below the image inside the frame */}
            <span className="text-xl font-black text-sky-950 mt-2 animate-bounce">
              {selectedNumber} = {numbersData.find(x => x.num === selectedNumber)?.label}
            </span>
          </div>
        ) : (
          <div className="text-center p-6 flex flex-col items-center justify-center gap-2">
            <span className="text-5xl animate-pulse">✨</span>
            <p className="text-lg font-bold text-slate-400">Pilih angka di bawah untuk melihat gambar benda! 🌟</p>
          </div>
        )}
      </div>
      
      {/* Grid of clean number circles */}
      <div className="flex flex-wrap justify-center gap-6 w-full mb-10">
        {displayedNumbers.map((n) => {
          const colorClass = getNumberColorClass(n.num);
          const isSelected = selectedNumber === n.num;
          
          return (
            <button
              key={n.num}
              onClick={() => {
                if (trackTaskAction) trackTaskAction();
                playSynthSound("bubble");
                setSelectedNumber(n.num);
                speakInstruction(`${n.tts}, ayo hitung ${n.label.toLowerCase()}: ${Array(n.count).fill(n.emoji).join(" ")}`, speechRate);
                onComplete();
              }}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 flex items-center justify-center text-4xl sm:text-5xl font-black cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 ${colorClass} ${
                isSelected ? "ring-8 ring-sky-200 scale-105" : ""
              }`}
              aria-label={`Angka ${n.num}`}
            >
              {n.num}
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons for Page 1-5 and 6-10 */}
      <div className="flex gap-4">
        {currentPage === "1-5" ? (
          <Button
            onClick={() => {
              playSynthSound("bubble");
              setCurrentPage("6-10");
              setSelectedNumber(null);
              speakInstruction("Lanjut ke angka enam sampai sepuluh", speechRate);
            }}
            className="btn-tactile py-4 px-8 bg-sky-500 hover:bg-sky-600 text-white rounded-full text-xl font-extrabold cursor-pointer h-auto border-b-4 border-sky-700 shadow-md"
          >
            Lanjut 6 - 10  <ArrowRight className="w-6 h-6 stroke-3" />
          </Button>
        ) : (
          <Button
            onClick={() => {
              playSynthSound("bubble");
              setCurrentPage("1-5");
              setSelectedNumber(null);
              speakInstruction("Kembali ke angka satu sampai lima", speechRate);
            }}
            className="btn-tactile py-4 px-8 bg-sky-500 hover:bg-sky-600 text-white rounded-full text-xl font-extrabold cursor-pointer h-auto border-b-4 border-sky-700 shadow-md"
          >
             <ArrowLeft className="w-6 h-6 stroke-3" /> Kembali 1 - 5
          </Button>
        )}
      </div>
    </div>
  );
}
