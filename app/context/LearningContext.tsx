/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { registerUser, updateUser } from "../utils/api";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "../../components/ui/dialog";

interface LearningContextType {
  userId: string;
  childName: string;
  setChildName: (name: string) => void;
  childAvatar: "panda" | "kelinci" | "beruang";
  setChildAvatar: (avatar: "panda" | "kelinci" | "beruang") => void;
  completedActivities: Record<string, boolean>;
  markActivityCompleted: (key: string) => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  playSynth: (type: "bubble" | "victory" | "wobble" | "pop" | "wrong" | "meow" | "bark" | "elephant") => void;
  speak: (text: string) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>("");
  const [childName, setChildName] = useState<string>("");
  const [childAvatar, setChildAvatar] = useState<"panda" | "kelinci" | "beruang">("panda");
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({
    warna: false,
    bentuk: false,
    angka: false,
    menjiplak: false,
    menyentuh: false,
    menyeret: false,
    mengeja: false,
    "tebak-suara": false,
    "tebak-gambar": false,
    kuis: false,
  });

  // Celebration modal states
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationTitle, setCelebrationTitle] = useState("");

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("childName") || "";
      if (savedName) setChildName(savedName);

      const savedAvatar = localStorage.getItem("childAvatar");
      if (savedAvatar) setChildAvatar(savedAvatar as any);

      const savedProgress = localStorage.getItem("completedActivities");
      if (savedProgress) {
        try {
          setCompletedActivities(JSON.parse(savedProgress));
        } catch (e) {
          console.error("Failed to parse progress", e);
        }
      }

      // Check and sync user ID with backend database
      const savedUserId = localStorage.getItem("userId");
      const initUser = async () => {
        if (savedUserId) {
          setUserId(savedUserId);
        } else {
          // Register new user on backend
          const res = await registerUser(savedName);
          if (res && res.id) {
            setUserId(res.id);
            localStorage.setItem("userId", res.id);
            console.log("Registered new user on backend with ID:", res.id);
          }
        }
      };
      initUser();
    }
  }, []);

  const markActivityCompleted = useCallback((key: string) => {
    // Define which activities are allowed to show the Trophy and play applause
    const allowedCelebrationKeys = [
      "menjiplak",
      "menyentuh",
      "menyeret",
      "mengeja",
      "tebak-suara",
      "tebak-gambar",
      "kuis"
    ];

    if (allowedCelebrationKeys.includes(key)) {
      const activityNames: Record<string, string> = {
        menjiplak: "Menjiplak Garis",
        menyentuh: "Pecahkan Balon",
        menyeret: "Memilah Sampah",
        mengeja: "Mengeja Kata",
        "tebak-suara": "Tebak Suara",
        "tebak-gambar": "Tebak Gambar",
        kuis: "Kuis Pintar"
      };

      const name = activityNames[key] || "Aktivitas";
      setCelebrationTitle(name);
      setShowCelebration(true);

      // Play custom applause audio file
      try {
        const audio = new Audio("/gifts/applause1.m4a");
        audio.play().catch((err) => {
          console.warn("Failed to play custom applause audio, fallback to synth:", err);
          playSynthSound("victory");
        });
      } catch (e) {
        console.warn("Failed to instantiate Audio class, fallback to synth:", e);
        playSynthSound("victory");
      }
    }

    setCompletedActivities((prev) => {
      if (prev[key]) return prev;

      const updated = {
        ...prev,
        [key]: true,
      };

      localStorage.setItem(
        "completedActivities",
        JSON.stringify(updated)
      );

      return updated;
    });
  }, []);

  const playSynth = (type: "bubble" | "victory" | "wobble" | "pop" | "wrong" | "meow" | "bark" | "elephant") => {
    playSynthSound(type as any);
  };

  const speak = (text: string) => {
    speakInstruction(text, speechRate);
  };

  const syncNameWithBackend = async (name: string, currentUserId: string) => {
    let idToUse = currentUserId;
    if (!idToUse) {
      const res = await registerUser(name);
      if (res && res.id) {
        setUserId(res.id);
        localStorage.setItem("userId", res.id);
        console.log("Registered user on demand with ID:", res.id);
      }
    } else {
      await updateUser(idToUse, name);
      console.log("Synced name update with backend:", name);
    }
  };

  return (
    <LearningContext.Provider
      value={{
        userId,
        childName,
        setChildName: (name) => {
          setChildName(name);
          localStorage.setItem("childName", name);
          syncNameWithBackend(name, userId);
        },
        childAvatar,
        setChildAvatar: (avatar) => {
          setChildAvatar(avatar);
          localStorage.setItem("childAvatar", avatar);
        },
        completedActivities,
        markActivityCompleted,
        speechRate,
        setSpeechRate: (rate) => {
          setSpeechRate(rate);
          localStorage.setItem("speechRate", rate.toString());
        },
        playSynth,
        speak
      }}
    >
      {children}

      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="max-w-md bg-white border-4 border-amber-300 rounded-[36px] p-6 flex flex-col items-center text-center shadow-2xl overflow-hidden select-none outline-none">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle className="text-4xl font-black text-amber-600 mb-1 tracking-wide uppercase drop-shadow-xs  mt-2">
              LUAR BIASA! 🎉
            </DialogTitle>
            <DialogDescription className="text-xl font-extrabold text-slate-700">
              Kamu berhasil menyelesaikan materi <span className="text-sky-500 font-black">{celebrationTitle}</span>!
            </DialogDescription>
          </DialogHeader>

     
          <div className="w-56 h-56 relative my-4 flex items-center justify-center bg-slate-50 border-4 border-dashed border-amber-100 rounded-3xl overflow-hidden">
            <iframe 
              src="/gifts/player.html" 
              className="w-full h-full border-0 pointer-events-none"
              title="Celebration Trophy Animation"
            />
          </div>

          <DialogFooter className="w-full">
            <Button
              onClick={() => {
                playSynthSound("bubble");
                setShowCelebration(false);
              }}
              className="btn-tactile w-full py-5 px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xl font-black cursor-pointer shadow-md h-auto border-b-4 border-amber-700 transition-all active:scale-95"
            >
              HEBAT! OKE 
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearning must be used within a LearningProvider");
  }
  return context;
}
