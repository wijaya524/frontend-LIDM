import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProfilProps {
  initialName: string;
  initialAvatar: "panda" | "kelinci" | "beruang";
  onSave: (name: string, avatar: "panda" | "kelinci" | "beruang") => void;
}

export default function ProfilAnak({ initialName, initialAvatar, onSave }: ProfilProps) {
  const [tempName, setTempName] = useState<string>(initialName);
  const [tempAvatar] = useState<"panda" | "kelinci" | "beruang">(initialAvatar);

  return (
    <Card className="w-full max-w-xl bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-8 md:p-10 flex flex-col items-center">
      <h3 className="text-3xl font-black text-sky-950 mb-6 text-center font-sans">Siapa Namamu?</h3>
      
      <div className="w-full mb-8">
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

      <Button
        onClick={() => onSave(tempName.trim(), tempAvatar)}
        className="btn-tactile w-full py-6 px-6 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl text-2xl font-black cursor-pointer shadow-md h-auto border-b-4 border-sky-600"
      >
        SIMPAN PROFIL 
      </Button>
    </Card>
  );
}