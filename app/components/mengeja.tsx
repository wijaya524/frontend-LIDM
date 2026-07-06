import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { playSynthSound } from "../utils/audio";
import {
  ApelIllustration,
  PisangIllustration,
  JerukIllustration,
  KucingIllustration,
  AnjingIllustration,
  GajahIllustration,
  BukuIllustration,
  MobilIllustration,
  BolaIllustration
} from "../illustrations";

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
    { name: "APEL", letters: ["A", "P", "E", "L"], illustration: <ApelIllustration className="w-48 h-48 md:w-56 md:h-56" /> },
    { name: "PISANG", letters: ["P", "I", "S", "A", "N", "G"], illustration: <PisangIllustration className="w-48 h-48 md:w-56 md:h-56" /> },
    { name: "JERUK", letters: ["J", "E", "R", "U", "K"], illustration: <JerukIllustration className="w-48 h-48 md:w-56 md:h-56" /> },
    { name: "KUCING", letters: ["K", "U", "C", "I", "N", "G"], illustration: <KucingIllustration className="w-48 h-48 md:w-56 md:h-56" /> },
    { name: "ANJING", letters: ["A", "N", "J", "I", "N", "G"], illustration: <AnjingIllustration className="w-48 h-48 md:w-56 md:h-56" /> },
    { name: "GAJAH", letters: ["G", "A", "J", "A", "H"], illustration: <GajahIllustration className="w-48 h-48 md:w-56 md:h-56" /> },
    { name: "BUKU", letters: ["B", "U", "K", "U"], illustration: <BukuIllustration className="w-48 h-48 md:w-56 md:h-56" /> },
    { name: "MOBIL", letters: ["M", "O", "B", "I", "L"], illustration: <MobilIllustration className="w-48 h-48 md:w-56 md:h-56" /> },
    { name: "BOLA", letters: ["B", "O", "L", "A"], illustration: <BolaIllustration className="w-48 h-48 md:w-56 md:h-56" /> }
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
    <div className="w-full max-w-2xl bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-6 md:p-8 flex flex-col items-center">
      <h3 className="text-3xl font-black text-sky-950 mb-2 text-center">Ayo Mengeja Kata! 🌟</h3>
      
      <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 flex flex-col items-center relative overflow-hidden my-4">
        <div className="absolute top-2 right-4 text-lg font-black text-slate-500">
          {spellIndex + 1} / {spellingItems.length}
        </div>

        <button
          onClick={handleSpellerClick}
          disabled={isSpellingWord}
          className={`btn-tactile bg-sky-50/50 hover:bg-sky-50 border-4 border-dashed border-sky-200 rounded-2xl p-4 mb-6 cursor-pointer flex items-center justify-center transition-all ${
            wobbleSpell ? "animate-bounce" : ""
          }`}
          aria-label="Ketuk gambar untuk mendengar suara mengeja"
        >
          {spellingItems[spellIndex].illustration}
        </button>

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

          <button
            onClick={() => {
              playSynthSound("bubble");
              const item = spellingItems[spellIndex];
              speakWordAndSpell(item.name, item.letters);
              if (incrementHints) incrementHints();
            }}
            className={`btn-tactile p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full cursor-pointer shadow-lg focus:outline-none ${
              !isSpellingWord ? "pulse-action" : "bg-emerald-600 scale-95"
            }`}
            aria-label="Eja Kata"
          >
            <Volume2 className="w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="w-full flex justify-between items-center gap-4 mt-2">
        <button
          onClick={handleSpellBack}
          className="btn-tactile flex-1 py-5 px-6 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded-2xl text-xl font-extrabold flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[3]" /> KEMBALI
        </button>
        <button
          onClick={handleSpellNext}
          className="btn-tactile flex-1 py-5 px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xl font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          LANJUT <ArrowRight className="w-6 h-6 stroke-[3] animate-pulse" />
        </button>
      </div>
    </div>
  );
}
