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
  const isSpellingWordActive = useRef<boolean>(false);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

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
    isSpellingWordActive.current = false;
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const playAudioFile = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(src);
      activeAudioRef.current = audio;
      audio.onended = () => {
        resolve();
      };
      audio.onerror = (e) => {
        reject(e);
      };
      audio.play().catch(reject);
    });
  };

  const playLetterAudio = async (wordFolder: string, letter: string): Promise<void> => {
    const cleanLetter = letter.trim();
    const formats = [
      `/speak/mengeja/${wordFolder}/${cleanLetter.toUpperCase()}.mp3`,
      `/speak/mengeja/${wordFolder}/${cleanLetter.toLowerCase()}.mp3`
    ];
    
    for (const src of formats) {
      try {
        await playAudioFile(src);
        return; // Success!
      } catch (err) {
        // Silently try next format
      }
    }
    
    // Disabled browser default fallback
    await new Promise<void>((resolve) => {
      resolve();
    });
  };

  const playWordAudio = async (word: string): Promise<void> => {
    const cleanWord = word.trim().toLowerCase();
    const src = `/speak/mengeja/${cleanWord}/${cleanWord}.mp3`;
    try {
      await playAudioFile(src);
    } catch (err) {
      console.warn(`Failed to play word audio: ${src}`);
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

  const speakWordAndSpell = async (word: string, letters: string[]) => {
    clearTimers();
    isSpellingWordActive.current = true;
    setIsSpellingWord(true);
    
    const cleanWord = word.trim().toLowerCase();
    
    try {
      // 1. Play full word
      await playWordAudio(cleanWord);
      
      // Delay before spelling starts
      await new Promise<void>(resolve => {
        const t = setTimeout(resolve, 400);
        timeoutsRef.current.push(t);
      });
      
      // 2. Play letters one by one
      for (let idx = 0; idx < letters.length; idx++) {
        if (!isSpellingWordActive.current) break; // Check if canceled
        setActiveLetterIdx(idx);
        await playLetterAudio(cleanWord, letters[idx]);
        
        // Delay between letters
        await new Promise<void>(resolve => {
          const t = setTimeout(resolve, 300);
          timeoutsRef.current.push(t);
        });
      }
      
      // Delay before repeating full word
      await new Promise<void>(resolve => {
        const t = setTimeout(resolve, 400);
        timeoutsRef.current.push(t);
      });
      
      // 3. Play full word again
      if (isSpellingWordActive.current) {
        setActiveLetterIdx(-1);
        await playWordAudio(cleanWord);
      }
    } catch (e) {
      console.error("Error during spelling playback sequence:", e);
    } finally {
      setIsSpellingWord(false);
      setActiveLetterIdx(-1);
    }
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
      <h3 className="text-3xl font-black text-sky-950 dark:text-sky-100 mb-2 text-center">Ayo Mengeja Kata! </h3>
      
      <div className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center relative overflow-hidden my-4">
        <div className="absolute top-2 right-4 text-lg font-black text-slate-500 dark:text-slate-400">
          {spellIndex + 1} / {spellingItems.length}
        </div>

        <div
          onClick={handleSpellerClick}
          className={`btn-tactile bg-sky-50/50 hover:bg-sky-50 dark:bg-slate-800 border-4 border-dashed border-sky-200 dark:border-sky-700 rounded-2xl p-4 mb-6 cursor-pointer flex items-center justify-center transition-all h-auto w-auto hover:scale-[1.02] active:scale-[0.98] ${
            wobbleSpell ? "animate-bounce" : ""
          }`}
          aria-label="Ketuk gambar untuk mendengar suara mengeja"
        >
          {spellingItems[spellIndex].illustration}
        </div>

        <div className="flex items-center justify-center gap-4 w-full">
          <div className="flex flex-wrap items-center justify-center gap-2 text-4xl md:text-5xl font-black tracking-wide text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 px-5 py-3 rounded-2xl border-2 border-slate-100 dark:border-slate-750 shadow-inner">
            {spellingItems[spellIndex].letters.map((letter, idx) => (
              <span
                key={idx}
                className={`transition-all ${
                  activeLetterIdx === idx ? "letter-active text-emerald-500 dark:text-emerald-400" : "text-slate-800 dark:text-slate-100"
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
            className={`btn-tactile p-4 bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white rounded-full cursor-pointer shadow-lg focus:outline-none flex items-center justify-center w-16 h-16 shrink-0 ${
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
          className="btn-tactile flex-1 py-5 px-6 bg-slate-300 hover:bg-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl text-xl font-extrabold flex items-center justify-center gap-2 cursor-pointer h-auto border-b-4 border-slate-400 dark:border-slate-900"
        >
          <ArrowLeft className="w-6 h-6 stroke-[3]" /> KEMBALI
        </Button>
        <Button
          onClick={handleSpellNext}
          variant="ghost"
          className="btn-tactile flex-1 py-5 px-6 bg-amber-500 hover:bg-amber-600 dark:hover:bg-amber-600 text-white rounded-2xl text-xl font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md h-auto border-b-4 border-amber-600"
        >
          LANJUT <ArrowRight className="w-6 h-6 stroke-[3] animate-pulse" />
        </Button>
      </div>
    </div>
  );
}
