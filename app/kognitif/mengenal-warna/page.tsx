"use client";

import React, { useEffect } from "react";
import { useLearning } from "../../context/LearningContext";
import { useActivityTracker } from "../../utils/useActivityTracker";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import WarnaGame from "../../components/warna";

import ActivityStartScreen from "../../components/ActivityStartScreen";

export default function MengenalWarnaPage() {
  const { speechRate, markActivityCompleted, speak } = useLearning();
  
  const {
    isStarted,
    startActivity,
    startNewTask,
    trackTaskAction
  } = useActivityTracker("warna");

  const handleStartGame = () => {
    startActivity();
    speak("Mengenal warna! Silakan pilih warna kesukaanmu.");
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/bermain/kognitif" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto">
        {!isStarted ? (
          <ActivityStartScreen
            title="Siap belajar Mengenal Warna?"
            onStart={handleStartGame}
          />
        ) : (
          <WarnaGame
            speechRate={speechRate}
            onComplete={() => markActivityCompleted("warna")}
            startNewTask={startNewTask}
            trackTaskAction={trackTaskAction}
          />
        )}
      </section>
    </main>
  );
}
