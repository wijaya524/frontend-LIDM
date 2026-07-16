"use client";

import React, { useEffect } from "react";
import { useLearning } from "../../context/LearningContext";
import { useActivityTracker } from "../../utils/useActivityTracker";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import BentukGame from "../../components/bentuk";

import ActivityStartScreen from "../../components/ActivityStartScreen";

export default function MengenalBentukPage() {
  const { speechRate, markActivityCompleted, speak } = useLearning();
  
  const {
    isStarted,
    startActivity,
    startNewTask,
    trackTaskAction
  } = useActivityTracker("bentuk");

  const handleStartGame = () => {
    startActivity();
    speak("Mengenal bentuk! Silakan pilih bentuk yang tersedia.");
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 dark:bg-slate-950 select-none pb-12 w-full">
      <Header />
      <BackButton href="/bermain/kognitif" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto">
        {!isStarted ? (
          <ActivityStartScreen
            title="Siap belajar Mengenal Bentuk?"
            onStart={handleStartGame}
          />
        ) : (
          <BentukGame
            speechRate={speechRate}
            onComplete={() => markActivityCompleted("bentuk")}
            startNewTask={startNewTask}
            trackTaskAction={trackTaskAction}
          />
        )}
      </section>
    </main>
  );
}
