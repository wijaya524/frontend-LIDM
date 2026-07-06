"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLearning } from "../context/LearningContext";
import { useActivityTracker } from "../utils/useActivityTracker";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import MengejaGame from "../components/mengeja";

import ActivityStartScreen from "../components/ActivityStartScreen";

export default function MengejaPage() {
  const { speechRate, markActivityCompleted, speak } = useLearning();
  const router = useRouter();
  
  const {
    isStarted,
    startActivity,
    startNewTask,
    trackTaskAction,
    incrementHints
  } = useActivityTracker("mengeja");

  const handleStartGame = () => {
    startActivity();
    speak("Ayo mengeja kata benda!");
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/" ttsText="Kembali ke menu utama" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto">
        {!isStarted ? (
          <ActivityStartScreen
            title="Siap bermain Mengeja Kata?"
            onStart={handleStartGame}
          />
        ) : (
          <MengejaGame
            speechRate={speechRate}
            onComplete={() => markActivityCompleted("mengeja")}
            onBackToMenu={() => {
              router.push("/");
            }}
            incrementHints={incrementHints}
            startNewTask={startNewTask}
            trackTaskAction={trackTaskAction}
          />
        )}
      </section>
    </main>
  );
}
