"use client";

import React, { useEffect } from "react";
import { useLearning } from "../../context/LearningContext";
import { useActivityTracker } from "../../utils/useActivityTracker";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import MenyentuhGame from "../../components/menyentuh";

import ActivityStartScreen from "../../components/ActivityStartScreen";

export default function MenyentuhBalonPage() {
  const { speechRate, markActivityCompleted, speak } = useLearning();
  
  const {
    isStarted,
    startActivity,
    startNewTask,
    trackTaskAction
  } = useActivityTracker("menyentuh");

  const handleStartGame = () => {
    startActivity();
    speak("Ketuk dan Pecahkan Balon! Ayo ketuk balon-balon yang terbang.");
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/bermain/motorik" ttsText="Kembali ke latihan motorik" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto">
        {!isStarted ? (
          <ActivityStartScreen
            title="Siap bermain Pecahkan Balon?"
            onStart={handleStartGame}
          />
        ) : (
          <MenyentuhGame
            speechRate={speechRate}
            onComplete={() => markActivityCompleted("menyentuh")}
            startNewTask={startNewTask}
            trackTaskAction={trackTaskAction}
          />
        )}
      </section>
    </main>
  );
}
