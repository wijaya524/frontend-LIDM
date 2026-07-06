import React, { useEffect, useState } from "react";
import { useLearning } from "../context/LearningContext";
import { getUserAnalytics, AnalysisResponse } from "../utils/api";
import { Brain, Clock, AlertCircle, Sparkles, Trophy, HelpCircle, Activity } from "lucide-react";

interface LaporanProps {
  completedActivities: Record<string, boolean>;
}

export default function LaporanGame({ completedActivities }: LaporanProps) {
  const { userId } = useLearning();
  const [analytics, setAnalytics] = useState<AnalysisResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const activitiesList = [
    { key: "warna", title: "Mengenal Warna 🎨" },
    { key: "bentuk", title: "Mengenal Bentuk 📐" },
    { key: "angka", title: "Belajar Berhitung 🔢" },
    { key: "mengeja", title: "Mengeja Kata 📝" },
    { key: "tebak-suara", title: "Tebak Suara Hewan 🗣️" },
    { key: "tebak-gambar", title: "Tebak Gambar Kata 🖼️" },
    { key: "menjiplak", title: "Motorik Menjiplak ✏️" },
    { key: "menyentuh", title: "Motorik Menyentuh 🎈" },
    { key: "menyeret", title: "Motorik Menyeret 🧺" },
    { key: "kuis", title: "Kuis Pintar 🏆" },
  ];

  useEffect(() => {
    const fetchLogs = async () => {
      if (userId) {
        setIsLoading(true);
        const data = await getUserAnalytics(userId);
        if (data) {
          setAnalytics(data);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, [userId]);

  // Determine styling based on the response pattern
  const getPatternBadgeStyle = (pattern: string) => {
    if (pattern.includes("Sangat Baik")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-300";
    }
    if (pattern.includes("Ekstra") || pattern.includes("Bantuan")) {
      return "bg-amber-50 text-amber-700 border-amber-300";
    }
    return "bg-sky-50 text-sky-700 border-sky-300";
  };

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("id-ID", options);
    } catch {
      return dateString;
    }
  };

  const latestAnalytic = analytics && analytics.length > 0 ? analytics[0] : null;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-start py-6">
      
      {/* 1. LEFT CARD: Bintang Prestasi (Checklist) */}
      <div className="w-full lg:flex-[0.8] xl:flex-[0.7] bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-6 md:p-8 flex flex-col items-center shrink-0">
        <h3 className="text-3xl font-black text-sky-950 mb-2 text-center flex items-center gap-2">
          Bintang Prestasi 🌟
        </h3>
        <p className="text-base font-bold text-slate-400 mb-6 text-center">
          Progres penyelesaian aktivitas belajarmu
        </p>
        
        <div className="w-full flex flex-col gap-3 max-h-105 overflow-y-auto pr-1">
          {activitiesList.map((act) => (
            <div
              key={act.key}
              className="flex justify-between items-center bg-slate-50 border-2 border-slate-100 hover:border-sky-100 rounded-2xl px-5 py-3 w-full transition-all"
            >
              <span className="text-lg font-extrabold text-slate-700">{act.title}</span>
              {completedActivities[act.key] ? (
                <span className="text-2xl ">⭐</span>
              ) : (
                <span className="text-2xl opacity-10">⭐</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. RIGHT CARD: Dashboard Analisis AI (Cognitive Tracker) */}
      <div className="w-full lg:flex-[2.3] bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-6 md:p-8">
        <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4 mb-6">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-sky-950">Analisis Kognitif & Respon AI 🤖</h3>
            <p className="text-base font-bold text-slate-400 mt-0.5">
              Rekomendasi khusus untuk pendampingan anak tunagrahita
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-black text-sky-700">Menganalisis data dari database...</span>
          </div>
        ) : latestAnalytic ? (
          <div className="flex flex-col gap-6">
            
            {/* A. LATEST RECOMMENDATION CARD */}
            <div className="bg-linear-to-r from-purple-50 to-indigo-50 border-3 border-purple-200 rounded-[28px] p-6 shadow-sm flex flex-col md:flex-row gap-5 items-start">
              <div className="p-4 bg-white/80 border border-purple-100 text-purple-600 rounded-2xl shrink-0 self-center md:self-start">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-sm font-black text-purple-700 uppercase tracking-widest">
                    Hasil Analisis Terbaru:
                  </span>
                  <div className={`px-4 py-1 border-2 rounded-full text-sm font-black ${getPatternBadgeStyle(latestAnalytic.pattern_found)}`}>
                    {latestAnalytic.pattern_found}
                  </div>
                </div>
                <p className="text-lg font-extrabold text-slate-700 leading-relaxed">
                  "{latestAnalytic.recommendation}"
                </p>
              </div>
            </div>

            {/* B. COGNITIVE METRICS SUMMARY CARD */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 border-2 border-slate-100 hover:border-sky-200 rounded-2xl p-5 flex items-center gap-4 transition-all">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-500 block">Rerata Inisiasi</span>
                  <span className="text-2xl font-black text-slate-800">
                    {Math.round(latestAnalytic.response_time)} detik
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border-2 border-slate-100 hover:border-red-200 rounded-2xl p-5 flex items-center gap-4 transition-all">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-500 block">Salah Jawab</span>
                  <span className="text-2xl font-black text-slate-800">
                    {latestAnalytic.wrong_answer_count} kali
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border-2 border-slate-100 hover:border-sky-200 rounded-2xl p-5 flex items-center gap-4 transition-all">
                <div className="p-3 bg-sky-100 text-sky-600 rounded-xl">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-500 block">Bantuan Suara</span>
                  <span className="text-2xl font-black text-slate-800">
                    {latestAnalytic.hint_count} kali
                  </span>
                </div>
              </div>
            </div>

            {/* C. DETAILED LOG HISTORY */}
            <div className="mt-4">
              <h4 className="text-xl font-black text-sky-950 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-500" /> Riwayat Analisis Sesi
              </h4>
              
              <div className="w-full flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                {analytics && analytics.map((log) => (
                  <div 
                    key={log.analytic_id}
                    className="bg-white border-2 border-slate-100 hover:border-slate-200 rounded-2xl p-5 transition-all shadow-sm"
                  >
                    <div className="flex flex-wrap justify-between items-center gap-3 mb-3 border-b border-slate-50 pb-2">
                      <span className="text-sm font-extrabold text-slate-400">
                        🕒 {formatDate(log.play_time)}
                      </span>
                      <div className={`px-3 py-0.5 border rounded-full text-xs font-black ${getPatternBadgeStyle(log.pattern_found)}`}>
                        {log.pattern_found}
                      </div>
                    </div>
                    
                    <p className="text-base font-bold text-slate-600 mb-3 italic">
                      "{log.recommendation}"
                    </p>

                    <div className="flex gap-4 text-xs font-black text-slate-500 uppercase tracking-wide">
                      <span>⏱️ Inisiasi: {Math.round(log.response_time)}s</span>
                      <span>❌ Salah: {log.wrong_answer_count}</span>
                      <span>🔊 Bantuan: {log.hint_count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* fallback state: no data */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="p-4 bg-sky-50 text-sky-500 rounded-full border-4 border-dashed border-sky-200 mb-6">
              <Trophy className="w-16 h-16" />
            </div>
            <h4 className="text-2xl font-black text-sky-950 mb-2">Belum Ada Riwayat Belajar</h4>
            <p className="text-base font-bold text-slate-500 max-w-md">
              Ayo, ajak anak menyelesaikan kuis atau aktivitas belajar kognitif dan motorik terlebih dahulu untuk memantau perkembangan respon kognitifnya di sini!
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
