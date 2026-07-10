"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useLearning } from "../context/LearningContext";
import Header from "../components/Header";
import BackButton from "../components/BackButton";

import { Card, CardContent } from "@/components/ui/card";

export default function VideoSubmenuPage() {
  const { playSynth, speak } = useLearning();

  useEffect(() => {
    speak("Video Belajar. Tonton cerita kognitif atau senam jari!");
  }, [speak]);

  const items = [
    {
      href: "/video/mengenal-lingkaran",
      key: "video-kognitif",
      title: "Mengenal Lingkaran",
      icon: "🔵",
      color: "bg-blue-100",
      tts: "Menonton video kognitif bentuk lingkaran",
    },
    {
      href: "/video/senam-jari",
      key: "video-motorik",
      title: "Latihan Gerak Senam Jari",
      icon: "🖐️",
      color: "bg-orange-100",
      tts: "Menonton video gerakan senam jari tangan",
    },
  ];

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 pb-12">
      <Header />
      <BackButton href="/" ttsText="Kembali ke menu utama" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-xl mx-auto">
        <h2 className="text-4xl font-black text-sky-950 mb-8 text-center">
          📺 Video Belajar Cerita
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
                      <h3 className="text-2xl font-black text-slate-800">
                        {item.title}
                      </h3>

                      <p className="text-base text-slate-500">
                        Ketuk untuk menonton
                      </p>
                    </div>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white text-xl shadow-md">
                    ▶
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}