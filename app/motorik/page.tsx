"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useLearning } from "../context/LearningContext";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function MotorikSubmenuPage() {
  const { playSynth, speak, completedActivities } = useLearning();

  useEffect(() => {
    speak(
      "Latihan Motorik. Ayo menjiplak kupu-kupu, bermain balon, atau menata keranjang!"
    );
  }, [speak]);

  const items = [
    {
      href: "/bermain/motorik/menjiplak-garis",
      key: "menjiplak",
      title: "Menjiplak Garis",
      icon: "✏️",
      color: "bg-sky-100",
      tts: "",
      cardColor: "bg-gradient-to-r from-sky-400 to-cyan-500",
      Border: "border-sky-200",
    },
    {
      href: "/bermain/motorik/menyentuh-balon",
      key: "menyentuh",
      title: "Menyentuh Balon",
      icon: "🎈",
      color: "bg-rose-100",
      tts: "",
      cardColor: "bg-gradient-to-r from-pink-400 to-rose-500",
      Border: "bg-rose-200",
    },
    {
      href: "/bermain/motorik/memilah-sampah",
      key: "menyeret",
      title: "Memilah Sampah",
      icon: "🗑️",
      color: "bg-indigo-100",
      tts: "",
      cardColor: "bg-gradient-to-r from-indigo-400 to-violet-500",
      Border: "bg-indigo-200",
    },
  ];

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 dark:bg-slate-950 pb-12">
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
        <h2 className="text-4xl font-black text-sky-950 dark:text-sky-100 mb-8 text-center">
          Latihan Motorik
        </h2>

        <div className="flex flex-col gap-5 w-full">
          {items.map((item, idx) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => {
                playSynth("bubble");
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 * idx,
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
                  className={`
                    cursor-pointer
                    rounded-3xl
                    border-4
                    ${item.Border}
                    ${item.cardColor}
                    shadow-md
                  `}
                >
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-5">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color} text-4xl`}
                      >
                        {item.icon}
                      </div>

                      <div>
                        <h3 className="text-3xl font-black text-white">
                          {item.title}
                        </h3>

                        <p className="text-base text-white">
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
                        <Image
                          src="/star.svg"
                          alt="Bintang"
                          width={42}
                          height={42}
                          priority
                        />
                      </motion.span>
                    ) : (
                      <span className="text-3xl text-slate-400">
                        
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