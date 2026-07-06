import React from "react";

interface IllustrationProps {
  className?: string;
}

// Apel (Apple) - Red, bright, simple leaf, clean outline
export const ApelIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Apel merah yang lezat"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="30" ry="6" fill="#000000" fillOpacity="0.08" />
    {/* Stem */}
    <path
      d="M50 32C50 22 55 18 60 16"
      stroke="#78350F"
      strokeWidth="5"
      strokeLinecap="round"
    />
    {/* Leaf */}
    <path
      d="M52 24C58 24 66 18 64 12C56 12 52 18 52 24Z"
      fill="#22C55E"
      stroke="#15803D"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Apple Body */}
    <path
      d="M50 35C42 35 34 32 26 36C18 40 14 50 14 60C14 74 24 84 38 84C44 84 48 81 50 81C52 81 56 84 62 84C76 84 86 74 86 60C86 50 82 40 74 36C66 32 58 35 50 35Z"
      fill="#EF4444"
      stroke="#B91C1C"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Highlight for depth */}
    <path
      d="M26 48C22 52 22 62 26 68"
      stroke="#FECACA"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

// Pisang (Banana) - Yellow, curved, outline
export const PisangIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Pisang kuning manis"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="35" ry="6" fill="#000000" fillOpacity="0.08" />
    {/* Stem & Banana Body */}
    <path
      d="M22 24C35 24 64 28 78 52C90 72 78 84 76 84C72 84 68 78 60 70C50 60 26 42 16 34C12 30.5 15 24 22 24Z"
      fill="#FACC15"
      stroke="#CA8A04"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Banana Tip (Black/Brown end) */}
    <path
      d="M76 84C78 84 80 82 81 79.5C79.5 78 77 79 76 84Z"
      fill="#451A03"
      stroke="#451A03"
      strokeWidth="1.5"
    />
    {/* Stem End */}
    <path
      d="M20 24.5C21.5 22 17 21 16 23.5L20 24.5Z"
      fill="#451A03"
      stroke="#451A03"
      strokeWidth="2"
    />
    {/* Ridges/details */}
    <path
      d="M32 37C44 42 62 52 70 66"
      stroke="#EAB308"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M28 44C23 41 21 39 21 39"
      stroke="#CA8A04"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Jeruk (Orange) - Vibrant orange circular fruit, simple leaf
export const JerukIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Jeruk segar"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="28" ry="6" fill="#000000" fillOpacity="0.08" />
    {/* Stem */}
    <path
      d="M50 30C50 20 48 18 45 16"
      stroke="#78350F"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    {/* Leaf */}
    <path
      d="M48 20C42 20 34 22 36 28C44 28 48 24 48 20Z"
      fill="#22C55E"
      stroke="#15803D"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Orange Circle Body */}
    <circle
      cx="50"
      cy="58"
      r="28"
      fill="#F97316"
      stroke="#EA580C"
      strokeWidth="4"
    />
    {/* Texture Dots */}
    <circle cx="36" cy="48" r="1.5" fill="#EA580C" />
    <circle cx="64" cy="52" r="1.5" fill="#EA580C" />
    <circle cx="44" cy="68" r="1.5" fill="#EA580C" />
    <circle cx="56" cy="64" r="1.5" fill="#EA580C" />
    <circle cx="42" cy="44" r="1.5" fill="#EA580C" />
    <circle cx="58" cy="46" r="1.5" fill="#EA580C" />
    {/* Shine highlight */}
    <path
      d="M32 50C30 54 30 62 34 66"
      stroke="#FED7AA"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

// Kucing (Cat) - Orange cat face with huge ears and eyes
export const KucingIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Kucing lucu sekali"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="30" ry="6" fill="#000000" fillOpacity="0.08" />
    {/* Ears */}
    <path
      d="M20 54L14 20L40 40Z"
      fill="#F97316"
      stroke="#EA580C"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path
      d="M80 54L86 20L60 40Z"
      fill="#F97316"
      stroke="#EA580C"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Inner Ears */}
    <path d="M22 50L18 26L34 40Z" fill="#FCA5A5" />
    <path d="M78 50L82 26L66 40Z" fill="#FCA5A5" />
    {/* Head */}
    <ellipse
      cx="50"
      cy="58"
      rx="32"
      ry="25"
      fill="#FB923C"
      stroke="#EA580C"
      strokeWidth="4"
    />
    {/* Eyes */}
    <circle cx="36" cy="52" r="5" fill="#000000" />
    <circle cx="64" cy="52" r="5" fill="#000000" />
    {/* Eye Highlights */}
    <circle cx="34" cy="50" r="1.5" fill="#FFFFFF" />
    <circle cx="62" cy="50" r="1.5" fill="#FFFFFF" />
    {/* Nose and Mouth */}
    <path
      d="M50 58L47 62H53L50 58Z"
      fill="#FCA5A5"
      stroke="#E11D48"
      strokeWidth="1.5"
    />
    <path
      d="M44 65C47 67 50 67 50 65C50 67 53 67 56 65"
      stroke="#451A03"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Whiskers */}
    <path d="M12 58H26" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M14 66L26 64" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M88 58H74" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M86 66L74 64" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Anjing (Dog) - Friendly dog face with floppy brown ears
export const AnjingIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Anjing pintar"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="28" ry="6" fill="#000000" fillOpacity="0.08" />
    {/* Head */}
    <ellipse
      cx="50"
      cy="54"
      rx="26"
      ry="24"
      fill="#F5F5F4"
      stroke="#D6D3D1"
      strokeWidth="4"
    />
    {/* Snout */}
    <ellipse
      cx="50"
      cy="64"
      rx="14"
      ry="11"
      fill="#E7E5E4"
      stroke="#D6D3D1"
      strokeWidth="2"
    />
    {/* Nose */}
    <ellipse cx="50" cy="58" rx="6" ry="4" fill="#1C1917" />
    {/* Mouth */}
    <path
      d="M46 66C48 68 50 68 50 66C50 68 52 68 54 66"
      stroke="#1C1917"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Eyes */}
    <circle cx="40" cy="48" r="4" fill="#1C1917" />
    <circle cx="60" cy="48" r="4" fill="#1C1917" />
    <circle cx="39" cy="46" r="1.2" fill="#FFFFFF" />
    <circle cx="59" cy="46" r="1.2" fill="#FFFFFF" />
    {/* Ears - Floppy Brown */}
    <path
      d="M26 38C26 26 12 36 12 54C12 70 20 68 22 56C24 44 26 44 26 38Z"
      fill="#78350F"
      stroke="#451A03"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path
      d="M74 38C74 26 88 36 88 54C88 70 80 68 78 56C76 44 74 44 74 38Z"
      fill="#78350F"
      stroke="#451A03"
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </svg>
);

// Gajah (Elephant) - Blue elephant face with big round ears
export const GajahIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Gajah besar"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="32" ry="6" fill="#000000" fillOpacity="0.08" />
    {/* Ears */}
    <circle
      cx="24"
      cy="48"
      r="20"
      fill="#93C5FD"
      stroke="#2563EB"
      strokeWidth="4"
    />
    <circle
      cx="76"
      cy="48"
      r="20"
      fill="#93C5FD"
      stroke="#2563EB"
      strokeWidth="4"
    />
    {/* Inner Ears */}
    <circle cx="24" cy="48" r="14" fill="#FCA5A5" />
    <circle cx="76" cy="48" r="14" fill="#FCA5A5" />
    {/* Head */}
    <ellipse
      cx="50"
      cy="54"
      rx="24"
      ry="22"
      fill="#60A5FA"
      stroke="#2563EB"
      strokeWidth="4"
    />
    {/* Eyes */}
    <circle cx="40" cy="48" r="3.5" fill="#000000" />
    <circle cx="60" cy="48" r="3.5" fill="#000000" />
    <circle cx="39" cy="46" r="1" fill="#FFFFFF" />
    <circle cx="59" cy="46" r="1" fill="#FFFFFF" />
    {/* Trunk */}
    <path
      d="M50 64C50 78 58 80 58 74"
      stroke="#3B82F6"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50 64C50 78 58 80 58 74"
      stroke="#2563EB"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M50 64C50 78 58 80 58 74"
      stroke="#60A5FA"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Tusks */}
    <path
      d="M44 64C42 66 38 66 38 64C38 62 42 60 44 62"
      fill="#FFFFFF"
      stroke="#D6D3D1"
      strokeWidth="1.5"
    />
    <path
      d="M56 64C58 66 62 66 62 64C62 62 58 60 56 62"
      fill="#FFFFFF"
      stroke="#D6D3D1"
      strokeWidth="1.5"
    />
  </svg>
);

// Buku (Book) - Colorful, thick open book
export const BukuIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Buku cerita bergambar"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="34" ry="6" fill="#000000" fillOpacity="0.08" />
    {/* Cover Back */}
    <path
      d="M12 72L48 80V34L12 26V72Z"
      fill="#B91C1C"
      stroke="#7F1D1D"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path
      d="M88 72L52 80V34L88 26V72Z"
      fill="#B91C1C"
      stroke="#7F1D1D"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Pages Left */}
    <path
      d="M16 68L48 76V30L16 22V68Z"
      fill="#FFFFFF"
      stroke="#D6D3D1"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M19 66L48 74V32L19 24V66Z"
      fill="#F3F4F6"
    />
    {/* Pages Right */}
    <path
      d="M84 68L52 76V30L84 22V68Z"
      fill="#FFFFFF"
      stroke="#D6D3D1"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M81 66L52 74V32L81 24V66Z"
      fill="#F3F4F6"
    />
    {/* Book spine middle */}
    <path
      d="M48 76C50 75 50 75 52 76V30C50 29 50 29 48 30V76Z"
      fill="#7F1D1D"
      stroke="#7F1D1D"
      strokeWidth="2.5"
    />
    {/* Ribbon bookmark */}
    <path
      d="M50 30V56L53 52L56 56V30H50Z"
      fill="#FACC15"
      stroke="#CA8A04"
      strokeWidth="1.5"
    />
    {/* Text lines placeholders */}
    <path d="M22 36H40" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M22 46H36" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M22 56H32" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M60 36H78" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M60 46H74" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M60 56H68" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Mobil (Car) - Red friendly toy car
export const MobilIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Mobil merah berputar"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="36" ry="6" fill="#000000" fillOpacity="0.08" />
    {/* Car body top/cabin */}
    <path
      d="M32 50L40 32H70L78 50H32Z"
      fill="#EF4444"
      stroke="#B91C1C"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Windows */}
    <path
      d="M43 36L48 46H56V36H43Z"
      fill="#93C5FD"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M60 36V46H69L66 36H60Z"
      fill="#93C5FD"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Car base body */}
    <path
      d="M14 50H86C90 50 92 53 90 58L86 72H14L10 58C8 53 10 50 14 50Z"
      fill="#EF4444"
      stroke="#B91C1C"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Headlight */}
    <circle cx="85" cy="59" r="4.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
    {/* Tail light */}
    <rect x="9" y="55" width="4" height="8" rx="2" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
    {/* Wheels */}
    <circle cx="28" cy="74" r="12" fill="#1C1917" stroke="#44403C" strokeWidth="3" />
    <circle cx="72" cy="74" r="12" fill="#1C1917" stroke="#44403C" strokeWidth="3" />
    {/* Wheel Hubcaps */}
    <circle cx="28" cy="74" r="5.5" fill="#E7E5E4" stroke="#A8A29E" strokeWidth="2.5" />
    <circle cx="72" cy="74" r="5.5" fill="#E7E5E4" stroke="#A8A29E" strokeWidth="2.5" />
  </svg>
);

// Bola (Ball) - Soccer ball pattern
export const BolaIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Bola sepak bundar"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="28" ry="6" fill="#000000" fillOpacity="0.08" />
    {/* Ball background circle */}
    <circle
      cx="50"
      cy="56"
      r="28"
      fill="#FFFFFF"
      stroke="#1C1917"
      strokeWidth="4"
    />
    {/* Center Pentagon */}
    <path
      d="M50 46L60 53L56 64H44L40 53Z"
      fill="#1C1917"
      stroke="#1C1917"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Top line to edge */}
    <path d="M50 46V36L50 28" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
    {/* Top panels */}
    <path d="M50 36L28 34" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M50 36L72 34" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
    {/* Sides and Bottom panel lines */}
    <path d="M40 53L24 50" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M60 53L76 50" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M44 64L32 76" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M56 64L68 76" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" />
    {/* Perimeter panels colors */}
    <path d="M22 41L28 34L40 37" stroke="#1C1917" strokeWidth="3" />
    <path d="M78 41L72 34L60 37" stroke="#1C1917" strokeWidth="3" />
    {/* Highlights */}
    <path
      d="M32 40C30 44 30 52 34 56"
      stroke="#E7E5E4"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// Circle (Lingkaran) - Blue, simple, clear
export const CircleIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Bentuk Lingkaran Biru"
  >
    <ellipse cx="50" cy="88" rx="25" ry="5" fill="#000000" fillOpacity="0.08" />
    <circle cx="50" cy="50" r="30" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="4" />
    <circle cx="42" cy="42" r="1.5" fill="#FFFFFF" />
  </svg>
);

// Square (Persegi) - Orange, simple, clear
export const SquareIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Bentuk Persegi Jingga"
  >
    <ellipse cx="50" cy="88" rx="28" ry="5" fill="#000000" fillOpacity="0.08" />
    <rect x="22" y="22" width="56" height="56" rx="8" fill="#F97316" stroke="#C2410C" strokeWidth="4" />
    <circle cx="34" cy="34" r="1.5" fill="#FFFFFF" />
  </svg>
);

// Triangle (Segitiga) - Green, simple, clear
export const TriangleIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Bentuk Segitiga Hijau"
  >
    <ellipse cx="50" cy="88" rx="28" ry="5" fill="#000000" fillOpacity="0.08" />
    <path d="M50 16L84 74H16L50 16Z" fill="#10B981" stroke="#047857" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="50" cy="42" r="1.5" fill="#FFFFFF" />
  </svg>
);

// Red Basket (Keranjang Merah)
export const RedBasketIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Keranjang Merah"
  >
    <ellipse cx="50" cy="86" rx="32" ry="6" fill="#000000" fillOpacity="0.1" />
    <path d="M18 36L26 80H74L82 36H18Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="4" strokeLinejoin="round" />
    <path d="M30 36C30 16 70 16 70 36" stroke="#B91C1C" strokeWidth="4" fill="none" />
    <path d="M30 46H70" stroke="#B91C1C" strokeWidth="2.5" />
    <path d="M32 58H68" stroke="#B91C1C" strokeWidth="2.5" />
    <path d="M34 70H66" stroke="#B91C1C" strokeWidth="2.5" />
    <path d="M34 36L38 80" stroke="#B91C1C" strokeWidth="2.5" />
    <path d="M50 36V80" stroke="#B91C1C" strokeWidth="2.5" />
    <path d="M66 36L62 80" stroke="#B91C1C" strokeWidth="2.5" />
  </svg>
);

// Yellow Basket (Keranjang Kuning)
export const YellowBasketIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Keranjang Kuning"
  >
    <ellipse cx="50" cy="86" rx="32" ry="6" fill="#000000" fillOpacity="0.1" />
    <path d="M18 36L26 80H74L82 36H18Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="4" strokeLinejoin="round" />
    <path d="M30 36C30 16 70 16 70 36" stroke="#CA8A04" strokeWidth="4" fill="none" />
    <path d="M30 46H70" stroke="#CA8A04" strokeWidth="2.5" />
    <path d="M32 58H68" stroke="#CA8A04" strokeWidth="2.5" />
    <path d="M34 70H66" stroke="#CA8A04" strokeWidth="2.5" />
    <path d="M34 36L38 80" stroke="#CA8A04" strokeWidth="2.5" />
    <path d="M50 36V80" stroke="#CA8A04" strokeWidth="2.5" />
    <path d="M66 36L62 80" stroke="#CA8A04" strokeWidth="2.5" />
  </svg>
);

// Panda Avatar
export const PandaAvatar: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Avatar Panda"
  >
    <ellipse cx="50" cy="88" rx="28" ry="5" fill="#000000" fillOpacity="0.08" />
    <circle cx="26" cy="34" r="12" fill="#1C1917" />
    <circle cx="74" cy="34" r="12" fill="#1C1917" />
    <circle cx="26" cy="34" r="6" fill="#F5F5F4" />
    <circle cx="74" cy="34" r="6" fill="#F5F5F4" />
    <circle cx="50" cy="54" r="28" fill="#FFFFFF" stroke="#D6D3D1" strokeWidth="4" />
    <ellipse cx="38" cy="48" rx="7" ry="9" fill="#1C1917" transform="rotate(-15 38 48)" />
    <ellipse cx="62" cy="48" rx="7" ry="9" fill="#1C1917" transform="rotate(15 62 48)" />
    <circle cx="39" cy="46" r="3" fill="#FFFFFF" />
    <circle cx="61" cy="46" r="3" fill="#FFFFFF" />
    <circle cx="39" cy="46" r="1" fill="#000000" />
    <circle cx="61" cy="46" r="1" fill="#000000" />
    <ellipse cx="50" cy="62" rx="7" ry="5" fill="#F5F5F4" />
    <ellipse cx="50" cy="59" rx="3.5" ry="2" fill="#1C1917" />
    <path d="M47 64C49 65.5 50 65.5 50 64C50 65.5 51 65.5 53 64" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Rabbit Avatar
export const RabbitAvatar: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Avatar Kelinci"
  >
    <ellipse cx="50" cy="88" rx="28" ry="5" fill="#000000" fillOpacity="0.08" />
    <path d="M30 36C28 16 36 10 38 32C40 50 36 50 30 36Z" fill="#F5F5F4" stroke="#D6D3D1" strokeWidth="3" />
    <path d="M70 36C72 16 64 10 62 32C60 50 64 50 70 36Z" fill="#F5F5F4" stroke="#D6D3D1" strokeWidth="3" />
    <path d="M32 34C31 20 36 16 37 32C38 46 36 46 32 34Z" fill="#FCA5A5" />
    <path d="M68 34C69 20 64 16 63 32C62 46 64 46 68 34Z" fill="#FCA5A5" />
    <circle cx="50" cy="56" r="25" fill="#FFFFFF" stroke="#D6D3D1" strokeWidth="4" />
    <circle cx="42" cy="52" r="3.5" fill="#1C1917" />
    <circle cx="58" cy="52" r="3.5" fill="#1C1917" />
    <circle cx="40.5" cy="50" r="1" fill="#FFFFFF" />
    <circle cx="56.5" cy="50" r="1" fill="#FFFFFF" />
    <polygon points="50,58 47,61 53,61" fill="#FCA5A5" />
    <path d="M46 64C48 65.5 50 65.5 50 64C50 65.5 52 65.5 54 64" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="36" cy="59" r="2.5" fill="#FECACA" />
    <circle cx="64" cy="59" r="2.5" fill="#FECACA" />
  </svg>
);

// Bear Avatar
export const BearAvatar: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Avatar Beruang"
  >
    <ellipse cx="50" cy="88" rx="28" ry="5" fill="#000000" fillOpacity="0.08" />
    <circle cx="28" cy="38" r="9" fill="#78350F" stroke="#451A03" strokeWidth="3" />
    <circle cx="72" cy="38" r="9" fill="#78350F" stroke="#451A03" strokeWidth="3" />
    <circle cx="28" cy="38" r="5" fill="#FCA5A5" />
    <circle cx="72" cy="38" r="5" fill="#FCA5A5" />
    <circle cx="50" cy="58" r="26" fill="#92400E" stroke="#451A03" strokeWidth="4" />
    <circle cx="40" cy="52" r="3" fill="#FFFFFF" />
    <circle cx="60" cy="52" r="3" fill="#FFFFFF" />
    <circle cx="40" cy="52" r="1.5" fill="#000000" />
    <circle cx="60" cy="52" r="1.5" fill="#000000" />
    <ellipse cx="50" cy="64" rx="9" ry="6" fill="#FED7AA" />
    <ellipse cx="50" cy="62" rx="4" ry="2.5" fill="#451A03" />
    <path d="M47 67C49 68 50 68 50 67C50 68 51 68 53 67" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Butterfly Illustration
export const ButterflyIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Kupu-kupu"
  >
    <path d="M50 50C40 20 15 28 20 44C22 50 35 50 50 50Z" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
    <path d="M50 50C40 70 20 68 24 58C28 52 38 52 50 50Z" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
    <path d="M50 50C60 20 85 28 80 44C78 50 65 50 50 50Z" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
    <path d="M50 50C60 70 80 68 76 58C72 52 62 52 50 50Z" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
    <rect x="47" y="32" width="6" height="36" rx="3" fill="#1C1917" />
    <path d="M48 32C45 24 40 24 40 26" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" />
    <path d="M52 32C55 24 60 24 60 26" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Flower Illustration
export const FlowerIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Bunga"
  >
    <ellipse cx="50" cy="88" rx="20" ry="4" fill="#000000" fillOpacity="0.08" />
    <path d="M50 50V84" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" />
    <path d="M50 68C58 68 64 64 62 60C54 60 50 64 50 68Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
    <circle cx="50" cy="38" r="11" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
    <circle cx="38" cy="50" r="11" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
    <circle cx="50" cy="62" r="11" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
    <circle cx="62" cy="50" r="11" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
    <circle cx="42" cy="42" r="11" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
    <circle cx="58" cy="42" r="11" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
    <circle cx="42" cy="58" r="11" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
    <circle cx="58" cy="58" r="11" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
    <circle cx="50" cy="50" r="12" fill="#EA580C" stroke="#C2410C" strokeWidth="3" />
  </svg>
);

// 1. ILUSTRASI SAMPAH ANORGANIK (Botol Plastik)
// Biru, bentuk jelas, ada label warna kontras.
export const BotolPlastikIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Sampah botol plastik biru"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="25" ry="6" fill="#000000" fillOpacity="0.08" />
    
    {/* Bottle Body */}
    <rect x="34" y="30" width="32" height="54" rx="6" fill="#BAE6FD" stroke="#0284C7" strokeWidth="4" />
    
    {/* Bottle Label */}
    <rect x="34" y="48" width="32" height="16" fill="#38BDF8" stroke="#0284C7" strokeWidth="4" />
    
    {/* Bottle Neck */}
    <rect x="43" y="22" width="14" height="8" fill="#BAE6FD" stroke="#0284C7" strokeWidth="4" />
    
    {/* Bottle Cap */}
    <rect x="41" y="14" width="18" height="8" rx="2" fill="#0284C7" stroke="#0284C7" strokeWidth="4" />
    
    {/* Highlight for depth */}
    <line x1="40" y1="36" x2="40" y2="44" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// 2. ILUSTRASI TONG SAMPAH ANORGANIK (Warna Kuning)
// Bentuk tegas, ada ikon botol di tengah agar anak tahu fungsinya.
export const TongAnorganikIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Tong sampah anorganik warna kuning"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="94" rx="35" ry="6" fill="#000000" fillOpacity="0.08" />
    
    {/* Bin Body */}
    <path d="M 26 32 L 32 88 C 32 91 35 94 39 94 L 61 94 C 65 94 68 91 68 88 L 74 32 Z" fill="#FEF08A" stroke="#A16207" strokeWidth="4" strokeLinejoin="round" />
    
    {/* Lid Main */}
    <rect x="20" y="22" width="60" height="10" rx="4" fill="#FDE047" stroke="#A16207" strokeWidth="4" />
    
    {/* Lid Handle */}
    <rect x="40" y="16" width="20" height="6" rx="2" fill="#EAB308" stroke="#A16207" strokeWidth="4" />
    
    {/* Mini Icon (Bottle) on the Bin */}
    <rect x="46" y="55" width="8" height="14" rx="2" fill="#BAE6FD" stroke="#A16207" strokeWidth="2" />
    <rect x="46" y="61" width="8" height="4" fill="#38BDF8" stroke="#A16207" strokeWidth="2" />
    <rect x="48" y="52" width="4" height="3" fill="#BAE6FD" stroke="#A16207" strokeWidth="2" />
  </svg>
);

// 3. ILUSTRASI SAMPAH ORGANIK (Sisa Apel)
// Mudah dikenali karena berhubungan dengan bentuk apel merah utuh.
export const SisaApelIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Sampah sisa makanan apel"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="25" ry="6" fill="#000000" fillOpacity="0.08" />
    
    {/* Core Middle */}
    <rect x="38" y="25" width="24" height="50" rx="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="4" />
    
    {/* Seeds */}
    <ellipse cx="46" cy="50" rx="2.5" ry="5" fill="#78350F" />
    <ellipse cx="54" cy="50" rx="2.5" ry="5" fill="#78350F" />
    
    {/* Top Apple Part */}
    <path d="M 28 32 C 28 15 40 10 50 14 C 60 10 72 15 72 32 C 72 40 50 42 28 32 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="4" strokeLinejoin="round" />
    
    {/* Bottom Apple Part */}
    <path d="M 28 68 C 28 85 40 90 50 86 C 60 90 72 85 72 68 C 72 60 50 58 28 68 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="4" strokeLinejoin="round" />
    
    {/* Stem */}
    <path d="M50 14 C 50 6 54 2 60 0" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// 4. ILUSTRASI TONG SAMPAH ORGANIK (Warna Hijau)
// Bentuk tegas, ada ikon daun di tengah untuk identifikasi ganda.
export const TongOrganikIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-full" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Tong sampah organik warna hijau"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="94" rx="35" ry="6" fill="#000000" fillOpacity="0.08" />
    
    {/* Bin Body */}
    <path d="M 26 32 L 32 88 C 32 91 35 94 39 94 L 61 94 C 65 94 68 91 68 88 L 74 32 Z" fill="#86EFAC" stroke="#14532D" strokeWidth="4" strokeLinejoin="round" />
    
    {/* Lid Main */}
    <rect x="20" y="22" width="60" height="10" rx="4" fill="#4ADE80" stroke="#14532D" strokeWidth="4" />
    
    {/* Lid Handle */}
    <rect x="40" y="16" width="20" height="6" rx="2" fill="#22C55E" stroke="#14532D" strokeWidth="4" />
    
    {/* Mini Icon (Leaf) on the Bin */}
    <path d="M 50 48 C 60 48 65 62 50 72 C 35 62 40 48 50 48 Z" fill="#22C55E" stroke="#14532D" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);