"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HelpCircle, Info, Menu, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import PanduanGuru from "./components/panduan";
import TentangAplikasi from "./components/tentang";
import ProfilAnak from "./components/profil";
import LaporanGame from "./components/laporan";
import PengaturanAplikasi from "./components/setting";
import { useLearning } from "./context/LearningContext";



export default function DashboardPage() {
  const {
    playSynth,
    speak,
    childName,
    childAvatar,
    setChildName,
    setChildAvatar,
    completedActivities,
  } = useLearning();

  const totalStars = Object.values(completedActivities).filter(Boolean).length;
  const maxStars = Object.keys(completedActivities).length;

  const [activeTab, setActiveTab] = useState<"bermain" | "profil" | "pencapaian" | "setting">("bermain");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showTeacherGuide, setShowTeacherGuide] = useState<boolean>(false);
  const [showAboutApp, setShowAboutApp] = useState<boolean>(false);

  // Welcome speech greeting on mount & parsing search parameters / pathnames
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (pathname === "/profil") {
        setActiveTab("profil");
      } else if (pathname === "/pencapaian") {
        setActiveTab("pencapaian");
      } else if (pathname === "/setting") {
        setActiveTab("setting");
      } else {
        setActiveTab("bermain");
      }

      // Fallback support for old ?tab query params
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "profil") {
        setActiveTab("profil");
        window.history.replaceState(null, "", "/profil");
      } else if (tab === "pencapaian") {
        setActiveTab("pencapaian");
        window.history.replaceState(null, "", "/pencapaian");
      } else if (tab === "setting") {
        setActiveTab("setting");
        window.history.replaceState(null, "", "/setting");
      }
    }
  }, [speak]);


  // Dashboard Card list configuration
  const dashboardCards = [
    {
      key: "kognitif",
      href: "/bermain/kognitif",
      title: "KOGNITIF",
      desc: "Belajar Warna, Bentuk & Angka",
      bg: "bg-purple-400 hover:bg-purple-500 border-purple-600",
      icon: '/icons/kognitif.webp',
      tts: "Latihan Kognitif. Ayo pilih warna, bentuk, atau angka!"
    },
    {
      key: "motorik",
      href: "/bermain/motorik",
      title: "MOTORIK HALUS",
      desc: "Menjiplak, Menyentuh & Menyeret",
      bg: "bg-emerald-500 hover:bg-emerald-600 border-emerald-700",
      icon: '/icons/motorik.webp',
      tts: "Latihan Motorik. Ayo menjiplak kupu-kupu, bermain balon, atau menata keranjang!"
    },

    {
      key: "mengeja",
      href: "/bermain/mengeja",
      title: "MENGEJA KATA",
      desc: "Eja Huruf-Huruf Bergambar",
      bg: "bg-pink-400 hover:bg-pink-500 border-pink-600",
      icon: '/icons/mengeja-kata.webp',
      tts: "Ayo mengeja kata benda!"
    },
    {
      key: "kuis",
      href: "/bermain/kuis",
      title: "KUIS PINTAR",
      desc: "Uji Pemahaman Bentuk & Warna",
      bg: "bg-amber-400 hover:bg-amber-500 border-amber-600",
      icon: '/icons/kuis.webp',
      tts: "Ayo kerjakan kuis bintang pintar!"
    },
    {
      key: "tebak-suara",
      href: "/bermain/tebak-suara",
      title: "TEBAK SUARA",
      desc: "Mencocokkan Suara Hewan",
      bg: "bg-indigo-500 hover:bg-indigo-600 border-indigo-700",
      icon: '/icons/tebak-suara.webp',
      tts: "Mari tebak suara hewan!"
    },
    {
      key: "tebak-gambar",
      href: "/bermain/tebak-gambar",
      title: "TEBAK GAMBAR",
      desc: "Cari Gambar yang Tepat",
      bg: "bg-teal-400 hover:bg-teal-500 border-teal-600",
      icon: '/icons/tebak-gambar.webp',
      tts: "Ayo tebak gambar benda!"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-sky-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans relative w-full overflow-x-hidden">

      {/* Mobile Top Header: only shown on sm and below */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b-4 border-sky-100 dark:border-slate-800 flex items-center justify-between px-4 z-30 shadow-sm select-none w-full">
        <div className="flex items-center gap-1">
          <div className="relative w-18 h-18 shrink-0">
            <Image
              src="/icon1.ico"
              alt="Logo APHI"
              fill
              className="object-contain rounded-[24px]"
            />
          </div>
          <h1 className="text-5xl font-nunito font-black text-sky-950 dark:text-sky-100 tracking-normal -ml-1">
            APHI
          </h1>
        </div>
        <Button
          onClick={() => setIsSidebarOpen(true)}
          variant="ghost"
          className="btn-tactile p-2 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl"
        >
          <Menu className="w-6 h-6 text-sky-950 dark:text-sky-100" />
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 md:hidden",
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-40 w-64 md:w-72 bg-white dark:bg-slate-900 border-r-4 border-sky-100 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 select-none h-screen shrink-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >

        {/* Top: Logo & Title */}
        <div className="p-6 border-b-4 border-sky-50 dark:border-slate-800 flex items-center justify-center relative">
          <Button
            onClick={() => setIsSidebarOpen(false)}
            variant="ghost"
            className="md:hidden absolute top-4 right-4 btn-tactile p-2 border border-slate-100 dark:border-slate-800 rounded-full"
          >
            <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </Button>

          <div className="relative w-18 h-18 shrink-0 ">
            <Image
              src="/icon1.ico"
              alt="Logo APHI"
              fill
              className="object-contain rounded-[24px]"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-nunito font-extrabold text-sky-950 dark:text-sky-100 tracking-wide -ml-2">APHI</h1>
        </div>

        {/* Middle: Navigation Items */}
        <nav className="flex-1 px-4 py-8 flex flex-col gap-4 overflow-hidden">
          {[
            { id: "bermain", label: "Bermain", tts: "Mari bermain dan belajar seru!", iconSrc: "/game.svg" },
            { id: "profil", label: "Profil", tts: "Ubah nama panggilanmu di sini!", iconSrc: "/profile.svg" },
            { id: "pencapaian", label: "Pencapaian", tts: "Lihat koleksi bintang prestasi yang sudah kamu kumpulkan!", iconSrc: "/trophy.svg" },
            { id: "setting", label: "Setting", tts: "Atur kecepatan suara dan kelola data belajar di sini!", iconSrc: "/settings.svg" }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                onClick={() => {
                  playSynth("bubble");
                  setActiveTab(tab.id as any);
                  setIsSidebarOpen(false);
                  if (typeof window !== "undefined") {
                    window.history.pushState(null, "", "/" + tab.id);
                  }
                }}
                variant="ghost"
                className={cn(
                  "btn-tactile w-full py-6 px-6 text-xl font-extrabold flex justify-start items-center gap-4 cursor-pointer shadow-sm h-auto border-b-4",
                  isActive
                    ? "bg-sky-500 hover:bg-sky-600 dark:bg-sky-500 dark:hover:bg-sky-600 text-white border-sky-600 rounded-2xl hover:text-white"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl"
                )}
              >
                <div className="w-8 h-8 relative flex items-center justify-center shrink-0">
                  <Image
                    src={tab.iconSrc}
                    alt={tab.label}
                    fill
                    className="object-contain transition-all duration-300"
                  />
                </div>
                <span>{tab.label}</span>
              </Button>
            );
          })}
        </nav>

        <div className="p-6 border-t-4 border-sky-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-lg font-black text-sky-950 dark:text-sky-100">Bintang Saya</span>
            </div>
            <span className="text-lg font-black text-sky-700 dark:text-sky-400">
              {totalStars} / {maxStars}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-4 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 shadow-inner">
            <div
              className="bg-linear-to-r from-amber-400 to-yellow-500 h-full rounded-full transition-all duration-500 shadow-md"
              style={{ width: `${(totalStars / (maxStars || 1)) * 100}%` }}
            />
          </div>
        </div>
      </aside>


      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto pt-16 md:pt-0 w-full md:ml-72">
        <main className="flex-1 flex flex-col p-6 md:p-8 w-full max-w-7xl mx-auto">
          {activeTab === "bermain" && (
            <section className="flex-1 flex flex-col items-center justify-center w-full py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {dashboardCards.map((card) => (
                  <Link
                    key={card.key}
                    href={card.href}
                    onClick={() => {
                      playSynth("bubble");
                    }}
                    className="block w-full h-full cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Card
                      className={cn(
                        "btn-tactile rounded-[32px]  p-6 text-left flex flex-col justify-start h-90 w-full shadow-md hover:shadow-xl transition-all duration-300 border-4",
                        `${card.bg} border-black/10`
                      )}
                    >
                      <div className="relative w-full h-36 rounded-2xl mb-4 bg-white/20 shrink-0 overflow-hidden">
                        <Image
                          src={card.icon}
                          alt={card.title}
                          fill
                          className="object-cover rounded-2xl"
                        />
                      </div>
                      <div className="flex flex-col justify-start">
                        <div className="h-20 flex items-center mb-2">
                          <span className="text-2xl md:text-3xl font-black tracking-wide block text-white leading-tight">
                            {card.title}
                          </span>
                        </div>
                        <span className="text-sm md:text-base font-bold block text-sky-100 opacity-90 leading-snug">
                          {card.desc}
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {activeTab === "profil" && (
            <section className="flex-1 flex flex-col items-center justify-center w-full py-4">
              <ProfilAnak
                initialName={childName}
                initialAvatar={childAvatar}
                onSave={(name, avatar) => {
                  playSynth("victory");
                  setChildName(name);
                  setChildAvatar(avatar);
                  setActiveTab("bermain");
                }}
              />
            </section>
          )}

          {activeTab === "pencapaian" && (
            <section className="flex-1 flex flex-col items-center justify-center w-full py-4">
              <LaporanGame completedActivities={completedActivities} />
            </section>
          )}

          {activeTab === "setting" && (
            <section className="flex-1 flex flex-col items-center justify-center w-full py-4">
              <PengaturanAplikasi />
            </section>
          )}
        </main>

        <footer className="w-full text-center py-8 px-4 md:px-8 border-t-4 md:border-t border-sky-100 dark:border-slate-800 bg-white/30 dark:bg-slate-950/20 flex flex-col items-center gap-6 select-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
            {/* Left Card: Panduan Guru */}
            <button
              onClick={() => {
                playSynth("bubble");
                setShowTeacherGuide(true);
              }}
              className="flex items-center gap-4 p-5 bg-white dark:bg-[#0d1527] border-2 border-slate-250 dark:border-slate-800 hover:border-sky-300 dark:hover:border-slate-700 rounded-2xl text-left cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6 text-sky-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-800 dark:text-white leading-tight">Panduan Guru</span>
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500 mt-0.5">Untuk orang tua & guru</span>
              </div>
            </button>

            {/* Right Card: Tentang Aplikasi */}
            <button
              onClick={() => {
                playSynth("bubble");
                setShowAboutApp(true);
              }}
              className="flex items-center gap-4 p-5 bg-white dark:bg-[#0d1527] border-2 border-slate-250 dark:border-slate-800 hover:border-sky-300 dark:hover:border-slate-700 rounded-2xl text-left cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center shrink-0">
                <Info className="w-6 h-6 text-sky-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-800 dark:text-white leading-tight">Tentang Aplikasi</span>
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500 mt-0.5">Informasi aplikasi</span>
              </div>
            </button>
          </div>

          <div className="text-slate-400 dark:text-slate-500 text-sm font-extrabold tracking-wide">
            &copy; 2026 Belajar Mandiri. Dibuat dengan Kasih Sayang. 💙
          </div>
        </footer>
      </div>

      {showTeacherGuide && <PanduanGuru onClose={() => setShowTeacherGuide(false)} />}
      {showAboutApp && <TentangAplikasi onClose={() => setShowAboutApp(false)} />}
    </div>
  );
}
