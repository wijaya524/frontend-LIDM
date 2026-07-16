/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { toast } from "sonner";

interface MenyeretProps {
  speechRate: number;
  onComplete: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

export default function MenyeretGame({ speechRate, onComplete, startNewTask, trackTaskAction }: MenyeretProps) {
  const [draggedItem, setDraggedItem] = useState<"organik" | "anorganik" | null>(null);
  const [basketStatus, setBasketStatus] = useState<{ organik: string[]; anorganik: string[] }>({ organik: [], anorganik: [] });
  const [dragSuccessMessage, setDragSuccessMessage] = useState<string | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (
      !completedRef.current &&
      basketStatus.organik.length > 0 &&
      basketStatus.anorganik.length > 0
    ) {
      completedRef.current = true;

      onComplete();
      speakInstruction(
        "Luar biasa! Lingkungan jadi bersih!",
        speechRate
      );
    }
  }, [basketStatus, onComplete, speechRate]);

  const handleDragStart = (item: "organik" | "anorganik") => {
    if (trackTaskAction) trackTaskAction();
    setDraggedItem(item);
    playSynthSound("bubble");
  };

  const handleDrop = (basket: "organik" | "anorganik") => {
    if (!draggedItem) return;

    const isCorrect =
      (draggedItem === "organik" && basket === "organik") ||
      (draggedItem === "anorganik" && basket === "anorganik");

    if (isCorrect) {
      playSynthSound("victory");

      setBasketStatus((prev) => ({
        ...prev,
        [basket]: [...prev[basket], draggedItem],
      }));

      setDragSuccessMessage("Benar! Sampah masuk tong!");
      speakInstruction("Benar!", speechRate);
      toast.success("Benar! Sampah masuk tong! ⭐️", {
        className: "font-fredoka text-lg font-bold rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 shadow-md",
        duration: 2000
      });

      startNewTask?.();
    } else {
      playSynthSound("wrong");
      setDragSuccessMessage("Salah tempat. Ulangi!");
      speakInstruction("Salah tempat. Coba lagi!", speechRate);
      toast.error("Salah tempat. Ulangi! 💪", {
        className: "font-fredoka text-lg font-bold rounded-2xl border-2 border-red-200 bg-red-50 text-red-700 shadow-md",
        duration: 2000
      });
    }

    setDraggedItem(null);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center py-6 select-none">
      <h3 className="text-3xl font-black text-sky-950 dark:text-sky-100 mb-2 text-center">Pilah Sampah pada Tempatnya! 🗑️</h3>
      <p className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-6 text-center">Seret sampah ke tong yang tepat</p>

      <div className="flex flex-col sm:flex-row justify-around items-center w-full gap-8 mb-8">

        {/* AREA ITEM YANG AKAN DISERET */}
        <div className="flex flex-row sm:flex-col gap-6 justify-center items-center p-4 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-inner">

          {/* Item 1: Sisa Apel (Organik) */}
          {basketStatus.organik.length === 0 && (
            <div
              draggable
              onDragStart={() => handleDragStart("organik")}
              onTouchStart={() => handleDragStart("organik")}
              className="btn-tactile p-4 bg-white dark:bg-slate-900 border-4 border-green-100 dark:border-green-950 rounded-3xl shadow-md cursor-grab active:cursor-grabbing flex flex-col items-center justify-center w-48 h-48 hover:border-green-300 dark:hover:border-green-900 transition-colors"
            >
              <div className="relative w-32 h-32 mb-2">
                <Image
                  src="/icons/memilah-sampah/sisa-apel.webp"
                  alt="Sisa Apel"
                  fill
                  className="object-contain animate-wiggle"
                />
              </div>
              <span className="font-black text-green-700 dark:text-green-400 text-center leading-tight text-lg">SISA APEL</span>
            </div>
          )}

          {/* Item 2: Botol Plastik (Anorganik) */}
          {basketStatus.anorganik.length === 0 && (
            <div
              draggable
              onDragStart={() => handleDragStart("anorganik")}
              onTouchStart={() => handleDragStart("anorganik")}
              className="btn-tactile p-4 bg-white dark:bg-slate-900 border-4 border-blue-100 dark:border-blue-950 rounded-3xl shadow-md cursor-grab active:cursor-grabbing flex flex-col items-center justify-center w-48 h-48 hover:border-blue-300 dark:hover:border-blue-900 transition-colors"
            >
              <div className="relative w-32 h-32 mb-2">
                <Image
                  src="/icons/memilah-sampah/sisa-botol.webp"
                  alt="Botol Plastik"
                  fill
                  className="object-contain animate-wiggle"
                />
              </div>
              <span className="font-black text-blue-700 dark:text-blue-400 text-center leading-tight text-lg">BOTOL PLASTIK</span>
            </div>
          )}

          {/* Tampilan Selesai Jika Semua Sudah Masuk Tong */}
          {basketStatus.organik.length > 0 && basketStatus.anorganik.length > 0 && (
            <div className="flex flex-col items-center justify-center w-48 h-48 bg-emerald-50 dark:bg-emerald-950/20 rounded-3xl p-4 text-center border-4 border-emerald-200 dark:border-emerald-900">
              <span className="text-5xl animate-bounce">✨</span>
              <span className="font-black text-emerald-600 dark:text-emerald-400 text-2xl mt-2">BERSIH!</span>
            </div>
          )}
        </div>

        {/* AREA TONG SAMPAH (DROP ZONES) */}
        <div className="flex gap-6">

          {/* Drop Zone: Tong Organik (Hijau) */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop("organik")}
            onTouchEnd={() => handleDrop("organik")}
            className={`w-52 h-72 border-4 border-dashed rounded-[32px] p-4 flex flex-col justify-between items-center transition-all ${draggedItem === "organik" ? "bg-green-50 dark:bg-green-950/20 border-green-400 scale-105 animate-pulse" : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800"
              }`}
          >
            <div className="relative w-full flex-1 mt-2">
              <Image
                src="/icons/memilah-sampah/organik.webp"
                alt="Tong Organik"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-base font-black text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-950/30 px-3 py-2 rounded-xl text-center w-full mt-3">
              Organik ({basketStatus.organik.length})
            </span>
          </div>

          {/* Drop Zone: Tong Anorganik (Kuning) */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop("anorganik")}
            onTouchEnd={() => handleDrop("anorganik")}
            className={`w-52 h-72 border-4 border-dashed rounded-[32px] p-4 flex flex-col justify-between items-center transition-all ${draggedItem === "anorganik" ? "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-400 scale-105 animate-pulse" : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800"
              }`}
          >
            <div className="relative w-full flex-1 mt-2">
              <Image
                src="/icons/memilah-sampah/anorganik.webp"
                alt="Tong Anorganik"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-base font-black text-yellow-800 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-950/30 px-3 py-2 rounded-xl text-center w-full mt-3">
              Anorganik ({basketStatus.anorganik.length})
            </span>
          </div>

        </div>
      </div>

      {/* TOMBOL ULANGI */}
      {basketStatus.organik.length > 0 && basketStatus.anorganik.length > 0 && (
        <Button
          onClick={() => {
            playSynthSound("bubble");
            setDraggedItem(null);
            setBasketStatus({ organik: [], anorganik: [] });
            setDragSuccessMessage(null);
            speakInstruction("Silakan kelompokkan sampah kembali.", speechRate);
          }}
          variant="outline"
          className="btn-tactile mt-6 w-full py-5 px-6 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-2xl text-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors h-auto border-b-4 border-slate-400 dark:border-slate-900"
        >
          <RotateCcw className="w-6 h-6" /> ULANGI
        </Button>
      )}
    </div>
  );
}