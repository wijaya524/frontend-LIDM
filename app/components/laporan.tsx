import React, { useEffect, useState } from "react";
import { useLearning } from "../context/LearningContext";
import { getUserAnalytics, AnalysisResponse } from "../utils/api";
import { Brain, Clock, AlertCircle, Sparkles, Trophy, HelpCircle, Activity, Clock11Icon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface LaporanProps {
  completedActivities: Record<string, boolean>;
}

export default function LaporanGame({ completedActivities }: LaporanProps) {
  const { userId } = useLearning();
  const [analytics, setAnalytics] = useState<AnalysisResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      return "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900";
    }
    if (pattern.includes("Ekstra") || pattern.includes("Bantuan")) {
      return "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900";
    }
    return "bg-sky-50 text-sky-700 border-sky-300 dark:bg-sky-950/20 dark:text-sky-400 dark:border-sky-900";
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
    <div className="w-full py-6">

      {/* Dashboard Analisis AI (Cognitive Tracker) */}
      <Card className="w-full bg-white dark:bg-slate-900 border-4 border-sky-100 dark:border-slate-800 rounded-[36px] shadow-xl p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-2xl shadow-md shrink-0">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-sky-950 dark:text-sky-100 leading-tight">Analisis Kognitif & Respon AI</h3>
            <p className="text-base font-bold text-slate-400 dark:text-slate-500 mt-1">
              Rekomendasi khusus untuk pendampingan anak tunagrahita
            </p>
          </div>
        </div>

        <Separator className="my-6 dark:bg-slate-850" />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-black text-sky-700 dark:text-sky-400">Menganalisis data dari database...</span>
          </div>
        ) : latestAnalytic ? (
          <div className="flex flex-col gap-6">

            {/* A. LATEST RECOMMENDATION CARD */}
            <Card className="bg-gradient-to-br from-purple-50 via-indigo-50/40 to-white dark:from-purple-950/20 dark:via-indigo-950/20 dark:to-slate-900/50 border-3 border-purple-200/80 dark:border-purple-900/50 rounded-[28px] p-6 shadow-md flex flex-col md:flex-row gap-5 items-start transition-all hover:shadow-lg">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-2xl shadow-md shrink-0 self-center md:self-start">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-sm font-black text-purple-700 dark:text-purple-400 uppercase tracking-widest">
                    Hasil Analisis Terbaru:
                  </span>
                  <div className={`px-4 py-1 border-2 rounded-full text-sm font-black ${getPatternBadgeStyle(latestAnalytic.pattern_found)}`}>
                    {latestAnalytic.pattern_found}
                  </div>
                </div>
                <p className="text-lg font-extrabold text-slate-700 dark:text-slate-200 leading-relaxed">
                  "{latestAnalytic.recommendation}"
                </p>
              </div>
            </Card>

            {/* B. COGNITIVE METRICS SUMMARY CARD */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-amber-50/50 to-orange-50/10 dark:from-amber-950/10 dark:to-orange-950/5 border-2 border-amber-100 dark:border-amber-900 hover:border-amber-200 rounded-2xl p-5 flex items-center gap-4 transition-all shadow-md hover:scale-[1.02]">
                <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-400 text-white rounded-xl shadow-sm shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 block">Rerata Inisiasi</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                    {Math.round(latestAnalytic.response_time)} detik
                  </span>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-rose-50/50 to-red-50/10 dark:from-rose-950/10 dark:to-red-950/5 border-2 border-rose-100 dark:border-rose-900 hover:border-rose-200 rounded-2xl p-5 flex items-center gap-4 transition-all shadow-md hover:scale-[1.02]">
                <div className="p-3 bg-gradient-to-br from-rose-500 to-red-500 text-white rounded-xl shadow-sm shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 block">Salah Jawab</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                    {latestAnalytic.wrong_answer_count} kali
                  </span>
                </div>
              </Card>

              <Card className="bg-linear-to-br from-sky-50/50 to-blue-50/10 dark:from-sky-950/10 dark:to-blue-950/5 border-2 border-sky-100 dark:border-sky-900 hover:border-sky-200 rounded-2xl p-5 flex items-center gap-4 transition-all shadow-md hover:scale-[1.02]">
                <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 text-white rounded-xl shadow-sm shrink-0">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 block">Bantuan Suara</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                    {latestAnalytic.hint_count} kali
                  </span>
                </div>
              </Card>
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-black text-sky-950 dark:text-sky-100 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-500" /> Riwayat Analisis Sesi
              </h4>

              <div className="w-full flex flex-col gap-4 max-h-75 overflow-y-auto pr-1 ">
                {analytics && analytics.map((log) => (
                  <Card
                    key={log.analytic_id}
                    className=" flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 hover:border-sky-100 dark:hover:border-sky-950 bg-white dark:bg-slate-900 rounded-2xl p-5 transition-all shadow-sm hover:shadow-md "
                  >
                    <div className="flex w-full flex-wrap justify-between items-center gap-3  border-b border-slate-50 dark:border-slate-800">
                      <span className="text-sm font-extrabold text-slate-400 dark:text-slate-500">
                        <Badge variant="outline" className="dark:border-slate-700 dark:text-slate-400">
                          <Clock11Icon/>
                         {formatDate(log.play_time)}
                        </Badge>
                      </span>
                      <div className={`px-3 py-0.5 border rounded-full text-xs font-black ${getPatternBadgeStyle(log.pattern_found)
                      }`}>
                        <Badge variant='secondary' className="dark:bg-slate-800 dark:text-slate-300">
                        {log.pattern_found}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* fallback state: no data */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="p-4 bg-sky-50 dark:bg-slate-850 text-sky-500 dark:text-sky-400 rounded-full border-4 border-dashed border-sky-200 dark:border-slate-800 mb-6">
              <Trophy className="w-16 h-16" />
            </div>
            <h4 className="text-2xl font-black text-sky-950 dark:text-sky-100 mb-2">Belum Ada Riwayat Belajar</h4>
            <p className="text-base font-bold text-slate-500 dark:text-slate-400 max-w-md">
              Ayo, ajak anak menyelesaikan kuis atau aktivitas belajar kognitif dan motorik terlebih dahulu untuk memantau perkembangan respon kognitifnya di sini!
            </p>
          </div>
        )}
      </Card>

    </div>
  );
}
