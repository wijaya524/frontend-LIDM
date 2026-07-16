import React from "react";
import { X, Sparkles } from "lucide-react";
import { playSynthSound } from "../utils/audio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface TentangProps {
  onClose: () => void;
}

export default function TentangAplikasi({ onClose }: TentangProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white dark:bg-slate-900 rounded-[32px] border-4 border-purple-300 dark:border-purple-800 shadow-2xl p-6 md:p-8 relative flex flex-col overflow-hidden">
          {/* Top colored accent bar */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />

          <Button
            onClick={() => {
              playSynthSound("bubble");
              onClose();
            }}
            variant="ghost"
            className="absolute top-6 right-6 p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full cursor-pointer transition-colors w-10 h-10 flex items-center justify-center min-w-0 z-10"
            aria-label="Tutup info aplikasi"
          >
            <X className="w-6 h-6 stroke-[3]" />
          </Button>

          <div className="flex items-center gap-3 mb-6 mt-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950/30 text-2xl">
              ℹ️
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-purple-950 dark:text-purple-300 tracking-tight">
                Tentang Aplikasi
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">
                Mengenal media pembelajaran interaktif khusus Tunagrahita
              </p>
            </div>
          </div>

          <div className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed overflow-y-auto max-h-[60vh] pr-2 space-y-6 font-sans">
            <p>
              Media Pembelajaran Interaktif ini dirancang menggunakan pendekatan hasil riset terapan bidang Pendidikan Khusus bagi anak dengan hambatan intelektual / tunagrahita.
            </p>

            <p>
              Dengan metode stimulasi multisensori, aplikasi ini mengintegrasikan berbagai aspek ramah anak berkebutuhan khusus:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/50 flex gap-3">
                <span className="text-2xl shrink-0">🎨</span>
                <div>
                  <h5 className="font-black text-amber-950 dark:text-amber-300 text-sm md:text-base">Visual Kontras & Jelas</h5>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                    Desain yang berani, ukuran tombol besar, dan grafis menarik untuk menjaga perhatian anak tetap fokus.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/50 flex gap-3">
                <span className="text-2xl shrink-0">🗣️</span>
                <div>
                  <h5 className="font-black text-blue-950 dark:text-blue-300 text-sm md:text-base">Pengisi Suara Kustom</h5>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                    Dilengkapi dengan rekaman suara manusia asli untuk memperjelas instruksi permainan secara lisan dan natural.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/50 flex gap-3">
                <span className="text-2xl shrink-0">🎈</span>
                <div>
                  <h5 className="font-black text-emerald-950 dark:text-emerald-300 text-sm md:text-base">Stimulasi Motorik Halus</h5>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                    Latihan menjiplak kupu-kupu, memecahkan balon, dan menyeret sampah untuk menstimulasi koordinasi tangan dan mata anak.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/50 flex gap-3">
                <span className="text-2xl shrink-0">💖</span>
                <div>
                  <h5 className="font-black text-rose-950 dark:text-rose-300 text-sm md:text-base">Aman & Bebas Gangguan</h5>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                    Tombol kembali berposisi tetap yang mudah dijangkau dan UI terbebas dari menu rumit yang membingungkan.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300">
                <Sparkles className="w-4 h-4 fill-current animate-pulse" /> Versi Aplikasi: 1.3.0
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                Dibuat dengan Next.js & Tailwind CSS
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
