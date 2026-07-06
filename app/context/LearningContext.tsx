/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { registerUser, updateUser } from "../utils/api";

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
  const [speechRate, setSpeechRate] = useState<number>(0.6);
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

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("childName") || "";
      if (savedName) setChildName(savedName);

      const savedAvatar = localStorage.getItem("childAvatar");
      if (savedAvatar) setChildAvatar(savedAvatar as any);

      const savedRate = localStorage.getItem("speechRate");
      if (savedRate) setSpeechRate(parseFloat(savedRate));

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
          // Register new user on backend (allows name to be empty/null initially)
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

  const markActivityCompleted = (key: string) => {
    setCompletedActivities((prev) => {
      const updated = { ...prev, [key]: true };
      if (typeof window !== "undefined") {
        localStorage.setItem("completedActivities", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const playSynth = (type: "bubble" | "victory" | "wobble" | "pop" | "wrong" | "meow" | "bark" | "elephant") => {
    playSynthSound(type as any);
  };

  const speak = (text: string) => {
    speakInstruction(text, speechRate);
  };

  const syncNameWithBackend = async (name: string, currentUserId: string) => {
    let idToUse = currentUserId;
    if (!idToUse) {
      // If we don't have a userId yet, try to register
      const res = await registerUser(name);
      if (res && res.id) {
        setUserId(res.id);
        localStorage.setItem("userId", res.id);
        console.log("Registered user on demand with ID:", res.id);
      }
    } else {
      // Update existing user on backend
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
          // Sync name to backend database
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
