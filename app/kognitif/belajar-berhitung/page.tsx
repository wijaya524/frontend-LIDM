"use client";

import React, { useEffect } from "react";
import { useLearning } from "../../context/LearningContext";
import { useActivityTracker } from "../../utils/useActivityTracker";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import AngkaGame from "../../components/angka";

import ActivityStartScreen from "../../components/ActivityStartScreen";

export default function BelajarBerhitungPage() {
  const { speechRate, markActivityCompleted, speak } = useLearning();
  
  const {
    isStarted,
    startActivity,
    startNewTask,
    trackTaskAction
  } = useActivityTracker("angka");

  const handleStartGame = () => {
    startActivity();
    speak("Belajar berhitung! Ayo hitung jumlah buah-buahan yang muncul.");
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/kognitif" ttsText="Kembali ke latihan kognitif" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto">
        {!isStarted ? (
          <ActivityStartScreen
            title="Siap belajar Belajar Berhitung?"
            onStart={handleStartGame}
          />
        ) : (
          // <AngkaGame
          //   speechRate={speechRate}
          //   onComplete={() => markActivityCompleted("angka")}
          //   startNewTask={startNewTask}
          //   trackTaskAction={trackTaskAction}
          // />
        )}
      </section>
    </main>
  );
}
