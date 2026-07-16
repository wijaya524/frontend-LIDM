"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Camera, Save } from "lucide-react";
import { PandaAvatar, RabbitAvatar, BearAvatar } from "../illustrations";
import { playSynthSound } from "../utils/audio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

interface ProfilProps {
  initialName: string;
  initialAvatar: "panda" | "kelinci" | "beruang";
  onSave: (name: string, avatar: "panda" | "kelinci" | "beruang") => void;
}

export default function ProfilAnak({ initialName, initialAvatar, onSave }: ProfilProps) {
  const [tempName, setTempName] = useState<string>(initialName);
  const [tempAvatar, setTempAvatar] = useState<"panda" | "kelinci" | "beruang">(initialAvatar);
  const [showAvatarSelector, setShowAvatarSelector] = useState<boolean>(false);

  const renderAvatar = (type: "panda" | "kelinci" | "beruang", sizeClass = "w-28 h-28") => {
    if (type === "panda") return <PandaAvatar className={sizeClass} />;
    if (type === "kelinci") return <RabbitAvatar className={sizeClass} />;
    return <BearAvatar className={sizeClass} />;
  };

  const handleAvatarClick = () => {
    playSynthSound("bubble");
    setShowAvatarSelector(true);
  };

  return (
    <>
      <Card className="w-full max-w-xl bg-white dark:bg-[#0d1527] border-4 dark:border border-sky-100 dark:border-slate-800 rounded-[36px] shadow-xl dark:shadow-2xl p-8 md:p-10 flex flex-col items-center select-none text-slate-800 dark:text-white transition-colors duration-300">
 
        <h3 className="text-3xl md:text-4xl font-black text-sky-950 dark:text-white mb-2 text-center">
          Profil <span className="text-sky-500">Kamu</span>
        </h3>
        <p className="text-slate-500 dark:text-slate-400 font-bold mb-6 text-center text-sm md:text-base">
          Isi nama kamu untuk memulai belajar
      </p>
        <div className="relative mb-6">
          <button
            onClick={handleAvatarClick}
            className="w-36 h-36 relative flex items-center justify-center bg-sky-50/50 dark:bg-slate-800/40 border-4 border-sky-500/40 dark:border-sky-500/30 rounded-full shadow-inner cursor-pointer overflow-hidden hover:scale-102 transition-transform active:scale-98"
            aria-label="Ubah foto profil"
          >
            <div className="animate-in zoom-in duration-300">
              {renderAvatar(tempAvatar)}
            </div>
          </button>
          {/* Camera button overlay */}
          <button
            onClick={handleAvatarClick}
            className="w-11 h-11 rounded-full bg-[#0084ff] hover:bg-[#0070da] flex items-center justify-center text-white border-4 border-white dark:border-[#0d1527] shadow-md absolute bottom-0 right-0 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            aria-label="Pilih Karakter"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Input Name field */}
        <div className="w-full mb-6 text-left">
          <label htmlFor="child-name-input" className="flex items-center gap-2 text-slate-600 dark:text-[#94a3b8] mb-2 font-extrabold text-lg">
            <User className="w-5 h-5 text-sky-500" />
            <span>Nama Kamu</span>
          </label>
          <div className="relative flex items-center">
            <input
              id="child-name-input"
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full px-5 py-4 border-4 dark:border border-slate-200 dark:border-slate-800 rounded-2xl text-xl font-bold bg-slate-50 dark:bg-[#090f1d] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all pr-12 text-center md:text-left"
              placeholder="Isi namamu..."
            />
            <User className="absolute right-4 w-5 h-5 text-slate-400 dark:text-slate-600 pointer-events-none" />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-bold pl-1">
            Nama ini akan digunakan di aplikasi.
          </p>
        </div>

        {/* Save Button */}
        <Button
          onClick={() => onSave(tempName.trim(), tempAvatar)}
          className="btn-tactile w-full py-5 bg-[#0084ff] hover:bg-[#0070da] text-white rounded-2xl text-lg font-black cursor-pointer shadow-lg flex items-center justify-center gap-2 border-none transition-all active:scale-95 h-auto"
        >
          <Save className="w-5 h-5" /> SIMPAN PROFIL 
        </Button>
      </Card>

      {/* Avatar Selection Dialog Modal */}
      <Dialog open={showAvatarSelector} onOpenChange={setShowAvatarSelector}>
        <DialogContent className="max-w-md bg-white dark:bg-[#0d1527] border-4 dark:border-2 border-sky-100 dark:border-slate-800 rounded-[36px] p-6 flex flex-col items-center text-center shadow-2xl overflow-hidden select-none outline-none text-slate-800 dark:text-white transition-colors duration-300">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle className="text-2xl font-black text-sky-950 dark:text-white mb-1">
              Pilih Teman Belajar
            </DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 font-bold text-sm">
              Pilih karakter kesukaanmu untuk menemanimu bermain!
            </DialogDescription>
          </DialogHeader>

          {/* Side-by-Side Avatar Options inside Modal */}
          <div className="flex gap-4 my-6 justify-center w-full">
            {[
              { key: "panda", label: "Panda", component: <PandaAvatar className="w-16 h-16" /> },
              { key: "kelinci", label: "Kelinci", component: <RabbitAvatar className="w-16 h-16" /> },
              { key: "beruang", label: "Beruang", component: <BearAvatar className="w-16 h-16" /> }
            ].map((av) => (
              <button
                key={av.key}
                onClick={() => {
                  playSynthSound("bubble");
                  setTempAvatar(av.key as any);
                }}
                className={`p-3 rounded-3xl border-4 transition-all flex flex-col items-center gap-2 hover:scale-105 cursor-pointer w-24 ${
                  tempAvatar === av.key 
                    ? "border-sky-500 bg-sky-50 dark:bg-slate-800/80 scale-105 shadow-md" 
                    : "border-transparent bg-slate-50 dark:bg-slate-900/50 hover:border-slate-200 dark:hover:border-slate-850"
                }`}
              >
                {av.component}
                <span className="text-xs font-black text-slate-700 dark:text-slate-300">{av.label}</span>
              </button>
            ))}
          </div>

          <DialogFooter className="w-full">
            <Button
              onClick={() => {
                playSynthSound("victory");
                setShowAvatarSelector(false);
              }}
              className="btn-tactile w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl text-lg font-black cursor-pointer shadow-md h-auto border-b-4 border-sky-700 active:scale-95"
            >
              OKE, PILIH INI! 🌟
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}