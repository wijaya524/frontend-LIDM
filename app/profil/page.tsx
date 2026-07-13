"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/?tab=profil");
  }, [router]);

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}