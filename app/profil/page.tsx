"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLearning } from "../context/LearningContext";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import ProfilAnak from "../components/profil";

export default function ProfilPage() {
  const { speechRate, childName, childAvatar, setChildName, setChildAvatar, speak, playSynth } = useLearning();
  const router = useRouter();

  useEffect(() => {
    speak("Pengaturan profil teman belajar. Silakan ganti namamu atau teman hewanmu.");
  }, [speak]);

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-sky-50 select-none pb-12 w-full">
      <Header />
      <BackButton href="/" ttsText="Kembali ke menu utama" />

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full max-w-5xl mx-auto">
        <ProfilAnak
          speechRate={speechRate}
          initialName={childName}
          initialAvatar={childAvatar}
          onSave={(name, avatar) => {
            playSynth("victory");
            
            // PERBAIKAN: Langsung simpan nilai 'name' apa adanya, meskipun itu string kosong ("")
            setChildName(name); 
            
            setChildAvatar(avatar);
            speak("Profil berhasil disimpan!");
            router.push("/");
          }}
        />
      </section>
    </main>
  );
}