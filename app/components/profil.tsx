import React, { useState } from "react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { PandaAvatar, RabbitAvatar, BearAvatar } from "../illustrations";

interface ProfilProps {
  speechRate: number;
  initialName: string;
  initialAvatar: "panda" | "kelinci" | "beruang";
  onSave: (name: string, avatar: "panda" | "kelinci" | "beruang") => void;
}

export default function ProfilAnak({ speechRate, initialName, initialAvatar, onSave }: ProfilProps) {
  const [tempName, setTempName] = useState<string>(initialName);
  const [tempAvatar, setTempAvatar] = useState<"panda" | "kelinci" | "beruang">(initialAvatar);

  const renderAvatar = (type: "panda" | "kelinci" | "beruang", sizeClass = "w-24 h-24") => {
    if (type === "panda") return <PandaAvatar className={sizeClass} />;
    if (type === "kelinci") return <RabbitAvatar className={sizeClass} />;
    return <BearAvatar className={sizeClass} />;
  };

  return (
    <div className="w-full max-w-md bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-6 md:p-8 flex flex-col items-center">
      <h3 className="text-3xl font-black text-sky-950 mb-6 text-center font-sans">Siapa Namamu? ✏️</h3>
      
      <div className="w-full mb-6">
        <label htmlFor="child-name-input" className="block text-xl font-black text-slate-700 mb-2">Nama Kamu:</label>
        <input
          id="child-name-input"
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          className="w-full px-5 py-4 border-4 border-slate-200 rounded-2xl text-2xl font-bold focus:border-sky-400 focus:outline-none bg-slate-50 text-slate-800 text-center"
          placeholder="Boleh dikosongkan..."
        />
      </div>

      <div className="w-full mb-8">
        <span className="block text-xl font-black text-slate-700 mb-3 text-center">Pilih Teman Hewan:</span>
        <div className="grid grid-cols-3 gap-3 w-full">
          {[
            { id: "panda", label: "Panda" },
            { id: "kelinci", label: "Kelinci" },
            { id: "beruang", label: "Beruang" },
          ].map((a) => (
            <button
              key={a.id}
              onClick={() => {
                playSynthSound("bubble");
                setTempAvatar(a.id as any);
                speakInstruction(a.label, speechRate);
              }}
              className={`btn-tactile p-3 bg-slate-50 border-4 rounded-2xl flex flex-col items-center cursor-pointer ${
                tempAvatar === a.id ? "border-sky-400 bg-sky-50" : "border-slate-100"
              }`}
              aria-label={`Pilih avatar ${a.label}`}
            >
              {renderAvatar(a.id as any, "w-16 h-16")}
              <span className="font-extrabold text-sm text-slate-600 mt-1">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        // HANYA MENGIRIMKAN NILAI ASLI, TERMASUK JIKA KOSONG
        onClick={() => onSave(tempName.trim(), tempAvatar)}
        className="btn-tactile w-full py-5 px-6 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl text-2xl font-black cursor-pointer shadow-md"
      >
        SIMPAN PROFIL 👍
      </button>
    </div>
  );
}