import React from "react";
import { X } from "lucide-react";
import { playSynthSound } from "../utils/audio";

interface TentangProps {
  onClose: () => void;
}

export default function TentangAplikasi({ onClose }: TentangProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[36px] border-4 border-sky-100 shadow-2xl p-6 md:p-8 relative flex flex-col">
        <button
          onClick={() => {
            playSynthSound("bubble");
            onClose();
          }}
          className="absolute top-4 right-4 p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full cursor-pointer transition-colors"
          aria-label="Tutup info aplikasi"
        >
          <X className="w-8 h-8" />
        </button>

        <h3 className="text-3xl font-black text-sky-950 mb-4 flex items-center gap-2 font-sans">
          Tentang Aplikasi ini ℹ️
        </h3>

        <div className="text-lg text-slate-700 leading-relaxed overflow-y-auto max-h-[70vh] pr-2 space-y-4 font-sans">
          <p>
            Media Pembelajaran Interaktif ini dirancang menggunakan riset terapan bidang Pendidikan Khusus bagi anak dengan hambatan intelektual / tunagrahita.
          </p>
          <p>
            Dengan pendekatan stimulasi multisensori, aplikasi menggabungkan aspek visual dengan warna kontras, pendengaran bermedia Text-to-Speech adaptif, serta latihan motorik halus berbasis input sentuh guna meningkatkan kemandirian belajar anak.
          </p>
          <p className="font-bold text-slate-800">
            Versi Aplikasi: 1.2.0 (Next.js & Tailwind CSS)
          </p>
        </div>
      </div>
    </div>
  );
}
