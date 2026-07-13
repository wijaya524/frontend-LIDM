"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useLearning } from "../context/LearningContext";
import { PandaAvatar, RabbitAvatar, BearAvatar } from "../illustrations";

export default function Header() {
  const pathname = usePathname();
  const { childName, childAvatar } = useLearning();

  // Sembunyikan navbar di semua menu materi / aktivitas (selain dashboard, profil, dan laporan)
  if (pathname !== "/" && pathname !== "/profil" && pathname !== "/laporan") {
    return null;
  }

  const renderAvatar = (type: "panda" | "kelinci" | "beruang", sizeClass = "w-full h-full") => {
    if (type === "panda") return <PandaAvatar className={sizeClass} />;
    if (type === "kelinci") return <RabbitAvatar className={sizeClass} />;
    return <BearAvatar className={sizeClass} />;
  };

  return (
    <header className="sticky top-0 bg-white border-b-4 border-sky-100 py-4 px-4 md:px-8 z-40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 select-none w-full">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-sky-50 p-1 border-2 border-sky-200 rounded-full flex items-center justify-center shadow-sm">
          {renderAvatar(childAvatar)}
        </div>
        <div className="flex flex-col text-left">
          <span className="text-2xl font-black text-sky-950 leading-none">{childName || "Anak Pintar"}</span>
          <span className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wider">Anak Pintar</span>
        </div>
      </div>
    </header>
  );
}
