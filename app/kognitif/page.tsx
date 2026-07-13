"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useLearning } from "../context/LearningContext";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function KognitifSubmenuPage() {
  const { playSynth, speak, completedActivities } = useLearning();

  useEffect(() => {
    speak("Latihan Kognitif. Ayo pilih warna, bentuk, atau angka!");
  }, [speak]);

  const items = [
    {
      href: "/bermain/kognitif/mengenal-warna",
      key: "warna",
      title: "Mengenal Warna",
      icon: "🎨",
      tts: "",
    },
    {
      href: "/bermain/kognitif/mengenal-bentuk",
      key: "bentuk",
      title: "Mengenal Bentuk",
      icon: "📐",
      tts: "Mulai mengenal bentuk",
    },
    {
      href: "/bermain/kognitif/belajar-berhitung",
      key: "angka",
      title: "Belajar Berhitung",
      icon: "🔢",
      tts: "Mulai belajar berhitung angka",
    },
  ];

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 pb-12">
      <Header />
      <BackButton href="/bermain" />
      <motion.section
        className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-xl mx-auto"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >


        <h2 className="text-4xl font-black text-sky-950 mb-8 text-center">
          Latihan Kognitif
        </h2>

        <div className="flex flex-col gap-5 w-full">

          {items.map((item) => (

            <Link
              key={item.key}
              href={item.href}
              onClick={() => {
                playSynth("bubble");
              }}
            >
              <motion.div
                key={item.key}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.15 * items.indexOf(item),
                  duration: 0.4,
                }}
                whileHover={{
                  scale: 1.02,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
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
                  "
                >
                  <CardContent className="flex items-center justify-between p-6">

                    <div className="flex items-center gap-5">

                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-4xl">
                        {item.icon}
                      </div>

                      <div>
                        <h3 className="text-3xl font-black text-slate-800">
                          {item.title}
                        </h3>

                        <p className="text-slate-500 text-base">
                          Ketuk untuk mulai
                        </p>
                      </div>

                    </div>

                    {completedActivities[item.key] ? (
                      <motion.span
                        className="text-4xl"
                        animate={{
                          scale: [1, 1.12, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut",
                        }}
                      >
                        ⭐
                      </motion.span>
                    ) : (
                      <span className="text-3xl">
                        ➜
                      </span>
                    )}

                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>
    </main>
  );
}