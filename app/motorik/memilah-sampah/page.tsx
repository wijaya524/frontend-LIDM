"use client";

import React, { useCallback } from "react";
import { useLearning } from "../../context/LearningContext";
import { useActivityTracker } from "../../utils/useActivityTracker";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import MenyeretGame from "../../components/menyeret";
import ActivityStartScreen from "../../components/ActivityStartScreen";

export default function MenyeretBuahPage() {
  const { speechRate, markActivityCompleted, speak } = useLearning();

  const handleComplete = useCallback(() => {
  markActivityCompleted("menyeret");
}, [markActivityCompleted]);
  
  const {
    isStarted,
    startActivity,
    startNewTask,
    trackTaskAction
  } = useActivityTracker("menyeret");

  const handleStartGame = () => {
    startActivity();
    speak("Memilah sampah! pilah sampah pada tempatnya.");
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/bermain/motorik" ttsText="Kembali ke latihan motorik" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto">
        {!isStarted ? (
          <ActivityStartScreen
            title="Siap belajar Memilah Sampah?"
            onStart={handleStartGame}
          />
        ) : (
          <MenyeretGame
            speechRate={speechRate}
            onComplete={handleComplete}
            startNewTask={startNewTask}
            trackTaskAction={trackTaskAction}
          />
        )}
      </section>
    </main>
  );
}
