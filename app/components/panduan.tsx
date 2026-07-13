import React from "react";
import { X } from "lucide-react";
import { playSynthSound } from "../utils/audio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PanduanProps {
  onClose: () => void;
}

export default function PanduanGuru({ onClose }: PanduanProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white rounded-[32px] border-4 border-sky-300 shadow-2xl p-6 md:p-8 relative flex flex-col overflow-hidden">
          {/* Top colored accent bar */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />

          <Button
            onClick={() => {
              playSynthSound("bubble");
              onClose();
            }}
            variant="ghost"
            className="absolute top-6 right-6 p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full cursor-pointer transition-colors w-10 h-10 flex items-center justify-center min-w-0 z-10"
            aria-label="Tutup panduan"
          >
            <X className="w-6 h-6 stroke-[3]" />
          </Button>

          <div className="flex items-center gap-3 mb-6 mt-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-2xl">
              📖
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-sky-950 tracking-tight">
                Panduan Guru & Orang Tua
              </h3>
              <p className="text-sm text-slate-500 font-bold">
                Tips belajar interaktif untuk anak berkebutuhan khusus
              </p>
            </div>
          </div>

          <div className="text-base md:text-lg text-slate-700 leading-relaxed overflow-y-auto max-h-[60vh] pr-2 space-y-6 font-sans">
            <p className="font-semibold text-slate-600">
              Aplikasi belajar ini dirancang khusus untuk mempermudah proses belajar anak dengan hambatan kecerdasan (tunagrahita). Berikut adalah beberapa tips untuk mendampingi anak bermain dan belajar:
            </p>

            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-xl">
                  ❤️
                </div>
                <div>
                  <h4 className="font-black text-purple-950 text-base md:text-lg">Pendampingan Penuh Kasih</h4>
                  <p className="text-sm md:text-base text-slate-600 font-medium">
                    Dampingi anak secara berkala saat bermain untuk memotivasi anak belajar secara konsisten, seru, dan bebas stres.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                  ✏️
                </div>
                <div>
                  <h4 className="font-black text-emerald-950 text-base md:text-lg">Latihan Motorik Mandiri</h4>
                  <p className="text-sm md:text-base text-slate-600 font-medium">
                    Biarkan anak menyelesaikan tantangan motorik (seperti menjiplak garis, memecahkan balon, dan memilah sampah) secara mandiri untuk melatih saraf sensorik dan motorik halusnya.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xl">
                  ⭐️
                </div>
                <div>
                  <h4 className="font-black text-amber-950 text-base md:text-lg">Apresiasi & Motivasi Visual</h4>
                  <p className="text-sm md:text-base text-slate-600 font-medium">
                    Setiap kali anak menyelesaikan permainan tertentu, mereka akan dihargai dengan suara tepuk tangan meriah dan piala bintang emas kustom. Berikan juga pujian lisan agar anak merasa lebih dihargai.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  📊
                </div>
                <div>
                  <h4 className="font-black text-blue-950 text-base md:text-lg">Pantau Perkembangan Anak</h4>
                  <p className="text-sm md:text-base text-slate-600 font-medium">
                    Gunakan tab <b>Pencapaian Ku</b> di panel kiri dashboard utama untuk melihat analisis respons kognitif anak berdasarkan data performa game yang diproses secara dinamis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
