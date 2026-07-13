"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLearning } from "../context/LearningContext";
import { useActivityTracker } from "../utils/useActivityTracker";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import TebakGambarGame from "../components/tebak-gambar";

import ActivityStartScreen from "../components/ActivityStartScreen";

export default function TebakGambarPage() {
  const { speechRate, markActivityCompleted, speak } = useLearning();
  const router = useRouter();
  
  const {
    isStarted,
    startActivity,
    startNewTask,
    trackTaskAction,
    incrementWrongAnswers
  } = useActivityTracker("tebak-gambar");

  useEffect(() => {
    speak("Ayo tebak gambar benda!");
  }, [speak]);

  const handleStartGame = () => {
    startActivity();
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/bermain"  />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto">
        {!isStarted ? (
          <ActivityStartScreen
            title="Siap bermain Tebak Gambar?"
            onStart={handleStartGame}
          />
        ) : (
          <TebakGambarGame
            speechRate={speechRate}
            onComplete={() => markActivityCompleted("tebak-gambar")}
            onBackToMenu={() => {
              router.push("/bermain");
            }}
            incrementWrongAnswers={incrementWrongAnswers}
            startNewTask={startNewTask}
            trackTaskAction={trackTaskAction}
          />
        )}
      </section>
    </main>
  );
}
