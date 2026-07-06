"use client";

import React, { useEffect } from "react";
import { useLearning } from "../../context/LearningContext";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import VideoGame from "../../components/video";

export default function MengenalLingkaranPage() {
  const { speechRate, speak } = useLearning();

  useEffect(() => {
    speak("Menonton cerita kognitif bentuk lingkaran.");
  }, [speak]);

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/video" ttsText="Kembali ke video belajar" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto">
        <VideoGame
          speechRate={speechRate}
          videoType="kognitif"
        />
      </section>
    </main>
  );
}
