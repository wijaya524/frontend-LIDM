"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useLearning } from "../context/LearningContext";
import Header from "../components/Header";
import BackButton from "../components/BackButton";

import { Card, CardContent } from "@/components/ui/card";

export default function MotorikSubmenuPage() {
  const { playSynth, speak, completedActivities } = useLearning();

  useEffect(() => {
    speak(
      "Latihan Motorik. Ayo menjiplak kupu-kupu, bermain balon, atau menata keranjang!"
    );
  }, [speak]);

  const items = [
    {
      href: "/motorik/menjiplak-garis",
      key: "menjiplak",
      title: "Menjiplak Garis",
      icon: "✏️",
      color: "bg-sky-100",
      tts: "Silakan bantu kupu-kupu hinggap di bunga dengan menjiplak garis",
    },
    {
      href: "/motorik/menyentuh-balon",
      key: "menyentuh",
      title: "Menyentuh Balon",
      icon: "🎈",
      color: "bg-pink-100",
      tts: "Mulai memecahkan balon-balon",
    },
    {
      href: "/motorik/memilah-sampah",
      key: "menyeret",
      title: "Memilah Sampah",
      icon: "🗑️",
      color: "bg-green-100",
      tts: "Buang sampah pada tempatnya",
    },
  ];

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 pb-12">
      <Header />
      <BackButton href="/" ttsText="Kembali ke menu utama" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-xl mx-auto">
        <h2 className="text-4xl font-black text-sky-950 mb-8 text-center">
          🖐️ Latihan Motorik
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
            >
              <Card
                className="
                  cursor-pointer
                  rounded-3xl
                  border-4
                  border-sky-100
                  bg-white
                  shadow-md
                  transition-all
                  duration-300
                  hover:shadow-xl
                  hover:scale-[1.02]
                  active:scale-95
                "
              >
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-5">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color} text-4xl`}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="text-3xl font-black text-slate-800">
                        {item.title}
                      </h3>

                      <p className="text-base text-slate-500">
                        Ketuk untuk mulai
                      </p>
                    </div>
                  </div>

                  {completedActivities[item.key] ? (
                    <span className="text-4xl animate-bounce">⭐</span>
                  ) : (
                    <span className="text-3xl text-slate-400">➜</span>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}