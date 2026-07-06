"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useLearning } from "../context/LearningContext";
import Header from "../components/Header";
import BackButton from "../components/BackButton";

export default function MotorikSubmenuPage() {
  const { playSynth, speak, completedActivities } = useLearning();

  useEffect(() => {
    speak("Latihan Motorik. Ayo menjiplak kupu-kupu, bermain balon, atau menata keranjang!");
  }, [speak]);

  const items = [
    { href: "/motorik/menjiplak-garis", key: "menjiplak", title: "Menjiplak Garis ✏️", tts: "Silakan bantu kupu-kupu hinggap di bunga dengan menjiplak garis" },
    { href: "/motorik/menyentuh-balon", key: "menyentuh", title: "Menyentuh Balon 🎈", tts: "Mulai memecahkan balon-balon" },
    { href: "/motorik/memilah-sampah", key: "menyeret", title: "Memilah sampah 🗑️", tts: "Buang sampah pada tempatnya" }
  ];

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/" ttsText="Kembali ke menu utama" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-xl mx-auto">
        <h2 className="text-4xl font-black text-sky-950 mb-6 text-center">
          Latihan Motorik 🖐️
        </h2>

        <div className="flex flex-col gap-5 w-full">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => {
                playSynth("bubble");
                speak(item.tts);
              }}
              className="btn-tactile p-6 bg-white border-4 border-sky-100 hover:bg-slate-50 rounded-3xl text-2xl font-black text-slate-800 text-left flex items-center justify-between cursor-pointer"
            >
              <span>{item.title}</span>
              {completedActivities[item.key] && (
                <span className="text-3xl animate-bounce">⭐</span>
              )}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
