let activeCustomAudio: HTMLAudioElement | null = null;
let lastSpokenText = "";
let lastSpokenTime = 0;

export const playSynthSound = (
  type: "bubble" | "victory" | "wobble" | "pop" | "wrong"
) => {
  if (typeof window === "undefined") return;
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (type === "bubble") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.12);
    } else if (type === "pop") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.08);
    } else if (type === "wobble") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(340, now + 0.08);
      osc.frequency.linearRampToValueAtTime(250, now + 0.16);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.18);
    } else if (type === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(130, now + 0.25);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.25);
    } else if (type === "victory") {
      const playNote = (freq: number, delay: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0.08, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + duration);
      };
      playNote(523.25, 0, 0.18);
      playNote(659.25, 0.1, 0.18);
      playNote(783.99, 0.2, 0.18);
      playNote(1046.50, 0.3, 0.45);
    }
  } catch (e) {
    console.warn("Failed to play synth sound", e);
  }
};

export const speakInstruction = (text: string, speechRate: number) => {
  if (typeof window === "undefined") return;

  const cleanText = text.toLowerCase().trim();

  // Throttle duplicate speech calls within 1000ms to prevent double trigger in React StrictMode
  const now = Date.now();
  if (cleanText === lastSpokenText && now - lastSpokenTime < 1000) {
    console.log("Throttled duplicate speech call for text:", text);
    return;
  }
  lastSpokenText = cleanText;
  lastSpokenTime = now;

  // Cancel any active SpeechSynthesis before playing custom audio
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  // Stop any previously playing custom audio to prevent overlapping sounds
  if (activeCustomAudio) {
    try {
      activeCustomAudio.pause();
      activeCustomAudio.currentTime = 0;
    } catch (e) {
      console.warn("Failed to stop previous audio:", e);
    }
    activeCustomAudio = null;
  }

  // Mapping of custom speech recordings in public/speak/
  const customSpeechMap: Record<string, string> = {
    // Kognitif
    "latihan kognitif. ayo pilih warna, bentuk, atau angka!": "/speak/kognitif/yuk-kita-mengenal-bentuk-angka-dan-warna.mp4",
    "mengenal warna! silakan pilih warna kesukaanmu.": "/speak/kognitif/ayo-pilih-warna-kesukaanmu.mp4",
    "mengenal bentuk! silakan pilih bentuk yang tersedia.": "/speak/kognitif/ayo-kita-mengenal-bentuk.mp4",
    "belajar berhitung! ayo hitung jumlah buah-buahan yang muncul.": "/speak/kognitif/yuk-kita-mengenal-angka.mp4",
    "mengenal bentuk! silakan pilih bentuk yang kamu suka.": "/speak/kognitif/ayo-kita-mengenal-bentuk.mp4",
    "belajar berhitung! ketuk angka untuk belajar berhitung.": "/speak/kognitif/yuk-kita-mengenal-angka.mp4",
    "mengenal bentuk": "/speak/kognitif/ayo-kita-mengenal-bentuk.mp4",
    "belajar berhitung": "/speak/kognitif/yuk-kita-mengenal-angka.mp4",

    // Mengenal Warna Sub-Items
    "merah": "/speak/kognitif/mengenal-warna/merah.mp3",
    "kuning": "/speak/kognitif/mengenal-warna/kuning.mp3",
    "biru": "/speak/kognitif/mengenal-warna/biru.mp3",
    "hijau": "/speak/kognitif/mengenal-warna/hijau.mp3",

    // Mengenal Bentuk Sub-Items
    "lingkaran": "/speak/kognitif/mengenal-bentuk/lingkaran.mp3",
    "persegi": "/speak/kognitif/mengenal-bentuk/persegi.mp3",
    "segitiga": "/speak/kognitif/mengenal-bentuk/segitiga.mp3",
    "trapesium": "/speak/kognitif/mengenal-bentuk/trapesium.mp3",

    // Menghitung Angka Sub-Items
    "lanjut ke angka enam sampai sepuluh": "/speak/kognitif/menghitung-angka/yuk-lanjut-angka-6-sampai-10.mp3",
    "kembali ke angka satu sampai lima": "/speak/kognitif/menghitung-angka/ayo-kita-kembali-ke-angka-1-sampai-5.mp3",
    "satu": "/speak/kognitif/menghitung-angka/satu.mp3",
    "dua": "/speak/kognitif/menghitung-angka/dua.mp3",
    "tiga": "/speak/kognitif/menghitung-angka/tiga.mp3",
    "empat": "/speak/kognitif/menghitung-angka/empat.mp3",
    "lima": "/speak/kognitif/menghitung-angka/lima.mp3",
    "enam": "/speak/kognitif/menghitung-angka/enam.mp3",
    "tujuh": "/speak/kognitif/menghitung-angka/tujuh.mp3",
    "delapan": "/speak/kognitif/menghitung-angka/delapan.mp3",
    "sembilan": "/speak/kognitif/menghitung-angka/sembilan.mp3",
    "sepuluh": "/speak/kognitif/menghitung-angka/sepuluh.mp3",

    // Motorik
    "latihan motorik. ayo menjiplak kupu-kupu, bermain balon, atau menata keranjang!": "/speak/motorik/pembuka-menu-motorik.mp4",
    "bantu kupu-kupu hinggap di bunga! silakan seret kupu-kupu mengikuti garis.": "/speak/motorik/ayo-menjiplak-garis.mp4",
    "ketuk dan pecahkan balon! ayo ketuk balon-balon yang terbang.": "/speak/motorik/ayo-sentuh-balonnya.mp4",
    "memilah sampah! pilah sampah pada tempatnya.": "/speak/motorik/yuk-memilah-sampah.mp4",
    "latihan motorik": "/speak/motorik/pembuka-menu-motorik.mp4",
    "menjiplak garis": "/speak/motorik/ayo-menjiplak-garis.mp4",
    "menyentuh balon": "/speak/motorik/ayo-sentuh-balonnya.mp4",
    "memilah sampah": "/speak/motorik/yuk-memilah-sampah.mp4",

    // Menjiplak Garis Sub-Items
    "keluar garis! ulangi perlahan.": "/speak/motorik/menjiplak-garis/kamu-keluar-garis-ayo-coba-lagi.mp3",
    "hebat! kupu-kupu sudah hinggap!": "/speak/motorik/menjiplak-garis/sekarang-kupu-kupu-berhasil-hinggap-di-bunga.mp3",

    // Memilah Sampah Sub-Items
    "benar!": "/speak/motorik/memilah-sampah/benar-sekali.mp3",
    "luar biasa! lingkungan jadi bersih!": "/speak/motorik/memilah-sampah/sekarang-lingkungan-jadi-bersih.mp3",
    "silakan kelompokkan sampah kembali.": "/speak/motorik/memilah-sampah/yuk-memilah-sampah-lagi.mp3",
    "salah tempat. coba lagi!": "/speak/motorik/memilah-sampah/kamu-salah-tempat.mp3",

    // Menyentuh Balon Sub-Items
    "bagus! semua balon sudah meletus!": "/speak/motorik/menyentuh-balon/kamu-hebat-semua-balon-meletus.mp3",



    // Mengeja Kata
    "ayo mengeja kata benda!": "/speak/mengeja/selamat-datang-di-menu-eja-kata.mp4",
    "mengeja kata": "/speak/mengeja/selamat-datang-di-menu-eja-kata.mp4",

    // Kuis Pintar
    "ayo kerjakan kuis bintang pintar! jawab pertanyaan dengan benar.": "/speak/kuis/yuk-mengerjakan-kuis-pintar.mp4",
    "kuis pintar": "/speak/kuis/yuk-mengerjakan-kuis-pintar.mp4",
    "buah pisang memiliki warna apa ya": "/speak/kuis/buah-pisang-memiliki warna-apa-ya.mp3",
    "mana gambar yang berbentuk segitiga hijau": "/speak/kuis/gambar-segitiga-hijau-yang-mana-ya.mp3",
    "berapa jumlah kucing di bawah ini": "/speak/kuis/ada-berapa-jumlah-kucing-dibawah-ini.mp3",
    "ulangi lagi": "/speak/kuis/ayo-coba-lagi.mp3",
    "ayo kita mulai kuis kembali!": "/speak/kuis/ayo-kita-mulai-kuis-kembali.mp3",

    // Tebak Suara
    "mari tebak suara hewan!": "/speak/tebak-suara/ayo-kita-menebak-suara.mp4",
    "tebak suara": "/speak/tebak-suara/ayo-kita-menebak-suara.mp4",
    "dengarkan suara berikut, lalu tebak hewan apa ini!": "/speak/tebak-suara/coba-tebak-bunyi-suara-hewan-berikut.mp3",
    "ayo tebak suara hewan apakah ini!": "/speak/tebak-suara/coba-tebak-bunyi-suara-hewan-berikut.mp3",
    "hewan apa yang bunyinya seperti ini?": "/speak/tebak-suara/coba-tebak-bunyi-suara-hewan-berikut.mp3",
    "salah. ayo coba lagi!": "/speak/tebak-suara/ayo-coba-lagi.mp3",

    // Tebak Gambar
    "ayo tebak gambar benda!": "/speak/tebak-gambar/tebak-gambar.mp4",
    "tebak gambar": "/speak/tebak-gambar/tebak-gambar.mp4",
    "pilih gambar yang sesuai dengan tulisan m o b i l": "/speak/tebak-gambar/gambar-mobil-itu-yang-mana.mp3",
    "tunjuk gambar buah apel!": "/speak/tebak-gambar/gambar-buah-apel-itu-yang-mana.mp3",
    "mana gambar yang merupakan buku bacaan?": "/speak/tebak-gambar/gambar-buku-itu-yang-mana.mp3",
    "coba lagi!": "/speak/tebak-suara/ayo-coba-lagi.mp3",
    "betul!": "/speak/tebak-gambar/kamu-benar.mp3",
  };

  // Find matches (prioritizing longer keys to prevent false substring matches)
  let matchedPath = "";
  const sortedKeys = Object.keys(customSpeechMap).sort((a, b) => b.length - a.length);
  
  // 1. First check for an exact match to avoid false positive substring matches (e.g. 'coba lagi!' matching 'salah tempat. coba lagi!')
  for (const key of sortedKeys) {
    if (cleanText === key) {
      matchedPath = customSpeechMap[key];
      break;
    }
  }

  // 2. If no exact match is found, check for partial/substring match
  if (!matchedPath) {
    for (const key of sortedKeys) {
      if (cleanText.includes(key) || key.includes(cleanText)) {
        matchedPath = customSpeechMap[key];
        break;
      }
    }
  }

  if (matchedPath) {
    try {
      const audio = new Audio(matchedPath);
      activeCustomAudio = audio;
      audio.play().catch((err) => {
        // Ignore AbortError when play() is intentionally interrupted by a pause() call
        if (err && (err.name === "AbortError" || (err.message && err.message.includes("interrupted")))) {
          return;
        }
        console.warn("Failed to play custom speech recording, fallback to default TTS:", err);
        playSpeechSynthesisFallback(text, speechRate);
      });
    } catch (e) {
      console.warn("Failed to create Audio instance, fallback to default TTS:", e);
      playSpeechSynthesisFallback(text, speechRate);
    }
  } else {
    playSpeechSynthesisFallback(text, speechRate);
  }
};

// Helper for default speech synthesis (Disabled as requested to remove all browser TTS fallbacks)
const playSpeechSynthesisFallback = (text: string, speechRate: number) => {
  console.log("Browser TTS disabled: ", text);
};

export const stopSpeaking = () => {
  if (typeof window === "undefined") return;
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  if (activeCustomAudio) {
    try {
      activeCustomAudio.pause();
      activeCustomAudio.currentTime = 0;
    } catch (e) {
      console.warn("Failed to stop custom audio:", e);
    }
    activeCustomAudio = null;
  }
};