"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Moon, Sun, Music } from "lucide-react";
import { useLearning } from "../context/LearningContext";
import { toast } from "sonner";

export default function PengaturanAplikasi() {
  const { resetActivities, playSynth, backsound, setBacksound } = useLearning();
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleDarkMode = () => {
    playSynth("bubble");
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (root.classList.contains("dark")) {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDark(false);
        toast.info("Tema terang aktif! ☀️", {
          className: "font-fredoka text-lg font-bold rounded-2xl border-2 border-sky-200 bg-sky-50 text-sky-700 shadow-md",
          duration: 1500
        });
      } else {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDark(true);
        toast.info("Tema gelap aktif! 🌙", {
          className: "font-fredoka text-lg font-bold rounded-2xl border-2 border-slate-700 bg-slate-900 text-slate-100 shadow-md",
          duration: 1500
        });
      }
    }
  };

  const handleReset = () => {
    playSynth("victory");
    resetActivities();
    toast.success("Kemajuan belajar berhasil di-reset! 🔄", {
      className: "font-fredoka text-lg font-bold rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 shadow-md",
      duration: 2000
    });
    setShowConfirmReset(false);
  };

  return (
    <div className="w-full max-w-xl flex flex-col p-4">
      <h3 className="text-3xl font-black text-sky-950 dark:text-sky-100 mb-8 text-center font-sans">
        Pengaturan Aplikasi 
      </h3>

      {/* SECTION 1: Mode Gelap */}
      <div className="w-full mb-8">
        <label className="block text-xl font-black text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
          {isDark ? <Moon className="w-6 h-6 text-indigo-400" /> : <Sun className="w-6 h-6 text-amber-500" />} Mode Tampilan:
        </label>
        <Button
          onClick={toggleDarkMode}
          variant="ghost"
          className={`btn-tactile w-full py-6 px-6 border-4 rounded-2xl text-2xl font-black cursor-pointer shadow-md h-auto flex items-center justify-center gap-3 ${
            isDark
              ? "bg-slate-800 border-slate-700 text-slate-100 dark:hover:bg-slate-700 hover:bg-slate-700"
              : "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
          }`}
        >
          {isDark ? (
            <>
              <span>🌙 TEMA GELAP</span>
            </>
          ) : (
            <>
              <span>☀️ TEMA TERANG</span>
            </>
          )}
        </Button>
      </div>

      {/* SECTION 2: Musik Latar */}
      <div className="w-full mb-8">
        <label className="block text-xl font-black text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
          <Music className="w-6 h-6 text-sky-500" /> Musik Latar (Backsound):
        </label>
        <div className="relative">
          <select
            value={backsound}
            onChange={(e) => {
              playSynth("bubble");
              setBacksound(e.target.value);
              toast.success("Musik latar berhasil diubah! 🎵", {
                className: "font-fredoka text-lg font-bold rounded-2xl border-2 border-sky-200 bg-sky-50 text-sky-700 shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
                duration: 1500
              });
            }}
            className="w-full py-4 px-5 bg-white dark:bg-slate-800 border-4 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-2xl text-xl font-extrabold text-slate-700 dark:text-slate-200 shadow-md cursor-pointer outline-none transition-colors appearance-none"
          >
            <option value="Playful-Mood-backsound">Playful Mood (Utama) 🎈</option>
            <option value="give-me-a-smile">Give Me a Smile 😊</option>
            <option value="happy-and-joyful-children">Happy & Joyful Children ☀️</option>
            <option value="none">Matikan Musik 🔇</option>
          </select>
          <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-bold text-xs">
            ▼
          </div>
        </div>
      </div>

      <hr className="border-t-4 border-sky-100 dark:border-slate-800 my-4" />

      {/* SECTION 2: Reset Kemajuan */}
      <div className="w-full mt-4">
        <label className="block text-xl font-black text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
          <RotateCcw className="w-6 h-6 text-red-500" /> Atur Ulang Kemajuan:
        </label>

        <Button
          onClick={() => {
            playSynth("wobble");
            setShowConfirmReset(true);
          }}
          variant="ghost"
          className="btn-tactile w-full py-5 px-6 bg-red-50 hover:bg-red-100/50 dark:bg-red-950/20 dark:hover:bg-red-950/40 border-4 border-red-200 dark:border-red-900 rounded-2xl text-xl font-black text-red-700 dark:text-red-400 cursor-pointer shadow-md h-auto"
        >
          RESET BINTANG & KEMAJUAN
        </Button>

        {showConfirmReset && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[32px] border-4 border-red-300 dark:border-red-900 shadow-2xl p-6 md:p-8 relative flex flex-col items-center text-center animate-in zoom-in duration-350">
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 rounded-t-[28px]" />
              
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-950/50 text-3xl mb-4">
                ⚠️
              </div>

              <h3 className="text-2xl font-black text-sky-950 dark:text-sky-100 mb-2">
                Hapus Semua Bintang?
              </h3>

              <p className="text-base text-slate-600 dark:text-slate-400 font-bold mb-6 leading-relaxed">
                Apakah kamu yakin ingin menghapus semua bintang prestasi? Tindakan ini tidak bisa dibatalkan!
              </p>

              <div className="flex gap-4 w-full">
                <Button
                  onClick={handleReset}
                  className="btn-tactile flex-1 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl text-lg font-black cursor-pointer shadow-md h-auto border-b-4 border-red-700"
                >
                  YA
                </Button>
                <Button
                  onClick={() => {
                    playSynth("bubble");
                    setShowConfirmReset(false);
                  }}
                  className="btn-tactile flex-1 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl text-lg font-black cursor-pointer shadow-md h-auto border-b-4 border-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-slate-900 dark:hover:border-slate-800"
                >
                  BATAL 
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
