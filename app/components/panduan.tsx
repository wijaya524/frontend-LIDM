import React from "react";
import { X } from "lucide-react";
import { playSynthSound } from "../utils/audio";

interface PanduanProps {
  onClose: () => void;
}

export default function PanduanGuru({ onClose }: PanduanProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[36px] border-4 border-sky-100 shadow-2xl p-6 md:p-8 relative flex flex-col">
        <button
          onClick={() => {
            playSynthSound("bubble");
            onClose();
          }}
          className="absolute top-4 right-4 p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full cursor-pointer transition-colors"
          aria-label="Tutup panduan"
        >
          <X className="w-8 h-8" />
        </button>

        <h3 className="text-3xl font-black text-sky-950 mb-4 flex items-center gap-2">
          Panduan Guru / Orang Tua 📖
        </h3>

        <div className="text-lg text-slate-700 leading-relaxed overflow-y-auto max-h-[70vh] pr-2 space-y-4 font-sans">
          <p>
            Aplikasi ini dirancang khusus untuk mempermudah proses belajar anak dengan hambatan kecerdasan (tunagrahita). Berikut beberapa tips memaksimalkan penggunaan aplikasi:
          </p>
          <ul className="list-disc list-inside space-y-2 font-bold text-slate-800">
            <li>Gunakan Speech Rate (Tombol Kura-kura/Kelinci) di atas untuk mengatur kecepatan bicara instruksi suara agar sesuai kemampuan penyerapan anak.</li>
            <li>Biarkan anak memecahkan tantangan motorik (menjiplak, menyentuh balon, menyeret buah) secara mandiri untuk menstimulasi saraf motorik halusnya.</li>
            <li>Berikan apresiasi verbal yang meriah setiap kali anak mendapatkan bintang prestasi di dalam aplikasi.</li>
            <li>Lakukan pendampingan berkala guna memotivasi anak belajar secara konsisten dan menyenangkan.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
