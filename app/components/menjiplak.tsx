import React, { useState, useEffect, useRef } from "react";
import { RotateCcw, Star } from "lucide-react";
import { playSynthSound, speakInstruction } from "../utils/audio";
import { ButterflyIllustration, FlowerIllustration } from "../illustrations";

interface MenjiplakProps {
  speechRate: number;
  onComplete: () => void;
  startNewTask?: () => void;
  trackTaskAction?: () => void;
}

export default function MenjiplakGame({ speechRate, onComplete, startNewTask, trackTaskAction }: MenjiplakProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [traceCompleted, setTraceCompleted] = useState<boolean>(false);
  const [tracePercent, setTracePercent] = useState<number>(0);
  const pathPoints = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    initCanvas();
  }, []);

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
    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.moveTo(60, h / 2);
    ctx.lineTo(w - 60, h / 2);
    ctx.strokeStyle = "#F1F5F9";
    ctx.lineWidth = 32;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(60, h / 2);
    ctx.lineTo(w - 60, h / 2);
    ctx.strokeStyle = "#CBD5E1";
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
    <div className="w-full max-w-2xl bg-white border-4 border-sky-100 rounded-[36px] shadow-xl p-6 md:p-8 flex flex-col items-center">
      <h3 className="text-3xl font-black text-sky-950 mb-2 text-center">Bantu Kupu-kupu Hinggap di Bunga! 🦋</h3>
      <p className="text-lg font-bold text-slate-500 mb-4 text-center">Seret jari/mouse mengikuti garis abu-abu</p>
      
      <div className="relative border-4 border-dashed border-sky-200 rounded-3xl overflow-hidden bg-sky-50/20 w-full h-64 md:h-72">
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

        <div className="absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none select-none w-16 h-16 bg-white/70 p-1.5 rounded-full border-2 border-purple-200">
          <ButterflyIllustration className="w-full h-full" />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none select-none w-16 h-16 bg-white/70 p-1.5 rounded-full border-2 border-emerald-200">
          <FlowerIllustration className="w-full h-full" />
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-1 rounded-full border border-sky-100 text-base font-black text-sky-800">
          Menjiplak: {tracePercent}%
        </div>
      </div>

      <div className="flex gap-4 w-full mt-6">
        <button
          onClick={() => {
            playSynthSound("bubble");
            setTraceCompleted(false);
            setTracePercent(0);
            initCanvas();
            speakInstruction("Silakan ulangi menjiplak dari kiri ke kanan.", speechRate);
          }}
          className="btn-tactile flex-1 py-4 px-6 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-2xl text-xl font-bold flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-6 h-6" /> ULANGI
        </button>
      </div>

      {traceCompleted && (
        <div className="mt-6 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl flex flex-col items-center w-full animate-bounce">
          <span className="text-3xl font-black text-emerald-600 mb-2">HEBAT SEKALI! 🎉</span>
          <div className="flex gap-1">
            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
          </div>
        </div>
      )}
    </div>
  );
}
