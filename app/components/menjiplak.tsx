import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { RotateCcw, Star } from "lucide-react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { Button } from "@/components/ui/button";

interface MenjiplakProps {
  speechRate: number;
  onComplete: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

export default function MenjiplakGame({ speechRate, onComplete, trackTaskAction }: MenjiplakProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [traceCompleted, setTraceCompleted] = useState<boolean>(false);
  const [tracePercent, setTracePercent] = useState<number>(0);
  const pathPoints = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (!traceCompleted) {
      initCanvas();
    }
  }, [traceCompleted]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    drawTrack(ctx, rect.width, rect.height);
  };

  const drawTrack = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.moveTo(60, h / 2);
    ctx.lineTo(w - 60, h / 2);
    ctx.strokeStyle = isDark ? "#1e293b" : "#F1F5F9";
    ctx.lineWidth = 32;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(60, h / 2);
    ctx.lineTo(w - 60, h / 2);
    ctx.strokeStyle = isDark ? "#475569" : "#CBD5E1";
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 8]);
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#A855F7";
    ctx.beginPath();
    ctx.arc(60, h / 2, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#10B981";
    ctx.beginPath();
    ctx.arc(w - 60, h / 2, 10, 0, Math.PI * 2);
    ctx.fill();
  };

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (traceCompleted) return;
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const h = canvas.getBoundingClientRect().height;

    const distToStart = Math.hypot(coords.x - 60, coords.y - h / 2);
    if (distToStart < 35) {
      if (trackTaskAction) trackTaskAction();
      setIsDrawing(true);
      pathPoints.current = [coords];
      playSynthSound("bubble");
    } else {
      speakInstruction("Seret dari lingkaran kiri!", speechRate);
    }
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || traceCompleted) return;
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const yDeviation = Math.abs(coords.y - h / 2);
    if (yDeviation > 26) {
      setIsDrawing(false);
      playSynthSound("wrong");
      speakInstruction("Keluar garis! Ulangi perlahan.", speechRate);
      initCanvas();
      return;
    }

    pathPoints.current.push(coords);
    ctx.beginPath();
    const lastPoint = pathPoints.current[pathPoints.current.length - 2];
    if (lastPoint) {
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.strokeStyle = "#3B82F6";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    const maxProgressX = Math.max(...pathPoints.current.map(p => p.x));
    const percent = Math.min(100, Math.floor((maxProgressX - 60) / (w - 120) * 100));
    setTracePercent(Math.max(0, percent));

    const distToEnd = Math.hypot(coords.x - (w - 60), coords.y - h / 2);
    if (distToEnd < 25 && percent > 90) {
      setIsDrawing(false);
      setTraceCompleted(true);
      setTracePercent(100);
      playSynthSound("victory");
      onComplete();
      speakInstruction("Hebat! Kupu-kupu sudah hinggap!", speechRate);
    }
  };

  const handleStopDraw = () => {
    setIsDrawing(false);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center py-6 select-none">
      <h3 className="text-3xl font-black text-sky-950 dark:text-sky-100 mb-2 text-center">Bantu Kupu-kupu Hinggap di Bunga! 🦋</h3>
      <p className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-4 text-center">Seret jari/mouse mengikuti garis abu-abu</p>
      
      <div className="relative border-4 border-dashed border-sky-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-sky-50/20 dark:bg-slate-900/30 w-full h-64 md:h-72 shadow-inner">
        {traceCompleted ? (
          <div className="absolute inset-0 bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-4 animate-in zoom-in duration-500">
            <div className="relative w-full h-44 sm:h-52">
              <Image
                src="/icons/menjiplak/kupu hinggap ke bunga.webp"
                alt="Kupu-kupu Hinggap ke Bunga"
                fill
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              onMouseDown={handleStartDraw}
              onMouseMove={handleDrawing}
              onMouseUp={handleStopDraw}
              onMouseLeave={handleStopDraw}
              onTouchStart={handleStartDraw}
              onTouchMove={handleDrawing}
              onTouchEnd={handleStopDraw}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            />

            <div className="absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none select-none w-16 h-16 bg-white/95 dark:bg-slate-800 p-1.5 rounded-full border-4 border-purple-200 dark:border-purple-900 shadow-md">
              <div className="w-full h-full relative">
                <Image
                  src="/icons/menjiplak/butterfly.webp"
                  alt="Kupu-kupu"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none select-none w-16 h-16 bg-white/95 dark:bg-slate-800 p-1.5 rounded-full border-4 border-emerald-200 dark:border-emerald-900 shadow-md">
              <div className="w-full h-full relative">
                <Image
                  src="/icons/menjiplak/flower.webp"
                  alt="Bunga"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-1 rounded-full border border-sky-100 text-base font-black text-sky-800">
              Menjiplak: {tracePercent}%
            </div>
          </>
        )}
      </div>

      <div className="flex gap-4 w-full mt-6">
        <Button
          onClick={() => {
            playSynthSound("bubble");
            setTraceCompleted(false);
            setTracePercent(0);
            speakInstruction("Silakan ulangi menjiplak dari kiri ke kanan.", speechRate);
          }}
          variant="outline"
          className="btn-tactile flex-1 py-5 px-6 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-2xl text-xl font-bold flex items-center justify-center gap-2 cursor-pointer h-auto border-b-4 border-slate-400"
        >
          <RotateCcw className="w-6 h-6" /> ULANGI
        </Button>
      </div>

    </div>
  );
}
