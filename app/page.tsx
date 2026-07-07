"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Brain,
  Hand,
  Tv,
  Trophy,
  User,
  BarChart3,
  Volume2,
  MessageCircle,
  HelpCircle,
  Star,
  Info
} from "lucide-react";

import { PandaAvatar } from "./illustrations";
import Header from "./components/Header";
import PanduanGuru from "./components/panduan";
import TentangAplikasi from "./components/tentang";
import { useLearning } from "./context/LearningContext";

export default function DashboardPage() {
  const { playSynth, speak } = useLearning();
  const [view, setView] = useState<"splash" | "dashboard">("splash");
  const [splashProgress, setSplashProgress] = useState<number>(0);
  const [showTeacherGuide, setShowTeacherGuide] = useState<boolean>(false);
  const [showAboutApp, setShowAboutApp] = useState<boolean>(false);

  // Splash Screen progress timer
  useEffect(() => {
    if (view === "splash") {
      const interval = setInterval(() => {
        setSplashProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setView("dashboard");
              speak("Selamat datang di aplikasi belajar seru! Ayo pilih permainan yang kamu suka!");
            }, 800);
            return 100;
          }
          return prev + 5;
        });
      }, 90);
      return () => clearInterval(interval);
    }
  }, [speak, view]);

  // Dashboard Card list configuration
  const dashboardCards = [
    {
      key: "kognitif",
      href: "/kognitif",
      title: "KOGNITIF",
      desc: "Belajar Warna, Bentuk & Angka",
      bg: "bg-purple-400 hover:bg-purple-500 border-purple-600",
      icon: '/icons/kognitif.jpg',
      tts: "Latihan Kognitif. Ayo pilih warna, bentuk, atau angka!"
    },
    {
      key: "motorik",
      href: "/motorik",
      title: "MOTORIK HALUS",
      desc: "Menjiplak, Menyentuh & Menyeret",
      bg: "bg-emerald-500 hover:bg-emerald-600 border-emerald-700",
      icon: '/icons/motorik.jpg',
      tts: "Latihan Motorik. Ayo menjiplak kupu-kupu, bermain balon, atau menata keranjang!"
    },
    {
      key: "video",
      href: "/video",
      title: "VIDEO CERITA",
      desc: "Cerita Interaktif & Senam Jari",
      bg: "bg-rose-500 hover:bg-rose-600 border-rose-700",
      icon: '/icons/video.jpg',
      tts: "Video Belajar. Tonton cerita kognitif atau senam jari!"
    },
    {
      key: "mengeja",
      href: "/mengeja",
      title: "MENGEJA KATA",
      desc: "Eja Huruf-Huruf Bergambar",
      bg: "bg-pink-400 hover:bg-pink-500 border-pink-600",
      icon: '/icons/mengeja-kata.jpg',
      tts: "Ayo mengeja kata benda!"
    },
    {
      key: "kuis",
      href: "/kuis",
      title: "KUIS PINTAR",
      desc: "Uji Pemahaman Bentuk & Warna",
      bg: "bg-amber-400 hover:bg-amber-500 border-amber-600",
      icon: '/icons/kuis.jpg',
      tts: "Ayo kerjakan kuis bintang pintar!"
    },
    {
      key: "tebak-suara",
      href: "/tebak-suara",
      title: "TEBAK SUARA",
      desc: "Mencocokkan Suara Hewan",
      bg: "bg-indigo-500 hover:bg-indigo-600 border-indigo-700",
      icon: '/icons/tebak-suara.jpg',
      tts: "Mari tebak suara hewan!"
    },
    {
      key: "tebak-gambar",
      href: "/tebak-gambar",
      title: "TEBAK GAMBAR",
      desc: "Cari Gambar yang Tepat",
      bg: "bg-teal-400 hover:bg-teal-500 border-teal-600",
      icon: '/icons/tebak-gambar.jpg',
      tts: "Ayo tebak gambar benda!"
    },
    {
      key: "profil",
      href: "/profil",
      title: "PROFIL KU",
      desc: "Ubah Nama & Karakter Hewan",
      bg: "bg-white hover:bg-slate-50 border-4 border-sky-100 border-b-8 border-sky-200",
      icon: '/icons/profile.jpg',
      tts: "Pengaturan profil teman belajar",
      isWhite: true
    },
    {
      key: "laporan",
      href: "/laporan",
      title: "PRESTASI KU",
      desc: "Checklist Koleksi Bintang Pintar",
      bg: "bg-white hover:bg-slate-50 border-4 border-sky-100 border-b-8 border-sky-200",
      icon: '/icons/prestasi.jpg',
      tts: "Lihat koleksi bintang prestasimu!",
      isWhite: true
    }
  ];

  if (view === "splash") {
    return (
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-4 bg-sky-50 relative select-none">
        <div className="flex flex-col items-center max-w-md w-full text-center">
          <div className="w-40 h-40 bg-white border-4 border-sky-200 rounded-full flex items-center justify-center p-3 shadow-lg mb-8 animate-bounce">
            <PandaAvatar className="w-full h-full" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-sky-950 mb-3 tracking-wide">
            BELAJAR MANDIRI
          </h1>
          <p className="text-xl md:text-2xl font-bold text-slate-500 mb-8">
            Media Pembelajaran Interaktif
          </p>

          <div className="w-full bg-slate-200 h-8 rounded-full overflow-hidden p-1 shadow-inner border-2 border-slate-300 mb-4">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-100 ease-out"
              style={{ width: `${splashProgress}%` }}
            />
          </div>
          <span className="text-lg font-black text-emerald-600">
            Memuat Game... {splashProgress}%
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12">
      <Header />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-8 w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {dashboardCards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              onClick={() => {
                playSynth("bubble");
                speak(card.tts);
              }}
              className={`btn-tactile rounded-4xl p-6 text-left flex flex-col justify-between min-h-60 shadow-md cursor-pointer transition-all hover:-translate-y-1 ${card.isWhite
                ? "bg-white hover:bg-slate-50 border-4 border-sky-100 border-b-8"
                : card.bg
                }`}
            >
              <div
                className={`relative w-full h-32  rounded-2xl  mb-4 ${card.isWhite
                    ? "bg-sky-50 border border-sky-100"
                    : "bg-white/20"
                  }`}
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  fill
                  className="object-cover rounded-2xl "
                />
              </div>
              <div>
                <span className={`text-3xl font-black tracking-wide block ${card.isWhite ? "text-sky-950" : "text-white"
                  }`}>
                  {card.title}
                </span>
                <span className={`text-base font-bold mt-1 block ${card.isWhite ? "text-slate-500" : "text-sky-100 opacity-90"
                  }`}>
                  {card.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="w-full text-center mt-auto px-4 flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <button
            onClick={() => {
              playSynth("bubble");
              setShowTeacherGuide(true);
            }}
            className="text-slate-500 hover:text-sky-600 bg-white border-2 border-slate-200 px-4 py-2 rounded-xl text-lg font-bold flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <HelpCircle className="w-5 h-5 text-sky-500" /> Panduan Guru
          </button>

          <button
            onClick={() => {
              playSynth("bubble");
              setShowAboutApp(true);
            }}
            className="text-slate-500 hover:text-sky-600 bg-white border-2 border-slate-200 px-4 py-2 rounded-xl text-lg font-bold flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Info className="w-5 h-5 text-sky-500" /> Tentang Aplikasi
          </button>
        </div>

        <div className="text-slate-400 text-sm font-semibold tracking-wide mt-2">
          &copy; 2026 Belajar Mandiri. Dibuat dengan Kasih Sayang.
        </div>
      </footer>

      {showTeacherGuide && <PanduanGuru onClose={() => setShowTeacherGuide(false)} />}
      {showAboutApp && <TentangAplikasi onClose={() => setShowAboutApp(false)} />}
    </main>
  );
}
