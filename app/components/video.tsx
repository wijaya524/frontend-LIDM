import React, { useEffect } from "react";
import { speakInstruction } from "../utils/audio";

interface VideoProps {
  speechRate: number;
  videoType: "kognitif" | "motorik";
}

export default function VideoGame({ speechRate, videoType }: VideoProps) {
  useEffect(() => {
    const pesan = videoType === "kognitif" 
      ? "Ayo tonton video mengenal bentuk lingkaran!" 
      : "Ayo tonton video senam jari!";
    
    speakInstruction(pesan, speechRate);
  }, [videoType, speechRate]);

  const getYouTubeUrl = () => {
    const videoId = videoType === "kognitif" ? "9awXBrHbo7Q" : "ID_VIDEO_YOUTUBE_2";

    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center py-6 select-none">
      <h3 className="text-3xl font-black text-sky-950 mb-2 text-center">
        {videoType === "kognitif" ? "Mengenal Bentuk Lingkaran" : "Latihan Gerak Senam Jari"} 📺
      </h3>
      <p className="text-lg font-bold text-slate-500 mb-6 text-center">
        Tonton video belajarnya di bawah ini
      </p>
      
      {/* Wadah Video YouTube */}
      <div className="w-full aspect-video bg-slate-950 rounded-3xl border-8 border-slate-800 relative overflow-hidden flex flex-col items-center justify-center">
        <iframe
          className="w-full h-full absolute top-0 left-0"
          src={getYouTubeUrl()}
          title={videoType === "kognitif" ? "Video Kognitif" : "Video Motorik"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          // Tambahan keamanan agar iframe tidak mengakses fitur yang tidak perlu
          sandbox="allow-scripts allow-same-origin allow-presentation"
        />
      </div>
    </div>
  );
}