"use client";

import React, { useEffect } from "react";
import { useLearning } from "../context/LearningContext";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import LaporanGame from "../components/laporan";

export default function LaporanPage() {
  const { completedActivities, speak } = useLearning();

  useEffect(() => {
    speak("Lihat koleksi bintang prestasimu!");
  }, []);

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/" ttsText="Kembali ke menu utama" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto">
        <LaporanGame completedActivities={completedActivities} />
      </section>
    </main>
  );
}
