"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLearning } from "../context/LearningContext";
import { useActivityTracker } from "../utils/useActivityTracker";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import TebakSuaraGame from "../components/tebak-suara";
import { Play } from "lucide-react"; // Pastikan Anda sudah mengimpor ikon ini

export default function TebakSuaraPage() {
  const { speechRate, markActivityCompleted, speak } = useLearning();
  const router = useRouter();
  
  const {
    isStarted,
    startActivity,
    startNewTask,
    trackTaskAction,
    incrementWrongAnswers,
    incrementHints
  } = useActivityTracker("tebak-suara");

  useEffect(() => {
    speak("Mari tebak suara hewan!");
  }, [speak]);

  // Fungsi ini dipanggil saat anak menyentuh layar
  const handleStartGame = () => {
    startActivity(); // Ganti state untuk memunculkan game
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/bermain"  />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto h-full mt-10">
    
        {!isStarted ? (
          <div className="flex flex-col items-center justify-center bg-white p-10 rounded-[36px] shadow-xl border-4 border-sky-100 text-center animate-in fade-in zoom-in duration-500">
            <h2 className="text-3xl md:text-4xl font-black text-sky-950 mb-8">
              Siap Bermain Tebak Suara? 
            </h2>
            <button
              onClick={handleStartGame}
              className="btn-tactile flex items-center justify-center gap-3 bg-emerald-400 hover:bg-emerald-500 text-white py-6 px-12 rounded-full text-3xl font-black border-b-8 border-emerald-600 cursor-pointer transition-transform hover:scale-105 shadow-lg"
            >
              <Play className="w-10 h-10 fill-current" />
              MULAI MAIN
            </button>
          </div>
          
        ) : (
          
          <TebakSuaraGame
            speechRate={speechRate}
            onComplete={() => markActivityCompleted("tebak-suara")}
            onBackToMenu={() => {
              router.push("/bermain");
            }}
            incrementWrongAnswers={incrementWrongAnswers}
            incrementHints={incrementHints}
            startNewTask={startNewTask}
            trackTaskAction={trackTaskAction}
          />
          
        )}
        
      </section>
    </main>
  );
}