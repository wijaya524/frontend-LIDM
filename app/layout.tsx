import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import { LearningProvider } from "./context/LearningContext";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ayo Belajar! 🌟 Media Pembelajaran Interaktif",
  description: "Aplikasi belajar interaktif yang dirancang khusus dengan aksesibilitas tinggi untuk anak-anak berkebutuhan khusus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sky-50 font-sans text-slate-800">
        <LearningProvider>
          {children}
        </LearningProvider>
      </body>
    </html>
  );
}
