import React, { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import {
  BotolPlastikIllustration,
  TongAnorganikIllustration,
  SisaApelIllustration,
  TongOrganikIllustration
} from "../illustrations";

interface MenyeretProps {
  speechRate: number;
  onComplete: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

export default function MenyeretGame({ speechRate, onComplete, startNewTask, trackTaskAction }: MenyeretProps) {
  // State diubah untuk mencerminkan kategori sampah: organik (apel) dan anorganik (botol)
  const [draggedItem, setDraggedItem] = useState<"organik" | "anorganik" | null>(null);
  const [basketStatus, setBasketStatus] = useState<{ organik: string[]; anorganik: string[] }>({ organik: [], anorganik: [] });
  const [dragSuccessMessage, setDragSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
  if (
    basketStatus.organik.length > 0 &&
    basketStatus.anorganik.length > 0
  ) {
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

    startNewTask?.();
  } else {
    playSynthSound("wrong");
    setDragSuccessMessage("Salah tempat. Ulangi!");
    speakInstruction("Salah tempat. Coba lagi!", speechRate);
  }

  setDraggedItem(null);
};

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-6 md:p-8 flex flex-col items-center">
      <h3 className="text-3xl font-black text-sky-950 mb-2 text-center">Pilah Sampah pada Tempatnya! 🗑️</h3>
      <p className="text-lg font-bold text-slate-500 mb-6 text-center">Seret sampah ke tong yang tepat</p>

      <div className="flex flex-col sm:flex-row justify-around items-center w-full gap-8 mb-8">

        {/* AREA ITEM YANG AKAN DISERET */}
        <div className="flex flex-row sm:flex-col gap-6 justify-center items-center p-4 bg-slate-50 rounded-3xl border-2 border-slate-100">

          {/* Item 1: Sisa Apel (Organik) */}
          {basketStatus.organik.length === 0 && (
            <div
              draggable
              onDragStart={() => handleDragStart("organik")}
              onTouchStart={() => handleDragStart("organik")}
              className="btn-tactile p-4 bg-white border-4 border-green-100 rounded-2xl shadow-md cursor-grab active:cursor-grabbing flex flex-col items-center justify-center w-36 h-36 hover:border-green-300 transition-colors"
            >
              <SisaApelIllustration className="w-20 h-20 mb-2" />
              <span className="font-extrabold text-green-700 text-center leading-tight">SISA<br />APEL</span>
            </div>
          )}

          {/* Item 2: Botol Plastik (Anorganik) */}
          {basketStatus.anorganik.length === 0 && (
            <div
              draggable
              onDragStart={() => handleDragStart("anorganik")}
              onTouchStart={() => handleDragStart("anorganik")}
              className="btn-tactile p-4 bg-white border-4 border-blue-100 rounded-2xl shadow-md cursor-grab active:cursor-grabbing flex flex-col items-center justify-center w-36 h-36 hover:border-blue-300 transition-colors"
            >
              <BotolPlastikIllustration className="w-20 h-20 mb-2" />
              <span className="font-extrabold text-blue-700 text-center leading-tight">BOTOL<br />PLASTIK</span>
            </div>
          )}

          {/* Tampilan Selesai Jika Semua Sudah Masuk Tong */}
          {basketStatus.organik.length > 0 && basketStatus.anorganik.length > 0 && (
            <div className="flex flex-col items-center justify-center w-36 h-36 bg-emerald-50 rounded-2xl p-4 text-center border-4 border-emerald-200">
              <span className="text-4xl animate-bounce">✨</span>
              <span className="font-black text-emerald-600 text-lg mt-2">BERSIH!</span>
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
            className={`w-40 h-52 border-4 border-dashed rounded-3xl p-3 flex flex-col justify-between items-center transition-all ${draggedItem === "organik" ? "bg-green-50 border-green-400 scale-105 animate-pulse" : "bg-slate-50 border-slate-200"
              }`}
          >
            <TongOrganikIllustration className="w-24 h-24 mt-2" />
            <span className="text-sm font-black text-green-800 bg-green-100 px-3 py-2 rounded-xl text-center w-full">
              Organik ({basketStatus.organik.length})
            </span>
          </div>

          {/* Drop Zone: Tong Anorganik (Kuning) */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop("anorganik")}
            onTouchEnd={() => handleDrop("anorganik")}
            className={`w-40 h-52 border-4 border-dashed rounded-3xl p-3 flex flex-col justify-between items-center transition-all ${draggedItem === "anorganik" ? "bg-yellow-50 border-yellow-400 scale-105 animate-pulse" : "bg-slate-50 border-slate-200"
              }`}
          >
            <TongAnorganikIllustration className="w-24 h-24 mt-2" />
            <span className="text-sm font-black text-yellow-800 bg-yellow-100 px-3 py-2 rounded-xl text-center w-full">
              Anorganik ({basketStatus.anorganik.length})
            </span>
          </div>

        </div>
      </div>

      {/* PESAN UMPAN BALIK (FEEDBACK) */}
      {dragSuccessMessage && (
        <div className={`p-4 border-4 rounded-2xl text-center w-full ${dragSuccessMessage.includes("Benar")
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
          }`}>
          <p className="text-xl font-black">{dragSuccessMessage}</p>
        </div>
      )}

      {/* TOMBOL ULANGI */}
      {basketStatus.organik.length > 0 && basketStatus.anorganik.length > 0 && (
        <button
          onClick={() => {
            playSynthSound("bubble");
            setDraggedItem(null);
            setBasketStatus({ organik: [], anorganik: [] });
            setDragSuccessMessage(null);
            speakInstruction("Silakan kelompokkan sampah kembali.", speechRate);
          }}
          className="btn-tactile mt-6 w-full py-4 px-6 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-2xl text-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-6 h-6" /> ULANGI
        </button>
      )}
    </div>
  );
}