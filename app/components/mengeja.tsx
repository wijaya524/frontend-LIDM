import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { playSynthSound } from "../utils/audio";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MengejaProps {
  speechRate: number;
  onComplete: () => void;
  onBackToMenu: () => void;
  incrementHints?: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

interface SpellingItem {
  name: string;
  letters: string[];
  illustration: React.ReactNode;
}

export default function MengejaGame({
  speechRate,
  onComplete,
  onBackToMenu,
  incrementHints,
  startNewTask,
  trackTaskAction
}: MengejaProps) {
  const [spellIndex, setSpellIndex] = useState<number>(0);
  const [isSpellingWord, setIsSpellingWord] = useState<boolean>(false);
  const [activeLetterIdx, setActiveLetterIdx] = useState<number>(-1);
  const [wobbleSpell, setWobbleSpell] = useState<boolean>(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const spellingItems: SpellingItem[] = [
    {
      name: "APEL",
      letters: ["A", "P", "E", "L"],
      illustration: (
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <Image
            src="/icons/mengeja/apple.webp"
            alt="Apel"
            fill
            className="object-contain"
          />
        </div>
      )
    },
    {
      name: "PISANG",
      letters: ["P", "I", "S", "A", "N", "G"],
      illustration: (
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <Image
            src="/icons/mengeja/pisang.webp"
            alt="Pisang"
            fill
            className="object-contain"
          />
        </div>
      )
    },
    {
      name: "JERUK",
      letters: ["J", "E", "R", "U", "K"],
      illustration: (
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <Image
            src="/icons/mengeja/jeruk.webp"
            alt="Jeruk"
            fill
            className="object-contain"
          />
        </div>
      )
    },
    {
      name: "KUCING",
      letters: ["K", "U", "C", "I", "N", "G"],
      illustration: (
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <Image
            src="/icons/mengeja/kucing.webp"
            alt="Kucing"
            fill
            className="object-contain"
          />
        </div>
      )
    },
    {
      name: "ANJING",
      letters: ["A", "N", "J", "I", "N", "G"],
      illustration: (
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <Image
            src="/icons/mengeja/anjing.webp"
            alt="Anjing"
            fill
            className="object-contain"
          />
        </div>
      )
    },
    {
      name: "GAJAH",
      letters: ["G", "A", "J", "A", "H"],
      illustration: (
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <Image
            src="/icons/mengeja/gajah.webp"
            alt="Gajah"
            fill
            className="object-contain"
          />
        </div>
      )
    },
    {
      name: "BUKU",
      letters: ["B", "U", "K", "U"],
      illustration: (
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <Image
            src="/icons/mengeja/buku.webp"
            alt="Buku"
            fill
            className="object-contain"
          />
        </div>
      )
    },
    {
      name: "MOBIL",
      letters: ["M", "O", "B", "I", "L"],
      illustration: (
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <Image
            src="/icons/mengeja/mobil.webp"
            alt="Mobil"
            fill
            className="object-contain"
          />
        </div>
      )
    },
    {
      name: "BOLA",
      letters: ["B", "O", "L", "A"],
      illustration: (
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <Image
            src="/icons/mengeja/bola.webp"
            alt="Bola"
            fill
            className="object-contain"
          />
        </div>
      )
    }
  ];

  const clearTimers = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    if (spellIndex > 0 && startNewTask) {
      startNewTask();
    }
    
    const item = spellingItems[spellIndex];
    const timer = setTimeout(() => {
      speakWordAndSpell(item.name, item.letters);
    }, 600);
    return () => {
      clearTimeout(timer);
      clearTimers();
    };
  }, [spellIndex]);

  const speakWordAndSpell = (word: string, letters: string[]) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    clearTimers();
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const voice = voices.find((v) => v.lang.startsWith("id") || v.lang.startsWith("ms")) || null;

    setIsSpellingWord(true);
    const wordUtterance = new SpeechSynthesisUtterance(word.toLowerCase());
    if (voice) wordUtterance.voice = voice;
    wordUtterance.lang = "id-ID";
    wordUtterance.rate = speechRate + 0.1;

    wordUtterance.onend = () => {
      let delay = 300;
      const step = speechRate === 0.4 ? 1100 : 800;
      letters.forEach((letter, idx) => {
        const timer = setTimeout(() => {
          setActiveLetterIdx(idx);
          const letterUtterance = new SpeechSynthesisUtterance(letter.toLowerCase());
          if (voice) letterUtterance.voice = voice;
          letterUtterance.lang = "id-ID";
          letterUtterance.rate = speechRate - 0.1;
          synth.speak(letterUtterance);

          if (idx === letters.length - 1) {
            letterUtterance.onend = () => {
              const repeatTimer = setTimeout(() => {
                setActiveLetterIdx(-1);
                const repeatUtterance = new SpeechSynthesisUtterance(word.toLowerCase());
                if (voice) repeatUtterance.voice = voice;
                repeatUtterance.lang = "id-ID";
                repeatUtterance.rate = speechRate + 0.1;
                repeatUtterance.onend = () => {
                  setIsSpellingWord(false);
                };
                synth.speak(repeatUtterance);
              }, 500);
              timeoutsRef.current.push(repeatTimer);
            };
          }
        }, delay + idx * step);
        timeoutsRef.current.push(timer);
      });
    };
    synth.speak(wordUtterance);
  };

  const handleSpellNext = () => {
    if (trackTaskAction) trackTaskAction();
    playSynthSound("bubble");
    if (spellIndex < spellingItems.length - 1) {
      setSpellIndex((prev) => prev + 1);
    } else {
      clearTimers();
      onComplete();
      playSynthSound("victory");
      onBackToMenu();
    }
  };

  const handleSpellBack = () => {
    playSynthSound("bubble");
    if (spellIndex > 0) {
      setSpellIndex((prev) => prev - 1);
    } else {
      onBackToMenu();
    }
  };

  const handleSpellerClick = () => {
    if (isSpellingWord) return;
    if (trackTaskAction) trackTaskAction();
    setWobbleSpell(true);
    playSynthSound("wobble");
    const item = spellingItems[spellIndex];
    speakWordAndSpell(item.name, item.letters);
    if (incrementHints) incrementHints();
    setTimeout(() => setWobbleSpell(false), 600);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center py-6 select-none">
      <h3 className="text-3xl font-black text-sky-950 mb-2 text-center">Ayo Mengeja Kata! </h3>
      
      <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 flex flex-col items-center relative overflow-hidden my-4">
        <div className="absolute top-2 right-4 text-lg font-black text-slate-500">
          {spellIndex + 1} / {spellingItems.length}
        </div>

        <div
          onClick={handleSpellerClick}
          className={`btn-tactile bg-sky-50/50 hover:bg-sky-50 border-4 border-dashed border-sky-200 rounded-2xl p-4 mb-6 cursor-pointer flex items-center justify-center transition-all h-auto w-auto hover:scale-[1.02] active:scale-[0.98] ${
            wobbleSpell ? "animate-bounce" : ""
          }`}
          aria-label="Ketuk gambar untuk mendengar suara mengeja"
        >
          {spellingItems[spellIndex].illustration}
        </div>

        <div className="flex items-center justify-center gap-4 w-full">
          <div className="flex flex-wrap items-center justify-center gap-2 text-4xl md:text-5xl font-black tracking-wide text-slate-800 bg-white px-5 py-3 rounded-2xl border-2 border-slate-100 shadow-inner">
            {spellingItems[spellIndex].letters.map((letter, idx) => (
              <span
                key={idx}
                className={`transition-all ${
                  activeLetterIdx === idx ? "letter-active text-emerald-500" : "text-slate-800"
                }`}
              >
                {letter}
              </span>
            ))}
          </div>

          <Button
            onClick={() => {
              playSynthSound("bubble");
              const item = spellingItems[spellIndex];
              speakWordAndSpell(item.name, item.letters);
              if (incrementHints) incrementHints();
            }}
            variant="ghost"
            className={`btn-tactile p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full cursor-pointer shadow-lg focus:outline-none flex items-center justify-center w-16 h-16 shrink-0 ${
              !isSpellingWord ? "pulse-action" : "bg-emerald-600 scale-95"
            }`}
            aria-label="Eja Kata"
          >
            <Volume2 className="w-8 h-8" />
          </Button>
        </div>
      </div>

      <div className="w-full flex justify-between items-center gap-4 mt-2">
        <Button
          onClick={handleSpellBack}
          variant="ghost"
          className="btn-tactile flex-1 py-5 px-6 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded-2xl text-xl font-extrabold flex items-center justify-center gap-2 cursor-pointer h-auto border-b-4 border-slate-400"
        >
          <ArrowLeft className="w-6 h-6 stroke-[3]" /> KEMBALI
        </Button>
        <Button
          onClick={handleSpellNext}
          variant="ghost"
          className="btn-tactile flex-1 py-5 px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xl font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md h-auto border-b-4 border-amber-600"
        >
          LANJUT <ArrowRight className="w-6 h-6 stroke-[3] animate-pulse" />
        </Button>
      </div>
    </div>
  );
}
