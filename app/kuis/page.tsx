"use client";

import React, { useEffect } from "react";
import { useLearning } from "../context/LearningContext";
import { useActivityTracker } from "../utils/useActivityTracker";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import KuisGame from "../components/kuis";

import ActivityStartScreen from "../components/ActivityStartScreen";

export default function KuisPage() {
  const { speechRate, markActivityCompleted, speak } = useLearning();
  
  const {
    isStarted,
    startActivity,
    startNewTask,
    trackTaskAction,
    incrementWrongAnswers,
    incrementHints
  } = useActivityTracker("kuis");

  const handleStartGame = () => {
    startActivity();
    speak("Ayo kerjakan kuis bintang pintar! Jawab pertanyaan dengan benar.");
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/" ttsText="Kembali ke menu utama" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto">
        {!isStarted ? (
          <ActivityStartScreen
            title="Siap bermain Kuis Bintang Pintar?"
            onStart={handleStartGame}
          />
        ) : (
          <KuisGame
            speechRate={speechRate}
            onComplete={() => markActivityCompleted("kuis")}
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
