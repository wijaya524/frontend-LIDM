"use client";

import React, { useEffect } from "react";
import { useLearning } from "../../context/LearningContext";
import { useActivityTracker } from "../../utils/useActivityTracker";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import MenjiplakGame from "../../components/menjiplak";

import ActivityStartScreen from "../../components/ActivityStartScreen";

export default function MenjiplakGarisPage() {
  const { speechRate, markActivityCompleted, speak } = useLearning();
  
  const {
    isStarted,
    startActivity,
    startNewTask,
    trackTaskAction
  } = useActivityTracker("menjiplak");

  const handleStartGame = () => {
    startActivity();
    speak("Bantu Kupu-kupu Hinggap di Bunga! Silakan seret kupu-kupu mengikuti garis.");
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/motorik" ttsText="Kembali ke latihan motorik" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto">
        {!isStarted ? (
          <ActivityStartScreen
            title="Siap bermain Bantu Kupu-kupu?"
            onStart={handleStartGame}
          />
        ) : (
          <MenjiplakGame
            speechRate={speechRate}
            onComplete={() => markActivityCompleted("menjiplak")}
            startNewTask={startNewTask}
            trackTaskAction={trackTaskAction}
          />
        )}
      </section>
    </main>
  );
}
